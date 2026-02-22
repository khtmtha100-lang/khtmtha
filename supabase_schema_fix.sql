-- ============================================================
-- إصلاح بنية الجداول في Supabase - ختمتها
-- نفذ هذا الملف في Supabase SQL Editor
-- ============================================================

-- 1️⃣ جدول users - إضافة أعمدة مفقودة إن لزم
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS total_xp integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_correct_answers integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_questions_answered integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- 2️⃣ جدول game_sessions - إنشاء أو إضافة أعمدة
CREATE TABLE IF NOT EXISTS public.game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  user_email text,
  anon_user_id uuid,
  subject text NOT NULL,
  chapter integer,
  stage integer,
  question_type text,
  game_mode text,
  score integer DEFAULT 0,
  questions_total integer DEFAULT 0,
  questions_correct integer DEFAULT 0,
  questions_wrong integer DEFAULT 0,
  accuracy integer DEFAULT 0,
  is_guest boolean DEFAULT false,
  speed_mode text,
  won boolean,
  duration_seconds integer,
  created_at timestamptz DEFAULT now()
);

-- إزالة Foreign Key constraint إذا كان موجوداً ويسبب مشاكل
-- (يمكن إعادة إضافته لاحقاً إذا أردت)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'game_sessions_user_id_fkey'
  ) THEN
    ALTER TABLE public.game_sessions DROP CONSTRAINT game_sessions_user_id_fkey;
    RAISE NOTICE 'Foreign key constraint removed';
  END IF;
END $$;

-- إضافة جميع الأعمدة المطلوبة إن كانت الجدولة موجودة مسبقاً
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS user_id uuid;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS user_email text;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS anon_user_id uuid;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS subject text;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS chapter integer;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS stage integer;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS question_type text;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS game_mode text;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS score integer DEFAULT 0;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS questions_total integer DEFAULT 0;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS questions_correct integer DEFAULT 0;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS questions_wrong integer DEFAULT 0;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS accuracy integer DEFAULT 0;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS is_guest boolean DEFAULT false;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS speed_mode text;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS won boolean;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS duration_seconds integer;
ALTER TABLE public.game_sessions ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- 3️⃣ جدول mistakes_bag - إنشاء أو التحقق
CREATE TABLE IF NOT EXISTS public.mistakes_bag (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  anon_user_id uuid,
  subject text NOT NULL,
  label text,
  questions jsonb,
  correct_replays integer DEFAULT 0,
  next_play_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- إزالة Foreign Key constraint على user_id (يسمح بحفظ جلسات حتى لو user_id غير موجود)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'game_sessions_user_id_fkey'
  ) THEN
    ALTER TABLE public.game_sessions DROP CONSTRAINT game_sessions_user_id_fkey;
    RAISE NOTICE 'Foreign key constraint game_sessions_user_id_fkey removed';
  END IF;
END $$;

-- ملاحظة: إذا الجداول موجودة ببنية مختلفة، قد تحتاج حذف أعمدة غير صحيحة أو تعديل الأسماء
-- تحقق من بنية جدولك الحالية أولاً:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'game_sessions';

-- 4️⃣ RLS Policies - السماح للمستخدمين بالقراءة/الكتابة
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mistakes_bag ENABLE ROW LEVEL SECURITY;

-- سياسة users: القراءة والكتابة للمستخدم الحالي
DROP POLICY IF EXISTS "Users can read own" ON public.users;
CREATE POLICY "Users can read own" ON public.users FOR SELECT USING (auth.uid() = auth_id);
DROP POLICY IF EXISTS "Users can update own" ON public.users;
CREATE POLICY "Users can update own" ON public.users FOR UPDATE USING (auth.uid() = auth_id);
DROP POLICY IF EXISTS "Users can insert" ON public.users;
CREATE POLICY "Users can insert" ON public.users FOR INSERT WITH CHECK (true);

-- سياسة game_sessions: السماح بالإدراج للجميع (للمستخدمين المسجلين والضيوف)
DROP POLICY IF EXISTS "Allow insert game_sessions" ON public.game_sessions;
CREATE POLICY "Allow insert game_sessions" ON public.game_sessions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow select game_sessions" ON public.game_sessions;
CREATE POLICY "Allow select game_sessions" ON public.game_sessions FOR SELECT USING (true);

-- سياسة mistakes_bag
DROP POLICY IF EXISTS "Allow insert mistakes_bag" ON public.mistakes_bag;
CREATE POLICY "Allow insert mistakes_bag" ON public.mistakes_bag FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow select mistakes_bag" ON public.mistakes_bag;
CREATE POLICY "Allow select mistakes_bag" ON public.mistakes_bag FOR SELECT USING (true);

-- سياسة stage_progress: السماح بالقراءة للجميع
DROP POLICY IF EXISTS "Allow select stage_progress" ON public.stage_progress;
CREATE POLICY "Allow select stage_progress" ON public.stage_progress FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow insert stage_progress" ON public.stage_progress;
CREATE POLICY "Allow insert stage_progress" ON public.stage_progress FOR INSERT WITH CHECK (true);

-- 5️⃣ التحقق: عرض بنية الجداول
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_schema = 'public' AND table_name = 'game_sessions'
-- ORDER BY ordinal_position;
