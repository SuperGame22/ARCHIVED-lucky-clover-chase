-- Fix 1: Update add_wallet_funds with input validation
CREATE OR REPLACE FUNCTION public.add_wallet_funds(
  p_wallet_id UUID,
  p_user_id UUID,
  p_amount DECIMAL(10, 2),
  p_description TEXT,
  p_transaction_type transaction_type
)
RETURNS JSONB AS $$
DECLARE
  v_new_balance DECIMAL(10, 2);
BEGIN
  -- Validate amount is positive
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be a positive value';
  END IF;
  
  -- Validate reasonable maximum (prevent abuse)
  IF p_amount > 100000 THEN
    RAISE EXCEPTION 'Amount exceeds maximum allowed limit';
  END IF;

  -- Verify ownership
  IF NOT EXISTS (
    SELECT 1 FROM public.wallets 
    WHERE id = p_wallet_id AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'Unauthorized wallet access';
  END IF;

  -- Atomic update with RETURNING
  UPDATE public.wallets
  SET balance = balance + p_amount, updated_at = now()
  WHERE id = p_wallet_id AND user_id = p_user_id
  RETURNING balance INTO v_new_balance;

  -- Insert transaction record
  INSERT INTO public.transactions (user_id, wallet_id, type, amount, description)
  VALUES (p_user_id, p_wallet_id, p_transaction_type, p_amount, p_description);

  RETURN jsonb_build_object('success', true, 'balance', v_new_balance);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix 2: Update deduct_wallet_funds with input validation
CREATE OR REPLACE FUNCTION public.deduct_wallet_funds(
  p_wallet_id UUID,
  p_user_id UUID,
  p_amount DECIMAL(10, 2),
  p_description TEXT,
  p_transaction_type transaction_type
)
RETURNS JSONB AS $$
DECLARE
  v_new_balance DECIMAL(10, 2);
  v_current_balance DECIMAL(10, 2);
BEGIN
  -- Validate amount is positive
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be a positive value';
  END IF;
  
  -- Validate reasonable maximum (prevent abuse)
  IF p_amount > 100000 THEN
    RAISE EXCEPTION 'Amount exceeds maximum allowed limit';
  END IF;

  -- Get current balance with row lock to prevent race conditions
  SELECT balance INTO v_current_balance
  FROM public.wallets
  WHERE id = p_wallet_id AND user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Wallet not found or unauthorized';
  END IF;

  IF v_current_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  -- Atomic deduction
  UPDATE public.wallets
  SET balance = balance - p_amount, updated_at = now()
  WHERE id = p_wallet_id AND user_id = p_user_id
  RETURNING balance INTO v_new_balance;

  -- Insert transaction record (negative amount for deductions)
  INSERT INTO public.transactions (user_id, wallet_id, type, amount, description)
  VALUES (p_user_id, p_wallet_id, p_transaction_type, -p_amount, p_description);

  RETURN jsonb_build_object('success', true, 'balance', v_new_balance);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix 3: Add creator_id to competitions table for ownership tracking
ALTER TABLE public.competitions ADD COLUMN IF NOT EXISTS creator_id UUID;

-- Fix 4: Create atomic join_competition function that handles payment + entry atomically
CREATE OR REPLACE FUNCTION public.join_competition(
  p_competition_id UUID,
  p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_competition RECORD;
  v_wallet RECORD;
  v_new_balance DECIMAL(10, 2);
  v_new_pot_total DECIMAL(10, 2);
BEGIN
  -- Get competition with lock
  SELECT * INTO v_competition
  FROM public.competitions
  WHERE id = p_competition_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Competition not found';
  END IF;

  IF v_competition.status != 'pending' THEN
    RAISE EXCEPTION 'Competition is no longer accepting players';
  END IF;

  -- Check if user already joined
  IF EXISTS (
    SELECT 1 FROM public.competition_players
    WHERE competition_id = p_competition_id AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'You have already joined this competition';
  END IF;

  -- Get user's wallet with lock
  SELECT * INTO v_wallet
  FROM public.wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Wallet not found';
  END IF;

  IF v_wallet.balance < v_competition.buy_in THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  -- Deduct buy-in from wallet
  UPDATE public.wallets
  SET balance = balance - v_competition.buy_in, updated_at = now()
  WHERE id = v_wallet.id
  RETURNING balance INTO v_new_balance;

  -- Record the transaction
  INSERT INTO public.transactions (user_id, wallet_id, type, amount, description)
  VALUES (p_user_id, v_wallet.id, 'buy_in', -v_competition.buy_in, 'Competition buy-in');

  -- Add player to competition
  INSERT INTO public.competition_players (competition_id, user_id, has_paid)
  VALUES (p_competition_id, p_user_id, true);

  -- Update pot total
  UPDATE public.competitions
  SET pot_total = pot_total + v_competition.buy_in, updated_at = now()
  WHERE id = p_competition_id
  RETURNING pot_total INTO v_new_pot_total;

  RETURN jsonb_build_object(
    'success', true, 
    'balance', v_new_balance,
    'pot_total', v_new_pot_total
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix 5: Create atomic create_competition function
CREATE OR REPLACE FUNCTION public.create_competition(
  p_user_id UUID,
  p_buy_in DECIMAL(10, 2),
  p_course_name TEXT DEFAULT NULL,
  p_tee_time TIMESTAMP WITH TIME ZONE DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_wallet RECORD;
  v_competition_id UUID;
  v_new_balance DECIMAL(10, 2);
BEGIN
  -- Validate buy-in
  IF p_buy_in IS NULL OR p_buy_in <= 0 THEN
    RAISE EXCEPTION 'Buy-in must be a positive value';
  END IF;
  
  IF p_buy_in > 1000 THEN
    RAISE EXCEPTION 'Buy-in exceeds maximum allowed';
  END IF;

  -- Get user's wallet with lock
  SELECT * INTO v_wallet
  FROM public.wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Wallet not found';
  END IF;

  IF v_wallet.balance < p_buy_in THEN
    RAISE EXCEPTION 'Insufficient funds';
  END IF;

  -- Deduct buy-in from wallet
  UPDATE public.wallets
  SET balance = balance - p_buy_in, updated_at = now()
  WHERE id = v_wallet.id
  RETURNING balance INTO v_new_balance;

  -- Record the transaction
  INSERT INTO public.transactions (user_id, wallet_id, type, amount, description)
  VALUES (p_user_id, v_wallet.id, 'buy_in', -p_buy_in, 'Competition buy-in (host)');

  -- Create competition
  INSERT INTO public.competitions (creator_id, buy_in, pot_total, course_name, tee_time, status)
  VALUES (p_user_id, p_buy_in, p_buy_in, p_course_name, p_tee_time, 'pending')
  RETURNING id INTO v_competition_id;

  -- Add creator as first player
  INSERT INTO public.competition_players (competition_id, user_id, has_paid)
  VALUES (v_competition_id, p_user_id, true);

  RETURN jsonb_build_object(
    'success', true,
    'competition_id', v_competition_id,
    'balance', v_new_balance
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix 6: Drop the permissive INSERT policy and create restrictive one
DROP POLICY IF EXISTS "Users can join competitions" ON public.competition_players;

-- Only allow inserts through the secure RPC functions
CREATE POLICY "Only RPC functions can insert competition players"
ON public.competition_players FOR INSERT
TO authenticated
WITH CHECK (false);

-- Fix 7: Update competitions INSERT policy to only allow via RPC
DROP POLICY IF EXISTS "Authenticated users can create competitions" ON public.competitions;

CREATE POLICY "Only RPC functions can create competitions"
ON public.competitions FOR INSERT
TO authenticated
WITH CHECK (false);

-- Fix 8: Restrict competitions UPDATE to only the creator
DROP POLICY IF EXISTS "Competition creators can update their competitions" ON public.competitions;

CREATE POLICY "Competition creators can update their competitions"
ON public.competitions FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id);