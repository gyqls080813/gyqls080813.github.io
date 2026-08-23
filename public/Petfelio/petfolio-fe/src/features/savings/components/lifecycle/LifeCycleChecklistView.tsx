import React, { useState } from 'react';
import { SavingsChecklist, ChecklistItem } from '../SavingsChecklist';

interface LifeCycleChecklistViewProps {
  title: string;
  checklist: { category: string; description: string; isChecked?: boolean }[];
  petId: number;
  stageName: string;
  lifeStageId: number;
  stickerImageUrl?: string;
  onToggle?: (category: string, isChecked: boolean) => void;
}

export const LifeCycleChecklistView: React.FC<LifeCycleChecklistViewProps> = ({
  title,
  checklist,
  petId,
  stageName,
  lifeStageId,
  stickerImageUrl,
  onToggle,
}) => {
  // Use a unique key for the storage based on pet ID and stage name
  const storageKey = `petfolio_hlth_ck_${petId}_${stageName}`;

  // Initialize checklist items and load from localStorage synchronously
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(() => {
    let savedCheckedIds: string[] = [];
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) savedCheckedIds = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load checklist persistence', e);
    }
    
    return checklist.map((c, i) => {
      const id = String(i);
      // API 데이터에서 isChecked가 있으면 우선 사용, 없으면 localStorage 우선순위
      const isChecked = c.isChecked !== undefined ? c.isChecked : savedCheckedIds.includes(id);
      return { 
        id, 
        label: c.category, 
        description: c.description, 
        isChecked 
      };
    });
  });

  const handleToggle = (id: string) => {
    setChecklistItems(prev => {
      const next = prev.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item);
      const checkedIds = next.filter(item => item.isChecked).map(item => item.id);
      localStorage.setItem(storageKey, JSON.stringify(checkedIds));
      
      // API 콜백
      if (onToggle) {
        const changedItem = next.find(item => item.id === id);
        if (changedItem) {
          onToggle(changedItem.label, changedItem.isChecked);
        }
      }
      return next;
    });
  };

  if (checklistItems.length === 0) {
    return null;
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1rem' }}>
      {/* Background Sticker (Faint / Ghostly) */}
      {stickerImageUrl && (
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-10px',
            width: '120px',
            height: '120px',
            backgroundImage: `url(${stickerImageUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'grayscale(30%)',
          }}
        />
      )}

      {/* Checklist Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <SavingsChecklist
          title={title}
          items={checklistItems}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};
