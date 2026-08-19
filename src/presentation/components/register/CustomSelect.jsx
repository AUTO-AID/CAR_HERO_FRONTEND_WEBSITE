import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * قائمة اختيار مبنية يدوياً.
 *
 * كانت زرّاً عادياً يفتح قائمة من أزرار: بلا `role=combobox/listbox/option`،
 * وبلا `aria-expanded`، فقارئ الشاشة يسمع «زر» لا «قائمة اختيار» ولا يعرف
 * أنها مفتوحة ولا كم خياراً فيها. ولم يكن Escape يغلقها ولا الأسهم تتنقّل.
 *
 * والأهم: كانت تستقبل `error` وتلوّن الحدّ بالأحمر فقط — بلا نصّ يشرح
 * الخطأ إطلاقاً. المستخدم يرى إطاراً أحمر ولا يعرف سببه.
 */
const CustomSelect = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  placeholder,
  icon: Icon,
  error,
  touched,
  isValid,
  disabled,
  required = true,
  lang = 'ar',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const optionRefs = useRef([]);

  const reactId = useId();
  const baseId = `${name || 'select'}-${reactId}`;
  const labelId = `${baseId}-label`;
  const listboxId = `${baseId}-listbox`;
  const errorId = `${baseId}-error`;

  const normalize = useCallback(
    (opt) => ({
      value: opt.key ?? opt.value ?? opt,
      label: opt.label ?? opt.value ?? opt,
    }),
    [],
  );

  const items = (options || []).map(normalize);
  const selectedIndex = items.findIndex((opt) => opt.value === value);
  const displayLabel = selectedIndex >= 0 ? items[selectedIndex].label : placeholder;
  const showError = error && touched;

  const close = useCallback((returnFocus = true) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (isOpen) {
          setIsOpen(false);
          setActiveIndex(-1);
          onBlur?.();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  // الخيار النشط يجب أن يبقى مرئياً أثناء التنقّل بالأسهم
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen, activeIndex]);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    close();
  };

  const openWith = (index) => {
    setIsOpen(true);
    setActiveIndex(index);
  };

  const handleKeyDown = (event) => {
    if (disabled) return;
    const last = items.length - 1;

    switch (event.key) {
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          close();
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) openWith(selectedIndex >= 0 ? selectedIndex : 0);
        else setActiveIndex((prev) => (prev >= last ? 0 : prev + 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) openWith(selectedIndex >= 0 ? selectedIndex : last);
        else setActiveIndex((prev) => (prev <= 0 ? last : prev - 1));
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(last);
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (!isOpen) openWith(selectedIndex >= 0 ? selectedIndex : 0);
        else if (activeIndex >= 0) handleSelect(items[activeIndex].value);
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          setActiveIndex(-1);
          onBlur?.();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={`space-y-1.5 w-full ${disabled ? 'opacity-50' : ''}`} ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between px-1">
          <span
            id={labelId}
            className={`block text-sm font-bold ${showError ? 'text-rose-500' : 'text-[var(--text-muted)]'}`}
          >
            {label}{' '}
            {/* كانت النجمة مكتوبة دائماً حتى للحقول غير المطلوبة */}
            {required && <span className="text-rose-500" aria-hidden="true">*</span>}
          </span>
        </div>
      )}

      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          // يتيح للخطوة أن تنقل التركيز إلى هذا الحقل عند نقص بياناته
          data-field={name}
          disabled={disabled}
          onClick={() => (isOpen ? close(false) : openWith(selectedIndex >= 0 ? selectedIndex : 0))}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-labelledby={label ? labelId : undefined}
          aria-required={required || undefined}
          aria-invalid={showError ? 'true' : undefined}
          aria-describedby={showError ? errorId : undefined}
          className={`
            w-full h-[52px] flex items-center justify-between px-4 transition-all duration-300
            ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}
            bg-[var(--input-bg)] border rounded-[16px] outline-none shadow-sm
            ${isOpen ? 'ring-4 ring-[var(--primary-a10)] border-[var(--primary)] bg-[var(--bg-section-alt)]' : ''}
            ${showError ? 'border-rose-500 ring-4 ring-rose-500/10' : isValid ? 'border-emerald-500 bg-emerald-500/5' : 'border-[var(--border-color)] hover:border-[var(--primary)] hover:bg-[var(--bg-section-alt)] hover:shadow-sm'}
            ${disabled ? 'cursor-not-allowed' : ''}
          `}
        >
          <div className={`flex items-center gap-3 min-w-0 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {Icon && (
              <Icon
                size={20}
                aria-hidden="true"
                className={`shrink-0 ${isValid ? 'text-emerald-500' : 'text-[var(--primary)]'} transition-colors`}
              />
            )}
            <span
              className={`truncate text-sm font-bold ${selectedIndex < 0 ? 'text-slate-400 dark:text-white/30' : 'text-[var(--text-dark)]'}`}
            >
              {displayLabel}
            </span>
          </div>
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={`shrink-0 text-slate-400 dark:text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-[100] mt-3 w-full animate-in fade-in zoom-in-95 duration-150">
            <div className="overflow-hidden rounded-[24px] border border-[var(--border-color)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[var(--input-bg)] backdrop-blur-3xl dark:border-[var(--primary-a30)]">
              <ul
                id={listboxId}
                role="listbox"
                aria-labelledby={label ? labelId : undefined}
                className="max-h-[280px] overflow-y-auto custom-scrollbar p-2.5 space-y-1.5 m-0 list-none"
              >
                {items.map((opt, idx) => {
                  const isOptSelected = opt.value === value;
                  const isActive = idx === activeIndex;
                  return (
                    <li key={opt.value ?? idx} role="none">
                      <button
                        ref={(el) => {
                          optionRefs.current[idx] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isOptSelected}
                        tabIndex={-1}
                        onClick={() => handleSelect(opt.value)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-[12px] transition-all duration-300
                          ${lang === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'}
                          ${isOptSelected
                            ? 'bg-gradient-to-r from-[var(--primary)] to-[#6d3a91] text-white shadow-lg'
                            : isActive
                              ? 'bg-[var(--bg-section-alt)] text-[var(--text-dark)]'
                              : 'text-[var(--text-dark)]'}
                        `}
                      >
                        <span className="font-bold text-[14px]">{opt.label}</span>
                        {isOptSelected && (
                          <Check size={18} aria-hidden="true" className="text-white animate-in zoom-in" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* الخطأ كان يلوّن الحدّ ولا يُعرض نصّه أبداً */}
      {showError && (
        <p id={errorId} role="alert" className="text-[12.5px] font-bold text-rose-500 px-2 mt-1 leading-relaxed">
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
