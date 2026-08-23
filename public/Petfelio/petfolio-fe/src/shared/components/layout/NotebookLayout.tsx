import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const NOTEBOOK_TABS = [
  { label: '로그인', color: '#7BA7C9', darkColor: '#5e8faf', num: '1', top: '18%', path: '/login' },
  { label: '회원가입', color: '#8BB5A2', darkColor: '#6d9a86', num: '2', top: '44%', path: '/register' },
  { label: '온보딩', color: '#D4C87A', darkColor: '#b8ad5e', num: '3', top: '68%', path: '/onboarding' },
];

export const NOTEBOOK_PATH =
  'M 30 10 Q 20 8, 14 18 C 12 28, 11 45, 10 80 Q 9 150, 8 250 C 7 350, 8 440, 10 500 Q 12 540, 14 548 Q 18 558, 28 560 C 80 563, 160 564, 240 565 Q 310 564, 360 562 Q 375 560, 380 550 C 383 540, 385 520, 386 490 Q 388 400, 388 300 C 388 200, 387 120, 385 60 Q 383 30, 380 20 Q 375 10, 365 9 C 300 7, 200 8, 100 9 Z';

const SPINE_PATH =
  'M 30 10 Q 20 8, 14 18 C 12 28, 11 45, 10 80 Q 9 150, 8 250 C 7 350, 8 440, 10 500 Q 12 540, 14 548 Q 18 558, 28 560 C 35 561, 40 561, 45 562 L 42 12 C 38 10, 34 10, 30 10 Z';

interface NotebookLayoutProps {
  children: React.ReactNode;
  variant?: 'cover' | 'page';
  activeTab?: number | null;
  showPageTurn?: boolean;
  showPaperTurn?: boolean;
  pageTurnDelay?: string;
  contentDelay?: string;
  coverContent?: React.ReactNode;
  flipNow?: boolean;
}

