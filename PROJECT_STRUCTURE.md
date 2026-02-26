# 📁 بنية المشروع - Project Structure

## الملفات الجديدة المضافة

```
src/
├── lib/
│   └── firebase.ts                    # إعداد Firebase (Auth, Firestore, Storage)
│
├── contexts/
│   └── AuthContext.tsx                # Context للمصادقة
│
├── pages/
│   ├── AdminLogin.tsx                 # صفحة تسجيل دخول الأدمن
│   └── AdminDashboard.tsx             # لوحة التحكم الرئيسية
│
├── components/
│   ├── AdminLockButton.tsx            # زر القفل 🔒 في الصفحة الرئيسية
│   ├── ProtectedRoute.tsx             # حماية صفحات الأدمن
│   │
│   └── admin/
│       ├── HeroManager.tsx            # إدارة Hero Section
│       ├── AboutManager.tsx           # إدارة About Section
│       ├── ProjectsManager.tsx        # إدارة المشاريع
│       └── ContactManager.tsx         # إدارة Contact & Social Media

firebase-rules/
├── firestore.rules                    # قواعد Firestore
└── storage.rules                      # قواعد Storage

# ملفات التوثيق
├── QUICK_START_AR.md                  # البداية السريعة
├── ADMIN_GUIDE_AR.md                  # دليل الاستخدام الشامل
├── FIREBASE_SETUP.md                  # تعليمات إعداد Firebase
└── PROJECT_STRUCTURE.md               # هذا الملف
```

---

## 🔥 Firebase Collections

### Firestore Database:
```
/content
  /hero                                # بيانات Hero Section
    - name: string
    - title: string
    - tagline: string
    - imageUrl: string
  
  /about                               # بيانات About Section
    - content: string
  
  /contact                             # بيانات Contact Section
    - name: string
    - subtitle: string
    - imageUrl: string
    - social: object
      - instagram: { url, visible }
      - whatsapp: { url, visible }
      - facebook: { url, visible }
      - linkedin: { url, visible }
      - github: { url, visible }

/projects                              # مجموعة المشاريع
  /{projectId}
    - title: string
    - description: string
    - imageUrl: string
    - projectUrl: string
    - githubUrl: string
    - order: number
    - visible: boolean
```

### Storage:
```
/hero/                                 # صور Hero Section
/contact/                              # صور Contact Section
/projects/                             # صور المشاريع
```

---

## 🛣️ Routes (المسارات)

```
/                                      # الصفحة الرئيسية (عامة)
/admin/login                           # صفحة تسجيل دخول الأدمن
/admin/dashboard                       # لوحة التحكم (محمية)
```

---

## 🔐 الأمان

### Authentication:
- Firebase Authentication (Email/Password)
- فقط المستخدمين المسجلين يمكنهم الدخول

### Authorization:
- Firestore: القراءة للجميع، الكتابة للمسجلين فقط
- Storage: القراءة للجميع، الكتابة للمسجلين فقط

### Protected Routes:
- `/admin/dashboard` محمي بـ `ProtectedRoute`
- يتم التحقق من تسجيل الدخول قبل الوصول

---

## 🎨 المكونات الرئيسية

### AdminLockButton
- زر ثابت في الزاوية السفلية اليمنى
- يظهر في الصفحة الرئيسية فقط
- ينقل للوحة التحكم

### AuthContext
- يدير حالة المصادقة
- يوفر: user, loading, login, logout
- يستخدم في جميع صفحات الأدمن

### Admin Managers
- كل مدير مسؤول عن قسم معين
- يتعامل مع Firestore مباشرة
- يدعم رفع الصور إلى Storage

---

## 📦 Dependencies الجديدة

```json
{
  "firebase": "^latest"  // Firebase SDK
}
```

---

## 🚀 الاستخدام

### للتطوير:
```bash
npm run dev
```

### للبناء:
```bash
npm run build
```

### للمعاينة:
```bash
npm run preview
```

---

## 💡 ملاحظات

1. جميع البيانات تُحفظ في Firebase
2. التغييرات تظهر مباشرة بعد الحفظ
3. الصور تُرفع إلى Firebase Storage
4. يمكن إضافة روابط صور خارجية
5. كل قسم مستقل عن الآخر
6. يمكن إخفاء/إظهار المحتوى بدون حذفه

---

## 🔧 التخصيص

يمكنك بسهولة:
- إضافة أقسام جديدة في Dashboard
- إضافة حقول جديدة في Managers
- تعديل التصميم في Components
- إضافة منصات تواصل جديدة
- تخصيص قواعد الأمان

---

## 📞 الدعم

راجع:
- `QUICK_START_AR.md` للبداية السريعة
- `ADMIN_GUIDE_AR.md` للدليل الشامل
- `FIREBASE_SETUP.md` لإعداد Firebase
