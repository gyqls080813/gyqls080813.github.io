// ==========================================
// API 응답 타입 (거래 목록)
// ==========================================
// NOTE: UI용 TransactionItem은 ../types.ts에 별도 정의

export interface TransactionListItem {
  transactionId: number;
  transactionDate: string;
  merchantName: string;
  amount: number;
  categoryId: number | null;
  categoryName: string | null;
  isPetExpense: boolean;
  isClassified: boolean;
  isAiClassified: boolean;
}

export interface TransactionListResponse {
  content: TransactionListItem[];
  hasNext: boolean;
}

export interface LedgerDailySummary {
  date: string; // YYYY-MM-DD
  dailyTotal: number;
}

export interface MonthlyLedgerSummaryResponse {
  yearMonth: string; // YYYY-MM
  monthlyTotalExpense: number;
  days: LedgerDailySummary[];
}

export interface LedgerDailyDetailItem {
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
