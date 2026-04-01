import React from 'react';
import { Square, CheckSquare } from 'lucide-react';
import { Box } from '@/shared/components/common/Box';
import { Paragraph } from '@/shared/components/common/Paragraph';
import { Badge } from '@/shared/components/common/Badge';


export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  isChecked: boolean;
}

export interface SavingsChecklistProps {
  title?: string;
  items: ChecklistItem[];
  onToggle?: (id: string) => void;
  className?: string;
}

export const SavingsChecklist: React.FC<SavingsChecklistProps> = ({
  title = '필수 체크리스트 목록',
  items,
  onToggle,
  className = '',
}) => {
  const completedCount = items.filter((item) => item.isChecked).length;
  const totalCount = items.length;

  return (
    <Box direction="column" gap="medium" className={`w-full ${className}`}>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <Box direction="row" alignItems="center" justifyContent="space-between" className="px-1">
        <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-xl shadow-sm border border-white/50">
          <Paragraph typography="t5" fontWeight="bold" color="grey800">
            {title}
          </Paragraph>
        </div>
        <Badge size="medium" color="grey" variant="fill" className="!bg-[#333] !text-white !rounded-full py-1.5 px-4 font-bold shadow-sm">
          {completedCount} / {totalCount} 완료
        </Badge>
      </Box>

      <Box direction="column" gap="small">
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => onToggle?.(item.id)}
            style={{ 
              animation: 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', 
              animationDelay: `${index * 0.08}s`, 
              opacity: 0 
            }}
            className={`
              flex items-center gap-4 p-5 rounded-2xl border-[1.5px]
              cursor-pointer transition-all duration-300
              ${
                item.isChecked
                  ? 'bg-[#F0FDF4]/80 border-[#bbf7d0] shadow-sm backdrop-blur-sm'
                  : 'bg-white/70 border-white hover:bg-white hover:shadow-md hover:border-[#bfdbfe] backdrop-blur-sm shadow-sm'
              }
            `}
          >
            <div className="shrink-0 transition-transform duration-200 hover:scale-110">
              {item.isChecked ? (
                <CheckSquare className="w-7 h-7 text-[#10B981]" />
              ) : (
                <Square className="w-7 h-7 text-gray-300 hover:text-gray-400" />
              )}
            </div>

            <Box direction="column" gap="none" className="flex-1">
              <Paragraph
                typography="st5"
                fontWeight="bold"
                color={item.isChecked ? 'grey800' : 'grey800'}
                className={`transition-colors duration-200 ${item.isChecked ? 'text-[#059669]' : ''}`}
              >
                {item.label}
              </Paragraph>
              <Paragraph
                typography="st7"
                color={item.isChecked ? 'grey600' : 'grey500'}
                className="leading-relaxed mt-1"
              >
                {item.description}
              </Paragraph>
            </Box>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default SavingsChecklist;
