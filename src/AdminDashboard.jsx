import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';

// ─── مخططات SVG خالصة ────────────────────────────────────────

// مخطط دائري (Donut)
const PieChart = ({ data, size = 200 }) => {
  const [hov, setHov] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div className="text-center text-slate-500 text-sm py-8">لا توجد بيانات</div>;
  const cx = size / 2, cy = size / 2, r = size * 0.38, inner = size * 0.22;
  let angle = -Math.PI / 2;
  const slices = data.map((d, idx) => {
    const a = (d.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    angle += a;
    const x2 = cx + r * Math.cos(angle), y2 = cy + r * Math.sin(angle);
    const xi1 = cx + inner * Math.cos(angle - a), yi1 = cy + inner * Math.sin(angle - a);
    const xi2 = cx + inner * Math.cos(angle), yi2 = cy + inner * Math.sin(angle);
    const large = a > Math.PI ? 1 : 0;
    const pct = Math.round((d.value / total) * 100);
    return { path: `M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2} L${xi2},${yi2} A${inner},${inner},0,${large},0,${xi1},${yi1} Z`, color: d.color, label: d.label, pct, value: d.value, idx };
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={size} height={size}>
          {slices.map((s) => (
            <path key={s.idx} d={s.path} fill={s.color} stroke="#0f172a" strokeWidth="2"
              style={{ transform: hov === s.idx ? `scale(1.05) translate(-${cx*0.025}px,-${cy*0.025}px)` : 'scale(1)', transformOrigin: `${cx}px ${cy}px`, transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={() => setHov(s.idx)} onMouseLeave={() => setHov(null)} />
          ))}
          {hov !== null && (
            <text x={cx} y={cy - 8} textAnchor="middle" fontSize="20" fontWeight="900" fill="white">{slices[hov]?.pct}%</text>
          )}
          {hov !== null && (
            <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#94a3b8">{slices[hov]?.label}</text>
          )}
          {hov === null && <text x={cx} y={cy + 5} textAnchor="middle" fontSize="11" fill="#64748b">المجموع: {total}</text>}
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-2 px-2">
        {slices.map((s) => (
          <div key={s.idx} className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }}></span>
            <span>{s.label}</span>
            <span className="text-slate-500">({s.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// مخطط كيرفات (Line Chart)
const LineChart = ({ data, width = 320, height = 160, color = '#6366f1', label = '' }) => {
  const [hov, setHov] = useState(null);
  if (!data || data.length < 2) return <div className="text-center text-slate-500 text-sm py-8">بيانات غير كافية</div>;
  const pad = { t: 20, r: 20, b: 36, l: 44 };
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b;
  const maxV = Math.max(...data.map(d => d.value), 1);
  const pts = data.map((d, i) => ({ x: pad.l + (i / (data.length - 1)) * W, y: pad.t + H - (d.value / maxV) * H, ...d }));
  const poly = pts.map(p => `${p.x},${p.y}`).join(' ');
  const area = `M${pts[0].x},${pad.t + H} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length-1].x},${pad.t+H} Z`;
  const gradId = `lg_${label.replace(/\s/g,'')}`;
  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible w-full" viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* شبكة أفقية */}
        {[0, 0.25, 0.5, 0.75, 1].map(f => (
          <line key={f} x1={pad.l} x2={pad.l + W} y1={pad.t + H - f * H} y2={pad.t + H - f * H} stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />
        ))}
        <path d={area} fill={`url(#${gradId})`} />
        <polyline points={poly} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={hov === i ? 7 : 4.5} fill={color} stroke="#0f172a" strokeWidth="2"
              style={{ cursor: 'pointer', transition: 'r 0.15s' }}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} />
            {hov === i && (
              <g>
                <rect x={p.x - 28} y={p.y - 32} width="56" height="22" rx="6" fill="#1e293b" />
                <text x={p.x} y={p.y - 16} textAnchor="middle" fontSize="11" fontWeight="900" fill="white">{p.value}</text>
              </g>
            )}
            <text x={p.x} y={pad.t + H + 16} textAnchor="middle" fontSize="9" fill="#64748b">{p.label}</text>
          </g>
        ))}
        {[0, 0.5, 1].map(f => (
          <text key={f} x={pad.l - 8} y={pad.t + H - f * H + 4} textAnchor="end" fontSize="9" fill="#64748b">{Math.round(maxV * f)}</text>
        ))}
      </svg>
    </div>
  );
};

// مخطط أعمدة (Bar Chart)
const BarChart = ({ data, color = '#8b5cf6', showValues = true }) => {
  const [hov, setHov] = useState(null);
  if (!data || data.length === 0) return <div className="text-center text-slate-500 text-sm py-8">لا توجد بيانات</div>;
  const maxV = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-36 px-1">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative"
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
          {showValues && hov === i && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-black px-2 py-1 rounded-lg whitespace-nowrap z-10 border border-slate-600">
              {d.value}
            </div>
          )}
          <div className="w-full rounded-t-lg transition-all duration-300"
            style={{ height: `${Math.max((d.value / maxV) * 100, 2)}%`, background: hov === i ? '#f59e0b' : (d.color || color), minHeight: 4 }} />
          <span className="text-[9px] font-bold text-slate-500 mt-1.5 text-center leading-tight w-full">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// بطاقة إحصائية
const StatCard = ({ label, value, sub, color = 'text-yellow-400', icon = '' }) => (
  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 flex flex-col gap-1">
    <div className="flex items-center gap-1.5">
      {icon && <span className="text-base">{icon}</span>}
      <span className="text-slate-400 text-xs font-bold">{label}</span>
    </div>
    <span className={`text-3xl font-black ${color} leading-none mt-1`}>{value ?? '—'}</span>
    {sub && <span className="text-slate-500 text-xs mt-0.5">{sub}</span>}
  </div>
);

// ─── الداشبورد الرئيسي ────────────────────────────────────────

export default function AdminDashboard({ onBack }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CORRECT_PIN = '0773913';
  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];

  const handleKey = (k) => {
    if (k === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 7) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 7) {
      if (next === CORRECT_PIN) {
        setUnlocked(true);
      } else {
        setShake(true);
        setTimeout(() => { setShake(false); setPin(''); }, 700);
      }
    }
  };

  useEffect(() => {
    if (unlocked && !stats) loadStats();
  }, [unlocked]);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // نستخدم analytics views الجاهزة + queries محددة
      const [
        { data: summary },
        { data: bySubject },
        { data: byMode },
        { data: allUsers },
        { count: totalGuests },
        { data: sessions },
        { data: stageRows },
        { data: wrongRows },
        { data: dailyLogins },
      ] = await Promise.all([
        supabase.from('analytics_summary').select('*').limit(1),
        supabase.from('analytics_by_subject').select('*'),
        supabase.from('analytics_by_game_mode').select('*'),
        supabase.from('users').select('login_count, total_xp, current_streak, gender, age, region, created_at, last_login, preferred_subject, total_play_time, total_correct_answers, total_questions_answered, total_wrong_answers'),
        supabase.from('guest_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('game_sessions').select('subject, question_type, game_mode, accuracy, score, questions_correct, questions_total, questions_wrong, won, duration_seconds, created_at'),
        supabase.from('stage_progress').select('stars, stage_number'),
        supabase.from('wrong_answers_inventory').select('times_wrong'),
        supabase.from('daily_active_users').select('date, count').order('date', { ascending: true }).limit(14),
      ]);

      const sum = summary?.[0] || {};
      const users = allUsers || [];
      const sess = sessions || [];
      const stages = stageRows || [];

      const reg = sum.total_users || users.length || 0;
      const now = new Date();

      // ── متوسطات من analytics_summary (جاهزة)
      const avgAge = sum.avg_age ? Math.round(sum.avg_age) : null;
      const avgSessionSec = sum.avg_session_seconds || 0;
      const avgPlayTime = Math.round(avgSessionSec / 60);

      // ── من users مباشرة
      const avgXp = reg > 0 ? Math.round(users.reduce((s, u) => s + (u.total_xp || 0), 0) / reg) : 0;
      const avgStreak = reg > 0 ? (users.reduce((s, u) => s + (u.current_streak || 0), 0) / reg).toFixed(1) : 0;
      const avgLogins = reg > 0 ? (users.reduce((s, u) => s + (u.login_count || 0), 0) / reg).toFixed(1) : 0;

      // ── النشطون آخر 7 أيام
      const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
      const activeUsers7d = users.filter(u => u.last_login && u.last_login >= sevenDaysAgo).length;

      // ── معدل العودة (login_count / أيام منذ التسجيل × 100)
      const avgDailyReturn = reg > 0 ? (users.reduce((s, u) => {
        if (!u.created_at || !u.login_count) return s;
        const daysSince = Math.max(1, Math.round((now - new Date(u.created_at)) / (1000*60*60*24)));
        return s + (u.login_count / daysSince);
      }, 0) / reg * 100).toFixed(0) : 0;

      // ── الجلسات حسب النوع
      const enSess = sess.filter(s => s.subject === 'english');
      const bioSess = sess.filter(s => s.subject === 'biology');
      const monsterSess = sess.filter(s => s.game_mode === 'monster');
      const chapSess = sess.filter(s => s.question_type === 'chapters');
      const halfSess = sess.filter(s => s.question_type === 'halfyear');
      const fullSess = sess.filter(s => s.question_type === 'fullyear');

      // ── دقة المادتين من analytics_by_subject
      const enSubj = (bySubject || []).find(r => r.subject === 'english') || {};
      const bioSubj = (bySubject || []).find(r => r.subject === 'biology') || {};
      const avgAccEn = enSubj.avg_correct && enSubj.avg_correct + enSubj.avg_wrong > 0
        ? Math.round((enSubj.avg_correct / (enSubj.avg_correct + enSubj.avg_wrong)) * 100) : 0;
      const avgAccBio = bioSubj.avg_correct && bioSubj.avg_correct + bioSubj.avg_wrong > 0
        ? Math.round((bioSubj.avg_correct / (bioSubj.avg_correct + bioSubj.avg_wrong)) * 100) : 0;

      // ── وقت اللعب الكلي
      const totalPlayTimeSess = Math.round(sess.reduce((s, r) => s + (r.duration_seconds || 0), 0) / 60);

      // ── الأسئلة الكلية من users
      const totalCorrect = users.reduce((s, u) => s + (u.total_correct_answers || 0), 0)
        || sess.reduce((s, r) => s + (r.questions_correct || 0), 0);
      const totalWrong = users.reduce((s, u) => s + (u.total_wrong_answers || 0), 0)
        || sess.reduce((s, r) => s + (r.questions_wrong || 0), 0);
      const totalQs = users.reduce((s, u) => s + (u.total_questions_answered || 0), 0)
        || sess.reduce((s, r) => s + (r.questions_total || 0), 0);
      const totalWrongFromInventory = (wrongRows || []).reduce((s, w) => s + (w.times_wrong || 1), 0);

      // ── النجوم
      const stars1 = stages.filter(r => r.stars === 1).length;
      const stars2 = stages.filter(r => r.stars === 2).length;
      const stars3 = stages.filter(r => r.stars === 3).length;
      const starsTotal = stages.length || 1;

      // ── كيرفات: جلسات آخر 7 أيام
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now - (6 - i) * 24 * 60 * 60 * 1000);
        return {
          label: d.toLocaleDateString('ar-IQ', { weekday: 'short' }),
          dateStr: d.toISOString().split('T')[0],
        };
      });
      const sessPerDay = days.map(d => ({
        label: d.label,
        value: sess.filter(s => s.created_at && s.created_at.startsWith(d.dateStr)).length,
      }));
      const dailyData = (dailyLogins && dailyLogins.length >= 2)
        ? dailyLogins.slice(-7).map(r => ({ label: r.date?.slice(5), value: r.count || 0 }))
        : sessPerDay;

      // ── التوزيعات الديموغرافية
      const genderMap = { male: sum.male_count || 0, female: sum.female_count || 0 };
      // إذا لم تكن في analytics_summary، نحسبها من users
      if (!sum.male_count && !sum.female_count) {
        users.forEach(u => { if (u.gender === 'male') genderMap.male++; else if (u.gender === 'female') genderMap.female++; });
      }
      const ageMap = { 'أقل من 18': 0, '18-21': 0, '22-25': 0, '26+': 0 };
      const regionMap = {};
      users.forEach(u => {
        const age = u.age;
        if (age) {
          if (age < 18) ageMap['أقل من 18']++;
          else if (age <= 21) ageMap['18-21']++;
          else if (age <= 25) ageMap['22-25']++;
          else ageMap['26+']++;
        }
        if (u.region) regionMap[u.region] = (regionMap[u.region] || 0) + 1;
      });
      const topRegions = Object.entries(regionMap).sort((a,b)=>b[1]-a[1]).slice(0,6)
        .map(([k,v],i) => ({ label: k, value: v, color: ['#8b5cf6','#06b6d4','#f97316','#84cc16','#e879f9','#f43f5e'][i] }));
      const topRegionsBar = Object.entries(regionMap).sort((a,b)=>b[1]-a[1]).slice(0,8)
        .map(([k,v]) => ({ label: k, value: v }));

      setStats({
        reg, totalGuests: totalGuests || 0, activeUsers7d,
        avgLogins, avgXp, avgStreak, avgPlayTime, avgAge, avgDailyReturn,
        totalPlayTimeSess,
        topRegion: sum.top_region || topRegions[0]?.label || '—',

        totalSessions: sess.length,
        enSess: enSess.length, bioSess: bioSess.length,
        avgAccEn, avgAccBio,
        monsterSess: monsterSess.length,
        chapSess: chapSess.length, halfSess: halfSess.length, fullSess: fullSess.length,

        totalCorrect, totalWrong, totalQs, totalWrongFromInventory,

        stars1, stars2, stars3, starsTotal, unlockedStages: stages.length,

        sessPerDay, dailyData,
        buttonUsage: [
          { label: 'فصول EN', value: enSess.filter(s => s.question_type === 'chapters').length },
          { label: 'فصول BIO', value: bioSess.filter(s => s.question_type === 'chapters').length },
          { label: 'نصف سنة', value: halfSess.length },
          { label: 'شامل', value: fullSess.length },
          { label: 'وحش', value: monsterSess.length },
        ].sort((a,b) => b.value - a.value),

        genderPie: [
          { label: 'ذكر', value: genderMap.male, color: '#6366f1' },
          { label: 'أنثى', value: genderMap.female, color: '#ec4899' },
        ].filter(d => d.value > 0),
        agePie: Object.entries(ageMap).filter(([,v]) => v > 0)
          .map(([k,v],i) => ({ label: k, value: v, color: ['#34d399','#60a5fa','#f472b6','#fbbf24'][i] })),
        topRegions,
        topRegionsBar,
        subjPie: [
          { label: 'English', value: users.filter(u=>u.preferred_subject==='english').length, color: '#3b82f6' },
          { label: 'أحياء', value: users.filter(u=>u.preferred_subject==='biology').length, color: '#10b981' },
        ],
      });
    } catch (e) {
      console.error('AdminDashboard error:', e);
      setError(e.message || 'خطأ في تحميل البيانات');
    }
    setLoading(false);
  };

  // ── شاشة PIN
  if (!unlocked) {
    return (
      <div className="fixed inset-0 bg-[#0a0f1e] flex flex-col items-center justify-center z-[9999] p-6" dir="ltr">
        <button onClick={onBack} dir="rtl" className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all">✕ خروج</button>

        <div dir="rtl" className="text-center mb-8">
          <div className="text-4xl mb-2">🔐</div>
          <div className="text-white text-2xl font-black">لوحة التحكم</div>
          <div className="text-slate-400 text-sm mt-1">أدخل الرمز السري للدخول</div>
        </div>

        {/* نقاط الرمز */}
        <div className={`flex gap-3 mb-10 ${shake ? 'animate-[shake_0.6s_ease-in-out]' : ''}`}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${i < pin.length ? 'bg-yellow-400 border-yellow-300 scale-125' : 'bg-transparent border-slate-600'}`} />
          ))}
        </div>

        {/* لوحة أرقام */}
        <div className="grid grid-cols-3 gap-3 w-64">
          {keys.map((k, i) => (
            <button key={i} onClick={() => k !== '' && handleKey(k)}
              className={`h-16 rounded-2xl text-xl font-black transition-all duration-100 active:scale-90 select-none ${
                k === '' ? 'invisible' :
                k === 'del' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 text-lg border border-slate-700' :
                'bg-slate-800 text-white hover:bg-slate-700 active:bg-yellow-500 active:text-slate-900 border border-slate-700'
              }`}>
              {k === 'del' ? '⌫' : k}
            </button>
          ))}
        </div>

        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            15%,45%,75%{transform:translateX(-10px)}
            30%,60%,90%{transform:translateX(10px)}
          }
        `}</style>
      </div>
    );
  }

  // ── الداشبورد
  const tabs = [
    { label: '👥 المستخدمون', key: 'users' },
    { label: '🎮 الجلسات', key: 'sessions' },
    { label: '📈 كيرفات', key: 'curves' },
    { label: '🍩 التوزيعات', key: 'dists' },
  ];

  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-y-auto z-[9999]" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-all">
          ← رجوع
        </button>
        <div className="text-center">
          <div className="font-black text-base">لوحة التحكم</div>
          {stats && <div className="text-[10px] text-slate-500">{stats.reg} مستخدم · {stats.totalSessions} جلسة</div>}
        </div>
        <button onClick={loadStats} disabled={loading} className="text-slate-400 hover:text-yellow-400 text-sm font-bold px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50">
          {loading ? '...' : '↻ تحديث'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 px-4 pt-4 pb-2">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 py-2.5 rounded-xl text-[11px] font-black transition-all ${tab === i ? 'bg-yellow-400 text-slate-900 shadow-lg' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 border border-slate-700/50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-12">
        {/* Loading */}
        {loading && (
          <div className="text-center py-24 text-slate-400">
            <div className="text-5xl mb-4">⚙️</div>
            <p className="font-bold text-lg">جاري تحميل البيانات...</p>
            <p className="text-sm text-slate-500 mt-1">يستغرق بضع ثوان</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-400 font-bold mb-2">حدث خطأ</p>
            <p className="text-slate-500 text-sm mb-6">{error}</p>
            <button onClick={loadStats} className="px-6 py-2.5 bg-yellow-400 text-slate-900 font-black rounded-xl hover:bg-yellow-300 transition-all">
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* ─── تاب: المستخدمون ─── */}
        {!loading && stats && tab === 0 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="مستخدمون مسجلون" value={stats.reg} color="text-yellow-400" icon="👤" />
              <StatCard label="دخلوا كضيف" value={stats.totalGuests} color="text-blue-400" icon="👻"
                sub="لم يسجلوا حساباً" />
              <StatCard label="نشطون (7 أيام)" value={stats.activeUsers7d} color="text-green-400" icon="🔥"
                sub="دخلوا خلال أسبوع" />
              <StatCard label="متوسط الدخولات" value={stats.avgLogins} color="text-purple-400" icon="🔁"
                sub="لكل مستخدم" />
              <StatCard label="متوسط وقت اللعب" value={`${stats.avgPlayTime} د`} color="text-cyan-400" icon="⏱️"
                sub="لكل مستخدم" />
              <StatCard label="معدل العودة اليومي" value={`${stats.avgDailyReturn}%`} color="text-teal-400" icon="📅"
                sub="متوسط تكرار الدخول" />
              <StatCard label="متوسط Streak" value={`${stats.avgStreak} يوم`} color="text-orange-400" icon="🏆" />
              <StatCard label="متوسط العمر" value={stats.avgAge ?? '—'} color="text-pink-400" icon="🎂"
                sub="سنة" />
              <StatCard label="متوسط الـ XP" value={stats.avgXp} color="text-indigo-400" icon="⚡"
                sub="لكل مستخدم" />
            </div>

            {/* النجوم */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">⭐ توزيع النجوم في المراحل</p>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: '1 نجمة', value: stats.stars1, color: 'text-slate-400', bg: 'bg-slate-700' },
                  { label: '2 نجمة', value: stats.stars2, color: 'text-yellow-300', bg: 'bg-yellow-900/30' },
                  { label: '3 نجوم', value: stats.stars3, color: 'text-yellow-400', bg: 'bg-yellow-900/50' },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-xl p-3 text-center`}>
                    <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-slate-400 text-[10px] mt-1">{s.label}</div>
                    <div className="text-slate-500 text-[9px]">{Math.round((s.value / stats.starsTotal) * 100)}%</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-slate-500 text-xs">المراحل المفتوحة:</span>
                <span className="text-white font-black text-sm">{stats.unlockedStages}</span>
                <span className="text-slate-500 text-xs mr-4">المتوسط الأكثر:</span>
                <span className="text-yellow-400 font-black text-sm">
                  {stats.stars3 >= stats.stars2 && stats.stars3 >= stats.stars1 ? '⭐⭐⭐' : stats.stars2 >= stats.stars1 ? '⭐⭐' : '⭐'}
                </span>
              </div>
            </div>

            {/* الأسئلة صح وخطأ */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">✅ الأسئلة (المجموع الكلي)</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-900/30 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-green-400">{(stats.totalCorrect || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-xs mt-1">إجابات صحيحة</div>
                </div>
                <div className="bg-red-900/30 rounded-xl p-3 text-center">
                  <div className="text-2xl font-black text-red-400">{(stats.totalWrong || 0).toLocaleString()}</div>
                  <div className="text-slate-400 text-xs mt-1">إجابات خاطئة</div>
                </div>
              </div>
              {stats.totalQs > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>معدل الدقة الكلي</span>
                    <span className="text-white font-bold">{Math.round((stats.totalCorrect / stats.totalQs) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${Math.round((stats.totalCorrect / stats.totalQs) * 100)}%` }} />
                  </div>
                </div>
              )}
              {stats.totalWrongFromInventory > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">أخطاء محفوظة للمراجعة</span>
                    <span className="text-orange-400 font-black">{stats.totalWrongFromInventory.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── تاب: الجلسات ─── */}
        {!loading && stats && tab === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="إجمالي الجلسات" value={stats.totalSessions} color="text-white" icon="🎮" />
              <StatCard label="جلسات Monster" value={stats.monsterSess} color="text-purple-400" icon="👾" />
              <StatCard label="جلسات English" value={stats.enSess} color="text-blue-400" icon="🇬🇧"
                sub={`دقة: ${stats.avgAccEn}%`} />
              <StatCard label="جلسات أحياء" value={stats.bioSess} color="text-green-400" icon="🧬"
                sub={`دقة: ${stats.avgAccBio}%`} />
              <StatCard label="جلسات الفصول" value={stats.chapSess} color="text-yellow-400" icon="📚" />
              <StatCard label="نصف السنة" value={stats.halfSess} color="text-orange-400" icon="📋" />
              <StatCard label="المراجعة الشاملة" value={stats.fullSess} color="text-pink-400" icon="📝" />
              <StatCard label="وقت اللعب الكلي" value={`${stats.totalPlayTimeSess} د`} color="text-cyan-400" icon="⏱️"
                sub="مجموع جميع اللاعبين" />
            </div>

            {/* ترتيب الأزرار */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-4">🏅 الأزرار الأكثر استخداماً</p>
              <div className="space-y-3">
                {stats.buttonUsage.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-sm font-black w-5 text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : i === 2 ? 'text-amber-600' : 'text-slate-500'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`}
                    </span>
                    <div className="flex-1 bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${stats.buttonUsage[0].value > 0 ? (b.value / stats.buttonUsage[0].value) * 100 : 0}%`, background: i === 0 ? '#f59e0b' : '#6366f1' }} />
                    </div>
                    <span className="text-slate-300 text-xs font-bold w-20">{b.label}</span>
                    <span className="text-slate-400 text-xs font-mono w-8 text-left">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* مخطط أعمدة المواد */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">📊 مقارنة الجلسات</p>
              <BarChart
                data={[
                  { label: 'فصول EN', value: stats.enSess },
                  { label: 'فصول BIO', value: stats.bioSess },
                  { label: 'نصف سنة', value: stats.halfSess },
                  { label: 'شامل', value: stats.fullSess },
                  { label: 'وحش', value: stats.monsterSess },
                ]}
                color="#6366f1"
              />
            </div>

            {/* دقة المادتين */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">🎯 معدل الدقة (%)</p>
              <BarChart
                data={[
                  { label: 'English', value: stats.avgAccEn, color: '#3b82f6' },
                  { label: 'أحياء', value: stats.avgAccBio, color: '#10b981' },
                ]}
                color="#10b981"
              />
            </div>
          </div>
        )}

        {/* ─── تاب: مخططات الكيرفات ─── */}
        {!loading && stats && tab === 2 && (
          <div className="space-y-5 animate-fade-in-up">
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-300 text-sm font-black mb-1">📈 الجلسات اليومية (آخر 7 أيام)</p>
              <p className="text-slate-500 text-xs mb-4">عدد جلسات اللعب في كل يوم</p>
              <LineChart data={stats.sessPerDay} color="#6366f1" label="sessPerDay" width={320} height={160} />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-300 text-sm font-black mb-1">👥 المستخدمون النشطون يومياً</p>
              <p className="text-slate-500 text-xs mb-4">عدد المستخدمين الذين دخلوا كل يوم</p>
              <LineChart data={stats.dailyData} color="#10b981" label="dailyActive" width={320} height={160} />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-300 text-sm font-black mb-1">🏙️ المحافظات الأكثر دخولاً</p>
              <p className="text-slate-500 text-xs mb-4">توزيع المستخدمين حسب المحافظة</p>
              <BarChart data={stats.topRegionsBar} color="#8b5cf6" />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-slate-300 text-sm font-black mb-1">⭐ توزيع النجوم (بياني)</p>
              <p className="text-slate-500 text-xs mb-4">مقارنة عدد المراحل لكل مستوى نجوم</p>
              <BarChart
                data={[
                  { label: '⭐', value: stats.stars1, color: '#64748b' },
                  { label: '⭐⭐', value: stats.stars2, color: '#f59e0b' },
                  { label: '⭐⭐⭐', value: stats.stars3, color: '#f97316' },
                ]}
                color="#f59e0b"
              />
            </div>
          </div>
        )}

        {/* ─── تاب: التوزيعات ─── */}
        {!loading && stats && tab === 3 && (
          <div className="space-y-5 animate-fade-in-up">
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-300 text-sm font-black mb-4 text-center">👫 الجنس</p>
              <PieChart data={stats.genderPie.length ? stats.genderPie : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-300 text-sm font-black mb-4 text-center">📅 الفئة العمرية</p>
              <PieChart data={stats.agePie.length ? stats.agePie : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-300 text-sm font-black mb-4 text-center">🏙️ المحافظة (أعلى 6)</p>
              <PieChart data={stats.topRegions.length ? stats.topRegions : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>

            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-5">
              <p className="text-slate-300 text-sm font-black mb-4 text-center">📚 المادة المفضلة</p>
              <PieChart data={stats.subjPie.filter(d => d.value > 0).length ? stats.subjPie.filter(d => d.value > 0) : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>

            {/* ملخص نصي */}
            <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-4 space-y-2">
              <p className="text-slate-400 text-xs font-bold mb-3">📋 ملخص سريع</p>
              <div className="flex justify-between text-sm"><span className="text-slate-400">الأكثر من المحافظات:</span><span className="text-white font-bold">{stats.topRegion}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">نسبة الإناث:</span><span className="text-white font-bold">{stats.genderPie.find(g => g.label === 'أنثى') ? Math.round((stats.genderPie.find(g => g.label === 'أنثى').value / (stats.genderPie.reduce((s,g)=>s+g.value,0)||1))*100) : 0}%</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">نسبة الذكور:</span><span className="text-white font-bold">{stats.genderPie.find(g => g.label === 'ذكر') ? Math.round((stats.genderPie.find(g => g.label === 'ذكر').value / (stats.genderPie.reduce((s,g)=>s+g.value,0)||1))*100) : 0}%</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">متوسط العمر:</span><span className="text-white font-bold">{stats.avgAge ?? '—'} سنة</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-400">دخلوا كضيف ولم يسجلوا:</span><span className="text-blue-400 font-bold">{stats.totalGuests}</span></div>
            </div>
          </div>
        )}

        {/* No data */}
        {!loading && !stats && !error && (
          <div className="text-center py-24 text-slate-400">
            <p className="text-5xl mb-4">📊</p>
            <p className="font-bold">جاهز لتحميل البيانات</p>
            <button onClick={loadStats} className="mt-4 px-6 py-2.5 bg-yellow-400 text-slate-900 font-black rounded-xl">تحميل</button>
          </div>
        )}
      </div>
    </div>
  );
}
