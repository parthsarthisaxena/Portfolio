"use client";

import AnimateIn from "@/components/AnimateIn";
import { TrendingUp, Code2, Database, BarChart2 } from "lucide-react";

const skillGroups = [
  {
    label: "Quantitative",
    icon: <TrendingUp size={13} />,
    skills: [
      "Statistical Arbitrage",
      "Backtesting & Walk-Forward",
      "Time-Series Analysis",
      "Risk Modeling (VaR / CVaR)",
      "Kalman Filtering",
      "Market Regime Detection",
    ],
  },
  {
    label: "Engineering",
    icon: <Code2 size={13} />,
    skills: [
      "C++",
      "Python",
      "Data Structures & Algorithms",
      "FastAPI / REST",
      "PostgreSQL / SQL",
      "Docker",
    ],
  },
  {
    label: "Data & Research",
    icon: <BarChart2 size={13} />,
    skills: [
      "NumPy / pandas",
      "scikit-learn",
      "Matplotlib / Plotly",
      "statsmodels",
      "Data Pipelines",
      "Jupyter / Notebooks",
    ],
  },
  {
    label: "Infrastructure",
    icon: <Database size={13} />,
    skills: [
      "Git / GitHub",
      "Linux / Shell",
      "CMake",
      "Google Test",
      "Redis",
      "REST API Design",
    ],
  },
];

export default function CoreSkills() {
  return (
    <section
      id="core-skills"
      style={{
        padding: "100px 0",
        borderTop: "1px solid #1E1E1E",
        backgroundColor: "#0A0A0A",
      }}
    >
      <div className="section-container">
        {/* Header */}
        <AnimateIn style={{ marginBottom: "56px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#6E8EAD",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            TECHNICAL SKILLS
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}
          >
            Core Skills
          </h2>
          <div className="section-divider" />
          <p style={{ color: "#52525B", fontSize: "0.9rem", marginTop: "14px", maxWidth: "480px", lineHeight: 1.6 }}>
            Depth across quantitative methods and engineering systems, built through self-study and hands-on projects.
          </p>
        </AnimateIn>

        {/* Skill groups grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.label}
              style={{
                background: "#111111",
                border: "1px solid #1E1E1E",
                borderRadius: "12px",
                padding: "22px",
              }}
            >
              {/* Group header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  marginBottom: "18px",
                  color: "#6E8EAD",
                }}
              >
                {group.icon}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.68rem",
                    letterSpacing: "0.1em",
                    color: "#6E8EAD",
                  }}
                >
                  {group.label.toUpperCase()}
                </span>
              </div>

              {/* Skills list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      background: "#0A0A0A",
                      border: "1px solid #1A1A1A",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#2E2E2E",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.825rem",
                        color: "#A1A1AA",
                        fontWeight: 400,
                      }}
                    >
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
