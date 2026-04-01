export interface CreateConsumableRequest {
  categoryId: number;
  name: string;
  purchaseCycleDays: number;
  lastPurchaseDate: string;
  nextPurchaseDate: string;
  purchaseUrl: string;
  petIds: number[];
}

export interface CreateConsumableResponse {
  consumableId: number;
}

export interface ConsumableItem {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  purchaseCycleDays: number;
  lastPurchaseDate: string;
  nextPurchaseDate: string;
  purchaseUrl: string;
}

export interface ConsumablePet {
  petId: number;
  petName: string;
}

export interface ConsumableDetailData {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  purchaseCycleDays: number;
  lastPurchaseDate: string;
  nextPurchaseDate: string;
  purchaseUrl: string;
  pets: ConsumablePet[];
}

export interface UpdateConsumableRequest {
  categoryId: number;
  name: string;
  purchaseCycleDays: number;
  lastPurchaseDate: string;
  nextPurchaseDate: string;
  purchaseUrl: string;
  petIds: number[];
}
