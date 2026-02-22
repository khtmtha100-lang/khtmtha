# 🚀 كيفية تشغيل الموقع

## المتطلبات الأساسية

1. **Node.js** (الإصدار 18 أو أحدث)
2. **npm** أو **yarn**
3. **حساب Supabase** مع قاعدة البيانات المُعدة

---

## خطوات التشغيل

### 1. تثبيت المكتبات

```bash
npm install
```

**ملاحظة مهمة:** تأكد من تثبيت `@supabase/supabase-js`:
```bash
npm install @supabase/supabase-js
```

أو

```bash
yarn install
```

---

### 2. إعداد ملف `.env`

أنشئ ملف `.env` في المجلد الرئيسي للمشروع وأضف المتغيرات التالية:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**ملاحظة:** تأكد من وجود ملف `.env` في المجلد الرئيسي قبل التشغيل.

---

### 3. تشغيل الموقع

```bash
npm run dev
```

أو

```bash
yarn dev
```

سيتم فتح الموقع على: `http://localhost:5173` (أو المنفذ المحدد في Vite)

---

## ✅ التحقق من Supabase

### الجداول المطلوبة في Supabase:

1. **`users`** - بيانات المستخدمين
   - `auth_id` (UUID)
   - `email` (text)
   - `full_name` (text)
   - `age` (integer, nullable)
   - `gender` (text, nullable)
   - `region` (text, nullable)
   - `login_count` (integer)
   - `last_login` (timestamp)
   - `total_xp` (integer)
   - `current_streak` (integer)
   - `english_xp` (integer)
   - `biology_xp` (integer)
   - `total_correct_answers` (integer)
   - `total_questions_answered` (integer)
   - `total_wrong_answers` (integer)

2. **`stage_progress`** - تقدم المراحل
   - `user_id` (UUID, foreign key to users.id)
   - `subject` (text)
   - `chapter` (integer)
   - `stage` (integer)
   - `stars` (integer)
   - `completed_at` (timestamp)
   - `updated_at` (timestamp)

3. **`game_sessions`** - جلسات اللعب
   - `user_id` (UUID, nullable)
   - `user_email` (text, nullable)
   - `anon_user_id` (UUID, nullable)
   - `subject` (text)
   - `chapter` (integer, nullable)
   - `stage` (integer, nullable)
   - `question_type` (text)
   - `game_mode` (text)
   - `score` (integer)
   - `questions_total` (integer)
   - `questions_correct` (integer)
   - `questions_wrong` (integer)
   - `accuracy` (integer)
   - `is_guest` (boolean)
   - `speed_mode` (text)
   - `created_at` (timestamp)

4. **`english_chapter_stages`** - أسئلة الفصول (English)
   - `questioncode` (integer, primary key)
   - `chapterno` (integer)
   - `stageno` (integer)
   - `blockno` (integer)
   - `questiontext` (text)
   - `question_requirement` (text)
   - `optiona`, `optionb`, `optionc`, `optiond` (text)
   - `correctanswer` (text)
   - `isgolden` (boolean)
   - `explanation` (text)

5. **`wrong_answers_inventory`** - حقيبة الأخطاء
   - `user_id` (UUID)
   - `question_id` (text)
   - `question_type` (text)
   - `times_wrong` (integer)
   - `updated_at` (timestamp)

6. **Views (اختياري - للـ Dashboard):**
   - `analytics_summary`
   - `analytics_by_subject`
   - `analytics_by_game_mode`
   - `daily_active_users`

---

## 🔐 إعداد Google OAuth في Supabase

1. اذهب إلى **Authentication** → **Providers** في Supabase Dashboard
2. فعّل **Google** provider
3. أضف **Client ID** و **Client Secret** من Google Cloud Console
4. أضف **Redirect URL**: `https://your-project-ref.supabase.co/auth/v1/callback`

---

## 🧪 اختبار الميزات

