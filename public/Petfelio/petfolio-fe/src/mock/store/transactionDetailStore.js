// Shared mutable store for transaction detail classifications.
// All CRUD mock handlers reference this single store so changes persist across requests.

const CATEGORY_MAP = {
  1: '사료', 2: '미용', 3: '용품', 4: '펫시터', 5: '간식', 6: '병원', 99: '기타',
};

const store = {
  // Card 1
  101: [
    { categoryId: 1, categoryName: '사료', amount: 45000, memo: '로얄캐닌 사료', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 25000 }, { petId: 2, petName: '쿠키', allocatedAmount: 20000 }] },
    { categoryId: 5, categoryName: '간식', amount: 20000, memo: '간식 추가 구매', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 20000 }] },
  ],
  102: [
    { categoryId: 2, categoryName: '미용', amount: 35000, memo: '목욕+미용', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 35000 }] },
    { categoryId: 2, categoryName: '미용', amount: 20000, memo: '발톱 정리', petAllocations: [{ petId: 2, petName: '쿠키', allocatedAmount: 20000 }] },
  ],
  103: [
    { categoryId: 3, categoryName: '용품', amount: 32000, memo: '하네스+리드줄', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 18000 }, { petId: 2, petName: '쿠키', allocatedAmount: 14000 }] },
  ],
  104: [
    { categoryId: 4, categoryName: '펫시터', amount: 80000, memo: '주말 돌봄', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 40000 }, { petId: 2, petName: '쿠키', allocatedAmount: 40000 }] },
  ],
  105: [
    { categoryId: 99, categoryName: '기타', amount: 5500, memo: '커피', petAllocations: [] },
  ],
  106: [
    { categoryId: 6, categoryName: '병원', amount: 80000, memo: '건강검진', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 80000 }] },
    { categoryId: 6, categoryName: '병원', amount: 40000, memo: '예방접종', petAllocations: [{ petId: 2, petName: '쿠키', allocatedAmount: 40000 }] },
  ],
  109: [
    { categoryId: 5, categoryName: '간식', amount: 12500, memo: '덴탈껌', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 7000 }, { petId: 2, petName: '쿠키', allocatedAmount: 5500 }] },
  ],
  110: [
    { categoryId: 2, categoryName: '미용', amount: 45000, memo: '전체 미용', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 45000 }] },
  ],
  111: [
    { categoryId: 99, categoryName: '기타', amount: 23000, memo: '생활용품', petAllocations: [] },
  ],
  112: [
    { categoryId: 6, categoryName: '병원', amount: 55000, memo: '정기 검진', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 30000 }, { petId: 2, petName: '쿠키', allocatedAmount: 25000 }] },
  ],
  113: [
    { categoryId: 1, categoryName: '사료', amount: 32000, memo: '건식 사료', petAllocations: [{ petId: 2, petName: '쿠키', allocatedAmount: 32000 }] },
  ],
  114: [
    { categoryId: 3, categoryName: '용품', amount: 18900, memo: '장난감+배변패드', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 10000 }, { petId: 2, petName: '쿠키', allocatedAmount: 8900 }] },
  ],
  115: [
    { categoryId: 99, categoryName: '기타', amount: 67000, memo: '장보기', petAllocations: [] },
  ],
  // Card 2
  201: [
    { categoryId: 6, categoryName: '병원', amount: 70000, memo: '수술비', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 70000 }] },
    { categoryId: 6, categoryName: '병원', amount: 50000, memo: '약값', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 50000 }] },
  ],
  202: [
    { categoryId: 99, categoryName: '기타', amount: 43000, memo: '생필품', petAllocations: [] },
  ],
  203: [
    { categoryId: 3, categoryName: '용품', amount: 28000, memo: '매트+방석', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 15000 }, { petId: 2, petName: '쿠키', allocatedAmount: 13000 }] },
  ],
  205: [
    { categoryId: 1, categoryName: '사료', amount: 78000, memo: '대용량 사료', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 40000 }, { petId: 2, petName: '쿠키', allocatedAmount: 38000 }] },
  ],
  206: [
    { categoryId: 2, categoryName: '미용', amount: 60000, memo: '스파+미용', petAllocations: [{ petId: 2, petName: '쿠키', allocatedAmount: 60000 }] },
  ],
  208: [
    { categoryId: 4, categoryName: '펫시터', amount: 90000, memo: '출장 돌봄', petAllocations: [{ petId: 1, petName: '초코', allocatedAmount: 45000 }, { petId: 2, petName: '쿠키', allocatedAmount: 45000 }] },
  ],
  209: [
    { categoryId: 5, categoryName: '간식', amount: 9800, memo: '강아지 간식', petAllocations: [{ petId: 2, petName: '쿠키', allocatedAmount: 9800 }] },
  ],
};

export function getClassifications(transactionId) {
  return store[transactionId] || [];
}

export function setClassifications(transactionId, classifications) {
  const mapped = classifications.map(c => ({
    ...c,
    categoryName: c.categoryName || CATEGORY_MAP[c.categoryId] || '기타',
  }));
  store[transactionId] = mapped;
}

export function deleteClassifications(transactionId) {
  delete store[transactionId];
}

export function hasClassifications(transactionId) {
  return (store[transactionId] || []).length > 0;
}
