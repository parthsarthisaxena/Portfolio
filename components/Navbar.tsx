"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
        backgroundColor: "#0A0A0A",
        borderBottom: scrolled ? "1px solid #1F1F1F" : "1px solid transparent",
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
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "#6E8EAD",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#FFFFFF",
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
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Parth Sarthi Saxena
            </span>
          </Link>

          {/* Desktop Nav */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "28px" }}
            className="hidden-mobile"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
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

          {/* Contact CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden-mobile">
            <Link
              href="/contact"
              id="nav-cta-contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 18px",
                borderRadius: "7px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#FFFFFF",
                background: "#6E8EAD",
                border: "1px solid #6E8EAD",
                textDecoration: "none",
                transition: "all 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#5A7A9A";
                (e.currentTarget as HTMLElement).style.borderColor = "#5A7A9A";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#6E8EAD";
                (e.currentTarget as HTMLElement).style.borderColor = "#6E8EAD";
              }}
            >
              Contact
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
              color: "#9CA3AF",
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
            borderTop: "1px solid #1F1F1F",
            backgroundColor: "#0A0A0A",
            padding: "16px 24px 20px",
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
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
                  color: isActive ? "#FFFFFF" : "#9CA3AF",
                  textDecoration: "none",
                  borderBottom: "1px solid #1A1A1A",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link
              href="/contact"
              onClick={closeMenu}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: "10px",
                borderRadius: "8px",
                background: "#6E8EAD",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                border: "1px solid #6E8EAD",
              }}
            >
              Contact
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
