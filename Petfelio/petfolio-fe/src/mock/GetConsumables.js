import { http, HttpResponse } from 'msw';

export const handlers = [

  http.get('*/api/v1/consumables', async () => {

    return HttpResponse.json(
      {
        status: 200,
        message: "소비재 목록을 성공적으로 불러왔습니다.",
        data: [
          {
            id: 1,
            categoryId: 1,
            categoryName: "사료/간식",
            name: "오리젠 퍼피 사료 11.4kg",
            purchaseCycleDays: 40,
            lastPurchaseDate: "2026-03-05",
            nextPurchaseDate: "2026-04-14",
            purchaseUrl: "https://example.com/item/1"
          },
          {
            id: 2,
            categoryId: 1,
            categoryName: "사료/간식",
            name: "져키 간식 (소고기)",
            purchaseCycleDays: 14,
            lastPurchaseDate: "2026-03-15",
            nextPurchaseDate: "2026-03-29",
            purchaseUrl: "https://example.com/item/2"
          },
          {
            id: 3,
            categoryId: 2,
            categoryName: "위생/소모품",
            name: "고양이 모래 (후드형)",
            purchaseCycleDays: 21,
            lastPurchaseDate: "2026-03-10",
            nextPurchaseDate: "2026-03-31",
            purchaseUrl: "https://example.com/item/3"
          },
          {
            id: 4,
            categoryId: 3,
            categoryName: "약/영양제",
            name: "관절 영양제 (조인트에이드)",
            purchaseCycleDays: 60,
            lastPurchaseDate: "2026-02-01",
            nextPurchaseDate: "2026-04-02",
            purchaseUrl: "https://example.com/item/4"
          },
          {
            id: 5,
            categoryId: 3,
            categoryName: "약/영양제",
            name: "넥스가드 스펙트라 (예방약)",
            purchaseCycleDays: 30,
            lastPurchaseDate: "2026-03-01",
            nextPurchaseDate: "2026-03-31",
            purchaseUrl: "https://example.com/item/5"
          },
          {
            id: 6,
            categoryId: 4,
            categoryName: "장난감",
            name: "강아지 삑삑이 장난감",
            purchaseCycleDays: 90,
            lastPurchaseDate: "2026-01-15",
            nextPurchaseDate: "2026-04-15",
            purchaseUrl: "https://example.com/item/6"
          },
          {
            id: 7,
            categoryId: 2,
            categoryName: "위생/소모품",
            name: "배변 패드 (100매)",
            purchaseCycleDays: 30,
            lastPurchaseDate: "2026-02-25",
            nextPurchaseDate: "2026-03-27",
            purchaseUrl: "https://example.com/item/7"
          },
          {
            id: 8,
            categoryId: 1,
            categoryName: "사료/간식",
            name: "로얄캐닌 인도어 4kg",
            purchaseCycleDays: 35,
            lastPurchaseDate: "2026-02-20",
            nextPurchaseDate: "2026-03-27",
            purchaseUrl: "https://example.com/item/8"
          }
        ]
      },
      { status: 200 }
    );
  }),
];
