import React, { useId, useRef, useState } from 'react';
import { CloudUpload } from 'lucide-react';

/**
 * منطقة رفع الصور.
 *
 * كانت `div` عليها `onClick` فقط: بلا `tabIndex` ولا `role` ولا معالج
 * لوحة مفاتيح، والـ`input[type=file]` مخفي بـ`hidden` فيختفي من شجرة
 * الوصول أيضاً — أي أن مستخدم لوحة المفاتيح لا يستطيع رفع صورة إطلاقاً.
 * الآن الـinput نفسه هو العنصر القابل للتركيز، والمنطقة تسميته البصرية.
 *
 * ورسالة الخطأ كانت إنجليزية ثابتة داخل تدفّق يعمل بالعربية.
 */
const FileUpload = ({ onUpload, description, lang = 'ar' }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const reactId = useId();
  const inputId = `file-upload-${reactId}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const maxSizeBytes = 5 * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const isArabic = lang === 'ar';

  const validateFiles = (files) => {
    const validFiles = [];
    const rejectedFiles = [];

    files.forEach((file) => {
      if (!allowedTypes.includes(file.type) || file.size > maxSizeBytes) {
        rejectedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    setError(
      rejectedFiles.length
        ? isArabic
          ? `تعذّر قبول: ${rejectedFiles.join('، ')} — تأكد أن الصيغة JPEG أو PNG أو WebP وأن الحجم لا يتجاوز ٥ ميغابايت.`
          : `Could not accept: ${rejectedFiles.join(', ')} — files must be JPEG, PNG or WebP and under 5MB.`
        : '',
    );
    if (validFiles.length) onUpload(validFiles);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateFiles(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="w-full">
      {/* الغلاف `label` فالنقر في أي موضع يفتح المستعرض دون JS، والـinput
          يبقى في شجرة الوصول ويستقبل التركيز بلوحة المفاتيح */}
      <label
        htmlFor={inputId}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`
          relative flex w-full cursor-pointer flex-col items-center justify-center gap-2.5
          rounded-[20px] border-2 border-dashed p-5 text-center transition-all duration-500 group sm:p-7
          focus-within:border-[var(--primary)] focus-within:ring-4 focus-within:ring-[var(--primary-a15)]
          ${isDragging
            ? 'border-[var(--primary)] bg-[var(--primary-a10)] scale-[1.01]'
            : 'border-[var(--border-color)] bg-[var(--input-bg)] hover:border-[var(--primary-a40)] hover:bg-[var(--bg-section-alt)]'}
        `}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          aria-describedby={`${hintId}${error ? ` ${errorId}` : ''}`}
          aria-invalid={error ? 'true' : undefined}
          // `hidden` يزيله من شجرة الوصول ومن ترتيب التركيز — نخفيه بصرياً فقط
          className="sr-only-file"
          onChange={(e) => e.target.files && validateFiles(Array.from(e.target.files))}
        />

        <div className="text-[var(--primary)] opacity-60 transition-transform duration-500 group-hover:scale-110">
          <CloudUpload size={32} strokeWidth={1.5} aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="block text-lg font-bold text-[var(--text-dark)] sm:text-xl">
            {isArabic ? 'اضغط أو اسحب الملفات للرفع' : 'Click or drag files to upload'}
          </span>
          <span id={hintId} className="mx-auto block max-w-sm text-xs leading-relaxed text-[var(--text-muted)] sm:text-sm">
            {description}
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-section-alt)] px-4 py-1.5">
          <span className="text-xs font-bold text-[var(--text-muted)]">
            {isArabic ? 'الحد الأقصى: ٥ ميغابايت (JPEG, PNG, WebP)' : 'Max 5MB (JPEG, PNG, WebP)'}
          </span>
        </span>
      </label>

      {error && (
        <p id={errorId} role="alert" className="mt-2 px-2 text-[12.5px] font-bold leading-relaxed text-rose-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
