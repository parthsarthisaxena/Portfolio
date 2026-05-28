"use client";

import { useEffect, useState } from "react";

const GithubSvg = ({ size = 24, color = "#6B7280" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const GITHUB_USERNAME = "parthsarthisaxena";

interface GitHubData {
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLangs: { name: string; pct: number }[];
}

// Skeleton pulse box
function Skeleton({ w = "100%", h = "1.2rem" }: { w?: string; h?: string }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: "4px",
        background: "#1A1A1A",
        animation: "skeleton-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
}

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  "C++": "#f34b7d",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  SQL: "#e38c00",
  C: "#555555",
  Rust: "#dea584",
  Go: "#00ADD8",
};

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(true);
        else setData(d);
      })
      .catch(() => setError(true));
  }, []);

  const stats = data
    ? [
        { label: "Public Repos", value: String(data.publicRepos), color: "#6E8EAD" },
        { label: "Stars Earned", value: String(data.totalStars), color: "#FBBF24" },
        { label: "Followers", value: String(data.followers), color: "#4ADE80" },
      ]
    : null;

  const topLangs = data?.topLangs ?? [];

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
            {/* Live indicator */}
            {data && (
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
                    display: "block",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "#4ADE80",
                  }}
                >
                  LIVE
                </span>
              </div>
            )}
          </div>
          <div className="section-divider" />
        </div>

        {error && (
          <div
            style={{
              padding: "20px",
              borderRadius: "8px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#F87171",
              fontSize: "0.85rem",
              marginBottom: "32px",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Unable to load live GitHub data — showing cached values.
          </div>
        )}

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
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  color: "#6E8EAD",
                  letterSpacing: "0.08em",
                }}
              >
                {GITHUB_USERNAME}
              </span>
            </div>

            {/* Stat cells */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {stats
                ? stats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "12px",
                        background: "#0A0A0A",
                        borderRadius: "8px",
                        border: "1px solid #1C1C1C",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          fontSize: "1.4rem",
                          color: s.color,
                        }}
                      >
                        {s.value}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#6B7280", marginTop: "2px" }}>
                        {s.label}
                      </div>
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "12px",
                        background: "#0A0A0A",
                        borderRadius: "8px",
                        border: "1px solid #1C1C1C",
                      }}
                    >
                      <Skeleton w="60%" h="1.4rem" />
                      <div style={{ marginTop: "6px" }}>
                        <Skeleton w="80%" h="0.72rem" />
                      </div>
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

            {topLangs.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {topLangs.map((lang) => {
                  const color = LANG_COLORS[lang.name] ?? "#6E8EAD";
                  return (
                    <div key={lang.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.875rem",
                            color: "#FFFFFF",
                            fontWeight: 500,
                          }}
                        >
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: color,
                              flexShrink: 0,
                            }}
                          />
                          {lang.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.72rem",
                            color: "#6B7280",
                          }}
                        >
                          {lang.pct}%
                        </span>
                      </div>
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${lang.pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <Skeleton w="40%" h="0.875rem" />
                      <Skeleton w="20%" h="0.72rem" />
                    </div>
                    <div className="skill-bar-track">
                      <Skeleton w="100%" h="100%" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
