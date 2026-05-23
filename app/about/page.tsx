import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  TrendingUp,
  Code2,
  ArrowRight,
  BookOpen,
  Zap,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Parth Sarthi Saxena — an ECE student who self-taught programming and is breaking into quantitative finance through relentless self-study and real projects.",
};

const education = {
  degree: "B.Tech — Electronics & Communication Engineering",
  school: "JECRC Foundation, Jaipur",
  period: "2023 – 2027",
  courses: [
    "Data Structures & Algorithms",
    "Probability & Statistics",
    "Linear Algebra",
    "Stochastic Processes",
    "Financial Mathematics",
  ],
};

const journey = [
  {
    icon: Zap,
    title: "Started from Zero",
    desc: "ECE student with no formal CS background. Picked up C++ and Python entirely on my own — tutorials, books, and a lot of trial and error.",
    color: "#64FFDA",
  },
  {
    icon: Code2,
    title: "Went Deep on Algorithms",
    desc: "Solved 300+ DSA problems in C++. Not for the badge — to build the kind of algorithmic thinking that serious systems demand.",
    color: "#7B9EFF",
  },
  {
    icon: BookOpen,
    title: "Discovered Quant Finance",
    desc: "Self-studied the mathematics behind trading: stochastic processes, time-series analysis, statistical arbitrage. Then built real backtested systems to prove the theory works.",
    color: "#64FFDA",
  },
  {
    icon: Target,
    title: "Now Targeting the Industry",
    desc: "Open to quant developer roles, trading system engineering, and SDE positions at fintech firms. Looking to turn years of self-study into a full-time career in markets.",
    color: "#7B9EFF",
  },
];

