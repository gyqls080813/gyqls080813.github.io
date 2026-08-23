import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import homeIcon from '@/shared/components/ui/menu/dog_home.png';
import payIcon from '@/shared/components/ui/menu/dog_pay.png';
import accountbookIcon from '@/shared/components/ui/menu/dog_account_expendables.png';
import healthcareIcon from '@/shared/components/ui/menu/dog_healty.png';
import reportIcon from '@/shared/components/ui/menu/dog_account_report.png';
import suppliesIcon from '@/shared/components/ui/menu/dog_account_supplies.png';
import accountIcon from '@/shared/components/ui/account/account_boy.png';
import logoImg from '@/shared/components/ui/category/logo_dog_cat.png';

interface LayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { label: '홈', href: '/home', pngIcon: homeIcon },
    { label: '거래관리', href: '/account', pngIcon: payIcon },
    { label: '가계부', href: '/ledger', pngIcon: accountbookIcon },
    { label: '반려동물', href: '/health', pngIcon: healthcareIcon },
    { label: '소모품', href: '/supplies', pngIcon: suppliesIcon },
    { label: '리포트', href: '/report', pngIcon: reportIcon },
];

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[var(--color-pet-layout-bg)] pb-[80px] font-[Pretendard,'Noto_Sans_KR',-apple-system,sans-serif]">


            <header className="sticky top-0 z-50 bg-[var(--color-pet-header-bg)] border-b border-[var(--color-pet-header-border)] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image src={logoImg} alt="logo" width={28} height={28} className="object-contain" priority />
                    <span className="text-[1.05em] font-extrabold text-[var(--color-pet-header-text)] tracking-tight">
                        Petfolio
                    </span>
                </div>
                <div className="flex items-center gap-3.5">
                    <button
                        onClick={() => router.push('/mypage')}
                        className="w-[34px] h-[34px] rounded-full overflow-hidden border-2 border-[var(--color-pet-border)] cursor-pointer p-0 bg-[var(--color-pet-surface)] flex items-center justify-center shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                        type="button"
                        aria-label="마이페이지"
                    >
                        <Image
                            src={accountIcon}
                            alt="프로필"
                            width={34}
                            height={34}
                            className="object-cover rounded-full"
                        />
                    </button>
                </div>
            </header>

            <main className="relative px-4 pt-3 pb-4">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-pet-header-bg)] border-t border-[var(--color-pet-header-border)] flex justify-around items-center h-[74px] z-50 px-2">
                {navItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}
                            className="flex flex-col items-center gap-1 no-underline py-1.5 min-w-[54px]">
                            <Image
                                src={item.pngIcon}
                                alt={item.label}
                                width={30}
                                height={30}
                                className="object-contain transition-opacity duration-150"
                                style={{ opacity: isActive ? 1 : 0.4 }}
                            />
                            <span
                                className="text-[0.72em] mt-0.5"
                                style={{
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? 'var(--color-pet-header-text)' : 'var(--color-pet-text-muted)',
                                }}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
