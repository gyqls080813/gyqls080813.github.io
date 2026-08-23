import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const handlers = [
  /**
   * 반려동물 상세 조회 Mock API (GET)
   * GET /api/v1/pets/:petId
   */
  http.get(`${BASE_URL}/api/v1/pets/:petId`, async ({ params }) => {
    const { petId } = params;
    const id = Number(petId) || 1;
    let detail = {
      id: id,
      name: "초코",
      gender: "MALE",
      species: "DOG",
      breed: "푸들",
      birthdate: "2020-01-01",
      weight: 4.5,
      memo: "알레르기 있음",
      is_neutered: true,
      created_at: "2023-10-01T12:00:00Z"
    };

    if (id === 2) {
      detail = { ...detail, name: "쿠키", gender: "FEMALE", breed: "말티즈", weight: 3.8, birthdate: "2021-05-01" };
    } else if (id === 3) {
      detail = { ...detail, name: "치즈", species: "CAT", gender: "FEMALE", breed: "코리안 숏헤어", weight: 4.2, birthdate: "2022-03-15", memo: "츄르 좋아함" };
    }

    // 가상의 반려동물 상세 정보 응답 (ID 연동)
    return HttpResponse.json(
      {
        status: 200,
        message: "성공",
        data: detail
      },
      { status: 200 }
    );
  }),
];
