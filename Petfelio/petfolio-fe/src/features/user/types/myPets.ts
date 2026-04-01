export interface Pet {
  name: string;
  species: 'DOG' | 'CAT';
  breed: string;
  gender: 'MALE' | 'FEMALE';
  weight: number;
}

export interface RegisterPetRequest extends Pet {
  birthdate: string;
  is_neutered: boolean | null;
  memo: string | null;
}