import React, { useEffect, useState } from 'react';
import { ArrowLeft, Lock, Star } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { TactileButton } from '../components/ui/common.jsx';

// واجهة المراحل (LevelsView)
export default function LevelsView({
  isDarkMode,
  chapterNum,
  onBack,
  isGuest,
  onShowLogin,
  onStartGame,
  subject = 'english',
  userDbId,
}) {
  const hasDemo = chapterNum === 1;
  const [completedStages, setCompletedStages] = useState([]);
  const [starsMap, setStarsMap] = useState({});
  const [loading, setLoading] = useState(false);

  // قراءة المراحل المكتملة من Supabase فقط (لا local cache)
  useEffect(() => {
    const fetchStages = async () => {
      let authUserId = null;
      try {
        authUserId = localStorage.getItem('anon_user_id');
      } catch {
        authUserId = null;
      }

      if (isGuest || !authUserId) {
        setCompletedStages([]);
        setStarsMap({});
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stage_progress')
          .select('stage, stars')
          .eq('user_id', authUserId)
          .eq('subject', subject)
          .eq('chapter', chapterNum);

        if (error) throw error;

        const stages = data?.map(d => Number(d.stage)) || [];
        const stars = {};
        (data || []).forEach((d) => {
          const sid = Number(d.stage);
          stars[sid] = Math.max(stars[sid] || 0, d.stars ?? 0);
        });
        setCompletedStages(stages);
        setStarsMap(stars);
        console.log(`✅ Loaded ${stages.length} completed stages for Ch${chapterNum} (Supabase)`);
      } catch (e) {
        console.warn('⚠️ LevelsView Supabase error:', e?.message || e);
        setCompletedStages([]);
        setStarsMap({});
      } finally {
        setLoading(false);
      }
    };
    fetchStages();
  }, [userDbId, subject, chapterNum, isGuest]);

  const getStageStars = (stageId) => starsMap[stageId] || 0;

  // عدد المراحل حسب الفصل (الفصل 1 = 28 مرحلة من Supabase)
  const STAGES_COUNT = chapterNum === 1 ? 29 : 12;

  // منطق الفتح:
  // الفصل 1: الديمو مفتوح دائماً + المرحلة 1 مفتوحة دائماً بعد تسجيل الدخول
  // المراحل التالية تُفتح بالتسلسل اعتماداً على Supabase
  // الفصل 2-8: مرحلة 1 مفتوحة دائماً — المرحلة N تُفتح بعد إكمال N-1
  const isLevelUnlocked = (stageId) => {
    if (isGuest) return false;
    if (hasDemo) {
      if (stageId === 0) return true;
      if (stageId === 1) return true;
      return completedStages.includes(stageId - 1);
    }
    if (stageId === 1) return true;
    return completedStages.includes(stageId - 1);
  };

  let levelsList = Array.from({ length: STAGES_COUNT }, (_, i) => {
    const id = i + 1;
    return { id, locked: !isLevelUnlocked(id), stars: getStageStars(id) };
  });

  if (hasDemo) {
    levelsList = [{ id: 0, isDemo: true, locked: isGuest, stars: getStageStars(0) }, ...levelsList];
  }

  const handleLevelClick = (level) => {
    if (level.locked) {
      onShowLogin();
      return;
    }
    onStartGame('chapter', subject, null, chapterNum, level.id);
  };

  return (
    <div className="animate-fade-in-up pb-32">
      <div className="flex items-center gap-4 mb-8">
        <TactileButton
          onClick={() => onBack('chapters')}
          className="w-12 h-12 rounded-xl"
          colorClass={isDarkMode ? 'bg-slate-800' : 'bg-white'}
          borderClass={isDarkMode ? 'border-slate-700' : 'border-slate-200'}
        >
          <ArrowLeft className={isDarkMode ? 'text-white' : 'text-slate-700'} />
        </TactileButton>
        <div>
          <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>الفصل {chapterNum}</h2>
          <p className="text-sm font-bold text-slate-400">
            {isGuest ? 'يرجى تسجيل الدخول' : loading ? '⏳ جاري التحميل...' : 'أكمل المراحل لفتح التحدي'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {levelsList.map((level) => (
          <div key={level.id} className="flex flex-col items-center gap-2">
            <TactileButton
              onClick={() => handleLevelClick(level)}
              className={`w-full aspect-[4/5] rounded-[24px] flex flex-col items-center justify-center gap-1 relative overflow-hidden group transition-transform active:scale-95 
                ${level.locked ? 'opacity-80 grayscale' : level.isDemo ? 'shadow-lg shadow-purple-500/20' : 'shadow-lg shadow-indigo-500/20'}
              `}
              colorClass={
                level.locked
                  ? (isDarkMode ? 'bg-slate-900' : 'bg-slate-200')
                  : level.isDemo
                    ? (isDarkMode ? 'bg-purple-600' : 'bg-[#8B5CF6]')
                    : (isDarkMode ? 'bg-indigo-600' : 'bg-[#8B5CF6]')
              }
              borderClass={
                level.locked
                  ? (isDarkMode ? 'border-slate-800' : 'border-slate-300')
                  : level.isDemo
                    ? (isDarkMode ? 'border-purple-800' : 'border-[#7C3AED]')
                    : (isDarkMode ? 'border-indigo-800' : 'border-[#7C3AED]')
              }
            >
              {level.isDemo ? (
                <>
                  <span className="text-4xl mb-1">🎮</span>
                  <span className="text-white font-black text-sm">ديمو</span>
                </>
              ) : (
                <>
                  {level.locked ? (
                    <Lock className="w-8 h-8 text-slate-400 mb-2" />
                  ) : (
                    <span className="text-3xl font-black text-white drop-shadow-md">{level.id}</span>
                  )}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${level.stars >= s ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </TactileButton>
          </div>
        ))}
      </div>
    </div>
  );
}

