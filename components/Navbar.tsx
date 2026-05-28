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
 /* { href: "/blog", label: "Blog" },*/
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
            <div className="nav-logo-icon">
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  letterSpacing: "0.05em",
                }}
              >
                PS
              </span>
            </div>
            <span className="nav-logo-text">
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
        </div>
      )}

      <style>{`
        .nav-logo-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, #00F2FE 0%, #4FACFE 50%, #9B51E0 100%);
          background-size: 200% 200%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 12px rgba(79, 172, 254, 0.3);
        }
        #nav-logo:hover .nav-logo-icon {
          transform: rotate(8deg) scale(1.08);
          background-position: right center;
          box-shadow: 0 0 20px rgba(155, 81, 224, 0.6);
        }
        .nav-logo-text {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 0.9rem;
          color: #FFFFFF;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }
        #nav-logo:hover .nav-logo-text {
          color: #4FACFE;
        }

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
