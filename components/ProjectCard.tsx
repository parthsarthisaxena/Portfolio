"use client";

import { useRouter } from "next/navigation";
import { ExternalLink, TrendingUp, Code2 } from "lucide-react";
import type { Project } from "@/lib/projects";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

interface ProjectCardProps {
  project: Project;
  showCategory?: boolean;
}

export default function ProjectCard({
  project,
  showCategory = true,
}: ProjectCardProps) {
  const isQuant = project.category === "quant";
  const router = useRouter();

  return (
    <div
      id={`project-card-${project.slug}`}
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/projects/${project.slug}`)}
      style={{ textDecoration: "none", display: "block", cursor: "pointer", height: "100%" }}
    >
      <article
        className="card"
        style={{
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "14px",
            gap: "12px",
          }}
        >
          {/* Category icon */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isQuant
                ? "rgba(110, 142, 173,0.10)"
                : "rgba(255,255,255,0.06)",
              border: isQuant
                ? "1px solid rgba(110, 142, 173,0.20)"
                : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {isQuant ? (
              <TrendingUp size={16} color="#6E8EAD" />
            ) : (
              <Code2 size={16} color="#6E8EAD" />
            )}
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-github-${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: "#6B7280",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="GitHub repository"
              >
                <GithubIcon />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`project-demo-${project.slug}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  color: "#6B7280",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Live demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Category badge */}
        {showCategory && (
          <div style={{ marginBottom: "10px" }}>
            <span
              className={isQuant ? "tag" : "tag tag-blue"}
              style={{ fontSize: "0.7rem" }}
            >
              {isQuant ? "Quant" : "Engineering"}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: "1rem",
            color: "#FFFFFF",
            marginBottom: "8px",
            lineHeight: 1.4,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#9CA3AF",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            marginBottom: "16px",
            flexGrow: project.highlights ? 0 : 1,
          }}
        >
          {project.shortDescription}
        </p>

        {/* Highlights — key facts strip */}
        {project.highlights && project.highlights.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              marginBottom: "16px",
              padding: "10px 12px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "6px",
              border: "1px solid #1E1E1E",
              flexGrow: 1,
            }}
          >
            {project.highlights.map((h) => (
              <div
                key={h}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "0.78rem",
                  color: "#A1A1AA",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: "#6E8EAD", flexShrink: 0, marginTop: "1px" }}>›</span>
                {h}
              </div>
            ))}
          </div>
        )}
        {/* Metrics row (quant only) */}
        {isQuant &&
          project.metrics &&
          (project.metrics.sharpeRatio !== undefined ||
            project.metrics.maxDrawdown ||
            project.metrics.winRate ||
            project.metrics.annualizedReturn) && (
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "14px",
                padding: "10px 12px",
                background: "rgba(100,255,218,0.04)",
                borderRadius: "6px",
                border: "1px solid rgba(110, 142, 173,0.10)",
                flexWrap: "wrap",
              }}
            >
              {project.metrics.sharpeRatio !== undefined && (
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#6E8EAD",
                    }}
                  >
                    {project.metrics.sharpeRatio}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#6B7280" }}>
                    Sharpe
                  </div>
                </div>
              )}
              {project.metrics.maxDrawdown && (
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#F87171",
                    }}
                  >
                    {project.metrics.maxDrawdown}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#6B7280" }}>
                    Max DD
                  </div>
                </div>
              )}
              {project.metrics.winRate && (
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#A3E635",
                    }}
                  >
                    {project.metrics.winRate}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#6B7280" }}>
                    Win Rate
                  </div>
                </div>
              )}
              {project.metrics.annualizedReturn && (
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#6E8EAD",
                    }}
                  >
                    {project.metrics.annualizedReturn}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#6B7280" }}>
                    Ann. Return
                  </div>
                </div>
              )}
            </div>
          )}
 
        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className={isQuant ? "tag" : "tag tag-blue"}
              style={{ fontSize: "0.68rem" }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span
              style={{
                fontSize: "0.68rem",
                color: "#6B7280",
                padding: "3px 8px",
              }}
            >
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </article>
    </div>
  );
}
