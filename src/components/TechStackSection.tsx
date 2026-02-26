import { motion } from "framer-motion";
import { 
  SiReact, 
  SiFirebase, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiGithub, 
  SiTypescript
} from "react-icons/si";

const techs = [
  { name: "React", icon: SiReact, color: "#61DAFB", type: "icon" },
  { 
    name: "Cursor AI", 
    imageUrl: "https://cursor.com/marketing-static/_next/image?url=%2Fmarketing-static%2Fdownload%2Fapp-icon-2d-light.png&w=3840&q=70&dpl=dpl_AJcrmjzJfc9swMnm7Zfh2SHa3rv2",
    type: "image"
  },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", type: "icon" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", type: "icon" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", type: "icon" },
  { 
    name: "Kiro AI", 
    imageUrl: "https://yt3.googleusercontent.com/Ms7umz9WA39yO3Z-Ye62xkGB6yZA-F4L-sPhGVoTG77U6ReKwqFFYMNuU1Gau_3O80JHUJnjog=s900-c-k-c0x00ffffff-no-rj",
    type: "image"
  },
  { name: "Git & GitHub", icon: SiGithub, color: "#FFFFFF", type: "icon" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", type: "icon" },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">Tech Stack</p>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Tools I <span className="text-gradient">Master</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glow-border glow-border-hover hover-lift group cursor-default rounded-xl p-6 text-center"
            >
              <div className="mb-3 flex justify-center">
                {tech.type === "image" && tech.imageUrl ? (
                  <img 
                    src={tech.imageUrl} 
                    alt={tech.name}
                    className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110"
                  />
                ) : tech.icon ? (
                  <tech.icon 
                    className="text-4xl transition-all duration-300 group-hover:scale-110" 
                    style={{ color: tech.color }}
                  />
                ) : null}
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
