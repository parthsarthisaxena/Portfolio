import type { Metadata } from "next";
import { Code2, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import ProjectCard from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/lib/projects";
import LeetCodeStats from "@/components/LeetCodeStats";
import TechStackBadges from "@/components/TechStackBadges";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Backend engineering, C++, data structures, APIs, and systems projects by Parth Sarthi Saxena.",
};

const engineeringPrinciples = [
  { title: "Performance First", desc: "C++ for systems where speed matters. Profiled, benchmarked, optimized." },
  { title: "Clean Abstractions", desc: "Interfaces that make complexity manageable. APIs designed for clarity, not convenience." },
  { title: "Data-Driven", desc: "Engineering decisions backed by metrics and benchmarks, not instinct." },
  { title: "Depth Over Breadth", desc: "Know the tools well. Understand trade-offs. Ship reliable systems." },
];


export default function EngineeringPage() {
  const engProjects = getProjectsByCategory("engineering");

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        style={{
          padding: "80px 0 60px",
          borderBottom: "1px solid #1C1C1C",
          background: "linear-gradient(180deg, rgba(123,158,255,0.03) 0%, transparent 100%)",
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
            background: "radial-gradient(circle, rgba(123,158,255,0.05) 0%, transparent 70%)",
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
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(123,158,255,0.05)",
              marginBottom: "24px",
            }}
          >
            <Code2 size={13} color="#6E8EAD" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.08em" }}>
              SOFTWARE ENGINEERING
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
            Software Developer  
           
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, maxWidth: "600px", marginBottom: "32px" }}>
            C++, Python, APIs, and performance-focused systems engineering. Built around depth, clean architecture, and analytical rigor.
          </p>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { val: "4+", label: "Engineering Projects" },
              { val: "50M/s", label: "C++ Throughput" },
              { val: "300+", label: "DSA Problems" },
              { val: "C++/Python", label: "Primary Stack" },
            ].map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "1.3rem", color: "#6E8EAD" }}>{m.val}</div>
                <div style={{ fontSize: "0.75rem", color: "#6B7280" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #1C1C1C", backgroundColor: "#0A0A0A" }}>
        <div className="section-container">
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "28px" }}>
            ENGINEERING PHILOSOPHY
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {engineeringPrinciples.map((item) => (
              <div key={item.title} className="card" style={{ padding: "20px" }}>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#6E8EAD", marginBottom: "8px" }}>{item.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "0.82rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Stack */}
      <section style={{ padding: "72px 0", borderBottom: "1px solid #1C1C1C" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
            <TechStackBadges />

            <LeetCodeStats />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ padding: "72px 0" }}>
        <div className="section-container">
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "12px" }}>BUILT PROJECTS</div>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#FFFFFF", letterSpacing: "-0.02em", marginBottom: "8px" }}>Engineering Projects</h2>
            <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, #6E8EAD, transparent)", borderRadius: "1px" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {engProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} showCategory={false} />
            ))}
          </div>
        </div>
      </section>

     
    
    </div>
  );
}
