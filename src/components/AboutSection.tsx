import { motion } from "framer-motion";
import { Code2, Zap, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const highlights = [
  { icon: Code2, label: "Clean Code", desc: "Production-ready architecture" },
  { icon: Zap, label: "Performance", desc: "Optimized for speed" },
  { icon: Globe, label: "Scalable", desc: "Built to grow with you" },
];

const AboutSection = () => {
  const [content, setContent] = useState("I'm Ahmed Elrefaeey Ibrahim — a Full-Stack Developer specializing in React, Next.js, and Firebase. I build scalable, AI-powered web applications with a relentless focus on performance, clean code, and exceptional user experiences. My mission is to transform ideas into polished, production-ready digital products.");

  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, 'content', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data().content);
        }
      } catch (error) {
        console.error('Error loading about data:', error);
      }
    };
    loadData();
  }, []);
  return (
    <section id="about" className="relative py-32 section-glow">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">About Me</p>
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground sm:text-5xl">
            Passionate About <span className="text-gradient">Digital Craft</span>
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
            {content}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {highlights.map((item, i) => (
            <div
              key={item.label}
              className="glass glow-border glow-border-hover hover-lift rounded-xl p-6 text-center"
            >
              <item.icon className="mx-auto mb-3 text-primary" size={28} />
              <h3 className="mb-1 font-display text-sm font-semibold text-foreground">{item.label}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
