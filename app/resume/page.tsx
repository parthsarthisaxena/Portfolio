import type { Metadata } from "next";
import ResumeDownload from "@/components/ResumeDownload";

export const metadata: Metadata = {
  title: "Resume",
  description: "Download Parth Sarthi Saxena's Quant Developer and Software Engineer resumes.",
};

export default function ResumePage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <div style={{ padding: "60px 0 0" }}>
        <div className="section-container" style={{ marginBottom: "0" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#64FFDA", letterSpacing: "0.1em", marginBottom: "12px" }}>
            DOCUMENTS
          </div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#E2E8F0", letterSpacing: "-0.03em", marginBottom: "12px" }}>
            Resume
          </h1>
          <div className="section-divider" />
          <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "540px", marginTop: "16px", marginBottom: "0" }}>
            Two tailored resumes for different recruiting contexts. Each is focused on the
            specific skills and experience that matters most for that role type.
          </p>
        </div>
      </div>
      <ResumeDownload />
    </div>
  );
}
