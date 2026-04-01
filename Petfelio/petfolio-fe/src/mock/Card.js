import { http, HttpResponse } from 'msw';

let nextCardId = 100;

export const handlers = [

  http.post('*/api/v1/cards', async ({ request }) => {
    const body = await request.json();
    const cardId = ++nextCardId;

    return HttpResponse.json(
      {
        status: 200,
        message: '카드 등록에 성공했습니다.',
        data: {
          cardId,
          cardCompany: body.bankName || '알 수 없음',
          cardName: body.cardName || `${body.bankName || ''} 카드`,
          maskedCardNo: body.cardNo || '****-****-****-****',
          validThru: body.validThru || '12/30',
          monthlyTxCount: 0,
          balance: 0,
        },
      },
      { status: 200 }
    );
  }),
];
