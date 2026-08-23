import { http, HttpResponse } from 'msw';

/**
 * 거래 단위 더미 데이터
 * 하나의 거래 = 한 사람이 한 가맹점에서 여러 품목을 구매
 * detailId가 같은 묶음 = 같은 거래
 */

// 거래 템플릿: 한 거래에 여러 품목이 포함됨
const TRANSACTION_TEMPLATES = [
  {
    merchantName: '펫마트',
    payerName: '엄마',
    items: [
      { categoryName: '사료', petNames: ['초코'], amount: 32000, memo: '프리미엄 사료' },
      { categoryName: '간식', petNames: ['나비'], amount: 8000, memo: '수제 간식 세트' },
      { categoryName: '용품', petNames: ['초코', '나비'], amount: 15000, memo: '산책줄 교체' },
    ],
  },
  {
    merchantName: '동물병원',
    payerName: '아빠',
    items: [
      { categoryName: '병원', petNames: ['초코'], amount: 55000, memo: '종합백신 접종' },
      { categoryName: '병원', petNames: ['나비'], amount: 35000, memo: '건강검진' },
    ],
  },
  {
    merchantName: '쿠팡',
    payerName: '꼬러비',
    items: [
      { categoryName: '간식', petNames: ['초코'], amount: 12000, memo: '훈련용 간식' },
      { categoryName: '사료', petNames: ['나비'], amount: 25000, memo: '습식사료 주문' },
    ],
  },
  {
    merchantName: '다이소',
    payerName: '동생',
    items: [
      { categoryName: '장난감', petNames: ['초코'], amount: 9800, memo: '삑삑이 장난감' },
      { categoryName: '용품', petNames: ['나비'], amount: 5500, memo: '밥그릇 교체' },
      { categoryName: '장난감', petNames: ['나비'], amount: 3500, memo: '공 장난감' },
    ],
  },
  {
    merchantName: '그루밍샵',
    payerName: '누나',
    items: [
      { categoryName: '미용', petNames: ['초코'], amount: 45000, memo: '전체 미용 + 발톱' },
      { categoryName: '미용', petNames: ['나비'], amount: 35000, memo: '목욕 + 브러싱' },
    ],
  },
  {
    merchantName: '이마트',
    payerName: '엄마',
    items: [
      { categoryName: '간식', petNames: ['초코', '나비'], amount: 18000, memo: '치즈 간식 세트' },
      { categoryName: '사료', petNames: ['초코'], amount: 42000, memo: '건식사료 대용량' },
    ],
  },
  {
    merchantName: '멍카페',
    payerName: '꼬러비',
    items: [
      { categoryName: '카페', petNames: ['초코', '나비'], amount: 15000, memo: '반려견 동반 카페' },
    ],
  },
  {
    merchantName: '펫프렌즈',
    payerName: '아빠',
    items: [
      { categoryName: '용품', petNames: ['초코'], amount: 28000, memo: '하네스 + 리드줄' },
      { categoryName: '간식', petNames: ['나비'], amount: 9500, memo: '동결건조 간식' },
    ],
  },
  {
    merchantName: '동물병원',
    payerName: '누나',
    items: [
      { categoryName: '병원', petNames: ['초코', '나비'], amount: 120000, memo: '정기 건강검진' },
    ],
  },
  {
    merchantName: '쿠팡',
    payerName: '동생',
    items: [
      { categoryName: '용품', petNames: ['초코'], amount: 8900, memo: '반려견 패드' },
      { categoryName: '사료', petNames: ['나비'], amount: 35000, memo: '유기농 사료' },
      { categoryName: '간식', petNames: ['초코', '나비'], amount: 6000, memo: '덴탈껌' },
    ],
  },
];

const generateDailyDetails = (date) => {
  const seed = date.split('-').reduce((a, b) => a + parseInt(b, 10), 0);

  // 하루에 2~4개 거래 선택
  const txCount = (seed % 3) + 2;
  const details = [];
  let detailId = 1;

  for (let t = 0; t < txCount; t++) {
    const templateIdx = (seed + t * 3) % TRANSACTION_TEMPLATES.length;
    const tx = TRANSACTION_TEMPLATES[templateIdx];

    // 거래 내 각 품목을 개별 detail로 생성
    for (const item of tx.items) {
      // 금액에 약간의 변동성 추가 (시드 기반)
      const variation = ((seed + detailId) % 5) * 1000 - 2000;
      const adjustedAmount = Math.max(1000, item.amount + variation);

      details.push({
        detailId: detailId++,
        merchantName: tx.merchantName,
        categoryName: item.categoryName,
        payerName: tx.payerName,
        amount: adjustedAmount,
        memo: item.memo,
        petNames: item.petNames,
        stickerImageUrl: `https://example.com/sticker${detailId}.png`,
      });
    }
  }

  return details;
};

export const handlers = [
  http.get('*/api/v1/transactions/ledger/daily', async ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');

    if (!date) {
      return HttpResponse.json(
        { status: 400, message: 'date parameter is required.', data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: '조회 성공',
        data: generateDailyDetails(date),
      },
      { status: 200 }
    );
  }),
];
