import React from 'react';
import { Question } from '../types';

interface PointSelectorProps {
  question: Question;
  value: number;
  onChange: (value: number) => void;
}

function PointSelector({ question, value, onChange }: PointSelectorProps) {
  const getPoints = () => {
    const points = [];
    const step = question.points / 4; // Always create 5 buttons
    for (let i = 0; i <= 4; i++) {
      points.push(i * step);
    }
    return points;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">{question.points} Pts</span>
        <span className="text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          {value}
        </span>
      </div>
      <div className="text-sm text-gray-800 dark:text-gray-200 mb-3">{question.label}</div>
      <div className="grid grid-cols-5 gap-1">
        {getPoints().map((points) => (
          <button
            key={points}
            onClick={() => onChange(points)}
            className={`px-2 py-1.5 text-sm rounded-md transition-all ${
              value === points
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {points.toFixed(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PointSelector;