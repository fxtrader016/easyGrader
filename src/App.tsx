import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import GradeSection from './components/GradeSection';
import AdjustmentButtons from './components/AdjustmentButtons';
import ThemeToggle from './components/ThemeToggle';
import ExamSelector from './components/ExamSelector';
import ExamConfig from './components/ExamConfig';
import Modal from './components/Modal';
import { useExams } from './hooks/useExams';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [additionalPoints, setAdditionalPoints] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const { selectedExam, exams, selectExam, addExam, updateExam, deleteExam } = useExams();

  useEffect(() => {
    if (exams.length === 0) {
      setIsConfigOpen(true);
    }
  }, [exams]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleReset = () => {
    setScores({});
    setAdditionalPoints(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScoreChange = (id: string, value: number) => {
    setScores(prev => ({ ...prev, [id]: value }));
  };

  const handleAdjustment = (value: number) => {
    setAdditionalPoints(prev => Math.max(-20, Math.min(20, prev + value)));
  };

  const calculateTotal = () => {
    const baseScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    return Math.max(0, Math.min(20, baseScore + additionalPoints));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 transition-colors">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40 transition-colors">
        <div className="max-w-md mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between py-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:text-white">
                EasyGrader
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">by : Mohamed AIT MOUS</p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
              <button
                onClick={() => setIsConfigOpen(true)}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
          {/* Bottom Row */}
          <div className="flex items-center justify-between py-2 border-t dark:border-gray-700">
            <ExamSelector
              exams={exams}
              selectedExam={selectedExam}
              onSelect={selectExam}
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent dark:text-white">
              {calculateTotal().toFixed(2)}/20
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 pt-32">
        {selectedExam?.exercises.map((exercise) => (
          <GradeSection
            key={exercise.id}
            title={exercise.title}
            totalPoints={exercise.totalPoints}
            questions={exercise.questions}
            scores={scores}
            onScoreChange={handleScoreChange}
          />
        ))}
      </div>

      {/* Bottom Adjustment Buttons */}
      <AdjustmentButtons onAdjust={handleAdjustment} onReset={handleReset} />

      {/* Config Modal */}
      <Modal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        title="Configuration des Examens"
      >
        <ExamConfig
          exams={exams}
          onAdd={addExam}
          onUpdate={updateExam}
          onDelete={deleteExam}
        />
      </Modal>
    </div>
  );
}

export default App;