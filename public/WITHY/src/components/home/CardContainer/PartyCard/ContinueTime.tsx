// src/components/home/CardContainer/PartyCard/ContinueTime.tsx
export default function ContinueTime({ isActive, accumulatedTime }: any) {
  // 초 단위 데이터를 분 단위로 변환
  const playMinutes = Math.floor((accumulatedTime || 0) / 60);

  return (
    <div className="text-xs font-bold">
      {isActive ? (
        <span className="text-destructive flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
          {playMinutes}분째 상영 중
        </span>
      ) : (
        <span className="text-muted-foreground">
          📅 시작 예정
        </span>
      )}
    </div>
  );
}