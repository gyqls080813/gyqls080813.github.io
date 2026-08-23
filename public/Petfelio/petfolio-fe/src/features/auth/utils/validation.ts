export const validateEmail = (email: string): string | null => {
    if (!email.trim()) return '이메일을 입력해주세요.';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return '올바른 이메일 형식이 아닙니다.';
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return '비밀번호를 입력해주세요.';
    if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
    if (password.length > 20) return '비밀번호는 20자 이하여야 합니다.';

    let count = 0;
    if (/[a-zA-Z]/.test(password)) count++;
    if (/[0-9]/.test(password)) count++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) count++;

    if (count < 2) return '영문, 숫자, 특수문자 중 2가지 이상 포함해주세요.';
    return null;
};

export const validateName = (name: string): string | null => {
    if (!name.trim()) return '이름을 입력해주세요.';
    if (name.trim().length < 2) return '이름은 2자 이상이어야 합니다.';
    return null;
};

export const validateNickname = (nickname: string): string | null => {
    if (!nickname.trim()) return '닉네임을 입력해주세요.';
    if (nickname.trim().length < 2) return '닉네임은 2자 이상이어야 합니다.';
    if (nickname.trim().length > 10) return '닉네임은 10자 이하여야 합니다.';
    return null;
};
