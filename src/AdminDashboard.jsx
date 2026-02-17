import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase.js';

// ─── مخططات SVG خالصة ───────────────────────────────────────

const PieChart = ({ data, size = 180 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div className="text-center text-slate-400 text-sm py-8">لا توجد بيانات</div>;
  const cx = size / 2, cy = size / 2, r = size * 0.36, inner = size * 0.2;
  let angle = -Math.PI / 2;
  const slices = data.map(d => {
    const a = (d.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle), y1 = cy + r * Math.sin(angle);
    angle += a;
    const x2 = cx + r * Math.cos(angle), y2 = cy + r * Math.sin(angle);
    const xi1 = cx + inner * Math.cos(angle - a), yi1 = cy + inner * Math.sin(angle - a);
    const xi2 = cx + inner * Math.cos(angle), yi2 = cy + inner * Math.sin(angle);
    const large = a > Math.PI ? 1 : 0;
    return { path: `M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2} L${xi2},${yi2} A${inner},${inner},0,${large},0,${xi1},${yi1} Z`, color: d.color, label: d.label, pct: Math.round((d.value / total) * 100) };
  });
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size}>
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="white" strokeWidth="1.5" />)}
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="w-3 h-3 rounded-full inline-block flex-shrink-0" style={{ background: s.color }}></span>
            {s.label} {s.pct}%
          </div>
        ))}
      </div>
    </div>
  );
};

const LineChart = ({ data, width = 300, height = 140, color = '#6366f1' }) => {
  if (!data || data.length < 2) return <div className="text-center text-slate-400 text-sm py-8">بيانات غير كافية</div>;
  const pad = { t: 16, r: 16, b: 32, l: 40 };
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b;
  const maxV = Math.max(...data.map(d => d.value), 1);
  const pts = data.map((d, i) => ({ x: pad.l + (i / (data.length - 1)) * W, y: pad.t + H - (d.value / maxV) * H }));
  const poly = pts.map(p => `${p.x},${p.y}`).join(' ');
  const area = `M${pts[0].x},${pad.t + H} ` + pts.map(p => `L${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${pad.t + H} Z`;
  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg)" />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill={color} stroke="white" strokeWidth="1.5" />
          <text x={p.x} y={pad.t + H + 18} textAnchor="middle" fontSize="9" fill="#94a3b8">{data[i].label}</text>
        </g>
      ))}
      {[0, 0.5, 1].map(f => (
        <text key={f} x={pad.l - 6} y={pad.t + H - f * H + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{Math.round(maxV * f)}</text>
      ))}
    </svg>
  );
};

const BarChart = ({ data, color = '#8b5cf6' }) => {
  const [hov, setHov] = useState(null);
  if (!data || data.length === 0) return <div className="text-center text-slate-400 text-sm py-8">لا توجد بيانات</div>;
  const maxV = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="flex items-end gap-2 h-28 px-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative"
          onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
          {hov === i && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg whitespace-nowrap z-10">
              {d.value}
            </div>
          )}
          <div className="w-full rounded-t-lg transition-all duration-300"
            style={{ height: `${(d.value / maxV) * 100}%`, background: hov === i ? '#f59e0b' : color, minHeight: 4 }} />
          <span className="text-[9px] font-bold text-slate-500 mt-1 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

// ─── الداشبورد الرئيسي ───────────────────────────────────────

