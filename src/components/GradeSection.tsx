import React from 'react';
import { Question } from '../types';
import PointSelector from './PointSelector';

interface GradeSectionProps {
  title: string;
  totalPoints: number;
  questions: Question[];
  scores: Record<string, number>;
  onScoreChange: (id: string, value: number) => void;
}

function GradeSection({ title, totalPoints, questions, scores, onScoreChange }: GradeSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4">
        {title} : {totalPoints} Points
      </h2>
      <div className="space-y-4">
        {questions.map((question) => (
          <PointSelector
            key={question.id}
            question={question}
            value={scores[question.id] || 0}
            onChange={(value) => onScoreChange(question.id, value)}
          />
        ))}
      </div>
    </div>
  );
}

export default GradeSection;