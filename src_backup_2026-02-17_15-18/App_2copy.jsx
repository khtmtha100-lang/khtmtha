import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, List, FileText, Fingerprint, ChevronDown, Zap, Dna, Moon, Sun,
  ChevronLeft, Flame, Target, Briefcase, Star,
  Infinity as InfinityIcon, CheckCircle2, X, ArrowLeft,
  Lock, Maximize, Minimize, Swords, Send, Info, Heart,
  User, GraduationCap, LogOut, MessageCircle, LogIn, Check,
  MousePointer2, Gamepad2, Pause, Volume2, VolumeX, Crown
} from 'lucide-react';
import MonsterCard from './components/MonsterCard'
import Highlight from './components/Highlight'
import TutorialHand from './components/TutorialHand'
import { TactileButton, ProfileMenu, LoginView } from './components/AuthAndProfile'

const triggerHaptic = (d=15) => { if(navigator?.vibrate) navigator.vibrate(d); };
const EnIcon = (p) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 7v10h5"/><path d="M3 12h4"/><path d="M3 7h5"/><path d="M14 17v-10l7 10v-10"/></svg>;
const rMsg = a => a[Math.floor(Math.random()*a.length)];
const MSG = {
  correct:["👏 إمتاز!","🌟 وحش!","⚡ شكاكي!","🌟 جينات اينشتاين!","🔥 بطل!","💯 ممتاز!","💪 ما تتوقف!","🔥 عفية عليك!","🚀 مخلص المنهج!"],
  wrong:["🙄 أرجوك بعد لا تجاوبني!","💔 صدمة عاطفية!","🤦‍♂️ جان جاوبت صح!","😅 همزين مو بالوزاري!","😳 جاوبت من جيبك؟","😬 طارت الدرجة!"],
  final:{3:"يلا يا وحش 💪 باقيلك 3!",2:"ركز 😎 بعد سؤالين!",1:"هاي الأخيرة 🔥 لا تضيّعها!"},
  streak:["🔥🔥 ON FIRE!","⚡ UNSTOPPABLE!","💪 GODLIKE!","🌟 LEGEND!"]
};
const QS = [
  {id:1,q:"I ______ to the store yesterday.",options:["go","went","gone","going"],a:"went",explanation:"نستخدم الماضي البسيط (went) لأن الجملة تحتوي على 'yesterday'.",golden:false},
  {id:2,q:"She ______ glasses before.",options:["wear","used to wear","wears","wearing"],a:"used to wear",explanation:"نستخدم 'used to' للتعبير عن عادة في الماضي.",golden:true},
  {id:3,q:"How ______ exercise does he take?",options:["many","much","more","most"],a:"much",explanation:"كلمة 'exercise' غير معدودة، فنستخدم 'much'.",golden:false},
  {id:4,q:"If I ______ you, I would study.",options:["am","was","were","be"],a:"were",explanation:"في الحالة الشرطية الثانية نستخدم 'If I were you'.",golden:true},
  {id:5,q:"The story was ______ written.",options:["beautiful","beautifully","beauty","beautify"],a:"beautifully",explanation:"نحتاج لظرف (Adverb) لوصف الفعل 'written'.",golden:false},
];

