// ProfileButton component - standalone for reusability
import { User, Moon, Sun, Maximize, Minimize, LogOut } from 'lucide-react';

const TactileButton = ({children,onClick,className='',colorClass='',borderClass='',shadowColor='',disabled,activeScale=true,type='button',style,id}) => (
  <button id={id} type={type} disabled={disabled} onClick={e=>{if(navigator?.vibrate) navigator.vibrate(15);onClick?.(e)}} style={style}
    className={`relative group transition-all duration-150 ease-out border-2 border-b-[6px] ${activeScale?'active:border-b-2 active:translate-y-[4px] active:scale-[0.98]':''} rounded-[20px] flex items-center justify-center ${disabled?'opacity-80':''} ${className} ${colorClass} ${borderClass} ${shadowColor} shadow-sm`}>{children}</button>
);

export default function ProfileButton({
  profileMenuOpen,
  setProfileMenuOpen,
  isDarkMode,
  setIsDarkMode,
  isFullscreen,
  toggleFullscreen,
  handleLogout
}) {
  return (
    <div className="relative">
      {/* Profile Button */}
      <TactileButton
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        colorClass={isDarkMode ? 'bg-[#2A2640]' : 'bg-white'}
        borderClass={isDarkMode ? 'border-[#3E3859]' : 'border-[#E2E8F0]'}
      >
        <User className="w-5 h-5 text-indigo-500" />
      </TactileButton>

      {/* Dropdown Menu */}
      {profileMenuOpen && (
        <div
          className={`absolute top-full right-0 mt-2 w-56 p-2 rounded-2xl border-2 border-b-4 shadow-xl z-50 animate-fade-in-up ${
            isDarkMode
              ? 'bg-[#2A2640] border-[#3E3859]'
              : 'bg-white border-[#E2E8F0]'
          }`}
        >
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              setProfileMenuOpen(false);
            }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm mb-1 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
            {isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              toggleFullscreen();
              setProfileMenuOpen(false);
            }}
            className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm mb-1 transition-colors ${
              isDarkMode ? 'text-white' : 'text-slate-800'
            }`}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4 text-purple-500" />
            ) : (
              <Maximize className="w-4 h-4 text-purple-500" />
            )}
            {isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
          </button>

          {/* Divider */}
          <div
            className={`h-px my-1 ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
            }`}
          ></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-sm text-red-500 transition-colors`}
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
