import { http, HttpResponse } from 'msw';

export const handlers = [
  /**
   * 반려동물 이미지 업로드 Mock API
   * POST /api/v1/pets/{petId}/image
   * Content-Type: multipart/form-data (file)
   */
  http.post('*/api/v1/pets/:petId/image', async ({ params }) => {
    const { petId } = params;
    return HttpResponse.json(
      {
        status: 200,
        message: '성공',
        data: {
          url: `https://example.com/pets/${petId}/profile.png`,
        },
      },
      { status: 200 }
    );
  }),

  /**
   * 반려동물 이미지 삭제 Mock API
   * DELETE /api/v1/pets/{petId}/image
   */
  http.delete('*/api/v1/pets/:petId/image', async () => {
    return HttpResponse.json(
      {
        status: 200,
        message: '성공',
        data: {},
      },
      { status: 200 }
    );
  }),
];
