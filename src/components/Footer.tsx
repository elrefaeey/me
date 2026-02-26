import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-sm font-bold text-gradient">Ahmed Elrefaey</span>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ahmed Elrefaeey Ibrahim. All rights reserved.
          </p>
          <Button
            onClick={() => navigate('/admin/login')}
            className="h-7 w-7 rounded-full bg-transparent border border-muted-foreground/20 hover:border-primary/40 shadow-sm hover:shadow-md transition-all"
            size="icon"
            variant="ghost"
          >
            <Lock className="h-3 w-3 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
