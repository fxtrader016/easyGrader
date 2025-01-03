import { useState, useEffect } from 'react';
import { ExamState, Exam } from '../types';
import { DEFAULT_EXAMS } from '../data/defaultExams';
import { supabase } from '../lib/supabase';

export function useExams() {
  const [state, setState] = useState<ExamState>(() => ({
    selectedExamId: null,
    exams: DEFAULT_EXAMS,
  }));

  // Load exams from Supabase on mount
  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setState(prev => ({
          ...prev,
          exams: data as Exam[],
          selectedExamId: data[0].id // Select most recent exam by default
        }));
      }
    } catch (error) {
      console.error('Error loading exams:', error);
      // Fallback to default exams if there's an error
      setState(prev => ({
        ...prev,
        exams: DEFAULT_EXAMS,
        selectedExamId: DEFAULT_EXAMS[0].id
      }));
    }
  };

  const addExam = async (exam: Omit<Exam, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('exams')
        .insert([exam])
        .select()
        .single();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        exams: [data as Exam, ...prev.exams],
        selectedExamId: data.id
      }));
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  const updateExam = async (exam: Exam) => {
    try {
      const { error } = await supabase
        .from('exams')
        .update(exam)
        .eq('id', exam.id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        exams: prev.exams.map(e => e.id === exam.id ? exam : e),
      }));
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  const deleteExam = async (id: string) => {
    try {
      const { error } = await supabase
        .from('exams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setState(prev => {
        const newExams = prev.exams.filter(e => e.id !== id);
        return {
          ...prev,
          exams: newExams,
          selectedExamId: prev.selectedExamId === id ? (newExams[0]?.id || null) : prev.selectedExamId,
        };
      });
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  const selectExam = (id: string | null) => {
    setState(prev => ({
      ...prev,
      selectedExamId: id,
    }));
  };

  return {
    selectedExam: state.exams.find(e => e.id === state.selectedExamId),
    exams: state.exams,
    addExam,
    updateExam,
    deleteExam,
    selectExam,
  };
}