"use client";

const techStack = [
  {
    category: "Languages",
    color: "#64FFDA",
    items: ["C++17/20", "Python", "SQL"],
  },
  {
    category: "Backend & APIs",
    color: "#7B9EFF",
    items: ["FastAPI", "REST", "PostgreSQL", "Redis"],
  },
  {
    category: "Tools & Infra",
    color: "#7B9EFF",
    items: ["Docker", "Git", "Linux", "CMake"],
  },
  {
    category: "Libraries",
    color: "#64FFDA",
    items: ["NumPy", "pandas", "scikit-learn", "Boost", "Google Test"],
  },
];

export default function TechStackBadges() {
  return (
    <div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: "#7B9EFF",
          letterSpacing: "0.1em",
          marginBottom: "28px",
        }}
      >
        TECH STACK
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {techStack.map((group) => (
          <div key={group.category}>
            <div
              style={{
                fontSize: "0.68rem",
                fontFamily: "'JetBrains Mono', monospace",
                color: "#475569",
                letterSpacing: "0.08em",
                marginBottom: "10px",
                textTransform: "uppercase",
              }}
            >
              {group.category}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {group.items.map((item) => (
                <span
                  key={item}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: `1px solid ${group.color}30`,
                    background: `${group.color}08`,
                    color: group.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    transition: "all 0.2s",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${group.color}18`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${group.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${group.color}08`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${group.color}30`;
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
