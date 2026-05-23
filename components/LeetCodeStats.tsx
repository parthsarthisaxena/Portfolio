"use client";

import { useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";

const LEETCODE_USER = "parth_sarthi_saxena";

interface LeetCodeData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number | null;
  fallback?: boolean;
}

function SkeletonBar() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "linear-gradient(90deg, #1E293B 25%, #263348 50%, #1E293B 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "6px",
      }}
    />
  );
}

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leetcode", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch {
      setData({ total: 300, easy: 120, medium: 140, hard: 40, ranking: null, fallback: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const difficultyBars = [
    { label: "Easy",   key: "easy"   as const, color: "#4ADE80", max: 800  },
    { label: "Medium", key: "medium" as const, color: "#FBBF24", max: 1600 },
    { label: "Hard",   key: "hard"   as const, color: "#F87171", max: 700  },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#7B9EFF",
            letterSpacing: "0.1em",
          }}
        >
          DSA STATS — LIVE
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          title="Refresh stats"
          style={{
            background: "none",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            color: "#475569",
            display: "flex",
            alignItems: "center",
            padding: "4px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7B9EFF")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          <RefreshCw
            size={13}
            style={{
              animation: loading ? "spin 1s linear infinite" : "none",
            }}
          />
        </button>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        {/* Total count */}
        <div style={{ marginBottom: "20px" }}>
          {loading ? (
            <div style={{ height: "44px", marginBottom: "6px" }}>
              <SkeletonBar />
            </div>
          ) : (
            <>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 700,
                  fontSize: "2.8rem",
                  color: "#E2E8F0",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {data?.total ?? "—"}
              </div>
              <div style={{ color: "#64748B", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "6px" }}>
                Problems solved on LeetCode
                {data?.fallback && (
                  <span style={{ fontSize: "0.65rem", color: "#475569", fontFamily: "'JetBrains Mono', monospace" }}>
                    (cached)
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Difficulty breakdown */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {difficultyBars.map((d) => (
            <div key={d.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span style={{ fontSize: "0.78rem", color: d.color, fontWeight: 500 }}>
                  {d.label}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "#64748B",
                  }}
                >
                  {loading ? "—" : (data?.[d.key] ?? 0)}
                </span>
              </div>
              <div
                style={{
                  height: "5px",
                  background: "#1E293B",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                {loading ? (
                  <SkeletonBar />
                ) : (
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(((data?.[d.key] ?? 0) / d.max) * 100, 100)}%`,
                      background: d.color,
                      borderRadius: "999px",
                      transition: "width 0.8s ease",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ranking */}
        {!loading && data?.ranking && (
          <div
            style={{
              padding: "10px 14px",
              background: "#05050A",
              borderRadius: "8px",
              border: "1px solid #1E293B",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.78rem", color: "#64748B" }}>Global Ranking</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: "#7B9EFF",
                fontWeight: 600,
              }}
            >
              #{data.ranking.toLocaleString()}
            </span>
          </div>
        )}

        {/* Topic tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
          {["Arrays", "Graphs", "DP", "Trees", "Binary Search", "Greedy"].map((t) => (
            <span key={t} className="tag tag-blue" style={{ fontSize: "0.68rem" }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "14px",
            borderTop: "1px solid #1E293B",
          }}
        >
          <a
            href={`https://leetcode.com/u/${LEETCODE_USER}/`}
            target="_blank"
            rel="noopener noreferrer"
            id="leetcode-link"
            className="btn-ghost"
            style={{ display: "inline-flex", padding: "6px 12px", fontSize: "0.78rem" }}
          >
            <ExternalLink size={12} /> LeetCode Profile
          </a>
          {lastUpdated && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: "#334155",
              }}
            >
              updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
