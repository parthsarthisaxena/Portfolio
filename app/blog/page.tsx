import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing on quantitative finance, trading systems, C++, and software engineering.",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function SectionDivider({ label, isQuant }: { label: string; isQuant: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: isQuant ? "#6E8EAD" : "#6E8EAD", letterSpacing: "0.08em" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: "#171717" }} />
    </div>
  );
}

export default function BlogPage() {
  const quantPosts = blogPosts.filter((p) => p.category === "quant");
  const engPosts = blogPosts.filter((p) => p.category === "engineering");

  const renderPosts = (posts: typeof blogPosts, isQuant: boolean) =>
    posts.map((post) => (
      <Link key={post.slug} href={`/blog/${post.slug}`} id={`blog-${post.slug}`} style={{ textDecoration: "none" }}>
        <article className="card" style={{ padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "1rem", color: "#FFFFFF", marginBottom: "8px", lineHeight: 1.4 }}>
              {post.title}
            </h2>
            <p style={{ color: "#6B7280", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "12px" }}>{post.excerpt}</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ color: "#6B7280", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>
                {formatDate(post.date)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace" }}>
                <Clock size={10} /> {post.readingTime}
              </span>
              {post.tags.slice(0, 3).map((t) => (
                <span key={t} className={isQuant ? "tag" : "tag tag-blue"} style={{ fontSize: "0.65rem" }}>{t}</span>
              ))}
            </div>
          </div>
          <ArrowRight size={16} color="#6B7280" style={{ flexShrink: 0, marginTop: "4px" }} />
        </article>
      </Link>
    ));

  return (
    <div style={{ paddingTop: "80px" }}>
      <section style={{ padding: "80px 0" }}>
        <div className="section-container">
          <div style={{ marginBottom: "48px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "#6E8EAD", letterSpacing: "0.1em", marginBottom: "12px" }}>
              RESEARCH & WRITING
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "12px" }}>
              Blog
            </h1>
            <div className="section-divider" />
            <p style={{ color: "#9CA3AF", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "540px", marginTop: "16px" }}>
              Technical writing on quantitative research, trading systems, C++ performance, and software engineering.
            </p>
          </div>

          <div style={{ marginBottom: "48px" }}>
            <SectionDivider label="QUANTITATIVE RESEARCH" isQuant={true} />
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {renderPosts(quantPosts, true)}
            </div>
          </div>

          <div>
            <SectionDivider label="ENGINEERING" isQuant={false} />
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {renderPosts(engPosts, false)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
