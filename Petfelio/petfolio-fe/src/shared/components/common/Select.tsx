import React, { useState, useRef, useEffect, useId } from 'react';
import { adaptive, colors } from '@/shared/styles/colors';
import type { SelectOption, SelectSize, SelectProps } from './types';

const SIZE_STYLES: Record<SelectSize, React.CSSProperties> = {
  small:  { height: '2em',   fontSize: '0.875em', padding: '0 0.75em' },
  medium: { height: '2.5em', fontSize: '0.9375em', padding: '0 1em' },
  large:  { height: '3em',   fontSize: '1em',     padding: '0 1.25em' },
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  placeholder   = '선택하세요',
  onChange,
  size          = 'medium',
  fullWidth     = false,
  disabled      = false,
  htmlStyle,
  className     = '',
}) => {

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const selectedValue = isControlled ? value : internalValue;
  const [isOpen, setIsOpen] = useState(false);
  const uid = useId();
  const listboxId = `select-listbox-${uid}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label;

  const handleSelect = (optValue: string) => {
    if (!isControlled) {
      setInternalValue(optValue);
    }
    onChange?.(optValue);
    setIsOpen(false);
  };

  const sizeStyle = SIZE_STYLES[size];

  const triggerStyle: React.CSSProperties = {
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            '0.5em',
    width:          fullWidth ? '100%' : 'auto',
    minWidth:       '8em',
    background:     colors.white,
    border:         `0.0625em solid ${isOpen ? colors.blue500 : adaptive.grey200}`,
    borderRadius:   '0.5em',
    cursor:         disabled ? 'not-allowed' : 'pointer',
    color:          disabled ? adaptive.grey400 : adaptive.grey800,
    transition:     'border-color 0.2s ease',
    userSelect:     'none',
    boxSizing:      'border-box',
    ...sizeStyle,
  };

  const dropdownStyle: React.CSSProperties = {
    position:        'absolute',
    top:             'calc(100% + 0.25em)',
    left:            0,
    right:           0,
    zIndex:          1000,
    background:      colors.white,
    border:          `0.0625em solid ${adaptive.grey200}`,
    borderRadius:    '0.5em',
    boxShadow:       '0 0.25em 0.75em rgba(0, 0, 0, 0.10)',
    overflowY:       'auto',
    maxHeight:       '15em',
    padding:         '0.25em 0',
  };

  return (
    <>
      <style>{`
        .select-option:hover {
          background-color: ${adaptive.grey100};
        }
        .select-option:active {
          background-color: ${adaptive.grey200};
        }
        .select-trigger:not([aria-disabled="true"]):hover {
          border-color: ${adaptive.grey300};
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display:  'inline-block',
          width:    fullWidth ? '100%' : 'auto',
          ...htmlStyle,
        }}
        className={className}
      >
        <button
          type="button"
          className="select-trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-disabled={disabled}
          disabled={disabled}
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          <span
            style={{
              color: selectedLabel ? adaptive.grey800 : adaptive.grey400,
              fontSize: 'inherit',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedLabel ?? placeholder}
          </span>

          {}
          <svg
            width="0.75em"
            height="0.75em"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              flexShrink: 0,
              opacity: 0.5,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {}
        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            aria-label="옵션 목록"
            style={dropdownStyle}
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedValue;
              const isDisabled = opt.disabled ?? false;

              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  className="select-option"
                  onClick={() => !isDisabled && handleSelect(opt.value)}
                  style={{
                    display:    'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding:    `0.5em 1em`,
                    cursor:     isDisabled ? 'not-allowed' : 'pointer',
                    color:      isDisabled ? adaptive.grey400 : isSelected ? colors.blue500 : adaptive.grey800,
                    fontWeight: isSelected ? 600 : 400,
                    fontSize:   sizeStyle.fontSize,
                    userSelect: 'none',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <span>{opt.label}</span>

                  {isSelected && (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ flexShrink: 0, color: colors.blue500 }}
                    >
                      <path
                        d="M5 13L9 17L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

Select.displayName = 'Select';
export default Select;
