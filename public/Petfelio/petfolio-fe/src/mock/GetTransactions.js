import { http, HttpResponse } from 'msw';
import { hasClassifications } from './store/transactionDetailStore';
import { getPetExpense } from './store/petExpenseStore';

const TX_DATA = {
  '1': [
    { transactionId: 101, transactionDate: '2026-03-22T09:00:00Z', merchantName: '로얄캐닌', amount: 65000, categoryId: 1, categoryName: '사료', isPetExpense: true, isClassified: true },
    { transactionId: 102, transactionDate: '2026-03-22T13:00:00Z', merchantName: '펫살롱', amount: 55000, categoryId: 2, categoryName: '미용', isPetExpense: true, isClassified: true },
    { transactionId: 103, transactionDate: '2026-03-21T10:30:00Z', merchantName: '펫프렌즈', amount: 32000, categoryId: 3, categoryName: '용품', isPetExpense: true, isClassified: true },
    { transactionId: 104, transactionDate: '2026-03-21T15:00:00Z', merchantName: '멍멍시터', amount: 80000, categoryId: 4, categoryName: '펫시터', isPetExpense: true, isClassified: true },
    { transactionId: 105, transactionDate: '2026-03-20T11:20:00Z', merchantName: '스타벅스', amount: 5500, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: true },
    { transactionId: 106, transactionDate: '2026-03-19T14:00:00Z', merchantName: '동물병원', amount: 120000, categoryId: 6, categoryName: '병원', isPetExpense: true, isClassified: true },
    { transactionId: 107, transactionDate: '2026-03-18T20:38:00Z', merchantName: 'SG*JUSTDONE.COM', amount: 30358, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: false },
    { transactionId: 108, transactionDate: '2026-03-17T19:30:00Z', merchantName: '탕화쿵푸마라탕', amount: 5900, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: false },
    { transactionId: 109, transactionDate: '2026-03-15T11:00:00Z', merchantName: '쿠팡', amount: 12500, categoryId: 5, categoryName: '간식', isPetExpense: true, isClassified: true },
    { transactionId: 110, transactionDate: '2026-03-14T16:00:00Z', merchantName: '펫살롱', amount: 45000, categoryId: 2, categoryName: '미용', isPetExpense: true, isClassified: true },
    { transactionId: 111, transactionDate: '2026-03-12T09:00:00Z', merchantName: '올리브영', amount: 23000, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: true },
    { transactionId: 112, transactionDate: '2026-03-10T14:00:00Z', merchantName: '바른동물병원', amount: 55000, categoryId: 6, categoryName: '병원', isPetExpense: true, isClassified: true },
    { transactionId: 113, transactionDate: '2026-03-08T10:30:00Z', merchantName: '펫마트', amount: 32000, categoryId: 1, categoryName: '사료', isPetExpense: true, isClassified: true },
    { transactionId: 114, transactionDate: '2026-03-05T17:00:00Z', merchantName: '네이버페이', amount: 18900, categoryId: 3, categoryName: '용품', isPetExpense: true, isClassified: true },
    { transactionId: 115, transactionDate: '2026-03-02T12:00:00Z', merchantName: '이마트', amount: 67000, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: true },
  ],
  '2': [
    { transactionId: 201, transactionDate: '2026-03-22T11:00:00Z', merchantName: '동물병원', amount: 120000, categoryId: 6, categoryName: '병원', isPetExpense: true, isClassified: true },
    { transactionId: 202, transactionDate: '2026-03-22T14:30:00Z', merchantName: '홈플러스', amount: 43000, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: true },
    { transactionId: 203, transactionDate: '2026-03-21T09:00:00Z', merchantName: '펫프렌즈', amount: 28000, categoryId: 3, categoryName: '용품', isPetExpense: true, isClassified: true },
    { transactionId: 204, transactionDate: '2026-03-20T18:00:00Z', merchantName: '배달의민족', amount: 21000, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: false },
    { transactionId: 205, transactionDate: '2026-03-20T10:00:00Z', merchantName: '로얄캐닌', amount: 78000, categoryId: 1, categoryName: '사료', isPetExpense: true, isClassified: true },
    { transactionId: 206, transactionDate: '2026-03-19T15:00:00Z', merchantName: '펫살롱 강남점', amount: 60000, categoryId: 2, categoryName: '미용', isPetExpense: true, isClassified: true },
    { transactionId: 207, transactionDate: '2026-03-18T12:00:00Z', merchantName: '교보문고', amount: 15800, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: false },
    { transactionId: 208, transactionDate: '2026-03-17T16:30:00Z', merchantName: '멍멍시터', amount: 90000, categoryId: 4, categoryName: '펫시터', isPetExpense: true, isClassified: true },
    { transactionId: 209, transactionDate: '2026-03-16T11:00:00Z', merchantName: '쿠팡', amount: 9800, categoryId: 5, categoryName: '간식', isPetExpense: true, isClassified: true },
    { transactionId: 210, transactionDate: '2026-03-15T20:00:00Z', merchantName: 'GS25', amount: 3200, categoryId: 99, categoryName: '기타', isPetExpense: false, isClassified: false },
  ],
};

export const handlers = [
  http.get('*/api/v1/transactions/:cardId/transactions', async ({ params, request }) => {
    const { cardId } = params;

    if (!cardId) {
      return HttpResponse.json(
        { status: 400, message: 'cardId is required.', data: null },
        { status: 400 }
      );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);

    const allContent = TX_DATA[cardId] || [];
    const start = page * size;
    const end = start + size;
    const content = allContent.slice(start, end).map(tx => ({
      ...tx,
      isClassified: hasClassifications(tx.transactionId),
      isPetExpense: getPetExpense(tx.transactionId, tx.isPetExpense),
    }));
    const hasNext = end < allContent.length;

    return HttpResponse.json(
      {
        status: 200,
        message: '거래 내역 목록을 성공적으로 불러왔습니다.',
        data: {
          content,
          hasNext,
        },
      },
      { status: 200 }
    );
  }),
];
