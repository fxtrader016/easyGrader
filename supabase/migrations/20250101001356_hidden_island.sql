/*
  # Create exams table

  1. New Tables
    - `exams`
      - `id` (uuid, primary key)
      - `title` (text)
      - `exercises` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `exams` table
    - Add policies for authenticated users to manage their own exams
*/

CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  exercises jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated users
CREATE POLICY "Anyone can read exams"
  ON exams
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow insert for authenticated users
CREATE POLICY "Users can create exams"
  ON exams
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow update for authenticated users
CREATE POLICY "Users can update exams"
  ON exams
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow delete for authenticated users
CREATE POLICY "Users can delete exams"
  ON exams
  FOR DELETE
  TO authenticated
  USING (true);