const PauseMenu = ({isOpen,onResume,onExit,speedMode,setSpeed,muted,setMuted,dark,setDark}) => {
  const [so,setSo]=useState(false);
  const sp={baby:{id:'baby',l:'وضع الرضيع 👶',d:'رحلة الألف ميل',c:'bg-blue-100 text-blue-600'},teen:{id:'teen',l:'فتى متوسط 👱',d:'هرولة معتدلة',c:'bg-orange-100 text-orange-600'},beast:{id:'beast',l:'وضع الوحش 👹',d:'للأبطال!',c:'bg-red-100 text-red-600'}};
  const s=sp[speedMode]||sp.teen;
  if(!isOpen) return null;
  return(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-5 font-['Cairo']">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onResume}/>
      <div className={`relative w-full max-w-sm p-6 rounded-[2.5rem] border-4 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${dark?'bg-[#1E293B] border-slate-700':'bg-white border-slate-200'}`} style={{animation:'popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)'}}>
        <div className="text-center mb-6 pt-2"><h2 className={`text-3xl font-black mb-1 ${dark?'text-white':'text-slate-800'}`}>استراحة محارب 🛑</h2><p className="text-sm font-bold text-slate-400">خذ نفس وكمل الطريق</p></div>
        <div className="space-y-3 overflow-y-auto px-1 pb-2" style={{scrollbarWidth:'none'}}>
          <TactileButton onClick={onResume} className="w-full py-4 rounded-2xl gap-3 text-lg" colorClass="bg-yellow-400" borderClass="border-yellow-600"><Play className="w-6 h-6 fill-current text-yellow-900"/><span className="font-black text-yellow-900">استئناف اللعب</span></TactileButton>
          <div className="relative">
            <TactileButton onClick={()=>setSo(!so)} className="w-full p-4 rounded-2xl justify-between" colorClass={dark?'bg-slate-800':'bg-slate-50'} borderClass={dark?'border-slate-700':'border-slate-200'}>
              <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${s.c}`}>{s.l.split(' ').pop()}</div><div className="flex flex-col items-start"><span className="text-[10px] font-bold text-slate-400">سرعة اللعبة</span><span className={`font-black ${dark?'text-white':'text-slate-800'}`}>{s.l.split(' ').slice(0,2).join(' ')}</span></div></div>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${so?'rotate-180':''}`}/>
            </TactileButton>
            {so&&<div className={`mt-2 rounded-2xl border-[3px] shadow-inner overflow-hidden p-2 grid gap-2 ${dark?'bg-slate-800/50 border-slate-700':'bg-slate-50 border-slate-200'}`}>{Object.values(sp).map(x=>(
              <button key={x.id} onClick={()=>{setSpeed(x.id);setSo(false);triggerHaptic()}} className={`w-full p-3 rounded-xl flex items-start gap-3 border ${speedMode===x.id?'border-yellow-400 shadow-md ring-2 ring-yellow-400/20':'border-slate-200'} ${dark?'bg-slate-700':'bg-white'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${x.c.split(' ')[0]}`}>{x.l.split(' ').pop()}</div>
                <div className="text-right flex-1"><div className={`font-black text-base mb-0.5 ${dark?'text-white':'text-slate-800'}`}>{x.l.split(' ').slice(0,2).join(' ')}</div><div className="text-[10px] text-slate-500 font-bold">{x.d}</div></div>
                {speedMode===x.id&&<div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"/>}
              </button>))}</div>}
          </div>
          <div className="flex gap-2">
            <TactileButton onClick={()=>setMuted(!muted)} className="flex-1 p-3 rounded-2xl" colorClass={!muted?'bg-indigo-50':'bg-slate-100'} borderClass={!muted?'border-indigo-200':'border-slate-200'}>{!muted?<Volume2 className="w-5 h-5 text-indigo-500"/>:<VolumeX className="w-5 h-5 text-slate-400"/>}</TactileButton>
            <TactileButton onClick={()=>setDark(!dark)} className="flex-1 p-3 rounded-2xl" colorClass={dark?'bg-slate-700':'bg-orange-50'} borderClass={dark?'border-slate-600':'border-orange-200'}>{dark?<Moon className="w-5 h-5 text-yellow-300"/>:<Sun className="w-5 h-5 text-orange-500"/>}</TactileButton>
            <TactileButton onClick={onExit} className="flex-1 p-3 rounded-2xl" colorClass="bg-rose-50" borderClass="border-rose-200"><LogOut className="w-5 h-5 text-rose-500"/></TactileButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameScreen = ({mode='chapter',onExit,initDark=false}) => {
  const isM = mode==='monster';
  const IL = isM?10:3;
  const [gs,setGs]=useState('menu');
  const [dk,setDk]=useState(initDark);
  const [mt,setMt]=useState(false);
  const [fs,setFs]=useState(false);
  const [sc,setSc]=useState(0);
  const [lv,setLv]=useState(IL);
  const [cb,setCb]=useState(0);
  const [sk,setSk]=useState({active:false,m:1,t:0,mx:5000});
  const [pw,setPw]=useState({freeze:2,bomb:1});
  const [fz,setFz]=useState(false);
  const [pg,setPg]=useState(0);
  const [sm,setSm]=useState('teen');
  const [qs,setQs]=useState([]);
  const [cq,setCq]=useState(null);
  const [qi,setQi]=useState(0);
  const [qy,setQy]=useState(100);
  const [dOpts,setDOpts]=useState([]);
  const [ac,setAc]=useState(new Set());
  const [fb,setFb]=useState(null);
  const [shk,setShk]=useState(0);
  const [shkQ,setShkQ]=useState(false);
  const [pts,setPts]=useState([]);
  const [spop,setSpop]=useState(null);
  const [ca,setCa]=useState([]);
  const [wa,setWa]=useState([]);
  const [fdback,setFdback]=useState({show:false,ok:false,msg:''});
  const gaRef=useRef(null),qRef=useRef(null),oRefs=useRef([]),afRef=useRef(null),stRef=useRef(null),fzRef=useRef(null),axRef=useRef(null);

  const initA=()=>{if(!axRef.current)try{axRef.current=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}; if(axRef.current?.state==='suspended')axRef.current.resume()};
  const snd=useCallback((f,tp='sine',v=0.3,d=0.15)=>{if(mt)return;initA();if(!axRef.current)return;try{const c=axRef.current,o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=f;o.type=tp;g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(v,c.currentTime+0.01);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+d);o.start();o.stop(c.currentTime+d)}catch(e){}},[mt]);
  const okSnd=(m)=>{snd(100,'sawtooth',0.4,0.1);setTimeout(()=>{const b=600+m*150;snd(b,'square',0.15,0.1);snd(b*1.5,'sine',0.2,0.2)},50)};
  const ngSnd=()=>{snd(150,'sawtooth',0.4,0.4);setTimeout(()=>snd(100,'sawtooth',0.4,0.4),100)};
  const spark=(x,y,tp='confetti',n=15)=>{const p=Array.from({length:n},(_,i)=>({id:Date.now()+i+Math.random(),x,y,vx:(Math.random()-0.5)*20,vy:(Math.random()-0.5)*20-10,color:tp==='coin'?'#fbbf24':['#f472b6','#34d399','#60a5fa','#fcd34d'][Math.floor(Math.random()*4)],size:Math.random()*8+4,life:1,decay:Math.random()*0.02+0.015,tp}));setPts(p0=>[...p0,...p])};
  const tFS=()=>{try{if(!document.fullscreenElement){document.documentElement.requestFullscreen?.().then(()=>setFs(true)).catch(()=>{})}else{document.exitFullscreen?.().then(()=>setFs(false)).catch(()=>{})}}catch(e){}};
  // Keep `fs` state in sync with browser fullscreen changes (user ESC or external triggers)
  useEffect(()=>{
    const onChange = () => setFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  },[]);
  
  const startGame=()=>{initA();const p=QS.map(q=>({...q,options:[...q.options].sort(()=>Math.random()-0.5)}));setQs(p);setCq(p[0]);setQi(0);setQy(100);setSc(0);setLv(IL);setCb(0);setSk({active:false,m:1,t:0,mx:5000});setPw({freeze:2,bomb:1});setFz(false);setDOpts([]);setCa([]);setWa([]);setAc(new Set());setPg(0);setFdback({show:false,ok:false,msg:''});setPts([]);setShk(0);setGs('playing')};

  useEffect(()=>{if(gs!=='playing'||fdback.show||fz)return;let lt=performance.now();const lp=t=>{const dt=(t-lt)/16.67;lt=t;setQy(p=>{const sp={baby:0.3,teen:0.5,beast:0.8}[sm]||0.5;const v=sp*1.5*(sk.active?1+sk.m*0.05:1)*dt;const ny=p+v;const gh=gaRef.current?.offsetHeight||600;if(ny>gh+100){miss();return 100}return ny});afRef.current=requestAnimationFrame(lp)};afRef.current=requestAnimationFrame(lp);return()=>cancelAnimationFrame(afRef.current)},[gs,fdback.show,fz,sm,sk.active,cb]);
  useEffect(()=>{if(!pts.length)return;const i=setInterval(()=>setPts(p=>p.map(x=>({...x,x:x.x+x.vx,y:x.y+x.vy,vy:x.vy+0.8,life:x.life-x.decay})).filter(x=>x.life>0)),16);return()=>clearInterval(i)},[pts.length]);
  useEffect(()=>{if(!sk.active||gs!=='playing')return;stRef.current=setInterval(()=>setSk(p=>{const nt=p.t-50;if(nt<=0){clearInterval(stRef.current);return{active:false,m:1,t:0,mx:5000}}return{...p,t:nt}}),50);return()=>clearInterval(stRef.current)},[sk.active,gs]);

  const upper=()=>qy<(gaRef.current?.offsetHeight||600)/2+100;
  
  const answer=(ans,bi)=>{
    if(gs!=='playing'||fdback.show||!cq||fb!==null)return;initA();
    const ok=ans===cq.a;const be=oRefs.current[bi]?.getBoundingClientRect();const qr=qRef.current?.getBoundingClientRect();
    if(be&&qr){triggerHaptic(50);setFb({i:bi,t:ans,sx:be.left,sy:be.top,sw:be.width,sh:be.height,tx:qr.left+qr.width/2-be.width/2,ty:qr.top+qr.height/2-be.height/2,ok})}
    setTimeout(()=>{
      if(ok){triggerHaptic(80);const bp=cq.golden?20:10;let fp=bp,cm=sk.m;
        if(upper()){if(sk.active){const nm=Math.min(sk.m+1,5);setSk(p=>({...p,active:true,m:nm,t:5000,mx:5000}));fp=bp*nm;cm=nm}else{setSk({active:true,m:2,t:5000,mx:5000});fp=bp*2;cm=2}}else if(sk.active)fp=bp*sk.m;
        okSnd(cm);setSc(p=>p+fp);setCb(p=>p+1);setCa(p=>[...p,{question:cq,userAnswer:ans}]);setAc(p=>new Set([...p,cq.id]));setShkQ(true);
        if(qr){setSpop({x:qr.left+qr.width/2,y:qr.top,p:fp,s:sk.active});spark(qr.left+qr.width/2,qr.top+qr.height/2,'confetti',15)}
        let m='';if(!isM){const rem=qs.length-1-qi;if(rem===2)m=MSG.final[3];else if(rem===1)m=MSG.final[2];else if(rem===0)m=MSG.final[1];else m=cm>=5?rMsg(MSG.streak):rMsg(MSG.correct)}else m=cm>=5?rMsg(MSG.streak):rMsg(MSG.correct);
        showFB(true,m);
      }else{setShk(2);triggerHaptic(300);ngSnd();setLv(p=>p-1);setCb(0);setSk({active:false,m:1,t:0,mx:5000});if(!ac.has(cq.id))setQs(p=>[...p,cq]);setWa(p=>[...p,{question:cq,userAnswer:ans}]);if(qr)spark(qr.left+qr.width/2,qr.top+qr.height/2,'confetti',20);showFB(false,rMsg(MSG.wrong))}
      setTimeout(()=>{setShkQ(false);setShk(0);setFb(null);setSpop(null)},300);
    },300);
  };

  const miss=()=>{ngSnd();triggerHaptic(200);setShk(1);setLv(p=>p-1);setCb(0);setSk({active:false,m:1,t:0,mx:5000});if(cq&&!ac.has(cq.id))setQs(p=>[...p,cq]);if(cq)setWa(p=>[...p,{question:cq,userAnswer:null}]);showFB(false,"⏰ خلص الوقت!");setTimeout(()=>setShk(0),500)};
  const showFB=(ok,msg)=>{setFdback({show:true,ok,msg});setTimeout(()=>{setFdback({show:false,ok:false,msg:''});if(lv<=1&&!ok)setGs('results');else nxt()},1000)};
  const nxt=()=>{const ni=qi+1;if(!isM){setPg((ni/qs.length)*100);if(ni>=qs.length){setGs('results');return}setQi(ni);setCq(qs[ni])}else{if(ni>=qs.length-1){const more=QS.map(q=>({...q,id:q.id+Date.now(),options:[...q.options].sort(()=>Math.random()-0.5)}));setQs(p=>[...p,...more])}setQi(ni);setCq(qs[ni]||qs[0])}setQy(100);setDOpts([])};
  const freeze=()=>{if(pw.freeze<=0||fz||gs!=='playing'||fdback.show)return;triggerHaptic(50);snd(600,'sine',0.2,0.5);setPw(p=>({...p,freeze:p.freeze-1}));setFz(true);fzRef.current=setTimeout(()=>setFz(false),5000)};
  const bomb=()=>{if(pw.bomb<=0||gs!=='playing'||fdback.show||!cq)return;triggerHaptic(50);snd(400,'square',0.15,0.2);setPw(p=>({...p,bomb:p.bomb-1}));const w=cq.options.filter(o=>o!==cq.a);setDOpts(w.sort(()=>Math.random()-0.5).slice(0,2))};

  const bg=dk?'bg-slate-900':'bg-slate-50',tx=dk?'text-white':'text-slate-800',cd=dk?'bg-slate-800 border-slate-700':'bg-white border-slate-200';

  return(
    <div className={`min-h-[100dvh] w-full ${bg} overflow-hidden select-none ${shk===1?'animate-shake':shk===2?'animate-hardShake':''}`} style={{fontFamily:"'Cairo',sans-serif",fontWeight:'700',touchAction:'none'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Nunito:wght@400;700;900&family=Tajawal:wght@400;700;900&display=swap');
        @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}
        @keyframes hardShake{0%,100%{transform:translate(0,0)}10%{transform:translate(-10px,-10px)}30%{transform:translate(10px,10px)}50%{transform:translate(-10px,5px)}70%{transform:translate(10px,-10px)}90%{transform:translate(-5px,10px)}}
        @keyframes shakeQ{0%,100%{transform:translateX(-50%) scale(1)}20%{transform:translateX(calc(-50% - 10px)) scale(1.02)}40%{transform:translateX(calc(-50% + 10px)) scale(0.98)}60%{transform:translateX(calc(-50% - 8px)) scale(1.01)}80%{transform:translateX(calc(-50% + 8px)) scale(0.99)}}
        @keyframes popIn{0%{transform:scale(0) rotate(-10deg);opacity:0}50%{transform:scale(1.1) rotate(5deg)}100%{transform:scale(1) rotate(0);opacity:1}}
        @keyframes fire{0%,100%{transform:scale(1) rotate(-3deg)}50%{transform:scale(1.2) rotate(3deg)}}
        @keyframes goldenPulse{0%,100%{box-shadow:0 8px 0 #d97706,0 0 30px rgba(251,191,36,0.5)}50%{box-shadow:0 8px 0 #d97706,0 0 50px rgba(251,191,36,0.8)}}
        @keyframes scoreUp{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-150%) scale(1.5)}}
        @keyframes spinProjectile{0%{transform:translate(0,0) rotate(0deg)}100%{transform:translate(var(--tx),var(--ty)) rotate(360deg) scale(0.5)}}
        @keyframes neonPulse{0%,100%{box-shadow:inset 0 0 20px rgba(236,72,153,0.5)}50%{box-shadow:inset 0 0 50px rgba(168,85,247,0.8)}}
        .animate-shake{animation:shake 0.5s ease-out}.animate-hardShake{animation:hardShake 0.4s ease-in-out}.animate-shakeQ{animation:shakeQ 0.4s ease-out}.animate-popIn{animation:popIn 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)}.animate-fire{animation:fire 0.3s infinite}.animate-scoreUp{animation:scoreUp 0.8s ease-out forwards}.fever-mode{animation:neonPulse 1s infinite alternate}
      `}</style>

      <div className={`fixed inset-0 pointer-events-none transition-all ${dk?'bg-slate-900':'bg-sky-50'} ${sk.active&&sk.m>=5?'fever-mode':''}`}><div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:`radial-gradient(${dk?'#fff':'#000'} 1px,transparent 1px)`,backgroundSize:'30px 30px'}}/></div>

      {pts.map(p=><div key={p.id} className="fixed pointer-events-none z-[500]" style={{left:p.x,top:p.y,width:p.size,height:p.size,backgroundColor:p.color,opacity:p.life,transform:`scale(${p.life})`,borderRadius:p.tp==='coin'?'50%':'2px',border:p.tp==='coin'?'2px solid #f59e0b':'none'}}/>)}
      {spop&&<div className="fixed z-[400] pointer-events-none font-black text-4xl animate-scoreUp" style={{left:spop.x,top:spop.y,transform:'translate(-50%,-50%)'}}><span className={spop.s?'text-orange-500':'text-emerald-500'} style={{textShadow:'2px 2px 0px white'}}>+{spop.p}</span></div>}

      {gs==='menu'&&<div className="fixed inset-0 flex items-center justify-center p-4 z-50"><div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-4 ${cd} relative overflow-hidden flex flex-col`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none"><div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-3xl -top-10 -right-10 animate-pulse"/></div>
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="text-center mb-6"><div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg animate-bounce"><span className="text-4xl">🎮</span></div><h1 className="text-3xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-1" style={{fontFamily:'Nunito'}}>KHTMTHA</h1><p className={`text-sm font-bold ${dk?'text-slate-400':'text-slate-500'}`} style={{fontFamily:'Tajawal'}}>أجب قبل ما يوصل السؤال!</p></div>
          <div className="space-y-2 mb-6 text-sm" style={{fontFamily:'Tajawal'}}>{[
            {i:'⚡',t:'COMBO',d:'جاوب بالنصف العلوي!'},
            {i:'❄️',t:'تجميد',d:'5 ثواني توقف (2x)'},
            {i:'💣',t:'قنبلة',d:'احذف جوابين (1x)'},
            {i:'💔',t:isM?'10 أرواح':'3 أرواح',d:isM?'لا نهائية!':'الخطأ يرجع السؤال!'},
          ].map((x,i)=><div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl ${dk?'bg-slate-700/50':'bg-slate-100'}`}><span className="text-xl w-8 text-center">{x.i}</span><div className="flex-1 text-right" dir="rtl"><span className="font-black ml-2">{x.t}</span><span className="opacity-80">{x.d}</span></div></div>)}</div>
          <div className="flex gap-2 mt-auto">
            <button onClick={startGame} className="flex-1 py-4 rounded-2xl font-black text-xl text-white bg-gradient-to-r from-green-400 to-emerald-500 shadow-xl border-b-[6px] border-emerald-600 active:border-b-0 active:translate-y-[6px] transition-all"><span className="flex items-center justify-center gap-2" style={{fontFamily:'Tajawal'}}><Play className="w-6 h-6 fill-white"/> ابدأ اللعب!</span></button>
            <button onClick={onExit} className={`py-4 px-4 rounded-2xl font-black text-lg border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all ${dk?'bg-slate-700 text-slate-300 border-slate-800':'bg-slate-200 text-slate-600 border-slate-300'}`}><ArrowLeft className="w-6 h-6"/></button>
          </div>
        </div>
      </div></div>}

      {(gs==='playing'||gs==='paused')&&<div className="h-screen flex flex-col relative z-10">
        <div className="flex items-center justify-between px-4 pt-4 pb-2 relative z-50 h-24">
          <div className="flex gap-2 shrink-0">
            <button onClick={()=>setGs('paused')} className={`w-12 h-12 rounded-xl shadow-md flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-1 ${dk?'bg-slate-800 border-slate-700':'bg-white border-slate-200'}`}><Pause className={`w-6 h-6 fill-current ${dk?'text-slate-200':'text-slate-700'}`}/></button>
            <button onClick={tFS} className={`w-12 h-12 rounded-xl shadow-md flex items-center justify-center border-b-4 active:border-b-0 active:translate-y-1 ${dk?'bg-slate-800 border-slate-700':'bg-white border-slate-200'}`}>{fs?<Minimize className={`w-6 h-6 ${dk?'text-slate-200':'text-slate-700'}`}/>:<Maximize className={`w-6 h-6 ${dk?'text-slate-200':'text-slate-700'}`}/>}</button>
          </div>
          {!isM&&<div className="flex-1 mx-3 h-6 relative"><div className={`w-full h-full border-2 border-slate-400/50 rounded-full relative overflow-hidden shadow-inner ${dk?'bg-slate-700/50':'bg-slate-300/50'}`}><div className={`h-full transition-all duration-500 rounded-l-full ${pg>80?'bg-gradient-to-r from-orange-600 to-red-600 animate-pulse':pg>50?'bg-gradient-to-r from-yellow-400 to-orange-500':'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'}`} style={{width:`${pg}%`}}/></div></div>}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-xl border-2 shadow-sm ${dk?'bg-slate-800 border-slate-600':'bg-white border-slate-200'}`}><span className="text-yellow-500 text-xs font-black">XP</span><span className={`text-xl font-black ${tx}`}>{sc.toLocaleString()}</span></div>
            {isM?<div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 shadow-sm ${dk?'bg-slate-800 border-slate-600':'bg-white border-slate-200'}`}><Heart className="w-5 h-5 text-rose-500 fill-rose-500"/><span className={`text-lg font-black ${tx}`}>{lv}</span></div>
            :<div className="flex gap-0.5">{[1,2,3].map(i=><span key={i} className={`text-sm ${i<=lv?'opacity-100':'opacity-30'}`}>❤️</span>)}</div>}
          </div>
        </div>
        <div ref={gaRef} className="flex-1 relative overflow-visible">
          {sk.active&&<div className="absolute bottom-32 left-4 z-30 animate-popIn"><div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-lg border-4 ${sk.m>=5?'bg-gradient-to-br from-red-600 to-orange-600 border-orange-400':sk.m>=4?'bg-gradient-to-br from-orange-500 to-amber-500 border-amber-300':'bg-gradient-to-br from-blue-500 to-indigo-500 border-indigo-300'}`}><span className="text-white text-xl font-black leading-none">{sk.m}X</span><span className="text-[9px] font-bold text-white/90">COMBO</span><svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"><circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/><circle cx="32" cy="32" r="28" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray={175} strokeDashoffset={175-(175*sk.t/sk.mx)}/></svg></div></div>}
          {cb>=2&&<div className="absolute bottom-32 right-4 z-30 flex flex-col items-center animate-popIn"><span className="text-5xl block animate-fire">🔥</span><span className="absolute top-full left-1/2 -translate-x-1/2 text-white bg-orange-500 text-xs font-black px-2 py-0.5 rounded shadow-lg">{cb}x</span></div>}
          {cq&&<div ref={qRef} className={`absolute left-1/2 -translate-x-1/2 w-[90%] max-w-sm p-6 rounded-3xl text-center transition-transform ${shkQ?'animate-shakeQ':''} ${fz?'bg-cyan-500 border-cyan-300':cq.golden?'bg-amber-400 border-amber-200':(dk?'bg-slate-800 border-slate-600':'bg-white border-slate-200')} border-b-[8px] border-x-2 border-t-2`} style={{top:qy,boxShadow:'0 20px 40px -10px rgba(0,0,0,0.2)',animation:cq.golden&&!fz?'goldenPulse 1.5s infinite':undefined}}>
            <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2">{cq.golden&&<span className="bg-yellow-100 text-yellow-800 text-xs font-black px-3 py-1 rounded-full border border-yellow-300">GOLDEN</span>}{fz&&<span className="bg-cyan-100 text-cyan-800 text-xs font-black px-3 py-1 rounded-full border border-cyan-300 animate-pulse">FROZEN</span>}</div>
            <p className={`text-xl font-black leading-snug ${fz?'text-white':cq.golden?'text-amber-900':tx}`}>{cq.q}</p>
          </div>}
        </div>
        <div className="flex justify-center gap-6 pb-2 relative z-20">
          <button onClick={freeze} disabled={pw.freeze<=0||fz} className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 active:scale-90 ${pw.freeze<=0||fz?'opacity-30 grayscale':'hover:scale-105'} ${dk?'bg-slate-700 border-slate-600':'bg-white border-slate-100'}`}>❄️<span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{pw.freeze}</span></button>
          <button onClick={bomb} disabled={pw.bomb<=0} className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg border-4 active:scale-90 ${pw.bomb<=0?'opacity-30 grayscale':'hover:scale-105'} ${dk?'bg-slate-700 border-slate-600':'bg-white border-slate-100'}`}>💣<span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{pw.bomb}</span></button>
        </div>
        <div className={`p-4 pb-8 rounded-t-[3rem] border-t backdrop-blur-md ${dk?'bg-slate-800/40 border-white/5':'bg-white/40 border-white/40'}`}><div className="grid grid-cols-2 gap-3 max-w-md mx-auto">{cq?.options.map((o,i)=>{const dis=dOpts.includes(o),fly=fb?.i===i;return(
          <button key={i} ref={el=>oRefs.current[i]=el} onClick={()=>!dis&&answer(o,i)} disabled={dis||fdback.show||fb!==null}
            className={`relative py-5 px-3 rounded-2xl font-black text-lg transition-all border-b-[6px] active:border-b-0 active:translate-y-[6px] active:scale-95 ${fly?'opacity-0':dis?'opacity-30 grayscale pointer-events-none':dk?'bg-slate-700 text-white border-slate-900':'bg-white text-slate-800 border-slate-300'} shadow-xl`}>{o}</button>)})}</div></div>
        {fb&&<div className={`fixed z-[300] rounded-2xl font-black text-lg flex items-center justify-center border-4 ${fb.ok?'bg-emerald-500 text-white border-emerald-600':'bg-rose-500 text-white border-rose-600'}`} style={{left:fb.sx,top:fb.sy,width:fb.sw,height:fb.sh,'--tx':`${fb.tx-fb.sx}px`,'--ty':`${fb.ty-fb.sy}px`,animation:'spinProjectile 0.35s ease-in forwards'}}>{fb.t}</div>}
      </div>}

      <PauseMenu isOpen={gs==='paused'} onResume={()=>setGs('playing')} onExit={onExit} speedMode={sm} setSpeed={setSm} muted={mt} setMuted={setMt} dark={dk} setDark={setDk}/>

      {gs==='results'&&<div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-popIn"><div className={`w-full max-w-sm p-6 rounded-[2rem] shadow-2xl border-2 ${cd} max-h-[90vh] overflow-y-auto`} style={{scrollbarWidth:'none'}}>
        <div className="text-center mb-6"><span className="text-6xl block mb-2">{sc>50?'👑':'😎'}</span><h2 className={`text-3xl font-black ${tx}`} style={{fontFamily:"'Cairo'"}}>النتيجة النهائية</h2></div>
        <div className={`p-6 rounded-2xl mb-6 text-center shadow-inner ${dk?'bg-slate-700':'bg-slate-200'}`}><span className="text-sm text-slate-500 font-bold uppercase tracking-widest">Total Score</span><div className={`text-6xl font-black mt-2 ${dk?'text-white':'text-slate-800'}`}>{sc}</div></div>
        <div className="grid grid-cols-2 gap-3 mb-6"><div className="bg-green-100 p-3 rounded-xl text-center border-2 border-green-200"><span className="block text-xs font-bold text-green-700 mb-1">إجابات صحيحة</span><span className="text-3xl font-black text-green-600">{ca.length}</span></div><div className="bg-red-100 p-3 rounded-xl text-center border-2 border-red-200"><span className="block text-xs font-bold text-red-700 mb-1">إجابات خاطئة</span><span className="text-3xl font-black text-red-600">{wa.length}</span></div></div>
        {wa.length>0&&<div className="mb-4 max-h-40 overflow-y-auto bg-white rounded-xl p-3 border border-slate-200" style={{scrollbarWidth:'none'}}><h3 className="font-black text-red-500 mb-2 text-base text-right">الأخطاء ({wa.length})</h3>{wa.map((x,i)=><div key={i} className="text-right text-sm border-b border-slate-100 last:border-0 py-3"><p className="font-black mb-1 text-slate-800 text-base">{x.question.q}</p><div className="flex justify-end gap-2 mb-1"><span className="text-green-600 font-black text-sm bg-green-100 px-2 py-0.5 rounded">{x.question.a} ✓</span><span className="text-red-500 font-bold line-through opacity-70">{x.userAnswer||'وقت'}</span></div><p className="text-slate-600 italic bg-slate-50 p-2 rounded font-bold text-xs">💡 {x.question.explanation||'لا يوجد شرح.'}</p></div>)}</div>}
        <button onClick={startGame} className="w-full py-4 rounded-xl font-black text-xl text-white bg-emerald-500 shadow-lg mb-3 hover:scale-105 transition-transform">لعب مرة أخرى</button>
        <button onClick={onExit} className={`w-full py-4 rounded-xl font-bold ${dk?'text-slate-400 hover:bg-slate-700':'text-slate-500 hover:bg-slate-100'}`}>العودة</button>
      </div></div>}

      {fdback.show&&<div className="fixed inset-0 flex items-center justify-center z-[400] pointer-events-none px-4"><div className={`relative p-6 rounded-[2rem] shadow-2xl text-center border-4 animate-popIn max-w-[90vw] ${fdback.ok?'bg-emerald-500 border-white text-white rotate-2':'bg-rose-500 border-white text-white -rotate-2'}`}><div className="text-6xl mb-2">{fdback.ok?'🤩':'😱'}</div><p className="text-xl font-black whitespace-pre-line" style={{fontFamily:"'Cairo'"}}>{fdback.msg}</p></div></div>}
    </div>
  );
};

