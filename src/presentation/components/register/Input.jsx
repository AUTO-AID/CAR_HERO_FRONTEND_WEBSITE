import React, { useId, useState, useEffect } from 'react';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';

/**
 * حقل النص المشترك لكل خطوات التسجيل.
 *
 * كان الحقل بلا `id` والتسمية بلا `htmlFor`، فلا رابط بينهما: شجرة الوصول
 * كانت تسمّي الحقل بالـplaceholder، وحقلا كلمة المرور يُنطقان «********»
 * كلاهما — أي أن قارئ الشاشة لا يفرّق بين «كلمة المرور» و«تأكيد كلمة المرور»
 * في أهم مسار تحويل في الموقع. الآن التسمية مرتبطة، والخطأ مرتبط عبر
 * `aria-describedby` ومعلن عبر `role="alert"`.
 */
const Input = ({
  label,
  icon,
  lang = 'ar',
  error,
  isValid,
  className,
  type,
  value,
  onChange,
  name,
  hint,
  ...props
}) => {
  const reactId = useId();
  const inputId = props.id || `${name || 'field'}-${reactId}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  // Sync local value when external value changes (e.g. initial load or programmatic clear)
  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  // Debounce the actual onChange to prevent RegisterFlow from re-rendering on every keystroke
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localValue !== value) {
        onChange({ target: { name, value: localValue } });
      }
    }, 150); // 150ms debounce makes typing feel smooth without noticeable delay in validation
    return () => clearTimeout(timeoutId);
  }, [localValue, name, onChange, value]);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  const toggleLabel = showPassword
    ? (lang === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password')
    : (lang === 'ar' ? 'إظهار كلمة المرور' : 'Show password');

  return (
    <div className={`w-full space-y-1.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="flex items-center justify-between px-1">
        <label
          htmlFor={inputId}
          className={`block text-[14px] font-bold transition-colors ${
            error ? 'text-rose-500' : isFocused ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          {label}{' '}
          {props.required && (
            // النجمة وحدها لا تُنطق كـ«مطلوب» — الحقل يحمل `required` فعلياً
            <span className="text-rose-500" aria-hidden="true">*</span>
          )}
        </label>
        {isValid && !error && (
          <CheckCircle2 size={16} className="text-emerald-500 animate-in zoom-in" aria-hidden="true" />
        )}
      </div>

      <div className="relative h-[52px]">
        <input
          {...props}
          id={inputId}
          name={name}
          value={localValue}
          onChange={handleChange}
          type={inputType}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={`
            w-full h-full transition-colors duration-300 font-medium text-sm
            bg-[var(--input-bg)] border rounded-[12px]
            ${lang === 'ar' ? 'pr-12 pl-12' : 'pl-12 pr-12'}
            text-[var(--text-dark)] placeholder:text-slate-400 dark:placeholder:text-[#a8a8b3]/40 outline-none
            ${error ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-a10)]'}
            ${className || ''}
          `}
        />
        {icon && (
          <div
            aria-hidden="true"
            className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300 ${
              isFocused ? 'text-[var(--primary)]' : 'text-slate-400 dark:text-[var(--primary-a40)]'
            }`}
          >
            {icon}
          </div>
        )}
        {isPassword && (
          // كان الزر ٢٠×٢٠ بكسل وبلا اسم في شجرة الوصول إطلاقاً
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={toggleLabel}
            aria-pressed={showPassword}
            aria-controls={inputId}
            className={`absolute ${lang === 'ar' ? 'left-1' : 'right-1'} top-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-[12px] text-slate-400 dark:text-white/30 hover:text-[var(--primary)] focus-visible:text-[var(--primary)] transition-colors`}
          >
            {showPassword ? <Eye size={20} aria-hidden="true" /> : <EyeOff size={20} aria-hidden="true" />}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-[12px] font-medium text-[var(--text-muted)] px-2 mt-1 leading-relaxed">
          {hint}
        </p>
      )}
      {/* كان حجم نص الخطأ ١٠ بكسل — أصغر من أن يُقرأ، وغير معلن لقارئ الشاشة */}
      {error && (
        <p id={errorId} role="alert" className="text-[12.5px] font-bold text-rose-500 px-2 mt-1 leading-relaxed">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
