export interface SignUpRequest {
    name: string;
    nickname: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    status: number;
    message: string;
    data: {
        userId: number;
        email: string;
        accessToken: string;
    };
}
