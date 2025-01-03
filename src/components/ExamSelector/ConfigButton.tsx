import React from 'react';
import { Settings } from 'lucide-react';

interface ConfigButtonProps {
  onOpenConfig: () => void;
}

function ConfigButton({ onOpenConfig }: ConfigButtonProps) {
  return (
    <button
      onClick={onOpenConfig}
      className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Configurer les examens"
    >
      <Settings size={20} />
    </button>
  );
}

export default ConfigButton;