import React, { useState } from 'react';
import { Plus, Trash } from 'lucide-react';
import { Exam, Exercise, Question } from '../types';

interface ExamConfigProps {
  exams: Exam[];
  onAdd: (exam: Omit<Exam, 'id'>) => void;
  onUpdate: (exam: Exam) => void;
  onDelete: (id: string) => void;
}

function ExamConfig({ exams, onAdd, onUpdate, onDelete }: ExamConfigProps) {
  const [editingExam, setEditingExam] = useState<Partial<Exam>>({});

  const handleAddExercise = () => {
    const exercise: Exercise = {
      id: crypto.randomUUID(),
      title: 'Nouvel exercice',
      totalPoints: 0,
      questions: [],
    };
    setEditingExam(prev => ({
      ...prev,
      exercises: [...(prev.exercises || []), exercise],
    }));
  };

  const handleAddQuestion = (exerciseId: string) => {
    // Get the last question's points or default to 0.75 so next will be 1
    const exercise = editingExam.exercises?.find(ex => ex.id === exerciseId);
    const lastQuestion = exercise?.questions[exercise.questions.length - 1];
    const nextPoints = lastQuestion ? Math.round((lastQuestion.points + 0.25) * 4) / 4 : 1;

    const question: Question = {
      id: crypto.randomUUID(),
      points: nextPoints,
      label: 'Nouvelle question',
    };
    setEditingExam(prev => ({
      ...prev,
      exercises: prev.exercises?.map(ex =>
        ex.id === exerciseId
          ? { ...ex, questions: [...ex.questions, question] }
          : ex
      ),
    }));
  };

  const handleSave = () => {
    if (!editingExam.title || !editingExam.exercises) return;
    
    if (editingExam.id) {
      onUpdate(editingExam as Exam);
    } else {
      onAdd(editingExam as Omit<Exam, 'id'>);
    }
    setEditingExam({});
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Examens</h3>
        <button
          onClick={() => setEditingExam({ title: '', exercises: [] })}
          className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm hover:from-blue-600 hover:to-indigo-600"
        >
          Nouveau
        </button>
      </div>

      {editingExam.title !== undefined ? (
        <div className="space-y-4 border dark:border-gray-700 rounded-lg p-4">
          <input
            type="text"
            value={editingExam.title}
            onChange={e => setEditingExam(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Titre de l'examen"
            className="w-full px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />

          <div className="space-y-4">
            {editingExam.exercises?.map((exercise, exIndex) => (
              <div key={exercise.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={exercise.title}
                    onChange={e => setEditingExam(prev => ({
                      ...prev,
                      exercises: prev.exercises?.map((ex, i) =>
                        i === exIndex ? { ...ex, title: e.target.value } : ex
                      ),
                    }))}
                    placeholder="Titre de l'exercice"
                    className="flex-1 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <button
                    onClick={() => handleAddQuestion(exercise.id)}
                    className="p-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="space-y-2">
                  {exercise.questions.map((question, qIndex) => (
                    <div key={question.id} className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.25"
                        min="0"
                        value={question.points}
                        onChange={e => setEditingExam(prev => ({
                          ...prev,
                          exercises: prev.exercises?.map((ex, i) =>
                            i === exIndex
                              ? {
                                  ...ex,
                                  questions: ex.questions.map((q, j) =>
                                    j === qIndex
                                      ? { ...q, points: parseFloat(e.target.value) }
                                      : q
                                  ),
                                }
                              : ex
                          ),
                        }))}
                        className="w-20 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                      <input
                        type="text"
                        value={question.label}
                        onChange={e => setEditingExam(prev => ({
                          ...prev,
                          exercises: prev.exercises?.map((ex, i) =>
                            i === exIndex
                              ? {
                                  ...ex,
                                  questions: ex.questions.map((q, j) =>
                                    j === qIndex
                                      ? { ...q, label: e.target.value }
                                      : q
                                  ),
                                }
                              : ex
                          ),
                        }))}
                        placeholder="Intitulé de la question"
                        className="flex-1 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                      <button
                        onClick={() => setEditingExam(prev => ({
                          ...prev,
                          exercises: prev.exercises?.map((ex, i) =>
                            i === exIndex
                              ? {
                                  ...ex,
                                  questions: ex.questions.filter((_, j) => j !== qIndex),
                                }
                              : ex
                          ),
                        }))}
                        className="p-1.5 rounded-md bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleAddExercise}
              className="px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm hover:from-emerald-600 hover:to-green-600"
            >
              Ajouter un exercice
            </button>
            <div className="space-x-2">
              <button
                onClick={() => setEditingExam({})}
                className="px-3 py-1.5 rounded-md bg-gray-500 text-white text-sm hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm hover:from-blue-600 hover:to-indigo-600"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {exams.map(exam => (
            <div
              key={exam.id}
              className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg"
            >
              <span className="text-gray-900 dark:text-gray-100">{exam.title}</span>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingExam(exam)}
                  className="px-3 py-1.5 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm hover:from-blue-600 hover:to-indigo-600"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(exam.id)}
                  className="px-3 py-1.5 rounded-md bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm hover:from-red-600 hover:to-rose-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExamConfig;