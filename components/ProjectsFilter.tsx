"use client";

import { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

type Filter = "all" | "quant" | "engineering";

export default function ProjectsFilter() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Filter tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "40px" }}>
        {(["all", "quant", "engineering"] as Filter[]).map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => setFilter(f)}
            className={`filter-tab ${filter === f ? "active" : ""}`}
          >
            {f === "all"
              ? `All (${projects.length})`
              : f === "quant"
              ? `Quant (${projects.filter((p) => p.category === "quant").length})`
              : `Engineering (${projects.filter((p) => p.category === "engineering").length})`}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
