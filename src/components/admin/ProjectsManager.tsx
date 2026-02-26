import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface Project {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  order: number;
  visible: boolean;
}

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSave = async (project: Project) => {
    setLoading(true);
    try {
      if (project.id) {
        await updateDoc(doc(db, 'projects', project.id), project);
        toast.success('تم تحديث المشروع بنجاح');
      } else {
        await addDoc(collection(db, 'projects'), project);
        toast.success('تم إضافة المشروع بنجاح');
      }
      await loadProjects();
      setIsDialogOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error('فشل حفظ المشروع');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;
    
    try {
      await deleteDoc(doc(db, 'projects', id));
      toast.success('تم حذف المشروع بنجاح');
      await loadProjects();
    } catch (error) {
      toast.error('فشل حذف المشروع');
      console.error(error);
    }
  };

  const toggleVisibility = async (project: Project) => {
    if (!project.id) return;
    try {
      await updateDoc(doc(db, 'projects', project.id), {
        visible: !project.visible
      });
      await loadProjects();
      toast.success('تم تحديث حالة العرض');
    } catch (error) {
      toast.error('فشل تحديث حالة العرض');
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>إدارة المشاريع</CardTitle>
              <CardDescription>إضافة وتعديل وحذف المشاريع</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingProject({
                  title: '',
                  description: '',
                  imageUrl: '',
                  projectUrl: '',
                  githubUrl: '',
                  order: projects.length,
                  visible: true
                })}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مشروع
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProject?.id ? 'تعديل المشروع' : 'إضافة مشروع جديد'}
                  </DialogTitle>
                </DialogHeader>
                {editingProject && (
                  <ProjectForm
                    project={editingProject}
                    onSave={handleSave}
                    onCancel={() => {
                      setIsDialogOpen(false);
                      setEditingProject(null);
                    }}
                    loading={loading}
                    onImageUpload={handleImageUpload}
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProject(project);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleVisibility(project)}
                        >
                          {project.visible ? (
                            <><Eye className="h-4 w-4 mr-1" /> مرئي</>
                          ) : (
                            <><EyeOff className="h-4 w-4 mr-1" /> مخفي</>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => project.id && handleDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          حذف
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProjectForm = ({
  project,
  onSave,
  onCancel,
  loading,
  onImageUpload
}: {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
  loading: boolean;
  onImageUpload: (file: File) => Promise<string>;
}) => {
  const [formData, setFormData] = useState(project);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await onImageUpload(file);
      setFormData({ ...formData, imageUrl: url });
      toast.success('تم رفع الصورة بنجاح');
    } catch (error) {
      toast.error('فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>عنوان المشروع</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="اسم المشروع"
        />
      </div>

      <div className="space-y-2">
        <Label>الوصف</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="وصف المشروع"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>رابط الصورة</Label>
        <Input
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <Label>أو رفع صورة</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>

      {formData.imageUrl && (
        <img
          src={formData.imageUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      )}

      <div className="space-y-2">
        <Label>رابط المشروع</Label>
        <Input
          value={formData.projectUrl}
          onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
          placeholder="https://project-demo.com"
        />
      </div>

      <div className="space-y-2">
        <Label>رابط GitHub</Label>
        <Input
          value={formData.githubUrl}
          onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
          placeholder="https://github.com/username/repo"
        />
      </div>

      <div className="space-y-2">
        <Label>ترتيب العرض</Label>
        <Input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
        />
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          checked={formData.visible}
          onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
        />
        <Label>مرئي للزوار</Label>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)} disabled={loading || uploading} className="flex-1">
          {loading ? 'جاري الحفظ...' : 'حفظ'}
        </Button>
        <Button onClick={onCancel} variant="outline" disabled={loading}>
          إلغاء
        </Button>
      </div>
    </div>
  );
};

export default ProjectsManager;
