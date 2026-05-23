import type { Metadata } from "next";
import { Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parth Sarthi Saxena — open to quant and software engineering roles.",
};

// TODO: Replace with real details
const CONTACT = {
  email: "parthsarthisaxena95@gmail.com",
  github: "parthsarthisaxena",
  linkedin: "in/parthsarthisaxena",
  location: "India",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0 100px" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>
          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#64FFDA", letterSpacing: "0.1em", marginBottom: "12px" }}>
              GET IN TOUCH
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#E2E8F0", letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Contact
            </h1>
            <div className="section-divider" />
            <p style={{ color: "#94A3B8", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "500px", marginTop: "16px" }}>
              Open to quantitative developer and software engineering roles, research collaborations, and interesting conversations about trading systems and algorithms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
            {/* Contact info */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#64FFDA", letterSpacing: "0.08em", marginBottom: "20px" }}>
                FIND ME AT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <a
                  href={`mailto:${CONTACT.email}`}
                  id="contact-email"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94A3B8", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1E293B", background: "#0F0F1C", transition: "all 0.2s" }}
                >
                  <Mail size={16} color="#64FFDA" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "2px" }}>Email</div>
                    <div style={{ fontSize: "0.875rem", color: "#E2E8F0" }}>{CONTACT.email}</div>
                  </div>
                </a>

                <a
                  href={`https://github.com/${CONTACT.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94A3B8", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1E293B", background: "#0F0F1C", transition: "all 0.2s" }}
                >
                  <GithubIcon size={16} color="#7B9EFF" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "2px" }}>GitHub</div>
                    <div style={{ fontSize: "0.875rem", color: "#E2E8F0" }}>@{CONTACT.github}</div>
                  </div>
                </a>

                <a
                  href={`https://linkedin.com/${CONTACT.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94A3B8", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1E293B", background: "#0F0F1C", transition: "all 0.2s" }}
                >
                  <LinkedinIcon size={16} color="#7B9EFF" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "2px" }}>LinkedIn</div>
                    <div style={{ fontSize: "0.875rem", color: "#E2E8F0" }}>linkedin.com/{CONTACT.linkedin}</div>
                  </div>
                </a>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1E293B", background: "#0F0F1C" }}>
                  <MapPin size={16} color="#64748B" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginBottom: "2px" }}>Location</div>
                    <div style={{ fontSize: "0.875rem", color: "#E2E8F0" }}>{CONTACT.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message form */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#64FFDA", letterSpacing: "0.08em", marginBottom: "20px" }}>
                SEND A MESSAGE
              </div>
              <form
                action={`mailto:${CONTACT.email}`}
                method="GET"
                id="contact-form"
                style={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#64748B", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
                    NAME
                  </label>
                  <input
                    id="contact-name"
                    name="subject"
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "#0F0F1C",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#E2E8F0",
                      fontSize: "0.875rem",
                      outline: "none",
                      fontFamily: "'Inter', sans-serif",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "#64748B", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
                    MESSAGE
                  </label>
                  <textarea
                    id="contact-message"
                    name="body"
                    rows={5}
                    placeholder="Your message..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      background: "#0F0F1C",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#E2E8F0",
                      fontSize: "0.875rem",
                      outline: "none",
                      resize: "vertical",
                      fontFamily: "'Inter', sans-serif",
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
                <button
                  id="contact-submit"
                  type="submit"
                  className="btn-primary"
                  style={{ justifyContent: "center" }}
                >
                  <Send size={14} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
