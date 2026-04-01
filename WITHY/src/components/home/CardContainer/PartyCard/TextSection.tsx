// src/components/home/CardContainer/PartyCard/TextSection.tsx
import NowPlatform from "./NowPlatform";
import NowGenre from "./NowGenre";
import ParticipatePeople from "./ParticipatePeople";

interface TextSectionProps {
  title: string;
  platform: string;
  genreNames?: string[]; // 데이터가 없을 수 있으므로 선택적으로 변경
  current: number;
  max: number;
}

export default function TextSection({ 
  title, 
  platform, 
  genreNames = [], // 기본값을 빈 배열로 설정
  current, 
  max 
}: TextSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
        {title || "제목 없음"}
      </h3>
      <div className="flex flex-wrap gap-1.5 items-center">
        <NowPlatform platform={platform} />
        
        {/* genreNames가 존재하고 배열일 때만 순회 */}
        {genreNames && genreNames.length > 0 ? (
          genreNames.map((name: string) => (
            <NowGenre key={name} genre={name} />
          ))
        ) : (
          <NowGenre genre="일반" />
        )}
        
        <ParticipatePeople current={current} max={max} />
      </div>
    </div>
  );
}