"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, TrendingUp, Code2 } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/quant", label: "Quant" },
  { href: "/engineering", label: "Engineering" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        backgroundColor: scrolled
          ? "rgba(11, 15, 25, 0.95)"
          : "rgba(11, 15, 25, 0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #1E293B" : "1px solid transparent",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            id="nav-logo"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background:
                  "linear-gradient(135deg, rgba(100,255,218,0.15), rgba(123,158,255,0.15))",
                border: "1px solid rgba(100,255,218,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#64FFDA",
                }}
              >
                PS
              </span>
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                color: "#E2E8F0",
                letterSpacing: "-0.01em",
              }}
            >
              Parth Sarthi Saxena
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
            }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side CTAs */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
            className="hidden-mobile"
          >
            <Link
              href="/quant"
              id="nav-cta-quant"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#64FFDA",
                background: "rgba(100,255,218,0.08)",
                border: "1px solid rgba(100,255,218,0.2)",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
            >
              <TrendingUp size={13} />
              {/* Quant */}
            </Link>
            <Link
              href="/engineering"
              id="nav-cta-eng"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#7B9EFF",
                background: "rgba(123,158,255,0.08)",
                border: "1px solid rgba(123,158,255,0.2)",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.02em",
              }}
            >
              <Code2 size={13} />
              {/* SDE */}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#94A3B8",
              padding: "4px",
              display: "none",
            }}
            className="show-mobile"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            borderTop: "1px solid #1E293B",
            backgroundColor: "rgba(11, 15, 25, 0.98)",
            padding: "16px 24px 20px",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-mobile-${link.label.toLowerCase()}`}
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: isActive ? "#64FFDA" : "#94A3B8",
                  textDecoration: "none",
                  borderBottom: "1px solid #1E293B",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link href="/quant" onClick={closeMenu} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
              Quant Work
            </Link>
            <Link href="/engineering" onClick={closeMenu} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
              Engineering
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
