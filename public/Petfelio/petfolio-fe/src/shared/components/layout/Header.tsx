import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Menu } from '@/shared/components/ui/icon';
import { THEMES, useTheme } from '@/shared/context/ThemeContext';
import { useUser } from '@/features/user/context/UserContext';
import accountIcon from '@/shared/components/ui/account/account.png';
import logoImg from '@/shared/components/ui/category/logo_dog_cat.png';

const pageTitles: Record<string, string> = {
    '/': '홈',
    '/account': '거래 관리',
    '/ledger': '가계부',
    '/health': '반려동물 관리',
    '/report': '리포트',
    '/supplies': '소모품',
};

interface HeaderProps {
    onToggle: () => void;
}

export default function Header({ onToggle }: HeaderProps) {
    const router = useRouter();
    const title = pageTitles[router.pathname] ?? 'Petfolio';
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsThemeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const currentTheme = THEMES.find(t => t.name === theme)!;

    return (
        <header className="fixed top-0 left-0 w-full flex items-center h-14 z-[60] bg-[var(--color-pet-header-bg)] border-b border-[var(--color-pet-header-border)] transition-colors duration-300">

            <div className="flex-shrink-0 flex justify-center items-center w-16">
                <button
                    onClick={onToggle}
                    className="p-1.5 bg-transparent border-0 cursor-pointer transition-colors text-[var(--color-pet-sidebar-icon)] outline-none appearance-none"
                    aria-label="메뉴 토글"
                    type="button"
                >
                    <Menu size="medium" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <Image src={logoImg} alt="logo" width={34} height={34} className="object-contain" priority />
                <h2 className="text-xl font-bold text-[var(--color-pet-header-text)]">
                    Petfolio
                </h2>
            </div>

            <div className="flex-1 text-center ml-4">
                <span className="text-lg font-semibold text-[var(--color-pet-header-text)]">
                    {title}
                </span>
            </div>

            <div className="relative mr-2" ref={dropdownRef}>
                <button
                    onClick={() => setIsThemeOpen(!isThemeOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-transparent border border-[var(--color-pet-header-border)] cursor-pointer transition-all duration-200 hover:shadow-sm outline-none appearance-none"
                    type="button"
                    aria-label="테마 변경"
                >
                    <span className="text-base">{currentTheme.emoji}</span>
                    <span
                        className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                        style={{ backgroundColor: currentTheme.preview }}
                    />
                </button>

                {isThemeOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden min-w-[180px] z-[100] animate-in fade-in slide-in-from-top-2">
                        <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">테마 선택</p>
                        </div>
                        {THEMES.map((t) => (
                            <button
                                key={t.name}
                                onClick={() => {
                                    setTheme(t.name);
                                    setIsThemeOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 border-0 cursor-pointer transition-colors outline-none appearance-none
                                    ${theme === t.name ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
                                type="button"
                            >
                                <span className="text-lg">{t.emoji}</span>
                                <span
                                    className="w-5 h-5 rounded-full shadow-sm border border-white/80"
                                    style={{ backgroundColor: t.preview }}
                                />
                                <span className="text-sm font-medium text-gray-700">{t.label}</span>
                                {theme === t.name && (
                                    <span className="ml-auto text-sm">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* 마이페이지 버튼 */}
            <div className="mr-3">
                <button
                    onClick={() => router.push('/mypage')}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-transparent hover:bg-gray-100/50 border border-transparent cursor-pointer transition-colors outline-none appearance-none"
                    type="button"
                    aria-label="마이페이지"
                >
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gray-200 shadow-sm bg-[#9c57bd]">
                        {user?.imageUrl ? (
                            <img
                                src={user.imageUrl}
                                alt="프로필"
                                className="w-full h-full object-cover"
                            />
                        ) : user?.nickname ? (
                            <span className="text-[11px] font-bold text-white tracking-widest">
                                {user.nickname.substring(0, 2).toUpperCase()}
                            </span>
                        ) : (
                            <Image
                                src={accountIcon}
                                alt="프로필"
                                width={32}
                                height={32}
                                style={{ objectFit: 'cover' }}
                            />
                        )}
                    </div>
                    <span className="text-[15px] font-semibold text-[var(--color-pet-header-text)] truncate max-w-[100px]">
                        {user?.nickname || '사용자'}
                    </span>
                </button>
            </div>
        </header>
    );
}
