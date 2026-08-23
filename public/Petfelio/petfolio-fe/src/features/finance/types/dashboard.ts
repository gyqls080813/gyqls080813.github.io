import type { RankingEntry } from '@/features/finance';

export interface DashboardData {
  categorySpending: {
    data: number[];
    labels: string[];
  };
  spendingAnalysis: {
    mySpending: number;
    averageSpending: number;
    standardDeviation: number;
    topPercentage: number;
    zScore: number;
    breedName: string;
    breedAverage: number;
    speciesName: string;
    speciesAverage: number;
  };
  monthlySummary: {
    totalSpending: number;
    petCount: number;
    transactionCount: number;
  };
  ranking: RankingEntry[];
}