const skills = {
  quant: [
    { name: "Statistical Arbitrage", level: 90 },
    { name: "Backtesting & Walk-Forward", level: 92 },
    { name: "Time-Series Analysis", level: 85 },
    { name: "Risk Modeling (VaR / CVaR)", level: 80 },
    { name: "Kalman Filtering", level: 82 },
    { name: "Market Regime Detection", level: 78 },
  ],
  engineering: [
    { name: "C++17/20", level: 88 },
    { name: "Python", level: 93 },
    { name: "Data Structures & Algorithms", level: 90 },
    { name: "FastAPI / REST", level: 80 },
    { name: "PostgreSQL / SQL", level: 75 },
    { name: "Docker", level: 70 },
  ],
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px" }}>

      {/* ── Hero / Story ─────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 0 72px",
          borderBottom: "1px solid #1E293B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-80px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="section-container" style={{ position: "relative" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            ABOUT ME
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "48px",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#E2E8F0",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: "28px",
                }}
              >
                An ECE student who{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #64FFDA 0%, #7B9EFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  taught himself
                </span>{" "}
                to fight for a seat at the table.
              </h1>

              <p
                style={{
                  color: "#94A3B8",
                  fontSize: "1.05rem",
                  lineHeight: 1.85,
                  maxWidth: "620px",
                  marginBottom: "20px",
                }}
              >
                I&apos;m Parth Sarthi Saxena — a B.Tech ECE student at JECRC
                Foundation who had no formal CS background and decided to build
                one from scratch. I taught myself programming, fell deep into
                algorithms, and then discovered quantitative finance — the field
                where math, code, and markets collide.
              </p>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                  maxWidth: "620px",
                  marginBottom: "32px",
                }}
              >
                Most people in this space come from IITs and CS departments. I
                came from Electronics &amp; Communication, fought through the
                imposter syndrome, and built{" "}
                <span style={{ color: "#94A3B8" }}>
                  9+ quant projects, 300+ DSA solutions, and a backtesting
                  engine from scratch
                </span>{" "}
                — all self-directed, all real. The goal now is to take this into
                a full-time career in algorithmic trading and quantitative
                systems.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/quant" id="about-cta-quant" className="btn-primary">
                  <TrendingUp size={15} /> See Quant Work <ArrowRight size={14} />
                </Link>
                <Link href="/contact" id="about-cta-contact" className="btn-secondary">
                  Get in Touch <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Info card */}
            <div style={{ minWidth: "210px" }}>
              <div
                className="card"
                style={{
                  padding: "24px 22px",
                  background:
                    "linear-gradient(135deg, rgba(100,255,218,0.04), #0F0F1C)",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(100,255,218,0.15), rgba(123,158,255,0.15))",
                    border: "2px solid rgba(100,255,218,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#64FFDA",
                  }}
                >
                  PS
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#E2E8F0",
                    textAlign: "center",
                    marginBottom: "4px",
                  }}
                >
                  Parth Sarthi Saxena
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#64748B",
                    fontFamily: "'JetBrains Mono', monospace",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  ECE → Quant Developer
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    fontSize: "0.78rem",
                  }}
                >
                  {[
                    { label: "Degree", val: "B.Tech ECE" },
                    { label: "College", val: "JECRC" },
                    { label: "Batch", val: "2023 – 2027" },
                    { label: "Location", val: "India" },
                    { label: "Status", val: "Open to roles" },
                    { label: "Stack", val: "C++ / Python" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "#64748B" }}>{row.label}</span>
                      <span
                        style={{
                          color: row.label === "Status" ? "#64FFDA" : "#CBD5E1",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          textAlign: "right",
                        }}
                      >
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Journey ──────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 0",
          borderBottom: "1px solid #1E293B",
          backgroundColor: "#080810",
        }}
      >
        <div className="section-container">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "40px",
            }}
          >
            HOW I GOT HERE
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {journey.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="card" style={{ padding: "24px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={16} color={step.color} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: "#475569",
                        letterSpacing: "0.06em",
                      }}
                    >
                      STEP {i + 1}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "#E2E8F0",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      color: "#64748B",
                      fontSize: "0.83rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 0",
          borderBottom: "1px solid #1E293B",
        }}
      >
        <div className="section-container">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "36px",
            }}
          >
            EDUCATION
          </div>

          <div className="card" style={{ padding: "28px 32px", maxWidth: "720px" }}>
            <div style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: "rgba(100,255,218,0.1)",
                  border: "1px solid rgba(100,255,218,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={19} color="#64FFDA" />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#E2E8F0",
                    }}
                  >
                    {education.degree}
                  </h3>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      color: "#64748B",
                    }}
                  >
                    {education.period}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#64FFDA",
                    marginBottom: "16px",
                  }}
                >
                  {education.school}
                </div>

                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#475569",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  RELEVANT COURSEWORK
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {education.courses.map((c) => (
                    <span key={c} className="tag" style={{ fontSize: "0.72rem" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 0",
          borderBottom: "1px solid #1E293B",
          backgroundColor: "#080810",
        }}
      >
        <div className="section-container">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "40px",
            }}
          >
            TECHNICAL SKILLS
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "56px",
            }}
          >
            {/* Quant */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                <TrendingUp size={15} color="#64FFDA" />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#64FFDA",
                    letterSpacing: "0.08em",
                  }}
                >
                  QUANTITATIVE
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {skills.quant.map((s) => (
                  <div key={s.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", color: "#CBD5E1", fontWeight: 500 }}>
                        {s.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.72rem",
                          color: "#64748B",
                        }}
                      >
                        {s.level}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                <Code2 size={15} color="#7B9EFF" />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: "#7B9EFF",
                    letterSpacing: "0.08em",
                  }}
                >
                  ENGINEERING
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {skills.engineering.map((s) => (
                  <div key={s.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem", color: "#CBD5E1", fontWeight: 500 }}>
                        {s.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.72rem",
                          color: "#64748B",
                        }}
                      >
                        {s.level}%
                      </span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${s.level}%`,
                          background: "linear-gradient(90deg, #7B9EFF, #64FFDA88)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section style={{ padding: "80px 0 100px", textAlign: "center" }}>
        <div className="section-container">
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "16px",
            }}
          >
            WHAT&apos;S NEXT
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#E2E8F0",
              letterSpacing: "-0.02em",
              marginBottom: "14px",
            }}
          >
            Looking for my first role in Quant / Trading
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              maxWidth: "480px",
              margin: "0 auto 28px",
            }}
          >
            Internships, junior quant developer roles, SDE positions at fintech
            companies — if you work on markets, systems, or algorithms, I&apos;d
            love to talk.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              id="about-contact-cta"
              className="btn-primary"
              style={{ display: "inline-flex" }}
            >
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link
              href="/projects"
              id="about-projects-cta"
              className="btn-ghost"
              style={{ display: "inline-flex" }}
            >
              See My Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
