import { http, HttpResponse } from 'msw';

/**
 * 월의 일수에 맞게 랜덤 더미 데이터를 생성
 */
const generateDummyDays = (year, month) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const formattedMonth = String(month).padStart(2, '0');
  const days = [];

  // 대략 40~60%의 날짜에 지출 데이터 생성
  for (let d = 1; d <= daysInMonth; d++) {
    if (Math.random() > 0.5) {
      const formattedDay = String(d).padStart(2, '0');
      const dailyTotal = Math.floor(Math.random() * 8 + 1) * 5000; // 5000 ~ 45000
      days.push({
        date: `${year}-${formattedMonth}-${formattedDay}`,
        dailyTotal,
      });
    }
  }

  return days;
};

export const handlers = [
  /**
   * 월간 가계부 조회 Mock API (GET)
   * GET /api/v1/transactions/ledger/monthly/summary?year=2026&month=3
   */
  http.get('*/api/v1/transactions/ledger/monthly/summary', async ({ request }) => {
    const url = new URL(request.url);
    const year = url.searchParams.get('year');
    const month = url.searchParams.get('month');

    if (!year || !month) {
      return HttpResponse.json(
        { status: 400, message: "year, month parameters are required.", data: null },
        { status: 400 }
      );
    }

    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const formattedMonth = String(monthNum).padStart(2, '0');

    const days = generateDummyDays(yearNum, monthNum);
    const monthlyTotalExpense = days.reduce((sum, d) => sum + d.dailyTotal, 0);

    return HttpResponse.json(
      {
        status: 200,
        message: "조회 성공",
        data: {
          yearMonth: `${year}-${formattedMonth}`,
          monthlyTotalExpense,
          days,
        }
      },
      { status: 200 }
    );
  }),
];
