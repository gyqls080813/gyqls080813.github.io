import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 대시보드 요약 정보 Mock API
   * GET /api/v1/dashboard/summary
   */
  http.get('*/api/v1/dashboard/summary', () => {
    return HttpResponse.json({
      status: 200,
      message: '대시보드 조회 성공',
      data: {
        // 카테고리별 지출 (레이더 차트)
        categorySpending: {
          data: [43, 24, 11, 8, 7, 7],
          labels: ['사료', '병원/의료', '미용', '약/영양제', '용품', '간식'],
        },
        // 지출 분석 (정규분포)
        spendingAnalysis: {
          mySpending: 222250,
          averageSpending: 185000,
          standardDeviation: 40000,
          comparisonCount: 12480,
          topPercentage: 25,
        },
        // 이번 달 요약
        monthlySummary: {
          totalSpending: 585800,
          petCount: 2,
          transactionCount: 47,
        },
        // 랭킹
        ranking: [
          {
            rank: 1,
            name: '꼬러비',
            imageUrl: 'https://i.pravatar.cc/200?img=1',
            totalAmount: 1040000,
            spending: 690000,
          },
          {
            rank: 2,
            name: '민수아빠',
            imageUrl: 'https://i.pravatar.cc/200?img=3',
            totalAmount: 427000,
            spending: 247000,
          },
          {
            rank: 3,
            name: '초코맘',
            imageUrl: 'https://i.pravatar.cc/200?img=5',
            totalAmount: 203000,
            spending: 123000,
          },
        ],
      },
    }, { status: 200 });
  }),

  /**
   * 특정 달 카테고리 및 펫별 통계 조회
   * GET /api/v1/dashboard/monthly/summary?year=&month=
   */
  http.get('*/api/v1/dashboard/monthly/summary', ({ request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get('year') || '2026';
    const month = url.searchParams.get('month') || '3';
    return HttpResponse.json({
      status: 200,
      message: '월별 통계 조회 성공',
      data: {
        yearMonth: `${year}-${String(month).padStart(2, '0')}`,
        monthlyTotalExpense: 585800,
        categoryExpenses: [
          { id: 1, name: '사료', amount: 252000 },
          { id: 2, name: '병원/의료', amount: 140000 },
          { id: 3, name: '미용', amount: 65000 },
          { id: 4, name: '약/영양제', amount: 48000 },
          { id: 5, name: '용품', amount: 42800 },
          { id: 6, name: '간식', amount: 38000 },
        ],
        petExpenses: [
          { id: 1, name: '초코', amount: 287300 },
          { id: 2, name: '쿠키', amount: 198500 },
        ],
        commonExpense: 100000,
      },
    }, { status: 200 });
  }),

  /**
   * 특정 달 펫별 상세 지출 조회
   * GET /api/v1/dashboard/monthly/pets-detail?year=&month=
   */
  http.get('*/api/v1/dashboard/monthly/pets-detail', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json({
      status: 200,
      message: '펫별 상세 지출 조회 성공',
      data: [
        {
          petId: 1,
          petName: '초코',
          totalAmount: 287300,
          categoryDetails: [
            { categoryId: 1, categoryName: '사료', amount: 135000 },
            { categoryId: 2, categoryName: '병원/의료', amount: 85000 },
            { categoryId: 3, categoryName: '미용', amount: 35000 },
            { categoryId: 6, categoryName: '간식', amount: 32300 },
          ],
        },
        {
          petId: 2,
          petName: '쿠키',
          totalAmount: 198500,
          categoryDetails: [
            { categoryId: 1, categoryName: '사료', amount: 117000 },
            { categoryId: 2, categoryName: '병원/의료', amount: 55000 },
            { categoryId: 4, categoryName: '약/영양제', amount: 26500 },
          ],
        },
      ],
    }, { status: 200 });
  }),

  /**
   * 이번 달 그룹원 결제 랭킹 조회
   * GET /api/v1/dashboard/members/rank
   */
  http.get('*/api/v1/dashboard/members/rank', () => {
    return HttpResponse.json({
      status: 200,
      message: '랭킹 조회 성공',
      data: [
        {
          userId: 1,
          name: '꼬러비',
          nickname: '꼬러비',
          profileImageUrl: 'https://i.pravatar.cc/200?img=1',
          totalAmount: 1040000,
          rank: 1,
        },
        {
          userId: 2,
          name: '민수아빠',
          nickname: '민수아빠',
          profileImageUrl: 'https://i.pravatar.cc/200?img=3',
          totalAmount: 427000,
          rank: 2,
        },
        {
          userId: 3,
          name: '초코맘',
          nickname: '초코맘',
          profileImageUrl: 'https://i.pravatar.cc/200?img=5',
          totalAmount: 203000,
          rank: 3,
        },
      ],
    }, { status: 200 });
  }),
];

