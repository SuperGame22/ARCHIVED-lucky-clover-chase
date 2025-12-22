-- Create atomic function for adding funds to wallet
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

-- Create atomic function for deducting funds from wallet
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

-- Add a CHECK constraint to prevent negative balances as an extra safety net
ALTER TABLE public.wallets
ADD CONSTRAINT positive_balance CHECK (balance >= 0);