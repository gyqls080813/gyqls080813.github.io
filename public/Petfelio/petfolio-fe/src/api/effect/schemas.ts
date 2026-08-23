/**
 * Effect-TS 기반 API 응답 스키마 정의
 *
 * @effect/schema (현재 effect에 통합)를 사용해 런타임 타입 검증
 * → API 응답이 예상 형식과 다르면 ParseError로 잡힘
 */
import { Schema } from 'effect';

// ─── 공통 API 응답 래퍼 ───
export const ApiResponseSchema = <T>(dataSchema: Schema.Schema<T>) =>
  Schema.Struct({
    status: Schema.Number,
    message: Schema.String,
    data: dataSchema,
  });

// ─── 가계부 관련 스키마 ───
export const DaySummaryItem = Schema.Struct({
  date: Schema.String,
  dailyTotal: Schema.Number,
});

export const MonthlyLedgerSummaryData = Schema.Struct({
  yearMonth: Schema.String,
  days: Schema.Array(DaySummaryItem),
});

export const MonthlyLedgerSummaryResponse = ApiResponseSchema(MonthlyLedgerSummaryData);

// ─── 대시보드 관련 스키마 ───
export const CategoryExpenseItem = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  amount: Schema.Number,
});

export const PetExpenseItem = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  amount: Schema.Number,
});

export const DashboardMonthlySummaryData = Schema.Struct({
  yearMonth: Schema.String,
  monthlyTotalExpense: Schema.Number,
  categoryExpenses: Schema.Array(CategoryExpenseItem),
  petExpenses: Schema.Array(PetExpenseItem),
  commonExpense: Schema.Number,
});

export const DashboardMonthlySummaryResponse = ApiResponseSchema(DashboardMonthlySummaryData);

// ─── 소모품 관련 스키마 ───
export const ConsumableItemSchema = Schema.Struct({
  consumableId: Schema.Number,
  name: Schema.String,
  purchaseDate: Schema.String,
  replaceCycle: Schema.Number,
  memo: Schema.optional(Schema.String),
});

export const ConsumablesResponse = ApiResponseSchema(Schema.Array(ConsumableItemSchema));

// ─── 거래 내역 스키마 ───
export const TransactionItemSchema = Schema.Struct({
  transactionId: Schema.Number,
  cardId: Schema.Number,
  storeName: Schema.String,
  amount: Schema.Number,
  transactionDate: Schema.String,
  transactionTime: Schema.String,
  isClassified: Schema.Boolean,
  isPetExpense: Schema.Boolean,
});

export const TransactionListData = Schema.Struct({
  transactions: Schema.Array(TransactionItemSchema),
  totalPages: Schema.Number,
  currentPage: Schema.Number,
});

export const TransactionListResponse = ApiResponseSchema(TransactionListData);
