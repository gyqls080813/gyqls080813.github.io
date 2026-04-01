'use client';

interface HistoryCardProps {
  title: string;
  image: string;
  progress?: number;
  showProgress?: boolean;
}

export default function Netflix({
  title,
  image,
  progress = 0,
  showProgress = true,
}: HistoryCardProps) {

  return (
    <div className="w-full cursor-pointer group">
      <div className={`relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-zinc-800 bg-zinc-800`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {showProgress && (
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-zinc-700/50">
            <div
              className="h-full bg-red-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      <h4 className="font-bold text-white truncate mb-1">{title}</h4>
    </div>
  );
}