import AnimateIn from "@/components/AnimateIn";

const timelineEvents = [
  {
    year: "2024",
    title: "Pairs Trading with Kalman Filter",
    description:
      "Built an adaptive stat-arb system achieving Sharpe 1.84. First project where dynamic hedge ratios meaningfully beat the static baseline.",
    type: "quant",
  },
  {
    year: "2024",
    title: "300+ DSA Problems Solved",
    description:
      "Systematically worked through graphs, DP, trees, and string algorithms in C++. Built intuition for complexity analysis and optimal solutions.",
    type: "engineering",
  },
  {
    year: "2023",
    title: "Built Vectorized Backtesting Engine",
    description:
      "Wrote a reusable backtesting framework from scratch — event-driven, with realistic slippage and walk-forward analysis.",
    type: "quant",
  },
  {
    year: "2023",
    title: "C++ Options Pricing Engine",
    description:
      "Implemented Black-Scholes, binomial trees, and Monte Carlo pricing in C++17. Reached 50M valuations/second on a single core.",
    type: "engineering",
  },
  {
    year: "2023",
    title: "Statistical Arbitrage Research",
    description:
      "Deep-dived into cointegration theory, Engle-Granger testing, and z-score signal construction across the S&P 500 universe.",
    type: "quant",
  },
  {
    year: "2022",
    title: "Started Quantitative Finance Journey",
    description:
      "Self-directed study: stochastic calculus basics, time-series analysis, Python for finance. First backtest on a moving average crossover.",
    type: "quant",
  },
  {
    year: "2022",
    title: "Began Competitive DSA Practice",
    description:
      "Started structured algorithm study with focus on C++. Covered arrays, sorting, binary search, and basic graph theory.",
    type: "engineering",
  },
];



export default function Timeline() {
  return (
    <section
      id="timeline"
      style={{
        padding: "100px 0",
        backgroundColor: "#080810",
        borderTop: "1px solid #1E293B",
      }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "56px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#64FFDA",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            JOURNEY
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#E2E8F0",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Learning & Milestones
          </h2>
          <div className="section-divider" />
        </div>

        <div style={{ position: "relative", paddingLeft: "48px" }}>
          {/* Vertical line */}
          <div className="timeline-line" />

          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {timelineEvents.map((event, idx) => (
              <AnimateIn key={idx} delay={idx * 80} direction="left">
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-38px",
                    top: "6px",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: `2px solid ${event.type === "quant" ? "#64FFDA" : "#7B9EFF"}`,
                    background: "#05050A",
                  }}
                />

                {/* Year badge */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.7rem",
                    color: event.type === "quant" ? "#64FFDA" : "#7B9EFF",
                    letterSpacing: "0.06em",
                    marginBottom: "4px",
                    display: "block",
                  }}
                >
                  {event.year} · {event.type === "quant" ? "QUANT" : "ENGINEERING"}
                </span>

                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#E2E8F0",
                    marginBottom: "6px",
                  }}
                >
                  {event.title}
                </h3>
                <p style={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: "560px" }}>
                  {event.description}
                </p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
