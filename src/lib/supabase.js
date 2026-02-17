import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── المصادقة ───────────────────────────────────────────────

// تسجيل الدخول بجوجل
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });
  if (error) throw error;
};

// تسجيل الخروج
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// جلب الجلسة الحالية
export const getSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// ─── المستخدمين ─────────────────────────────────────────────

// جلب بيانات المستخدم من جدول users
export const getUserProfile = async (authId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', authId)
    .single();
  if (error) return null;
  return data;
};

// إنشاء مستخدم جديد بعد التسجيل الأول
export const createUserProfile = async ({ authId, email, fullName, age, gender, region }) => {
  const { data, error } = await supabase
    .from('users')
    .insert({
      auth_id: authId,
      email,
      full_name: fullName,
      age,
      gender,
      region,
      user_type: 'google',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

// تحديث بيانات المستخدم (اسم، عمر، محافظة)
export const updateUserProfile = async (authId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('auth_id', authId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

// تحديث آخر تسجيل دخول
export const updateLastLogin = async (authId) => {
  await supabase
    .from('users')
    .update({ last_login: new Date().toISOString() })
    .eq('auth_id', authId);
};

// ─── إعدادات اللعبة ─────────────────────────────────────────

export const getGameSettings = async (userId) => {
  const { data, error } = await supabase
    .from('game_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
};

export const upsertGameSettings = async (userId, settings) => {
  const { error } = await supabase
    .from('game_settings')
    .upsert({ user_id: userId, ...settings, updated_at: new Date().toISOString() });
  if (error) throw error;
};

// ─── الأسئلة ────────────────────────────────────────────────

// جلب أسئلة فصل معين (جزء محدد)
export const fetchChapterQuestions = async (subject, part) => {
  const table = subject === 'english' ? 'english_chapters' : 'biology_chapters';
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('part', part)
    .order('question_number');
  if (error) throw error;
  return data;
};

// جلب أسئلة مراجعة نصف السنة
export const fetchHalfYearQuestions = async (subject, part) => {
  const table = subject === 'english' ? 'english_halfyear' : 'biology_halfyear';
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('part', part)
    .order('question_number');
  if (error) throw error;
  return data;
};

// جلب أسئلة المراجعة الشاملة
export const fetchFullYearQuestions = async (subject, part) => {
  const table = subject === 'english' ? 'english_fullyear' : 'biology_fullyear';
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('part', part)
    .order('question_number');
  if (error) throw error;
  return data;
};

// ─── جلسات اللعب ────────────────────────────────────────────

export const saveGameSession = async (session) => {
  const { error } = await supabase
    .from('game_sessions')
    .insert(session);
  if (error) throw error;
};

// ─── حقيبة الأخطاء ──────────────────────────────────────────

export const getWrongAnswers = async (userId) => {
  const { data, error } = await supabase
    .from('wrong_answers_inventory')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  if (error) return [];
  return data;
};

export const upsertWrongAnswer = async (entry) => {
  const { error } = await supabase
    .from('wrong_answers_inventory')
    .upsert(entry, { onConflict: 'user_id,question_id,question_type' });
  if (error) throw error;
};

// ─── XP ──────────────────────────────────────────────────────

export const addUserXP = async (userId, amount) => {
  if (!userId || !amount || amount <= 0) return;
  const { data } = await supabase
    .from('users')
    .select('total_xp')
    .eq('id', userId)
    .maybeSingle();
  const current = data?.total_xp || 0;
  await supabase
    .from('users')
    .update({ total_xp: current + amount })
    .eq('id', userId);
};

// ─── رسائل التشجيع ──────────────────────────────────────────

export const getEncouragementMessages = async (type) => {
  const { data, error } = await supabase
    .from('encouragement_messages')
    .select('message')
    .eq('type', type)
    .eq('is_active', true);
  if (error) return [];
  return data.map(d => d.message);
};
