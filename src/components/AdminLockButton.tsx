import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const AdminLockButton = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Cursor Logo */}
      <div className="fixed bottom-6 right-20 z-50">
        <img
          src="https://cursor.com/marketing-static/_next/image?url=%2Fmarketing-static%2Fdownload%2Fapp-icon-2d-light.png&w=3840&q=70&dpl=dpl_AJcrmjzJfc9swMnm7Zfh2SHa3rv2"
          alt="Cursor"
          className="h-10 w-10 rounded-lg opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Admin Lock Button */}
      <Button
        onClick={() => navigate('/admin/login')}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-transparent border border-muted-foreground/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all z-50"
        size="icon"
        variant="ghost"
      >
        <Lock className="h-4 w-4 text-muted-foreground" />
      </Button>
    </>
  );
};

export default AdminLockButton;
