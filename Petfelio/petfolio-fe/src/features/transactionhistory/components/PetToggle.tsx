import React from 'react';

export type PetFilter = 'all' | 'pet' | 'noPet';

interface PetToggleProps {
  value: PetFilter;
  onChange: (v: PetFilter) => void;
}

const PetToggle: React.FC<PetToggleProps> = ({ value, onChange }) => {
  const options: { label: string; key: PetFilter }[] = [
    { label: '전체', key: 'all' },
    { label: '🐾', key: 'pet' },
    { label: '일반', key: 'noPet' },
  ];
  return (
    <div
      className="flex rounded-lg overflow-hidden text-xs border border-[var(--color-pet-border)]"
    >
      {options.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className="px-2.5 py-1 transition-all duration-200"
          style={{
            background: value === opt.key ? 'var(--color-pet-brown)' : 'white',
            color: value === opt.key ? 'white' : 'var(--color-pet-text-muted)',
            fontWeight: value === opt.key ? 600 : 400,
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

PetToggle.displayName = 'PetToggle';
export default PetToggle;
