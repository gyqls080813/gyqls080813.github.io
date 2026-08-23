import { http, HttpResponse } from 'msw';

export const handlers = [

  http.post('*/api/v1/pets', async ({ request }) => {
    const body = await request.json();

    const pets = Array.isArray(body) ? body : [body];

    const responseData = pets.map((pet, idx) => ({
      id: idx + 1,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      gender: pet.gender,
      weight: pet.weight,
    }));

    return HttpResponse.json(
      {
        status: 200,
        message: "POST - 반려동물 정보 등록에 성공했습니다.",
        data: responseData,
      },
      { status: 200 }
    );
  }),

  http.get('*/api/v1/pets', async ({ request }) => {
    return HttpResponse.json(
      {
        status: 200,
        message: "GET - 상세 정보 불러오기를 성공했습니다.",
        data: [
          {
            id: 1,
            name: "초코",
            species: "DOG",
            breed: "Poodle",
            gender: "MALE",
            weight: 5.5
          },
          {
            id: 2,
            name: "쿠키",
            species: "DOG",
            breed: "Maltese",
            gender: "FEMALE",
            weight: 3.8
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