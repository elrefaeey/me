import { motion } from "framer-motion";
import { Code2, Palette, LayoutDashboard, Gauge, Plug } from "lucide-react";

const services = [
  { icon: Code2, title: "Full-Stack Development", desc: "End-to-end web applications built with modern frameworks and best practices." },
  { icon: Palette, title: "UI/UX Design", desc: "Pixel-perfect interfaces with intuitive user experiences and elegant aesthetics." },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Powerful, data-rich dashboards with real-time analytics and management tools." },
  { icon: Gauge, title: "Performance Optimization", desc: "Lightning-fast load times through code splitting, caching, and optimization." },
  { icon: Plug, title: "API Integrations", desc: "Seamless third-party integrations including payment, AI, and cloud services." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">Services</p>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            What I <span className="text-gradient">Offer</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glow-border glow-border-hover hover-lift group rounded-xl p-8"
            >
              <service.icon className="mb-4 text-primary transition-transform duration-300 group-hover:scale-110" size={32} />
              <h3 className="mb-2 font-display text-base font-bold text-foreground">{service.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