const SoftBg = ({dk}) => <div className={`fixed inset-0 -z-10 transition-colors ${dk?'bg-[#1E1B2E]':'bg-[#FFFBF5]'}`}><div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[60px] opacity-15 ${dk?'bg-purple-900':'bg-[#FFE4E6]'}`}/><div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[60px] opacity-15 ${dk?'bg-indigo-900':'bg-[#E0F2FE]'}`}/></div>;
const Toast = ({msg,vis,type='info'}) => <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[150] transition-all w-[90%] max-w-sm ${vis?'translate-y-0 opacity-100':'-translate-y-10 opacity-0 pointer-events-none'}`}><div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border-b-4 backdrop-blur-md justify-center text-center ${type==='fire'?'bg-orange-500 border-orange-700 text-white':'bg-blue-600 border-blue-800 text-white'}`}><span className="font-bold text-sm">{msg}</span></div></div>;
const TipOverlay = ({title,text,onClose}) => <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60" onClick={onClose}><div className={`bg-white p-6 rounded-[2rem] max-w-sm w-full shadow-2xl border-4 border-yellow-400 relative`} onClick={e=>e.stopPropagation()} style={{animation:'popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)'}}><div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white"><Info className="w-7 h-7 text-yellow-900"/></div><div className="mt-4 text-center"><h3 className="text-xl font-black mb-2 text-slate-800">{title}</h3><p className="text-slate-600 font-bold text-sm leading-relaxed mb-6">{text}</p><button onClick={onClose} className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-xl font-black shadow-lg w-full">فهمت عليك! 👍</button></div></div></div>;
const StatsHUD = ({ isDarkMode, compact = false, onFlameClick = () => {}, onQuestionsClick = () => {}, isGuest }) => {
  const displayDays = isGuest ? 0 : 7;
  const displayQuestions = isGuest ? 0 : 54;
  const displayXP = isGuest ? 0 : 1250;

  if (compact) {
    return (
      <div className={`w-full mb-6 p-3 px-5 rounded-2xl border-2 flex items-center justify-between shadow-sm animate-fade-in-up ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
        <div onClick={onFlameClick} className="flex items-center gap-3 cursor-pointer active:scale-90 transition-transform">
          <Flame className={`w-6 h-6 ${isGuest ? 'text-slate-400' : 'text-orange-500 fill-orange-500 animate-pulse'}`} />
          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayDays}</span>
        </div>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
        <div onClick={onQuestionsClick} className="flex items-center gap-3 cursor-pointer active:scale-90 transition-transform">
          <Target className={`w-6 h-6 ${isGuest ? 'text-slate-400' : 'text-blue-400'}`} />
          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayQuestions}</span>
        </div>
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-3">
          <Star className={`w-6 h-6 ${isGuest ? 'text-slate-400' : 'text-yellow-400 fill-yellow-400'}`} />
          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayXP}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg mx-auto mb-6 p-3 rounded-2xl border-2 border-b-4 flex items-center justify-between relative overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0] shadow-sm'}`}>
      <div onClick={(e) => { e.stopPropagation(); onFlameClick(); }} className="flex-1 flex flex-col items-center justify-center relative group cursor-pointer active:scale-95 transition-transform">
        <div className="flex items-center gap-1 mb-0.5">
          <div className={`p-1.5 rounded-lg ${isGuest ? 'bg-slate-100 dark:bg-slate-700' : 'bg-orange-100'}`}>
            <Flame className={`w-4 h-4 ${isGuest ? 'text-slate-400' : 'text-orange-500 fill-orange-500 animate-pulse'}`} />
          </div>
          <span className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayDays}</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">أيام</span>
      </div>
      
      <div className="w-0.5 h-8 bg-slate-100 dark:bg-slate-700/50 rounded-full" />
      
      <div onClick={(e) => { e.stopPropagation(); onQuestionsClick(); }} className="flex-[1.5] flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
        <div className="flex items-baseline gap-1 mb-0.5">
          <span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayQuestions}</span>
          <span className="text-xs font-bold text-slate-400">/10k</span>
          <Target className={`w-3.5 h-3.5 ml-1 ${isGuest ? 'text-slate-400' : 'text-blue-400'}`} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">سؤال</span>
      </div>
      
      <div className="w-0.5 h-8 bg-slate-100 dark:bg-slate-700/50 rounded-full" />
      
      <div className="flex-1 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform">
        <div className="flex items-center gap-1 mb-0.5">
          <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{displayXP}</span>
          <Star className={`w-4 h-4 ${isGuest ? 'text-slate-400' : 'text-yellow-400 fill-yellow-400'}`} />
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XP</span>
      </div>
    </div>
  );
};

