import React from 'react';
import Image from 'next/image';
import type { Tab } from '../types';

import settingImg from '@/shared/components/ui/account/account_boy.png';
import accountWithDogImg from '@/shared/components/ui/account/account_boy3.png';
import groupImg from '@/shared/components/ui/account/account_girl3.png';

const TAB_ICONS: Record<Tab, typeof settingImg> = {
  account: settingImg,
  pet: accountWithDogImg,
  group: groupImg,
};

export const TABS: { id: Tab; label: string }[] = [
  { id: 'account', label: '계정 관리' },
  { id: 'group',   label: '그룹 관리' },
];

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div
      className="mx-4 mt-4 flex items-center rounded-full p-1"
      style={{
        background: 'var(--color-pet-surface, #fff)',
        border: '1px solid var(--color-pet-border, #ede9e3)',
        boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}
    >
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-[0.8em] font-semibold transition-all duration-200 border-none cursor-pointer font-[inherit]"
            style={{
              background: isActive ? 'var(--color-pet-surface, #fff)' : 'transparent',
              color: isActive
                ? 'var(--color-pet-text-dark, #1c1a16)'
                : 'var(--color-pet-text-secondary, #8c7d6e)',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
            }}
          >
            <Image
              src={TAB_ICONS[tab.id]}
              alt=""
              width={22}
              height={22}
              className="object-contain"
              style={{ opacity: isActive ? 1 : 0.5 }}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
