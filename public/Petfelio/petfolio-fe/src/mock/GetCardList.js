import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('*/api/v1/cards', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '카드 목록을 성공적으로 불러왔습니다.',
        data: [
          {
            cardId: 1,
            cardCompany: '토스뱅크',
            cardName: '토스 체크카드',
            maskedCardNo: '5234-****-****-1234',
            validThru: '12/28',
            monthlyTxCount: 15,
            balance: 669994,
          },
          {
            cardId: 2,
            cardCompany: '우리은행',
            cardName: '우리 카드의정석',
            maskedCardNo: '9401-****-****-7856',
            validThru: '06/29',
            monthlyTxCount: 20,
            balance: 198500,
          },
        ],
      },
      { status: 200 }
    );
  }),
];
