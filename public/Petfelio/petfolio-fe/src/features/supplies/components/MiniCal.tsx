import React, { useState } from 'react';

const DAYS_KR = ['일','월','화','수','목','금','토'];

const strip = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const fmt = (d: Date) =>
  [ d.getFullYear(),
    String(d.getMonth()+1).padStart(2,'0'),
    String(d.getDate()).padStart(2,'0'),
  ].join('-');
const parse = (s: string) => { const p = s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2]); };

interface MiniCalProps {
  value: string;
  onChange: (v: string) => void;
}

export const MiniCal: React.FC<MiniCalProps> = ({ value, onChange }) => {
  const sel = parse(value);
  const [viewY, setViewY] = useState(sel.getFullYear());
  const [viewM, setViewM] = useState(sel.getMonth());

  const first = new Date(viewY, viewM, 1).getDay();
  const last = new Date(viewY, viewM + 1, 0).getDate();
  const prevLast = new Date(viewY, viewM, 0).getDate();
  const todayStr = fmt(strip(new Date()));

  const cells: { day: number; cur: boolean; dateStr: string }[] = [];
  for (let i = first - 1; i >= 0; i--) {
    const d = prevLast - i;
    const pm = viewM === 0 ? 11 : viewM - 1;
    const py = viewM === 0 ? viewY - 1 : viewY;
    cells.push({ day: d, cur: false, dateStr: fmt(new Date(py, pm, d)) });
  }
  for (let d = 1; d <= last; d++) {
    cells.push({ day: d, cur: true, dateStr: fmt(new Date(viewY, viewM, d)) });
  }
  const rem = 7 - (cells.length % 7);
  if (rem < 7) for (let d = 1; d <= rem; d++) {
    const nm = viewM === 11 ? 0 : viewM + 1;
    const ny = viewM === 11 ? viewY + 1 : viewY;
    cells.push({ day: d, cur: false, dateStr: fmt(new Date(ny, nm, d)) });
  }

  const prev = () => { if (viewM === 0) { setViewM(11); setViewY(viewY-1); } else setViewM(viewM-1); };
  const next = () => { if (viewM === 11) { setViewM(0); setViewY(viewY+1); } else setViewM(viewM+1); };

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-2">
        <button type="button" onClick={prev} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border-none text-[var(--color-pet-text-dim)] cursor-pointer text-[16px] hover:bg-[var(--color-pet-input-bg)] transition-colors">‹</button>
        <span className="text-[14px] font-bold text-[var(--color-pet-text-dark)]">{viewY}년 {viewM + 1}월</span>
        <button type="button" onClick={next} className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border-none text-[var(--color-pet-text-dim)] cursor-pointer text-[16px] hover:bg-[var(--color-pet-input-bg)] transition-colors">›</button>
      </div>
      <div className="grid grid-cols-7 text-center mb-1">
        {DAYS_KR.map((d, i) => (
          <div key={d} className="text-[11px] font-semibold py-1"
            style={{ color: i === 0 ? '#FF3B30' : i === 6 ? '#007AFF' : 'var(--color-pet-text-secondary)' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px">
        {cells.map(c => {
          const isSel = c.dateStr === value;
          const isToday = c.dateStr === todayStr;
          return (
            <button key={c.dateStr} type="button" onClick={() => onChange(c.dateStr)}
              className="flex items-center justify-center h-[36px] rounded-[10px] border-none cursor-pointer transition-all duration-150"
              style={{
                background: isSel ? '#3182f6' : isToday ? '#f0f4ff' : 'transparent',
                color: isSel ? '#fff' : !c.cur ? 'var(--color-pet-text-dim)' : 'var(--color-pet-text-dark)',
                fontSize: 13,
                fontWeight: isSel || isToday ? 700 : 400,
              }}>
              {c.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCal;
