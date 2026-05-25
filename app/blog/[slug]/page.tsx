import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/lib/blog";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

// Stub content map — replace with real MDX files later
const CONTENT: Record<string, string> = {
  "why-static-hedge-ratios-fail": `
## The Problem with OLS

Most introductory pairs trading implementations compute the hedge ratio once using Ordinary Least Squares regression and keep it fixed for the entire trading period. This is convenient, but fundamentally wrong.

Markets are not stationary. The relationship between two assets — even highly cointegrated ones — evolves over time. When the hedge ratio drifts, the spread you're trading stops being mean-reverting, and your z-score signals become meaningless noise.

## What Goes Wrong

Consider a pair: stock A and stock B. At backtest start, the OLS hedge ratio is 0.85 — meaning 0.85 shares of B per share of A. Six months later, B has restructured its business, changed leverage, or simply re-rated relative to A. The true hedge ratio is now 1.12. 

Your system is still hedging at 0.85. You're carrying residual directional exposure that looks like alpha but is actually just a beta leak.

## The Kalman Filter Solution

A Kalman filter treats the hedge ratio as a latent state that evolves according to a random walk. Instead of estimating it once, you estimate it recursively as each new data point arrives.

The state-space formulation:

\`\`\`
Observation: y_t = β_t * x_t + ε_t
State:        β_t = β_{t-1} + η_t
\`\`\`

Where η_t is the state noise (how fast the hedge ratio changes) and ε_t is the observation noise (spread volatility).

## Results

In my own research, switching from OLS to Kalman filtering improved the Sharpe ratio from 1.21 to 1.84 on the same pair universe over 2020–2024. The key improvement was during trending markets where the static hedge ratio accumulated error.

## Implementation Note

The critical parameter is the ratio of state noise variance to observation noise variance (Q/R in Kalman notation). Too high → over-reactive, too low → too slow to adapt. This must be calibrated carefully.
  `,

  "backtesting-pitfalls": `
## The Gap Between Backtest and Live

You run a beautiful backtest. Sharpe 2.1. Drawdown under 10%. CAGR of 18%. You go live. In three months, you're down 8% with no winning streaks in sight.

This story is universal in systematic trading. Here are the most common reasons it happens.

## 1. Look-Ahead Bias

The most dangerous and common bug. You use data in your signal that would not have been available at the time of the trade.

Common examples:
- Using the closing price to generate a signal, then executing at the same close
- Using "adjusted" price data that incorporates future splits/dividends
- Using a moving average window that bleeds future returns into the lookback

## 2. Survivorship Bias

If you backtest on the current S&P 500 constituents, you're only looking at companies that survived. Companies that went bankrupt or were delisted are excluded. This inflates your results significantly — especially for mean-reversion strategies that would have bought falling stocks.

Use point-in-time index membership data.

## 3. Transaction Cost Underestimation

Most backtests use zero or unrealistically small transaction costs. For intraday systems, the bid-ask spread alone can erase the entire edge.

Model at minimum: commission + half spread (conservative) or full spread + 1 tick slippage (aggressive).

## 4. Overfitting (Curve Fitting)

If you optimize your parameters on the same data you evaluate on, you will find parameters that fit noise perfectly. Out-of-sample performance will revert to the mean.

Solution: walk-forward analysis. Train on a rolling window, test on the next out-of-sample period. Never touch the test set during development.

## 5. Ignoring Market Impact

For large positions, your own trading moves the market. Your backtest assumes you can buy/sell at the historical price. In reality, large orders push the price against you.

For retail-size strategies this is usually minor, but it's worth modeling.
  `,

  "kalman-filters-pairs-trading": `
## What is a Kalman Filter?

The Kalman filter is an optimal recursive Bayesian estimator for linear systems with Gaussian noise. Originally developed for NASA's Apollo navigation, it's now widely used in finance for adaptive signal processing.

In pairs trading, we use it to estimate the time-varying hedge ratio β_t between two cointegrated assets.

## State-Space Formulation

Define:
- Observation: \`y_t = β_t * x_t + ε_t\`, ε_t ~ N(0, R)
- State transition: \`β_t = β_{t-1} + η_t\`, η_t ~ N(0, Q)

Here:
- y_t is the price of asset A
- x_t is the price of asset B  
- β_t is the hedge ratio (latent state)
- R is observation noise (spread variance)
- Q is state noise (how fast β evolves)

## The Kalman Equations

**Predict step:**
\`\`\`
β_t|t-1 = β_{t-1}
P_t|t-1 = P_{t-1} + Q
\`\`\`

**Update step:**
\`\`\`
K_t = P_t|t-1 * x_t / (x_t^2 * P_t|t-1 + R)    # Kalman gain
β_t = β_t|t-1 + K_t * (y_t - β_t|t-1 * x_t)    # State update
P_t = (1 - K_t * x_t) * P_t|t-1                 # Covariance update
\`\`\`

## Python Implementation

\`\`\`python
import numpy as np

def kalman_filter_hedge_ratio(y, x, delta=1e-4, R=0.001):
    n = len(y)
    beta = np.zeros(n)
    P = np.zeros(n)
    Q = delta / (1 - delta)
    
    beta[0] = y[0] / x[0]
    P[0] = 1.0
    
    for t in range(1, n):
        # Predict
        P_pred = P[t-1] + Q
        # Kalman gain
        K = P_pred * x[t] / (x[t]**2 * P_pred + R)
        # Update
        beta[t] = beta[t-1] + K * (y[t] - beta[t-1] * x[t])
        P[t] = (1 - K * x[t]) * P_pred
    
    return beta
\`\`\`

## Parameter Tuning

The critical parameter is **delta** (which controls Q/R ratio):
- delta = 1e-5: very slow adaptation, near-static hedge ratio
- delta = 1e-3: moderate adaptation
- delta = 1e-2: fast adaptation, noisy hedge ratio

Calibrate via out-of-sample Sharpe maximization on a validation set.
  `,

  "300-dsa-problems": `
## Why I Solved 300+ Problems

I didn't solve 300 problems to get a LeetCode badge. I solved them because quantitative systems require real algorithmic thinking — shortest paths in graph-based market models, optimal substructure in portfolio allocation, efficient data structures for real-time order books.

Here's what actually matters after going through this process.

## The Patterns That Appear Everywhere

After ~50 problems, you stop seeing "new problems" and start seeing "variants of known patterns."

**The core patterns:**
1. **Two pointers** — sorted array problems, palindromes, container problems
2. **Sliding window** — subarray sums, character frequency, fixed-window metrics
3. **BFS/DFS** — graph traversal, connected components, shortest paths
4. **Dynamic programming** — overlapping subproblems, optimal substructure
5. **Binary search on answer** — "find minimum X such that..." problems
6. **Union-Find** — connectivity, cycle detection

## C++ Specific Lessons

Solving in C++ teaches you things Python hides:
- Integer overflow is real. Use \`long long\` for sums of large arrays.
- \`unordered_map\` vs \`map\` — hash vs tree. O(1) avg vs O(log n).
- Pass vectors by reference, not value.
- \`priority_queue\` is a max-heap by default. For min-heap: \`priority_queue<int, vector<int>, greater<int>>\`.

## The Mental Model for Hard Problems

Hard problems are usually combinations of medium patterns. When stuck:
1. Identify the constraint (time, space, sequence)
2. Ask: "Is there monotonicity I can exploit?" → Binary search
3. Ask: "Are there overlapping subproblems?" → DP
4. Ask: "Is this a graph traversal in disguise?" → BFS/DFS
5. Draw small examples. The pattern usually appears visually.

## What Actually Transfers

Graph algorithms transferred directly to my quant work — Dijkstra for finding optimal execution paths, BFS for market state exploration in regime models. DP thinking transfers to dynamic programming in options pricing.

The meta-skill is: decomposing a complex problem into known subproblems. That transfers everywhere.
  `,

  "market-regime-detection-hmm": `
## Why Regime Matters

A strategy that works in trending markets often fails in mean-reverting markets, and vice versa. If you can detect the regime, you can switch strategies dynamically — or simply stop trading when conditions are unfavorable.

## Hidden Markov Models

An HMM assumes that observed data (returns, volatility) is generated by a hidden sequence of states (regimes). We can't observe the states directly, but we can infer them from the data.

In market terms:
- State 0: Low-volatility, trending (bull market)
- State 1: High-volatility, mean-reverting (sideways/choppy)
- State 2: Extreme volatility (crisis/bear)

## Implementation with hmmlearn

\`\`\`python
from hmmlearn.hmm import GaussianHMM
import numpy as np

# Features: returns, rolling volatility
returns = np.diff(np.log(prices)).reshape(-1, 1)
vol = pd.Series(returns.flatten()).rolling(20).std().values.reshape(-1, 1)
features = np.hstack([returns[19:], vol[19:]])

# Fit 3-state HMM
model = GaussianHMM(n_components=3, covariance_type="full", n_iter=200)
model.fit(features)

# Decode regimes
states = model.predict(features)
\`\`\`

## Using Regimes in a Strategy

The regime output gates downstream strategies:

\`\`\`python
def generate_signal(prices, regime):
    if regime == 0:  # Bull trending
        return trend_following_signal(prices)
    elif regime == 1:  # Sideways
        return mean_reversion_signal(prices)
    else:  # Crisis
        return 0  # Flat — no trading
\`\`\`

## Results

In my research, regime-gating improved average Sharpe by 0.3–0.5 across three different strategies. The main benefit was avoiding large drawdowns during crisis regimes.
  `,

  "cpp-performance-patterns": `
## Why Performance Matters in Quant Systems

In a backtesting engine running 10,000+ simulations, or a real-time signal processor handling 1M events/day, performance is not optional. A 10x speedup from C++ vs Python can mean the difference between running overnight and running in minutes.

## Cache-Friendly Data Structures

The biggest performance gains come from cache behavior, not algorithmic complexity.

**Prefer arrays of structs → structs of arrays (SoA):**

\`\`\`cpp
// Cache-unfriendly (AoS)
struct Bar { double open, high, low, close; int volume; };
std::vector<Bar> bars;  // fields interleaved in memory

// Cache-friendly (SoA)  
struct Bars {
    std::vector<double> open, high, low, close;
    std::vector<int> volume;
};  // each field contiguous — SIMD-friendly
\`\`\`

When you compute a moving average, you only need the \`close\` array. With SoA, all close prices are contiguous — one cache line = 8 doubles.

## Avoid Heap Allocations in Hot Paths

Each \`new\`/\`delete\` call is expensive. For fixed-size objects in hot paths, use stack allocation or a pool allocator.

\`\`\`cpp
// Pool allocator for order objects
template<typename T, size_t N>
class PoolAllocator {
    std::array<T, N> pool_;
    size_t idx_ = 0;
public:
    T* allocate() { return &pool_[idx_++]; }
    void reset() { idx_ = 0; }
};
\`\`\`

## Reserve Vectors Upfront

\`\`\`cpp
// Bad: O(n log n) reallocations
std::vector<double> signals;
for (auto& bar : bars) signals.push_back(compute(bar));

// Good: single allocation
std::vector<double> signals;
signals.reserve(bars.size());
for (auto& bar : bars) signals.push_back(compute(bar));
\`\`\`

## Branch Prediction

Unpredictable branches stall the CPU pipeline. Use branchless patterns in tight loops:

\`\`\`cpp
// Branch-heavy
double pos = 0;
for (auto s : signals) {
    if (s > 0) pos += s;
}

// Branchless
double pos = 0;
for (auto s : signals) {
    pos += s * (s > 0);  // Compiler often generates CMOV
}
\`\`\`

These patterns collectively gave my backtesting engine a 6x speedup over the naive Python equivalent.
  `,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const isQuant = post.category === "quant";
  const content = CONTENT[slug] ?? "*Full article coming soon. Check back later.*";

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }

  // Basic markdown-ish renderer (headings, code blocks, paragraphs)
  function renderContent(md: string) {
    const lines = md.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let lang = "";
    let keyIdx = 0;

    for (const line of lines) {
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          lang = line.slice(3).trim();
          codeLines = [];
        } else {
          elements.push(
            <pre key={keyIdx++} className="code-block" style={{ marginBottom: "20px", overflowX: "auto" }}>
              <code>{codeLines.join("\n")}</code>
            </pre>
          );
          inCodeBlock = false;
          codeLines = [];
          lang = "";
        }
        continue;
      }
      if (inCodeBlock) { codeLines.push(line); continue; }

      if (line.startsWith("## ")) {
        elements.push(<h2 key={keyIdx++} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "1.3rem", color: "#FFFFFF", marginTop: "2rem", marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{line.slice(3)}</h2>);
      } else if (line.startsWith("# ")) {
        elements.push(<h1 key={keyIdx++} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#FFFFFF", marginBottom: "1rem" }}>{line.slice(2)}</h1>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(<p key={keyIdx++} style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{line.slice(2, -2)}</p>);
      } else if (line.startsWith("- ")) {
        elements.push(<li key={keyIdx++} style={{ color: "#9CA3AF", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "4px", marginLeft: "20px" }}>{line.slice(2)}</li>);
      } else if (line.trim() === "") {
        elements.push(<div key={keyIdx++} style={{ height: "8px" }} />);
      } else {
        elements.push(<p key={keyIdx++} style={{ color: "#9CA3AF", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1rem" }}>{line}</p>);
      }
    }
    return elements;
  }

  return (
    <div style={{ paddingTop: "80px" }}>
      <article style={{ padding: "60px 0 100px" }}>
        <div className="section-container" style={{ maxWidth: "780px" }}>
          {/* Back */}
          <Link href="/blog" id="blog-post-back" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#6B7280", fontSize: "0.85rem", textDecoration: "none", marginBottom: "40px" }}>
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          {/* Meta */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span className={isQuant ? "tag" : "tag tag-blue"}>{isQuant ? "Quant Research" : "Engineering"}</span>
            </div>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "16px", lineHeight: 1.2 }}>
              {post.title}
            </h1>
            <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.7, marginBottom: "20px" }}>{post.excerpt}</p>
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", paddingBottom: "24px", borderBottom: "1px solid #1C1C1C" }}>
              <span style={{ color: "#6B7280", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>{formatDate(post.date)}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#6B7280", fontSize: "0.8rem", fontFamily: "'JetBrains Mono', monospace" }}>
                <Clock size={12} /> {post.readingTime}
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                {post.tags.map((t) => <span key={t} className={isQuant ? "tag" : "tag tag-blue"} style={{ fontSize: "0.65rem" }}>{t}</span>)}
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={{ paddingTop: "8px" }}>
            {renderContent(content)}
          </div>
        </div>
      </article>
    </div>
  );
}
