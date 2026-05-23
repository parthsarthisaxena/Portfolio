export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  category: "quant" | "engineering" | "general";
}

export const blogPosts: BlogPost[] = [
  {
    slug: "why-static-hedge-ratios-fail",
    title: "Why Static Hedge Ratios Fail in Pairs Trading",
    date: "2024-11-15",
    tags: ["Pairs Trading", "Kalman Filter", "Quant Research"],
    excerpt:
      "Most pairs trading implementations use OLS regression to compute a fixed hedge ratio. Here's why that's a mistake and how adaptive methods improve performance.",
    readingTime: "8 min",
    category: "quant",
  },
  {
    slug: "backtesting-pitfalls",
    title: "Backtesting Pitfalls in Intraday Systems",
    date: "2024-10-02",
    tags: ["Backtesting", "Intraday", "Systems"],
    excerpt:
      "Building a backtest that looks great on paper but loses money live is one of the most common traps in quant development. Here are the key pitfalls and how to avoid them.",
    readingTime: "10 min",
    category: "quant",
  },
  {
    slug: "kalman-filters-pairs-trading",
    title: "Kalman Filters for Adaptive Pairs Trading",
    date: "2024-09-10",
    tags: ["Kalman Filter", "State Space", "Statistics"],
    excerpt:
      "A deep dive into the mathematics behind Kalman filters applied to pairs trading — from state-space formulation to implementation in Python.",
    readingTime: "15 min",
    category: "quant",
  },
  {
    slug: "300-dsa-problems",
    title: "What I Learned Solving 300 DSA Problems",
    date: "2024-08-20",
    tags: ["DSA", "C++", "LeetCode", "Engineering"],
    excerpt:
      "After solving 300 problems across arrays, graphs, DP, and trees, here's what actually matters — the patterns, the mental models, and the common mistakes.",
    readingTime: "12 min",
    category: "engineering",
  },
  {
    slug: "market-regime-detection-hmm",
    title: "Detecting Market Regimes with Hidden Markov Models",
    date: "2024-07-05",
    tags: ["HMM", "Machine Learning", "Market Regimes"],
    excerpt:
      "Markets shift between distinct statistical regimes. Using Hidden Markov Models to detect these regimes in real-time — and how to use this information in a trading system.",
    readingTime: "11 min",
    category: "quant",
  },
  {
    slug: "cpp-performance-patterns",
    title: "C++ Performance Patterns for Quantitative Systems",
    date: "2024-06-18",
    tags: ["C++", "Performance", "Systems"],
    excerpt:
      "From cache-friendly data structures to custom allocators — the C++ patterns that matter most when building latency-sensitive quantitative systems.",
    readingTime: "9 min",
    category: "engineering",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
