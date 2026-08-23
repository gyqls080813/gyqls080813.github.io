import React from 'react';
import TransactionEditForm from './TransactionEditForm';
import TransactionAddForm from './TransactionAddForm';
import type { TransactionItem, TransactionFormProps } from '../types';

const TransactionForm: React.FC<TransactionFormProps> = (props) => {
  const { mode, transaction, dateString, categoryOptions, petList, onSave, onCancel } = props;

  if (mode === 'edit' && transaction) {
    return (
      <TransactionEditForm
        transaction={transaction}
        categoryOptions={categoryOptions}
        petList={petList}
        onSave={onSave}
        onCancel={onCancel}
      />
    );
  }

  return (
    <TransactionAddForm
      dateString={dateString ?? ''}
      categoryOptions={categoryOptions}
      petList={petList}
      onSave={(data) => {

        onSave({
          id: `new-${Date.now()}`,
          store: '',
          category: data.category || '기타',
          amount: data.amount || 0,
          time: new Date().toTimeString().slice(0, 5),
          isPet: true,
          pets: data.pets || [],
          recordedBy: '',
          items: (data as any).items,
        } as any);
      }}
      onCancel={onCancel}
    />
  );
};

TransactionForm.displayName = 'TransactionForm';
export default TransactionForm;
