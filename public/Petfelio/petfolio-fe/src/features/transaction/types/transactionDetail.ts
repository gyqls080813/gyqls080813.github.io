export interface PetAllocation {
  petId: number;
  allocatedAmount: number;
}

export interface TransactionClassification {
  categoryId: number;
  amount: number;
  memo: string;
  petAllocations: PetAllocation[];
}

export interface TransactionDetailsRequest {
  classifications: TransactionClassification[];
}

export interface PetDetailAllocation extends PetAllocation {
  petName: string;
}

export interface TransactionDetailClassification extends Omit<TransactionClassification, 'petAllocations'> {
  categoryName: string;
  petAllocations: PetDetailAllocation[];
}

export interface TransactionDetailData {
  transactionId: number;
  classifications: TransactionDetailClassification[];
}

export interface UpdatePetExpenseRequest {
  isPetExpense: boolean;
}
