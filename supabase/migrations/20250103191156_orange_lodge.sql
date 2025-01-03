/*
  # Update RLS policies for exams table
  
  1. Changes
    - Allow public read access to exams table
    - Allow public write access to exams table
    
  Note: Since this is a simple grading app without sensitive data,
  we'll allow public access to simplify the user experience
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read exams" ON exams;
DROP POLICY IF EXISTS "Users can create exams" ON exams;
DROP POLICY IF EXISTS "Users can update exams" ON exams;
DROP POLICY IF EXISTS "Users can delete exams" ON exams;

-- Create new public access policies
CREATE POLICY "Public read access"
  ON exams FOR SELECT
  USING (true);

CREATE POLICY "Public insert access"
  ON exams FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public update access"
  ON exams FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public delete access"
  ON exams FOR DELETE
  USING (true);