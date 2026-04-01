// src/components/home/CardContainer/PartyCard/PostSection.tsx
import { IsLive } from "./IsLive";
import ParticipatePeople from "./ParticipatePeople";
import NowGenre from "./NowGenre";
import NowPlatform from "./NowPlatform";

export const PostSection = ({ party }: { party: any }) => (
  // h-52와 relative를 통해 이 영역 안에서만 absolute 요소들이 움직이게 합니다.
  <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-slate-100">
    <img
      src={party?.thumbnail || "/default-poster.png"}
      alt={party?.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    
    {/* 배지들을 이 컨테이너 안으로 확실히 귀속시킵니다. */}
    <IsLive isActive={party?.isActive} />
    <ParticipatePeople current={party?.currentParticipants} max={party?.maxParticipants} />
    
    <div className="absolute bottom-3 left-3 flex gap-1.5">
      <NowGenre genre={party?.genreNames?.[0] || "일반"} />
      <NowPlatform platform={party?.platform} />
    </div>
  </div>
);

export default PostSection;