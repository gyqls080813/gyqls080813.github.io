import React from 'react';

export interface Transaction {
  id: string;
  date: string;
  store: string;
  amount: number;
  category: string;
  time: string;
  isPet: boolean;
  pets: string[];
}

export interface TransactionGroup {
  dateLabel: string;
  transactions: Transaction[];
}

export interface TransactionHistoryListProps {
  data: Transaction[] | TransactionGroup[];
  emptyMessage?: string;
  animated?: boolean;
  headerRight?: React.ReactNode;
  onRowClick?: (tx: Transaction) => void;
  className?: string;
}

export interface DateHeaderProps {
  label: string;
}

export interface TransactionRowProps {
  transaction: Transaction;
  index: number;
  animated?: boolean;
  onClick?: (tx: Transaction) => void;
}

export interface HistoryHeaderProps {
  title?: string;
  right?: React.ReactNode;
}

export interface MiniDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
}
