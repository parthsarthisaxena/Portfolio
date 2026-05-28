import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Quant Research",
  description:
    "Quantitative research, algorithmic trading systems, backtesting, and statistical modeling projects by Parth Sarthi Saxena.",
};

const quantPhilosophy = [
  {
    title: "Research First",
    desc: "Every strategy begins with a hypothesis grounded in statistical theory, not pattern-matching.",
  },
  {
    title: "Rigorous Backtesting",
    desc: "Walk-forward analysis, transaction cost modeling, and out-of-sample validation — not curve fitting.",
  },
  {
    title: "Risk Awareness",
    desc: "Drawdown control and position sizing are as important as the signal itself.",
  },
  {
    title: "Adaptive Systems",
    desc: "Markets change. Static parameters fail. Adaptive models that respond to regime shifts are the goal.",
  },
];

export default function QuantPage() {
  const quantProjects = getProjectsByCategory("quant");

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid #1C1C1C",
          background: "linear-gradient(180deg, rgba(100,255,218,0.03) 0%, transparent 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="section-container" style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(110, 142, 173,0.20)",
              background: "rgba(100,255,218,0.05)",
              marginBottom: "24px",
            }}
          >
            <TrendingUp size={13} color="#6E8EAD" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.08em" }}>
              QUANTITATIVE RESEARCH
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Quant Research &{" "}
            <span className="gradient-text">Trading Systems</span>
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", marginBottom: "32px" }}>
            Research-driven quantitative work spanning statistical arbitrage, adaptive signal generation, risk modeling, and systematic backtesting. Every project is hypothesis-driven and empirically validated.
          </p>

          {/* Key metrics bar */}
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { val: "8", label: "Research Projects" },
              { val: "8.2", label: "Peak Sharpe Ratio" },
              { val: "2yr", label: "Backtest Depth" },
              { val: "Python", label: "Primary Stack" },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "1.3rem", color: "#6E8EAD" }}>{m.val}</div>
                <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #1C1C1C", backgroundColor: "#0A0A0A" }}>
        <div className="section-container">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "28px" }}>
            RESEARCH PHILOSOPHY
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {quantPhilosophy.map((item) => (
              <div key={item.title} className="card" style={{ padding: "20px" }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#6E8EAD", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: "72px 0" }}>
        <div className="section-container">
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "12px" }}>
              ALL RESEARCH
            </div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "8px" }}>
              Quant Projects
            </h2>
            <div className="section-divider" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {quantProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} showCategory={false} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
     
    </div>
  );
}
