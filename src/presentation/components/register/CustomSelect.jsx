import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

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
  lang = 'ar'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (isOpen && onBlur) onBlur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onBlur]);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt.key === value);
  const displayLabel = selectedOption ? (selectedOption.label || selectedOption.value) : placeholder;

  return (
    <div className={`space-y-2.5 w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} ref={containerRef}>
      {label && (
        <div className="flex items-center justify-between px-1">
          <label className={`block text-sm font-bold uppercase ${error && touched ? 'text-rose-500' : 'text-slate-500 dark:text-[#c9a7e3]'}`}>
            {label} <span className="text-rose-500">*</span>
          </label>
        </div>
      )}
      
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full h-[58px] flex items-center justify-between px-4 transition-all duration-300
            ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}
            bg-[var(--input-bg)] border rounded-[16px] outline-none shadow-sm
            ${isOpen ? 'ring-4 ring-[#8f5cb1]/10 border-[#8f5cb1] bg-[var(--bg-section-alt)]' : ''}
            ${error && touched ? 'border-rose-500 ring-4 ring-rose-500/10' : isValid ? 'border-emerald-500 bg-emerald-500/5' : 'border-[var(--border-color)] hover:border-[#8f5cb1] hover:bg-[var(--bg-section-alt)] hover:shadow-sm'}
          `}
        >
          <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {Icon && <Icon size={20} className={`${isValid ? 'text-emerald-500' : 'text-[#8f5cb1]'} transition-colors`} />}
            <span className={`text-[15px] font-bold ${!value ? 'text-slate-400 dark:text-white/20' : 'text-[var(--text-dark)]'}`}>
              {displayLabel}
            </span>
          </div>
          <ChevronDown 
            size={20} 
            className={`text-slate-400 dark:text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-[100] mt-3 w-full animate-in fade-in zoom-in-95 duration-200">
            <div className={`
              overflow-hidden rounded-[24px] border border-[var(--border-color)] shadow-[0_20px_50px_rgba(0,0,0,0.5)]
              bg-[var(--input-bg)] backdrop-blur-3xl dark:border-[#8f5cb1]/30
            `}>
              <div className="max-h-[280px] overflow-y-auto custom-scrollbar p-2.5 space-y-1.5">
                {options.map((opt, idx) => {
                  const optValue = opt.key || opt.value || opt;
                  const optLabel = opt.label || opt.value || opt;
                  const isOptSelected = value === optValue;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(optValue)}
                      className={`
                        w-full flex items-center justify-between px-5 py-4 rounded-[16px] transition-all duration-300
                        ${lang === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'}
                        ${isOptSelected 
                          ? 'bg-gradient-to-r from-[#8f5cb1] to-[#6d3a91] text-white shadow-lg scale-[1.02]' 
                          : 'text-[var(--text-dark)] hover:bg-[var(--bg-section-alt)]'}
                      `}
                    >
                      <span className="font-bold text-[14px]">{optLabel}</span>
                      {isOptSelected && <Check size={18} className="text-white animate-in zoom-in" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