export const NotebookTab = ({
  tab,
  active = false,
  onClick,
}: {
  tab: typeof NOTEBOOK_TABS[0];
  active?: boolean;
  onClick?: () => void;
}) => (
  <svg
    width="72" height="72" viewBox="0 0 72 72"
    style={{ filter: active ? 'drop-shadow(2px 2px 3px rgba(0,0,0,0.15))' : 'none', cursor: onClick ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    <path
      d="M 2 8 C 0 4, 2 1, 8 2 C 18 3, 32 4, 44 5 Q 56 6, 62 10 C 66 14, 68 22, 67 30 Q 66 38, 65 44 C 64 52, 60 60, 52 62 C 42 65, 28 64, 16 63 Q 6 62, 3 58 C 0 54, 1 48, 2 42 Q 2 30, 2 18 Z"
      fill={tab.color}
      stroke={tab.darkColor}
      strokeWidth={active ? '2' : '1.2'}
      strokeLinejoin="round"
    />
    <path d="M 2 8 C 4 12, 5 20, 4 30 Q 3 42, 2 50" fill="none" stroke={tab.darkColor} strokeWidth="0.8" opacity="0.25" />
    <text x="34" y="32" textAnchor="middle" fill="white" fontWeight="700" fontSize="20" fontFamily="Georgia, serif">{tab.num}</text>
    <text x="34" y="50" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontWeight="600" fontSize="10" fontFamily='"Noto Sans KR", sans-serif'>{tab.label}</text>
  </svg>
);

const LeatherCover = ({ filterId = '' }: { filterId?: string }) => (
  <svg viewBox="0 0 400 580" className="w-full h-full">
    <defs>
      <linearGradient id={`coverGrad${filterId}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#c9a87c" />
        <stop offset="20%" stopColor="#c4a176" />
        <stop offset="40%" stopColor="#bfa078" />
        <stop offset="60%" stopColor="#b89870" />
        <stop offset="80%" stopColor="#c2a47a" />
        <stop offset="100%" stopColor="#b99468" />
      </linearGradient>
      <filter id={`leatherTex${filterId}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" seed="2" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
      <filter id={`coverShadow${filterId}`}>
        <feDropShadow dx="4" dy="6" stdDeviation="8" floodColor="#3d2e1a" floodOpacity="0.25" />
      </filter>
    </defs>
    <path d="M 28 16 Q 22 14 18 20 L 12 555 Q 14 565 24 566 L 372 570 Q 382 568 385 560 L 390 22 Q 388 14 378 15 Z" fill="#f5efe5" stroke="#c4b8a5" strokeWidth="0.5" opacity="0.6" />
    <path d="M 26 13 Q 20 11 16 18 L 10 552 Q 12 562 22 564 L 370 566 Q 380 564 383 556 L 388 20 Q 386 12 376 13 Z" fill="#f8f3eb" stroke="#c4b8a5" strokeWidth="0.5" opacity="0.8" />
    <path d={NOTEBOOK_PATH} fill={`url(#coverGrad${filterId})`} stroke="#4a3828" strokeWidth="2.5" filter={`url(#coverShadow${filterId})`} />
    <path d={NOTEBOOK_PATH} fill="#b89870" opacity="0.15" filter={`url(#leatherTex${filterId})`} />
    <path d={SPINE_PATH} fill="rgba(60,42,20,0.18)" />
    <path d="M 38 30 C 37 100, 36 200, 35 300 C 34 400, 35 480, 36 540" fill="none" stroke="#6b5a42" strokeWidth="1" strokeDasharray="6,5" opacity="0.4" />
    <path d="M 370 28 C 372 100, 373 200, 372 300 C 371 400, 370 480, 368 545" fill="none" stroke="#6b5a42" strokeWidth="1" strokeDasharray="6,5" opacity="0.3" />
    <path d="M 50 22 Q 150 18, 250 19 Q 340 20, 365 22" fill="none" stroke="#6b5a42" strokeWidth="1" strokeDasharray="6,5" opacity="0.3" />
    <path d="M 45 548 Q 150 552, 250 553 Q 340 552, 365 548" fill="none" stroke="#6b5a42" strokeWidth="1" strokeDasharray="6,5" opacity="0.3" />
    <path d="M 60 80 Q 80 78, 120 82" fill="none" stroke="rgba(80,60,35,0.08)" strokeWidth="1.5" />
    <path d="M 200 520 Q 250 518, 300 522" fill="none" stroke="rgba(80,60,35,0.06)" strokeWidth="1" />
    <path d="M 80 450 Q 100 448, 140 452" fill="none" stroke="rgba(80,60,35,0.07)" strokeWidth="1" />
    <path d="M 376 40 C 378 200, 378 400, 376 540" fill="none" stroke="rgba(92,74,53,0.1)" strokeWidth="0.8" />
    <path d="M 380 35 C 382 200, 382 400, 380 545" fill="none" stroke="rgba(92,74,53,0.08)" strokeWidth="0.6" />
  </svg>
);

const LinedPage = ({ filterId = '' }: { filterId?: string }) => (
  <svg viewBox="0 0 400 580" className="absolute inset-0 w-full h-full">
    <defs>
      <filter id={`paperTex${filterId}`}>
        <feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" seed="8" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="soft-light" />
      </filter>
      <filter id={`pageShadow${filterId}`}>
        <feDropShadow dx="3" dy="5" stdDeviation="6" floodColor="#3d2e1a" floodOpacity="0.2" />
      </filter>
    </defs>
    <path d={NOTEBOOK_PATH} fill="#faf5ee" stroke="#c4b8a5" strokeWidth="1.5" filter={`url(#pageShadow${filterId})`} />
    <path d={NOTEBOOK_PATH} fill="#f5efe5" opacity="0.3" filter={`url(#paperTex${filterId})`} />
    {Array.from({ length: 16 }, (_, i) => {
      const y = 80 + i * 30;
      return (
        <path key={i} d={`M 55 ${y} Q 200 ${y + (i % 2 === 0 ? 0.5 : -0.5)}, 360 ${y}`}
          fill="none" stroke="#d4cfc5" strokeWidth="0.7" opacity="0.6" />
      );
    })}
    <path d="M 52 30 C 51 150, 51 350, 52 550" fill="none" stroke="#d4928a" strokeWidth="1" opacity="0.35" />
    <path d={SPINE_PATH} fill="rgba(60,42,20,0.08)" />
  </svg>
);

const NestedPageFlip: React.FC<{
  type: 'cover' | 'paper';
  coverContent?: React.ReactNode;
  duration?: number;
  delay?: number;
}> = ({ type, coverContent, duration = 1.8, delay = 0 }) => {
  const stripCount = 5;
  const totalWidth = 100;
  const stripWidths = [35, 20, 18, 15, 12];

  const frontColor = type === 'cover'
    ? 'linear-gradient(135deg, #c9a87c 0%, #b89870 50%, #c2a47a 100%)'
    : 'linear-gradient(180deg, #faf5ee 0%, #f5efe5 100%)';
  const backColor = type === 'cover'
    ? '#f2ece2'
    : '#f0ebe3';

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 10,
      perspective: '1200px',
      perspectiveOrigin: 'center 40%',
    }}>
      {}
      <FlipStrip
        depth={0}
        maxDepth={stripCount}
        stripWidths={stripWidths}
        frontColor={frontColor}
        backColor={backColor}
        duration={duration}
        delay={delay}
        type={type}
        coverContent={coverContent}
      />
    </div>
  );
};

