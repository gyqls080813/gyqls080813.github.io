import React, { useRef } from 'react';
import { Box } from '@/shared/components/common/Box';
import { Badge } from '@/shared/components/common/Badge';
import { Paragraph } from '@/shared/components/common/Paragraph';
import SupplyProgressBar from '@/features/supplies/components/SupplyProgressBar';
import type { ConsumableItem } from '@/features/supplies/types/consumable';
import {
  getWeekDates,
  parseDate,
  getDaysLeft,
  getStatus,
  getCategoryTrackColor,
  getCategoryBadgeColor,
} from '../utils/dateUtils';

interface SupplyTimelineProps {
  today: Date;
  weekStart: Date;
  supplies: ConsumableItem[];
  loading: boolean;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const WEEK_DAYS = 7;
const COL_WIDTH_PX = 48;

export function SupplyTimeline({
  today,
  weekStart,
  supplies,
  loading,
  onPrevWeek,
  onNextWeek,
  onDelete,
  onEdit,
}: SupplyTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const weekDates = getWeekDates(weekStart, WEEK_DAYS);
  const weekEnd = weekDates[WEEK_DAYS - 1];

  const formatWeekLabel = () => {
    const y = weekStart.getFullYear();
    const m = weekStart.getMonth() + 1;
    const d = weekStart.getDate();
    const we = weekEnd.getDate();
    const wm = weekEnd.getMonth() + 1;
    if (m === wm) return `${y}년 ${m}월 ${d}일 \u2013 ${we}일`;
    return `${y}년 ${m}/${d} \u2013 ${wm}/${we}`;
  };

  const getBarStyle = (item: ConsumableItem) => {
    const start = parseDate(item.lastPurchaseDate);
    const end = parseDate(item.nextPurchaseDate);

    if (end < weekStart || start > weekEnd) return null;

    const boundStart = start < weekStart ? weekStart : start;
    const boundEnd = end > weekEnd ? weekEnd : end;

    const startOffset = (boundStart.getTime() - weekStart.getTime()) / 86400000;
    const endOffset = (boundEnd.getTime() - weekStart.getTime()) / 86400000 + 1;

    const leftPct = (startOffset / WEEK_DAYS) * 100;
    const widthPct = ((endOffset - startOffset) / WEEK_DAYS) * 100;

    return { left: `${leftPct}%`, width: `${Math.max(widthPct, 2)}%` };
  };

  return (
    <Box
      background="white"
      radius="large"
      padding="none"
      direction="column"
      htmlStyle={{ border: '1px solid var(--color-supply-border)', overflow: 'hidden' }}
    >
      <div
        style={{
          padding: '0.875rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          borderBottom: '1px solid var(--color-supply-divider)',
        }}
      >
        <button
          onClick={onPrevWeek}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            color: 'var(--color-pet-text-sub)',
            padding: '0.25rem',
          }}
        >
          {'<'}
        </button>
        <span
          style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-pet-text-dark)', flex: 1 }}
        >
          {formatWeekLabel()}
        </span>
        <button
          onClick={onNextWeek}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.1rem',
            color: 'var(--color-pet-text-sub)',
            padding: '0.25rem',
          }}
        >
          {'>'}
        </button>
      </div>

      <div
        ref={timelineRef}
        style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        <div style={{ minWidth: `${WEEK_DAYS * COL_WIDTH_PX}px` }}>
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--color-supply-divider)',
              background: 'var(--color-supply-row-bg)',
              height: '40px',
            }}
          >
            {weekDates.map((date, i) => {
              const isToday = date.getTime() === today.getTime();
              const isSunday = date.getDay() === 0;
              const isSaturday = date.getDay() === 6;
              const DOW = ['일', '월', '화', '수', '목', '금', '토'];
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid #f5f5f5',
                    gap: '1px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      color: isSunday ? 'var(--color-supply-sunday)' : isSaturday ? 'var(--color-supply-saturday)' : 'var(--color-ui-faint)',
                    }}
                  >
                    {DOW[date.getDay()]}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: isToday ? 'bold' : '500',
                      color: isToday ? '#fff' : isSunday ? 'var(--color-supply-sunday)' : 'var(--color-ui-muted)',
                      backgroundColor: isToday ? 'var(--color-supply-today)' : 'transparent',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                    }}
                  >
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            style={{
              position: 'relative',
              background: '#FFF',
              minHeight: loading || supplies.length === 0 ? '80px' : undefined,
              padding: '10px 0',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                pointerEvents: 'none',
              }}
            >
              {weekDates.map((_, i) => (
                <div
                  key={i}
                  style={{ flex: 1, borderRight: '1px dashed #F5F5F5' }}
                />
              ))}
            </div>

            {today >= weekStart && today <= weekEnd && (() => {
              const offsetDays =
                (today.getTime() - weekStart.getTime()) / 86400000;
              const leftPct = ((offsetDays + 0.5) / WEEK_DAYS) * 100;
              return (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    width: '1px',
                    backgroundColor: 'var(--color-supply-today)',
                    left: `${leftPct}%`,
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                  }}
                />
              );
            })()}

            {loading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80px',
                  color: 'var(--color-ui-muted)',
                  fontSize: '0.85rem',
                }}
              >
                불러오는 중...
              </div>
            )}

            {!loading && supplies.length === 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '80px',
                  color: 'var(--color-ui-dim)',
                  fontSize: '0.85rem',
                }}
              >
                등록된 소모품이 없습니다
              </div>
            )}

            {!loading &&
              supplies.map((item) => {
                const barStyle = getBarStyle(item);
                const daysLeft = getDaysLeft(item.nextPurchaseDate, today);
                const status = getStatus(daysLeft);
                const trackColor = getCategoryTrackColor(item.categoryName);
                const badgeColor = getCategoryBadgeColor(item.categoryName);

                return (
                  <div
                    key={item.id}
                    style={{
                      position: 'relative',
                      height: '32px',
                      width: '100%',
                      marginBottom: '6px',
                    }}
                  >
                    {barStyle ? (
                      <div
                        style={{
                          position: 'absolute',
                          left: barStyle.left,
                          width: barStyle.width,
                          height: '100%',
                          padding: '0 3px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <SupplyProgressBar
                          trackColor={trackColor}
                          status={status}
                          height={30}
                          onEdit={() => onEdit(item.id)}
                          onDelete={() => onDelete(item.id)}
                        >
                          <Box
                            direction="row"
                            gap="small"
                            htmlStyle={{ marginRight: '6px', flexShrink: 0 }}
                          >
                            <Badge size="xsmall" color={badgeColor} variant="fill">
                              {item.categoryName}
                            </Badge>
                          </Box>
                          <Paragraph
                            typography="st7"
                            color="grey800"
                            fontWeight="bold"
                            style={{
                              flex: 1,
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            {item.name}
                          </Paragraph>
                        </SupplyProgressBar>
                      </div>
                    ) : (
                      <div style={{ height: '100%' }} />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Box>
  );
}
