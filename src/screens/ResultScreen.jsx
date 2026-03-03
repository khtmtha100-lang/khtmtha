import React from 'react';

export default function ResultScreen({
  open,
  isDark,
  score,
  correctAnswers,
  wrongAnswers,
  isGuest,
  stageId,
  chapterNum,
  onNextStage,
  onNextChapter,
  onRetryStage,
  onBack,
}) {
  if (!open) return null;

  const card = isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200';
  const text = isDark ? 'text-white' : 'text-slate-800';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-popIn">
      <div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-2 ${card}`}>
        <div className="text-center mb-6">
          <span className="text-6xl block mb-2">{score > 50 ? '👑' : '😎'}</span>
          <h2 className={`text-3xl font-black ${text}`} style={{ fontFamily: "'Cairo', sans-serif" }}>النتيجة النهائية</h2>
        </div>

        <div className="bg-slate-200 p-6 rounded-2xl mb-6 text-center shadow-inner">
          <span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Total Score</span>
          <div className="text-6xl font-black text-slate-800 mt-2">{score}</div>
        </div>

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

        {!isGuest && stageId !== 0 && (
          <button
            onClick={onNextStage}
            className="w-full py-4 rounded-xl font-black text-xl text-white bg-purple-500 shadow-lg shadow-purple-500/30 mb-3 hover:scale-105 transition-transform"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            المرحلة التالية ⏭️
          </button>
        )}

        {chapterNum < 8 && stageId !== 0 && (
          <button
            onClick={onNextChapter}
            className="w-full py-4 rounded-xl font-black text-xl text-white bg-blue-500 shadow-lg shadow-blue-500/30 mb-3 hover:scale-105 transition-transform"
            style={{ fontFamily: "'Cairo', sans-serif" }}
          >
            الفصل التالي 📖
          </button>
        )}

        {stageId !== 0 && (
          <button onClick={onRetryStage} className="w-full py-4 rounded-xl font-black text-xl text-white bg-emerald-500 shadow-lg shadow-emerald-500/30 mb-3 hover:scale-105 transition-transform" style={{ fontFamily: "'Cairo', sans-serif" }}>إعادة المرحلة</button>
        )}

        <button onClick={onBack} className={`w-full py-4 rounded-xl font-bold transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`} style={{ fontFamily: "'Cairo', sans-serif" }}>العودة</button>
      </div>
    </div>
  );
}

