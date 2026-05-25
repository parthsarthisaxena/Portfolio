"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Code2, ArrowRight, ChevronDown } from "lucide-react";

const TYPING_PHRASES = [
  "Building adaptive trading systems.",
  "Designing high-performance C++ engines.",
  "Researching statistical arbitrage.",
  "Modeling market regimes with HMMs.",
  "Engineering scalable backend APIs.",
];

function useTypewriter(phrases: string[], speed = 55, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setCharIdx(0);
          setPhraseIdx((i) => (i + 1) % phrases.length);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return display;
}

export default function Hero() {
  const typed = useTypewriter(TYPING_PHRASES);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Dot grid background */}
      <div
        className="dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div className="hero-glow" />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(123,158,255,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          bottom: "-100px",
          left: "-50px",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ maxWidth: "800px" }}>
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6E8EAD",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.75rem",
                color: "#FFFFFF",
                letterSpacing: "0.08em",
              }}
            >
              QUANT DEVELOPER &amp; SOFTWARE ENGINEER
            </span>
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              marginBottom: "8px",
            }}
          >
            Parth Sarthi
            <br />
            <span className="gradient-text">Saxena</span>
          </h1>

          {/* Typewriter */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              color: "#FFFFFF",
              minHeight: "32px",
              marginBottom: "24px",
            }}
          >
            <span>{typed}</span>
            <span className="typewriter-cursor" />
          </div>

          {/* Subheading */}
          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "#9CA3AF",
              lineHeight: 1.7,
              maxWidth: "600px",
              marginBottom: "40px",
            }}
          >
            Building data-driven systems across{" "}
            <span style={{ color: "#FFFFFF" }}>quantitative finance</span>,{" "}
            <span style={{ color: "#FFFFFF" }}>backend engineering</span>, and
            algorithmic research. Focused on depth, rigor, and technical
            precision.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "56px" }}>
            <Link href="/quant" id="hero-cta-quant" className="btn-primary">
              <TrendingUp size={16} />
              Explore Quant Work
              <ArrowRight size={14} />
            </Link>
            <Link href="/engineering" id="hero-cta-eng" className="btn-secondary">
              <Code2 size={16} />
              Explore Engineering
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "32px",
              flexWrap: "wrap",
              paddingTop: "32px",
              borderTop: "1px solid #1C1C1C",
            }}
          >
            {[
              { value: "9+", label: "Quant Projects" },
              { value: "1.84", label: "Best Sharpe Ratio" },
              { value: "300+", label: "DSA Problems" },
              { value: "C++/Python", label: "Core Stack" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "2px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <a
        href="#core-skills"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#6B7280",
          animation: "bounce 2s ease-in-out infinite",
          textDecoration: "none",
        }}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </a>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
