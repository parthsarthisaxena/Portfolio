import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/projects";
import AnimateIn from "@/components/AnimateIn";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="featured-projects" style={{ padding: "100px 0" }}>
      <div className="section-container">
        <AnimateIn>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  color: "#64FFDA",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                SELECTED WORK
              </div>
              <h2
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  color: "#E2E8F0",
                  letterSpacing: "-0.02em",
                  marginBottom: "12px",
                }}
              >
                Featured Projects
              </h2>
              <div className="section-divider" />
            </div>
            <Link href="/projects" id="featured-view-all" className="btn-ghost">
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {featured.map((project, i) => (
            <AnimateIn key={project.slug} delay={i * 100}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
