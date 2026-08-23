import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useSearchCategory } from '@/hooks/home/SearchCategory';
import { CATEGORY_CODES } from '@/constants/home/CallCategory';

interface NavSectionProps {
  title: string;
  label: string;
  isOpen: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  currentFilter: string;
  onFilterChange: (platform: string, category?: string, label?: string) => void;
  getBtnStyle: (isActive: boolean) => string;
}

export const NavSection = ({
  title, label, isOpen, isExpanded, onToggle, currentFilter, onFilterChange, getBtnStyle,
}: NavSectionProps) => {
  // 섹션이 펼쳐졌을 때만 해당 플랫폼의 장르 호출 -> 이제 Dashboard에서 처리하므로 삭제하거나 무시
  // const { data: fetchedGenres = [], isLoading } = useSearchCategory(title, isExpanded);

  return (
    <div className="space-y-1">
      {isOpen ? (
        <>
          <button
            onClick={() => {
              // 이제 펼치지 않고 바로 선택
              // onToggle();
              onFilterChange(title, undefined, label);
            }}
            className={`w-full flex items-center justify-between px-2 h-10 rounded-xl transition-all duration-300 ${currentFilter === label ? "bg-transparent text-white font-bold" : "text-neutral-500 hover:bg-neutral-900/50 hover:text-neutral-300"}`}
          >
            {/* 🎯 서버에서 온 글자 그대로 출력 */}
            <div className="flex items-center gap-3">
              {/* Logo Box: Fixed w-10 h-10 container for alignment consistency */}
              {(title === 'YOUTUBE' || title === 'OTT') && (
                <div className={`w-10 h-10 min-w-[40px] rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${currentFilter === label ? "bg-neutral-800" : "bg-transparent"}`}>
                  <img
                    src={title === 'YOUTUBE' ? "/logo/Youtube.png" : "/logo/NETFLIX.png"}
                    alt={title}
                    className="h-5 w-5 object-contain"
                  />
                </div>
              )}
              <span className="font-semibold text-sm">{label}</span>
            </div>
          </button>

          {/* Category List removed from here */}

        </>
      ) : (
        <button
          onClick={() => onFilterChange(title, undefined, label)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 mx-auto ${currentFilter === label ? "bg-neutral-800" : "bg-transparent"}`}
          title={label}
        >
          {/* 아이콘 표시 */}
          {title === 'YOUTUBE' ? (
            <img src="/logo/Youtube.png" alt="YouTube" className="h-5 w-5 object-contain" />
          ) : title === 'OTT' ? (
            <img src="/logo/NETFLIX.png" alt="Netflix" className="h-5 w-5 object-contain" />
          ) : (
            <span className="text-xs font-bold">{label[0]}</span>
          )}
        </button>
      )
      }
    </div >
  );
};
