import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('*/api/v1/categories', async () => {

    return HttpResponse.json(
      {
        status: 200,
        message: "조회 성공",
        data: [
          { categoryId: 1, categoryName: "사료" },
          { categoryId: 2, categoryName: "간식" },
          { categoryId: 3, categoryName: "병원" },
          { categoryId: 4, categoryName: "미용" },
          { categoryId: 5, categoryName: "장난감" },
          { categoryId: 6, categoryName: "용품" },
          { categoryId: 7, categoryName: "펫시터" },
          { categoryId: 8, categoryName: "기타" }
        ]
      },
      { status: 200 }
    );
  }),
];
