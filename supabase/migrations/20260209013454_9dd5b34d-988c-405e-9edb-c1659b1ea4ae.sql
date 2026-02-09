-- Add clover_balance to wallets table
ALTER TABLE public.wallets 
ADD COLUMN clover_balance integer NOT NULL DEFAULT 0;

-- Create promotions table for multipliers
CREATE TABLE public.promotions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  multiplier numeric NOT NULL DEFAULT 1.0,
  starts_at timestamp with time zone NOT NULL,
  ends_at timestamp with time zone NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on promotions
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- Anyone can view active promotions
CREATE POLICY "Anyone can view promotions" 
ON public.promotions 
FOR SELECT 
USING (true);

-- Add clover_earned to transaction types
ALTER TYPE public.transaction_type ADD VALUE 'clover_earned';

-- Create award_clovers RPC function
CREATE OR REPLACE FUNCTION public.award_clovers(p_user_id uuid, p_amount numeric)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_base_clovers integer;
  v_multiplier numeric := 1.0;
  v_final_clovers integer;
  v_wallet RECORD;
  v_new_clover_balance integer;
BEGIN
  -- Validate amount
  IF p_amount IS NULL OR p_amount <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid amount');
  END IF;

  -- Calculate base clovers (1 clover per $4 = 0.25 clovers per dollar)
  v_base_clovers := floor(p_amount * 0.25);
  
  IF v_base_clovers <= 0 THEN
    RETURN jsonb_build_object('success', true, 'clovers_awarded', 0, 'message', 'Amount too small for clovers');
  END IF;

  -- Check for active promotion multiplier
  SELECT multiplier INTO v_multiplier
  FROM public.promotions
  WHERE is_active = true 
    AND now() BETWEEN starts_at AND ends_at
  ORDER BY multiplier DESC
  LIMIT 1;

  IF v_multiplier IS NULL THEN
    v_multiplier := 1.0;
  END IF;

  -- Calculate final clovers with multiplier
  v_final_clovers := floor(v_base_clovers * v_multiplier);

  -- Get wallet with lock
  SELECT * INTO v_wallet
  FROM public.wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Wallet not found');
  END IF;

  -- Update clover balance
  UPDATE public.wallets
  SET clover_balance = clover_balance + v_final_clovers, updated_at = now()
  WHERE user_id = p_user_id
  RETURNING clover_balance INTO v_new_clover_balance;

  -- Log transaction
  INSERT INTO public.transactions (user_id, wallet_id, type, amount, description, metadata)
  VALUES (
    p_user_id, 
    v_wallet.id, 
    'clover_earned', 
    v_final_clovers, 
    'Earned clovers from spending $' || p_amount::text,
    jsonb_build_object('spend_amount', p_amount, 'multiplier', v_multiplier, 'base_clovers', v_base_clovers)
  );

  RETURN jsonb_build_object(
    'success', true, 
    'clovers_awarded', v_final_clovers,
    'new_balance', v_new_clover_balance,
    'multiplier', v_multiplier
  );
END;
$$;