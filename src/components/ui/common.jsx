import React from 'react';
import { Info } from 'lucide-react';

const triggerHaptic = (duration = 15) => { 
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration); 
  }
};

const EnIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 7v10h5" /><path d="M3 12h4" /><path d="M3 7h5" />
    <path d="M14 17v-10l7 10v-10" />
  </svg>
);

// مكون اليد الموجهة (من الجانب)
const TutorialHand = ({ text = "اضغط هنا" }) => (
  <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center animate-bounce">
    <div className="bg-yellow-400 text-yellow-900 text-sm font-black px-4 py-2 rounded-2xl shadow-lg border-2 border-yellow-200 whitespace-nowrap">
      {text}
    </div>
    {/* سهم يشير للأسفل */}
    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-yellow-400 mt-0.5" />
  </div>
);

// فقاعة الشرح (Tooltip Overlay)
const TooltipOverlay = ({ title, text, onClose, targetRef }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-[2px] animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white dark:bg-[#2A2640] p-6 rounded-[2rem] max-w-sm w-full shadow-2xl border-4 border-yellow-400 relative animate-pop-in"
                onClick={(e) => e.stopPropagation()} // Prevent closing if clicking inside
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white dark:border-[#2A2640]">
                    <Info className="w-7 h-7 text-yellow-900" />
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-black mb-2 text-slate-800 dark:text-white">{title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 font-bold text-sm leading-relaxed mb-6">
                        {text}
                    </p>
                    <button 
                        onClick={onClose}
                        className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-xl font-black shadow-lg hover:scale-105 transition-transform w-full"
                    >
                        فهمت عليك! 👍
                    </button>
                </div>
            </div>
        </div>
    );
};

const SoftBackground = ({ isDarkMode }) => (
  <div className={`fixed inset-0 -z-10 transition-colors duration-500 ${isDarkMode ? 'bg-[#1E1B2E]' : 'bg-[#FFFBF5]'}`}>
    <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[60px] opacity-15 mix-blend-multiply animate-float-slow ${isDarkMode ? 'bg-purple-900' : 'bg-[#FFE4E6]'}`} />
    <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[60px] opacity-15 mix-blend-multiply animate-float-delayed ${isDarkMode ? 'bg-indigo-900' : 'bg-[#E0F2FE]'}`} />
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
  </div>
);

const TactileButton = ({ children, onClick, className, colorClass, borderClass, shadowColor = "", isDarkMode, disabled, activeScale = true, type = "button", style, id }) => {
  return (
    <button 
      id={id}
      type={type}
      disabled={disabled}
      onClick={(e) => { triggerHaptic(); if(onClick) onClick(e); }}
      style={style}
      className={`
        relative group transition-all duration-150 ease-out
        border-2 border-b-[6px] 
        ${activeScale ? 'active:border-b-2 active:translate-y-[4px] active:scale-[0.98]' : ''}
        rounded-[20px] flex items-center justify-center
        ${disabled ? 'opacity-80' : ''}
        ${className}
        ${colorClass}
        ${borderClass}
        ${shadowColor}
        shadow-sm
      `}
    >
      {children}
    </button>
  );
};

const ToastNotification = ({ message, icon: Icon, isVisible, type = 'info' }) => {
  return (
    <div 
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[150] transition-all duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55) w-[90%] max-w-sm
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'}
      `}
    >
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border-b-4 backdrop-blur-md justify-center text-center relative overflow-hidden
        ${type === 'fire' ? 'bg-orange-500 border-orange-700 text-white' : 
          type === 'love' ? 'bg-rose-500 border-rose-700 text-white' :
          type === 'info' ? 'bg-blue-600 border-blue-800 text-white' : 
          'bg-slate-800 border-slate-950 text-white'}
      `}>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
        {Icon && <Icon className={`w-6 h-6 shrink-0 ${type === 'love' ? 'animate-pulse' : 'animate-bounce'}`} />}
        <span className="font-bold text-sm leading-snug">{message}</span>
      </div>
    </div>
  );
};

export { EnIcon, TutorialHand, TooltipOverlay, SoftBackground, TactileButton, ToastNotification };