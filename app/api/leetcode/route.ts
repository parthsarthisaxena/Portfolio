import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "parth_sarthi_saxena";

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 }, // cache for 1 hour, auto-refreshes
    });

    if (!res.ok) throw new Error("LeetCode API error");

    const data = await res.json();
    const user = data?.data?.matchedUser;

    if (!user) throw new Error("User not found");

    const stats = user.submitStats.acSubmissionNum;
    const total = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count ?? 0;
    const easy  = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count ?? 0;
    const medium= stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count ?? 0;
    const hard  = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count ?? 0;
    const ranking = user.profile.ranking ?? null;

    return NextResponse.json(
      { total, easy, medium, hard, ranking, username: LEETCODE_USERNAME },
      { headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch {
    // Fallback to known stats if API fails
    return NextResponse.json(
      { total: 300, easy: 120, medium: 140, hard: 40, ranking: null, username: LEETCODE_USERNAME, fallback: true },
      { headers: { "Cache-Control": "s-maxage=60" } }
    );
  }
}
