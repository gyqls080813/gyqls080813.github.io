import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('*/api/v1/pets/:petId', async ({ params }) => {
    const { petId } = params;

    return HttpResponse.json(
      {
        status: 200,
        message: "GET - 상세 정보 불러오기를 성공했습니다.",
        data: {
          id: Number(petId),
          name: Number(petId) === 1 ? "초코" : "쿠키",
          gender: Number(petId) === 1 ? "MALE" : "FEMALE",
          species: "DOG",
          breed: Number(petId) === 1 ? "Poodle" : "Maltese",
          birthdate: Number(petId) === 1 ? "2024-05-12" : "2023-09-03",
          weight: Number(petId) === 1 ? 5.45 : 3.8,
          is_neutered: true,
          memo: Number(petId) === 1 ? "겁이 많고 간식을 아주 좋아함. 예방접종 완료." : "",
          created_at: "2025-10-01T10:00:00Z"
        }
      },
      { status: 200 }
    );
  }),

  http.patch('*/api/v1/pets/:petId', async ({ params, request }) => {
    const { petId } = params;
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json(
        { status: 404, message: "사용자 정보를 읽어올 수 없습니다." },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        message: "PATCH - 정보가 성공적으로 수정되었습니다.",
        data: {
            id: Number(petId),
            name: "초코라떼",
            gender: "MALE",
            species: "DOG",
            breed: "Poodle",
            birthdate: "2024-05-12",
            weight: 5.8,
            is_neutered: true,
            memo: "최근 몸무게가 늘어 식단 조절 중",
            updated_at: "2026-03-10T12:30:00Z"
        }
      },
      { status: 200 }
    );
  })
];