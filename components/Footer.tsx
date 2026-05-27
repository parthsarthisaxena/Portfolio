import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid #1C1C1C",
        backgroundColor: "#0A0A0A",
        padding: "40px 0 28px",
      }}
    >
      <div className="section-container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "#FFFFFF",
                marginBottom: "8px",
              }}
            >
              Parth Sarthi Saxena
            </div>
            <div
              style={{
                color: "#6B7280",
                fontSize: "0.85rem",
                maxWidth: "320px",
                lineHeight: 1.6,
              }}
            >
              Quantitative Developer & Software Engineer — building data-driven
              systems across finance and engineering.
            </div>
          </div>
 
          {/* Links */}
          <div className="footer-links-container">
            <div className="footer-links-row">
              {[
                { href: "/about", label: "About" },
                { href: "/quant", label: "Quant" },
                { href: "/engineering", label: "Engineering" },
                { href: "/projects", label: "Projects" },
                /*{ href: "/blog", label: "Blog" },*/
                { href: "/resume", label: "Resume" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "#6B7280",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
 
            {/* Social */}
            <div className="footer-social-row">
              <a
                href="https://github.com/parthsarthisaxena"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-github"
                aria-label="GitHub"
                style={{
                  color: "#6B7280",
                  transition: "color 0.2s",
                  display: "flex",
                }}
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com/in/parthsarthisaxena"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-linkedin"
                aria-label="LinkedIn"
                style={{
                  color: "#6B7280",
                  transition: "color 0.2s",
                  display: "flex",
                }}
              >
                <LinkedinIcon />
              </a>
              <a
                href="mailto:parthsarthisaxena95@gmail.com"
                id="footer-email"
                aria-label="Email"
                style={{
                  color: "#6B7280",
                  transition: "color 0.2s",
                  display: "flex",
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1C1C1C",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span
            style={{
              color: "#6B7280",
              fontSize: "0.78rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            © {year} Parth Sarthi Saxena. Built with Next.js & Tailwind.
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#6B7280",
              fontSize: "0.78rem",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#6E8EAD",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            open to opportunities
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        footer a:hover { color: #FFFFFF; }
      `}</style>
    </footer>
  );
}
