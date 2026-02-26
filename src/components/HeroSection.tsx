import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SiInstagram, SiWhatsapp, SiFacebook, SiLinkedin, SiGithub } from "react-icons/si";
import heroBg from "@/assets/hero-bg.png";

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  imageUrl: string;
}

interface SocialLink {
  url: string;
  visible: boolean;
}

interface ContactData {
  social: {
    instagram: SocialLink;
    whatsapp: SocialLink;
    facebook: SocialLink;
    linkedin: SocialLink;
    github: SocialLink;
  };
}

const HeroSection = () => {
  const [data, setData] = useState<HeroData>({
    name: "Ahmed Elrefaey",
    title: "Full-Stack Developer",
    tagline: "Building scalable web applications powered by AI. Crafting high-performance digital experiences with clean code and modern UI/UX.",
    imageUrl: ""
  });
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as HeroData);
        }
        
        // Load contact data for social links
        const contactRef = doc(db, 'content', 'contact');
        const contactSnap = await getDoc(contactRef);
        if (contactSnap.exists()) {
          setContactData(contactSnap.data() as ContactData);
        }
      } catch (error) {
        console.error('Error loading hero data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (loading) return;
    const current = data.title;
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setDisplayed("");
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex, data.title, loading]);

  const getSocialLinks = () => {
    if (!contactData) return [];
    
    const links = [];
    if (contactData.social.instagram?.visible && contactData.social.instagram?.url) {
      links.push({ 
        icon: SiInstagram, 
        label: "Instagram", 
        href: contactData.social.instagram.url,
        color: "#E4405F"
      });
    }
    if (contactData.social.whatsapp?.visible && contactData.social.whatsapp?.url) {
      links.push({ 
        icon: SiWhatsapp, 
        label: "WhatsApp", 
        href: contactData.social.whatsapp.url,
        color: "#25D366"
      });
    }
    if (contactData.social.facebook?.visible && contactData.social.facebook?.url) {
      links.push({ 
        icon: SiFacebook, 
        label: "Facebook", 
        href: contactData.social.facebook.url,
        color: "#1877F2"
      });
    }
    if (contactData.social.linkedin?.visible && contactData.social.linkedin?.url) {
      links.push({ 
        icon: SiLinkedin, 
        label: "LinkedIn", 
        href: contactData.social.linkedin.url,
        color: "#0A66C2"
      });
    }
    if (contactData.social.github?.visible && contactData.social.github?.url) {
      links.push({ 
        icon: SiGithub, 
        label: "GitHub", 
        href: contactData.social.github.url,
        color: "#FFFFFF"
      });
    }
    return links;
  };

  const socials = getSocialLinks();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Profile Image */}
          {data.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
                {/* Simple border */}
                <div className="absolute inset-0 rounded-full bg-border/20"></div>
                
                {/* Image */}
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-background shadow-2xl"
                />
              </div>
            </motion.div>
          )}

          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Building the future of the web
          </p>
          <h1 className="mb-2 font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-gradient">{data.name}</span>
          </h1>
          <div className="mb-8 h-12 flex items-center justify-center">
            <span className="font-display text-2xl font-light text-muted-foreground sm:text-3xl">
              {displayed}
              <span className="animate-pulse-glow text-primary">|</span>
            </span>
          </div>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
            {data.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_hsl(190_100%_50%/0.3)]"
          >
            View Projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          
          {/* Social Media Icons */}
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300"
                  style={{
                    backgroundColor: `${social.color}15`,
                    border: `2px solid ${social.color}40`
                  }}
                >
                  <social.icon 
                    className="text-2xl transition-all duration-300" 
                    style={{ color: social.color }}
                  />
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-40"
                    style={{ backgroundColor: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
