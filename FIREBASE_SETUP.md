# إعداد Firebase للمشروع

## الخطوات المطلوبة:

### 1. إنشاء حساب Admin في Firebase Authentication

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اختر مشروعك: `elrefaey-db24e`
3. من القائمة الجانبية، اختر **Authentication**
4. اضغط على **Get Started** إذا لم تكن قد فعلت ذلك
5. اذهب إلى تبويب **Sign-in method**
6. فعّل **Email/Password**
7. اذهب إلى تبويب **Users**
8. اضغط **Add user**
9. أدخل:
   - Email: البريد الإلكتروني الذي تريد استخدامه للدخول
   - Password: كلمة مرور قوية
10. اضغط **Add user**

### 2. إعداد Firestore Database

1. من القائمة الجانبية، اختر **Firestore Database**
2. اضغط **Create database**
3. اختر **Start in production mode**
4. اختر الموقع الأقرب لك
5. اضغط **Enable**

### 3. إعداد Firebase Storage

1. من القائمة الجانبية، اختر **Storage**
2. اضغط **Get started**
3. اختر **Start in production mode**
4. اضغط **Next** ثم **Done**

### 4. إعداد قواعد الأمان (Security Rules)

#### Firestore Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /{document=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة للمستخدمين المسجلين فقط
    match /content/{document} {
      allow write: if request.auth != null;
    }
    
    match /projects/{document} {
      allow write: if request.auth != null;
    }
  }
}
```

#### Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // السماح بالقراءة للجميع
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة للمستخدمين المسجلين فقط
    match /{allPaths=**} {
      allow write: if request.auth != null;
    }
  }
}
```

### 5. تشغيل المشروع

```bash
npm install
npm run dev
```

### 6. الوصول إلى لوحة التحكم

1. افتح الموقع في المتصفح
2. ستجد أيقونة القفل 🔒 في الزاوية السفلية اليمنى
3. اضغط عليها للذهاب إلى صفحة تسجيل الدخول
4. أدخل البريد الإلكتروني وكلمة المرور التي أنشأتها
5. بعد تسجيل الدخول، ستصل إلى لوحة التحكم

## المميزات المتاحة في لوحة التحكم:

### 1. Hero Section
- تعديل الاسم
- تعديل العنوان
- تعديل الوصف
- رفع أو إضافة رابط صورة

### 2. About Section
- تعديل محتوى قسم "عني"

### 3. Projects
- إضافة مشروع جديد
- تعديل مشروع موجود
- حذف مشروع
- رفع صور للمشاريع
- إضافة روابط المشاريع و GitHub
- تحديد ترتيب العرض
- إخفاء/إظهار المشاريع

### 4. Contact & Social Media
- تعديل معلومات التواصل
- إضافة/تعديل روابط:
  - Instagram
  - WhatsApp
  - Facebook
  - LinkedIn
  - GitHub
- إخفاء/إظهار كل منصة
- رفع صورة للتواصل

## ملاحظات مهمة:

- جميع التغييرات تُحفظ في Firebase Firestore
- الصور تُرفع إلى Firebase Storage
- البيانات تُعرض مباشرة في الموقع بعد الحفظ
- يمكن للزوار رؤية المحتوى، لكن فقط الأدمن يمكنه التعديل
