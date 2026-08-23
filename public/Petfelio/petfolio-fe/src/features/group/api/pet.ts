import { request } from '@/api/request';
import { ApiResponse } from '@/types/api';
import { PetRegisterItem, PetRegisterResponse, PetItem, GeneratePetImageRequest, PetDetailData, UpdatePetRequest, LifeCycleResponse, PetImage, UploadPetImageResponse } from '../types/pet';

// 사용자 반려동물 정보 등록
export const registerPet = async (data: PetRegisterItem[]): Promise<PetRegisterResponse> => {
    return request<PetRegisterResponse, PetRegisterItem[]>(
        '/api/v1/pets',
        'POST',
        { body: data }
    );
};

/** 사용자 반려동물 목록 조회 — GET /api/v1/pets */
export const getPets = async () => {
    return request<ApiResponse<PetItem[]>>(
        '/api/v1/pets',
        'GET'
    );
};

/** 반려동물 이미지 생성 — POST /api/pets/generate-image */
export const generatePetImage = async (data: GeneratePetImageRequest): Promise<string> => {
    return request<string, GeneratePetImageRequest>(
        '/api/pets/generate-image',
        'POST',
        { body: data }
    );
};

/** 반려동물 상세 조회 — GET /api/v1/pets/{petId} */
export const getPetDetail = async (petId: number) => {
    return request<ApiResponse<PetDetailData>>(
        `/api/v1/pets/${petId}`,
        'GET'
    );
};

/** 반려동물 삭제 — DELETE /api/v1/pets/{petId} */
export const deletePet = async (petId: number) => {
    return request<ApiResponse<void>>(
        `/api/v1/pets/${petId}`,
        'DELETE'
    );
};

/** 반려동물 정보 수정 — PATCH /api/v1/pets/{petId} */
export const updatePet = async (petId: number, data: UpdatePetRequest) => {
    return request<ApiResponse<void>, UpdatePetRequest>(
        `/api/v1/pets/${petId}`,
        'PATCH',
        { body: data }
    );
};

/** 반려동물 생애주기 (단순 품종/나이 기반) — GET /api/v1/pets/life-cycle */
export const getLifeCycleApi = async (breed: string, age: number): Promise<ApiResponse<LifeCycleResponse>> => {
    const params = new URLSearchParams({
        breed,
        age: age.toString(),
    });

    return await request<ApiResponse<LifeCycleResponse>>(
        `/api/v1/pets/life-cycle?${params.toString()}`,
        'GET'
    );
};

/** 반려동물 생애주기 (petId 기반) — GET /api/v1/pets/life-cycle/{petId} */
export const getLifeCycleByPetIdApi = async (petId: number): Promise<ApiResponse<LifeCycleResponse>> => {
    return await request<ApiResponse<LifeCycleResponse>>(
        `/api/v1/pets/life-cycle/${petId}`,
        'GET'
    );
};

/** 반려동물 생애주기 체크리스트 업데이트 — PUT /api/v1/pets/life-cycle/{petId}/checklists/{lifeStageId} */
import { LifeCycleChecklistUpdateRequest } from '../types/pet';
export const updateLifeCycleChecklistApi = async (
    petId: number, 
    lifeStageId: number, 
    data: LifeCycleChecklistUpdateRequest
): Promise<ApiResponse<Record<string, never>>> => {
    return await request<ApiResponse<Record<string, never>>, LifeCycleChecklistUpdateRequest>(
        `/api/v1/pets/life-cycle/${petId}/checklists/${lifeStageId}`,
        'PUT',
        { body: data }
    );
};

/** 반려동물 이미지(스티커 8개) 조회 — GET /api/v1/pets/{petId}/image */
export const getPetImages = async (petId: number) => {
    return request<ApiResponse<PetImage[]>>(
        `/api/v1/pets/${petId}/image`,
        'GET'
    );
};

/** 반려동물 이미지 업로드 — POST /api/v1/pets/{petId}/image */
export const uploadPetImage = async (petId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return request<ApiResponse<UploadPetImageResponse>, FormData>(
        `/api/v1/pets/${petId}/image`,
        'POST',
        { body: formData }
    );
};

/** 반려동물 이미지 삭제 — DELETE /api/v1/pets/{petId}/image */
export const deletePetImage = async (petId: number) => {
    return request<ApiResponse<void>>(
        `/api/v1/pets/${petId}/image`,
        'DELETE'
    );
};
