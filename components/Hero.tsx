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

// Animated live chart
function QuantChart() {
  const W = 380;
  const H = 160;
  const NUM = 48;

  const [points, setPoints] = useState<number[]>(() => {
    const initial: number[] = [];
    let v = 60;
    for (let i = 0; i < NUM; i++) {
      v = Math.max(20, Math.min(140, v + (Math.random() - 0.46) * 8));
      initial.push(v);
    }
    return initial;
  });

  useEffect(() => {
    const id = setInterval(() => {
      setPoints((prev) => {
        const last = prev[prev.length - 1] ?? 60;
        const next = Math.max(20, Math.min(140, last + (Math.random() - 0.46) * 7));
        return [...prev.slice(1), next];
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  if (points.length < 2) return null;

  const xs = points.map((_, i) => (i / (NUM - 1)) * W);
  const ys = points.map((v) => H - ((v - 10) / (150 - 10)) * H);

  const linePath = points
    .map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L ${xs[xs.length - 1].toFixed(1)} ${H} L ${xs[0].toFixed(1)} ${H} Z`;

  const lastY = ys[ys.length - 1];
  const lastX = xs[xs.length - 1];
  const prevIndex = Math.max(0, points.length - 5);
  const trend = points[points.length - 1] > points[prevIndex] ? "up" : "down";
  const trendColor = trend === "up" ? "#4ADE80" : "#F87171";

  return (
    <div style={{ position: "relative" }}>
      {/* Chart header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#52525B",
              letterSpacing: "0.08em",
              marginBottom: "2px",
            }}
          >
            PORTFOLIO EQUITY CURVE
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#FFFFFF",
            }}
          >
            +170.88%
            <span
              style={{
                fontSize: "0.7rem",
                color: "#4ADE80",
                marginLeft: "6px",
                fontWeight: 400,
              }}
            >
              ↑ Net Return
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.18)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#4ADE80",
              animation: "pulse-green 1.5s ease-in-out infinite",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              color: "#4ADE80",
            }}
          >
            LIVE SIM
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", overflow: "visible" }}
        aria-hidden={true}
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={trendColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1={0}
            y1={H * r}
            x2={W}
            y2={H * r}
            stroke="#1A1A1A"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#chartGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={trendColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{ transition: "d 0.5s ease" }}
        />

        {/* Live dot */}
        <circle
          cx={lastX}
          cy={lastY}
          r="4"
          fill={trendColor}
          style={{ filter: `drop-shadow(0 0 4px ${trendColor})` }}
        />
        <circle
          cx={lastX}
          cy={lastY}
          r="8"
          fill="none"
          stroke={trendColor}
          strokeWidth="1"
          strokeOpacity="0.4"
          style={{ animation: "ping 1.5s ease-out infinite" }}
        />
      </svg>

      {/* X axis labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "6px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          color: "#3A3A3A",
        }}
      >
        {["2016", "2018", "2020", "2022", "2024", "2026"].map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
    </div>
  );
}

// Floating metric pill
function MetricPill({
  label,
  value,
  color = "#6E8EAD",
  delay = 0,
}: {
  label: string;
  value: string;
  color?: string;
  delay?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 14px",
        borderRadius: "8px",
        background: "#111111",
        border: "1px solid #1E1E1E",
        animation: `floatY 4s ease-in-out infinite`,
        animationDelay: `${delay}ms`,
        minWidth: "90px",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: "1rem",
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.65rem",
          color: "#52525B",
          marginTop: "2px",
        }}
      >
        {label}
      </span>
    </div>
  );
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

      {/* Glow blobs */}
      <div className="hero-glow" />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(110,142,173,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          top: "10%",
          right: "-100px",
        }}
      />

      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1, width: "100%" }}
      >
        <div className="hero-two-col">
          {/* ── LEFT COLUMN ── */}
          <div className="hero-left">
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
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
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
                fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                color: "#FFFFFF",
                minHeight: "28px",
                marginBottom: "20px",
              }}
            >
              <span>{typed}</span>
              <span className="typewriter-cursor" />
            </div>

            {/* Subheading */}
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                color: "#9CA3AF",
                lineHeight: 1.7,
                maxWidth: "480px",
                marginBottom: "36px",
              }}
            >
              Building data-driven systems across{" "}
              <span style={{ color: "#FFFFFF" }}>quantitative finance</span>,{" "}
              <span style={{ color: "#FFFFFF" }}>backend engineering</span>, and
              algorithmic research. Focused on depth, rigor, and technical
              precision.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "48px" }}>
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
                paddingTop: "28px",
                borderTop: "1px solid #1C1C1C",
              }}
            >
              {[
                { value: "9+", label: "Projects" },
                { value: "8.2", label: "Best Sharpe Ratio" },
                { value: "300+", label: "DSA Problems" },
                { value: "C++/Python", label: "Core Stack" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#FFFFFF",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#6B7280", marginTop: "2px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Quant Visualization ── */}
          <div className="hero-right">
            <div className="quant-panel">
              {/* Chart panel */}
              <div
                style={{
                  background: "#0D0D0D",
                  border: "1px solid #1E1E1E",
                  borderRadius: "14px",
                  padding: "20px 22px",
                  marginBottom: "14px",
                }}
              >
                <QuantChart />
              </div>

              {/* Metric pills row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <MetricPill label="Sharpe Ratio" value="4.91" color="#6E8EAD" delay={0} />
                <MetricPill label="Max Drawdown" value="14.5%" color="#F87171" delay={400} />
                <MetricPill label="Win Rate" value="63.2%" color="#4ADE80" delay={800} />
              </div>

              {/* Strategy info row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "8px",
                    background: "#0D0D0D",
                    border: "1px solid #1A1A1A",
                    animation: "floatY 4.5s ease-in-out infinite",
                    animationDelay: "200ms",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "#52525B",
                      letterSpacing: "0.06em",
                      marginBottom: "5px",
                    }}
                  >
                    STRATEGY
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: "#A1A1AA",
                      fontWeight: 500,
                    }}
                  >
                    GSR Mean-Reversion
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#3A3A3A",
                      marginTop: "2px",
                    }}
                  >
                    MCX Gold/Silver Futures
                  </div>
                </div>

                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "8px",
                    background: "#0D0D0D",
                    border: "1px solid #1A1A1A",
                    animation: "floatY 4.5s ease-in-out infinite",
                    animationDelay: "600ms",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "#52525B",
                      letterSpacing: "0.06em",
                      marginBottom: "5px",
                    }}
                  >
                    BACKTEST
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: "#A1A1AA",
                      fontWeight: 500,
                    }}
                  >
                    10 Year Period
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: "#3A3A3A",
                      marginTop: "2px",
                    }}
                  >
                    May 2016 – May 2026
                  </div>
                </div>
              </div>

              {/* Calmar / Net return bottom strip */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "14px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(110,142,173,0.05)",
                  border: "1px solid rgba(110,142,173,0.12)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#52525B",
                      letterSpacing: "0.06em",
                    }}
                  >
                    CALMAR RATIO
                  </span>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#6E8EAD",
                    }}
                  >
                    11.78
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#52525B",
                      letterSpacing: "0.06em",
                    }}
                  >
                    NET RETURN
                  </span>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#4ADE80",
                    }}
                  >
                    +170.88%
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "#52525B",
                      letterSpacing: "0.06em",
                    }}
                  >
                    TRADES
                  </span>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#FFFFFF",
                    }}
                  >
                    76
                  </div>
                </div>
              </div>
            </div>
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
        @keyframes pulse-green {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74,222,128,0); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* Two-column layout */
        .hero-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          min-height: calc(100vh - 80px);
          padding: 40px 0;
        }
        .hero-left {}
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .quant-panel {
          width: 100%;
          animation: fadeInRight 0.8s ease both;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Collapse to single column on tablet/mobile */
        @media (max-width: 900px) {
          .hero-two-col {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hero-right {
            justify-content: flex-start;
          }
          .quant-panel {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
