"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function SplashScreen() {
    const router = useRouter();
    const [animateToTop, setAnimateToTop] = useState(false);

    useEffect(() => {
        // 1. 3초간 플리커링 대기 후
        const flickerTimer = setTimeout(() => {
            setAnimateToTop(true); // 위로 이동 시작
        }, 3000);

        // 2. 이동 애니메이션(약 1.5초) 종료 후 페이지 이동
        const redirectTimer = setTimeout(() => {
            router.replace('/login');
        }, 4500);

        return () => {
            clearTimeout(flickerTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* 
                Center Container that animates to Top 
                Initial: Center, Scale 1
                Animate: Top position (approx), Scale 0.35 
                Matching the Login page's header style
            */}
            <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={animateToTop ? { y: -280, scale: 0.35 } : { y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }} // Slower, smoother spring
                className="relative flex flex-col items-center"
            >
                {/* 1. Character & Logo Group */}
                <div className="relative w-[600px] h-[600px]">
                    <div className="absolute inset-0 z-10 animate-chr-sync">
                        <Image
                            src="/withy/Withy_chr.png"
                            alt="Withy Character"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 z-20 animate-red-neon ml-4">
                        <Image
                            src="/withy/Withy_logo.png"
                            alt="Withy Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* 2. Text */}
                <div className="mt-[-40px] z-30 white-neon-glow">
                    <p className="text-white text-3xl font-black tracking-[0.25em] uppercase italic">
                        Watch with WITHY
                    </p>
                </div>
            </motion.div>
        </div>
    );
}