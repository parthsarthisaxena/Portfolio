import { NextResponse } from "next/server";

const USERNAME = "parthsarthisaxena";
const GH_API = "https://api.github.com";

export async function GET() {
  try {
    // Fetch user profile
    const userRes = await fetch(`${GH_API}/users/${USERNAME}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 }, // cache 1 hour
    });
    if (!userRes.ok) throw new Error("GitHub user fetch failed");
    const user = await userRes.json();

    // Fetch all public repos to compute star count & top languages
    let page = 1;
    let allRepos: any[] = [];
    while (true) {
      const reposRes = await fetch(
        `${GH_API}/users/${USERNAME}/repos?per_page=100&page=${page}`,
        {
          headers: { Accept: "application/vnd.github+json" },
          next: { revalidate: 3600 },
        }
      );
      if (!reposRes.ok) break;
      const repos = await reposRes.json();
      if (!Array.isArray(repos) || repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      if (repos.length < 100) break;
      page++;
    }

    // Total stars across all repos
    const totalStars = allRepos.reduce(
      (sum: number, r: any) => sum + (r.stargazers_count || 0),
      0
    );

    // Language frequency by repo count
    const langMap: Record<string, number> = {};
    for (const repo of allRepos) {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    }
    const totalLangRepos = Object.values(langMap).reduce((a, b) => a + b, 0);
    const topLangs = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / totalLangRepos) * 100),
      }));

    return NextResponse.json({
      publicRepos: user.public_repos ?? allRepos.length,
      followers: user.followers ?? 0,
      totalStars,
      topLangs,
    });
  } catch (err) {
    console.error("GitHub API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
