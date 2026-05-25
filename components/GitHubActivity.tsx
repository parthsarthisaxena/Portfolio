"use client";

import Image from "next/image";

const GithubSvg = ({ size = 24, color = "#6B7280" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const GITHUB_USERNAME = "parthsarthisaxena";

const stats = [
  { label: "Public Repos", value: "18+", color: "#6E8EAD" },
  { label: "Total Commits", value: "600+", color: "#6E8EAD" },
  { label: "Stars Earned", value: "24", color: "#FBBF24" },
  { label: "Pull Requests", value: "35+", color: "#4ADE80" },
];

const topLangs = [
  { name: "Python", pct: 52 },
  { name: "C++", pct: 28 },
  { name: "TypeScript", pct: 12 },
  { name: "SQL", pct: 8 },
];

export default function GitHubActivity() {
  return (
    <section
      id="github-activity"
      style={{ padding: "100px 0", borderTop: "1px solid #1C1C1C" }}
    >
      <div className="section-container">
        <div style={{ marginBottom: "48px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#6E8EAD",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            OPEN SOURCE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              GitHub Activity
            </h2>
            <GithubSvg size={24} color="#6B7280" />
          </div>
          <div className="section-divider" />
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {/* GitHub stats card */}
          <div className="card" style={{ padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <GithubSvg size={18} color="#6E8EAD" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.08em" }}>
                {GITHUB_USERNAME}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "12px",
                    background: "#0A0A0A",
                    borderRadius: "8px",
                    border: "1px solid #1C1C1C",
                  }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: "1.2rem", color: s.color }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#6B7280", marginTop: "2px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top languages card */}
          <div className="card" style={{ padding: "24px" }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                color: "#6E8EAD",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              MOST USED LANGUAGES
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {topLangs.map((lang) => (
                <div key={lang.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.875rem", color: "#FFFFFF", fontWeight: 500 }}>{lang.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6B7280" }}>
                      {lang.pct}%
                    </span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${lang.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contribution graph — using ghchart.rshah.org which is more reliable */}
        <div
          className="card"
          style={{ padding: "20px", overflow: "hidden", marginBottom: "24px" }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#6B7280",
              letterSpacing: "0.08em",
              marginBottom: "12px",
            }}
          >
            CONTRIBUTION ACTIVITY
          </div>
          <Image
            src={`https://ghchart.rshah.org/64FFDA/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Graph"
            width={800}
            height={200}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "brightness(0.9) saturate(1.2)",
              borderRadius: "4px",
            }}
            onError={() => {
              const img = document.getElementById("github-activity-graph") as HTMLImageElement | null;
              if (img) img.style.display = "none";
            }}
            id="github-activity-graph"
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            id="github-profile-link"
            className="btn-ghost"
            style={{ display: "inline-flex" }}
          >
            <GithubSvg size={15} color="currentColor" />
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
