import React, { useRef, useState } from 'react';
import { CloudUpload } from 'lucide-react';

const FileUpload = ({ onUpload, description, lang = 'ar' }) => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const maxSizeBytes = 5 * 1024 * 1024;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

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

    setError(rejectedFiles.length ? `Invalid files: ${rejectedFiles.join(', ')}` : '');
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
    <div
      className={`
        relative w-full border-2 border-dashed rounded-[24px] p-8 sm:p-12 transition-all duration-500 group cursor-pointer
        ${isDragging
          ? 'border-[#8f5cb1] bg-[#8f5cb1]/10 scale-[1.01]'
          : 'border-[var(--border-color)] bg-[var(--input-bg)] hover:border-[#8f5cb1]/40 hover:bg-[var(--bg-section-alt)]'}
      `}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => e.target.files && validateFiles(Array.from(e.target.files))}
      />

      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-[#8f5cb1] opacity-60 transition-transform duration-500 group-hover:scale-110">
          <CloudUpload size={32} strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-dark)]">
            {lang === 'ar' ? 'اضغط أو اسحب الملفات للرفع' : 'Click or drag files to upload'}
          </h3>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--bg-section-alt)] rounded-full border border-[var(--border-color)]">
          <span className="text-xs font-bold text-[var(--text-muted)] uppercase">
            {lang === 'ar' ? 'الحد الأقصى: 5MB (JPEG, PNG, WebP)' : 'MAX LIMIT: 5MB (JPEG, PNG, WebP)'}
          </span>
        </div>
        {error && <p className="text-xs font-bold text-rose-500 max-w-sm">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
