import React from 'react';
import { translations } from './translations';

const Stepper = ({ currentStep, lang }) => {
  const steps = translations[lang].stepper;
  
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 top-5 w-full h-[2px] bg-[var(--border-color)] -translate-y-1/2 rounded-full"></div>
        {/* Active Progress */}
        <div 
          className="absolute top-5 h-[2px] bg-[var(--primary)] -translate-y-1/2 transition-all duration-500 ease-out rounded-full shadow-[var(--shadow-hover)]"
          style={{ 
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            [lang === 'ar' ? 'right' : 'left']: '0'
          }}
        ></div>

        {steps.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-500 border-2
                  ${isActive 
                    ? 'bg-[var(--primary-surface)] text-[var(--on-primary)] border-[var(--primary-surface)] shadow-[var(--shadow-hover)] scale-110' 
                    : isCompleted 
                      ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/30' 
                      : 'bg-[var(--input-bg)] text-[var(--text-muted)] border-[var(--border-color)]'}
                `}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span className={`
                mt-2.5 text-[10px] sm:text-[11px] font-bold transition-all uppercase tracking-tight
                ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}
                ${isActive ? 'block' : 'hidden sm:block'}
              `}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
