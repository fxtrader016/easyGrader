import { Exam } from '../types';

export const DEFAULT_EXAMS: Exam[] = [
  {
    id: 'ev3-excel',
    title: 'EV3 EXCEL',
    exercises: [
      {
        id: 'ex1',
        title: 'EXERCICE 01',
        totalPoints: 12,
        questions: [
          { id: 'km', points: 2, label: 'Nombre de kilomètres' },
          { id: 'litres', points: 2, label: 'Nombre de litres' },
          { id: 'cout_jour', points: 2, label: 'Coût / Jour en DH' },
          { id: 'cout_semaine', points: 2, label: 'Coût / Semaine en DH' },
          { id: 'total_dh', points: 1, label: 'Total en DH' },
          { id: 'total_km', points: 1.5, label: 'Total de Kilomètres' },
          { id: 'total_litres', points: 1.5, label: 'Total de litres' },
        ],
      },
      {
        id: 'ex2',
        title: 'EXERCICE 02',
        totalPoints: 8,
        questions: [
          { id: 'prix_total', points: 1.5, label: 'Prix Total (DH)' },
          { id: 'stock_final', points: 1.5, label: 'Stock Final' },
          { id: 'nb_produits', points: 1, label: 'Nombre de produits dans le tableau' },
          { id: 'prix_max', points: 1, label: 'Le prix maximal' },
          { id: 'prix_min', points: 1, label: 'Le prix minimal' },
          { id: 'total_ventes', points: 1, label: 'Total de ventes (DH)' },
          { id: 'total_stock', points: 1, label: 'Total des produits restants dans le stock' },
        ],
      },
    ],
  },
];