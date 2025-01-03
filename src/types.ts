export interface Question {
  id: string;
  points: number;
  label: string;
}

export interface Exercise {
  id: string;
  title: string;
  totalPoints: number;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  exercises: Exercise[];
}

export interface ExamState {
  selectedExamId: string | null;
  exams: Exam[];
}