const FlipStrip: React.FC<{
  depth: number;
  maxDepth: number;
  stripWidths: number[];
  frontColor: string;
  backColor: string;
  duration: number;
  delay: number;
  type: 'cover' | 'paper';
  coverContent?: React.ReactNode;
}> = ({ depth, maxDepth, stripWidths, frontColor, backColor, duration, delay, type, coverContent }) => {
  if (depth >= maxDepth) return null;

  const isFirst = depth === 0;
  const isLast = depth === maxDepth - 1;
  const width = isFirst ? '100%' : `${stripWidths[depth]}%`;

  const animName = isFirst ? 'flipMain' : 'flipCurl';
  const animDuration = isFirst ? `${duration}s` : `${duration}s`;
  const animDelay = isFirst ? `${delay}s` : `${delay}s`;

  return (
    <div style={{
      position: isFirst ? 'absolute' : 'absolute',
      ...(isFirst
        ? { inset: 0 }
        : { top: '-1px', bottom: '-1px', right: 'calc(100% - 1px)', width }),
      transformOrigin: 'right center',
      transformStyle: 'preserve-3d',
      animation: `${animName} ${animDuration} cubic-bezier(0.4, 0.05, 0.2, 0.95) ${animDelay} forwards`,
    }}>
      {}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        borderRadius: isFirst ? '4px' : undefined,
        ...(isFirst && type === 'cover' ? {} : {}),
      }}>
        {isFirst ? (
          
          <div style={{ position: 'absolute', inset: 0 }}>
            {type === 'cover' ? (
              <>
                <LeatherCover filterId="Flip" />
                {coverContent && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    zIndex: 2,
                  }}>
                    {coverContent}
                  </div>
                )}
              </>
            ) : (
              <LinedPage filterId="Flip" />
            )}
          </div>
        ) : (
          
          <div style={{
            position: 'absolute',
            inset: 0,
            background: frontColor,
            borderLeft: type === 'cover' ? '1px solid rgba(74,56,40,0.2)' : '1px solid rgba(196,184,165,0.3)',
            boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.06)',
          }} />
        )}
      </div>

      {}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: backColor,
        borderRadius: isFirst ? '4px' : undefined,
        borderRight: isLast ? undefined : '1px solid rgba(0,0,0,0.05)',
      }}>
        {}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.04) 0%, transparent 40%)',
        }} />
      </div>

      {}
      {!isFirst && (
        <div style={{
          position: 'absolute',
          top: 0, bottom: 0,
          right: '-8px', width: '8px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.08), transparent)',
          backfaceVisibility: 'hidden',
          pointerEvents: 'none',
        }} />
      )}

      {}
      <FlipStrip
        depth={depth + 1}
        maxDepth={maxDepth}
        stripWidths={stripWidths}
        frontColor={frontColor}
        backColor={backColor}
        duration={duration}
        delay={delay}
        type={type}
        coverContent={coverContent}
      />
    </div>
  );
};

