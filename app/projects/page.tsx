import type { Metadata } from "next";
import ProjectsFilter from "@/components/ProjectsFilter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "All quantitative finance and software engineering projects by Parth Sarthi Saxena — backtesting, trading systems, C++, APIs, and more.",
};

export default function ProjectsPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0 48px" }}>
        <div className="section-container">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#6E8EAD",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            ALL WORK
          </div>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Projects
          </h1>
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "36px",
            }}
          >
            Research and engineering projects spanning quantitative finance,
            systems programming, and data engineering.
          </p>

          <ProjectsFilter />
        </div>
      </section>
    </div>
  );
}
