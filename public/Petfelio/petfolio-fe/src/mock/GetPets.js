import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const handlers = [
  /**
   * 사용자 반려동물 목록 조회 Mock API (GET)
   * GET /api/v1/pets
   */
  http.get(`${BASE_URL}/api/v1/pets`, async () => {
    return HttpResponse.json(
      { 
        status: 200, 
        message: "성공", 
        data: [
          {
            id: 1,
            name: "초코",
            species: "DOG",
            breed: "푸들",
            gender: "MALE",
            weight: 4.5
          },
          {
            id: 2,
            name: "나비",
            species: "CAT",
            breed: "코리안 숏헤어",
            gender: "FEMALE",
            weight: 3.2
          },
          {
            id: 3,
            name: "치즈",
            species: "CAT",
            breed: "코리안 숏헤어",
            gender: "FEMALE",
            weight: 4.2
          }
        ]
      },
      { status: 200 }
    );
  }),
];
