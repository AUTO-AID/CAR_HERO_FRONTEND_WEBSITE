import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Input = ({ label, icon, lang = 'ar', error, isValid, className, type, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full space-y-2.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center justify-between px-1">
        <label className={`block text-[14px] font-bold uppercase transition-colors ${
          error ? 'text-rose-500' : isFocused ? 'text-[#8f5cb1] dark:text-[#a57ed8]' : 'text-[var(--text-muted)]'
        }`}>
          {label} {props.required && <span className="text-rose-500">*</span>}
        </label>
        {isValid && !error && <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" />}
      </div>

      <div className="relative h-[58px]">
        <input
          {...props}
          type={inputType}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={`
            w-full h-full transition-all duration-300 font-medium text-base
            bg-[var(--input-bg)] border rounded-[12px]
            ${lang === 'ar' ? 'pr-12 pl-12' : 'pl-12 pr-12'}
            text-[var(--text-dark)] placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40 outline-none
            ${error ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-[var(--border-color)] focus:border-[#8f5cb1] focus:ring-4 focus:ring-[#8f5cb1]/10'}
            ${className || ''}
          `}
        />
        {icon && (
          <div className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? 'text-violet-600 dark:text-[#8f5cb1]' : 'text-slate-400 dark:text-[#8f5cb1]/40'
          }`}>
            {icon}
          </div>
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${lang === 'ar' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 hover:text-[#8f5cb1] transition-colors`}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-[10px] font-bold text-rose-500 px-2 mt-1">{error}</p>}
    </div>
  );
};

export default Input;
