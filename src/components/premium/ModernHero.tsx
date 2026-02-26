import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Github, Linkedin, Mail, Instagram, MessageCircle, ArrowDown, Sparkles } from 'lucide-react';

interface HeroData {
  name: string;
  title: string;
  tagline: string;
  imageUrl: string;
}

interface ContactData {
  social: {
    instagram: { url: string; visible: boolean };
    whatsapp: { url: string; visible: boolean };
    linkedin: { url: string; visible: boolean };
    github: { url: string; visible: boolean };
  };
}

const ModernHero = () => {
  const [heroData, setHeroData] = useState<HeroData>({
    name: 'Ahmed Elrefaeey',
    title: 'Full-Stack Developer',
    tagline: 'Building scalable web applications powered by AI',
    imageUrl: ''
  });
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const heroDoc = await getDoc(doc(db, 'content', 'hero'));
        if (heroDoc.exists()) {
          setHeroData(heroDoc.data() as HeroData);
        }

        const contactDoc = await getDoc(doc(db, 'content', 'contact'));
        if (contactDoc.exists()) {
          setContactData(contactDoc.data() as ContactData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  const getSocialLinks = () => {
    if (!contactData) return [];
    const links = [];
    
    if (contactData.social.linkedin?.visible && contactData.social.linkedin?.url) {
      links.push({ icon: Linkedin, href: contactData.social.linkedin.url, label: 'LinkedIn', color: '#0077B5' });
    }
    if (contactData.social.github?.visible && contactData.social.github?.url) {
      links.push({ icon: Github, href: contactData.social.github.url, label: 'GitHub', color: '#ffffff' });
    }
    if (contactData.social.instagram?.visible && contactData.social.instagram?.url) {
      links.push({ icon: Instagram, href: contactData.social.instagram.url, label: 'Instagram', color: '#E4405F' });
    }
    if (contactData.social.whatsapp?.visible && contactData.social.whatsapp?.url) {
      links.push({ icon: MessageCircle, href: contactData.social.whatsapp.url, label: 'WhatsApp', color: '#25D366' });
    }
    
    return links;
  };

  const socials = getSocialLinks();

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Available for new projects</span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-bold"
              >
                <span className="block text-white">{heroData.name.split(' ')[0]}</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {heroData.name.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl lg:text-3xl font-semibold text-gray-300"
              >
                {heroData.title}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 leading-relaxed max-w-xl"
              >
                {heroData.tagline}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl transition-all duration-300"
              >
                View My Work
              </motion.a>
              <motion.a
                href="mailto:contact@example.com"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full backdrop-blur-sm hover:border-white/40 transition-all duration-300"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 pt-4"
            >
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1, type: 'spring' }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    boxShadow: `0 10px 30px ${social.color}40`
                  }}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
              <motion.a
                href="mailto:contact@example.com"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + socials.length * 0.1, type: 'spring' }}
                whileHover={{ 
                  scale: 1.2, 
                  y: -5,
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)'
                }}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with Creative Layout */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 border-2 border-cyan-500/30 rounded-full"
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-32 h-32 border-2 border-purple-500/30 rounded-full"
              />
              
              {/* Main Image Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
                
                {/* Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-gradient-to-br from-white/5 to-white/0">
                  {heroData.imageUrl ? (
                    <motion.img
                      src={heroData.imageUrl}
                      alt={heroData.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5 }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-9xl font-bold text-gray-700">{heroData.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.05, x: -10 }}
                  className="absolute -left-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl"
                >
                  <p className="text-3xl font-bold text-white">5+</p>
                  <p className="text-sm text-gray-300">Years Exp</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="absolute -right-8 bottom-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl"
                >
                  <p className="text-3xl font-bold text-white">50+</p>
                  <p className="text-sm text-gray-300">Projects</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModernHero;
