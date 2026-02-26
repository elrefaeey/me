import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SiInstagram, SiWhatsapp, SiFacebook, SiLinkedin, SiGithub } from "react-icons/si";

interface SocialLink {
  url: string;
  visible: boolean;
}

interface ContactData {
  name: string;
  subtitle: string;
  imageUrl: string;
  social: {
    instagram: SocialLink;
    whatsapp: SocialLink;
    facebook: SocialLink;
    linkedin: SocialLink;
    github: SocialLink;
  };
}

const ContactSection = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, 'content', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactData(docSnap.data() as ContactData);
        }
      } catch (error) {
        console.error('Error loading contact data:', error);
      }
    };
    loadData();
  }, []);

  const getSocialLinks = () => {
    if (!contactData) return [];
    
    const links = [];
    if (contactData.social.instagram?.visible && contactData.social.instagram?.url) {
      links.push({ 
        icon: SiInstagram, 
        label: "Instagram", 
        href: contactData.social.instagram.url,
        color: "#E4405F",
        hoverColor: "#E4405F"
      });
    }
    if (contactData.social.whatsapp?.visible && contactData.social.whatsapp?.url) {
      links.push({ 
        icon: SiWhatsapp, 
        label: "WhatsApp", 
        href: contactData.social.whatsapp.url,
        color: "#25D366",
        hoverColor: "#25D366"
      });
    }
    if (contactData.social.facebook?.visible && contactData.social.facebook?.url) {
      links.push({ 
        icon: SiFacebook, 
        label: "Facebook", 
        href: contactData.social.facebook.url,
        color: "#1877F2",
        hoverColor: "#1877F2"
      });
    }
    if (contactData.social.linkedin?.visible && contactData.social.linkedin?.url) {
      links.push({ 
        icon: SiLinkedin, 
        label: "LinkedIn", 
        href: contactData.social.linkedin.url,
        color: "#0A66C2",
        hoverColor: "#0A66C2"
      });
    }
    if (contactData.social.github?.visible && contactData.social.github?.url) {
      links.push({ 
        icon: SiGithub, 
        label: "GitHub", 
        href: contactData.social.github.url,
        color: "#FFFFFF",
        hoverColor: "#FFFFFF"
      });
    }
    return links;
  };

  const socials = getSocialLinks();

  return (
    <section id="contact" className="relative py-20 section-glow">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-primary">Contact</p>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="glass glow-border rounded-2xl p-10">
            {socials.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-5">
                {socials.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300"
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
                      className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"
                      style={{ backgroundColor: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No social links available</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
