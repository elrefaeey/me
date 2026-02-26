import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  githubUrl: string;
  order: number;
  visible: boolean;
}

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Project[];
        
        console.log('All projects from Firebase:', projectsData);
        
        // Sort by order only (show all projects, no filtering)
        const sortedProjects = projectsData.sort((a, b) => a.order - b.order);
        
        console.log('Sorted projects:', sortedProjects);
        
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);
  return (
    <section id="projects" className="relative py-32 section-glow">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-primary">Projects</p>
          <h2 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Featured <span className="text-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {loading ? (
            <div className="col-span-2 text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No projects available yet.</p>
            </div>
          ) : (
            projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass glow-border glow-border-hover hover-lift group overflow-hidden rounded-xl"
              >
                <div className="relative overflow-hidden bg-secondary/20">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="aspect-video w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end justify-center pb-4 gap-3">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} /> Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-foreground/20 px-4 py-2 text-xs font-semibold text-foreground flex items-center gap-1.5"
                      >
                        <Github size={12} /> Code
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-foreground">{project.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
