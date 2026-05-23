import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, TrendingUp, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import { getProjectBySlug, projects } from "@/lib/projects";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.shortDescription };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const isQuant = project.category === "quant";
  const accent = isQuant ? "#64FFDA" : "#7B9EFF";

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "60px 0 80px" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>
          {/* Back */}
          <Link
            href="/projects"
            id="project-detail-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#64748B",
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "36px",
              transition: "color 0.2s",
            }}
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: `${accent}15`, border: `1px solid ${accent}30` }}>
                {isQuant ? <TrendingUp size={16} color={accent} /> : <Code2 size={16} color={accent} />}
              </div>
              <span className={isQuant ? "tag" : "tag tag-blue"}>
                {isQuant ? "Quant Research" : "Engineering"}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#E2E8F0", letterSpacing: "-0.03em", marginBottom: "16px" }}>
              {project.title}
            </h1>
            <p style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.7, marginBottom: "24px" }}>
              {project.shortDescription}
            </p>

            {/* Links */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "32px" }}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" id="detail-github" className="btn-ghost">
                  <GithubIcon size={14} color="currentColor" /> GitHub Repo
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" id="detail-demo" className="btn-ghost">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>

            {/* Tech stack */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.techStack.map((t) => (
                <span key={t} className={isQuant ? "tag" : "tag tag-blue"}>{t}</span>
              ))}
            </div>
          </div>

          {/* Metrics (quant only) */}
          {isQuant && project.metrics && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "40px" }}>
              {[
                { label: "Sharpe Ratio", val: project.metrics.sharpeRatio?.toString(), color: "#64FFDA" },
                { label: "Max Drawdown", val: project.metrics.maxDrawdown, color: "#F87171" },
                { label: "Win Rate", val: project.metrics.winRate, color: "#4ADE80" },
                { label: "Ann. Return", val: project.metrics.annualizedReturn, color: "#7B9EFF" },
                { label: "Backtest Period", val: project.metrics.backtestPeriod, color: "#94A3B8" },
              ]
                .filter((m) => m.val)
                .map((m) => (
                  <div key={m.label} className="metric-card">
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "1.2rem", color: m.color }}>{m.val}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: "4px" }}>{m.label}</div>
                  </div>
                ))}
            </div>
          )}

          {/* Content sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {[
              { label: "OBJECTIVE", content: project.objective },
              { label: "HYPOTHESIS", content: project.hypothesis },
              { label: "METHODOLOGY", content: project.methodology },
              { label: "RESULTS", content: project.results },
              { label: "LIMITATIONS", content: project.limitations },
              { label: "FUTURE IMPROVEMENTS", content: project.futureWork },
            ]
              .filter((s) => s.content)
              .map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: accent, letterSpacing: "0.1em", marginBottom: "10px" }}>
                    {s.label}
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.8, borderLeft: `2px solid ${accent}20`, paddingLeft: "16px" }}>
                    {s.content}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