### 1. Google Login
- ✅ اضغط على "دخول سريع عبر Google"
- ✅ يجب أن يطلب إكمال الملف الشخصي (الاسم، العمر، الجنس، المحافظة) للمستخدمين الجدد
- ✅ بعد إكمال البيانات، يجب أن يبقى مسجل الدخول
- ✅ بعد Refresh الصفحة، يجب أن يبقى مسجل الدخول (Session ثابت)
- ✅ Logout يجب أن يمسح كل البيانات ويعيدك لصفحة Login

### 2. المراحل
- ✅ ابدأ مرحلة جديدة
- ✅ أكمل جميع الأسئلة
- ✅ يجب أن تنتهي المرحلة وتظهر النتائج
- ✅ يجب أن تُحفظ البيانات في Supabase (`stage_progress`)
- ✅ يجب أن تظهر المرحلة التالية كمتاحة

### 3. Dashboard
- ✅ اضغط على "هلا بالبطل" 7 مرات متتالية
- ✅ أدخل PIN: `0773913`
- ✅ يجب أن تظهر جميع الإحصائيات بشكل صحيح

### 4. الإحصائيات
- ✅ تحقق من `game_sessions` في Supabase - يجب أن تُحفظ كل جلسة
- ✅ تحقق من `stage_progress` - يجب أن تُحفظ كل مرحلة مكتملة
- ✅ تحقق من `users` - يجب أن تُحدث XP والإحصائيات

---

## 🐛 حل المشاكل الشائعة

### المشكلة: لا يعمل Google Login
- ✅ تحقق من إعدادات Google OAuth في Supabase
- ✅ تحقق من Redirect URL
- ✅ تحقق من ملف `.env` (VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY)

### المشكلة: Session لا يبقى بعد Refresh
- ✅ تحقق من أن `onAuthStateChange` يعمل بشكل صحيح
- ✅ تحقق من أن `getSession()` يتم استدعاؤه عند التحميل

### المشكلة: 400 Bad Request عند الحفظ
إذا ظهرت أخطاء `400 (Bad Request)` في Console عند انتهاء المرحلة:
1. افتح **Supabase Dashboard** → **SQL Editor**
2. نفّذ ملف `supabase_schema_fix.sql` الموجود في المشروع
3. تأكد أن جدول `users` فيه أعمدة: `total_xp`, `total_correct_answers`, `total_questions_answered`
4. تأكد أن جدول `game_sessions` و `mistakes_bag` موجودان بالبنية الصحيحة
5. راجع سياسات RLS في Supabase

### المشكلة: البيانات لا تُحفظ في Supabase
- ✅ تحقق من RLS (Row Level Security) policies في Supabase
- ✅ تأكد من أن الجداول موجودة والأعمدة صحيحة
- ✅ تحقق من Console للأخطاء (ستظهر رسائل مفصّلة مثل `game_sessions save error:`)

---

## 📝 ملاحظات مهمة

1. **Google Analytics**: تم إعداده في `index.html` مع ID: `G-C7WL5ZFQLT`
2. **Session Management**: يستخدم Supabase Auth مع localStorage للاحتفاظ بالجلسة
3. **Profile Completion**: يتم التحقق من اكتمال الملف الشخصي عند كل دخول
4. **Stage Progress**: يتم حفظه في Supabase مع النجوم والوقت

---

## 🎯 الميزات المكتملة

✅ Google Login ثابت 100% بدون Loop  
✅ Session ثابت بعد Refresh  
✅ Logout يعمل بشكل صحيح  
✅ المرحلة تنتهي وتنتقل طبيعي بعد اكتمال الأسئلة  
✅ حفظ البيانات في Supabase  
✅ الإحصائيات تعمل بالكامل  
✅ Dashboard يعمل مع جميع الإحصائيات  
✅ الاستدعاء للأسئلة طبيعي حسب المراحل المفتوحة  