// Tutorial hand moved to `src/components/TutorialHand.jsx`

// ToastNotification - Improved notification component
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
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10" />
        {Icon && <Icon className={`w-6 h-6 shrink-0 ${type === 'love' ? 'animate-pulse' : 'animate-bounce'}`} />}
        <span className="font-bold text-sm leading-snug">{message}</span>
      </div>
    </div>
  );
};

// BottomDock component (replaces inline dock)
const BottomDock = ({ isDarkMode, onTaskClick = ()=>{}, onMistakeClick = ()=>{} }) => {
  const [taskState, setTaskState] = useState(0); 
  const [mistakesOpen, setMistakesOpen] = useState(false);
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
            <div className={`absolute bottom-full left-0 mb-3 w-48 p-4 rounded-3xl border-2 border-b-4 shadow-xl animate-slide-up origin-bottom-left ${isDarkMode ? 'bg-[#2A2640] border-[#3E3859]' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>حقيبة الأخطاء</h3>
                <button onClick={() => setMistakesOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <p className="text-xs text-slate-500 mb-3">لديك <span className="text-amber-500 font-bold">3</span> أخطاء سابقة.</p>
              <button className="w-full py-2 bg-amber-400 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 text-white rounded-xl text-xs font-bold shadow-sm transition-all">راجعها الآن</button>
            </div>
          )}
          <TactileButton 
            onClick={(e) => {
              if (onMistakeClick && onMistakeClick(e) === false) return;
              setMistakesOpen(!mistakesOpen);
            }}
            className="w-16 h-16 rounded-[20px] flex flex-col gap-1"
            colorClass={isDarkMode ? 'bg-yellow-500' : 'bg-[#FCD34D]'} 
            borderClass={isDarkMode ? 'border-yellow-700' : 'border-yellow-700'}
          >
             <Briefcase className="w-6 h-6 text-amber-800" />
             <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm animate-bounce">3</span>
          </TactileButton>
        </div>
        <TactileButton 
          onClick={(e) => { 
            if(onTaskClick(e) !== false) {
               setTaskState(prev => prev >= 2 ? 0 : prev + 1);
            }
          }}
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

// Simple review accordion used in Reviews view
const ReviewAccordion = ({title, summary, details, defaultOpen=false}) => {
  const [open,setOpen]=useState(defaultOpen);
  return (
    <div className={`w-full rounded-2xl border-2 p-4 ${open?'bg-white/90 shadow-lg':'bg-transparent'} relative` }>
      <button onClick={()=>setOpen(o=>!o)} className="w-full text-right flex items-center justify-between gap-4">
        <div className="flex flex-col items-end"><span className="font-black text-right">{title}</span><span className="text-xs text-slate-400">{summary}</span></div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"><ChevronDown className={`w-4 h-4 transition-transform ${open?'rotate-180':''}`}/></div>
      </button>
      {open&&<div className="mt-3 text-right text-sm text-slate-700">{details}</div>}
    </div>
  );
};

// Reviews view component
const ReviewsView = ({ isDarkMode, onBack, isGuest, onShowLogin }) => {
  const [expandedReview, setExpandedReview] = useState(null);
  const toggleReview = (id) => setExpandedReview(expandedReview === id ? null : id);

  const chapters = [1,2,3,4,5,6,7,8];
  const chapterParts = [
    { id: 1, title: 'الجزء الأول', status: 'completed' },
    { id: 2, title: 'الجزء الثاني', status: 'unlocked' },
    { id: 3, title: 'الجزء الثالث', status: 'locked' }
  ];

  const renderSpecialReview = (type, title, colorTheme) => (
    <div className="mb-4">
      <TactileButton 
        onClick={() => toggleReview(type)}
        className={`w-full p-5 flex items-center justify-between rounded-[24px] z-10 relative overflow-hidden`}
        colorClass={colorTheme.bg}
        borderClass={colorTheme.border}
      >
        <div className="absolute top-0 right-0 p-2 opacity-10"><Zap className="w-24 h-24 text-white" /></div>
        <div className="flex items-center gap-4 z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 bg-white/20 border-white/40 text-white`}>
            {type === 'midyear' ? <Zap className="w-8 h-8 fill-current" /> : <InfinityIcon className="w-8 h-8" />}
          </div>
          <div className="text-right text-white">
            <span className="block text-xl font-black">{title}</span>
            <span className="text-xs opacity-80 font-bold">{expandedReview === type ? 'اختر الجزء' : 'اضغط للفتح'}</span>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 bg-white/20 text-white ${expandedReview === type ? '-rotate-90' : ''}`}>
          <ChevronLeft className="w-5 h-5" />
        </div>
      </TactileButton>
    </div>
  );

  return (
    <div className="animate-fade-in-up pb-32">
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
          <TactileButton onClick={onShowLogin} className="w-48 mx-auto p-3 rounded-xl mt-6" colorClass="bg-yellow-400" borderClass="border-yellow-600">
            <span className="font-bold text-yellow-900">تسجيل الدخول</span>
          </TactileButton>
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((chapterNum) => (
            <div key={chapterNum} className="transition-all duration-300">
              <TactileButton 
                onClick={() => toggleReview(chapterNum)}
                className={`w-full p-5 flex items-center justify-between rounded-[24px] z-10 relative ${expandedReview === chapterNum ? (isDarkMode ? 'bg-slate-800' : 'bg-indigo-50 border-indigo-200') : ''}`}
                colorClass={isDarkMode ? 'bg-slate-800' : 'bg-white'}
                borderClass={isDarkMode ? 'border-slate-700' : 'border-slate-100'}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 ${chapterNum === 1 ? 'bg-yellow-100 border-yellow-300 text-yellow-600' : (isDarkMode ? 'bg-slate-700 border-slate-600 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500')}`}>
                    {chapterNum === 1 ? <Crown className="w-7 h-7 fill-current animate-pulse" /> : <Zap className="w-7 h-7" />}
                  </div>
                  <div className="text-right">
                    <span className={`block text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>الفصل {chapterNum}</span>
                    <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>{expandedReview === chapterNum ? 'اختر الجزء للمراجعة' : 'اضغط للفتح'}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-slate-50 text-slate-400'} ${expandedReview === chapterNum ? '-rotate-90' : ''}`}>
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </TactileButton>
              {expandedReview === chapterNum && (
                <div className="mt-3 grid grid-cols-1 gap-3 pl-2 animate-slide-up">
                  {chapterParts.map((part) => (
                    <TactileButton key={part.id} disabled={part.status === 'locked'} className={`w-full p-4 flex items-center justify-between rounded-xl relative overflow-hidden ${part.status === 'locked' ? 'opacity-60 grayscale' : ''}`} colorClass={part.status === 'completed' ? (isDarkMode ? 'bg-emerald-900/30' : 'bg-emerald-50') : 'bg-white'} borderClass={'border-slate-200'}>
                      <div className="flex items-center gap-4 z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${part.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {part.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-black text-xl">{part.id}</span>}
                        </div>
                        <div className="text-right">
                          <span className={`block font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{part.title}</span>
                        </div>
                      </div>
                    </TactileButton>
                  ))}
                </div>
              )}
            </div>
          ))}
          {renderSpecialReview('comprehensive', 'المراجعة الشاملة', { bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', border: 'border-indigo-700' })}
        </div>
      )}
    </div>
  );
};

// BattleArena modal component (detailed Hero Student version)
const BattleArenaModal = ({ isOpen, onClose, onStart, dk, chapterScores = {}, playerName = 'اللاعب', onShare }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showVsTutorial, setShowVsTutorial] = useState(true);

  if (!isOpen) return null;

  // Theme constants
  const bgCard = dk ? 'bg-[#1E293B]' : 'bg-white';
  const textPrimary = dk ? 'text-white' : 'text-slate-900';
  const textSecondary = dk ? 'text-slate-400' : 'text-slate-500';
  const accentColor = 'text-[#F59E0B]';
  const primaryColor = 'bg-[#3B82F6]';

  const handleShare = (chapterName, score) => {
    if (typeof onShare === 'function') {
      onShare(`تحدي ختمتها!`, `المحارب (${playerName}) حقق ${score} XP.. هل تقبل التحدي؟`, { chapter: chapterName, score });
      return;
    }
    // fallback: copy text to clipboard
    try { navigator?.clipboard?.writeText(`${playerName} تحداك في ${chapterName} - ${score} XP`); } catch (e) {}
  };

  let firstScoreFound = false;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-sm ${dk ? 'bg-slate-900/80' : 'bg-slate-200/50'}`}>
      <div className={`relative w-full max-w-md p-6 pb-8 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300 animate-pop-in ${bgCard} ${dk ? 'shadow-black/50 border border-slate-700' : 'shadow-xl border border-slate-100'}`}>
        <div className={`w-8 h-1 rounded-full mx-auto mb-6 opacity-20 ${dk ? 'bg-white' : 'bg-slate-900'}`}></div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h3 className={`text-2xl font-black ${textPrimary} tracking-tight leading-none flex items-center gap-2`}><GraduationCap className={`w-7 h-7 ${accentColor}`} /> ساحة التحدي</h3>
            <div className="flex items-center gap-1.5 mt-1"><span className={`text-xs font-bold ${textSecondary}`}>اختر التحدي الدراسي</span><Flame className="w-3 h-3 text-orange-500 fill-orange-500 animate-pulse" /></div>
          </div>
          <button onClick={onClose} className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${dk ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-slate-100 hover:bg-slate-200'}`}><X className={`w-5 h-5 ${textPrimary}`} /></button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[1,2,3,4,5,6,7,8].map((num) => {
            const score = chapterScores[num] || 0;
            const hasScore = score > 0;
            const isSelected = selectedChapter === num;

            let isTargetForTutorial = false;
            if (hasScore && !firstScoreFound) { firstScoreFound = true; isTargetForTutorial = true; }

            return (
              <div key={num} className="relative group h-28">
                <TactileButton onClick={() => setSelectedChapter(num)} className={`w-full h-full flex-col !gap-0 !rounded-[20px] border-none transition-all ${isSelected ? `${primaryColor} text-white shadow-lg shadow-blue-500/30 -translate-y-1` : hasScore ? (dk ? 'bg-[#334155] hover:bg-[#475569]' : 'bg-slate-100 hover:bg-slate-200') : (dk ? 'bg-[#1E293B]' : 'bg-slate-50')}`}>
                  <div className="flex-1 flex flex-col items-center justify-center w-full">
                    <span className={`text-[10px] font-bold mb-0.5 ${!isSelected && !hasScore ? 'opacity-30' : 'opacity-80'}`}>الفصل</span>
                    <span className={`text-3xl font-black leading-none mb-1 ${!isSelected && !hasScore ? 'opacity-30' : ''}`}>{num}</span>
                    <div className="mt-2 h-5 flex items-center justify-center">
                      {hasScore ? (
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-black/5 dark:bg-white/10'}`}>
                          <Star className={`w-3 h-3 ${isSelected ? 'text-yellow-300 fill-current' : 'text-yellow-500 fill-current'}`} />
                          <span className={`text-[9px] font-black ${isSelected ? 'text-white' : (dk ? 'text-slate-300' : 'text-slate-600')}`}>{score > 999 ? (score/1000).toFixed(1) + 'k' : score}</span>
                                               </div>
                      ) : (<Lock className={`w-3 h-3 ${dk ? 'text-slate-600' : 'text-slate-400'}`} />)}
                    </div>
                  </div>
                </TactileButton>

                {hasScore && (
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-30">
                    <button onClick={(e)=>{ e.stopPropagation(); handleShare(`الفصل ${num}`, score); }} className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-[3px] ${dk ? 'border-[#1E293B] bg-white text-slate-900' : 'border-white bg-slate-900 text-white'}`}>
                      <span className="text-[9px] font-black italic">VS</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative w-full mt-2">
          <TactileButton className={`w-full p-0 !rounded-[28px] overflow-hidden group border-none ${dk ? 'bg-[#6D28D9]' : 'bg-[#7C3AED]'}`} onClick={()=>onStart?.('endless')}>
            <div className="w-full p-5 flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"><InfinityIcon className="w-7 h-7 text-white" /></div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1"><span className="text-xl font-black text-white">التحدي الشامل</span></div>
                  <div className="flex items-center gap-1.5 text-white/90"><Star className="w-3.5 h-3.5 text-yellow-300 fill-current" /><span className="text-xs font-bold">Max XP: <span className="text-white font-black">12,500</span></span></div>
                </div>
              </div>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform text-[#6D28D9]"><Play className="w-5 h-5 fill-current ml-0.5" /></div>
            </div>
          </TactileButton>
        </div>
      </div>
    </div>
  );
};
export default function App() {
  const [dk,setDk]=useState(false);
  const [loggedIn,setLoggedIn]=useState(false);
  const [guest,setGuest]=useState(false);
  const [userData,setUserData]=useState({name:'',age:'',gender:'',governorate:''});
  const [view,setView]=useState('home');
  const [selCh,setSelCh]=useState(1);
  const [subOpen,setSubOpen]=useState(false);
  const [selSub,setSelSub]=useState({name:'English',icon:EnIcon});
  const [monsterOpen,setMonsterOpen]=useState(false);
  const [profOpen,setProfOpen]=useState(false);
  const [showTutorial,setShowTutorial]=useState(false);
  const [loginModal,setLoginModal]=useState(false);
  const [toast,setToast]=useState({vis:false,msg:'',type:'info'});
  const [aTip,setATip]=useState(null);
  const [seenTips,setSeenTips]=useState({});
  const [activeGame,setActiveGame]=useState(null);
  const [regStep,setRegStep]=useState(0);
  const [form,setForm]=useState({name:'',age:'',gender:'',gov:''});
  const [feedbackOpen,setFeedbackOpen]=useState(false);

  // States for profile menu
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const showToast=(m,t='info')=>{setToast({vis:true,msg:m,type:t});setTimeout(()=>setToast(p=>({...p,vis:false})),3500)};
  const handleLogin=(data,g=false)=>{setLoggedIn(true);setGuest(g);setUserData(data);if(!g){try{localStorage.setItem('khatemtha_userData',JSON.stringify(data))}catch(e){}}if(g)showToast('أهلاً بك كضيف! جرب المرحلة الأولى مجاناً 🎁', 'info')};
  const handleLogout=()=>{setLoggedIn(false);setGuest(false);setProfOpen(false);setUserData({name:'',age:'',gender:'',governorate:''});setView('home');try{localStorage.removeItem('khatemtha_userData')}catch(e){}};
  const featureClick=(f)=>{if(!seenTips[f]&&!guest){setATip(f);setSeenTips(p=>({...p,[f]:true}));return false}return true};

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Load saved user data from localStorage on app init
  useEffect(() => {
    try {
      const saved = localStorage.getItem('khatemtha_userData');
      if (saved) {
        const userData = JSON.parse(saved);
        setUserData(userData);
        setLoggedIn(true);
      }
    } catch (e) {}
  }, []);

  // Auto-show tutorial on first run (persist dismissal in localStorage)
  useEffect(()=>{
    try{
      const seen = localStorage.getItem('khatemtha_seenTutorial_v1');
      if(!seen){
        // small delay so UI mounts then show
        setTimeout(()=>setShowTutorial(true),450);
      }
    }catch(e){}
  },[]);

  // persist dismissal
  useEffect(()=>{
    if(!showTutorial){
      try{ localStorage.setItem('khatemtha_seenTutorial_v1','1'); }catch(e){}
    }
  },[showTutorial]);
  const tx=dk?'text-white':'text-slate-800';
  const govs=["بغداد","البصرة","نينوى","أربيل","النجف","كربلاء","كركوك","الأنبار","ديالى","ذي قار","بابل","واسط","ميسان","القادسية","المثنى","صلاح الدين","دهوك","السليمانية"];
  const inp=`w-full p-4 rounded-2xl ${dk?'bg-slate-800 border-slate-700 text-white':'bg-white border-slate-200 text-slate-800'} border-2 font-bold outline-none focus:border-yellow-400 text-center shadow-sm`;

  // Ensure dark mode is applied correctly
  useEffect(() => {
    if (dk) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dk]);

  if(activeGame) return <GameScreen mode={activeGame.mode} onExit={()=>setActiveGame(null)} initDark={dk}/>;

  if(!loggedIn) return(
    <LoginView 
      isDarkMode={dk}
      onLoginSuccess={(data, guestMode) => {
        handleLogin(data, guestMode);
      }}
    />
  );

  return(
    <div dir="rtl" className="min-h-screen font-['Cairo']">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        @keyframes float{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,-20px)}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .animate-fade-in-up{animation:fadeInUp 0.4s ease-out forwards}
        @keyframes popIn{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
        /* Hero-student animations */
        @keyframes pulse-ring { 0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(250, 204, 21, 0.7); } 70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(250, 204, 21, 0); } 100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(250, 204, 21, 0); } }
        .animate-pulse-ring { animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(-25%); } 50% { transform: translateY(0); } }
        .animate-bounce-custom { animation: bounce 1s infinite; }
        @keyframes slide-up { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.28s cubic-bezier(0.165, 0.84, 0.44, 1) both; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.18s ease-out both; }
      `}</style>
      <Toast msg={toast.msg} vis={toast.vis} type={toast.type}/>
      {aTip==='monster'&&<TipOverlay title="مود الوحش ⚔️" text="أسئلة ما تخلص، اتحدى صاحبك وراويه منو السبع! 💪" onClose={()=>setATip(null)}/>}
      {aTip==='chapters'&&<TipOverlay title="خريطة الفصول 🗺️" text="خريطتك الكاملة لكل المنهج.. فصول ومراحل وتحديات!" onClose={()=>setATip(null)}/>}
      {aTip==='reviews'&&<TipOverlay title="الزبدة هنا 🧈" text="مراجعة مركزة تضمنلك الدرجة بأقل وقت." onClose={()=>setATip(null)}/>}

      <div className="px-5 pt-6 pb-2 flex items-center justify-between z-10 relative">
        {/* Profile Button */}
        <div className="relative">
          <TactileButton onClick={()=>setProfOpen(!profOpen)} className="w-12 h-12 rounded-xl" colorClass={dk?'bg-[#2A2640]':'bg-white'} borderClass={dk?'border-[#3E3859]':'border-[#E2E8F0]'}><User className="w-5 h-5 text-indigo-500"/></TactileButton>
          
          {/* Profile Menu Component */}
          <ProfileMenu 
            isOpen={profOpen}
            onClose={() => setProfOpen(false)}
            isDarkMode={dk}
            toggleTheme={() => setDk(!dk)}
            isFullscreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
            onLogout={handleLogout}
            userName={guest ? 'ضيف' : userData.name || 'البطل'}
            userAge={userData.age}
            userGender={userData.gender}
            userGovernorate={userData.governorate}
          />
        </div>
        <TactileButton onClick={()=>setSubOpen(!subOpen)} className="h-12 px-4 rounded-xl gap-2" colorClass={dk?'bg-[#2A2640]':'bg-white'} borderClass={dk?'border-[#3E3859]':'border-[#E2E8F0]'}>
          <selSub.icon className="w-5 h-5 text-blue-500"/><span className={`font-bold text-sm ${tx}`}>{selSub.name}</span><ChevronDown className={`w-4 h-4 text-slate-400 ${subOpen?'rotate-180':''}`}/>
        </TactileButton>
        {subOpen&&<div className={`absolute top-full left-5 mt-2 w-48 p-2 rounded-2xl border-2 shadow-xl z-50 animate-fade-in-up ${dk?'bg-[#2A2640] border-[#3E3859]':'bg-white border-[#E2E8F0]'}`}>
          <button onClick={()=>{setSelSub({name:'English',icon:EnIcon});setSubOpen(false)}} className={`w-full p-3 rounded-xl flex items-center gap-3 font-bold text-sm ${tx}`}><EnIcon className="w-4 h-4"/> English</button>
          <button onClick={()=>{setSelSub({name:'الأحياء',icon:Dna});setSubOpen(false)}} className={`w-full p-3 rounded-xl flex items-center gap-3 font-bold text-sm ${tx}`}><Dna className="w-4 h-4"/> الأحياء</button>
        </div>}
      </div>

      <div className="px-5 pb-40 w-full max-w-lg mx-auto z-0 relative">
        {view==='home'&&<div className="animate-fade-in-up">
          <div className="text-center mt-6 mb-6"><h1 className={`text-5xl font-black mb-1 ${tx}`}>هلا بالبطل</h1><p className={`text-lg font-medium opacity-60 ${tx}`}>{guest?'نسخة التجربة':'جاهز تكسر الرقم القياسي؟'}</p></div>
          {!guest&&<>
            <StatsHUD isDarkMode={dk} isGuest={guest} onFlameClick={() => { showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire'); }} onQuestionsClick={() => { showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info'); }} />
            <Highlight show={showTutorial}>
              {showTutorial && <TutorialHand text={guest ? 'جرب مجاناً هنا' : 'ابدأ رحلتك من هنا'} direction="left" />}
              <MonsterCard isDarkMode={dk} isGuest={guest} onClick={() => { if(featureClick('monster')) setMonsterOpen(true); setShowTutorial(false); showToast('قريباً.. من هنا تكمل آخر درس وصلت اله! 🚀', 'info'); }} />
            </Highlight>
            <div className="grid grid-cols-2 gap-4">
              <TactileButton onClick={()=>{if(featureClick('chapters'))setView('chapters')}} className="aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-4" colorClass={dk?'bg-emerald-600':'bg-[#6EE7B7]'} borderClass={dk?'border-emerald-800':'border-[#059669]'}><div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/20 border-2 border-white/20"><List className="w-8 h-8 text-white" strokeWidth={3}/></div><span className="text-xl font-black text-white">الفصول</span></TactileButton>
              <TactileButton onClick={()=>{if(featureClick('reviews'))setView('reviews')}} className="aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-4" colorClass={dk?'bg-orange-600':'bg-[#FDBA74]'} borderClass={dk?'border-orange-800':'border-[#EA580C]'}><div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-white/20 border-2 border-white/20"><FileText className="w-8 h-8 text-white" strokeWidth={3}/></div><span className="text-xl font-black text-white">مراجعات</span></TactileButton>
            </div>
          </>}
          {guest&&<TactileButton onClick={()=>setActiveGame({mode:'chapter'})} className="w-full p-6 rounded-[32px] mb-6" colorClass="bg-gradient-to-br from-indigo-500 to-blue-600" borderClass="border-indigo-700"><div className="w-full flex items-center justify-between"><div className="flex flex-col items-start gap-1"><span className="text-2xl font-black text-white">جرب التحدي مجاناً 🎮</span><span className="text-sm font-bold text-indigo-100 opacity-90">العب أول مرحلة!</span></div><Play className="w-10 h-10 text-white fill-white"/></div></TactileButton>}
        </div>}

        {view==='chapters'&&<div className="animate-fade-in-up pb-32">
          <StatsHUD isDarkMode={dk} compact isGuest={guest} onFlameClick={() => { showToast('العب 7 ايام متواصلة بدون تسخيت حتى تحصل شعلة 🔥', 'fire'); }} onQuestionsClick={() => { showToast('المجموع الكلي لاسئلة المنهج 🎯', 'info'); }} />
          <div className="flex items-center gap-4 mb-6"><TactileButton onClick={()=>setView('home')} className="w-12 h-12 rounded-xl" colorClass={dk?'bg-slate-800':'bg-white'} borderClass={dk?'border-slate-700':'border-slate-200'}><ArrowLeft className={dk?'text-white':'text-slate-700'}/></TactileButton><h2 className={`text-3xl font-black ${tx}`}>خريطة الفصول</h2></div>
          <div className="space-y-4">{[1,2,3,4,5,6,7,8].map(n=>{const lk=guest?(n!==1):(n>2);const cn=['الأول','الثاني','الثالث','الرابع','خامس','سادس','سابع','ثامن'];return(
            <TactileButton key={n} onClick={()=>{if(lk){if(guest)setLoginModal(true)}else{setSelCh(n);setView('levels')}}} className={`w-full p-5 flex items-center justify-between rounded-[28px] ${lk?'opacity-80 grayscale-[0.5]':''}`} colorClass={lk?(dk?'bg-slate-900':'bg-slate-200'):(dk?'bg-slate-800':'bg-white')} borderClass={lk?(dk?'border-slate-800':'border-slate-300'):(dk?'border-slate-700':'border-slate-200')}>
              <div className="flex items-center gap-5 w-full"><div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl font-black border-2 shadow-inner ${lk?'bg-slate-300 border-slate-400 text-slate-500':'bg-emerald-50 border-emerald-200 text-emerald-500'}`}>{lk?<Lock className="w-8 h-8"/>:n}</div>
              <div className="flex-1"><span className={`block text-xl font-black mb-2 ${lk?'text-slate-500':tx}`}>الفصل {cn[n-1]}</span>{!lk&&<div className="w-full max-w-[120px]"><div className={`h-3 w-full rounded-full overflow-hidden shadow-inner ${dk?'bg-slate-700':'bg-slate-100'}`}><div className="h-full rounded-full bg-yellow-400" style={{width:`${n===1?35:n===2?92:0}%`}}/></div></div>}</div></div>
            </TactileButton>)})}</div>
        </div>}

        {view==='levels'&&<div className="animate-fade-in-up pb-32">
          <div className="flex items-center gap-4 mb-8"><TactileButton onClick={()=>setView('chapters')} className="w-12 h-12 rounded-xl" colorClass={dk?'bg-slate-800':'bg-white'} borderClass={dk?'border-slate-700':'border-slate-200'}><ArrowLeft className={dk?'text-white':'text-slate-700'}/></TactileButton><div><h2 className={`text-3xl font-black ${tx}`}>الفصل {selCh}</h2><p className="text-sm font-bold text-slate-400">أكمل المراحل لفتح التحدي</p></div></div>
          <div className="grid grid-cols-3 gap-4">{Array.from({length:12},(_,i)=>({id:i+1,locked:guest||i>2})).map(lv=>(
            <TactileButton key={lv.id} onClick={()=>{if(lv.locked){if(guest)setLoginModal(true)}else setActiveGame({mode:'chapter'})}} className={`w-full aspect-[4/5] rounded-[24px] flex flex-col items-center justify-center gap-1 ${lv.locked?'opacity-80 grayscale':''}`} colorClass={lv.locked?(dk?'bg-slate-900':'bg-slate-200'):(dk?'bg-indigo-600':'bg-[#8B5CF6]')} borderClass={lv.locked?(dk?'border-slate-800':'border-slate-300'):(dk?'border-indigo-800':'border-[#7C3AED]')}>
              <span className={`text-6xl font-black ${lv.locked?'text-slate-400':'text-white'}`}>{lv.id}</span>
              {lv.locked?<Lock className="w-8 h-8 text-slate-400 mt-2"/>:<div className="flex gap-1 mt-2">{[1,2,3].map(s=><Star key={s} className="w-5 h-5 text-yellow-300 fill-yellow-300"/>)}</div>}
            </TactileButton>))}</div>
        </div>}

        {view==='reviews' && (
          <ReviewsView isDarkMode={dk} onBack={(v)=>setView(v)} isGuest={guest} onShowLogin={()=>setLoginModal(true)} />
        )}
      </div>

      {!guest&&<>
        <BottomDock isDarkMode={dk} onTaskClick={()=>{ /* task clicked */ }} onMistakeClick={()=>{ /* mistakes clicked */ }} />

        {/* زر البصمة في الواجهة الرئيسية */}
        <div className="fixed bottom-28 left-5 z-50">
          <div className="relative">
            <TactileButton 
                onClick={() => setFeedbackOpen(true)}
                className="w-12 h-12 rounded-full shadow-lg relative" colorClass={dk ? 'bg-[#2A2640]' : 'bg-white'} borderClass={dk ? 'border-[#3E3859]' : 'border-teal-200'}>
                <Fingerprint className="w-6 h-6 text-teal-500" />
            </TactileButton>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-600 bg-white/80 px-2 rounded-full">بصمتك</span>
          </div>
        </div>

        {/* نافذة (Modal) البصمة */}
        {feedbackOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setFeedbackOpen(false)}></div>
                <div className={`relative w-full max-w-sm p-6 rounded-[2rem] border-2 shadow-2xl animate-pop-in ${dk?'bg-[#2A2640] border-[#3E3859]':'bg-white border-white'}`}>
                    <button onClick={() => setFeedbackOpen(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"><X className="w-5 h-5 text-slate-400" /></button>
                    <div className="flex flex-col items-center text-center mb-6 mt-2">
                        <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 rotate-3"><Fingerprint className="w-8 h-8 text-teal-500" /></div>
                        <h3 className={`text-xl font-black mb-1 ${dk ? 'text-white' : 'text-slate-800'}`}>اللعبة تكبر بأفكاركم 💡</h3>
                        <p className={`text-sm opacity-60 ${dk ? 'text-white' : 'text-slate-800'}`}>شنو اقتراحك حتى نطورها؟</p>
                    </div>
                    <textarea className={`w-full h-32 p-4 rounded-xl border-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all ${dk ? 'bg-black/20 border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800'}`} placeholder="اكتب فكرتك الجهنمية هنا..."></textarea>
                    <TactileButton onClick={() => { triggerHaptic(80); setFeedbackOpen(false); showToast('شكراً يا بطل! فكرتك وصلت 💡', 'info'); }} className="w-full py-3 rounded-xl gap-2" colorClass="bg-teal-500" borderClass="border-teal-700"><span className="font-bold text-white">إرسال الفكرة</span><Send className="w-4 h-4 text-white" /></TactileButton>
                </div>
            </div>
        )}
      </>}

      <BattleArenaModal isOpen={monsterOpen} onClose={()=>setMonsterOpen(false)} onStart={(lvl)=>{setMonsterOpen(false); setActiveGame({mode:'monster'}); showToast(`تحدي ${lvl} تم اختياره!`,'info')}} dk={dk} />

      {loginModal&&<div className="fixed inset-0 z-[200] flex items-center justify-center p-6"><div className="absolute inset-0 bg-black/60" onClick={()=>setLoginModal(false)}/><div className={`relative w-full max-w-sm p-6 rounded-[2rem] border-2 shadow-2xl animate-pop-in ${dk?'bg-[#2A2640] border-[#3E3859]':'bg-white border-white'}`}>
        <button onClick={()=>setLoginModal(false)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-black/5"><X className="w-5 h-5 text-slate-400"/></button>
        <div className="flex flex-col items-center text-center mb-6 mt-2"><div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg mb-3"><Lock className="w-8 h-8 text-yellow-900"/></div><h3 className={`text-xl font-black mb-2 ${tx}`}>محتوى للمشتركين</h3><p className="text-sm text-slate-400 font-bold">سجل دخولك لفتح كل الفصول والمراحل</p></div>
        <TactileButton onClick={()=>{setLoginModal(false);setLoggedIn(false);setGuest(false);setRegStep(1)}} className="w-full p-4 rounded-2xl" colorClass="bg-yellow-400" borderClass="border-yellow-600"><span className="font-black text-yellow-900 text-lg">تسجيل الدخول</span></TactileButton>
      </div></div>}
    </div>
  );
}
