'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface GuestOnlyGuardProps {
    children: React.ReactNode;
}

export default function GuestOnlyGuard({ children }: GuestOnlyGuardProps) {
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);

    const accessToken = useAuthStore((state) => state.accessToken);

    useEffect(() => {
        if (accessToken) {
            router.replace('/home');
        } else {
            setIsChecked(true);
        }
    }, [accessToken, router]);

    if (!isChecked || accessToken) {
        return null;
    }

    return <>{children}</>;
}