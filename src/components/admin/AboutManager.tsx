import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

interface AboutData {
  content: string;
}

const AboutManager = () => {
  const [data, setData] = useState<AboutData>({ content: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const docRef = doc(db, 'content', 'about');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as AboutData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'content', 'about'), data);
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
        <CardTitle>إدارة About Section</CardTitle>
        <CardDescription>تعديل محتوى قسم "عني"</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="content">المحتوى</Label>
          <Textarea
            id="content"
            value={data.content}
            onChange={(e) => setData({ content: e.target.value })}
            placeholder="اكتب نبذة عنك..."
            rows={10}
            className="resize-none"
          />
        </div>

        <Button onClick={handleSave} disabled={loading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AboutManager;
