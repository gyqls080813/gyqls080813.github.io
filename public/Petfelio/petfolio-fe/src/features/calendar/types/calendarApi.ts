export interface DailyLedger {
  date: string;
  dailyTotal: number;
}

export interface TrendItem {
  day: number;
  cumulativeAmount: number;
}

export interface MonthlyLedgerSummary {
  yearMonth: string;
  monthlyTotalExpense: number;
  topCategory: {
    categoryId: number;
    categoryName: string;
    totalAmount: number;
  } | null;
  lastMonthTrend: TrendItem[];
  currentMonthTrend: TrendItem[];
  days: DailyLedger[];
}

export interface DailyLedgerDetail {
  transactionId: number;
  detailId?: number;
  merchantName: string;
  categoryName: string;
  payerName: string;
  amount: number;
  memo: string;
  petNames: string[];
  stickerImageUrl: string | null;
}
