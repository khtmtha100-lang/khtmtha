# 🚀 نشر الموقع على Vercel

## المشكلة: Redirect إلى localhost بعد تسجيل الدخول بـ Google

عند النشر على Vercel، قد يتم إعادة التوجيه إلى `localhost` بدلاً من URL الإنتاج.

---

## ✅ الحل

### 1. إعداد متغيرات البيئة في Vercel

1. اذهب إلى **Vercel Dashboard** → مشروعك → **Settings** → **Environment Variables**
2. أضف المتغيرات التالية:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SITE_URL=https://your-app-name.vercel.app
```

**مهم جداً:** `VITE_SITE_URL` يجب أن يكون URL الموقع على Vercel (مثل `https://khatemtha.vercel.app`)

---

### 2. إعداد Redirect URLs في Supabase

1. اذهب إلى **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. في **Redirect URLs**، أضف:
   - `http://localhost:5173` (للتطوير المحلي)
   - `http://localhost:3000` (إذا كنت تستخدمه محلياً)
   - `https://your-app-name.vercel.app` (URL الموقع على Vercel)
   - `https://your-app-name.vercel.app/**` (لجميع المسارات)

**مثال:**
```
http://localhost:5173
http://localhost:3000
https://khatemtha.vercel.app
https://khatemtha.vercel.app/**
```

---

### 3. إعداد Google OAuth في Google Cloud Console

1. اذهب إلى [Google Cloud Console](https://console.cloud.google.com/)
2. اختر مشروعك → **APIs & Services** → **Credentials**
3. افتح OAuth 2.0 Client ID المستخدم في Supabase
4. في **Authorized redirect URIs**، أضف:
   ```
   https://gkfqhnktudmqkomcbnsc.supabase.co/auth/v1/callback
   ```
   (استبدل `gkfqhnktudmqkomcbnsc` بـ Supabase Project Reference الخاص بك)

---

### 4. التحقق من الكود

الكود الآن يستخدم:
- `VITE_SITE_URL` إذا كان موجوداً (للإنتاج)
- `window.location.origin + window.location.pathname` كـ fallback (للتطوير)

---

## 🧪 اختبار بعد النشر

1. افتح الموقع على Vercel
2. اضغط على "دخول سريع عبر Google"
3. بعد تسجيل الدخول، يجب أن يعيدك إلى URL الموقع على Vercel (وليس localhost)
4. يجب أن يطلب إكمال الملف الشخصي إذا كان مستخدم جديد

---

## 🐛 حل المشاكل

### المشكلة: لا يزال يعيد إلى localhost
- ✅ تحقق من أن `VITE_SITE_URL` مضبوط في Vercel Environment Variables
- ✅ تحقق من أن Redirect URLs في Supabase تحتوي على URL Vercel
- ✅ أعد نشر الموقع بعد إضافة المتغيرات

### المشكلة: خطأ "redirect_uri_mismatch"
- ✅ تأكد من إضافة URL Vercel في Supabase Redirect URLs
- ✅ تأكد من إضافة Supabase callback URL في Google Cloud Console

---

## 📝 ملاحظات

- `VITE_SITE_URL` يجب أن يكون بدون `/` في النهاية
- بعد تغيير Environment Variables في Vercel، يجب إعادة نشر الموقع
- يمكنك استخدام `vercel env pull` لسحب المتغيرات محلياً للاختبار
