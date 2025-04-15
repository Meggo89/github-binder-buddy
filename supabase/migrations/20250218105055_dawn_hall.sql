/*
  # Create valuation leads table

  1. New Tables
    - `valuation_leads`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `last_valuation_at` (timestamp, nullable)
      - `industry` (text, nullable)
      - `revenue` (numeric, nullable)
      - `ebitda` (numeric, nullable)

  2. Security
    - Enable RLS on `valuation_leads` table
    - Add policy for authenticated users to read their own data
    - Add policy for inserting new leads
*/

CREATE TABLE IF NOT EXISTS valuation_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_valuation_at timestamptz,
  industry text,
  revenue numeric,
  ebitda numeric
);

ALTER TABLE valuation_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert leads"
  ON valuation_leads
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read own leads"
  ON valuation_leads
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);