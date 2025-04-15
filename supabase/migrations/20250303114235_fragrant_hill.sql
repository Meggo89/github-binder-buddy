/*
  # Create contact_requests table

  1. New Tables
    - `contact_requests`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `company` (text, not null)
      - `email` (text, not null)
      - `phone` (text)
      - `interest` (text, not null)
      - `message` (text, not null)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `contact_requests` table
    - Add policy for anyone to insert contact requests
    - Add policy for authenticated users to read contact requests
*/

CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  interest text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact requests"
  ON contact_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact requests"
  ON contact_requests
  FOR SELECT
  TO authenticated
  USING (true);