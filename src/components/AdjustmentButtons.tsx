import React from 'react';
import { RotateCcw } from 'lucide-react';

interface AdjustmentButtonsProps {
  onAdjust: (value: number) => void;
  onReset: () => void;
}

function AdjustmentButtons({ onAdjust, onReset }: AdjustmentButtonsProps) {
  const positiveAdjustments = [
    { value: 0.25, label: '+0.25' },
    { value: 0.5, label: '+0.5' },
    { value: 1, label: '+1' },
  ];

  const negativeAdjustments = [
    { value: -1, label: '-1' },
    { value: -0.5, label: '-0.5' },
    { value: -0.25, label: '-0.25' },
  ];

  const buttonBaseClass = "py-2 px-4 text-sm font-semibold rounded-md text-white transition-colors flex-1";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-md mx-auto px-4 py-3 space-y-3">
        {/* First row: increment/decrement buttons */}
        <div className="grid grid-cols-6 gap-2">
          {negativeAdjustments.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onAdjust(value)}
              className={`${buttonBaseClass} bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600`}
            >
              {label}
            </button>
          ))}
          {positiveAdjustments.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onAdjust(value)}
              className={`${buttonBaseClass} bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Second row: reset button */}
        <button
          onClick={onReset}
          className="w-full py-3 px-4 text-sm font-semibold rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw size={18} />
          <span>Réinitialiser</span>
        </button>
      </div>
    </div>
  );
}

export default AdjustmentButtons;