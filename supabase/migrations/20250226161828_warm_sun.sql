/*
  # Create email notifications table

  1. New Tables
    - `email_notifications`
      - `id` (uuid, primary key)
      - `recipient` (text, not null)
      - `subject` (text, not null)
      - `body` (text, not null)
      - `sent_at` (timestamp, not null)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `email_notifications` table
    - Add policy for authenticated users to read and insert
*/

CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  sent_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert email notifications"
  ON email_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read email notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (true);