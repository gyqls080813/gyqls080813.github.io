import { Users } from 'lucide-react';

export const ParticipatePeople = ({ current, max }: { current: number; max: number }) => (
  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1">
    <Users className="w-3 h-3" />
    {current?.toLocaleString()}/{max?.toLocaleString()}
  </div>
);

export default ParticipatePeople;