import { Radio, Clock } from 'lucide-react';

export const IsLive = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-black flex items-center gap-1.5 z-20 shadow-md backdrop-blur-sm transition-all duration-500
      ${isActive 
        ? "bg-red-600 text-white" // 라이브일 때: 강렬한 레드
        : "bg-white/90 text-slate-500 border border-slate-200" // 대기 중일 때: 깔끔한 화이트/그레이"
      }`}
    >
      {isActive ? (
        <>
          {/* 라이브 상태를 강조하는 핑 애니메이션 */}
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </div>
          LIVE
        </>
      ) : (
        <>
          {/* 대기 상태를 나타내는 시계 아이콘 */}
          <Clock className="w-3 h-3" /> UPCOMING
        </>
      )}
    </div>
  );
};

export default IsLive;