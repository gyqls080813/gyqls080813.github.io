export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    message: string;
    data: {
        accessToken: string;
        userId: number;
        email: string;
        nickname: string;
        imageUrl: string;
    };
}
