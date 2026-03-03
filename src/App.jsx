/*
================================================================================
                        📑 فهرس منظم لملف App.jsx (4716 سطر)
================================================================================

1️⃣  استيرادات - IMPORTS                                  📌 السطور: 1-65
    ✓ Import من React و مكتبات الواجهة
    ✓ استيراد icons من lucide-react

2️⃣  بيانات الأسئلة - QUESTION DATA                      📌 السطور: 67-121
    ✓ questionData object (English و Biology chapters)

3️⃣  المكون الرئيسي App - MAIN APP COMPONENT            📌 السطر: 122
    ✓ دالة App الرئيسية و إدارة الحالة

4️⃣  المكونات الصغيرة - UI COMPONENTS                   📌 السطور: 245-346
    📌 EnIcon (245)                 | 📌 TactileButton (299)
    📌 TutorialHand (253)           | 📌 ToastNotification (325)
    📌 TooltipOverlay (264)         | 📌 handleShareChallenge (346)
    📌 SoftBackground (291)

5️⃣  LoginView - شاشة تسجيل الدخول                       📌 السطر: 365
    ✓ تسجيل الدخول العادي + Google + وضع الضيف

6️⃣  StatsHUD - عرض الإحصائيات                           📌 السطر: 653
    ✓ النقاط والمستوى والشعلة والأسئلة

7️⃣  MonsterCard - بطاقة التحدي                          📌 السطر: 712
    ✓ عرض وضع التحدي الشامل

8️⃣  BattleArenaModal - نافذة اختيار التحدي              📌 السطر: 763
    ✓ اختيار الفصل للتحدي وعرض الدرجات

9️⃣  BottomDock - قائمة الأسفل                           📌 السطر: 873
    ✓ أزرار المهام والأخطاء وحقيبة الأخطاء

🔟  ChaptersView - شاشة الفصول                          📌 السطر: 1016
    ✓ قائمة الفصول (1-8) مع النجوم والقفل

1️⃣1️⃣  LevelsView - شاشة المراحل                          📌 السطر: 1112
    ✓ عرض مراحل الفصل والديمو والنجوم المحفوظة

1️⃣2️⃣  ReviewsView - شاشة المراجعة                        📌 السطر: 1234
    ✓ مراجعة أجزاء الفصول

1️⃣3️⃣  HubScreen - شاشة المركز الرئيسية                   📌 السطر: 1390
    ✓ التنقل بين الفصول والتحديات والمراجعة

1️⃣4️⃣  ChapterPauseMenuModal - قائمة الإيقاف             📌 السطر: 2024
    ✓ خيارات الإيقاف والاستئناف والإعدادات

1️⃣5️⃣  CH_MESSAGES - رسائل الفصول                        📌 السطر: 2179
    ✓ رسائل الإجابة الصحيحة والخاطئة والنهاية

1️⃣6️⃣  أسئلة الفصول - CHAPTER QUESTIONS
    📌 CH_QUESTIONS_EN (2218)   | 📌 CH_QUESTIONS_BIO (2262)
    ✓ أسئلة اللغة الإنجليزية والأحياء

1️⃣7️⃣  ChapterGameScreen - شاشة لعبة الفصول              📌 السطر: 2377
    ✓ إدارة الأسئلة والإجابات وحساب الدرجات والنجوم
    
    دوال مهمة:
    ├─ showFeedbackModal (2770)      | ├─ giveXPForChapter (2883)
    ├─ saveSessionToSupabase (2902)  | ├─ nextQuestion (2922)
    ├─ useFreeze (2932)              | ├─ useBomb (2944)
    └─ startGame (3041)

1️⃣8️⃣  MonsterGameScreen - شاشة لعبة التحدي              📌 السطر: 3751
    ✓ وضع التحدي الشامل مع أسئلة عشوائية

================================================================================
🎯 الاستخدام السريع:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 رسائل الإجابة الصحيحة؟        👉 السطر 2179
🔧 أسئلة الإنجليزية؟            👉 السطر 2218
🔧 نظام النقاط؟                 👉 السطر 2883
🔧 شاشة النتائج والأزرار؟       👉 السطر 3280
🔧 Progress bar؟               👉 السطر 2770 و 2922
================================================================================
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import AdminDashboard from './AdminDashboard.jsx';
import {
  supabase,
  signInWithGoogle, signOut, getSession,
  getUserProfile,
} from './lib/supabase.js';
import { EnIcon, TutorialHand, TooltipOverlay, SoftBackground, TactileButton, ToastNotification } from './components/ui/common.jsx';
import { 
  ArrowLeft,
  Baby,
  Briefcase,
  Calendar,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Check,
  Crown,
  Dna,
  FastForward,
  FileText,
  Fingerprint,
  Flame,
  Footprints,
  Gamepad2,
  Gauge,
  Ghost,
  GraduationCap,
  Heart,
  HelpCircle,
  Home,
  Info,
  Layers,
  List,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Map,
  MapPin,
  Maximize,
  Medal,
  MessageCircle,
  Minimize,
  Moon,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Send,
  Settings,
  Share2,
  Skull,
  Sparkles,
  Star,
  Sun,
  Swords,
  Target,
  Trophy,
  Unlock,
  User,
  Users,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import LevelsView from './screens/LevelsView.jsx';
import ResultScreen from './screens/ResultScreen.jsx';
import { CH_MESSAGES } from './constants/chapterMessages.js';
import { getCHQuestions } from './data/chapterQuestions.js';
import { loadAllStageProgress } from './services/progressService.js';

// ── Answer correctness helpers ─────────────────────────────────────
const normalizeAnswerText = (s) =>
  (s ?? '')
    .toString()
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

// Supabase `correctanswer` may be either:
// - a/b/c/d letter, or
// - the full correct option text
const resolveCorrectAnswerText = (q) => {
  const aRaw = (q?.a ?? '').toString().trim();
  const options = Array.isArray(q?.options) ? q.options : [];

  const letters = ['a', 'b', 'c', 'd'];
  const idx = letters.indexOf(aRaw.toLowerCase());
  if (idx !== -1) return (options[idx] ?? '').toString();

  const normA = normalizeAnswerText(aRaw);
  const matched = options.find(opt => normalizeAnswerText(opt) === normA);
  if (matched != null) return matched.toString();

  return aRaw;
};

// إجمالي المراحل لكل فصل (حسب تقسيمك الحالي في Supabase/الواجهة)
const getTotalStagesForChapter = (chapterNum) => (chapterNum === 1 ? 30 : 12); // الفصل1: ديمو(0) + 29 مرحلة

const questionData = {
  english: {
    ch1: {
      stages: {
        s0: [{
          id: 1, 
          q: "I ______ to the store yesterday.", 
          options: ["go", "went", "gone", "going"], 
          a: "went", 
          explanation: "نستخدم الماضي البسيط (went) لأن الجملة تحتوي على 'yesterday'.",
          golden: false 
        }],
        s1: [{
          id: 2, 
          q: "She ______ glasses before.", 
          options: ["wear", "used to wear", "wears", "wearing"], 
          a: "used to wear", 
          explanation: "نستخدم 'used to' للتعبير عن عادة في الماضي لم تعد موجودة.",
          golden: true 
        }],
      },
      review_parts: {
        p1: [{
          id: 1, 
          q: "Review: She ______ glasses before.", 
          options: ["wear", "used to wear", "wears", "wearing"], 
          a: "used to wear", 
          explanation: "نستخدم 'used to' للتعبير عن عادة في الماضي لم تعد موجودة.",
          golden: true 
        }]
      }
    }
  },
  biology: {
    ch1: {
      stages: {
        s0: [{
          id: 1, 
          q: "Biology Demo Question?", 
          options: ["A", "B", "C", "D"], 
          a: "A", 
          explanation: "...",
          golden: false 
        }]
      },
      review_parts: {}
    }
  }
};


// ═══════════════════════════════════════════════════════════════════
// 🎮 ختمتها - Khtmtha Unified App
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [activeGame, setActiveGame] = useState(null);
  const [activeSubject, setActiveSubject] = useState('english');
  const [activeUserProfile, setActiveUserProfile] = useState(null);
  const [activeBagItem, setActiveBagItem] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  // completedToday: { english: 0, biology: 0 } — مفصول حسب المادة
  const [completedToday, setCompletedToday] = useState(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = JSON.parse(localStorage.getItem('daily_mission') || '{}');
      if (saved.date !== today) return { english: 0, biology: 0 };
      return {
        english: saved.english || 0,
        biology: saved.biology || 0,
      };
    } catch { return { english: 0, biology: 0 }; }
  });

  const [activeChapterNum, setActiveChapterNum] = useState(0);
  const [activeStageId, setActiveStageId] = useState(0);

  const handleStartGame = (mode, subject = 'english', userProfile = null, chapterNum = 0, stageId = 0) => {
    setActiveSubject(subject);
    setActiveUserProfile(userProfile);
    setActiveBagItem(null);
    setActiveChapterNum(chapterNum);
    setActiveStageId(stageId);
    setActiveGame(mode);
    // تتبع Google Analytics
    try { if (window.gtag) window.gtag('event', 'start_game', { game_mode: mode, subject, chapter: chapterNum, stage: stageId }); } catch {}
  };

  const handleStartBagReview = (bagItem) => {
    setActiveBagItem(bagItem);
    // استخدام مادة الحقيبة إذا متوفرة
    if (bagItem?.subject) setActiveSubject(bagItem.subject);
    setActiveGame('bag');
  };

  const handleBagItemCompleted = async (bagItemId) => {
    try {
      const bag = JSON.parse(localStorage.getItem('mistakes_bag') || '[]');
      const item = bag.find(b => b.id === bagItemId);
      const newReplays = (item?.correctReplays || 0) + 1;
      const nextPlayAt = Date.now() + 4 * 60 * 60 * 1000;

      // تحديث localStorage — احذف إذا وصل 4
      const updated = bag
        .map(b => {
          if (b.id !== bagItemId) return b;
          return { ...b, correctReplays: newReplays, nextPlayAt: newReplays < 4 ? nextPlayAt : b.nextPlayAt };
        })
        .filter(b => (b.correctReplays || 0) < 4);
      localStorage.setItem('mistakes_bag', JSON.stringify(updated));

      // تحديث Supabase
      try {
        if (newReplays >= 4) {
          await supabase.from('mistakes_bag').delete().eq('id', bagItemId);
        } else {
          await supabase.from('mistakes_bag').update({
            correct_replays: newReplays,
            next_play_at: new Date(nextPlayAt).toISOString(),
            updated_at: new Date().toISOString(),
          }).eq('id', bagItemId);
        }
      } catch {}
    } catch {}
  };

  // stars: عدد النجوم (1-3) إذا فاز، 0 إذا خسر
  const handleGameExit = (stars = 0, goToNextChapter = false) => {
    const exitedSubject = activeSubject;
    setActiveGame(null);
    setActiveBagItem(null);
    // تتبع Google Analytics
    try { if (window.gtag) window.gtag('event', 'game_complete', { subject: exitedSubject, stars, game_mode: activeGame }); } catch {}
    // المهمة اليومية تزداد فقط عند الفوز بنجمة واحدة على الأقل
    if (stars >= 1) {
      setCompletedToday(prev => {
        const next = { ...prev, [exitedSubject]: (prev[exitedSubject] || 0) + 1 };
        const today = new Date().toISOString().split('T')[0];
        try { localStorage.setItem('daily_mission', JSON.stringify({ date: today, ...next })); } catch {}
        // عند إكمال 2 مهام يومية → يُحسب يوم للشعلة
        const totalToday = (next.english || 0) + (next.biology || 0);
        if (totalToday >= 2) {
          try {
            const lastStreakDate = localStorage.getItem('last_streak_date');
            if (lastStreakDate !== today) {
              const currentStreak = parseInt(localStorage.getItem('player_streak') || '0');
              const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
              const newStreak = lastStreakDate === yesterday ? currentStreak + 1 : 1;
              localStorage.setItem('player_streak', String(newStreak));
              localStorage.setItem('last_streak_date', today);
            }
          } catch {}
        }
        return next;
      });
    }
    // إذا أراد الانتقال للفصل التالي
    if (goToNextChapter && activeChapterNum < 8) {
      setTimeout(() => {
        const nextChapter = activeChapterNum + 1;
        handleStartGame('chapter', activeSubject, activeUserProfile, nextChapter, 0);
      }, 500);
    }
  };

  if (activeGame === 'monster') {
    return <MonsterGameScreen onExit={handleGameExit} subject={activeSubject} userProfile={activeUserProfile} chapterNum={activeChapterNum} />;
  }
  if (activeGame === 'chapter') {
    return <ChapterGameScreen onExit={handleGameExit} subject={activeSubject} userProfile={activeUserProfile} chapterNum={activeChapterNum} stageId={activeStageId} isGuest={isGuest} onStartGame={handleStartGame} />;
  }
  if (activeGame === 'review_part') {
    return <ChapterGameScreen onExit={handleGameExit} subject={activeSubject} userProfile={activeUserProfile} chapterNum={activeChapterNum} stageId={activeStageId} gameMode="review_part" isGuest={isGuest} onStartGame={handleStartGame} />;
  }
  if (activeGame === 'bag' && activeBagItem) {
    return <ChapterGameScreen onExit={handleGameExit} subject={activeSubject} userProfile={activeUserProfile} bagItem={activeBagItem} onBagItemCompleted={handleBagItemCompleted} isGuest={isGuest} onStartGame={handleStartGame} />;
  }
  return <HubScreen onStartGame={handleStartGame} onStartBagReview={handleStartBagReview} completedToday={completedToday} isGuest={isGuest} onGuestModeChange={setIsGuest} />;
}

// ╔═══════════════════════════════════════════════════════════╗
// ║  HUB: Login, Navigation, Chapters, Reviews, Monster      ║
// ╚═══════════════════════════════════════════════════════════╝

// --- 1. المكونات المساعدة والتعريفات ---
// (تم نقل UI helpers إلى `src/components/ui/common.jsx`)

const handleShareChallenge = async (title, text) => {
    const shareData = {
        title: title,
        text: text,
        url: "https://hero-student-game.app",
    };
    if (navigator.share) {
        try { await navigator.share(shareData); } catch (err) { console.log('Error sharing:', err); }
    } else {
        alert("تم نسخ رابط التحدي! 🚀");
    }
};

// --- 2. المكونات الرئيسية ---

// LoginView
// step 0      = شاشة البداية (Google + ضيف)
// step 1,2,3  = تسجيل جديد (اسم، شخصي، محافظة)
// step 'g1,g2,g3' = إكمال ملف Google جديد
const LoginView = ({ isDarkMode, onLoginSuccess, pendingGoogleUser = null, onGoogleProfileComplete }) => {
    const isGoogleFlow = !!pendingGoogleUser;
    const [step, setStep] = useState(isGoogleFlow ? 'g1' : 0);
    const [formData, setFormData] = useState({ name: pendingGoogleUser?.name || '', age: '', gender: '', governorate: '' });
    const [googleLoading, setGoogleLoading] = useState(false);
    const [fieldError, setFieldError] = useState('');

    const governorates = ["بغداد","البصرة","نينوى","أربيل","النجف","كربلاء","كركوك","الأنبار","ديالى","ذي قار","بابل","واسط","ميسان","القادسية","المثنى","صلاح الدين","دهوك","السليمانية"];
    const ages = Array.from({length: 14}, (_, i) => 15 + i);
    const inputClass = `w-full p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white font-bold outline-none focus:border-yellow-400 transition-all text-center shadow-sm`;

    // ── Google OAuth ── يتحقق Supabase تلقائياً إذا المستخدم موجود أو جديد
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setFieldError('');
        try {
            // استخدام URL الحالي الفعلي (يعمل في localhost و Vercel)
            // يمكن استخدام متغير بيئة VITE_SITE_URL للإنتاج، أو URL الحالي
            const redirectUrl = import.meta.env.VITE_SITE_URL || (window.location.origin + window.location.pathname);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: redirectUrl },
            });
            if (error) throw error;
        } catch {
            setFieldError('فشل تسجيل الدخول بـ Google. حاول مجدداً.');
            setGoogleLoading(false);
        }
    };

    // ── خطوات Google جديد ──
    const handleGoogleNext = async () => {
        setFieldError('');
        if (step === 'g1' && !formData.name.trim()) { setFieldError('شنو اسمك يا بطل؟'); return; }
        if (step === 'g2' && (!formData.age || !formData.gender)) { setFieldError('المعلومات ناقصة!'); return; }
        if (step === 'g3') {
            if (!formData.governorate) { setFieldError('من أي محافظة؟'); return; }
            
            // ✅ فحص الأيميل المكرر
            try {
              const { data: existingEmail } = await supabase
                .from('users')
                .select('id, email')
                .eq('email', pendingGoogleUser.email)
                .neq('auth_id', pendingGoogleUser.id)
                .maybeSingle();
              
              if (existingEmail) {
                setFieldError('هذا الايميل مسجل بالفعل! استخدم ايميل آخر أو سجل الدخول.');
                return;
              }
            } catch (e) {
              console.error('Error checking email:', e);
            }
            
            try {
                await supabase.from('users').update({
                    full_name: formData.name.trim(),
                    age: parseInt(formData.age),
                    gender: formData.gender,
                    region: formData.governorate,
                }).eq('auth_id', pendingGoogleUser.id);
            } catch {}
            onGoogleProfileComplete({ 
              name: formData.name.trim(), 
              age: parseInt(formData.age),
              gender: formData.gender,
              region: formData.governorate
            });
            return;
        }
        const nx = { 'g1': 'g2', 'g2': 'g3' };
        setStep(nx[step]);
    };

    // ── شريط التقدم ──
    const StepsProgressBar = ({ numericStep }) => {
        const pct = numericStep === 1 ? '0%' : numericStep === 2 ? '50%' : '100%';
        return (
            <div className="flex items-center justify-between mb-8 px-4 w-full relative">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-4 transition-all duration-500 ${numericStep >= s ? 'bg-yellow-400 border-yellow-200 text-yellow-900 scale-110 shadow-lg' : 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'}`}>
                            {numericStep > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                        <span className={`text-[10px] font-bold mt-2 ${numericStep >= s ? 'text-yellow-600' : 'text-slate-400'}`}>
                            {s === 1 ? 'الاسم' : s === 2 ? 'شخصي' : 'المكان'}
                        </span>
                    </div>
                ))}
                <div className="absolute top-5 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-0"></div>
                <div className="absolute top-5 left-8 h-1 bg-yellow-400 transition-all duration-500 ease-out -z-0" style={{ width: pct }}></div>
            </div>
        );
    };

    const isGFlow = typeof step === 'string' && step.startsWith('g');
    const numericStep = isGFlow ? ({'g1':1,'g2':2,'g3':3}[step]) : 1;

    // إذا رجعنا من Google وبعدها تم ضبط pendingGoogleUser من الأعلى،
    // نتأكد أننا نحول مباشرة إلى خطوة g1 لأول مرة
    useEffect(() => {
        if (pendingGoogleUser && !isGFlow) {
            setStep('g1');
            setFormData(prev => ({
                ...prev,
                name: pendingGoogleUser.name || prev.name || ''
            }));
        }
    }, [pendingGoogleUser, isGFlow]);

    const renderFields = (s, onNext) => (<>
        {(s === 'g1') && (<>
            <h3 className={`text-xl font-black text-center mb-2 ${isDarkMode?'text-white':'text-slate-800'}`}>أهلاً! شنو اسمك؟ 👋</h3>
            <p className="text-center text-xs text-slate-400 font-bold mb-4">سجّلت بـ Google — أكمل بياناتك مرة وحدة</p>
            <input type="text" placeholder="الاسم الكامل" value={formData.name} autoFocus
                onChange={e=>setFormData(p=>({...p,name:e.target.value}))}
                onKeyDown={e=>e.key==='Enter'&&onNext()}
                className={inputClass} />
        </>)}
        {(s === 'g2') && (<>
            <h3 className={`text-xl font-black text-center mb-6 ${isDarkMode?'text-white':'text-slate-800'}`}>معلوماتك الشخصية 👤</h3>
            <div className="flex gap-3">
                <select value={formData.age} onChange={e=>setFormData(p=>({...p,age:e.target.value}))} className={`${inputClass} flex-[0.6] appearance-none cursor-pointer`}>
                    <option value="">العمر</option>
                    {ages.map(a=><option key={a} value={a}>{a}</option>)}
                </select>
                <select value={formData.gender} onChange={e=>setFormData(p=>({...p,gender:e.target.value}))} className={`${inputClass} flex-1 appearance-none cursor-pointer`}>
                    <option value="">الجنس</option>
                    <option value="male">ذكر 🙋‍♂️</option>
                    <option value="female">أنثى 🙋‍♀️</option>
                </select>
            </div>
        </>)}
        {(s === 'g3') && (<>
            <h3 className={`text-xl font-black text-center mb-6 ${isDarkMode?'text-white':'text-slate-800'}`}>من أي محافظة؟ 📍</h3>
            <select value={formData.governorate} onChange={e=>setFormData(p=>({...p,governorate:e.target.value}))} className={`${inputClass} appearance-none cursor-pointer`}>
                <option value="">اختر المحافظة</option>
                {governorates.map(g=><option key={g} value={g}>{g}</option>)}
            </select>
        </>)}
    </>);

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center px-5 py-10 w-full animate-fade-in-up" dir="rtl" style={{paddingTop:'max(2.5rem,env(safe-area-inset-top,2.5rem))',paddingBottom:'max(2.5rem,env(safe-area-inset-bottom,2.5rem))'}}>

            {/* الشعار */}
            <div className={`text-center mb-8 relative z-10 transition-all duration-500 ${step !== 0 ? 'scale-75 mb-2' : ''}`}>
                <div className="w-24 h-24 mx-auto bg-yellow-400 rounded-[2rem] rotate-[-3deg] flex items-center justify-center shadow-xl border-b-8 border-yellow-600 mb-4 relative group hover:rotate-0 transition-transform duration-300">
                    <CheckCircle2 className="w-12 h-12 text-white drop-shadow-md" strokeWidth={3} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-yellow-200 animate-bounce">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                </div>
                <h1 className={`text-4xl md:text-5xl font-black tracking-tighter mb-1 ${isDarkMode?'text-white':'text-slate-800'}`}>ختمتها<span className="text-yellow-500">.</span></h1>
                <p className={`text-xs font-bold opacity-60 ${isDarkMode?'text-slate-300':'text-slate-600'}`}>الطريق الأمتع للـ 100</p>
            </div>

            <div className="w-full max-w-sm relative z-20">

                {/* ── شاشة البداية ── */}
                {step === 0 && (
                    <div className="animate-fade-in-up">
                        <div className={`p-6 rounded-[32px] border-2 shadow-2xl backdrop-blur-lg mb-5 ${isDarkMode?'bg-slate-800/80 border-slate-700':'bg-white/90 border-white'}`}>

                            {/* Google */}
                            <TactileButton onClick={handleGoogleSignIn} disabled={googleLoading}
                                className="w-full p-4 rounded-2xl flex items-center justify-center gap-3 mb-3"
                                colorClass="bg-white" borderClass="border-slate-200">
                                <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                                    {googleLoading
                                        ? <span className="animate-spin w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full inline-block"></span>
                                        : <svg viewBox="0 0 24 24" className="w-6 h-6">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                    }
                                </div>
                                <span className="font-bold text-base text-slate-700">
                                    {googleLoading ? 'جاري الدخول...' : 'دخول سريع عبر Google'}
                                </span>
                            </TactileButton>

                            {/* ضيف */}
                            <TactileButton onClick={() => onLoginSuccess({name:'ضيف',isGuest:true},true)}
                                className="w-full p-4 rounded-2xl"
                                colorClass="bg-indigo-500" borderClass="border-indigo-700">
                                <span className="font-black text-white text-lg flex items-center justify-center gap-2">
                                    👤 الدخول كضيف (تجربة مجانية)
                                </span>
                            </TactileButton>
                        </div>

                        {/* روابط المجتمع */}
                        <div className="flex gap-3 mb-4 mt-5">
                            <TactileButton className="flex-1 p-3 rounded-2xl gap-2" colorClass="bg-[#229ED9]" borderClass="border-[#1A7DB0]" onClick={()=>window.open('https://t.me/khtmtha','_blank')}>
                                <Send className="w-4 h-4 text-white -rotate-45" /><span className="font-bold text-white text-xs">مجتمع الطلاب</span>
                            </TactileButton>
                            <TactileButton className="flex-1 p-3 rounded-2xl gap-2" colorClass="bg-[#25D366]" borderClass="border-[#1da851]" onClick={()=>window.open('https://wa.me/message/AQBNBH24LYHJO1','_blank')}>
                                <MessageCircle className="w-4 h-4 text-white" /><span className="font-bold text-white text-xs">واجهت مشكلة؟</span>
                            </TactileButton>
                        </div>
                    </div>
                )}

                {/* ── خطوات Google جديد (g1-g3) ── */}
                {isGFlow && (
                    <div className="animate-slide-up">
                        <StepsProgressBar numericStep={numericStep} />
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-2 border-slate-100 dark:border-slate-700 shadow-xl">
                            {renderFields(step, handleGoogleNext)}
                            {fieldError && <p className="text-red-500 text-xs font-bold text-center mt-3">{fieldError}</p>}
                            <div className="flex gap-3 mt-6">
                                {step !== 'g1' && (
                                    <button onClick={()=>{ setFieldError(''); setStep(step==='g3'?'g2':'g1'); }}
                                        className="flex-[0.3] p-4 rounded-xl font-bold text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">رجوع</button>
                                )}
                                <TactileButton onClick={handleGoogleNext} className="flex-1 p-4 rounded-xl" colorClass="bg-yellow-400" borderClass="border-yellow-600">
                                    <span className="font-black text-yellow-900 text-lg">{step === 'g3' ? 'انطلق! 🚀' : 'التالي'}</span>
                                </TactileButton>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// --- كبسولة الإحصائيات ---
const StatsHUD = ({ isDarkMode, compact = false, onFlameClick, onQuestionsClick, isGuest, userProfile, subject = 'english' }) => {
  const localStreak = isGuest ? 0 : parseInt(localStorage.getItem('player_streak') || '0');
  const xpKey = `player_xp_${subject}`;
  const localXP = isGuest ? 0 : parseInt(localStorage.getItem(xpKey) || '0');
  const rawStreak = isGuest ? 0 : (localStreak || userProfile?.current_streak || 0);
  // الشعلة = عدد وحدات الـ 7 أيام المتتالية (تبدأ من 0)
  const displayDays = Math.floor(rawStreak / 7);
  const questionsKey = subject === 'biology' ? 'biology_questions_answered' : 'english_questions_answered';
  const localQCount = parseInt(localStorage.getItem(`questions_answered_${subject}`) || '0');
  const displayQuestions = isGuest ? 0 : (localQCount || userProfile?.[questionsKey] || 0);
  const displayXP = isGuest ? 0 : (localXP || 0);
  // شعلة نارية نشطة عند وحدة واحدة على الأقل (7 أيام)
  const hasFireStreak = displayDays >= 1;

  if (compact) {
    return (
      <div className={`w-full mb-6 p-3 px-5 rounded-2xl border-2 flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
         <div onClick={onFlameClick} className="flex items-center gap-3 cursor-pointer active:scale-90 transition-transform">
           <div className="relative">
             <Flame className={`w-6 h-6 ${isGuest ? 'text-slate-400' : hasFireStreak ? 'text-red-500 fill-red-500' : 'text-orange-500 fill-orange-500 animate-pulse'}`} />
             {hasFireStreak && <span className="absolute -top-1 -right-1 text-[8px]">🔥</span>}
           </div>
           <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayDays}</span>
         </div>
         <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
         <div onClick={onQuestionsClick} className="flex items-center gap-3 cursor-pointer active:scale-90 transition-transform"><Target className={`w-6 h-6 ${isGuest ? 'text-slate-400' : 'text-blue-400'}`} /><span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayQuestions}</span></div>
         <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
         <div className="flex items-center gap-3"><Star className={`w-6 h-6 ${isGuest ? 'text-slate-400' : 'text-yellow-400 fill-yellow-400'}`} /><span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayXP}</span></div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg mx-auto mb-6 p-3 rounded-2xl border-2 border-b-4 flex items-center justify-between relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0] shadow-sm'}`}>
       <div onClick={(e) => { e.stopPropagation(); onFlameClick(); }} className="flex-1 flex flex-col items-center justify-center relative group cursor-pointer active:scale-95 transition-transform">
          <div className="flex items-center gap-1 mb-0.5">
            <div className={`p-1.5 rounded-lg relative ${isGuest ? 'bg-slate-100 dark:bg-slate-700' : hasFireStreak ? 'bg-red-100' : 'bg-orange-100'}`}>
              <Flame className={`w-4 h-4 ${isGuest ? 'text-slate-400' : hasFireStreak ? 'text-red-500 fill-red-500' : 'text-orange-500 fill-orange-500 animate-pulse'}`} />
              {hasFireStreak && <span className="absolute -top-1 -right-1 text-[7px]">🔥</span>}
            </div>
            <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayDays}</span>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${hasFireStreak ? 'text-red-400' : 'text-slate-400'}`}>{hasFireStreak ? '🔥 متوهج!' : 'أيام'}</span>
       </div>
       <div className="w-0.5 h-8 bg-slate-100 dark:bg-slate-700/50 rounded-full"></div>
       <div onClick={(e) => { e.stopPropagation(); onQuestionsClick(); }} className="flex-[1.5] flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
          <div className="flex items-baseline gap-1 mb-0.5"><span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayQuestions}</span><span className="text-xs font-bold text-slate-400">/10k</span><Target className={`w-3.5 h-3.5 ml-1 ${isGuest ? 'text-slate-400' : 'text-blue-400'}`} /></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">سؤال</span>
       </div>
       <div className="w-0.5 h-8 bg-slate-100 dark:bg-slate-700/50 rounded-full"></div>
       <div className="flex-1 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
          <div className="flex items-center gap-1 mb-0.5"><span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayXP}</span><Star className={`w-4 h-4 ${isGuest ? 'text-slate-400' : 'text-yellow-400 fill-yellow-400'}`} /></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XP</span>
       </div>
    </div>
  );
};

// بطاقة الوحش
const MonsterCard = ({ isDarkMode, onClick, isGuest, subject = 'english' }) => {
  // أعلى نقاط من كل الفصول + التحدي الشامل (ch0)
  const globalMaxScore = isGuest ? 0 : (() => {
    let max = 0;
    for (let n = 0; n <= 8; n++) {
      const s = parseInt(localStorage.getItem(`monster_hs_${subject}_ch${n}`) || '0');
      if (s > max) max = s;
    }
    return max;
  })();
  return (
  <TactileButton 
    onClick={onClick}
    disabled={false} 
    className={`w-full mb-6 overflow-hidden p-0 group ${isGuest ? 'opacity-80 grayscale-[0.8]' : ''}`}
    colorClass={isDarkMode ? 'bg-[#7C3AED]' : 'bg-[#8B5CF6]'} 
    borderClass={isDarkMode ? 'border-[#5B21B6]' : 'border-[#7C3AED]'} 
    shadowColor={isGuest ? '' : "shadow-purple-200 dark:shadow-none"}
  >
    <div className="absolute inset-0 bg-white/5"></div> 
    {!isGuest && <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>}
    
    <div className="relative z-10 w-full p-6 flex items-center justify-between">
       <div className="flex flex-col items-start text-right w-full">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-xl border border-white/20 mb-2 shadow-sm">
             <Swords className="w-3.5 h-3.5 text-white" />
             <span className="text-[10px] font-black text-white tracking-wide">ENDLESS</span>
          </div>
          <h2 className="text-3xl font-black text-white drop-shadow-sm mb-1">تحدي الوحش</h2>
          <p className="text-purple-100 text-xs font-bold mb-4 opacity-90">{isGuest ? 'سجل لفتح التحدي' : 'اكسر حاجز الملل!'}</p>
          <div className="flex items-center gap-2 bg-black/20 p-2 rounded-2xl border border-white/10 mb-2 w-fit">
             <div className="flex flex-col items-start px-1">
                <span className="text-[9px] text-purple-100 font-bold uppercase opacity-80">أعلى سكور</span>
                <span className="text-xl font-black text-white font-mono leading-none">{globalMaxScore > 999 ? (globalMaxScore / 1000).toFixed(1) + 'k' : globalMaxScore}</span>
             </div>
             <div className="w-px h-8 bg-white/20 mx-2"></div>
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-transform ${isGuest ? 'bg-slate-400 text-slate-200' : 'bg-white text-purple-600 group-hover:scale-110'}`}>
                {isGuest ? <Lock className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
             </div>
          </div>
       </div>
       <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 transform group-hover:rotate-12 transition-transform duration-500">
          <Swords className="w-32 h-32 text-white" />
       </div>
       {isGuest && <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>}
    </div>
  </TactileButton>
  );
};

// --- واجهة ساحة المعركة (BattleArenaModal) ---
const BattleArenaModal = ({ isDarkMode, onClose, chapterScores, playerName, onStartGame, subject = 'english', onShowToast }) => {
    const [showVsTutorial, setShowVsTutorial] = useState(() => {
        try { return !JSON.parse(localStorage.getItem('seen_tooltips') || '{}').vs_tutorial; } catch { return true; }
    });
    const dismissVsTutorial = () => {
        setShowVsTutorial(false);
        try {
            const seen = JSON.parse(localStorage.getItem('seen_tooltips') || '{}');
            seen.vs_tutorial = true;
            localStorage.setItem('seen_tooltips', JSON.stringify(seen));
        } catch {}
    };
    const [selectedChapter, setSelectedChapter] = useState(null);
    const bgCard = isDarkMode ? 'bg-[#1E293B]' : 'bg-white';
    const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
    const textSecondary = isDarkMode ? 'text-slate-400' : 'text-slate-500';
    const accentColor = 'text-[#F59E0B]'; 
    const primaryColor = 'bg-[#3B82F6]'; 
    const onShare = (chapterName, score) => {
        const text = `🎮 تحدي الأبطال!\n\nالمحارب (${playerName}) حقق ${score} XP في ${chapterName}..\nويتحداك تكسر هذا الرقم! 💪🔥`;
        handleShareChallenge('تحدي ختمتها!', text);
    };

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 font-['Cairo'] backdrop-blur-sm transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/80' : 'bg-slate-200/50'}`}>
            <div className={`relative w-full max-w-sm md:max-w-md p-6 pb-8 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 animate-pop-in ${bgCard} ${isDarkMode ? 'shadow-black/50 border border-slate-700' : 'shadow-xl border border-slate-100'}`}>
                <div className={`w-8 h-1 rounded-full mx-auto mb-6 opacity-20 ${isDarkMode ? 'bg-white' : 'bg-slate-900'}`}></div>
                <div className="flex items-center justify-between mb-8">
                    <div className="flex flex-col">
                        <h3 className={`text-3xl font-black ${textPrimary} tracking-tight leading-none flex items-center gap-2`}><GraduationCap className={`w-8 h-8 ${accentColor}`} /> ساحة التحدي</h3>
                        <div className="flex items-center gap-1.5 mt-1"><span className={`text-xs font-bold ${textSecondary}`}>اختر التحدي الدراسي</span><Flame className="w-3 h-3 text-orange-500 fill-orange-500 animate-pulse" /></div>
                    </div>
                    <button onClick={onClose} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-slate-100 hover:bg-slate-200'}`}><X className={`w-5 h-5 ${textPrimary}`} /></button>
                </div>
                {/* إشعار "تحدى صديقك" — يظهر فوق الـ grid مرة واحدة فقط */}
                {showVsTutorial && (
                    <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-2xl bg-yellow-400/20 border border-yellow-400/40 animate-fade-in">
                        <span className="text-lg">🔥</span>
                        <p className="text-yellow-700 dark:text-yellow-300 font-black text-sm flex-1">تحدى صديقك! اضغط VS بجانب أي فصل أنهيته</p>
                        <button onClick={dismissVsTutorial} className="text-yellow-600 hover:text-yellow-800 transition-colors"><X className="w-4 h-4" /></button>
                    </div>
                )}
                <div className="grid grid-cols-4 gap-3 mb-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                        const isChapterLocked = num > 1;
                        const score = isChapterLocked ? 0 : (chapterScores[num] || 0);
                        const hasScore = score > 0;
                        const isSelected = selectedChapter === num;

                        if (isChapterLocked) {
                            return (
                                <div key={num} className="relative group h-28">
                                    <div
                                        onClick={() => onShowToast?.('🔒 الفصل قريباً!')}
                                        className={`w-full h-full flex flex-col items-center justify-center !rounded-[20px] cursor-pointer opacity-40 select-none ${isDarkMode ? 'bg-[#334155]' : 'bg-slate-100'}`}
                                    >
                                        <span className={`text-[10px] font-bold mb-0.5 opacity-80 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>الفصل</span>
                                        <span className={`text-3xl font-black leading-none mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>{num}</span>
                                        <Lock className="w-4 h-4 text-slate-400 mt-1" />
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={num} className="relative group h-28">
                                <TactileButton onClick={() => { setSelectedChapter(num); onStartGame('monster', subject, null, num); }} className={`w-full h-full flex-col !gap-0 !rounded-[20px] border-none transition-all ${isSelected ? `${primaryColor} text-white shadow-lg shadow-blue-500/30 translate-y-[-4px]` : (isDarkMode ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-slate-100 hover:bg-slate-200')}`}>
                                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                                        <span className={`text-[10px] font-bold mb-0.5 opacity-80`}>الفصل</span>
                                        <span className={`text-3xl font-black leading-none mb-1`}>{num}</span>
                                        <div className="mt-2 h-5 flex items-center justify-center">
                                            {hasScore ? (
                                                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-black/5 dark:bg-white/10'}`}>
                                                    <Star className={`w-2.5 h-2.5 ${isSelected ? 'text-yellow-300 fill-current' : 'text-yellow-500 fill-current'}`} />
                                                    <span className={`text-[9px] font-black ${isSelected ? 'text-white' : (isDarkMode ? 'text-slate-300' : 'text-slate-600')}`}>{score > 999 ? (score/1000).toFixed(1) + 'k' : score}</span>
                                                </div>
                                            ) : (
                                                <span className={`text-[9px] font-bold opacity-40 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>ابدأ</span>
                                            )}
                                        </div>
                                    </div>
                                </TactileButton>
                                {hasScore && (
                                    <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 z-30">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dismissVsTutorial();
                                                onShare(`الفصل ${num}`, score);
                                            }}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-[3px]
                                                ${isDarkMode ? 'border-[#1E293B] bg-white text-slate-900' : 'border-white bg-slate-900 text-white'}
                                            `}
                                        >
                                            <span className="text-[9px] font-black italic">VS</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="relative w-full mt-2"><TactileButton className={`w-full p-0 !rounded-[28px] overflow-hidden group border-none opacity-50 ${isDarkMode ? 'bg-slate-600' : 'bg-slate-400'}`} onClick={() => onShowToast?.('🔒 التحدي الشامل قريباً!')}><div className="w-full p-5 flex items-center justify-between z-10 relative"><div className="flex items-center gap-4"><div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"><Lock className="w-7 h-7 text-white" /></div><div className="text-right"><div className="flex items-center gap-2 mb-1"><span className="text-xl font-black text-white">التحدي الشامل</span></div><div className="flex items-center gap-1.5 text-white/90"><span className="text-xs font-bold text-white/70">قريباً</span></div></div></div><div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white"><Lock className="w-5 h-5" /></div></div></TactileButton></div>
            </div>
        </div>
    );
};


// القائمة السفلية (BottomDock)
const BottomDock = ({ isDarkMode, onTaskClick, onMistakeClick, completedToday = 0, onStartBagReview, subject = 'english' }) => {
    const [mistakesOpen, setMistakesOpen] = useState(false);
    const [bagItems, setBagItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('mistakes_bag') || '[]'); } catch { return []; }
    });

    // تحديث الحقيبة عند الفتح — أولاً من localStorage ثم Supabase (للمزامنة)
    const openBag = async () => {
        try { setBagItems(JSON.parse(localStorage.getItem('mistakes_bag') || '[]')); } catch {}
        setMistakesOpen(true);

        const userDbId = localStorage.getItem('user_db_id');
        if (userDbId) {
            try {
                const { data } = await supabase
                    .from('mistakes_bag')
                    .select('*')
                    .eq('user_db_id', userDbId)
                    .lt('correct_replays', 4)
                    .order('added_at');
                if (data && data.length > 0) {
                    const synced = data.map(r => ({
                        id: r.id,
                        type: 'questions',
                        label: r.label || '',
                        subject: r.subject,
                        questions: r.questions || [],
                        correctReplays: r.correct_replays || 0,
                        addedAt: new Date(r.added_at).getTime(),
                        nextPlayAt: new Date(r.next_play_at).getTime(),
                    }));
                    setBagItems(synced);
                    localStorage.setItem('mistakes_bag', JSON.stringify(synced));
                }
            } catch {}
        }
    };

    const now = Date.now();
    // فلترة: تُخفى العناصر التي وصلت 4 مرات صحيحة وتُصفّى حسب المادة الحالية
    const activeBag = bagItems.filter(item => (item.correctReplays || 0) < 4 && (!item.subject || item.subject === subject));
    const bagCount = activeBag.length;

    const formatCountdown = (nextPlayAt) => {
        const diff = nextPlayAt - now;
        if (diff <= 0) return null;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        return h > 0 ? `${h}س ${m}د` : `${m} دقيقة`;
    };

    // taskState يُحدد تلقائياً من عدد المراحل المكتملة اليوم
    // completedToday قد يكون object أو رقم
    const totalCompleted = typeof completedToday === 'object' 
      ? ((completedToday?.english || 0) + (completedToday?.biology || 0))
      : (completedToday || 0);
    const taskState = totalCompleted >= 2 ? 2 : totalCompleted >= 1 ? 1 : 0;

    const currentTask = [
        { color: 'bg-rose-400', border: 'border-rose-600', text: 'text-rose-900', label: 'ابدأ المهام', sub: '0/2', icon: Target, iconBg: 'bg-rose-100' },
        { color: 'bg-yellow-400', border: 'border-yellow-600', text: 'text-yellow-900', label: 'جاري العمل', sub: '1/2', icon: Play, iconBg: 'bg-yellow-100' },
        { color: 'bg-emerald-400', border: 'border-emerald-600', text: 'text-emerald-900', label: 'أحسنت!', sub: '2/2', icon: CheckCircle2, iconBg: 'bg-emerald-100' }
    ][taskState];

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
            <div className="max-w-lg mx-auto flex items-end justify-between pointer-events-auto">
                <div className="relative">
                    {mistakesOpen && (
                        <div className={`absolute bottom-full left-0 mb-3 w-64 p-4 rounded-3xl border-2 border-b-4 shadow-xl animate-fade-in origin-bottom-left ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
                            <div className="flex justify-between items-center mb-3">
                                <h3 className={`font-black text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>حقيبة الأخطاء 🎒</h3>
                                <button onClick={() => setMistakesOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
                            </div>
                            {activeBag.length === 0 ? (
                                <p className="text-xs text-slate-500 text-center py-3">الحقيبة فارغة! ما عندك أخطاء 🎉</p>
                            ) : (
                                <div className="space-y-2 max-h-56 overflow-y-auto">
                                    {activeBag.map(item => {
                                        const countdown = formatCountdown(item.nextPlayAt);
                                        const canPlay = !countdown;
                                        return (
                                            <div key={item.id} className={`rounded-xl p-3 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${item.type === 'stage' ? 'bg-purple-100 text-purple-700' : 'bg-red-100 text-red-700'}`}>
                                                        {item.type === 'stage' ? '📚 مرحلة كاملة' : '❓ أسئلة خاطئة'}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400">{item.correctReplays}/4 ✓</span>
                                                </div>
                                                <p className={`text-xs font-bold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{item.label}</p>
                                                {canPlay ? (
                                                    <button
                                                        onClick={() => {
                                                            setMistakesOpen(false);
                                                            if (onStartBagReview) onStartBagReview(item);
                                                        }}
                                                        className="w-full py-1.5 bg-amber-400 border-b-2 border-amber-600 rounded-lg text-xs font-black text-amber-900 active:translate-y-0.5 transition-all"
                                                    >
                                                        العب الآن ▶
                                                    </button>
                                                ) : (
                                                    <div className="w-full py-1.5 bg-slate-200 rounded-lg text-xs font-bold text-slate-500 text-center">
                                                        ⏳ {countdown}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                    <TactileButton
                        onClick={(e) => {
                            if (onMistakeClick && onMistakeClick(e) === false) return;
                            if (mistakesOpen) setMistakesOpen(false); else openBag();
                        }}
                        className="w-16 h-16 rounded-[20px] flex flex-col gap-1"
                        colorClass={isDarkMode ? 'bg-yellow-500' : 'bg-[#FCD34D]'}
                        borderClass={isDarkMode ? 'border-yellow-700' : 'border-yellow-700'}
                    >
                         <Briefcase className="w-6 h-6 text-amber-800" />
                         {bagCount > 0 && (
                             <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm animate-bounce">{bagCount}</span>
                         )}
                    </TactileButton>
                </div>
                <TactileButton
                    onClick={(e) => { onTaskClick(e); }}
                    className="h-16 px-6 rounded-[20px] flex items-center justify-between gap-6 min-w-[190px]"
                    colorClass={currentTask.color}
                    borderClass={currentTask.border}
                >
                    <div className={`flex flex-col items-start ${currentTask.text}`}>
                        <span className="text-[10px] opacity-80 font-bold">المهمة اليومية</span>
                        <span className="text-sm font-black tracking-wide">{currentTask.label}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full ${currentTask.iconBg} flex items-center justify-center border-2 border-white/40 shadow-sm`}>
                        {taskState === 2 ? <CheckCircle2 className="w-5 h-5 text-teal-600" /> : <span className={`font-black text-sm ${currentTask.text}`}>{currentTask.sub}</span>}
                    </div>
                </TactileButton>
            </div>
        </div>
    );
};

// واجهة الفصول (ChaptersView)
const ChaptersView = ({ isDarkMode, onBack, onFlameClick, onQuestionsClick, onChapterClick, isGuest, onShowLogin, userProfile, subject = 'english' }) => {
    const chapterNames = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن'];
    const STAGES_PER_CHAPTER = 12; // للفصول 2-8

    const handleChapterClick = (num) => {
        if (isGuest && num > 1) {
            onShowLogin();
        } else {
            onChapterClick(num);
        }
    };

    // حساب نسبة إكمال فصل معين (Supabase أولاً، ثم cache localStorage)
    const [supabaseDoneMap, setSupabaseDoneMap] = useState({}); // { [chapterNum]: Set(stages) }
    useEffect(() => {
        const userDbId = (() => { try { return localStorage.getItem('user_db_id'); } catch { return null; } })();
        if (isGuest || !userDbId) return;
        let cancelled = false;
        (async () => {
            try {
                const rows = await loadAllStageProgress({ userDbId, subject });
                if (cancelled) return;
                const map = {};
                rows.forEach(r => {
                    const ch = Number(r.chapter);
                    const st = Number(r.stage);
                    if (!map[ch]) map[ch] = new Set();
                    map[ch].add(st);
                });
                setSupabaseDoneMap(map);
            } catch {}
        })();
        return () => { cancelled = true; };
    }, [isGuest, subject]);

    const getChapterProgress = (num) => {
        const total = getTotalStagesForChapter(num);
        const supaSet = supabaseDoneMap[num];
        if (supaSet && total > 0) {
            return Math.min(100, Math.round((supaSet.size / total) * 100));
        }
        return 0;
    };

    const getProgressColor = (p) => {
        if (p === 100) return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
        if (p >= 90) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse';
        if (p >= 50) return 'bg-orange-500';
        return 'bg-yellow-400';
    };

    return (
        <div className="animate-fade-in-up pb-32">
            <StatsHUD isDarkMode={isDarkMode} compact={true} onFlameClick={onFlameClick} onQuestionsClick={onQuestionsClick} isGuest={isGuest} userProfile={userProfile} subject={subject} />
            <div className="flex items-center gap-4 mb-6">
                <TactileButton onClick={() => onBack('home')} className="w-12 h-12 rounded-xl" colorClass={isDarkMode ? 'bg-slate-800' : 'bg-white'} borderClass={isDarkMode ? 'border-slate-700' : 'border-slate-200'}>
                    <ArrowLeft className={isDarkMode ? 'text-white' : 'text-slate-700'} />
                </TactileButton>
                <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>خريطة الفصول</h2>
            </div>

            <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                    // الفصل 1 فقط متاح حالياً — باقي الفصول مقفولة حتى رفع بياناتها
                    const isLocked = isGuest ? num > 1 : num > 1;
                    const progress = isLocked ? 0 : getChapterProgress(num);

                    return (
                        <TactileButton
                            key={num}
                            onClick={() => !isLocked && handleChapterClick(num)}
                            className={`w-full p-5 flex items-center justify-between rounded-[28px] group transition-all ${isLocked ? 'opacity-60' : ''}`}
                            colorClass={isLocked ? (isDarkMode ? 'bg-slate-900' : 'bg-slate-200') : (isDarkMode ? 'bg-slate-800' : 'bg-white')}
                            borderClass={isLocked ? (isDarkMode ? 'border-slate-800' : 'border-slate-300') : (isDarkMode ? 'border-slate-700' : 'border-slate-200')}
                        >
                            <div className="flex items-center gap-5 w-full">
                                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl font-black border-2 shadow-inner transform group-active:scale-90 transition-transform ${isLocked ? (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-500' : 'bg-slate-300 border-slate-400 text-slate-500') : (isDarkMode ? 'bg-[#1E293B] border-slate-700 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-500')}`}>
                                    {isLocked ? <Lock className="w-8 h-8" /> : num}
                                </div>

                                <div className="flex-1 flex flex-col justify-center h-full">
                                    <span className={`block text-xl font-black mb-2 ${isLocked ? 'text-slate-500' : (isDarkMode ? 'text-white' : 'text-slate-800')}`}>الفصل {chapterNames[num - 1]}</span>

                                    {!isLocked ? (
                                        <div className="w-full max-w-[140px]">
                                            <div className="flex justify-between items-end mb-1">
                                                <span className={`text-[10px] font-bold ${progress >= 90 ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
                                                    {progress === 100 ? '✅ مكتمل!' : progress >= 90 ? '🔥 قريب!' : progress > 0 ? 'جاري...' : 'ابدأ'}
                                                </span>
                                                <span className={`text-xs font-black ${progress === 100 ? 'text-emerald-500' : progress >= 90 ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`}>
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner border border-black/5 dark:border-white/5">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ease-out ${getProgressColor(progress)}`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 mt-1">
                                            <Lock className="w-3 h-3 text-slate-400" />
                                            <span className="text-xs font-bold text-slate-400">قريباً</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {isLocked && <div className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-300 text-slate-500'}`}>قريباً</div>}
                        </TactileButton>
                    );
                })}
            </div>
        </div>
    );
};

// LevelsView تم نقله إلى `src/screens/LevelsView.jsx`

// واجهة المراجعات
const ReviewsView = ({ isDarkMode, onBack, isGuest, onShowLogin, onFlameClick, onQuestionsClick, onStartGame, subject = 'english', userProfile }) => {
    const [expandedReview, setExpandedReview] = useState(null); // 'midyear' or 'comprehensive' or chapterId
    const toggleReview = (id) => setExpandedReview(expandedReview === id ? null : id);

    const PARTS_COUNT = 4;
    const partTitles = ['الجزء الأول', 'الجزء الثاني', 'الجزء الثالث', 'الجزء الرابع'];

    // قراءة حالة إنجاز الأجزاء من localStorage
    const getPartDone = (chNum, partNum) => {
        try { return localStorage.getItem(`review_part_done_${subject}_ch${chNum}_p${partNum}`) === '1'; } catch { return false; }
    };
    const getChapterCompletions = (chNum) => {
        try { return parseInt(localStorage.getItem(`review_ch_completions_${subject}_ch${chNum}`) || '0'); } catch { return 0; }
    };

    // بناء مصفوفة الأجزاء ديناميكياً
    const buildChapterParts = (chNum) => {
        return Array.from({ length: PARTS_COUNT }, (_, i) => {
            const partNum = i + 1;
            const done = getPartDone(chNum, partNum);
            const prevDone = partNum === 1 || getPartDone(chNum, partNum - 1);
            return {
                id: partNum,
                title: partTitles[i],
                done,
                status: done ? 'completed' : prevDone ? 'unlocked' : 'locked',
            };
        });
    };

    const [ch1Parts, setCh1Parts] = useState(() => buildChapterParts(1));
    const ch1Completions = getChapterCompletions(1);
    const allCh1Done = ch1Parts.every(p => p.done);

    const handleStartReviewPart = async (chNum, partNum) => {
        onStartGame('review_part', subject, null, chNum, partNum);
    };

    return (
        <div className="animate-fade-in-up pb-32">
            <StatsHUD isDarkMode={isDarkMode} compact={true} onFlameClick={onFlameClick} onQuestionsClick={onQuestionsClick} isGuest={isGuest} userProfile={userProfile} subject={subject} />
            <div className="flex items-center gap-4 mb-6">
                <TactileButton onClick={() => onBack('home')} className="w-12 h-12 rounded-xl" colorClass={isDarkMode ? 'bg-slate-800' : 'bg-white'} borderClass={isDarkMode ? 'border-slate-700' : 'border-slate-200'}>
                    <ArrowLeft className={isDarkMode ? 'text-white' : 'text-slate-700'} />
                </TactileButton>
                <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>المراجعات</h2>
            </div>
            
            {isGuest ? (
                <div className="text-center py-20 opacity-60">
                    <Lock className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>المراجعات للمشتركين فقط</h3>
                    <p className="text-sm text-slate-500 mb-6">سجل دخولك لتتمتع بكافة المميزات</p>
                    <TactileButton onClick={onShowLogin} className="w-48 mx-auto p-3 rounded-xl" colorClass="bg-yellow-400" borderClass="border-yellow-600">
                        <span className="font-bold text-yellow-900">تسجيل الدخول</span>
                    </TactileButton>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* الفصل 1 — متاح بأجزاء مقفولة */}
                    <div className="transition-all duration-300">
                        <TactileButton
                            onClick={() => toggleReview(1)}
                            className={`w-full p-5 flex items-center justify-between rounded-[24px] z-10 relative ${expandedReview === 1 ? (isDarkMode ? 'bg-slate-800' : 'bg-indigo-50 border-indigo-200') : ''}`}
                            colorClass={isDarkMode ? 'bg-slate-800' : 'bg-white'}
                            borderClass={isDarkMode ? 'border-slate-700' : 'border-slate-100'}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${allCh1Done ? 'bg-yellow-100 border-yellow-300 text-yellow-600' : 'bg-indigo-100 border-indigo-200 text-indigo-500'}`}>
                                    <Crown className="w-7 h-7 fill-current" />
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2">
                                        <span className={`block text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>الفصل 1</span>
                                        {ch1Completions > 0 && (
                                            <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-0.5 rounded-full">
                                                👑 ×{ch1Completions}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {expandedReview === 1 ? 'اختر الجزء للمراجعة' : `${ch1Parts.filter(p=>p.done).length}/${PARTS_COUNT} أجزاء`}
                                    </span>
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-50 text-slate-400'} ${expandedReview === 1 ? '-rotate-90' : ''}`}>
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                        </TactileButton>
                        {expandedReview === 1 && (
                            <div className="mt-3 grid grid-cols-1 gap-3 pl-2 animate-slide-up">
                                {ch1Parts.map((part) => (
                                    <TactileButton
                                        onClick={() => part.status !== 'locked' && handleStartReviewPart(1, part.id)}
                                        key={part.id}
                                        disabled={part.status === 'locked'}
                                        className={`w-full p-4 flex items-center justify-between rounded-xl relative overflow-hidden ${part.status === 'locked' ? 'opacity-60 grayscale' : ''}`}
                                        colorClass={part.status === 'completed' ? (isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50') : part.status === 'locked' ? (isDarkMode ? 'bg-slate-900' : 'bg-slate-100') : (isDarkMode ? 'bg-indigo-900/30' : 'bg-white')}
                                        borderClass={part.status === 'completed' ? 'border-emerald-200' : part.status === 'locked' ? 'border-slate-200' : 'border-indigo-200'}
                                    >
                                        <div className="flex items-center gap-4 z-10">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${part.status === 'completed' ? 'bg-emerald-500 border-emerald-600 text-white' : part.status === 'locked' ? 'bg-slate-200 border-slate-300 text-slate-400' : 'bg-white border-indigo-200 text-indigo-500'}`}>
                                                {part.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : part.status === 'locked' ? <Lock className="w-6 h-6" /> : <span className="font-black text-xl">{part.id}</span>}
                                            </div>
                                            <div className="text-right">
                                                <span className={`block font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{part.title}</span>
                                                <span className={`text-[10px] font-bold ${part.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'}`}>{part.status === 'completed' ? 'مكتمل ✓' : part.status === 'locked' ? 'مغلق' : 'متاح الآن'}</span>
                                            </div>
                                        </div>
                                        {part.status === 'unlocked' && <Play className="w-6 h-6 text-indigo-500 fill-indigo-500 animate-pulse" />}
                                    </TactileButton>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* الفصول 2-8 — مقفولة مع "قريباً" */}
                    {[2, 3, 4, 5, 6, 7, 8].map((chapterNum) => (
                        <div key={chapterNum} className="opacity-50">
                            <div className={`w-full p-5 flex items-center justify-between rounded-[24px] ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-100'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-200'}`}>
                                        <Lock className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <div className="text-right">
                                        <span className={`block text-xl font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>الفصل {chapterNum}</span>
                                        <span className="text-xs text-slate-400 font-bold">قريباً</span>
                                    </div>
                                </div>
                                <Lock className="w-5 h-5 text-slate-400" />
                            </div>
                        </div>
                    ))}

                    {/* المراجعة الشاملة — مقفولة */}
                    <div className="opacity-50">
                        <div className={`w-full p-5 flex items-center justify-between rounded-[28px] ${isDarkMode ? 'bg-slate-700 border border-slate-600' : 'bg-slate-200 border border-slate-300'}`}>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-300 dark:bg-slate-600 border-2 border-slate-400">
                                    <Lock className="w-7 h-7 text-slate-500" />
                                </div>
                                <div className="text-right">
                                    <span className={`block text-xl font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>المراجعة الشاملة</span>
                                    <span className="text-xs text-slate-400 font-bold">قريباً</span>
                                </div>
                            </div>
                            <Lock className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- التطبيق الرئيسي ---
function HubScreen({ onStartGame: _onStartGame, onStartBagReview, completedToday = 0, isGuest = false, onGuestModeChange = null }) {
  // wrapper يضيف userProfile تلقائياً لكل استدعاء onStartGame
  const onStartGame = (mode, subj = 'english', _unused = null, chapterNum = 0, stageId = 0) => _onStartGame(mode, subj, userProfile, chapterNum, stageId);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // نقرأ حالة الدخول من localStorage حتى يبقى المستخدم مسجلاً بعد الإغلاق
  // لكن إذا كان هناك علامة تسجيل خروج في sessionStorage، لا نستعيد الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      // إذا المستخدم سجّل خروجاً، لا نستعيد الدخول حتى لو localStorage موجود
      if (sessionStorage.getItem('user_logged_out') === '1') {
        return false;
      }
      return localStorage.getItem('user_registered') === 'true';
    } catch { return false; }
  });
  const [userName, setUserName] = useState(() => {
    try { return localStorage.getItem('user_name') || ''; } catch { return ''; }
  });
  const [userProfile, setUserProfile] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedChapterForLevels, setSelectedChapterForLevels] = useState(1);

  // ✅ قراءة بيانات المستخدم من Supabase عند التحميل والتحقق من اكتمال الملف
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // إذا المستخدم سجّل خروجاً، لا نستعيد الملف الشخصي
        if (sessionStorage.getItem('user_logged_out') === '1') {
          console.log('⚠️ User logged out, skipping profile fetch');
          return;
        }
        
        // فحص إضافي: إذا كان هناك علامة تسجيل خروج، لا نستعيد الملف الشخصي
        const loggedOut = sessionStorage.getItem('user_logged_out');
        if (loggedOut === '1') {
          console.log('⚠️ User logged out, skipping profile fetch');
          setIsLoggedIn(false);
          setUserProfile(null);
          return;
        }
        
        const userDbId = localStorage.getItem('user_db_id');
        const anonUserId = localStorage.getItem('anon_user_id');
        
        // فحص نهائي قبل جلب الملف الشخصي
        if (sessionStorage.getItem('user_logged_out') === '1') {
          console.log('⚠️ Logout flag detected before profile fetch, aborting');
          return;
        }
        
        if (userDbId && !isGuest && isLoggedIn) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', userDbId)
            .single();
          
          if (profile) {
            // فحص نهائي بعد جلب الملف الشخصي
            if (sessionStorage.getItem('user_logged_out') === '1') {
              console.log('⚠️ Logout flag detected after profile fetch, aborting');
              setUserProfile(null);
              setIsLoggedIn(false);
              return;
            }
            
            setUserProfile(profile);
            console.log('✅ User profile loaded from Supabase:', profile);
            
            // ✅ التحقق من اكتمال الملف الشخصي (age, gender, region)
            const isProfileComplete = profile.age && profile.gender && profile.region;
            
            if (!isProfileComplete && anonUserId) {
              // الملف غير مكتمل → اعرض نموذج الإكمال
              const name = profile.full_name || localStorage.getItem('user_name') || 'البطل';
              const email = profile.email || localStorage.getItem('user_email') || '';
              setPendingGoogleUser({ id: anonUserId, email, name, dbId: userDbId });
              setShowCompleteProfile(true);
              console.log('⚠️ Profile incomplete, showing completion form');
            }
          }
        }
      } catch (e) {
        console.error('Error fetching user profile:', e);
      }
    };
    // تأخير بسيط للتأكد من أن checkExistingSession يعمل أولاً
    const timer = setTimeout(() => {
      fetchUserProfile();
    }, 100);
    return () => clearTimeout(timer);
  }, [isGuest, isLoggedIn]);

  const [subjectOpen, setSubjectOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(() => {
    try {
      const saved = localStorage.getItem('selected_subject');
      if (saved === 'biology') return { name: 'الأحياء', icon: Dna };
    } catch {}
    return { name: 'English', icon: EnIcon };
  });
  const subject = selectedSubject.name === 'الأحياء' ? 'biology' : 'english';

  // ── Journey progress (تابع رحلتك) — من Supabase فقط لكل حساب ─────
  const [journeyPct, setJourneyPct] = useState(0);
  const [resumeChapter, setResumeChapter] = useState(null);
  const [resumeStage, setResumeStage] = useState(null);

  useEffect(() => {
    if (isGuest || !isLoggedIn) {
      setJourneyPct(0);
      setResumeChapter(null);
      setResumeStage(null);
      return;
    }

    // نستخدم auth uid (anon_user_id) كمفتاح user_id في stage_progress
    let authUserId = null;
    try {
      authUserId = localStorage.getItem('anon_user_id');
    } catch {
      authUserId = null;
    }
    if (!authUserId) return;

    let cancelled = false;
    (async () => {
      try {
        // 1️⃣ من Supabase فقط
        const rows = await loadAllStageProgress({ userDbId: authUserId, subject });
        if (cancelled) return;
        const supaSet = new Set(rows.map(r => `${Number(r.chapter)}:${Number(r.stage)}`));

        // حساب آخر مرحلة مكتملة (للـ resume)
        if (rows && rows.length > 0) {
          // sort by chapter ثم stage
          const sorted = [...rows].sort((a, b) => {
            if (a.chapter === b.chapter) return a.stage - b.stage;
            return a.chapter - b.chapter;
          });
          const last = sorted[sorted.length - 1];
          setResumeChapter(last.chapter);
          setResumeStage(last.stage);
        } else {
          setResumeChapter(null);
          setResumeStage(null);
        }

        let totalStages = 0;
        for (let ch = 1; ch <= 8; ch++) {
          totalStages += getTotalStagesForChapter(ch);
        }
        const completedCount = supaSet.size;
        const pct = totalStages > 0 ? Math.min(100, Math.round((completedCount / totalStages) * 100)) : 0;
        setJourneyPct(pct);
      } catch {
        // لو Supabase فيه مشكلة نخليها 0% فقط
        setJourneyPct(0);
        setResumeChapter(null);
        setResumeStage(null);
      }
    })();

    return () => { cancelled = true; };
  }, [isGuest, isLoggedIn, subject]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [monsterSheetOpen, setMonsterSheetOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [fbText, setFbText] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [pendingGoogleUser, setPendingGoogleUser] = useState(null); // { id, email, name, dbId }
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info', icon: null });
  const [adminTapCount, setAdminTapCount] = useState(0);
  const adminTapTimer = useRef(null);
  const processedAuthUsersRef = useRef(new Set()); // تتبع المستخدمين المعالجين لتجنب التكرار

  const handleAdminTap = () => {
    setAdminTapCount(prev => {
      const next = prev + 1;
      clearTimeout(adminTapTimer.current);
      if (next >= 7) { setCurrentView('admin'); return 0; }
      adminTapTimer.current = setTimeout(() => setAdminTapCount(0), 2000);
      return next;
    });
  };

  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [seenTooltips, setSeenTooltips] = useState(() => {
      try {
          const saved = localStorage.getItem('seen_tooltips');
          if (saved) return JSON.parse(saved);
      } catch {}
      return { monster: false, chapters: false, reviews: false, daily: false, mistakes: false, fingerprint: false, subject: false };
  });

  const showToast = (message, type = 'info', icon = null) => {
    setToast({ visible: true, message, type, icon });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3500);
  };

  const handleLoginSuccess = async (data, guestMode = false) => {
      // دخول ناجح → امسح علامة تسجيل الخروج حتى لا تمنع استعادة الجلسة
      try { sessionStorage.removeItem('user_logged_out'); } catch {}
      setIsLoggedIn(true);
      if (onGuestModeChange) onGuestModeChange(guestMode);
      if (!guestMode) {
          const name = data.name || data.full_name || '';
          setUserName(name);
          localStorage.setItem('user_registered', 'true');
          localStorage.setItem('user_name', name);
          const now = new Date();
          localStorage.setItem('last_login_date', now.toISOString());
          // إذا مستخدم موجود أو Google → البيانات محفوظة مسبقاً، لا نكررها
          if (!data.googleUserId && !data.existingUser) {
              // مستخدم محلي جديد — نحفظ في local_id (نص) وليس auth_id (uuid)
              try {
                  const localId = localStorage.getItem('anon_user_id') || (() => {
                      const id = 'local_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
                      localStorage.setItem('anon_user_id', id);
                      return id;
                  })();
                  // تحقق هل المستخدم موجود
                  const { data: existing } = await supabase
                      .from('users')
                      .select('id, login_count')
                      .eq('local_id', localId)
                      .maybeSingle();
                  if (existing) {
                      // تحديث بيانات الدخول
                      await supabase.from('users').update({
                          last_login: now.toISOString(),
                          login_count: (existing.login_count || 0) + 1,
                      }).eq('local_id', localId);
                      localStorage.setItem('user_db_id', existing.id);
                  } else {
                      // إنشاء مستخدم جديد
                      const { data: newUser } = await supabase.from('users').insert({
                          local_id: localId,
                          full_name: name,
                          age: data.age ? parseInt(data.age) : null,
                          gender: data.gender || null,
                          region: data.governorate || data.region || null,
                          email: data.email || null,
                          user_type: 'local',
                          last_login: now.toISOString(),
                          login_count: 1,
                      }).select('id').single();
                      if (newUser?.id) localStorage.setItem('user_db_id', newUser.id);
                  }
              } catch (err) { console.warn('Supabase user save error:', err); }
          }
      } else {
          showToast('أهلاً بك كضيف! جرب المرحلة الأولى مجاناً 🎁', 'info', Star);
          // تسجيل جلسة الضيف في Supabase
          try {
              const guestId = 'guest_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
              localStorage.setItem('guest_session_id', guestId);
              await supabase.from('guest_sessions').insert({ guest_id: guestId });
          } catch {}
          // 🎮 دخول الضيف مباشرة إلى مرحلة الديمو (5 أسئلة)
          setTimeout(() => {
              _onStartGame('chapter', 'english', null, 1, 0);
          }, 500);
          return;
      }
      // الشعلة تُحسب عند إكمال المهمة اليومية 2/2 (في handleGameExit) وليس عند الدخول
      // لكن نُحدث last_login في Supabase
      if (!guestMode) {
          try {
              const userDbId = localStorage.getItem('user_db_id');
              if (userDbId) {
                  supabase.from('users').update({ last_login: new Date().toISOString() }).eq('id', userDbId).catch(() => {});
              }
          } catch {}
      }
  };

  const handleLogout = async () => {
      // علم أن المستخدم طلب تسجيل الخروج (حتى بعد Reload لا نستعيد الجلسة)
      try {
        sessionStorage.setItem('user_logged_out', '1');
      } catch {}
      
      setIsLoggedIn(false);
      if (onGuestModeChange) onGuestModeChange(false);
      setProfileMenuOpen(false);
      setCurrentView('home');
      setShowTutorial(false);
      setUserName('');
      setUserProfile(null);
      setShowCompleteProfile(false);
      setPendingGoogleUser(null);
      // مسح كل بيانات الدخول من localStorage حتى يُطلب الإيميل من جديد
      try {
          localStorage.removeItem('user_registered');
          localStorage.removeItem('user_name');
          localStorage.removeItem('last_login_date');
          localStorage.removeItem('anon_user_id');
          localStorage.removeItem('user_db_id');
          localStorage.removeItem('user_email');
          localStorage.removeItem('user_age');
          localStorage.removeItem('user_gender');
          localStorage.removeItem('user_region');
          localStorage.removeItem('seen_tooltips');
          processedAuthUsersRef.current.clear();
      } catch {}
      // تسجيل خروج من Supabase Auth لمسح الجلسة من التخزين (يمنع استعادة الدخول بعد Reload)
      try { 
        await supabase.auth.signOut();
        console.log('✅ Logged out successfully');
      } catch (e) {
        console.error('Error signing out:', e);
      }
  };

  const toggleFullscreen = () => {
     if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {});
     } else {
        if (document.exitFullscreen) document.exitFullscreen();
     }
  };

  // ── فحص الجلسة الحالية عند تحميل الصفحة (لضمان Session ثابت بعد Refresh)
  // يجب أن يعمل هذا قبل onAuthStateChange
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        // إذا المستخدم سجّل خروجاً، لا نستعيد الجلسة من Supabase وامسح أي جلسة متبقية
        const loggedOut = sessionStorage.getItem('user_logged_out');
        if (loggedOut === '1') {
          // امسح الجلسة من Supabase أولاً
          await supabase.auth.signOut();
          // ثم امسح العلامة بعد التأكد من مسح الجلسة
          sessionStorage.removeItem('user_logged_out');
          // تأكد من مسح حالة الدخول
          setIsLoggedIn(false);
          setUserName('');
          setUserProfile(null);
          return;
        }
        
        const { data: { session } } = await supabase.auth.getSession();
        // فحص إضافي: إذا كان هناك علامة تسجيل خروج، لا نستعيد الجلسة
        if (sessionStorage.getItem('user_logged_out') === '1') {
          console.log('⚠️ Logout flag detected in checkExistingSession, skipping session restore');
          return;
        }
        
        if (session?.user && !processedAuthUsersRef.current.has(session.user.id)) {
          // هناك جلسة موجودة → معالجتها
          const user = session.user;
          const now = new Date();
          const { data: existing } = await supabase
            .from('users')
            .select('id, full_name, login_count, age, gender, region')
            .eq('auth_id', user.id)
            .maybeSingle();
          
          if (existing) {
            const isProfileComplete = existing.age && existing.gender && existing.region;
            processedAuthUsersRef.current.add(user.id);
            setUserProfile(existing);
            const name = existing.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'البطل';
            localStorage.setItem('user_registered', 'true');
            localStorage.setItem('user_name', name);
            localStorage.setItem('user_email', user.email || '');
            localStorage.setItem('user_db_id', existing.id);
            localStorage.setItem('anon_user_id', user.id);
            localStorage.setItem('last_login_date', now.toISOString());
            
            if (!isProfileComplete) {
              setPendingGoogleUser({ id: user.id, email: user.email, name, dbId: existing.id });
              setShowCompleteProfile(true);
            } else {
              setIsLoggedIn(true);
              setUserName(name);
            }
          }
        }
      } catch (e) {
        console.error('Error checking existing session:', e);
      }
    };
    checkExistingSession();
  }, []);

  // ── مراقبة جلسة Supabase عند تحميل التطبيق
  useEffect(() => {
    // تنظيف URL من hash/query params بعد المصادقة
    const cleanAuthParams = () => {
      if (window.location.hash.includes('access_token') || window.location.search.includes('code=')) {
        // بعد معالجة المصادقة، نظف URL
        setTimeout(() => {
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 100);
      }
    };
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // إذا المستخدم سجّل خروجاً، تجاهل أي أحداث جلسة قديمة
      // لكن اسمح بحدث SIGNED_IN كجلسة جديدة تمهيداً لدخول جديد
      const loggedOut = sessionStorage.getItem('user_logged_out');
      if (loggedOut === '1' && event !== 'SIGNED_IN') {
        if (session?.user) {
          console.log('⚠️ Session detected after logout, signing out...');
          await supabase.auth.signOut();
        }
        return;
      }
      
      if (event === 'SIGNED_OUT') {
        // عند تسجيل الخروج، تأكد من مسح كل شيء
        setIsLoggedIn(false);
        setUserName('');
        setUserProfile(null);
        setShowCompleteProfile(false);
        setPendingGoogleUser(null);
        processedAuthUsersRef.current.clear();
        return;
      }
      
      if (session?.user) {
        const user = session.user;
        // مستخدم Google جديد أو عائد
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // دخول جديد/تحديث توكن ناجح → امسح علامة تسجيل الخروج
          try { sessionStorage.removeItem('user_logged_out'); } catch {}
          // تنظيف URL بعد المصادقة الناجحة
          cleanAuthParams();
          
          // تجنب معالجة نفس المستخدم مرتين
          if (processedAuthUsersRef.current.has(user.id)) {
            return;
          }
          try {
            const now = new Date();
            // تحقق هل عنده ملف في قاعدة البيانات (بما في ذلك age, gender, region للتحقق من اكتمال الملف)
            const { data: existing } = await supabase
              .from('users')
              .select('id, full_name, login_count, age, gender, region')
              .eq('auth_id', user.id)
              .maybeSingle();

            let dbId;
            if (existing) {
              // فحص نهائي قبل استعادة الجلسة
              if (sessionStorage.getItem('user_logged_out') === '1') {
                console.log('⚠️ Logout flag detected during session restore, aborting');
                await supabase.auth.signOut();
                return;
              }
              
              // مستخدم موجود — تحقق من اكتمال الملف الشخصي
              processedAuthUsersRef.current.add(user.id); // علّم أنه تمت معالجته
              
              // ✅ التحقق من اكتمال الملف الشخصي
              const isProfileComplete = existing.age && existing.gender && existing.region;
              
              await supabase.from('users').update({
                last_login: now.toISOString(),
                login_count: (existing.login_count || 0) + 1,
              }).eq('auth_id', user.id);
              
              dbId = existing.id;
              setUserProfile(existing);
              const name = existing.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'البطل';
              localStorage.setItem('user_registered', 'true');
              localStorage.setItem('user_name', name);
              localStorage.setItem('user_email', user.email || ''); // ✅ حفظ الايميل
              localStorage.setItem('user_db_id', existing.id);
              localStorage.setItem('anon_user_id', user.id);
              localStorage.setItem('last_login_date', now.toISOString());
              
              // إذا الملف غير مكتمل → اعرض نموذج الإكمال
              if (!isProfileComplete) {
                setPendingGoogleUser({ id: user.id, email: user.email, name, dbId });
                setShowCompleteProfile(true);
                // لا نضع setIsLoggedIn(true) هنا حتى يكمل الملف
              } else {
                setIsLoggedIn(true);
                setUserName(name);
              }
            } else {
              // مستخدم Google جديد — ننشئ سجل مبدئي ثم نطلب إكمال الملف الشخصي
              processedAuthUsersRef.current.add(user.id); // علّم أنه تمت معالجته
              const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'البطل';
              const { data: newUser } = await supabase.from('users').insert({
                auth_id: user.id,
                email: user.email,
                full_name: name,
                user_type: 'google',
                last_login: now.toISOString(),
                login_count: 1,
              }).select('id, full_name').single();
              if (newUser) {
                dbId = newUser.id;
                setUserProfile(newUser);
              }
              localStorage.setItem('anon_user_id', user.id);
              localStorage.setItem('last_login_date', now.toISOString());
              if (dbId) localStorage.setItem('user_db_id', dbId);
              localStorage.setItem('user_email', user.email || ''); // ✅ حفظ الايميل
              // أول دخول → اعرض نموذج إكمال الملف
              setPendingGoogleUser({ id: user.id, email: user.email, name, dbId });
              setShowCompleteProfile(true);
            }
            // تتبع Google Analytics
            if (window.gtag) window.gtag('event', 'login', { method: 'Google' });
          } catch (err) {
            console.warn('Google auth handler error:', err);
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFeatureClick = (featureName) => {
      if (!seenTooltips[featureName]) {
          setActiveTooltip(featureName);
          setSeenTooltips(prev => {
              const updated = { ...prev, [featureName]: true };
              try { localStorage.setItem('seen_tooltips', JSON.stringify(updated)); } catch {}
              return updated;
          });
          return false;
      }
      return true;
  };

  const closeTooltip = () => {
      const tooltipName = activeTooltip;
      setActiveTooltip(null);
      // بعد إغلاق tooltip الوحش نفتح البطاقة مباشرة
      if (tooltipName === 'monster') {
          setTimeout(() => setMonsterSheetOpen(true), 150);
      }
  };

  // قراءة أعلى نقاط لكل فصل من localStorage (تبدأ من 0)
  const chapterScores = Object.fromEntries(
    [1, 2, 3, 4, 5, 6, 7, 8].map(n => [
      n,
      parseInt(localStorage.getItem(`monster_hs_${subject}_ch${n}`) || '0')
    ])
  );
  const themeText = isDarkMode ? 'text-white' : 'text-slate-800';

  return (
    <div dir="rtl" className={`min-h-[100dvh] font-['Cairo'] overflow-hidden selection:bg-purple-500 selection:text-white`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        .font-cairo { font-family: 'Cairo', sans-serif; }
        .animate-float-slow { animation: float 10s infinite ease-in-out; }
        .animate-float-delayed { animation: float 12s infinite ease-in-out reverse; }
        @keyframes float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px, -20px); } }
        .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slideUp 0.2s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes popIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(250, 204, 21, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); }
        }
        .animate-pulse-ring {
           animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-bounce { animation: bounce 1s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); } }
        /* Safe area support for notch devices */
        :root {
          --sat: env(safe-area-inset-top, 0px);
          --sar: env(safe-area-inset-right, 0px);
          --sab: env(safe-area-inset-bottom, 0px);
          --sal: env(safe-area-inset-left, 0px);
        }
        .pb-safe { padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 0px)); }
        .pt-safe { padding-top: max(0px, env(safe-area-inset-top, 0px)); }
        /* Prevent text size adjustment on rotation */
        body { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; touch-action: manipulation; }
        /* Smooth scrolling */
        * { -webkit-tap-highlight-color: transparent; }
      `}} />

      <SoftBackground isDarkMode={isDarkMode} />

      {(!isLoggedIn || showCompleteProfile || pendingGoogleUser) ? (
          <LoginView
            isDarkMode={isDarkMode}
            onLoginSuccess={handleLoginSuccess}
            // عند وجود pendingGoogleUser نمرّره دائماً حتى لو صار there is any timing issue
            pendingGoogleUser={pendingGoogleUser}
            onGoogleProfileComplete={(profileData) => {
              const name = profileData.name;
              const age = profileData.age || null;
              const gender = profileData.gender || null;
              const region = profileData.region || null;
              
              localStorage.setItem('user_registered', 'true');
              localStorage.setItem('user_name', name);
              if (age) localStorage.setItem('user_age', String(age));
              if (gender) localStorage.setItem('user_gender', gender);
              if (region) localStorage.setItem('user_region', region);
              
              setUserName(name);
              setIsLoggedIn(true);
              setShowCompleteProfile(false);
              setPendingGoogleUser(null);
              if (window.gtag) window.gtag('event', 'sign_up', { method: 'Google' });
            }}
          />
      ) : (
          <>
            <ToastNotification message={toast.message} isVisible={toast.visible} type={toast.type} icon={toast.icon} />
            
            {activeTooltip === 'monster' && <TooltipOverlay title="مود الوحش ⚔️" text="مود الوحش! أسئلة متخلص، اتحدى صاحبك وراويه منو 'السبع' هنا 💪" onClose={closeTooltip} />}
            {activeTooltip === 'chapters' && <TooltipOverlay title="خريطة الفصول 🗺️" text="هنا خريطتك الكاملة لكل المنهج.. فصول، مراحل، وتحديات، اكلهم أكل!" onClose={closeTooltip} />}
            {activeTooltip === 'reviews' && <TooltipOverlay title="الزبدة هنا 🧈" text="مستعجل؟ هنا مراجعة مركزة تضمنلك الدرجة بأقل وقت. (نصف السنة + شاملة)" onClose={closeTooltip} />}
            {activeTooltip === 'daily' && <TooltipOverlay title="قانون الالتزام ⚖️" text="لازم تختم مرحلتين كل 24 ساعة حتى ما ينكسر الستريك!" onClose={closeTooltip} />}
            {activeTooltip === 'mistakes' && <TooltipOverlay title="حقيبة الأخطاء 🎒" text="غلطت؟ عادي! هنا نجمع أغلاطك حتى تراجعها وما تعيدها بالوزاري." onClose={closeTooltip} />}
            {activeTooltip === 'fingerprint' && <TooltipOverlay title="بصمتك 💡" text="عندك فكرة جهنمية؟ بصمتك هنا مسموعة وتغير اللعبة." onClose={closeTooltip} />}
            {/* تم إزالة التلميح التعليمي للمادة الدراسية (TooltipOverlay) */}

            {/* Header */}
            <div className="px-5 pt-6 pb-2 flex items-center justify-between z-10 relative">
                <div className="relative">
                    <TactileButton 
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)} 
                        className="w-12 h-12 rounded-xl"
                        colorClass={isDarkMode ? 'bg-[#2A2640]' : 'bg-white'}
                        borderClass={isDarkMode ? 'border-[#3E3859]' : 'border-[#E2E8F0]'}
                    >
                        <User className="w-5 h-5 text-indigo-500" />
                    </TactileButton>

                    {profileMenuOpen && (
                        <div className={`absolute top-full right-0 mt-2 w-56 p-2 rounded-2xl border-2 border-b-4 shadow-xl z-50 animate-fade-in-up ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
                            <button onClick={() => { setIsDarkMode(!isDarkMode); setProfileMenuOpen(false); }} className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
                                {isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
                            </button>
                            <button onClick={() => { toggleFullscreen(); setProfileMenuOpen(false); }} className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {isFullscreen ? <Minimize className="w-4 h-4 text-purple-500" /> : <Maximize className="w-4 h-4 text-purple-500" />}
                                {isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
                            </button>
                            <div className="h-px bg-slate-100 dark:bg-slate-700 my-1"></div>
                            <button onClick={handleLogout} className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold text-sm text-red-500`}>
                                <LogOut className="w-4 h-4" />
                                تسجيل الخروج
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <TactileButton 
                            onClick={() => {
                                if(handleFeatureClick('subject')) setSubjectOpen(!subjectOpen);
                            }}
                            className="h-12 px-4 rounded-xl gap-2 relative"
                            colorClass={isDarkMode ? 'bg-[#2A2640]' : 'bg-white'}
                            borderClass={isDarkMode ? 'border-[#3E3859]' : 'border-[#E2E8F0]'}
                        >
                            {/* تم إزالة النقطة الحمراء (التلميح التعليمي) */}
                            <selectedSubject.icon className="w-5 h-5 text-blue-500" />
                            <span className={`font-bold text-sm ${themeText} hidden sm:block`}>{selectedSubject.name}</span>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${subjectOpen ? 'rotate-180' : ''}`} />
                        </TactileButton>
                        
                        {subjectOpen && (
                            <div className={`absolute top-full left-0 mt-2 w-48 p-2 rounded-2xl border-2 border-b-4 shadow-xl z-50 animate-fade-in-up ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
                                <button onClick={() => { setSelectedSubject({name:'English', icon:EnIcon}); localStorage.setItem('selected_subject','english'); setSubjectOpen(false); }} className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 font-bold text-sm ${themeText}`}>
                                    <EnIcon className="w-4 h-4" /> English
                                </button>
                                <button disabled className={`w-full p-3 rounded-xl flex items-center gap-3 font-bold text-sm opacity-40 cursor-not-allowed ${themeText}`}>
                                    <Dna className="w-4 h-4" /> الأحياء
                                    <span className="mr-auto text-[10px] font-black text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-lg">قريباً</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-5 w-full max-w-lg mx-auto z-0 relative" style={{paddingBottom: 'max(10rem, calc(env(safe-area-inset-bottom, 0px) + 10rem))' }}>
                {currentView === 'home' && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mt-6 mb-6">
                            <h1 onClick={handleAdminTap} className={`text-5xl font-black mb-1 tracking-tight ${themeText} select-none cursor-default`}>هلا بالبطل</h1>
                            <p className={`text-lg font-medium opacity-60 ${themeText}`}>{isGuest ? 'نسخة التجربة (ضيف)' : 'جاهز تكسر الرقم القياسي؟'}</p>
                        </div>

                        <div className="relative mt-4">
                            {/* التيتوريال يظهر فوق الزر فقط للضيف */}
                            {showTutorial && isGuest && (
                                <TutorialHand text="جرب مجاناً — اضغط هنا! 🎮" />
                            )}
                            {(() => (
                                <TactileButton
                                    onClick={() => {
                                        setShowTutorial(false);
                                        if (isGuest) {
                                            onStartGame('chapter', subject, null, 1, 0);
                                        } else {
                                            if (resumeChapter != null && resumeStage != null) {
                                                onStartGame('chapter', subject, null, resumeChapter, resumeStage);
                                            } else {
                                                onStartGame('chapter', subject, null, 1, 0);
                                            }
                                        }
                                    }}
                                    className={`w-full mb-6 p-6 rounded-[32px] group border-2 relative overflow-hidden
                                        ${showTutorial && isGuest ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
                                    `}
                                    colorClass="bg-gradient-to-br from-indigo-500 to-blue-600"
                                    borderClass="border-indigo-700"
                                >
                                    <div className="w-full flex items-center justify-between z-20 relative">
                                        <div className="flex flex-col items-start gap-1">
                                            <span className="text-2xl font-black text-white drop-shadow-md">{isGuest ? 'جرب التحدي مجاناً 🎮' : 'تابع رحلتك 🚀'}</span>
                                            <span className="text-sm font-bold text-indigo-100 opacity-90">
                                                {isGuest
                                                  ? 'العب أول مرحلة واكتشف مستواك!'
                                                  : (resumeChapter != null ? `الفصل ${resumeChapter}` : 'ابدأ رحلتك الآن!')}
                                            </span>
                                        </div>
                                        {isGuest ? (
                                            <div className="flex flex-col items-center leading-tight">
                                                <span className="text-3xl font-black text-white drop-shadow-lg">5</span>
                                                <span className="text-[10px] font-bold text-yellow-300 text-center leading-tight">أسئلة<br/>سريعة</span>
                                            </div>
                                        ) : (
                                            <span className="text-5xl font-black text-white drop-shadow-lg tracking-tighter" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                                                {journeyPct}<span className="text-2xl">%</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/20">
                                        <div className="h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)]" style={{ width: isGuest ? '0%' : `${journeyPct}%` }}></div>
                                    </div>
                                </TactileButton>
                            ))()}
                            
                        </div>

                        {!isGuest && (
                            <>
                                <StatsHUD isDarkMode={isDarkMode} isGuest={isGuest} userProfile={userProfile} subject={subject} onFlameClick={() => showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire', Flame)} onQuestionsClick={() => showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info', Target)} /> 
                                
                                <div className="relative">
                                    <MonsterCard
                                        isDarkMode={isDarkMode}
                                        isGuest={isGuest}
                                        subject={subject}
                                        playerName={userName || 'البطل'} 
                                        onClick={() => {
                                           if(handleFeatureClick('monster')) setMonsterSheetOpen(true);
                                        }} 
                                    />
                                    {!seenTooltips.monster && <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full z-20 animate-bounce pointer-events-none"></div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <TactileButton 
                                        onClick={() => {
                                            if(handleFeatureClick('chapters')) setCurrentView('chapters');
                                        }}
                                        className="aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-4 group relative" colorClass={isDarkMode ? 'bg-emerald-600' : 'bg-[#6EE7B7]'} borderClass={isDarkMode ? 'border-emerald-800' : 'border-[#059669]'}>
                                        {!seenTooltips.chapters && <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full z-20 animate-bounce"></div>}
                                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transform group-active:scale-90 transition-transform bg-white/20 border-2 border-white/20`}>
                                            <List className="w-8 h-8 text-white drop-shadow-sm" strokeWidth={3} />
                                        </div>
                                        <div className="text-center">
                                            <span className={`block text-xl font-black text-white drop-shadow-md`}>الفصول</span>
                                            <span className="text-[10px] font-bold text-emerald-900 bg-white/20 px-2 py-0.5 rounded-lg mt-1 inline-block">المنهج الكامل</span>
                                        </div>
                                    </TactileButton>

                                    <TactileButton
                                        onClick={() => {
                                            if(handleFeatureClick('reviews')) setCurrentView('reviews');
                                        }}
                                        className="aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-4 group relative" colorClass={isDarkMode ? 'bg-orange-600' : 'bg-[#FDBA74]'} borderClass={isDarkMode ? 'border-orange-800' : 'border-[#EA580C]'}>
                                        {!seenTooltips.reviews && <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full z-20 animate-bounce"></div>}
                                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center transform group-active:scale-90 transition-transform bg-white/20 border-2 border-white/20`}>
                                            <FileText className="w-8 h-8 text-white drop-shadow-sm" strokeWidth={3} />
                                        </div>
                                        <div className="text-center">
                                            <span className={`block text-xl font-black text-white drop-shadow-md`}>مراجعات</span>
                                            <span className="text-[10px] font-bold text-orange-900 bg-white/20 px-2 py-0.5 rounded-lg mt-1 inline-block">مركزة & شاملة</span>
                                        </div>
                                    </TactileButton>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {currentView === 'chapters' && (
                    <ChaptersView 
                        isDarkMode={isDarkMode} 
                        onBack={setCurrentView} 
                        onFlameClick={() => showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire', Flame)}
                        onQuestionsClick={() => showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info', Target)}
                        onChapterClick={(chapterNum) => {
                            setSelectedChapterForLevels(chapterNum);
                            setCurrentView('levels');
                        }}
                        isGuest={isGuest}
                        onShowLogin={() => setShowLoginModal(true)}
                        userProfile={userProfile}
                        subject={subject}
                    />
                )}

                {currentView === 'levels' && (
                    <LevelsView isDarkMode={isDarkMode} chapterNum={selectedChapterForLevels} onStartGame={onStartGame} onBack={setCurrentView} onFlameClick={() => showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire', Flame)} onQuestionsClick={() => showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info', Target)} isGuest={isGuest} onShowLogin={() => setShowLoginModal(true)} subject={subject} userDbId={localStorage.getItem('user_db_id')} />
                )}
                
                {currentView === 'reviews' && (
                    <ReviewsView isDarkMode={isDarkMode} onBack={setCurrentView} onStartGame={onStartGame} isGuest={isGuest} onShowLogin={() => setShowLoginModal(true)} onFlameClick={() => showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire', Flame)} onQuestionsClick={() => showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info', Target)} subject={subject} userProfile={userProfile} />
                )}

                {currentView === 'admin' && (
                    <AdminDashboard onBack={() => setCurrentView('home')} />
                )}
            </div>

            {!isGuest && (
                <>
                    <div className="fixed bottom-28 left-5 z-50">
                        <div className="relative">
                            <TactileButton 
                                onClick={() => {
                                    if(handleFeatureClick('fingerprint')) setFeedbackOpen(true);
                                }}
                                className="w-12 h-12 rounded-full shadow-lg relative" colorClass={isDarkMode ? 'bg-[#2A2640]' : 'bg-white'} borderClass={isDarkMode ? 'border-[#3E3859]' : 'border-teal-200'}>
                                {!seenTooltips.fingerprint && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full z-20 animate-bounce"></div>}
                                <Fingerprint className="w-6 h-6 text-teal-500" />
                            </TactileButton>
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-600 bg-white/80 px-2 rounded-full">بصمتك</span>
                        </div>
                    </div>

                    <BottomDock
                        isDarkMode={isDarkMode}
                        onTaskClick={(e) => handleFeatureClick('daily')}
                        onMistakeClick={() => handleFeatureClick('mistakes')}
                        completedToday={typeof completedToday === 'object' ? (completedToday[subject] || 0) : completedToday}
                        onStartBagReview={onStartBagReview}
                        subject={subject}
                    />
                </>
            )}

            {showLoginModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowLoginModal(false)}></div>
                    <div className={`relative w-full max-w-sm p-6 rounded-[2rem] border-2 shadow-2xl animate-pop-in ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-white'}`}>
                        <button onClick={() => setShowLoginModal(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"><X className="w-5 h-5 text-slate-400" /></button>
                        <div className="flex flex-col items-center text-center mb-6 mt-2">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 rotate-3"><LogIn className="w-8 h-8 text-yellow-600" /></div>
                            <h3 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>سجل دخولك يا بطل! 🚀</h3>
                            <p className={`text-sm opacity-60 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>هذه الميزة متاحة فقط للأبطال المسجلين.</p>
                        </div>
                        <TactileButton onClick={() => { setShowLoginModal(false); handleLogout(); }} className="w-full py-4 rounded-xl gap-2" colorClass="bg-yellow-400" borderClass="border-yellow-600"><span className="font-bold text-yellow-900">تسجيل الدخول الآن</span></TactileButton>
                    </div>
                </div>
            )}

            {monsterSheetOpen && <BattleArenaModal isDarkMode={isDarkMode} onClose={() => setMonsterSheetOpen(false)} chapterScores={chapterScores} playerName={userName || 'البطل'} onStartGame={onStartGame} subject={subject} onShowToast={showToast} />}

            {feedbackOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setFeedbackOpen(false)}></div>
                    <div className={`relative w-full max-w-sm p-6 rounded-[2rem] border-2 shadow-2xl animate-pop-in ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-white'}`}>
                        <button onClick={() => setFeedbackOpen(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"><X className="w-5 h-5 text-slate-400" /></button>
                        <div className="flex flex-col items-center text-center mb-6 mt-2">
                            <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 rotate-3"><Fingerprint className="w-8 h-8 text-teal-500" /></div>
                            <h3 className={`text-xl font-black mb-1 ${themeText}`}>اللعبة تكبر بأفكاركم 💡</h3>
                            <p className={`text-sm opacity-60 ${themeText}`}>شنو اقتراحك حتى نطورها؟</p>
                        </div>
                        <textarea value={fbText} onChange={e => setFbText(e.target.value)} className={`w-full h-32 p-4 rounded-xl border-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all ${isDarkMode ? 'bg-black/20 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'}`} placeholder="اكتب فكرتك الجهنمية هنا..."></textarea>
                        <TactileButton onClick={() => { if (!fbText.trim()) return; triggerHaptic(); setFeedbackOpen(false); setFbText(''); showToast('شكراً يا بطل! فكرتك وصلت 💡', 'info', Send); }} className="w-full py-3 rounded-xl gap-2" colorClass={fbText.trim() ? 'bg-teal-500' : 'bg-slate-300'} borderClass={fbText.trim() ? 'border-teal-700' : 'border-slate-400'}><span className="font-bold text-white">إرسال الفكرة</span><Send className="w-4 h-4 text-white" /></TactileButton>
                    </div>
                </div>
            )}
          </>
      )}
    </div>
  );
}

// ╔═══════════════════════════════════════════════════════════╗
// ║  CHAPTER GAME: 3 Lives, Progress Bar, Final Countdown     ║  
// ╚═══════════════════════════════════════════════════════════╝

// =================================================================
// 🛠️ مكونات التصميم (UI Components)
// =================================================================


// قائمة التوقف الجديدة
const ChapterPauseMenuModal = ({ isOpen, onClose, onResume, onExit, currentSpeedMode, setSpeedMode, isMuted, setIsMuted, isDark, setIsDark }) => {
  const [speedOpen, setSpeedOpen] = useState(false);

  // إعدادات السرعة
  const speeds = {
    'baby': { 
        id: 'baby',
        val: 0.3,
        label: 'وضع الرضيع 👶', 
        desc: 'رحلة الألف ميل تبدأ بخطوة', 
        color: 'bg-blue-100 text-blue-600',
        border: 'border-blue-200'
    },
    'teen': { 
        id: 'teen',
        val: 0.5,
        label: 'فتى (متوسط) 👱', 
        desc: 'للناس اللي قطعت شوط (هرولة)', 
        color: 'bg-orange-100 text-orange-600',
        border: 'border-orange-200'
    },
    'beast': { 
        id: 'beast',
        val: 0.8,
        label: 'وضع الوحش 👹', 
        desc: 'للأبطال اللي يمشون ميل ميل!', 
        color: 'bg-red-100 text-red-600',
        border: 'border-red-200'
    }
  };

  const selectedSpeedConfig = speeds[currentSpeedMode] || speeds['teen'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5 font-['Cairo']">
      {/* خلفية معتمة */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onResume}></div>
      
      {/* جسم القائمة */}
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1E293B] p-6 rounded-[2.5rem] border-4 border-slate-200 dark:border-slate-700 shadow-2xl animate-pop-in overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* عنوان القائمة */}
        <div className="text-center mb-6 shrink-0 pt-2">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-1">استراحة محارب 🛑</h2>
            <p className="text-sm font-bold text-slate-400">خذ نفس وكمل الطريق</p>
        </div>

        <div className="space-y-3 overflow-y-auto hide-scrollbar px-1 pb-2">
            {/* 1. زر الاستئناف */}
            <TactileButton 
                onClick={onResume}
                className="w-full py-4 rounded-2xl gap-3 text-lg shrink-0"
                colorClass="bg-yellow-400"
                borderClass="border-yellow-600"
            >
                <Play className="w-6 h-6 fill-current text-yellow-900" />
                <span className="font-black text-yellow-900">استئناف اللعب</span>
            </TactileButton>

            {/* 2. زر التحكم بالسرعة */}
            <div className="relative shrink-0">
                <TactileButton 
                    onClick={() => setSpeedOpen(!speedOpen)}
                    className="w-full p-4 rounded-2xl justify-between"
                    colorClass="bg-slate-50 dark:bg-slate-800"
                    borderClass="border-slate-200 dark:border-slate-700"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${selectedSpeedConfig.color}`}>
                            {selectedSpeedConfig.label.split(' ').pop()} 
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold text-slate-400">سرعة اللعبة</span>
                            <span className="font-black text-slate-800 dark:text-white">{selectedSpeedConfig.label.replace(/ .*/,'') + ' ' + selectedSpeedConfig.label.split(' ')[1]}</span>
                        </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${speedOpen ? 'rotate-180' : ''}`} />
                </TactileButton>

                {/* القائمة المنسدلة */}
                {speedOpen && (
                    <div className="mt-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-[3px] border-slate-200 dark:border-slate-700 shadow-inner overflow-hidden animate-slide-down">
                        <div className="p-2 grid gap-2">
                            {Object.values(speeds).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSpeedMode(s.id); setSpeedOpen(false); triggerHaptic(); }}
                                    className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all border
                                        ${currentSpeedMode === s.id 
                                            ? 'bg-white dark:bg-slate-700 border-yellow-400 shadow-md ring-2 ring-yellow-400/20' 
                                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'}
                                    `}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 mt-1 ${s.color.split(' ')[0]} bg-opacity-20`}>
                                        {s.label.split(' ').pop()}
                                    </div>
                                    <div className="text-right flex-1 pt-0.5">
                                        <div className={`font-black text-base mb-0.5 ${currentSpeedMode === s.id ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {s.label.replace(/ .*/,'') + ' ' + (s.label.split(' ')[1] || '')}
                                        </div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight">
                                            {s.desc}
                                        </div>
                                    </div>
                                    {currentSpeedMode === s.id && <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 3. صف الأزرار (صوت + وضع ليلي + خروج) */}
            <div className="flex gap-2 shrink-0">
                {/* زر الصوت */}
                <TactileButton 
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass={!isMuted ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'bg-slate-100 dark:bg-slate-800'}
                    borderClass={!isMuted ? 'border-indigo-200 dark:border-indigo-800' : 'border-slate-200 dark:border-slate-700'}
                >
                    {!isMuted ? <Volume2 className="w-5 h-5 text-indigo-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                </TactileButton>

                {/* زر الوضع الليلي */}
                <TactileButton 
                    onClick={() => setIsDark(!isDark)}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass={isDark ? 'bg-slate-700' : 'bg-orange-50'}
                    borderClass={isDark ? 'border-slate-600' : 'border-orange-200'}
                >
                    {isDark ? <Moon className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-orange-500" />}
                </TactileButton>

                {/* زر الخروج */}
                <TactileButton 
                    onClick={onExit}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass="bg-rose-50 dark:bg-rose-900/20"
                    borderClass="border-rose-200 dark:border-rose-800"
                >
                    <LogOut className="w-5 h-5 text-rose-500" />
                </TactileButton>
            </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 📝 منطقة تعديل النصوص والرسائل
// =================================================================
// تم نقل `CH_MESSAGES` إلى `src/constants/chapterMessages.js`
// وتم نقل بيانات الأسئلة + `getCHQuestions` إلى `src/data/chapterQuestions.js`

// جلب أسئلة مرحلة معينة من Supabase
// stageId=0 = الديمو (أول 5 أسئلة من stageno=1)
const fetchStageQuestions = async (chapterNum, stageId) => {
  try {
    const isDemo = stageId === 0;
    const query = supabase
      .from('english_chapter_stages')
      .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
      .eq('chapterno', chapterNum)
      .eq('stageno', isDemo ? 1 : stageId)
      .order('blockno');
    if (isDemo) query.limit(5);
    const { data, error } = await query;
    if (error || !data || data.length === 0) return null;
    return data.map(r => ({
      id: r.questioncode,
      q: r.questiontext,
      requirement: r.question_requirement,
      options: [r.optiona, r.optionb, r.optionc, r.optiond],
      a: r.correctanswer,
      golden: r.isgolden,
      explanation: r.explanation,
    }));
  } catch { return null; }
};

// جلب أسئلة تحدي السنة كاملة من Supabase
const fetchFullYearQuestions = async (chapterNum) => {
  try {
    const { data, error } = await supabase
      .from('english_fullyear_stages')
      .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
      .eq('chapterno', chapterNum)
      .order('blockno');
    if (error || !data || data.length === 0) return null;
    return data.map(r => ({
      id: r.questioncode,
      q: r.questiontext,
      requirement: r.question_requirement,
      options: [r.optiona, r.optionb, r.optionc, r.optiond],
      a: r.correctanswer,
      golden: r.isgolden,
      explanation: r.explanation,
    }));
  } catch { return null; }
};

// جلب أسئلة جزء مراجعة من Supabase
const fetchReviewPartQuestions = async (chapterNum, partNum) => {
  try {
    const { data, error } = await supabase
      .from('english_review_parts')
      .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
      .eq('chapterno', chapterNum)
      .eq('stageno', partNum)
      .order('blockno');
    if (error || !data || data.length === 0) return null;
    return data.map(r => ({
      id: r.questioncode,
      q: r.questiontext,
      requirement: r.question_requirement,
      options: [r.optiona, r.optionb, r.optionc, r.optiond],
      a: r.correctanswer,
      golden: r.isgolden,
      explanation: r.explanation,
    }));
  } catch { return null; }
};

function ChapterGameScreen({ onExit, subject = 'english', userProfile, bagItem = null, onBagItemCompleted, chapterNum = 0, stageId = 0, gameMode = 'chapter', isGuest = false, onStartGame = null }) {
  const resultStarsRef = useRef(0); // عدد النجوم (0=خسارة, 1-3=فوز) — يُمرر لـ onExit
  const [gameState, setGameState] = useState('menu');
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Game Data
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [streak, setStreak] = useState({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
  const [powerups, setPowerups] = useState({ freeze: 2, bomb: 1 });
  const [frozen, setFrozen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Settings
  const [speedMode, setSpeedMode] = useState(() => { try { return localStorage.getItem('admin_game_speed') || 'teen'; } catch { return 'teen'; } });
  
  // Question State
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [qY, setQY] = useState(-20);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(new Set());
  
  // Animation States
  const [flyingBtn, setFlyingBtn] = useState(null);
  const [shakeScreen, setShakeScreen] = useState(0); 
  const [shakeQuestion, setShakeQuestion] = useState(false);
  const [showComboFire, setShowComboFire] = useState(false);
  const comboFireTimerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [scorePopup, setScorePopup] = useState(null);

  // إخفاء الشعلة بعد 5 ثوانٍ
  useEffect(() => {
    if (showComboFire) {
      clearTimeout(comboFireTimerRef.current);
      comboFireTimerRef.current = setTimeout(() => setShowComboFire(false), 5000);
    }
    return () => clearTimeout(comboFireTimerRef.current);
  }, [showComboFire]);

  // Results
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  
  // Feedback
  const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
  
  // Refs - Moved here to fix ReferenceError
  const gameAreaRef = useRef(null);
  const questionRef = useRef(null);
  const optionRefs = useRef([]);
  const animFrameRef = useRef(null);
  const streakTimerRef = useRef(null);
  const freezeTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize/Resume Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
        try {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { console.error("Audio API not supported"); }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  // Audio System
  const playSound = useCallback((freq, type = 'sine', vol = 0.3, dur = 0.15) => {
    if (isMuted) return;
    initAudio();
    
    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      
      // Punchier envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01); 
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }, [isMuted]);

  const playCorrectSound = (multiplier) => {
    // 🔥 Heavy Impact Sound + Chime
    playSound(100, 'sawtooth', 0.4, 0.1); 
    setTimeout(() => {
        const baseFreq = 600 + (multiplier * 150);
        playSound(baseFreq, 'square', 0.15, 0.1);
        playSound(baseFreq * 1.5, 'sine', 0.2, 0.2);
    }, 50);
  };

  const playWrongSound = () => {
    playSound(150, 'sawtooth', 0.4, 0.4);
    setTimeout(() => playSound(100, 'sawtooth', 0.4, 0.4), 100);
  };

  // Spawn Particles
  const spawnParticles = (x, y, type = 'confetti', count = 15) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x, y,
      vx: (Math.random() - 0.5) * (type === 'coin' ? 15 : 20),
      vy: (Math.random() - 0.5) * (type === 'coin' ? 25 : 20) - 10,
      color: type === 'coin' ? '#fbbf24' : ['#f472b6', '#34d399', '#60a5fa', '#fcd34d'][Math.floor(Math.random() * 4)],
      size: type === 'coin' ? Math.random() * 6 + 8 : Math.random() * 8 + 4,
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      type
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Full Screen Handler (Fixed)
  const toggleFullScreen = () => {
    try {
      if (!document.fullscreenElement) {
        const elem = document.documentElement;
        const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        
        if (requestFS) {
          requestFS.call(elem)
            .then(() => setIsFullscreen(true))
            .catch(err => {
              console.warn("Full screen error:", err);
            });
        }
      } else {
        const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (exitFS) {
          exitFS.call(document)
            .then(() => setIsFullscreen(false))
            .catch(err => console.warn(err));
        }
      }
    } catch (e) {
      console.warn("Fullscreen API error:", e);
    }
  };

  // Initialize Game
  const startGame = async () => {
    initAudio();
    let sourceQuestions;
    if (bagItem) {
      sourceQuestions = bagItem.questions;
    } else if (gameMode === 'review_part' && subject === 'english' && chapterNum > 0) {
      // جزء مراجعة — stageId = رقم الجزء (1-4)
      const fetched = await fetchReviewPartQuestions(chapterNum, stageId);
      sourceQuestions = fetched && fetched.length > 0 ? fetched : getCHQuestions(subject);
    } else if (subject === 'english' && chapterNum > 0 && stageId >= 0) {
      // جلب من Supabase للمراحل الانجليزية (0 = الديمو، 1-29 = المراحل)
      const fetched = await fetchStageQuestions(chapterNum, stageId);
      sourceQuestions = fetched && fetched.length > 0 ? fetched : getCHQuestions(subject);
    } else {
      sourceQuestions = getCHQuestions(subject);
    }
    if (!sourceQuestions || sourceQuestions.length === 0) {
      console.error('startGame: no questions found');
      return;
    }
    const preparedQuestions = sourceQuestions.map(q => {
      const originalOptions = [...(q.options || [])];
      // IMPORTANT: resolve correct answer BEFORE shuffling options
      const correctText = resolveCorrectAnswerText({ ...q, options: originalOptions });
      return {
        ...q,
        a: correctText,
        options: [...originalOptions].sort(() => Math.random() - 0.5),
      };
    });

    setQuestions(preparedQuestions);
    setCurrentQ(preparedQuestions[0]);
    setQIndex(0);
    setQY(-20);
    setScore(0);
    setLives(3);
    setCombo(0);
    setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
    setPowerups({ freeze: 2, bomb: 1 });
    setFrozen(false);
    setDisabledOptions([]);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setAnsweredCorrectly(new Set());
    setProgress(0);
    setFeedback({ show: false, correct: false, message: '' });
    setParticles([]);
    setShakeScreen(0);
    setGameState('playing');
  };

  // إذا فُتحت اللعبة من الحقيبة، ابدأ مباشرة دون عرض القائمة
  useEffect(() => {
    if (bagItem && gameState === 'menu') startGame();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing' || feedback.show || frozen) return;
    
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;

      setQY(prev => {
        const customSpeeds = (() => { try { return JSON.parse(localStorage.getItem('admin_custom_speeds') || '{}'); } catch { return {}; } })();
        const speedMap = { 'baby': customSpeeds.baby ?? 0.25, 'teen': customSpeeds.teen ?? 0.45, 'beast': customSpeeds.beast ?? 0.75 };
        const currentBaseSpeed = speedMap[speedMode] || 0.45;
        const speedMultiplier = streak.active ? 1 + (streak.multiplier * 0.05) : 1;
        const newY = prev + (currentBaseSpeed * speedMultiplier * dt);
        const gameH = gameAreaRef.current?.offsetHeight || 600;

        if (newY > gameH) {
          handleMiss();
          return -20;
        }
        return newY;
      });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, feedback.show, frozen, speedMode, streak.active, combo]);

  // Particle Animation
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.8,
          life: p.life - p.decay,
          rotation: (p.rotation || 0) + 10
        }))
        .filter(p => p.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  const isInUpperHalf = () => {
    const gameH = gameAreaRef.current?.offsetHeight || 600;
    return qY < (gameH / 2);
  };

  const handleAnswer = (answer, btnIndex) => {
    if (gameState !== 'playing' || feedback.show || !currentQ || flyingBtn !== null) return;
    
    initAudio(); 
    
    const isCorrect = normalizeAnswerText(answer) === normalizeAnswerText(currentQ.a);
    const btnEl = optionRefs.current[btnIndex];
    const btnRect = btnEl?.getBoundingClientRect();
    const qRect = questionRef.current?.getBoundingClientRect();
    
    if (btnRect && qRect) {
      triggerHaptic(50);
      setFlyingBtn({
        index: btnIndex,
        text: answer,
        startX: btnRect.left,
        startY: btnRect.top,
        startW: btnRect.width,
        startH: btnRect.height,
        targetX: qRect.left + qRect.width / 2 - btnRect.width / 2,
        targetY: qRect.top + qRect.height / 2 - btnRect.height / 2,
        correct: isCorrect
      });
    }

    setTimeout(() => {
      if (isCorrect) {
        triggerHaptic(80);
        
        const basePoints = currentQ.golden ? 20 : 10;
        let finalPoints = basePoints;
        let currentMult = streak.multiplier;
        
        if (isInUpperHalf()) {
            if (streak.active) {
                const newMult = Math.min(streak.multiplier + 1, 5);
                setStreak(prev => ({ ...prev, active: true, multiplier: newMult, timeLeft: 5000, maxTime: 5000 }));
                finalPoints = basePoints * newMult;
                currentMult = newMult;
            } else {
                setStreak({ active: true, multiplier: 2, timeLeft: 5000, maxTime: 5000 });
                finalPoints = basePoints * 2;
                currentMult = 2;
            }
        } else {
            if (streak.active) {
                finalPoints = basePoints * streak.multiplier;
            }
        }

        playCorrectSound(currentMult);
        setScore(prev => prev + finalPoints);
        setCombo(prev => Math.min(5, prev + 1));
        setCorrectAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        setAnsweredCorrectly(prev => new Set([...prev, currentQ.id]));

        setShakeQuestion(true);
        if (qRect) {
          setScorePopup({ x: qRect.left + qRect.width / 2, y: qRect.top, points: finalPoints, streak: streak.active });
          spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'confetti', 15);
          spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'coin', 8);
        }

        if (currentMult >= 2) setShowComboFire(true);

        // Feedback Message Logic
        let msg = "";
        const remainingQuestions = questions.length - 1 - qIndex;
        
        if (remainingQuestions === 2) { 
             msg = CH_MESSAGES.finalCountdown[3];
        } else if (remainingQuestions === 1) { 
             msg = CH_MESSAGES.finalCountdown[2];
        } else if (remainingQuestions === 0) { 
             msg = CH_MESSAGES.finalCountdown[1];
        } else {
             if (currentMult >= 5) {
                 msg = CH_MESSAGES.streak[Math.floor(Math.random() * CH_MESSAGES.streak.length)];
             } else {
                 msg = CH_MESSAGES.correct[Math.floor(Math.random() * CH_MESSAGES.correct.length)];
             }
        }

        showFeedbackModal(true, msg, lives, qIndex, questions.length);

      } else {
        setShakeScreen(2);
        triggerHaptic(300);
        playWrongSound();
        const newLives = lives - 1;
        setLives(newLives);
        setCombo(0);
        setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
        setShowComboFire(false);
        setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        if (qRect) spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'confetti', 20);
        const msg = CH_MESSAGES.wrong[Math.floor(Math.random() * CH_MESSAGES.wrong.length)];
        showFeedbackModal(false, msg, newLives, qIndex, questions.length);
      }

      setTimeout(() => {
        setShakeQuestion(false);
        setShakeScreen(0);
        setFlyingBtn(null);
        setScorePopup(null);
      }, 300);

    }, 300);
  };

  const handleMiss = () => {
    playWrongSound();
    triggerHaptic(200);
    setShakeScreen(1);
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
    setShowComboFire(false);
    setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: null }]);
    const nextIdx = qIndex + 1;
    const total = questions.length || 12;
    setProgress(Math.min(100, (nextIdx / total) * 100));
    showFeedbackModal(false, "⏰ خلص الوقت!", newLives, qIndex, questions.length);
    setTimeout(() => setShakeScreen(0), 500);
  };

  const showFeedbackModal = (correct, message, snapLives, snapQIndex, snapQTotal) => {
    setFeedback({ show: true, correct, message });
    setTimeout(async () => {
      setFeedback({ show: false, correct: false, message: '' });
      const livesNow = snapLives ?? lives;
      const isLastQ = snapQIndex != null && snapQTotal != null && snapQIndex + 1 >= snapQTotal;
      if (livesNow <= 0 && !correct) {
        // خسارة — انتهت الأرواح
        resultStarsRef.current = 0;
        giveXPForChapter(correctAnswers.length, snapQTotal ?? questions.length, false, chapterNum, stageId);
        if (!bagItem) saveWrongAnswersToBag(wrongAnswers, getCHQuestions(subject));
        saveSessionToSupabase(correctAnswers.length, snapQTotal ?? questions.length, score, chapterNum, stageId);
        setGameState('results');
      } else if (isLastQ) {
        // آخر سؤال — فوز — حساب النجوم والانتقال للنتائج
        // حساب عدد الإجابات الصحيحة من الجلسة الحالية
        const totalCorrect = (snapQIndex + 1) - wrongAnswers.length; // إجمالي الأسئلة ناقص الأخطاء
        const totalQuestions = snapQTotal ?? questions.length;
        const pct = totalQuestions > 0 ? totalCorrect / totalQuestions : 0;
        const stars = pct === 1 ? 3 : pct >= 0.6 ? 2 : 1;
        // تأكد من أن progress bar يكتمل 100%
        setProgress(100);
        resultStarsRef.current = stars;
        
        // ✅ حفظ المرحلة المكتملة والنجوم في Supabase (مصدر حقيقي للبيانات)
        const userDbId = localStorage.getItem('user_db_id');
        if (userDbId && chapterNum > 0 && stageId >= 0) {
          try {
            // انتظر حفظ المرحلة قبل الانتقال
            await saveStageProgressToSupabase(userDbId, subject, chapterNum, stageId, stars);
            console.log(`✅ Stage ${chapterNum}-${stageId} completed with ${stars} stars`);
          } catch (e) {
            console.error('Error saving stage progress:', e);
          }
        }
        
        giveXPForChapter(totalCorrect, totalQuestions, true, chapterNum, stageId);
        if (!bagItem) saveWrongAnswersToBag(wrongAnswers, getCHQuestions(subject));
        saveSessionToSupabase(totalCorrect, totalQuestions, score, chapterNum, stageId);
        setGameState('results');
      } else {
        nextQuestion(snapQIndex);
      }
    }, 1000);
  };

  // ── حقيبة الأخطاء (12 سؤال لكل مرحلة) ──────────────────────
  // القاعدة: كل entry = 12 سؤال بالضبط
  // إذا الأخطاء < 12 → تُكمل بأسئلة عشوائية من نفس المادة
  // إذا الأخطاء > 12 → تقسّم إلى مجموعات من 12 (كل مجموعة = entry)
  const buildBagEntries = (wrongArr, allQs) => {
    const BATCH = 12;
    const entries = [];
    const wrongIds = new Set(wrongArr.map(w => w.question.id));
    const extras = allQs.filter(q => !wrongIds.has(q.id));
    const wrongQs = wrongArr.map(w => ({
      id: w.question.id, q: w.question.q, a: w.question.a,
      options: w.question.options, explanation: w.question.explanation, golden: w.question.golden,
    }));
    const total = Math.ceil(wrongQs.length / BATCH);
    let i = 0;
    while (i < wrongQs.length) {
      const batch = wrongQs.slice(i, i + BATCH);
      if (batch.length < BATCH) {
        const shuffled = [...extras].sort(() => Math.random() - 0.5);
        const needed = BATCH - batch.length;
        shuffled.slice(0, needed).forEach(q => batch.push({
          id: q.id, q: q.q, a: q.a,
          options: q.options, explanation: q.explanation, golden: q.golden,
        }));
      }
      const partNum = entries.length + 1;
      entries.push({
        label: total > 1 ? `${wrongArr.length} خطأ — جزء ${partNum}/${total}` : `${wrongArr.length} خطأ`,
        questions: batch,
      });
      i += BATCH;
    }
    return entries;
  };

  const saveWrongAnswersToBag = async (wrongArr, allQs) => {
    if (!wrongArr || wrongArr.length === 0) return;
    const now = Date.now();
    const entries = buildBagEntries(wrongArr, allQs);
    if (entries.length === 0) return;

    // حفظ في localStorage
    try {
      const bag = JSON.parse(localStorage.getItem('mistakes_bag') || '[]');
      entries.forEach(entry => {
        bag.push({
          id: `bag_${now}_${Math.random().toString(36).slice(2, 6)}`,
          type: 'questions',
          label: entry.label,
          subject,
          questions: entry.questions,
          correctReplays: 0,
          addedAt: now,
          nextPlayAt: now,
        });
      });
      localStorage.setItem('mistakes_bag', JSON.stringify(bag));
    } catch {}

    // حفظ في Supabase
    const userDbId = localStorage.getItem('user_db_id');
    const anonId = localStorage.getItem('anon_user_id');
    if (userDbId || anonId) {
      try {
        const rows = entries.map(entry => ({
          user_id: userDbId || null,
          anon_user_id: anonId || null,
          subject,
          label: entry.label,
          questions: entry.questions, // jsonb يقبل object مباشرة
          correct_replays: 0,
          next_play_at: new Date().toISOString(),
        }));
        const { error: bagError } = await supabase.from('mistakes_bag').insert(rows).select();
        if (bagError) {
          console.error('mistakes_bag save error:', bagError.message, bagError.details);
        }
      } catch (e) {
        console.error('Error saving bag items to Supabase:', e);
      }
    }
  };

  const giveXPForChapter = async (correct, total, won = true, chapterNum = 0, stageId = 0) => {
    if (!won || correct === 0) return; // لا XP عند الخسارة
    const pct = total > 0 ? correct / total : 0;
    const xp = pct === 1 ? 150 : pct >= 0.6 ? 100 : 50;
    const userDbId = localStorage.getItem('user_db_id');
    
    // ✅ حفظ XP في Supabase (مصدر بيانات حقيقي)
    if (userDbId) {
      try {
        // استخدم أعمدة أساسية موجودة في معظم جدول users
        const { data: userData, error: selectErr } = await supabase
          .from('users')
          .select('total_xp, total_correct_answers, total_questions_answered')
          .eq('id', userDbId)
          .single();
        
        if (selectErr) {
          console.error('users select error:', selectErr.message, '- تأكد من RLS وسلامة جدول users');
          return;
        }
        
        const currentXp = userData?.total_xp ?? 0;
        const currentQuestions = userData?.total_questions_answered ?? 0;
        
        const { error: updateErr } = await supabase
          .from('users')
          .update({
            total_xp: currentXp + xp,
            total_correct_answers: (userData?.total_correct_answers || 0) + correct,
            total_questions_answered: currentQuestions + correct,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userDbId);
        
        if (updateErr) {
          console.error('users update error:', updateErr.message);
          return;
        }
        console.log(`✅ XP Updated: +${xp} (Total: ${currentXp + xp})`);
      } catch (e) {
        console.error('Error updating XP in Supabase:', e);
      }
    }
    
    // حفظ نسخة محلية كـ cache فقط
    try {
      const xpKey = `player_xp_${subject}`;
      const current = parseInt(localStorage.getItem(xpKey) || '0');
      localStorage.setItem(xpKey, String(current + xp));
      const qKey = `questions_answered_${subject}`;
      const currentQ = parseInt(localStorage.getItem(qKey) || '0');
      localStorage.setItem(qKey, String(currentQ + correct));
    } catch {}
  };

  const saveStageProgressToSupabase = async (userId, subject, chapterNum, stageId, stars) => {
    try {
      // نستخدم user_id من جدول auth.users (الـ auth_id) حتى يطابق الـ FK
      // نخزّنه مسبقاً في localStorage كـ anon_user_id عند تسجيل الدخول بـ Google
      let authUserId = null;
      try {
        authUserId = localStorage.getItem('anon_user_id');
      } catch {
        authUserId = null;
      }

      // إذا ما عندناش auth user (ضيف أو مستخدم محلي فقط) نتوقف هنا
      if (!authUserId) {
        console.warn('⚠️ No auth user id found for stage_progress; skipping Supabase write.');
        return;
      }

      // 1️⃣ حاول تجيب سجل موجود لنفس المرحلة
      const { data: existing, error: existingErr } = await supabase
        .from('stage_progress')
        .select('id, stars')
        .eq('user_id', authUserId)
        .eq('subject', subject)
        .eq('chapter', chapterNum)
        .eq('stage', stageId)
        .maybeSingle();

      if (existingErr) {
        console.error('❌ stage_progress select failed:', existingErr.message, existingErr.details);
        return;
      }

      if (existing?.id) {
        // 2️⃣ تحديث النجوم: نحافظ على الأعلى فقط
        const bestStars = Math.max(existing.stars || 0, stars);
        const { error: updErr } = await supabase
          .from('stage_progress')
          .update({ stars: bestStars })
          .eq('id', existing.id);

        if (updErr) {
          console.error('❌ stage_progress update failed:', updErr.message, updErr.details);
          return;
        }

        console.log(`✅ Stage ${chapterNum}-${stageId} updated in Supabase => ${bestStars} stars`);
        return;
      }

      // 3️⃣ إدراج سجل جديد مع ملء كل الأعمدة غير القابلة للإفراغ في الجدول الحالي
      const nowIso = new Date().toISOString();
      const { error: insErr } = await supabase
        .from('stage_progress')
        .insert({
          user_id: authUserId,
          subject,
          // الأعمدة القديمة والجديدة في جدولك (لضمان عدم وجود NULL)
          chapter_number: chapterNum,
          stage_number: stageId,
          chapter: chapterNum,
          stage: stageId,
          stars,
          // أعمدة إضافية حسب بنية جدولك الحالية
          score: 0,
          completed: true,
          attempts: 1,
          created_at: nowIso,
          updated_at: nowIso,
        });

      if (insErr) {
        console.error('❌ stage_progress insert failed:', insErr.message, insErr.details);
        return;
      }

      console.log(`✅ Stage ${chapterNum}-${stageId} inserted in Supabase => ${stars} stars`);
    } catch (e) {
      console.error('Error saving stage progress to Supabase (unexpected):', e);
    }
  };

  const getCompletedStagesFromSupabase = async (userId, subject, chapterNum) => {
    try {
      const { data } = await supabase
        .from('stage_progress')
        .select('stage, stars')
        .eq('user_id', userId)
        .eq('subject', subject)
        .eq('chapter', chapterNum);
      
      const completedStages = data?.map(d => d.stage) || [];
      const starsMap = {};
      data?.forEach(d => {
        starsMap[d.stage] = d.stars;
      });
      return { completedStages, starsMap };
    } catch (e) {
      console.error('Error fetching completed stages:', e);
      return { completedStages: [], starsMap: {} };
    }
  };

  const saveSessionToSupabase = async (correctCount, totalCount, finalScore, chapterNum = 0, stageId = 0) => {
    try {
      const userDbId = localStorage.getItem('user_db_id');
      const anonId = localStorage.getItem('anon_user_id');
      const userEmail = localStorage.getItem('user_email');
      const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      
      console.log('saveSession - userDbId:', userDbId, 'accuracy:', accuracy, 'email:', userEmail);
      
      // التحقق من وجود user_id في جدول users قبل الإدراج (لتجنب Foreign Key error)
      let validUserId = null;
      if (userDbId) {
        const { data: userCheck } = await supabase
          .from('users')
          .select('id')
          .eq('id', userDbId)
          .maybeSingle();
        if (userCheck) {
          validUserId = userDbId;
        } else {
          console.warn('user_id not found in users table, using null');
        }
      }
      
      // ✅ حفظ جلسة العبة مع تفاصيل كاملة (بما فيها email، chapter، stage)
      const { data: sessData, error: sessError } = await supabase.from('game_sessions').insert({
        user_id: validUserId || null,  // null إذا لم يكن موجوداً في users
        user_email: userEmail || null,
        anon_user_id: anonId || null,  // قد يكون text وليس uuid حسب بنية الجدول
        subject,
        chapter: chapterNum > 0 ? chapterNum : null,
        stage: stageId > 0 ? stageId : null,
        question_type: 'chapters',
        game_mode: 'chapter',
        score: finalScore,
        questions_total: totalCount,
        questions_correct: correctCount,
        questions_wrong: totalCount - correctCount,
        accuracy,
        is_guest: !validUserId && !anonId,
        speed_mode: speedMode,
        created_at: new Date().toISOString(),
      }).select();
      
      if (sessError) {
        console.error('game_sessions save error:', sessError.message, sessError.details);
        // إذا كان الخطأ بسبب Foreign Key، جرّب بدون user_id
        if (sessError.message?.includes('foreign key')) {
          const { error: retryError } = await supabase.from('game_sessions').insert({
            user_id: null,  // null بدلاً من user_id غير موجود
            user_email: userEmail || null,
            anon_user_id: anonId || null,
            subject,
            chapter: chapterNum > 0 ? chapterNum : null,
            stage: stageId > 0 ? stageId : null,
            question_type: 'chapters',
            game_mode: 'chapter',
            score: finalScore,
            questions_total: totalCount,
            questions_correct: correctCount,
            questions_wrong: totalCount - correctCount,
            accuracy,
            is_guest: true,
            speed_mode: speedMode,
            created_at: new Date().toISOString(),
          });
          if (!retryError) {
            console.log(`✅ Session saved (without user_id): ${correctCount}/${totalCount} (${accuracy}%)`);
            return;
          }
        }
        throw sessError;
      }
      console.log(`✅ Session saved: ${correctCount}/${totalCount} (${accuracy}%)`);
    } catch (e) { 
      console.error('saveSession error:', e?.message || e); 
    }
  };

  // يُستدعى فقط للأسئلة الوسطى (نهاية اللعبة تُعالج في showFeedbackModal)
  const nextQuestion = (snapIdx) => {
    const nextIdx = (snapIdx ?? qIndex) + 1;
    const total = questions.length || 12;
    setProgress(Math.min(100, (nextIdx / total) * 100));
    setQIndex(nextIdx);
    setCurrentQ(questions[nextIdx]);
    setQY(-20);
    setDisabledOptions([]);
  };

  const useFreeze = () => {
    if (powerups.freeze <= 0 || frozen || gameState !== 'playing' || feedback.show) return;
    triggerHaptic(50);
    playSound(600, 'sine', 0.2, 0.5);
    setPowerups(prev => ({ ...prev, freeze: prev.freeze - 1 }));
    setFrozen(true);
    freezeTimerRef.current = setTimeout(() => setFrozen(false), 5000);
  };

  const useBomb = () => {
    if (powerups.bomb <= 0 || gameState !== 'playing' || feedback.show || !currentQ) return;
    triggerHaptic(50);
    playSound(400, 'square', 0.15, 0.2);
    setPowerups(prev => ({ ...prev, bomb: prev.bomb - 1 }));
    const wrongOptions = currentQ.options.filter(o => o !== currentQ.a);
    const toDisable = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setDisabledOptions(toDisable);
  };

  useEffect(() => {
    if (!streak.active || gameState !== 'playing') return;
    streakTimerRef.current = setInterval(() => {
      setStreak(prev => {
        const newTime = prev.timeLeft - 50;
        if (newTime <= 0) {
          clearInterval(streakTimerRef.current);
          return { active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 50);
    return () => clearInterval(streakTimerRef.current);
  }, [streak.active, gameState]);

  const bg = isDark ? 'bg-slate-900' : 'bg-slate-50';
  const text = isDark ? 'text-white' : 'text-slate-800';
  const card = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';

  return (
    <div className={`min-h-[100dvh] w-full ${bg} overflow-hidden select-none ${shakeScreen === 1 ? 'animate-shake' : shakeScreen === 2 ? 'animate-hardShake' : ''}`} style={{ fontFamily: "'Cairo', sans-serif", fontWeight: '700', touchAction: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Nunito:wght@400;700;900&family=Tajawal:wght@400;700;900&display=swap');
        
        /* Animations */
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        @keyframes hardShake { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-10px,-10px); } 30% { transform: translate(10px,10px); } 50% { transform: translate(-10px,5px); } 70% { transform: translate(10px,-10px); } 90% { transform: translate(-5px,10px); } }
        @keyframes shakeQ { 0%, 100% { transform: translateX(-50%) scale(1); } 20% { transform: translateX(calc(-50% - 10px)) scale(1.02); } 40% { transform: translateX(calc(-50% + 10px)) scale(0.98); } 60% { transform: translateX(calc(-50% - 8px)) scale(1.01); } 80% { transform: translateX(calc(-50% + 8px)) scale(0.99); } }
        @keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes fire { 0%, 100% { transform: scale(1) rotate(-3deg); filter: brightness(1); } 50% { transform: scale(1.2) rotate(3deg); filter: brightness(1.3); } }
        @keyframes goldenPulse { 0%, 100% { box-shadow: 0 8px 0 #d97706, 0 0 30px rgba(251,191,36,0.5); } 50% { box-shadow: 0 8px 0 #d97706, 0 0 50px rgba(251,191,36,0.8), 0 0 80px rgba(251,191,36,0.4); } }
        @keyframes scoreUp { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); } }
        @keyframes spinProjectile { 0% { transform: translate(0,0) rotate(0deg); } 100% { transform: translate(var(--tx), var(--ty)) rotate(360deg) scale(0.5); } }
        @keyframes neonPulse { 0%, 100% { box-shadow: inset 0 0 20px rgba(236, 72, 153, 0.5); } 50% { box-shadow: inset 0 0 50px rgba(168, 85, 247, 0.8); } }
        
        /* Modal Animations */
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-down { animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); max-height: 0; } to { opacity: 1; transform: translateY(0); max-height: 300px; } }
        
        /* Utility */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-shake { animation: shake 0.5s ease-out; }
        .animate-hardShake { animation: hardShake 0.4s ease-in-out; }
        .animate-shakeQ { animation: shakeQ 0.4s ease-out; }
        .animate-popIn { animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-fire { animation: fire 0.3s infinite; }
        .animate-scoreUp { animation: scoreUp 0.8s ease-out forwards; }
        .fever-mode { animation: neonPulse 1s infinite alternate; }
      `}</style>

      {/* Dynamic Background */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-300 ${isDark ? 'bg-slate-900' : 'bg-sky-50'} ${streak.active && streak.multiplier >= 5 ? 'fever-mode' : ''}`}>
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} className="fixed pointer-events-none z-[500]" style={{
          left: p.x, top: p.y, width: p.size, height: p.size,
          backgroundColor: p.color, opacity: p.life,
          transform: `scale(${p.life}) rotate(${p.rotation}deg)`,
          borderRadius: p.type === 'coin' ? '50%' : '2px',
          boxShadow: p.type === 'coin' ? '0 0 10px #fbbf24' : 'none',
          border: p.type === 'coin' ? '2px solid #f59e0b' : 'none'
        }}>
            {p.type === 'coin' && <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-yellow-700">$</div>}
        </div>
      ))}

      {/* Score Popup */}
      {scorePopup && (
        <div className="fixed z-[400] pointer-events-none font-black text-4xl animate-scoreUp" style={{ left: scorePopup.x, top: scorePopup.y, transform: 'translate(-50%, -50%)' }}>
          <span className={scorePopup.streak ? 'text-orange-500' : 'text-emerald-500'} style={{ textShadow: '2px 2px 0px white, 0 0 20px currentColor' }}>
            +{scorePopup.points}
          </span>
        </div>
      )}

      {/* ============ MENU SCREEN ============ */}
      {gameState === 'menu' && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-4 ${card} relative overflow-hidden flex flex-col`}>
            
            {/* الخلفية المتحركة */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-3xl -top-10 -right-10 animate-pulse" />
              <div className="absolute w-32 h-32 bg-blue-400 rounded-full blur-3xl -bottom-10 -left-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              {/* الشعار والعنوان */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg animate-bounce">
                  <span className="text-4xl">🎮</span>
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1" style={{ fontFamily: 'Nunito' }}>KHTMTHA</h1>
                <p className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontFamily: 'Tajawal' }}>
                  أجب قبل ما يوصل السؤال!
                </p>
              </div>

              {/* قائمة الشرح والقواعد */}
              <div className="space-y-2 mb-6 text-sm" style={{ fontFamily: 'Tajawal' }}>
                {[
                  { icon: '⚡', title: 'COMBO', desc: 'جاوب بالنصف العلوي!', color: 'from-amber-500/20 to-orange-500/20' },
                  { icon: '❄️', title: 'تجميد', desc: '5 ثواني توقف (2x)', color: 'from-cyan-100 to-sky-100 border-cyan-200 text-cyan-700' }, // ICE BLUE
                  { icon: '💣', title: 'قنبلة', desc: 'احذف جوابين (1x)', color: 'from-red-100 to-rose-100 border-red-200 text-red-700' }, // RED
                  { icon: '⭐', title: 'XP', desc: 'عادي = 10 نقاط', color: 'from-yellow-100 to-amber-100 border-yellow-200 text-amber-700' }, // YELLOW
                  { icon: '💔', title: '3 أرواح ', desc: 'الخطأ يرجع السؤال!', color: 'from-blue-50 to-indigo-50 border-blue-200 text-blue-600' }, // BLUISH WHITE
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r ${item.color}`}>
                    <span className="text-xl w-8 text-center">{item.icon}</span>
                    <div className="flex-1 text-right" dir="rtl">
                      <span className={`font-black ml-2`}>{item.title}</span>
                      <span className="opacity-80">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* زر ابدأ اللعب */}
              <button 
                onClick={startGame} 
                className="w-full py-4 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-green-400 to-emerald-500 shadow-xl border-b-[6px] border-emerald-600 active:border-b-0 active:translate-y-[6px] transition-all duration-75 relative overflow-hidden group mt-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: 'Tajawal' }}>
                  <Play className="w-6 h-6 fill-white" /> ابدأ اللعب!
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ GAME SCREEN ============ */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="h-[100dvh] flex flex-col relative z-10">
          
          {/* HEADER (HUD) */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 relative z-50 h-24">
            
            {/* Left: Pause & Fullscreen Buttons */}
            <div className="flex gap-2 shrink-0">
                <button 
                    onClick={() => setGameState('paused')} 
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center border-b-4 border-slate-200 dark:border-slate-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                    <Pause className="w-6 h-6 text-slate-700 dark:text-slate-200 fill-current" />
                </button>
                <button 
                    onClick={toggleFullScreen} 
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center border-b-4 border-slate-200 dark:border-slate-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                    {isFullscreen ? <Minimize className="w-6 h-6 text-slate-700 dark:text-slate-200" /> : <Maximize className="w-6 h-6 text-slate-700 dark:text-slate-200" />}
                </button>
            </div>

            {/* Center: THE BOSS PROGRESS BAR (FLEXIBLE) */}
            <div className="flex-1 mx-3 h-6 relative">
                {/* Background adjusted to be softer/more harmonious */}
                <div className={`w-full h-full border-2 border-slate-400/50 rounded-full relative overflow-hidden shadow-inner ${isDark ? 'bg-slate-700/50' : 'bg-slate-300/50'}`}>
                   {/* Fill */}
                   <div 
                     className={`h-full transition-all duration-500 ease-out relative rounded-l-full ${
                        progress > 80 ? 'bg-gradient-to-r from-orange-600 to-red-600 animate-pulse' :
                        progress > 50 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                        'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                     }`}
                     style={{ 
                       width: `${progress}%`,
                       boxShadow: `0 0 15px ${progress > 80 ? '#ef4444' : progress > 50 ? '#f59e0b' : '#10b981'}`
                     }}
                   >
                     {/* Shine Effect */}
                     <div className="absolute top-0 left-0 right-0 h-[50%] bg-white/30 rounded-t-full"></div>
                     <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
                   </div>
                </div>
            </div>

            {/* Right: Score + Lives */}
            <div className="flex flex-col items-end gap-1 shrink-0">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-xl border-2 ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200'} shadow-sm`}>
                    <span className="text-yellow-500 text-xs font-black">XP</span>
                    <span className={`text-xl font-black ${text}`}>{score.toLocaleString()}</span>
                </div>
                {/* Lives */}
                <div className="flex gap-0.5">
                   {[1, 2, 3].map(i => (
                     <span key={i} className={`text-sm transition-all duration-300 ${i <= lives ? 'text-rose-500 opacity-100' : 'text-slate-300 opacity-30'}`}>❤️</span>
                   ))}
                </div>
            </div>
          </div>

                    {/* Game Area - منطقة نزول السؤال */}
          <div ref={gameAreaRef} className="flex-1 relative overflow-hidden">
            {/* Falling Question */}
            {currentQ && (
              <div
                ref={questionRef}
                className={`absolute left-1/2 -translate-x-1/2 w-[92%] max-w-md px-4 py-5 rounded-3xl text-center ${shakeQuestion ? 'animate-shakeQ' : ''} ${
                  frozen ? 'bg-cyan-500 border-cyan-300' :
                  currentQ.golden ? 'bg-amber-400 border-amber-200' :
                  (isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200')
                } border-b-[6px] border-x-2 border-t-2`}
                style={{
                  top: qY,
                  boxShadow: '0 16px 32px -8px rgba(0,0,0,0.18)',
                  animation: currentQ.golden && !frozen ? 'goldenPulse 1.5s infinite' : undefined
                }}
              >
                <div className="absolute -top-3 left-0 right-0 flex justify-center gap-2">
                    {currentQ.golden && <span className="bg-yellow-100 text-yellow-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-yellow-300">GOLDEN ⭐</span>}
                    {frozen && <span className="bg-cyan-100 text-cyan-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-cyan-300 animate-pulse">FROZEN ❄️</span>}
                </div>
                <p className={`text-base sm:text-lg font-black leading-snug ${frozen ? 'text-white' : currentQ.golden ? 'text-amber-900' : text}`}>
                  {currentQ.q}
                </p>
              </div>
            )}
          </div>

          {/* 🔥 شعلة الكومبو — floating على يسار الشاشة، وسط عمودي */}
          {showComboFire && (
            <div className="fixed left-3 top-1/2 -translate-y-1/2 z-[200] animate-pop-in pointer-events-none">
              <div className="flex items-center gap-1 bg-orange-500/90 border-2 border-orange-300 px-3 py-2 rounded-2xl shadow-xl shadow-orange-500/40">
                <span className="text-3xl leading-none">🔥</span>
                <div className="flex flex-col items-start leading-none">
                  {combo >= 2 && <span className="text-white font-black text-xl leading-tight">{combo}x</span>}
                  {streak.active && <span className="text-orange-100 font-bold text-xs">كومبو!</span>}
                </div>
              </div>
            </div>
          )}

          {/* الجزء السفلي: باور آبس + أزرار */}
          <div className={`rounded-t-[2rem] border-t backdrop-blur-md ${isDark ? 'bg-slate-800/50 border-white/5' : 'bg-white/60 border-slate-200/60'}`}>
            {/* الباور آبس في الوسط */}
            <div className="flex items-center justify-center gap-3 px-4 pt-3 pb-1">
              <button onClick={useFreeze} disabled={powerups.freeze <= 0 || frozen}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 transition-all active:scale-90 ${powerups.freeze <= 0 || frozen ? 'opacity-30 grayscale' : ''} ${isDark ? 'bg-slate-700/80 border-slate-600' : 'bg-white/80 border-slate-200'}`}>
                ❄️
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">{powerups.freeze}</span>
              </button>
              <button onClick={useBomb} disabled={powerups.bomb <= 0}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 transition-all active:scale-90 ${powerups.bomb <= 0 ? 'opacity-30 grayscale' : ''} ${isDark ? 'bg-slate-700/80 border-slate-600' : 'bg-white/80 border-slate-200'}`}>
                💣
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">{powerups.bomb}</span>
              </button>
            </div>

            {/* أزرار الإجابة — خلفية بلور */}
            <div className="grid grid-cols-2 gap-2.5 px-3 pb-6 max-w-md mx-auto" style={{paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))'}}>
              {currentQ?.options.map((opt, idx) => {
                const isDisabled = disabledOptions.includes(opt);
                const isFlying = flyingBtn?.index === idx;
                return (
                  <button
                    key={idx}
                    ref={el => optionRefs.current[idx] = el}
                    onClick={() => !isDisabled && handleAnswer(opt, idx)}
                    disabled={isDisabled || feedback.show || flyingBtn !== null}
                    className={`relative py-4 px-2 rounded-2xl font-black text-base tracking-wide transition-all border-b-[5px] active:border-b-0 active:translate-y-[5px] active:scale-95 duration-75 backdrop-blur-sm ${
                      isFlying ? 'opacity-0' :
                      isDisabled
                        ? 'opacity-30 grayscale pointer-events-none scale-90'
                        : isDark
                          ? 'bg-slate-700/70 text-white border-slate-900 shadow-slate-900/50'
                          : 'bg-white/70 text-slate-800 border-slate-300/80 shadow-slate-200'
                    } shadow-lg`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flying Button Animation */}
          {flyingBtn && (
            <div
              className={`fixed z-[300] rounded-2xl font-black text-lg flex items-center justify-center border-4 ${
                flyingBtn.correct 
                  ? 'bg-emerald-500 text-white border-emerald-600' 
                  : 'bg-rose-500 text-white border-rose-600'
              }`}
              style={{
                left: flyingBtn.startX,
                top: flyingBtn.startY,
                width: flyingBtn.startW,
                height: flyingBtn.startH,
                '--tx': `${flyingBtn.targetX - flyingBtn.startX}px`,
                '--ty': `${flyingBtn.targetY - flyingBtn.startY}px`,
                animation: 'spinProjectile 0.35s ease-in forwards',
                boxShadow: '0 0 40px rgba(0,0,0,0.3)'
              }}
            >
              {flyingBtn.text}
            </div>
          )}
        </div>
      )}

      {/* ============ PAUSE MENU MODAL (Using the New Component) ============ */}
      <ChapterPauseMenuModal
        isOpen={gameState === 'paused'}
        onClose={() => setGameState('playing')}
        onResume={() => setGameState('playing')}
        onExit={() => { if (onExit) onExit(resultStarsRef.current); else setGameState('menu'); }}
        currentSpeedMode={speedMode}
        setSpeedMode={setSpeedMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* ============ RESULTS SCREEN ============ */}
      <ResultScreen
        open={gameState === 'results'}
        isDark={isDark}
        score={score}
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
        isGuest={isGuest}
        stageId={stageId}
        chapterNum={chapterNum}
        onNextStage={() => {
          if (onStartGame) onStartGame('chapter', subject, userProfile, chapterNum, stageId + 1);
          setGameState('menu');
        }}
        onNextChapter={() => { if (onExit) onExit(resultStarsRef.current, true); else setGameState('menu'); }}
        onRetryStage={startGame}
        onBack={() => { if (onExit) onExit(resultStarsRef.current); else setGameState('menu'); }}
      />

      {/* ============ FEEDBACK OVERLAY ============ */}
      {feedback.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[400] pointer-events-none px-4">
          <div className={`
            relative
            transform transition-all duration-300
            scale-100 md:scale-125 lg:scale-150 /* Responsive scaling */
            p-6 md:p-8 /* Responsive padding */
            rounded-[2rem] md:rounded-[3rem] 
            shadow-2xl text-center border-4 md:border-8 
            animate-popIn 
            max-w-[90vw] /* Prevent overflow width */
            ${
            feedback.correct 
              ? 'bg-emerald-500 border-white text-white rotate-2 md:rotate-3'
              : 'bg-rose-500 border-white text-white -rotate-2 md:-rotate-3'
          }`}>
            <div className="text-6xl md:text-8xl mb-2 md:mb-4 drop-shadow-md"> {/* Responsive emoji size */}
              {feedback.correct ? '🤩' : '😱'}
            </div>
            <p className="text-xl md:text-3xl font-black whitespace-pre-line drop-shadow-md leading-tight" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {feedback.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ╔═══════════════════════════════════════════════════════════╗
// ║  MONSTER GAME: 10 Lives, Infinite, No Progress Bar        ║
// ╚═══════════════════════════════════════════════════════════╝

// =================================================================
// 🛠️ مكونات التصميم (UI Components)
// =================================================================

const triggerHaptic = (duration = 15) => { 
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration); 
  }
};


// قائمة التوقف الجديدة
const MonsterPauseMenuModal = ({ isOpen, onClose, onResume, onExit, currentSpeedMode, setSpeedMode, isMuted, setIsMuted, isDark, setIsDark }) => {
  const [speedOpen, setSpeedOpen] = useState(false);

  // إعدادات السرعة
  const speeds = {
    'baby': { 
        id: 'baby',
        val: 0.3,
        label: 'وضع الرضيع 👶', 
        desc: 'رحلة الألف ميل تبدأ بخطوة', 
        color: 'bg-blue-100 text-blue-600',
        border: 'border-blue-200'
    },
    'teen': { 
        id: 'teen',
        val: 0.5,
        label: 'فتى (متوسط) 👱', 
        desc: 'للناس اللي قطعت شوط (هرولة)', 
        color: 'bg-orange-100 text-orange-600',
        border: 'border-orange-200'
    },
    'beast': { 
        id: 'beast',
        val: 0.8,
        label: 'وضع الوحش 👹', 
        desc: 'للأبطال اللي يمشون ميل ميل!', 
        color: 'bg-red-100 text-red-600',
        border: 'border-red-200'
    }
  };

  const selectedSpeedConfig = speeds[currentSpeedMode] || speeds['teen'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5 font-['Cairo']">
      {/* خلفية معتمة */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onResume}></div>
      
      {/* جسم القائمة */}
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1E293B] p-6 rounded-[2.5rem] border-4 border-slate-200 dark:border-slate-700 shadow-2xl animate-pop-in overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* عنوان القائمة */}
        <div className="text-center mb-6 shrink-0 pt-2">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-1">استراحة محارب 🛑</h2>
            <p className="text-sm font-bold text-slate-400">خذ نفس وكمل الطريق</p>
        </div>

        <div className="space-y-3 overflow-y-auto hide-scrollbar px-1 pb-2">
            {/* 1. زر الاستئناف */}
            <TactileButton 
                onClick={onResume}
                className="w-full py-4 rounded-2xl gap-3 text-lg shrink-0"
                colorClass="bg-yellow-400"
                borderClass="border-yellow-600"
            >
                <Play className="w-6 h-6 fill-current text-yellow-900" />
                <span className="font-black text-yellow-900">استئناف اللعب</span>
            </TactileButton>

            {/* 2. زر التحكم بالسرعة */}
            <div className="relative shrink-0">
                <TactileButton 
                    onClick={() => setSpeedOpen(!speedOpen)}
                    className="w-full p-4 rounded-2xl justify-between"
                    colorClass="bg-slate-50 dark:bg-slate-800"
                    borderClass="border-slate-200 dark:border-slate-700"
                >
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${selectedSpeedConfig.color}`}>
                            {selectedSpeedConfig.label.split(' ').pop()} 
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-[10px] font-bold text-slate-400">سرعة اللعبة</span>
                            <span className="font-black text-slate-800 dark:text-white">{selectedSpeedConfig.label.replace(/ .*/,'') + ' ' + selectedSpeedConfig.label.split(' ')[1]}</span>
                        </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${speedOpen ? 'rotate-180' : ''}`} />
                </TactileButton>

                {/* القائمة المنسدلة */}
                {speedOpen && (
                    <div className="mt-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-[3px] border-slate-200 dark:border-slate-700 shadow-inner overflow-hidden animate-slide-down">
                        <div className="p-2 grid gap-2">
                            {Object.values(speeds).map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSpeedMode(s.id); setSpeedOpen(false); triggerHaptic(); }}
                                    className={`w-full p-3 rounded-xl flex items-start gap-3 transition-all border
                                        ${currentSpeedMode === s.id 
                                            ? 'bg-white dark:bg-slate-700 border-yellow-400 shadow-md ring-2 ring-yellow-400/20' 
                                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'}
                                    `}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 mt-1 ${s.color.split(' ')[0]} bg-opacity-20`}>
                                        {s.label.split(' ').pop()}
                                    </div>
                                    <div className="text-right flex-1 pt-0.5">
                                        <div className={`font-black text-base mb-0.5 ${currentSpeedMode === s.id ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                                            {s.label.replace(/ .*/,'') + ' ' + (s.label.split(' ')[1] || '')}
                                        </div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight">
                                            {s.desc}
                                        </div>
                                    </div>
                                    {currentSpeedMode === s.id && <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 3. صف الأزرار (صوت + وضع ليلي + خروج) */}
            <div className="flex gap-2 shrink-0">
                {/* زر الصوت */}
                <TactileButton 
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass={!isMuted ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'bg-slate-100 dark:bg-slate-800'}
                    borderClass={!isMuted ? 'border-indigo-200 dark:border-indigo-800' : 'border-slate-200 dark:border-slate-700'}
                >
                    {!isMuted ? <Volume2 className="w-5 h-5 text-indigo-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                </TactileButton>

                {/* زر الوضع الليلي */}
                <TactileButton 
                    onClick={() => setIsDark(!isDark)}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass={isDark ? 'bg-slate-700' : 'bg-orange-50'}
                    borderClass={isDark ? 'border-slate-600' : 'border-orange-200'}
                >
                    {isDark ? <Moon className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-orange-500" />}
                </TactileButton>

                {/* زر الخروج */}
                <TactileButton 
                    onClick={onExit}
                    className="flex-1 p-3 rounded-2xl gap-1"
                    colorClass="bg-rose-50 dark:bg-rose-900/20"
                    borderClass="border-rose-200 dark:border-rose-800"
                >
                    <LogOut className="w-5 h-5 text-rose-500" />
                </TactileButton>
            </div>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 📝 منطقة تعديل النصوص والرسائل
// =================================================================
const MN_MESSAGES = {
  // التشجيع (عام)
  correct: [
    "👏 إمتاز! استمر هيج",
    "🌟 وحش ابو جاسم",
    "⚡ انت شكاكي",
    "🌟 جينات اينشتاين عندك؟",
    "رح تشكهم بالوزاري",
    "🔥 بطل",
    "💯 ممتاز!",
    "👏 ممتاز! استمر هيج!",
    "💪 ما تتوقف!",
    "🔥 عفية عليك!",
    "🚀 إشكلك مخلص المنهج قبل الأستاذ!",
    "🔥 الله يزوجك 4"
  ],
  // الذم (عام)
  wrong: [
    "🙄 السؤال يگلك: أرجوك بعد لا تجاوبني!",
    "⚡ بهاي السرعة جاوبت... شكلك مستغني عن الدرجة!",
    "💔 راح تبقى الإجابة بذاكرتك كصدمة عاطفية!",
    "🤦‍♂️ لو تخلي إيدك على عينك جان جاوبت صح",
    "😭 من جاوبت، الجملة جانت تبجي وتصيح: مو هيج الحل",
    "😅 همزين مو بالوزاري!",
    "🤣 بعدك بالسادس لو حوّلوك ابتدائي؟",
    "😳 جاوبت من جيبك؟ لأن الكتاب مابي هيج شي",
    "😬 آخ... طارت الدرجة!"
  ],
  // تمت إزالة finalCountdown لأن المرحلة لا نهائية
  streak: ["🔥🔥 ON FIRE!", "⚡ UNSTOPPABLE!", "💪 GODLIKE!", "🌟 LEGEND!"]
};

// Sample Questions with Explanation
// أسئلة الوحش - إنجليزي
const MN_QUESTIONS_EN = [
  {
    id: 1,
    q: "I ______ to the store yesterday.",
    options: ["go", "went", "gone", "going"],
    a: "went",
    explanation: "نستخدم الماضي البسيط (went) لأن الجملة تحتوي على 'yesterday'.",
    golden: false
  },
  {
    id: 2,
    q: "She ______ glasses before she had surgery.",
    options: ["wear", "used to wear", "wears", "wearing"],
    a: "used to wear",
    explanation: "نستخدم 'used to' للتعبير عن عادة في الماضي لم تعد موجودة.",
    golden: true
  },
  {
    id: 3,
    q: "How ______ exercise does he take every day?",
    options: ["many", "much", "more", "most"],
    a: "much",
    explanation: "كلمة 'exercise' غير معدودة (uncountable)، فنستخدم 'much'.",
    golden: false
  },
  {
    id: 4,
    q: "If I ______ you, I would study harder.",
    options: ["am", "was", "were", "be"],
    a: "were",
    explanation: "في الجملة الشرطية النوع الثاني للنصيحة نستخدم 'If I were you'.",
    golden: true
  },
  {
    id: 5,
    q: "The report was ______ prepared before the deadline.",
    options: ["careful", "carefully", "careless", "care"],
    a: "carefully",
    explanation: "نحتاج ظرفاً (Adverb) لوصف الفعل 'prepared'، لذا نختار 'carefully'.",
    golden: false
  },
  {
    id: 6,
    q: "By the time they arrived, we ______ dinner.",
    options: ["finish", "finished", "had finished", "have finished"],
    a: "had finished",
    explanation: "Past Perfect يُستخدم للحدث المكتمل قبل حدث آخر في الماضي.",
    golden: true
  },
  {
    id: 7,
    q: "She asked me where ______ the day before.",
    options: ["I had been", "had I been", "I was", "was I"],
    a: "I had been",
    explanation: "في الكلام غير المباشر (Reported Speech) نحوّل المضارع إلى ماضٍ.",
    golden: true
  },
  {
    id: 8,
    q: "The book ______ by millions of readers worldwide.",
    options: ["read", "reads", "has been read", "is reading"],
    a: "has been read",
    explanation: "نستخدم المبني للمجهول (Passive) مع Present Perfect للتعبير عن فعل مكتمل.",
    golden: false
  },
  {
    id: 9,
    q: "He suggested ______ to the cinema that evening.",
    options: ["to go", "going", "go", "went"],
    a: "going",
    explanation: "بعد 'suggest' نستخدم الفعل بصيغة الـ gerund (V+ing).",
    golden: true
  },
  {
    id: 10,
    q: "Neither the students nor the teacher ______ ready yet.",
    options: ["are", "is", "were", "have been"],
    a: "is",
    explanation: "مع 'neither...nor' يتبع الفعل الاسم الأقرب إليه، وهو 'the teacher' (مفرد).",
    golden: false
  },
];

// أسئلة الوحش - أحياء
const MN_QUESTIONS_BIO = [
  {
    id: 1,
    q: "ما العضية المسؤولة عن تصنيع البروتينات في الخلية؟",
    options: ["النواة", "الميتوكوندريا", "الريبوسومات", "جهاز گولجي"],
    a: "الريبوسومات",
    explanation: "الريبوسومات هي موقع تصنيع البروتينات بقراءة رسالة mRNA.",
    golden: false
  },
  {
    id: 2,
    q: "ما المعادلة الصحيحة للتركيب الضوئي؟",
    options: [
      "CO₂ + H₂O → C₆H₁₂O₆ + O₂",
      "O₂ + H₂O → CO₂ + ATP",
      "C₆H₁₂O₆ + O₂ → CO₂ + H₂O",
      "ATP + H₂O → ADP + Pi"
    ],
    a: "CO₂ + H₂O → C₆H₁₂O₆ + O₂",
    explanation: "التركيب الضوئي: ثاني أكسيد الكربون + الماء + ضوء = غلوكوز + أكسجين.",
    golden: true
  },
  {
    id: 3,
    q: "كم عدد الكروموسومات في الخلية الجنسية (gamete) لدى الإنسان؟",
    options: ["46", "23", "48", "22"],
    a: "23",
    explanation: "الخلايا الجنسية أحادية الصيغة الكروموسومية (haploid) تحتوي على 23 كروموسوماً.",
    golden: false
  },
  {
    id: 4,
    q: "ما اسم عملية تضاعف DNA؟",
    options: ["الترجمة", "النسخ", "التضاعف", "الانقسام"],
    a: "التضاعف",
    explanation: "Replication (التضاعف) هي العملية التي يُنسخ فيها DNA لإنتاج نسختين متطابقتين.",
    golden: true
  },
  {
    id: 5,
    q: "أي من التالي يصف الوراثة المشتركة السيادة (Codominance)؟",
    options: [
      "ظهور الصفة الوسطى بين الأبوين",
      "ظهور كلتا الصفتين معاً في النسل",
      "طغيان الصفة السائدة على المتنحية",
      "اختفاء الصفتين في النسل"
    ],
    a: "ظهور كلتا الصفتين معاً في النسل",
    explanation: "في السيادة المشتركة (Codominance) تُعبَّر عن كلتا الصفتين الأليليتين معاً في الفرد.",
    golden: true
  },
  {
    id: 6,
    q: "ما الجزيء الذي يحمل المعلومات الوراثية من النواة إلى الريبوسومات؟",
    options: ["DNA", "mRNA", "tRNA", "rRNA"],
    a: "mRNA",
    explanation: "الـ mRNA (رسالة RNA) ينقل الشفرة الوراثية من DNA في النواة إلى الريبوسومات.",
    golden: false
  },
  {
    id: 7,
    q: "في أي مرحلة من الانقسام المتساوي (Mitosis) تتراصف الكروموسومات في منتصف الخلية؟",
    options: ["الطور التمهيدي", "الطور الاستوائي", "الطور الانفصالي", "الطور النهائي"],
    a: "الطور الاستوائي",
    explanation: "في الطور الاستوائي (Metaphase) تتراصف الكروموسومات على الصفيحة الاستوائية للخلية.",
    golden: true
  },
  {
    id: 8,
    q: "ما وظيفة جهاز گولجي في الخلية؟",
    options: ["إنتاج الطاقة", "تصنيع البروتينات", "تعبئة البروتينات وإفرازها", "تخزين الماء"],
    a: "تعبئة البروتينات وإفرازها",
    explanation: "جهاز گولجي يعمل كـ'مكتب البريد' — يُعدّل البروتينات ويُعبّئها ويُرسلها لوجهتها.",
    golden: false
  },
  {
    id: 9,
    q: "أي نوع من الطفرات يُسبب تغيّراً في إطار القراءة بأكمله؟",
    options: ["الاستبدال", "الإضافة أو الحذف", "الانعكاس", "الانتقال"],
    a: "الإضافة أو الحذف",
    explanation: "إضافة أو حذف قاعدة نيتروجينية يُزعزع إطار القراءة (Frameshift mutation) ويؤثر على كل البروتين.",
    golden: true
  },
  {
    id: 10,
    q: "ما الطاقة الناتجة عن أكسدة جزيء واحد من الغلوكوز كاملاً؟",
    options: ["2 ATP", "4 ATP", "36-38 ATP", "10 ATP"],
    a: "36-38 ATP",
    explanation: "التنفس الهوائي الكامل لجزيء الغلوكوز ينتج 36-38 جزيء ATP عبر الگليكوليز ودورة كربس والفسفرة التأكسدية.",
    golden: true
  },
];

// اختيار أسئلة الوحش بحسب المادة
const getMNQuestions = (subject) => subject === 'biology' ? MN_QUESTIONS_BIO : MN_QUESTIONS_EN;

function MonsterGameScreen({ onExit, subject = 'english', userProfile, chapterNum = 0 }) {
  const [gameState, setGameState] = useState('menu');
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Game Data
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(10); // START WITH 10 LIVES
  const [combo, setCombo] = useState(0);
  const [streak, setStreak] = useState({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
  const [powerups, setPowerups] = useState({ freeze: 2, bomb: 1 });
  const [frozen, setFrozen] = useState(false);
  // const [progress, setProgress] = useState(0); // Progress not needed for infinite mode visual
  
  // Settings
  const [speedMode, setSpeedMode] = useState(() => { try { return localStorage.getItem('admin_game_speed') || 'teen'; } catch { return 'teen'; } });
  
  // Question State
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [qY, setQY] = useState(-20);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(new Set());
  
  // Animation States
  const [flyingBtn, setFlyingBtn] = useState(null);
  const [shakeScreen, setShakeScreen] = useState(0); 
  const [shakeQuestion, setShakeQuestion] = useState(false);
  const [showComboFire, setShowComboFire] = useState(false);
  const comboFireTimerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [scorePopup, setScorePopup] = useState(null);

  // إخفاء الشعلة بعد 5 ثوانٍ
  useEffect(() => {
    if (showComboFire) {
      clearTimeout(comboFireTimerRef.current);
      comboFireTimerRef.current = setTimeout(() => setShowComboFire(false), 5000);
    }
    return () => clearTimeout(comboFireTimerRef.current);
  }, [showComboFire]);

  // Results
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  
  // Feedback
  const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
  
  // Refs - Moved here to fix ReferenceError
  const gameAreaRef = useRef(null);
  const questionRef = useRef(null);
  const optionRefs = useRef([]);
  const animFrameRef = useRef(null);
  const streakTimerRef = useRef(null);
  const freezeTimerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize/Resume Audio Context
  const initAudio = () => {
    if (!audioCtxRef.current) {
        try {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) { console.error("Audio API not supported"); }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
    }
  };

  // Audio System
  const playSound = useCallback((freq, type = 'sine', vol = 0.3, dur = 0.15) => {
    if (isMuted) return;
    initAudio();
    
    if (!audioCtxRef.current) return;

    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      
      // Punchier envelope
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01); 
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  }, [isMuted]);

  const playCorrectSound = (multiplier) => {
    // 🔥 Heavy Impact Sound + Chime
    playSound(100, 'sawtooth', 0.4, 0.1); 
    setTimeout(() => {
        const baseFreq = 600 + (multiplier * 150);
        playSound(baseFreq, 'square', 0.15, 0.1);
        playSound(baseFreq * 1.5, 'sine', 0.2, 0.2);
    }, 50);
  };

  const playWrongSound = () => {
    playSound(150, 'sawtooth', 0.4, 0.4);
    setTimeout(() => playSound(100, 'sawtooth', 0.4, 0.4), 100);
  };

  // Spawn Particles
  const spawnParticles = (x, y, type = 'confetti', count = 15) => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      x, y,
      vx: (Math.random() - 0.5) * (type === 'coin' ? 15 : 20),
      vy: (Math.random() - 0.5) * (type === 'coin' ? 25 : 20) - 10,
      color: type === 'coin' ? '#fbbf24' : ['#f472b6', '#34d399', '#60a5fa', '#fcd34d'][Math.floor(Math.random() * 4)],
      size: type === 'coin' ? Math.random() * 6 + 8 : Math.random() * 8 + 4,
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      type
    }));
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Full Screen Handler (Fixed)
  const toggleFullScreen = () => {
    try {
      if (!document.fullscreenElement) {
        const elem = document.documentElement;
        const requestFS = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen;
        
        if (requestFS) {
          requestFS.call(elem)
            .then(() => setIsFullscreen(true))
            .catch(err => {
              console.warn("Full screen error:", err);
            });
        }
      } else {
        const exitFS = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
        if (exitFS) {
          exitFS.call(document)
            .then(() => setIsFullscreen(false))
            .catch(err => console.warn(err));
        }
      }
    } catch (e) {
      console.warn("Fullscreen API error:", e);
    }
  };

  // Initialize Game
  const startGame = async () => {
    initAudio(); // Initialize audio context on first interaction

    // إذا في chapterNum → جلب أسئلة السنة الكاملة من Supabase
    let rawQuestions = null;
    if (chapterNum > 0 && subject === 'english') {
      rawQuestions = await fetchFullYearQuestions(chapterNum);
    }
    if (!rawQuestions) {
      rawQuestions = getMNQuestions(subject);
    }

    const preparedQuestions = rawQuestions.map(q => {
      const originalOptions = [...(q.options || [])];
      // IMPORTANT: resolve correct answer BEFORE shuffling options
      const correctText = resolveCorrectAnswerText({ ...q, options: originalOptions });
      return {
        ...q,
        a: correctText,
        options: [...originalOptions].sort(() => Math.random() - 0.5),
      };
    });

    setQuestions(preparedQuestions);
    setCurrentQ(preparedQuestions[0]);
    setQIndex(0);
    setQY(-20);
    setScore(0);
    setLives(10); // START WITH 10 LIVES
    setCombo(0);
    setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
    setPowerups({ freeze: 2, bomb: 1 });
    setFrozen(false);
    setDisabledOptions([]);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setAnsweredCorrectly(new Set());
    // setProgress(0); // No progress bar
    setFeedback({ show: false, correct: false, message: '' });
    setParticles([]);
    setShakeScreen(0);
    setGameState('playing');
  };

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing' || feedback.show || frozen) return;
    
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;

      setQY(prev => {
        const customSpeeds = (() => { try { return JSON.parse(localStorage.getItem('admin_custom_speeds') || '{}'); } catch { return {}; } })();
        const speedMap = { 'baby': customSpeeds.baby ?? 0.25, 'teen': customSpeeds.teen ?? 0.45, 'beast': customSpeeds.beast ?? 0.75 };
        const currentBaseSpeed = speedMap[speedMode] || 0.45;
        const speedMultiplier = streak.active ? 1 + (streak.multiplier * 0.05) : 1;
        const newY = prev + (currentBaseSpeed * speedMultiplier * dt);
        const gameH = gameAreaRef.current?.offsetHeight || 600;

        if (newY > gameH) {
          handleMiss();
          return -20;
        }
        return newY;
      });
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, feedback.show, frozen, speedMode, streak.active, combo]);

  // Particle Animation
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.8,
          life: p.life - p.decay,
          rotation: (p.rotation || 0) + 10
        }))
        .filter(p => p.life > 0)
      );
    }, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  const isInUpperHalf = () => {
    const gameH = gameAreaRef.current?.offsetHeight || 600;
    return qY < (gameH / 2);
  };

  const handleAnswer = (answer, btnIndex) => {
    if (gameState !== 'playing' || feedback.show || !currentQ || flyingBtn !== null) return;

    initAudio();

    const isCorrect = normalizeAnswerText(answer) === normalizeAnswerText(currentQ.a);
    const btnEl = optionRefs.current[btnIndex];
    const btnRect = btnEl?.getBoundingClientRect();
    const qRect = questionRef.current?.getBoundingClientRect();
    
    if (btnRect && qRect) {
      triggerHaptic(50);
      setFlyingBtn({
        index: btnIndex,
        text: answer,
        startX: btnRect.left,
        startY: btnRect.top,
        startW: btnRect.width,
        startH: btnRect.height,
        targetX: qRect.left + qRect.width / 2 - btnRect.width / 2,
        targetY: qRect.top + qRect.height / 2 - btnRect.height / 2,
        correct: isCorrect
      });
    }

    setTimeout(() => {
      if (isCorrect) {
        triggerHaptic(80);
        
        const basePoints = currentQ.golden ? 20 : 10;
        let finalPoints = basePoints;
        let currentMult = streak.multiplier;
        
        if (isInUpperHalf()) {
            if (streak.active) {
                // Already active: increase multiplier up to 5, reset timer
                const newMult = Math.min(streak.multiplier + 1, 5);
                setStreak(prev => ({ ...prev, active: true, multiplier: newMult, timeLeft: 5000, maxTime: 5000 }));
                finalPoints = basePoints * newMult;
                currentMult = newMult;
            } else {
                // Start new streak: 2x multiplier
                setStreak({ active: true, multiplier: 2, timeLeft: 5000, maxTime: 5000 });
                finalPoints = basePoints * 2;
                currentMult = 2;
            }
        } else {
            // Lower half: apply current multiplier but let timer run
            if (streak.active) {
                finalPoints = basePoints * streak.multiplier;
            }
        }

        playCorrectSound(currentMult);
        setScore(prev => prev + finalPoints);
        setCombo(prev => Math.min(5, prev + 1));
        setCorrectAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        setAnsweredCorrectly(prev => new Set([...prev, currentQ.id]));

        setShakeQuestion(true);
        if (qRect) {
          setScorePopup({ x: qRect.left + qRect.width / 2, y: qRect.top, points: finalPoints, streak: streak.active });
          spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'confetti', 15);
          spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'coin', 8);
        }

        if (currentMult >= 2) setShowComboFire(true);

        // --- 🤖 Feedback Message Logic (Infinite Mode) ---
        let msg = "";
        // No final countdown logic here
        
        if (currentMult >= 5) {
             msg = MN_MESSAGES.streak[Math.floor(Math.random() * MN_MESSAGES.streak.length)];
        } else {
             msg = MN_MESSAGES.correct[Math.floor(Math.random() * MN_MESSAGES.correct.length)];
        }

        showFeedbackModal(true, msg);

      } else {
        setShakeScreen(2);
        triggerHaptic(300);
        playWrongSound();
        setLives(prev => prev - 1);
        setCombo(0);
        setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 }); 
        setShowComboFire(false);
        
        // RE-QUEUE WRONG QUESTION (Retry logic)
        if (!answeredCorrectly.has(currentQ.id)) {
          setQuestions(prev => [...prev, currentQ]);
        }
        
        setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        if (qRect) spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'confetti', 20);
        
        const msg = MN_MESSAGES.wrong[Math.floor(Math.random() * MN_MESSAGES.wrong.length)];
        showFeedbackModal(false, msg);
      }
      
      setTimeout(() => {
        setShakeQuestion(false);
        setShakeScreen(0);
        setFlyingBtn(null);
        setScorePopup(null);
      }, 300);

    }, 300);
  };

  const handleMiss = () => {
    playWrongSound();
    triggerHaptic(200);
    setShakeScreen(1);
    setLives(prev => prev - 1);
    setCombo(0);
    setStreak({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
    setShowComboFire(false);
    
    // RE-QUEUE MISSED QUESTION
    if (!answeredCorrectly.has(currentQ.id)) {
      setQuestions(prev => [...prev, currentQ]);
    }
    
    setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: null }]);
    showFeedbackModal(false, "⏰ خلص الوقت!");
    setTimeout(() => setShakeScreen(0), 500);
  };

  const saveMonsterSessionToSupabase = async (correctCount, totalCount, finalScore) => {
    // حفظ أعلى نقاط في localStorage
    const hsKey = `monster_hs_${subject}_ch${chapterNum}`;
    const prevHS = parseInt(localStorage.getItem(hsKey) || '0');
    if (finalScore > prevHS) {
      localStorage.setItem(hsKey, String(finalScore));
    }

    try {
      const userDbId = localStorage.getItem('user_db_id');
      const anonId = localStorage.getItem('anon_user_id');
      const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      await supabase.from('game_sessions').insert({
        user_id: userProfile?.id || null,
        anon_user_id: userDbId || anonId || null,
        subject,
        question_type: 'chapters',
        game_mode: 'monster',
        score: finalScore,
        questions_total: totalCount,
        questions_correct: correctCount,
        questions_wrong: totalCount - correctCount,
        accuracy,
        is_guest: !userDbId && !userProfile?.id,
        speed_mode: speedMode,
      });
      // حفظ أعلى نقاط في Supabase
      if (userDbId || anonId) {
        const id = userDbId || anonId;
        await supabase.from('monster_high_scores').upsert({
          anon_user_id: id,
          subject,
          chapter_num: chapterNum,
          high_score: Math.max(finalScore, prevHS),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'anon_user_id,subject,chapter_num' });
      }
    } catch (e) { console.warn('saveMonsterSession error:', e); }
  };

  // ── حقيبة الأخطاء (وحش) — نفس قاعدة 12 سؤال ──────────────────
  const buildMonsterBagEntries = (wrongArr) => {
    const BATCH = 12;
    const entries = [];
    const allQs = getMNQuestions(subject);
    const wrongIds = new Set(wrongArr.map(w => w.question.id));
    const extras = allQs.filter(q => !wrongIds.has(q.id));
    const wrongQs = wrongArr.map(w => ({
      id: w.question.id, q: w.question.q, a: w.question.a,
      options: w.question.options, explanation: w.question.explanation, golden: w.question.golden,
    }));
    const total = Math.ceil(wrongQs.length / BATCH);
    let i = 0;
    while (i < wrongQs.length) {
      const batch = wrongQs.slice(i, i + BATCH);
      if (batch.length < BATCH) {
        const shuffled = [...extras].sort(() => Math.random() - 0.5);
        shuffled.slice(0, BATCH - batch.length).forEach(q => batch.push({
          id: q.id, q: q.q, a: q.a,
          options: q.options, explanation: q.explanation, golden: q.golden,
        }));
      }
      const partNum = entries.length + 1;
      entries.push({
        label: total > 1
          ? `وحش — ${wrongArr.length} خطأ — جزء ${partNum}/${total}`
          : `وحش — ${wrongArr.length} خطأ`,
        questions: batch,
      });
      i += BATCH;
    }
    return entries;
  };

  const saveMonsterWrongAnswersToBag = async (wrongArr) => {
    if (!wrongArr || wrongArr.length === 0) return;
    const now = Date.now();
    const entries = buildMonsterBagEntries(wrongArr);
    if (entries.length === 0) return;

    try {
      const bag = JSON.parse(localStorage.getItem('mistakes_bag') || '[]');
      entries.forEach(entry => {
        bag.push({
          id: `bag_${now}_${Math.random().toString(36).slice(2, 6)}`,
          type: 'questions',
          label: entry.label,
          subject,
          questions: entry.questions,
          correctReplays: 0,
          addedAt: now,
          nextPlayAt: now,
        });
      });
      localStorage.setItem('mistakes_bag', JSON.stringify(bag));
    } catch {}

    const userDbId = localStorage.getItem('user_db_id');
    const anonId = localStorage.getItem('anon_user_id');
    if (userDbId || anonId) {
      try {
        const rows = entries.map(entry => ({
          user_db_id: userDbId || anonId,
          anon_user_id: anonId || null,
          subject,
          label: entry.label,
          questions: entry.questions,
          correct_replays: 0,
          next_play_at: new Date().toISOString(),
        }));
        await supabase.from('mistakes_bag').insert(rows);
      } catch {}
    }
  };

  const showFeedbackModal = (correct, message) => {
    setFeedback({ show: true, correct, message });
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
      if (lives <= 1 && !correct) {
        // لا XP من لعبة الوحش — الـ XP فقط من مراحل الفصول والمراجعات
        saveMonsterWrongAnswersToBag(wrongAnswers); // حفظ الأخطاء في الحقيبة
        saveMonsterSessionToSupabase(correctAnswers.length, correctAnswers.length + wrongAnswers.length, score);
        setGameState('results');
      } else {
        nextQuestion();
      }
    }, 1000);
  };

  const nextQuestion = () => {
    let nextIdx = qIndex + 1;
    // setProgress((nextIdx / questions.length) * 100); // Removed progress bar logic

    // INFINITE MODE LOGIC:
    // If we reach the end of the array, shuffle and start again (or just loop)
    // Since we append wrong/missed questions to the end, the array grows.
    // If we truly cleared everything, we might want to restart with full shuffle.
    // But basic infinite here means: keep going until lives run out.
    
    if (nextIdx >= questions.length) {
       // If all answered correctly and array ended (unlikely with retry logic unless perfect)
       // Let's reshuffle and restart index to keep it going "Infinite"
       const reShuffled = getMNQuestions(subject).map(q => ({
          ...q,
          options: [...q.options].sort(() => Math.random() - 0.5) 
       })).sort(() => Math.random() - 0.5); // Shuffle order too
       
       setQuestions(prev => [...prev, ...reShuffled]); // Append new batch
       // qIndex continues to increment
    }
    
    setQIndex(nextIdx);
    // Safety check if nextIdx is valid
    if (questions[nextIdx]) {
        setCurrentQ(questions[nextIdx]);
    } else {
        // Fallback if needed, though append logic above handles it
        // If we are here, we might need to set currentQ from the newly appended items
        // but react state update is async. For this simple logic, let's trust the effect or simple loop
    }
    
    // Actually, simpler infinite logic for this demo without complex pagination:
    // Just wrap around if we exceed length, but we want unique randomized experience.
    // The append logic above is fine.
    
    // We need to set currentQ from the updated state, which is tricky in one go.
    // Let's use a simpler approach: If nextIdx >= length, grab from start (modulo) but re-randomize options?
    // Or just rely on the re-queue logic.
    
    // Correct approach for infinite stream:
    // When near end, append more.
    if (nextIdx >= questions.length - 1) {
         const moreQuestions = getMNQuestions(subject).map(q => ({
            ...q,
            id: q.id + Date.now(), // Unique ID
            options: [...q.options].sort(() => Math.random() - 0.5) 
         }));
         setQuestions(prev => [...prev, ...moreQuestions]);
    }
    
    setCurrentQ(questions[nextIdx] || questions[0]); // Fallback
    setQY(-20);
    setDisabledOptions([]);
  };

  const useFreeze = () => {
    if (powerups.freeze <= 0 || frozen || gameState !== 'playing' || feedback.show) return;
    triggerHaptic(50);
    playSound(600, 'sine', 0.2, 0.5);
    setPowerups(prev => ({ ...prev, freeze: prev.freeze - 1 }));
    setFrozen(true);
    freezeTimerRef.current = setTimeout(() => setFrozen(false), 5000);
  };

  const useBomb = () => {
    if (powerups.bomb <= 0 || gameState !== 'playing' || feedback.show || !currentQ) return;
    triggerHaptic(50);
    playSound(400, 'square', 0.15, 0.2);
    setPowerups(prev => ({ ...prev, bomb: prev.bomb - 1 }));
    const wrongOptions = currentQ.options.filter(o => o !== currentQ.a);
    const toDisable = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 2);
    setDisabledOptions(toDisable);
  };

  useEffect(() => {
    if (!streak.active || gameState !== 'playing') return;
    streakTimerRef.current = setInterval(() => {
      setStreak(prev => {
        const newTime = prev.timeLeft - 50;
        if (newTime <= 0) {
          clearInterval(streakTimerRef.current);
          return { active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 50);
    return () => clearInterval(streakTimerRef.current);
  }, [streak.active, gameState]);

  const bg = isDark ? 'bg-slate-900' : 'bg-slate-50';
  const text = isDark ? 'text-white' : 'text-slate-800';
  const card = isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200';

  return (
    <div className={`min-h-[100dvh] w-full ${bg} overflow-hidden select-none ${shakeScreen === 1 ? 'animate-shake' : shakeScreen === 2 ? 'animate-hardShake' : ''}`} style={{ fontFamily: "'Cairo', sans-serif", fontWeight: '700', touchAction: 'none' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Nunito:wght@400;700;900&family=Tajawal:wght@400;700;900&display=swap');
        
        /* Animations */
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        @keyframes hardShake { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-10px,-10px); } 30% { transform: translate(10px,10px); } 50% { transform: translate(-10px,5px); } 70% { transform: translate(10px,-10px); } 90% { transform: translate(-5px,10px); } }
        @keyframes shakeQ { 0%, 100% { transform: translateX(-50%) scale(1); } 20% { transform: translateX(calc(-50% - 10px)) scale(1.02); } 40% { transform: translateX(calc(-50% + 10px)) scale(0.98); } 60% { transform: translateX(calc(-50% - 8px)) scale(1.01); } 80% { transform: translateX(calc(-50% + 8px)) scale(0.99); } }
        @keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes fire { 0%, 100% { transform: scale(1) rotate(-3deg); filter: brightness(1); } 50% { transform: scale(1.2) rotate(3deg); filter: brightness(1.3); } }
        @keyframes goldenPulse { 0%, 100% { box-shadow: 0 8px 0 #d97706, 0 0 30px rgba(251,191,36,0.5); } 50% { box-shadow: 0 8px 0 #d97706, 0 0 50px rgba(251,191,36,0.8), 0 0 80px rgba(251,191,36,0.4); } }
        @keyframes scoreUp { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -150%) scale(1.5); } }
        @keyframes spinProjectile { 0% { transform: translate(0,0) rotate(0deg); } 100% { transform: translate(var(--tx), var(--ty)) rotate(360deg) scale(0.5); } }
        @keyframes neonPulse { 0%, 100% { box-shadow: inset 0 0 20px rgba(236, 72, 153, 0.5); } 50% { box-shadow: inset 0 0 50px rgba(168, 85, 247, 0.8); } }
        
        /* Modal Animations */
        .animate-pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-fade-in { animation: fadeIn 0.2s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slide-down { animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); max-height: 0; } to { opacity: 1; transform: translateY(0); max-height: 300px; } }
        
        /* Utility */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .animate-shake { animation: shake 0.5s ease-out; }
        .animate-hardShake { animation: hardShake 0.4s ease-in-out; }
        .animate-shakeQ { animation: shakeQ 0.4s ease-out; }
        .animate-popIn { animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-fire { animation: fire 0.3s infinite; }
        .animate-scoreUp { animation: scoreUp 0.8s ease-out forwards; }
        .fever-mode { animation: neonPulse 1s infinite alternate; }
      `}</style>

      {/* Dynamic Background */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-300 ${isDark ? 'bg-slate-900' : 'bg-sky-50'} ${streak.active && streak.multiplier >= 5 ? 'fever-mode' : ''}`}>
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px)`, backgroundSize: '30px 30px' }}></div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div key={p.id} className="fixed pointer-events-none z-[500]" style={{
          left: p.x, top: p.y, width: p.size, height: p.size,
          backgroundColor: p.color, opacity: p.life,
          transform: `scale(${p.life}) rotate(${p.rotation}deg)`,
          borderRadius: p.type === 'coin' ? '50%' : '2px',
          boxShadow: p.type === 'coin' ? '0 0 10px #fbbf24' : 'none',
          border: p.type === 'coin' ? '2px solid #f59e0b' : 'none'
        }}>
            {p.type === 'coin' && <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-yellow-700">$</div>}
        </div>
      ))}

      {/* Score Popup */}
      {scorePopup && (
        <div className="fixed z-[400] pointer-events-none font-black text-4xl animate-scoreUp" style={{ left: scorePopup.x, top: scorePopup.y, transform: 'translate(-50%, -50%)' }}>
          <span className={scorePopup.streak ? 'text-orange-500' : 'text-emerald-500'} style={{ textShadow: '2px 2px 0px white, 0 0 20px currentColor' }}>
            +{scorePopup.points}
          </span>
        </div>
      )}

      {/* ============ MENU SCREEN ============ */}
      {gameState === 'menu' && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-4 ${card} relative overflow-hidden flex flex-col`}>
            
            {/* الخلفية المتحركة */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-3xl -top-10 -right-10 animate-pulse" />
              <div className="absolute w-32 h-32 bg-blue-400 rounded-full blur-3xl -bottom-10 -left-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              {/* الشعار والعنوان */}
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg animate-bounce">
                  <span className="text-4xl">🎮</span>
                </div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1" style={{ fontFamily: 'Nunito' }}>KHTMTHA</h1>
                <p className={`text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`} style={{ fontFamily: 'Tajawal' }}>
                  أجب قبل ما يوصل السؤال!
                </p>
              </div>

              {/* قائمة الشرح والقواعد */}
              <div className="space-y-2 mb-6 text-sm" style={{ fontFamily: 'Tajawal' }}>
                {[
                  { icon: '⚡', title: 'COMBO', desc: 'جاوب بالنصف العلوي!', color: 'from-amber-500/20 to-orange-500/20' },
                  { icon: '❄️', title: 'تجميد', desc: '5 ثواني توقف (2x)', color: 'from-cyan-100 to-cyan-50 border-cyan-200 text-cyan-600' }, // ICE BLUE
                  { icon: '💣', title: 'قنبلة', desc: 'احذف جوابين (1x)', color: 'from-red-100 to-rose-100 border-red-200 text-red-600' }, // RED
                  { icon: '⭐', title: 'XP', desc: 'عادي = 10 نقاط', color: 'from-yellow-100 to-amber-100 border-yellow-200 text-amber-600' }, // YELLOW
                  { icon: '💔', title: '10 أرواح ', desc: 'المرحلة لا نهائية!', color: 'from-blue-50 to-slate-50 border-blue-100 text-blue-500' }, // UPDATED TEXT
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r ${item.color}`}>
                    <span className="text-xl w-8 text-center">{item.icon}</span>
                    <div className="flex-1 text-right" dir="rtl">
                      <span className={`font-black ml-2`}>{item.title}</span>
                      <span className="opacity-80">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* زر ابدأ اللعب */}
              <button 
                onClick={startGame} 
                className="w-full py-4 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-green-400 to-emerald-500 shadow-xl border-b-[6px] border-emerald-600 active:border-b-0 active:translate-y-[6px] transition-all duration-75 relative overflow-hidden group mt-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2" style={{ fontFamily: 'Tajawal' }}>
                  <Play className="w-6 h-6 fill-white" /> ابدأ اللعب!
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-active:translate-y-0 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ GAME SCREEN ============ */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="h-[100dvh] flex flex-col relative z-10">
          
          {/* HEADER (HUD) */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 relative z-50 h-24">
            
            {/* Left: Pause & Fullscreen Buttons */}
            <div className="flex gap-2 shrink-0">
                <button 
                    onClick={() => setGameState('paused')} 
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center border-b-4 border-slate-200 dark:border-slate-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                    <Pause className="w-6 h-6 text-slate-700 dark:text-slate-200 fill-current" />
                </button>
                <button 
                    onClick={toggleFullScreen} 
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-md flex items-center justify-center border-b-4 border-slate-200 dark:border-slate-700 active:border-b-0 active:translate-y-1 transition-all"
                >
                    {isFullscreen ? <Minimize className="w-6 h-6 text-slate-700 dark:text-slate-200" /> : <Maximize className="w-6 h-6 text-slate-700 dark:text-slate-200" />}
                </button>
            </div>

            {/* Right: Score + Lives */}
            <div className="flex flex-col items-end gap-1 shrink-0">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-xl border-2 ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200'} shadow-sm`}>
                    <span className="text-yellow-500 text-xs font-black">XP</span>
                    <span className={`text-xl font-black ${text}`}>{score.toLocaleString()}</span>
                </div>
                {/* Lives (Single Heart with Number) */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 ${isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200'} shadow-sm`}>
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span className={`text-lg font-black ${text}`}>{lives}</span>
                </div>
            </div>
          </div>

                    {/* Game Area - منطقة نزول السؤال */}
          <div ref={gameAreaRef} className="flex-1 relative overflow-hidden">
            {/* Falling Question */}
            {currentQ && (
              <div
                ref={questionRef}
                className={`absolute left-1/2 -translate-x-1/2 w-[92%] max-w-md px-4 py-5 rounded-3xl text-center ${shakeQuestion ? 'animate-shakeQ' : ''} ${
                  frozen ? 'bg-cyan-500 border-cyan-300' :
                  currentQ.golden ? 'bg-amber-400 border-amber-200' :
                  (isDark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-200')
                } border-b-[6px] border-x-2 border-t-2`}
                style={{
                  top: qY,
                  boxShadow: '0 16px 32px -8px rgba(0,0,0,0.18)',
                  animation: currentQ.golden && !frozen ? 'goldenPulse 1.5s infinite' : undefined
                }}
              >
                <div className="absolute -top-3 left-0 right-0 flex justify-center gap-2">
                    {currentQ.golden && <span className="bg-yellow-100 text-yellow-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-yellow-300">GOLDEN ⭐</span>}
                    {frozen && <span className="bg-cyan-100 text-cyan-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-cyan-300 animate-pulse">FROZEN ❄️</span>}
                </div>
                <p className={`text-base sm:text-lg font-black leading-snug ${frozen ? 'text-white' : currentQ.golden ? 'text-amber-900' : text}`}>
                  {currentQ.q}
                </p>
              </div>
            )}
          </div>

          {/* 🔥 شعلة الكومبو — floating على يسار الشاشة، وسط عمودي */}
          {showComboFire && (
            <div className="fixed left-3 top-1/2 -translate-y-1/2 z-[200] animate-pop-in pointer-events-none">
              <div className="flex items-center gap-1 bg-orange-500/90 border-2 border-orange-300 px-3 py-2 rounded-2xl shadow-xl shadow-orange-500/40">
                <span className="text-3xl leading-none">🔥</span>
                <div className="flex flex-col items-start leading-none">
                  {combo >= 2 && <span className="text-white font-black text-xl leading-tight">{combo}x</span>}
                  {streak.active && <span className="text-orange-100 font-bold text-xs">كومبو!</span>}
                </div>
              </div>
            </div>
          )}

          {/* الجزء السفلي: باور آبس + أزرار */}
          <div className={`rounded-t-[2rem] border-t backdrop-blur-md ${isDark ? 'bg-slate-800/50 border-white/5' : 'bg-white/60 border-slate-200/60'}`}>
            {/* الباور آبس في الوسط */}
            <div className="flex items-center justify-center gap-3 px-4 pt-3 pb-1">
              <button onClick={useFreeze} disabled={powerups.freeze <= 0 || frozen}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 transition-all active:scale-90 ${powerups.freeze <= 0 || frozen ? 'opacity-30 grayscale' : ''} ${isDark ? 'bg-slate-700/80 border-slate-600' : 'bg-white/80 border-slate-200'}`}>
                ❄️
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">{powerups.freeze}</span>
              </button>
              <button onClick={useBomb} disabled={powerups.bomb <= 0}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md border-2 transition-all active:scale-90 ${powerups.bomb <= 0 ? 'opacity-30 grayscale' : ''} ${isDark ? 'bg-slate-700/80 border-slate-600' : 'bg-white/80 border-slate-200'}`}>
                💣
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border border-white">{powerups.bomb}</span>
              </button>
            </div>

            {/* أزرار الإجابة — خلفية بلور */}
            <div className="grid grid-cols-2 gap-2.5 px-3 pb-6 max-w-md mx-auto" style={{paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))'}}>
              {currentQ?.options.map((opt, idx) => {
                const isDisabled = disabledOptions.includes(opt);
                const isFlying = flyingBtn?.index === idx;
                return (
                  <button
                    key={idx}
                    ref={el => optionRefs.current[idx] = el}
                    onClick={() => !isDisabled && handleAnswer(opt, idx)}
                    disabled={isDisabled || feedback.show || flyingBtn !== null}
                    className={`relative py-4 px-2 rounded-2xl font-black text-base tracking-wide transition-all border-b-[5px] active:border-b-0 active:translate-y-[5px] active:scale-95 duration-75 backdrop-blur-sm ${
                      isFlying ? 'opacity-0' :
                      isDisabled
                        ? 'opacity-30 grayscale pointer-events-none scale-90'
                        : isDark
                          ? 'bg-slate-700/70 text-white border-slate-900 shadow-slate-900/50'
                          : 'bg-white/70 text-slate-800 border-slate-300/80 shadow-slate-200'
                    } shadow-lg`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flying Button Animation */}
          {flyingBtn && (
            <div
              className={`fixed z-[300] rounded-2xl font-black text-lg flex items-center justify-center border-4 ${
                flyingBtn.correct 
                  ? 'bg-emerald-500 text-white border-emerald-600' 
                  : 'bg-rose-500 text-white border-rose-600'
              }`}
              style={{
                left: flyingBtn.startX,
                top: flyingBtn.startY,
                width: flyingBtn.startW,
                height: flyingBtn.startH,
                '--tx': `${flyingBtn.targetX - flyingBtn.startX}px`,
                '--ty': `${flyingBtn.targetY - flyingBtn.startY}px`,
                animation: 'spinProjectile 0.35s ease-in forwards',
                boxShadow: '0 0 40px rgba(0,0,0,0.3)'
              }}
            >
              {flyingBtn.text}
            </div>
          )}
        </div>
      )}

      {/* ============ PAUSE MENU MODAL (Using the New Component) ============ */}
      <MonsterPauseMenuModal 
        isOpen={gameState === 'paused'}
        onClose={() => setGameState('playing')}
        onResume={() => setGameState('playing')}
        onExit={() => { if (onExit) onExit(); else setGameState('menu'); }}
        currentSpeedMode={speedMode}
        setSpeedMode={setSpeedMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* ============ RESULTS SCREEN ============ */}
      {gameState === 'results' && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-popIn">
            <div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-2 ${card}`}>
                <div className="text-center mb-6">
                    <span className="text-6xl block mb-2">{score > 50 ? '👑' : '😎'}</span>
                    <h2 className={`text-3xl font-black ${text}`} style={{ fontFamily: "'Cairo', sans-serif" }}>النتيجة النهائية</h2>
                </div>
                
                {/* Total Score */}
                <div className="bg-slate-200 p-6 rounded-2xl mb-6 text-center shadow-inner">
                    <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Total Score</span>
                    <div className="text-6xl font-black text-slate-800 mt-2">{score}</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-green-100 p-3 rounded-xl text-center border-2 border-green-200">
                        <span className="block text-xs font-bold text-green-700 mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>إجابات صحيحة</span>
                        <span className="text-3xl font-black text-green-600">{correctAnswers.length}</span>
                    </div>
                    <div className="bg-red-100 p-3 rounded-xl text-center border-2 border-red-200">
                        <span className="block text-xs font-bold text-red-700 mb-1" style={{ fontFamily: "'Cairo', sans-serif" }}>إجابات خاطئة</span>
                        <span className="text-3xl font-black text-red-600">{wrongAnswers.length}</span>
                    </div>
                </div>

                {/* Error Review with Explanation */}
                {wrongAnswers.length > 0 && (
                    <div className="mb-4 max-h-40 overflow-y-auto bg-white rounded-xl p-3 border border-slate-200">
                        <h3 className="font-bold text-red-500 mb-2 text-base text-right font-black" style={{ fontFamily: "'Cairo', sans-serif" }}>الأخطاء ({wrongAnswers.length})</h3>
                        {wrongAnswers.map((item, i) => (
                            <div key={i} className="text-right text-sm border-b border-slate-100 last:border-0 py-3">
                                <p className="font-black mb-1 text-slate-800 text-base">{item.question.q}</p>
                                <div className="flex justify-end gap-2 mb-1">
                                    <span className="text-green-600 font-black text-sm bg-green-100 px-2 py-0.5 rounded">{item.question.a} ✓</span>
                                    <span className="text-red-500 font-bold line-through opacity-70">{item.userAnswer || 'وقت'}</span>
                                </div>
                                <p className="text-slate-600 italic bg-slate-50 p-2 rounded font-bold text-xs" style={{ fontFamily: "'Cairo', sans-serif" }}>💡 {item.question.explanation || 'لا يوجد شرح متاح.'}</p>
                            </div>
                        ))}
                    </div>
                )}
                
                <button onClick={startGame} className="w-full py-4 rounded-xl font-black text-xl text-white bg-emerald-500 shadow-lg shadow-emerald-500/30 mb-3 hover:scale-105 transition-transform" style={{ fontFamily: "'Cairo', sans-serif" }}>إعادة المرحلة</button>
                <button onClick={() => { if (onExit) onExit(); else setGameState('menu'); }} className={`w-full py-4 rounded-xl font-bold transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`} style={{ fontFamily: "'Cairo', sans-serif" }}>العودة</button>
            </div>
         </div>
      )}

      {/* ============ FEEDBACK OVERLAY ============ */}
      {feedback.show && (
        <div className="fixed inset-0 flex items-center justify-center z-[400] pointer-events-none px-4">
          <div className={`
            relative
            transform transition-all duration-300
            scale-100 md:scale-125 lg:scale-150 /* Responsive scaling */
            p-6 md:p-8 /* Responsive padding */
            rounded-[2rem] md:rounded-[3rem] 
            shadow-2xl text-center border-4 md:border-8 
            animate-popIn 
            max-w-[90vw] /* Prevent overflow width */
            ${
            feedback.correct 
              ? 'bg-emerald-500 border-white text-white rotate-2 md:rotate-3'
              : 'bg-rose-500 border-white text-white -rotate-2 md:-rotate-3'
          }`}>
            <div className="text-6xl md:text-8xl mb-2 md:mb-4 drop-shadow-md"> {/* Responsive emoji size */}
              {feedback.correct ? '🤩' : '😱'}
            </div>
            <p className="text-xl md:text-3xl font-black whitespace-pre-line drop-shadow-md leading-tight" style={{ fontFamily: "'Cairo', sans-serif" }}>
              {feedback.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}