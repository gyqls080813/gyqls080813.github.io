export const NowPlatform = ({ platform }: { platform: string }) => {
  const bgColor = platform === 'YOUTUBE' ? 'bg-[#FF0000]' : 'bg-[#E50914]';
  return (
    <div className={`px-2 py-0.5 rounded-md text-white text-[10px] font-bold shadow-sm ${bgColor}`}>
      {platform}
    </div>
  );
};

export default NowPlatform;