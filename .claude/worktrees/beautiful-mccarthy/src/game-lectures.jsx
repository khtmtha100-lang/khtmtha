import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Pause, Volume2, VolumeX, Moon, Sun, Play, RotateCcw, Home, Maximize, Minimize,
  LogOut, Zap, Skull, Baby, Footprints, ChevronDown, X, Settings, Gauge, Ghost
} from 'lucide-react';
import { TactileButton } from './components/AuthAndProfile';

// =================================================================
// 🛠️ مكونات التصميم (UI Components)
// =================================================================

const triggerHaptic = (duration = 15) => { 
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(duration); 
  }
};

// زر بتصميم ملموس (Tactile)
const TactileButtonLocal = ({ children, onClick, className, colorClass, borderClass, shadowColor = "", disabled, activeScale = true }) => {
  return (
    <button 
      disabled={disabled}
      onClick={(e) => { triggerHaptic(); if(onClick) onClick(e); }}
      className={`
        relative group transition-all duration-150 ease-out
        border-2 border-b-[6px] 
        ${activeScale ? 'active:border-b-2 active:translate-y-[4px] active:scale-[0.98]' : ''}
        rounded-[20px] flex items-center justify-center
        ${disabled ? 'opacity-80 pointer-events-none' : ''}
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

// قائمة التوقف الجديدة
const PauseMenuModal = ({ isOpen, onClose, onResume, onExit, currentSpeedMode, setSpeedMode, isMuted, setIsMuted, isDark, setIsDark }) => {
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
            <TactileButtonLocal 
                onClick={onResume}
                className="w-full py-4 rounded-2xl gap-3 text-lg shrink-0"
                colorClass="bg-yellow-400"
                borderClass="border-yellow-600"
            >
                <Play className="w-6 h-6 fill-current text-yellow-900" />
                <span className="font-black text-yellow-900">استئناف اللعب</span>
            </TactileButtonLocal>

            <div className="h-px bg-slate-300 dark:bg-slate-600 my-2"></div>

            <div className="px-2">
                <p className="text-xs font-bold text-slate-500 mb-3 uppercase">إعدادات السرعة</p>
                <div className="space-y-2">
                    {Object.values(speeds).map((speed) => (
                        <button
                            key={speed.id}
                            onClick={() => { setSpeedMode(speed.id); setSpeedOpen(false); triggerHaptic(30); }}
                            className={`w-full p-3 rounded-2xl text-left transition-all border-2 ${
                                currentSpeedMode === speed.id 
                                    ? `${speed.color} border-current font-black shadow-lg` 
                                    : `bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300`
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-bold">{speed.label}</span>
                                {currentSpeedMode === speed.id && <Zap className="w-4 h-4" />}
                            </div>
                            <span className="text-xs opacity-75">{speed.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-px bg-slate-300 dark:bg-slate-600 my-2"></div>

            <div className="grid grid-cols-2 gap-2 px-2">
                <button
                    onClick={() => { setIsMuted(!isMuted); triggerHaptic(30); }}
                    className={`p-3 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2 ${
                        !isMuted 
                            ? 'bg-blue-100 border-blue-300 text-blue-600' 
                            : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                    }`}
                >
                    {!isMuted ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    {!isMuted ? 'مفتوح' : 'مغلق'}
                </button>

                <button
                    onClick={() => { setIsDark(!isDark); triggerHaptic(30); }}
                    className={`p-3 rounded-xl font-bold text-sm transition-all border-2 flex items-center justify-center gap-2 ${
                        isDark 
                            ? 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400' 
                            : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                    }`}
                >
                    {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    {isDark ? 'ليلي' : 'نهاري'}
                </button>
            </div>

            <TactileButtonLocal 
                onClick={onExit}
                className="w-full py-3 rounded-2xl gap-2 mt-2 shrink-0"
                colorClass="bg-red-500"
                borderClass="border-red-700"
            >
                <Home className="w-5 h-5 text-white" />
                <span className="font-black text-white">العودة للرئيسية</span>
            </TactileButtonLocal>
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 📝 منطقة تعديل النصوص والرسائل
// =================================================================
const MESSAGES = {
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
  // رسائل خاصة لآخر 3 أسئلة (نسخة 3 أرواح)
  finalCountdown: {
    3: "يلا يا وحش 💪 باقيلك 3 بس!",
    2: "ركز أبو جاسم 😎 بعد سؤالين وتخلص!",
    1: "هاي الأخيرة 🔥 لا تضيّعها!"
  },
  streak: ["🔥🔥 ON FIRE!", "⚡ UNSTOPPABLE!", "💪 GODLIKE!", "🌟 LEGEND!"]
};

// Sample Questions with Explanation
const QUESTIONS = [
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
    q: "She ______ glasses before.", 
    options: ["wear", "used to wear", "wears", "wearing"], 
    a: "used to wear", 
    explanation: "نستخدم 'used to' للتعبير عن عادة في الماضي لم تعد موجودة.",
    golden: true 
  },
  { 
    id: 3, 
    q: "How ______ exercise does he take?", 
    options: ["many", "much", "more", "most"], 
    a: "much", 
    explanation: "كلمة 'exercise' هنا غير معدودة (uncountable)، فنستخدم 'much'.",
    golden: false 
  },
  { 
    id: 4, 
    q: "If I ______ you, I would study.", 
    options: ["am", "was", "were", "be"], 
    a: "were", 
    explanation: "في الحالة الشرطية الثانية للنصيحة، نستخدم 'If I were you'.",
    golden: true 
  },
  { 
    id: 5, 
    q: "The story was ______ written.", 
    options: ["beautiful", "beautifully", "beauty", "beautify"], 
    a: "beautifully", 
    explanation: "نحتاج لظرف (Adverb) لوصف الفعل 'written'، لذا نختار 'beautifully'.",
    golden: false 
  },
];

export default function GameLectures({ onExit }) {
  const [gameState, setGameState] = useState('menu');
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Game Data
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3); // 3 LIVES FOR CLASSIC MODE
  const [combo, setCombo] = useState(0);
  const [streak, setStreak] = useState({ active: false, multiplier: 1, timeLeft: 0, maxTime: 5000 });
  const [powerups, setPowerups] = useState({ freeze: 2, bomb: 1 });
  const [frozen, setFrozen] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Settings
  const [speedMode, setSpeedMode] = useState('teen');
  
  // Question State
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [qY, setQY] = useState(100);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(new Set());
  
  // Animation States
  const [flyingBtn, setFlyingBtn] = useState(null);
  const [shakeScreen, setShakeScreen] = useState(0); 
  const [shakeQuestion, setShakeQuestion] = useState(false);
  const [showComboFire, setShowComboFire] = useState(false);
  const [particles, setParticles] = useState([]);
  const [scorePopup, setScorePopup] = useState(null);
  
  // Results
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  
  // Feedback
  const [feedback, setFeedback] = useState({ show: false, correct: false, message: '' });
  const [pauseOpen, setPauseOpen] = useState(false);
  
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

  // Initialize Game
  const startGame = () => {
    initAudio(); // Initialize audio context on first interaction
    const preparedQuestions = QUESTIONS.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5) 
    }));

    setQuestions(preparedQuestions);
    setCurrentQ(preparedQuestions[0]);
    setQIndex(0);
    setQY(100);
    setScore(0);
    setLives(3); // 3 LIVES FOR CLASSIC MODE
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

  // Game Loop
  useEffect(() => {
    if (gameState !== 'playing' || feedback.show || frozen) return;
    
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;

      setQY(prev => {
        // Speed Mapping
        const speedMap = { 'baby': 0.3, 'teen': 0.5, 'beast': 0.8 };
        const currentBaseSpeed = speedMap[speedMode] || 0.5;

        const currentSpeed = currentBaseSpeed * 1.5; 
        const speedMultiplier = streak.active ? 1 + (streak.multiplier * 0.05) : 1;
        const newY = prev + (currentSpeed * speedMultiplier * dt);
        const gameH = gameAreaRef.current?.offsetHeight || 600;
        
        if (newY > gameH + 100) {
          handleMiss();
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
          vy: p.vy + 0.3,
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
    const headerOffset = 100;
    return qY < (gameH / 2) + headerOffset; 
  };

  const handleAnswer = (answer, btnIndex) => {
    if (gameState !== 'playing' || feedback.show || !currentQ || flyingBtn !== null) return;
    
    initAudio(); 
    
    const isCorrect = answer === currentQ.a;
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
          finalPoints *= 2;
        } else {
          finalPoints *= 1.5;
        }

        playCorrectSound(currentMult);
        setScore(prev => prev + finalPoints);
        setCombo(prev => prev + 1);
        setCorrectAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        setAnsweredCorrectly(prev => new Set([...prev, currentQ.id]));
        
        setShakeQuestion(true);
        if (qRect) {
          spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'coin', 12);
        }
        
        if (currentMult >= 2) setShowComboFire(true);
        
        // --- 🤖 Feedback Message Logic (CLASSIC MODE - 3 LIVES) ---
        let msg = "";
        const remainingQuestions = questions.length - 1 - qIndex;
        
        // FINAL COUNTDOWN MESSAGES
        if (remainingQuestions === 2) { 
             msg = MESSAGES.finalCountdown[3];
        } else if (remainingQuestions === 1) { 
             msg = MESSAGES.finalCountdown[2];
        } else if (remainingQuestions === 0) { 
             msg = MESSAGES.finalCountdown[1];
        } else if (currentMult >= 5) {
             msg = MESSAGES.streak[Math.floor(Math.random() * MESSAGES.streak.length)];
        } else {
             msg = MESSAGES.correct[Math.floor(Math.random() * MESSAGES.correct.length)];
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
        
        setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: answer }]);
        if (qRect) spawnParticles(qRect.left + qRect.width / 2, qRect.top + qRect.height / 2, 'confetti', 20);
        
        const msg = MESSAGES.wrong[Math.floor(Math.random() * MESSAGES.wrong.length)];
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
    
    setWrongAnswers(prev => [...prev, { question: currentQ, userAnswer: null }]);
    showFeedbackModal(false, "⏰ خلص الوقت!");
    setTimeout(() => setShakeScreen(0), 500);
  };

  const showFeedbackModal = (correct, message) => {
    setFeedback({ show: true, correct, message });
    setTimeout(() => {
      setFeedback({ show: false, correct: false, message: '' });
      if (lives <= 1 && !correct) {
        setGameState('results');
      } else {
        nextQuestion();
      }
    }, 1000);
  };

  const nextQuestion = () => {
    const nextIdx = qIndex + 1;
    setProgress((nextIdx / questions.length) * 100);
    if (nextIdx >= questions.length) {
      setGameState('results');
    } else {
      setQIndex(nextIdx);
      setCurrentQ(questions[nextIdx]);
      setQY(100);
      setDisabledOptions([]);
    }
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
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-6px); } 80% { transform: translateX(6px); } }
        @keyframes hardShake { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-10px,-10px); } 30% { transform: translate(10px,10px); } 50% { transform: translate(-10px,5px); } 70% { transform: translate(10px,-10px); } 90% { transform: translate(-5px,10px); } }
        @keyframes shakeQ { 0%, 100% { transform: translateX(-50%) scale(1); } 20% { transform: translateX(calc(-50% - 10px)) scale(1.02); } 40% { transform: translateX(calc(-50% + 10px)) scale(0.98); } 60% { transform: translateX(calc(-50% - 8px)) scale(1.01); } 80% { transform: translateX(calc(-50% + 8px)) scale(0.99); } }
        @keyframes popIn { 0% { transform: scale(0) rotate(-10deg); opacity: 0; } 50% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes neonPulse { 0% { box-shadow: 0 0 10px #60a5fa, 0 0 20px #3b82f6; } 100% { box-shadow: 0 0 20px #0ea5e9, 0 0 40px #0284c7; } }
        .animate-shake { animation: shake 0.5s; }
        .animate-hardShake { animation: hardShake 0.6s; }
        .animate-shakeQ { animation: shakeQ 0.4s; }
        .animate-popIn { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .fever-mode { animation: neonPulse 1s infinite alternate; }
      `}</style>

      {/* Dynamic Background */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-300 ${isDark ? 'bg-slate-900' : 'bg-sky-50'} ${streak.active && streak.multiplier >= 5 ? 'fever-mode' : ''}`}>
         <div className={`absolute inset-0 opacity-5 ${isDark ? 'bg-slate-800' : 'bg-blue-100'}`}></div>
      </div>

      {/* Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="fixed pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.type === 'coin' ? '50%' : '4px',
            opacity: p.life,
            transform: `translate(-50%, -50%) rotate(${p.rotation || 0}deg)`,
            boxShadow: p.type === 'coin' ? `0 0 10px ${p.color}` : 'none',
          }}
        />
      ))}

      {/* ============ MENU SCREEN ============ */}
      {gameState === 'menu' && (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
          <div className="mb-8">
            <Ghost className="w-24 h-24 text-blue-500 mx-auto mb-4 animate-bounce" />
            <h1 className={`text-5xl font-black mb-2 ${text}`}>الفصول والمراجعات</h1>
            <p className={`text-lg ${text} opacity-70`}>3 أرواح - تحدي كلاسيكي 📖</p>
          </div>
          
          <TactileButton
            onClick={startGame}
            className="px-12 py-4 rounded-2xl gap-3 mb-6"
            colorClass="bg-blue-500"
            borderClass="border-blue-700"
          >
            <Play className="w-6 h-6 text-white" />
            <span className="text-xl font-black text-white">ابدأ اللعب</span>
          </TactileButton>

          <TactileButton
            onClick={onExit}
            className="px-8 py-3 rounded-xl"
            colorClass="bg-slate-400"
            borderClass="border-slate-600"
          >
            <span className="font-bold text-white">رجوع</span>
          </TactileButton>
        </div>
      )}

      {/* ============ GAME SCREEN ============ */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="h-full w-full flex flex-col">
          {/* Header */}
          <div className={`${card} border-b-2 p-4 flex items-center justify-between`}>
            <div className="text-left">
              <div className={`text-sm font-bold opacity-60 ${text}`}>الأرواح</div>
              <div className="flex gap-1">
                {Array(3).fill(0).map((_, i) => (
                  <span key={i} className={`w-3 h-3 rounded-full ${i < lives ? 'bg-red-500' : 'bg-slate-300'}`}></span>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black ${text}`}>{score}</div>
              <div className={`text-xs font-bold opacity-60 ${text}`}>النقاط</div>
              <div className="w-24 h-2 bg-slate-300 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <TactileButtonLocal
              onClick={() => setPauseOpen(!pauseOpen)}
              className="w-12 h-12 rounded-xl"
              colorClass={card}
              borderClass="border-slate-400"
            >
              <Pause className={`w-6 h-6 ${text}`} />
            </TactileButtonLocal>
          </div>

          {/* Game Area */}
          <div ref={gameAreaRef} className={`flex-1 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-sky-50'}`}>
            {/* Question */}
            {currentQ && (
              <div
                ref={questionRef}
                className={`absolute top-10 left-1/2 -translate-x-1/2 w-4/5 max-w-sm p-4 rounded-2xl border-4 ${card} shadow-xl ${shakeQuestion ? 'animate-shakeQ' : ''}`}
                style={{ transform: `translateX(-50%) translateY(${qY}px)` }}
              >
                <p className={`text-lg font-black text-center ${text} mb-4`}>{currentQ.q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {currentQ.options.map((opt, idx) => (
                    <TactileButton
                      key={idx}
                      ref={(el) => (optionRefs.current[idx] = el)}
                      onClick={() => handleAnswer(opt, idx)}
                      disabled={disabledOptions.includes(opt)}
                      className={`p-3 text-sm font-bold rounded-xl ${disabledOptions.includes(opt) ? 'opacity-30' : ''}`}
                      colorClass={disabledOptions.includes(opt) ? 'bg-slate-300' : 'bg-blue-500'}
                      borderClass={disabledOptions.includes(opt) ? 'border-slate-400' : 'border-blue-700'}
                    >
                      {opt}
                    </TactileButton>
                  ))}
                </div>
              </div>
            )}

            {/* Powerups */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-3">
              <TactileButtonLocal
                onClick={useFreeze}
                disabled={powerups.freeze <= 0}
                className="flex-1 py-3 rounded-xl gap-2"
                colorClass={powerups.freeze > 0 ? 'bg-cyan-500' : 'bg-slate-300'}
                borderClass={powerups.freeze > 0 ? 'border-cyan-700' : 'border-slate-400'}
              >
                <span className={`text-xl font-black ${powerups.freeze > 0 ? 'text-white' : 'text-slate-500'}`}>❄️ {powerups.freeze}</span>
              </TactileButtonLocal>

              <TactileButtonLocal
                onClick={useBomb}
                disabled={powerups.bomb <= 0}
                className="flex-1 py-3 rounded-xl gap-2"
                colorClass={powerups.bomb > 0 ? 'bg-amber-500' : 'bg-slate-300'}
                borderClass={powerups.bomb > 0 ? 'border-amber-700' : 'border-slate-400'}
              >
                <span className={`text-xl font-black ${powerups.bomb > 0 ? 'text-white' : 'text-slate-500'}`}>💣 {powerups.bomb}</span>
              </TactileButtonLocal>
            </div>
          </div>
        </div>
      )}

      {/* ============ PAUSE MENU MODAL ============ */}
      <PauseMenuModal 
        isOpen={pauseOpen}
        onClose={() => setPauseOpen(false)}
        onResume={() => setPauseOpen(false)}
        onExit={onExit}
        currentSpeedMode={speedMode}
        setSpeedMode={setSpeedMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* ============ RESULTS SCREEN ============ */}
      {gameState === 'results' && (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
          <Ghost className="w-24 h-24 text-blue-500 mb-4" />
          <h2 className={`text-4xl font-black mb-2 ${text}`}>انتهت اللعبة!</h2>
          <p className={`text-2xl font-bold mb-6 ${text}`}>إجمالي النقاط: {score}</p>
          
          <div className={`${card} rounded-2xl p-6 w-full max-w-sm mb-6`}>
            <p className={`text-sm font-bold opacity-60 mb-2 ${text}`}>الإجابات الصحيحة: {correctAnswers.length}</p>
            <p className={`text-sm font-bold opacity-60 mb-4 ${text}`}>الإجابات الخاطئة: {wrongAnswers.length}</p>
          </div>

          <TactileButton
            onClick={startGame}
            className="px-8 py-3 rounded-xl gap-2 mb-4"
            colorClass="bg-green-500"
            borderClass="border-green-700"
          >
            <span className="font-black text-white">العب مجدداً</span>
          </TactileButton>

          <TactileButton
            onClick={onExit}
            className="px-8 py-3 rounded-xl"
            colorClass="bg-slate-400"
            borderClass="border-slate-600"
          >
            <span className="font-bold text-white">رجوع للرئيسية</span>
          </TactileButton>
        </div>
      )}

      {/* ============ FEEDBACK OVERLAY ============ */}
      {feedback.show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none">
          <div className={`text-5xl font-black mb-4 animate-popIn ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}>
            {feedback.correct ? '✅' : '❌'}
          </div>
          <div className={`text-2xl font-black text-center ${feedback.correct ? 'text-green-500' : 'text-red-500'}`}>
            {feedback.message}
          </div>
        </div>
      )}
    </div>
  );
}
