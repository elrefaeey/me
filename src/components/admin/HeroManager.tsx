import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, Save } from 'lucide-react';

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  imageUrl: string;
}

const HeroManager = () => {
  const [data, setData] = useState<HeroData>({
    name: '',
    title: '',
    tagline: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const docRef = doc(db, 'content', 'hero');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as HeroData);
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
      const storageRef = ref(storage, `hero/${Date.now()}_${file.name}`);
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
      await setDoc(doc(db, 'content', 'hero'), data);
      toast.success('تم حفظ التغييرات بنجاح');
    } catch (error) {
      toast.error('فشل حفظ التغييرات');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة Hero Section</CardTitle>
        <CardDescription>تعديل معلومات القسم الرئيسي</CardDescription>
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
          <Label htmlFor="title">العنوان</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            placeholder="Full Stack Developer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">الوصف</Label>
          <Input
            id="tagline"
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
            placeholder="Building amazing web experiences"
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

        <Button onClick={handleSave} disabled={loading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeroManager;
