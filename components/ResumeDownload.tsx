import { ExternalLink, TrendingUp, Code2 } from "lucide-react";

export default function ResumeDownload() {
  return (
    <section
      id="resume-download"
      style={{
        padding: "100px 0",
        backgroundColor: "#0A0A0A",
        borderTop: "1px solid #1C1C1C",
      }}
    >
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: "#6E8EAD",
              letterSpacing: "0.1em",
              marginBottom: "12px",
            }}
          >
            DOCUMENTS
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            View Resume
          </h2>
          <p style={{ color: "#6B7280", fontSize: "0.9rem", marginTop: "12px" }}>
            Two tailored resumes — one for each career path.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          {/* Quant Resume */}
          <div
            className="card"
            style={{
              padding: "32px",
              background: "linear-gradient(135deg, rgba(100,255,218,0.04), #141414)",
              borderColor: "rgba(100,255,218,0.15)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(100,255,218,0.1)",
                border: "1px solid rgba(110, 142, 173,0.20)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <TrendingUp size={20} color="#6E8EAD" />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#FFFFFF",
                marginBottom: "6px",
              }}
            >
              Quant Developer Resume
            </h3>
            <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: "20px", lineHeight: 1.5 }}>
              Focused on quantitative research, trading systems, statistical
              modeling, and algorithmic strategies.
            </p>
            <a
              href="https://drive.google.com/file/d/140X9zqKOs7HilLGdVkw_kJLhkwOwgly6/view?usp=drivesdk"
              id="view-quant-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ justifyContent: "center" }}
            >
              <ExternalLink size={14} />
              View Resume
            </a>
          </div>

          {/* SDE Resume */}
          <div
            className="card"
            style={{
              padding: "32px",
              background: "linear-gradient(135deg, rgba(123,158,255,0.04), #141414)",
              borderColor: "rgba(123,158,255,0.15)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "rgba(123,158,255,0.1)",
                border: "1px solid rgba(255,255,255,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <Code2 size={20} color="#6E8EAD" />
            </div>
            <h3
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "#FFFFFF",
                marginBottom: "6px",
              }}
            >
              Software Engineer Resume
            </h3>
            <p style={{ color: "#6B7280", fontSize: "0.82rem", marginBottom: "20px", lineHeight: 1.5 }}>
              Focused on C++, backend systems, data structures, APIs, and
              engineering projects.
            </p>
            <a
              href="https://drive.google.com/file/d/1Nglko5VzNcxmEO5ar8YoQX6Owd14TLbS/view?usp=drivesdk"
              id="view-sde-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: "center" }}
            >
              <ExternalLink size={14} />
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
