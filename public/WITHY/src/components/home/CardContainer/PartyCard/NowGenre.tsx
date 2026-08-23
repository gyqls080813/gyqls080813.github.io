export const NowGenre = ({ genre }: { genre: string }) => (
  <div className="px-2 py-0.5 rounded-md bg-white text-black text-[10px] font-bold shadow-sm">
    {genre}
  </div>
);

export default NowGenre;