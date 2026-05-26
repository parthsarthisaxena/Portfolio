'use client';

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Send } from "lucide-react";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setErrorMessage(body?.error || "Unable to send message right now. Please try again later.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setFormData(INITIAL_STATE);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} id="contact-form" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.78rem", color: "#6B7280", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
            NAME
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "#111111",
              border: "1px solid #1C1C1C",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.78rem", color: "#6B7280", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
            EMAIL
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email"
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "#111111",
              border: "1px solid #1C1C1C",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.78rem", color: "#6B7280", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
            SUBJECT
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "#111111",
              border: "1px solid #1C1C1C",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              outline: "none",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.78rem", color: "#6B7280", marginBottom: "6px", fontFamily: "'JetBrains Mono', monospace" }}>
            MESSAGE
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
            style={{
              width: "100%",
              padding: "10px 14px",
              background: "#111111",
              border: "1px solid #1C1C1C",
              borderRadius: "8px",
              color: "#FFFFFF",
              fontSize: "0.875rem",
              outline: "none",
              resize: "vertical",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        {status === "success" && (
          <div style={{ color: "#34D399", fontSize: "0.9rem" }}>
            Thanks! Your message was sent successfully.
          </div>
        )}

        {status === "error" && (
          <div style={{ color: "#F87171", fontSize: "0.9rem" }}>{errorMessage}</div>
        )}

        <button
          id="contact-submit"
          type="submit"
          className="btn-primary"
          disabled={status === "sending"}
          style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
        >
          <Send size={14} /> {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