const FlipDropShadow: React.FC<{ duration: number; delay: number }> = ({ duration, delay }) => (
  <div style={{
    position: 'absolute',
    bottom: '-20px',
    left: '10%', right: '10%',
    height: '20px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(0,0,0,0.15), transparent 70%)',
    animation: `flipDropShadow ${duration}s ease ${delay}s both`,
    zIndex: 1,
  }} />
);

export const NotebookLayout: React.FC<NotebookLayoutProps> = ({
  children,
  variant = 'cover',
  activeTab = null,
  showPageTurn = false,
  showPaperTurn = false,
  pageTurnDelay = '0.1s',
  contentDelay = '0s',
  coverContent,
  flipNow = false,
}) => {
  const router = useRouter();

  const isCoverFlipping = showPageTurn || flipNow;
  const showCoverStatic = variant === 'cover' && !isCoverFlipping;
  const showLinedPage = variant === 'page' || isCoverFlipping || showPaperTurn;

  const coverFlipDuration = 1.8;
  const paperFlipDuration = 1.2;
  const coverDelay = parseFloat(pageTurnDelay) || 0.1;

  const handleTabClick = (i: number) => {
    if (activeTab === i) return;
    router.push(NOTEBOOK_TABS[i].path);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(145deg, #f0e8dc 0%, #e8ddd0 50%, #ded2c2 100%)' }}>
      <div className="relative w-[88vw] h-[88vh] max-w-[440px] max-h-[640px]">
        {}
        {showCoverStatic ? (
          <div className="absolute inset-0">
            <LeatherCover filterId="Main" />
          </div>
        ) : showLinedPage ? (
          <LinedPage filterId="Main" />
        ) : null}

        {}
        {isCoverFlipping && (
          <>
            <NestedPageFlip
              type="cover"
              coverContent={coverContent}
              duration={coverFlipDuration}
              delay={coverDelay}
            />
            <FlipDropShadow duration={coverFlipDuration} delay={coverDelay} />
          </>
        )}

        {}
        {showPaperTurn && (
          <>
            <NestedPageFlip
              type="paper"
              duration={paperFlipDuration}
              delay={0}
            />
            <FlipDropShadow duration={paperFlipDuration} delay={0} />
          </>
        )}

        {}
        {NOTEBOOK_TABS.map((tab, i) => (
          <div key={i} style={{
            position: 'absolute',
            right: '-48px',
            top: tab.top,
            zIndex: 20,
            opacity: activeTab === null ? 1 : (activeTab === i ? 1 : 0.55),
            transition: 'opacity 0.3s',
          }}>
            <NotebookTab
              tab={tab}
              active={activeTab === i}
              onClick={activeTab !== null ? () => handleTabClick(i) : undefined}
            />
          </div>
        ))}

        {}
        {showCoverStatic && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[5]">
            {coverContent || children}
          </div>
        )}

        {}
        {showLinedPage && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 5,
            ...(isCoverFlipping ? {
              opacity: 0,
              animation: `fadeIn 0.6s ease ${coverFlipDuration * 0.7 + coverDelay}s forwards`,
            } : showPaperTurn ? {
              opacity: 0,
              animation: `fadeIn 0.5s ease ${paperFlipDuration * 0.5}s forwards`,
            } : {}),
          }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

NotebookLayout.displayName = 'NotebookLayout';
export default NotebookLayout;
