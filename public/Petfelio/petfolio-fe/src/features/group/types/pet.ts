export interface PetRegisterItem {
    name: string;
    gender: 'MALE' | 'FEMALE';
    species: 'DOG' | 'CAT';
    breed: string;
    birthdate: string;
    weight: number;
    memo: string;
    is_neutered: boolean;
}

export type PetRegisterRequest = PetRegisterItem[];

export interface PetRegisterResponseItem {
    id: number;
    name: string;
    species: 'DOG' | 'CAT';
    breed: string;
    gender: 'MALE' | 'FEMALE';
    weight: number;
}

export interface PetRegisterResponse {
    status: number;
    message: string;
    data: PetRegisterResponseItem[];
}

export interface PetItem {
    id: number;
    name: string;
    species: 'DOG' | 'CAT';
    breed: string;
    gender: 'MALE' | 'FEMALE';
    weight: number;
    imageUrl?: string;
}

export interface GeneratePetImageRequest {
    petId: number;
    breed: string;
    imageUrl: string;
}

export interface PetDetailData extends PetRegisterItem {
    id: number;
    created_at: string;
    image_url?: string;    // API 응답 필드 (snake_case)
    imageUrl?: string;     // 프론트 편의용 alias
}

export type UpdatePetRequest = Partial<PetRegisterItem> & { image_url?: string };

export interface LifeCycleRequest {
    breed: string;
    age: number;
}

export interface LifeCycleResponse {
    currentStageName: string;
    lifeStages: {
        lifeStageId: number;
        stageName: string;
        ageRange: string;
        petMessage: {
            headline: string;
            detail: string;
        };
        checklist: {
            category: string;
            description: string;
            isChecked: boolean;
        }[];
        stageSummary: string;
    }[];
}

export interface LifeCycleChecklistUpdateRequest {
    statuses: {
        category: string;
        isChecked: boolean;
    }[];
}

export interface PetImage {
    categoryId: number;
    imageUrl: string;
}

export interface UploadPetImageResponse {
    url: string;
    jobId: string;
}