export default function AdminDashboard({ onBack }) {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const CORRECT_PIN = '0773913';

  const handleKey = (k) => {
    if (k === 'del') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length >= 7) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 7) {
      if (next === CORRECT_PIN) { setUnlocked(true); }
      else {
        setShake(true);
        setTimeout(() => { setShake(false); setPin(''); }, 600);
      }
    }
  };

  const keys = ['1','2','3','4','5','6','7','8','9','','0','del'];

  useEffect(() => {
    if (unlocked && !stats) loadStats();
  }, [unlocked]);

  const loadStats = async () => {
    setLoading(true);
    try {
      const [
        { count: totalReg },
        { data: allUsers },
        { count: totalGuests },
        { data: sessions },
        { data: stageRows },
        { data: wrongRows },
        { count: feedbackCount },
      ] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('users').select('login_count, avg_days_between_logins, total_xp, current_streak, gender, age, region, preferred_subject'),
        supabase.from('guest_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('game_sessions').select('subject, question_type, game_mode, accuracy, score, questions_correct, won'),
        supabase.from('stage_progress').select('stars'),
        supabase.from('wrong_answers_inventory').select('question_type'),
        supabase.from('user_feedback').select('*', { count: 'exact', head: true }),
      ]);

      const reg = totalReg || 0;
      const users = allUsers || [];

      // ── متوسطات عامة
      const totalLoginSum = users.reduce((s, u) => s + (u.login_count || 0), 0);
      const totalXpSum = users.reduce((s, u) => s + (u.total_xp || 0), 0);
      const totalStreakSum = users.reduce((s, u) => s + (u.current_streak || 0), 0);
      const avgLogins = reg > 0 ? (totalLoginSum / reg).toFixed(1) : 0;
      const avgXp = reg > 0 ? Math.round(totalXpSum / reg) : 0;
      const avgStreak = reg > 0 ? (totalStreakSum / reg).toFixed(1) : 0;

      // ── الجلسات
      const sess = sessions || [];
      const enSess = sess.filter(s => s.subject === 'english');
      const bioSess = sess.filter(s => s.subject === 'biology');
      const chapSess = sess.filter(s => s.question_type === 'chapters');
      const halfSess = sess.filter(s => s.question_type === 'halfyear');
      const fullSess = sess.filter(s => s.question_type === 'fullyear');
      const monsterSess = sess.filter(s => s.game_mode === 'monster');

      const avgAcc = (arr) => arr.length > 0 ? Math.round(arr.reduce((s, r) => s + (r.accuracy || 0), 0) / arr.length) : 0;

      // ── توزيع النجوم
      const stars = (stageRows || []).map(r => r.stars);
      const starsTotal = stars.length || 1;
      const starsDist = [1,2,3].map(n => ({ label: `${n}★`, value: stars.filter(s => s === n).length }));

      // ── التوزيعات الديموغرافية
      const genderMap = {};
      const ageMap = { 'أقل من 18': 0, '18-24': 0, '25-34': 0, '35+': 0 };
      const regionMap = {};
      const subjPrefMap = { english: 0, biology: 0 };
      users.forEach(u => {
        if (u.gender) genderMap[u.gender] = (genderMap[u.gender] || 0) + 1;
        const age = u.age;
        if (age) {
          if (age < 18) ageMap['أقل من 18']++;
          else if (age <= 24) ageMap['18-24']++;
          else if (age <= 34) ageMap['25-34']++;
          else ageMap['35+']++;
        }
        if (u.region) regionMap[u.region] = (regionMap[u.region] || 0) + 1;
        if (u.preferred_subject) subjPrefMap[u.preferred_subject] = (subjPrefMap[u.preferred_subject] || 0) + 1;
      });

      // ترتيب أزرار الاستخدام
      const buttonUsage = [
        { label: 'فصول - EN', value: enSess.filter(s => s.question_type === 'chapters').length },
        { label: 'فصول - BIO', value: bioSess.filter(s => s.question_type === 'chapters').length },
        { label: 'نصف سنة', value: halfSess.length },
        { label: 'شامل', value: fullSess.length },
        { label: 'وحش', value: monsterSess.length },
      ].sort((a, b) => b.value - a.value);

      setStats({
        reg, totalGuests: totalGuests || 0,
        avgLogins, avgXp, avgStreak,
        totalSessions: sess.length,
        enSess: enSess.length, bioSess: bioSess.length,
        avgAccEn: avgAcc(enSess), avgAccBio: avgAcc(bioSess),
        chapSess: chapSess.length, halfSess: halfSess.length, fullSess: fullSess.length, monsterSess: monsterSess.length,
        starsDist, starsTotal,
        buttonUsage,
        genderPie: Object.entries(genderMap).map(([k,v], i) => ({ label: k, value: v, color: ['#6366f1','#ec4899','#f59e0b'][i] || '#94a3b8' })),
        agePie: Object.entries(ageMap).filter(([,v]) => v > 0).map(([k,v], i) => ({ label: k, value: v, color: ['#34d399','#60a5fa','#f472b6','#fbbf24'][i] })),
        regionPie: Object.entries(regionMap).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v], i) => ({ label: k, value: v, color: ['#8b5cf6','#06b6d4','#f97316','#84cc16','#e879f9'][i] })),
        subjPie: [
          { label: 'English', value: subjPrefMap.english, color: '#3b82f6' },
          { label: 'أحياء', value: subjPrefMap.biology, color: '#10b981' },
        ],
        wrongRows: wrongRows || [],
        feedbackCount: feedbackCount || 0,
      });
    } catch (e) {
      console.error('AdminDashboard loadStats error:', e);
    }
    setLoading(false);
  };

  // ── واجهة PIN
  if (!unlocked) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-[9999] p-6">
        <button onClick={onBack} className="absolute top-5 right-5 text-slate-400 hover:text-white text-sm font-bold">✕ خروج</button>
        <div className="text-white text-2xl font-black mb-2">لوحة التحكم</div>
        <div className="text-slate-400 text-sm mb-8">أدخل الرمز السري</div>

        {/* عرض النقاط */}
        <div className={`flex gap-3 mb-8 transition-all ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}
          style={shake ? { animation: 'shake 0.5s ease-in-out' } : {}}>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${i < pin.length ? 'bg-yellow-400 border-yellow-400 scale-110' : 'bg-transparent border-slate-500'}`} />
          ))}
        </div>

        {/* لوحة المفاتيح - اتجاه LTR */}
        <div className="grid grid-cols-3 gap-3 w-64" dir="ltr">
          {keys.map((k, i) => (
            <button
              key={i}
              onClick={() => k !== '' && handleKey(k)}
              className={`h-16 rounded-2xl text-xl font-black transition-all active:scale-95 ${
                k === '' ? 'invisible' :
                k === 'del' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 text-base' :
                'bg-slate-700 text-white hover:bg-slate-600 active:bg-yellow-500'
              }`}
            >
              {k === 'del' ? '⌫' : k}
            </button>
          ))}
        </div>

        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%,60%{transform:translateX(-8px)}
            40%,80%{transform:translateX(8px)}
          }
        `}</style>
      </div>
    );
  }

  // ── واجهة الداشبورد
  const tabs = ['المستخدمون', 'الجلسات', 'المخططات', 'التوزيعات'];
  const CardStat = ({ label, value, sub, color = 'text-yellow-400' }) => (
    <div className="bg-slate-800 rounded-2xl p-4 flex flex-col gap-1">
      <span className="text-slate-400 text-xs font-bold">{label}</span>
      <span className={`text-3xl font-black ${color}`}>{value}</span>
      {sub && <span className="text-slate-500 text-xs">{sub}</span>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-y-auto z-[9999]" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center justify-between z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-1">
          ← رجوع
        </button>
        <span className="font-black text-lg">لوحة التحكم</span>
        <button onClick={loadStats} className="text-slate-400 hover:text-yellow-400 text-sm font-bold">تحديث ↻</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 pt-4 pb-2">
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${tab === i ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="px-4 pb-10">
        {loading && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-4xl mb-4 animate-spin">⚙️</div>
            <p className="font-bold">جاري تحميل البيانات...</p>
          </div>
        )}

        {!loading && stats && tab === 0 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-3">
              <CardStat label="مستخدمون مسجلون" value={stats.reg} color="text-yellow-400" />
              <CardStat label="زوار ضيوف" value={stats.totalGuests} color="text-blue-400" />
              <CardStat label="متوسط الدخولات" value={stats.avgLogins} sub="لكل مستخدم" color="text-purple-400" />
              <CardStat label="متوسط الـ XP" value={stats.avgXp} sub="لكل مستخدم" color="text-green-400" />
              <CardStat label="متوسط streak" value={stats.avgStreak} sub="يوم" color="text-orange-400" />
              <CardStat label="ردود الأفعال" value={stats.feedbackCount} color="text-pink-400" />
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">توزيع النجوم (الكل)</p>
              <div className="flex gap-3">
                {stats.starsDist.map((s, i) => (
                  <div key={i} className="flex-1 bg-slate-700 rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-yellow-400">{Math.round((s.value / stats.starsTotal) * 100)}%</div>
                    <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && stats && tab === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="grid grid-cols-2 gap-3">
              <CardStat label="إجمالي الجلسات" value={stats.totalSessions} color="text-white" />
              <CardStat label="جلسات Monster" value={stats.monsterSess} color="text-purple-400" />
              <CardStat label="جلسات English" value={stats.enSess} sub={`متوسط دقة ${stats.avgAccEn}%`} color="text-blue-400" />
              <CardStat label="جلسات أحياء" value={stats.bioSess} sub={`متوسط دقة ${stats.avgAccBio}%`} color="text-green-400" />
              <CardStat label="جلسات فصول" value={stats.chapSess} color="text-yellow-400" />
              <CardStat label="نصف سنة" value={stats.halfSess} color="text-orange-400" />
              <CardStat label="مراجعة شاملة" value={stats.fullSess} color="text-pink-400" />
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">ترتيب الأزرار الأكثر استخداماً</p>
              <div className="space-y-2">
                {stats.buttonUsage.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`text-xs font-black w-4 ${i === 0 ? 'text-yellow-400' : i === stats.buttonUsage.length - 1 ? 'text-red-400' : 'text-slate-400'}`}>{i + 1}</span>
                    <div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${stats.buttonUsage[0].value > 0 ? (b.value / stats.buttonUsage[0].value) * 100 : 0}%` }} />
                    </div>
                    <span className="text-slate-300 text-xs font-bold w-20 text-left">{b.label}</span>
                    <span className="text-slate-400 text-xs w-8 text-left">{b.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && stats && tab === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">مقارنة الجلسات (English vs أحياء)</p>
              <BarChart
                data={[
                  { label: 'EN-فصول', value: stats.enSess },
                  { label: 'BIO-فصول', value: stats.bioSess },
                  { label: 'نصف سنة', value: stats.halfSess },
                  { label: 'شامل', value: stats.fullSess },
                  { label: 'وحش', value: stats.monsterSess },
                ]}
                color="#6366f1"
              />
            </div>

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3">دقة المادتين (%)</p>
              <BarChart
                data={[
                  { label: 'English', value: stats.avgAccEn },
                  { label: 'أحياء', value: stats.avgAccBio },
                ]}
                color="#10b981"
              />
            </div>
          </div>
        )}

        {!loading && stats && tab === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3 text-center">المادة المفضلة</p>
              <PieChart data={stats.subjPie} />
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3 text-center">الجنس</p>
              <PieChart data={stats.genderPie.length ? stats.genderPie : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3 text-center">الفئة العمرية</p>
              <PieChart data={stats.agePie.length ? stats.agePie : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-slate-400 text-xs font-bold mb-3 text-center">المحافظة (أعلى 5)</p>
              <PieChart data={stats.regionPie.length ? stats.regionPie : [{ label: 'لا بيانات', value: 1, color: '#475569' }]} />
            </div>
          </div>
        )}

        {!loading && !stats && (
          <div className="text-center py-20 text-slate-400">
            <p className="font-bold">فشل تحميل البيانات</p>
            <button onClick={loadStats} className="mt-4 px-6 py-2 bg-yellow-400 text-slate-900 font-black rounded-xl">إعادة المحاولة</button>
          </div>
        )}
      </div>
    </div>
  );
}
