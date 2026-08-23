export interface TransactionItem {
  id: string;
  store: string;
  amount: number;
  category: string;
  time: string;
  isPet: boolean;
  pets: string[];
  recordedBy?: string;
  categoryColor?: string;
  iconSrc?: string;
  subItems?: SubItem[];
}

export interface TransactionListProps {
  transactions: TransactionItem[];
  categoryIcons?: Record<string, string>;
  onEdit?: (tx: TransactionItem) => void;
  onDelete?: (txId: string) => void;
  className?: string;
}

export interface TransactionHeaderProps {
  currentDate: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  onClose: () => void;
  onAdd?: () => void;
}

export interface RatioItem {
  label: string;
  amount: number;
  color: string;
}

export interface TransactionRatioBarProps {
  items: RatioItem[];
  totalAmount?: number;
  topN?: number;
  className?: string;
}

export interface TransactionProps {
  dateString?: string;
  transactionsByDate: Record<string, TransactionItem[]>;
  categoryColors: Record<string, string>;
  categoryIcons?: Record<string, string>;
  onClose: () => void;
  onAdd?: () => void;
  onEdit?: (tx: TransactionItem) => void;
  onDelete?: (txId: string) => void;
  onDateChange?: (newDate: string) => void;
  className?: string;
}

export interface TransactionEditFormProps {
  transaction: TransactionItem;
  categoryOptions: string[];
  petList: { id: number; name: string }[];
  onSave: (updated: TransactionItem) => void;
  onCancel: () => void;
}

export interface TransactionAddFormProps {
  dateString?: string;
  categoryOptions: string[];
  petList: { id: number; name: string }[];
  initialAmount?: number;
  initialItems?: SubItem[];
  maxAmount?: number;
  merchantName?: string;
  hideHeader?: boolean;
  onSave: (data: { date?: string; category?: string; pets?: number[]; amount?: number; items: Omit<SubItem, 'id'>[] }) => void;
  onCancel: () => void;
}

export interface TransactionFormProps {
  mode: 'add' | 'edit';

  transaction?: TransactionItem;

  dateString?: string;
  categoryOptions: string[];
  petList: { id: number; name: string }[];
  onSave: (data: TransactionItem) => void;
  onCancel: () => void;
}

export interface SubItem {
  id: string;
  what: string;
  whom: number[];
  amount: number;
}
