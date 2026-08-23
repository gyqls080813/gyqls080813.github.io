export interface RegisterCardRequest {
  cardNo: string;
  cvc: string;
  cardNickname: string;
  cardValidityPeriod: string;
}

export interface CardItem {
  cardId: number;
  cardCompany: string;
  cardName: string;
  maskedCardNo: string;
  validThru?: string;
  monthlyTransactionCount?: number;
  balance?: number;
  getMonthlyTotalCount?: number;   // 이번달 총 지출 금액 (원)
  getMonthlyTotalAmount?: number;  // 이번달 총 거래 건수
  cardNickname?: string;           // 카드 별명
}
