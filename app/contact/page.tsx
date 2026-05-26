import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";
import ContactForm from "@/components/ContactForm";

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
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "12px" }}>
              GET IN TOUCH
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Contact
            </h1>
            <div className="section-divider" />
            <p style={{ color: "#9CA3AF", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "500px", marginTop: "16px" }}>
              Open to quantitative developer and software engineering roles, research collaborations, and interesting conversations about trading systems and algorithms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
            {/* Contact info */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#6E8EAD", letterSpacing: "0.08em", marginBottom: "20px" }}>
                FIND ME AT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <a
                  href={`mailto:${CONTACT.email}`}
                  id="contact-email"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#9CA3AF", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1C1C1C", background: "#111111", transition: "all 0.2s" }}
                >
                  <Mail size={16} color="#6E8EAD" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#6B7280", marginBottom: "2px" }}>Email</div>
                    <div style={{ fontSize: "0.875rem", color: "#FFFFFF" }}>{CONTACT.email}</div>
                  </div>
                </a>

                <a
                  href={`https://github.com/${CONTACT.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#9CA3AF", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1C1C1C", background: "#111111", transition: "all 0.2s" }}
                >
                  <GithubIcon size={16} color="#6E8EAD" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#6B7280", marginBottom: "2px" }}>GitHub</div>
                    <div style={{ fontSize: "0.875rem", color: "#FFFFFF" }}>@{CONTACT.github}</div>
                  </div>
                </a>

                <a
                  href={`https://linkedin.com/${CONTACT.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#9CA3AF", textDecoration: "none", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1C1C1C", background: "#111111", transition: "all 0.2s" }}
                >
                  <LinkedinIcon size={16} color="#6E8EAD" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#6B7280", marginBottom: "2px" }}>LinkedIn</div>
                    <div style={{ fontSize: "0.875rem", color: "#FFFFFF" }}>linkedin.com/{CONTACT.linkedin}</div>
                  </div>
                </a>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1C1C1C", background: "#111111" }}>
                  <MapPin size={16} color="#6B7280" />
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "#6B7280", marginBottom: "2px" }}>Location</div>
                    <div style={{ fontSize: "0.875rem", color: "#FFFFFF" }}>{CONTACT.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message form */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "#6E8EAD", letterSpacing: "0.08em", marginBottom: "20px" }}>
                SEND A MESSAGE
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
