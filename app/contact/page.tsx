"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

const CONTACT = {
  email: "parthsarthisaxena95@gmail.com",
  github: "parthsarthisaxena",
  linkedin: "in/parthsarthisaxena",
  location: "Jaipur, India",
};

type Status = "idle" | "loading" | "success" | "error";

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  background: "#111111",
  border: "1px solid #1E1E1E",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "0.875rem",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.7rem",
  color: "#52525B",
  marginBottom: "6px",
  fontFamily: "'JetBrains Mono', monospace",
  letterSpacing: "0.08em",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const getBorderColor = (field: string) =>
    focused === field ? "#2E2E2E" : "#1E1E1E";

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0 100px" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>

          {/* Header */}
          <div style={{ marginBottom: "56px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "12px" }}>
              GET IN TOUCH
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "16px" }}>
              Contact
            </h1>
            <div className="section-divider" />
            <p style={{ color: "#A1A1AA", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "500px", marginTop: "16px" }}>
              Open to quant developer and software engineering roles, research collaborations, and interesting conversations about trading systems and algorithms.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "48px", alignItems: "start" }}>

            {/* Left — Contact info */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#52525B", letterSpacing: "0.08em", marginBottom: "20px" }}>
                FIND ME AT
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { href: `mailto:${CONTACT.email}`, icon: <Mail size={15} color="#6E8EAD" />, label: "Email", value: CONTACT.email },
                  { href: `https://github.com/${CONTACT.github}`, icon: <GithubIcon size={15} color="#6E8EAD" />, label: "GitHub", value: `@${CONTACT.github}` },
                  { href: `https://linkedin.com/${CONTACT.linkedin}`, icon: <LinkedinIcon size={15} color="#6E8EAD" />, label: "LinkedIn", value: `linkedin.com/${CONTACT.linkedin}` },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: "12px",
                      padding: "13px 16px", borderRadius: "8px",
                      border: "1px solid #1E1E1E", background: "#111111",
                      textDecoration: "none", transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2E2E2E")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1E1E1E")}
                  >
                    {item.icon}
                    <div>
                      <div style={{ fontSize: "0.68rem", color: "#52525B", marginBottom: "2px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>{item.label}</div>
                      <div style={{ fontSize: "0.82rem", color: "#FFFFFF" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "13px 16px", borderRadius: "8px", border: "1px solid #1E1E1E", background: "#111111" }}>
                  <MapPin size={15} color="#52525B" />
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "#52525B", marginBottom: "2px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>Location</div>
                    <div style={{ fontSize: "0.82rem", color: "#FFFFFF" }}>{CONTACT.location}</div>
                  </div>
                </div>
              </div>

              {/* Response note */}
              <div style={{ marginTop: "24px", padding: "14px 16px", borderRadius: "8px", border: "1px solid #1E1E1E", background: "#0D0D0D" }}>
                <div style={{ fontSize: "0.72rem", color: "#52525B", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", marginBottom: "4px" }}>RESPONSE TIME</div>
                <div style={{ fontSize: "0.82rem", color: "#A1A1AA" }}>Usually within 24–48 hours.</div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#52525B", letterSpacing: "0.08em", marginBottom: "20px" }}>
                SEND A MESSAGE
              </div>

              {status === "success" ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px", textAlign: "center", border: "1px solid #1E1E1E", borderRadius: "12px", background: "#111111", gap: "16px" }}>
                  <CheckCircle size={36} color="#6E8EAD" strokeWidth={1.5} />
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "#FFFFFF", marginBottom: "8px" }}>Message sent!</div>
                    <div style={{ fontSize: "0.875rem", color: "#A1A1AA" }}>I'll get back to you within 24–48 hours.</div>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-ghost"
                    style={{ marginTop: "8px", fontSize: "0.8rem" }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={labelStyle}>NAME <span style={{ color: "#6E8EAD" }}>*</span></label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        required
                        style={{ ...inputStyle, borderColor: getBorderColor("name") }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>EMAIL <span style={{ color: "#6E8EAD" }}>*</span></label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        required
                        style={{ ...inputStyle, borderColor: getBorderColor("email") }}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={labelStyle}>SUBJECT</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, borderColor: getBorderColor("subject") }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>MESSAGE <span style={{ color: "#6E8EAD" }}>*</span></label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Your message..."
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      style={{ ...inputStyle, borderColor: getBorderColor("message"), resize: "vertical" }}
                    />
                  </div>

                  {/* Error message */}
                  {status === "error" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "7px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                      <AlertCircle size={14} color="#F87171" />
                      <span style={{ fontSize: "0.82rem", color: "#F87171" }}>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary"
                    style={{ justifyContent: "center", opacity: status === "loading" ? 0.7 : 1, cursor: status === "loading" ? "not-allowed" : "pointer" }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader size={14} style={{ animation: "spin 1s linear infinite" }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Message
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: "0.72rem", color: "#52525B", textAlign: "center", margin: 0 }}>
                    Fields marked <span style={{ color: "#6E8EAD" }}>*</span> are required
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        input::placeholder, textarea::placeholder { color: #3F3F46; }
        input:focus, textarea:focus { border-color: #2E2E2E !important; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
