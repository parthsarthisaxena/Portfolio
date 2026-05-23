"use client";

import AnimateIn from "@/components/AnimateIn";

const skills = [
  { name: "C++", level: 88, color: "#7B9EFF" },
  { name: "Python", level: 92, color: "#64FFDA" },
  { name: "Data Structures & Algorithms", level: 85, color: "#7B9EFF" },
  { name: "Quantitative Research", level: 82, color: "#64FFDA" },
  { name: "Statistical Modeling", level: 80, color: "#64FFDA" },
  { name: "Backend Development", level: 78, color: "#7B9EFF" },
  { name: "Backtesting & Simulation", level: 85, color: "#64FFDA" },
  { name: "REST APIs", level: 80, color: "#7B9EFF" },
  { name: "SQL / Databases", level: 75, color: "#7B9EFF" },
  { name: "Data Analysis & Visualization", level: 87, color: "#64FFDA" },
];

const techBadges = [
  "Python", "C++17", "NumPy", "pandas", "statsmodels",
  "FastAPI", "Docker", "PostgreSQL", "Redis", "Framer Motion",
  "scikit-learn", "Matplotlib", "CMake", "Git", "Linux",
];

export default function CoreSkills() {
  return (
    <section
      id="core-skills"
      style={{
        padding: "100px 0",
        borderTop: "1px solid #1E293B",
        backgroundColor: "#080810",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <AnimateIn style={{ marginBottom: "56px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            TECHNICAL FOUNDATION
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#E2E8F0",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Core Skills
          </h2>
          <div className="section-divider" />
          <p style={{ color: "#64748B", fontSize: "0.9rem", marginTop: "14px", maxWidth: "500px" }}>
            Depth across quantitative methods and engineering systems, with a
            focus on performance and research rigor.
          </p>
        </AnimateIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            marginBottom: "56px",
          }}
        >
          {skills.map((skill) => (
            <div key={skill.name}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "#CBD5E1",
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: "#64748B",
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div
          style={{
            borderTop: "1px solid #1E293B",
            paddingTop: "36px",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#64748B",
              letterSpacing: "0.08em",
              marginBottom: "16px",
            }}
          >
            TECHNOLOGIES & TOOLS
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {techBadges.map((tech, i) => (
              <span
                key={tech}
                className={i % 2 === 0 ? "tag" : "tag tag-blue"}
                style={{ fontSize: "0.78rem" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
