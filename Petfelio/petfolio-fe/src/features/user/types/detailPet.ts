export interface detailPet {
    id: number,
    name: string,
    gender: "MALE" | "FEMALE",
    species: "DOG" | "CAT",
    breed: string,
    birthdate: string,
    weight: number,
    is_neutered: boolean,
    memo: string,
    created_at: string,
}

export interface PatchDetailPet {
    name: string,
    weight: number,
    memo: string,
}