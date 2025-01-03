import React from 'react';
import { Exam } from '../../types';

interface ExamSelectorProps {
  exams: Exam[];
  selectedExam: Exam | undefined;
  onSelect: (id: string) => void;
}

function ExamSelector({ exams, selectedExam, onSelect }: ExamSelectorProps) {
  return (
    <select
      value={selectedExam?.id || ''}
      onChange={(e) => onSelect(e.target.value)}
      className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
    >
      <option value="">Sélectionner un examen</option>
      {exams.map((exam) => (
        <option key={exam.id} value={exam.id}>
          {exam.title}
        </option>
      ))}
    </select>
  );
}

export default ExamSelector;