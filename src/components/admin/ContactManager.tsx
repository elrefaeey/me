import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, Instagram, Facebook, Linkedin, Github, MessageCircle } from 'lucide-react';

interface ContactData {
  name: string;
  subtitle: string;
  imageUrl: string;
  social: {
    instagram: { url: string; visible: boolean };
    whatsapp: { url: string; visible: boolean };
    facebook: { url: string; visible: boolean };
    linkedin: { url: string; visible: boolean };
    github: { url: string; visible: boolean };
  };
}

const ContactManager = () => {
  const [data, setData] = useState<ContactData>({
    name: '',
    subtitle: '',
    imageUrl: '',
    social: {
      instagram: { url: '', visible: true },
      whatsapp: { url: '', visible: true },
      facebook: { url: '', visible: true },
      linkedin: { url: '', visible: true },
      github: { url: '', visible: true }
    }
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const docRef = doc(db, 'content', 'contact');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as ContactData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `contact/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setData({ ...data, imageUrl: url });
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      toast.error('فشل رفع الصورة');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'content', 'contact'), data);
      toast.success('تم حفظ التغييرات بنجاح');
    } catch (error) {
      toast.error('فشل حفظ التغييرات');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSocial = (platform: keyof ContactData['social'], field: 'url' | 'visible', value: string | boolean) => {
    setData({
      ...data,
      social: {
        ...data.social,
        [platform]: {
          ...data.social[platform],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة Contact Section</CardTitle>
          <CardDescription>تعديل معلومات التواصل</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">الاسم</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="أحمد الرفاعي"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">العنوان الفرعي</Label>
            <Input
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              placeholder="تواصل معي"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">رابط الصورة</Label>
            <Input
              id="imageUrl"
              value={data.imageUrl}
              onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile">أو رفع صورة</Label>
            <Input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>

          {data.imageUrl && (
            <div className="mt-4">
              <Label>معاينة الصورة</Label>
              <img
                src={data.imageUrl}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إدارة وسائل التواصل الاجتماعي</CardTitle>
          <CardDescription>إضافة وتعديل روابط التواصل الاجتماعي</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instagram */}
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Instagram className="h-5 w-5 text-pink-600" />
              <Label className="text-lg font-semibold">Instagram</Label>
            </div>
            <Input
              value={data.social.instagram.url}
              onChange={(e) => updateSocial('instagram', 'url', e.target.value)}
              placeholder="https://instagram.com/username"
            />
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                checked={data.social.instagram.visible}
                onCheckedChange={(checked) => updateSocial('instagram', 'visible', checked)}
              />
              <Label>إظهار في الموقع</Label>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <Label className="text-lg font-semibold">WhatsApp</Label>
            </div>
            <Input
              value={data.social.whatsapp.url}
              onChange={(e) => updateSocial('whatsapp', 'url', e.target.value)}
              placeholder="https://wa.me/1234567890"
            />
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                checked={data.social.whatsapp.visible}
                onCheckedChange={(checked) => updateSocial('whatsapp', 'visible', checked)}
              />
              <Label>إظهار في الموقع</Label>
            </div>
          </div>

          {/* Facebook */}
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-600" />
              <Label className="text-lg font-semibold">Facebook</Label>
            </div>
            <Input
              value={data.social.facebook.url}
              onChange={(e) => updateSocial('facebook', 'url', e.target.value)}
              placeholder="https://facebook.com/username"
            />
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                checked={data.social.facebook.visible}
                onCheckedChange={(checked) => updateSocial('facebook', 'visible', checked)}
              />
              <Label>إظهار في الموقع</Label>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Linkedin className="h-5 w-5 text-blue-700" />
              <Label className="text-lg font-semibold">LinkedIn</Label>
            </div>
            <Input
              value={data.social.linkedin.url}
              onChange={(e) => updateSocial('linkedin', 'url', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                checked={data.social.linkedin.visible}
                onCheckedChange={(checked) => updateSocial('linkedin', 'visible', checked)}
              />
              <Label>إظهار في الموقع</Label>
            </div>
          </div>

          {/* GitHub */}
          <div className="space-y-3 p-4 border rounded-lg">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <Label className="text-lg font-semibold">GitHub</Label>
            </div>
            <Input
              value={data.social.github.url}
              onChange={(e) => updateSocial('github', 'url', e.target.value)}
              placeholder="https://github.com/username"
            />
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                checked={data.social.github.visible}
                onCheckedChange={(checked) => updateSocial('github', 'visible', checked)}
              />
              <Label>إظهار في الموقع</Label>
            </div>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;
