import React from 'react';
import { translations } from './translations';

const Stepper = ({ currentStep, lang }) => {
  const steps = translations[lang].stepper;
  
  return (
    <div className="w-full px-2 sm:px-4">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 top-5 w-full h-[2px] bg-slate-200 dark:bg-white/5 -translate-y-1/2 rounded-full"></div>
        {/* Active Progress */}
        <div 
          className="absolute top-5 h-[2px] bg-[#8f5cb1] -translate-y-1/2 transition-all duration-700 ease-out rounded-full shadow-[0_0_15px_rgba(143,92,177,0.3)]"
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
                  w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-500 border-2
                  ${isActive 
                    ? 'bg-[#8f5cb1] text-white border-[#8f5cb1] shadow-[0_10px_20px_rgba(143,92,177,0.3)] scale-110' 
                    : isCompleted 
                      ? 'bg-[#8f5cb1]/10 text-[#8f5cb1] dark:text-[#d1b3ff] border-[#8f5cb1]/30' 
                      : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20 border-slate-200 dark:border-white/5'}
                `}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span className={`
                mt-2.5 text-[10px] sm:text-[11px] font-bold transition-all uppercase tracking-tight
                ${isActive ? 'text-[#8f5cb1] dark:text-[#d1b3ff]' : 'text-slate-500 dark:text-white/40'}
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
