export interface responseCheckOnboarding {
    status: number;
    message: string;
    data: null;
}

export interface CheckOnboardingInput {
}

export const CHECKONBOARDING_KEYS = {
    all: ['user'] as const,
};