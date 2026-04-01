import { http, HttpResponse } from 'msw';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const handlers = [
  /**
   * 반려동물 이미지 생성 Mock API (POST)
   * POST /api/pets/generate-image
   */
  http.post(`${BASE_URL}/api/pets/generate-image`, async ({ request }) => {
    const body = await request.json();
    const { petId, breed, imageUrl } = body;

    if (!petId || !breed || !imageUrl) {
      return new HttpResponse(
        "필수 파라미터가 누락되었습니다.",
        { status: 400 }
      );
    }

    // 명세서 상 Response Body 내용 반환 (성공 시 string 문자열 하나)
    return HttpResponse.json("https://example.com/generated-pet-image.png", { status: 200 });
  }),
];
