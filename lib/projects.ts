export type ProjectCategory = "quant" | "engineering";

export interface QuantMetrics {
  sharpeRatio?: number;
  maxDrawdown?: string;
  cagr?: string;
  winRate?: string;
  backtestPeriod?: string;
  annualizedReturn?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  objective: string;
  hypothesis?: string;
  methodology: string;
  techStack: string[];
  results: string;
  limitations?: string;
  futureWork?: string;
  metrics?: QuantMetrics;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  tags: string[];
}

export const projects: Project[] = [
  // ─── QUANT PROJECTS ──────────────────────────────────────────────────
  {
    slug: "pairs-trading-kalman",
    title: "Pairs Trading with Kalman Filter",
    category: "quant",
    shortDescription:
      "Adaptive statistical arbitrage system using a Kalman filter to dynamically estimate the hedge ratio between cointegrated equity pairs.",
    objective:
      "Build a pairs trading strategy that adapts the hedge ratio in real-time rather than using static OLS regression estimates.",
    hypothesis:
      "A Kalman filter will outperform static hedge ratios by continuously updating the spread relationship, capturing non-stationarity in cointegration.",
    methodology:
      "Applied Engle-Granger cointegration tests to identify pairs. Implemented a state-space model where the hedge ratio is the latent state, estimated via Kalman filter. Entry/exit signals are generated when the z-score of the spread crosses ±2σ.",
    techStack: ["Python", "NumPy", "pandas", "statsmodels", "matplotlib"],
    results:
      "Sharpe Ratio of 3.5 over 4-year backtest. Max drawdown of 8.3%. Adaptive hedge ratio reduced spread mismatch by ~31% compared to static OLS baseline.",
    limitations:
      "Performance degrades in high-volatility regimes. Transaction costs significantly impact profitability at high frequency.",
    futureWork:
      "Extend to multi-asset portfolios. Incorporate regime detection to pause trading during market stress.",
    metrics: {
      sharpeRatio: 3.5,
      maxDrawdown: "8.3%",
      winRate: "58.2%",
      backtestPeriod: "2020–2024",
      annualizedReturn: "14.7%",
    },
    featured: false,
    tags: ["Kalman Filter", "Pairs Trading", "Cointegration", "Statistical Arbitrage"],
  },
  {
    slug: "stat-arb-engine",
    title: "Statistical Arbitrage Engine",
    category: "quant",
    shortDescription:
      "Systematic stat-arb framework scanning for mean-reversion opportunities across equity universes using z-score signals.",
    objective:
      "Build a scalable, systematic stat-arb engine that can scan large equity universes and generate mean-reversion signals.",
    hypothesis:
      "Equity pairs exhibiting persistent cointegration can generate alpha through systematic mean-reversion exploitation.",
    methodology:
      "Universe: S&P 500. Rolling cointegration tests (63-day window). Dynamic z-score signal with position sizing proportional to signal strength. Portfolio-level risk management via gross exposure limits.",
    techStack: ["Python", "pandas", "scipy", "statsmodels", "yfinance"],
    results:
      "Identified 40–60 active pairs at any time. Portfolio Sharpe of 1.52. Annualized return of 11.4% with low correlation to benchmark.",
    limitations:
      "Crowding risk in well-known pairs. Look-ahead bias risk in pair selection.",
    futureWork:
      "Add factor neutralization. Implement live paper trading via Alpaca API.",
    metrics: {
      sharpeRatio: 1.52,
      maxDrawdown: "12.1%",
      winRate: "54.8%",
      backtestPeriod: "2019–2024",
      annualizedReturn: "11.4%",
    },
    featured: false,
    tags: ["Statistical Arbitrage", "Mean Reversion", "Equity", "Python"],
  },
  {
    slug: "monte-carlo-simulation",
    title: "Monte Carlo Simulation Engine",
    category: "quant",
    shortDescription:
      "Portfolio risk engine using Monte Carlo simulation with correlated GBM paths and VaR/CVaR computation.",
    objective:
      "Build a production-quality Monte Carlo engine for portfolio risk analysis with realistic correlation structures.",
    hypothesis:
      "Correlated GBM simulation with Cholesky decomposition provides more accurate tail-risk estimates than naive uncorrelated simulations.",
    methodology:
      "Simulated 10,000 correlated price paths using Geometric Brownian Motion. Cholesky decomposition to introduce empirical correlation. Computed VaR at 95%/99% confidence and CVaR (Expected Shortfall).",
    techStack: ["Python", "NumPy", "scipy", "matplotlib", "pandas"],
    results:
      "VaR estimates matched historical drawdowns within 15% on out-of-sample data. Runtime: 10,000 paths in <2s with vectorized NumPy.",
    limitations:
      "GBM assumption underestimates fat tails. Correlation structure assumed stationary.",
    futureWork:
      "Implement jump-diffusion models. Add Student-t distributed returns for fat-tail modeling.",
    metrics: {
      backtestPeriod: "2018–2024",
    },
    featured: false,
    tags: ["Monte Carlo", "Risk Management", "VaR", "GBM", "Python"],
  },

  
  {
    slug: "intraday-breakout-scanner",
    title: "Intraday Breakout Scanner",
    category: "quant",
    shortDescription:
      "Real-time intraday breakout scanner using volatility-adjusted ATR bands and volume confirmation filters.",
    objective:
      "Identify high-probability intraday breakout setups with statistical entry/exit rules.",
    hypothesis:
      "Breakouts confirmed by volume expansion above 1.5x 20-period average have statistically positive expectancy.",
    methodology:
      "ATR-based dynamic support/resistance. Volume-weighted breakout confirmation. Time-of-day filters (avoid first 15 min, last 30 min). Risk/reward minimum 1:2.",
    techStack: ["Python", "pandas", "yfinance", "matplotlib"],
    results:
      "Win rate of 47% with average R/R of 2.3. Net positive expectancy of +0.18R per trade.",
    limitations:
      "Sensitive to slippage in fast-moving markets. Performance degrades in low-volatility environments.",
    futureWork:
      "Integrate real-time data feed. Add ML-based signal filtering.",
    metrics: {
      winRate: "47%",
      backtestPeriod: "2022–2024",
      sharpeRatio: 1.21,
      maxDrawdown: "15.4%",
    },
    featured: false,
    tags: ["Intraday", "Breakout", "ATR", "Technical Analysis"],
  },
  {
    slug: "natural-gas-rsi-research",
    title: "Natural Gas RSI/MA Research",
    category: "quant",
    shortDescription:
      "Systematic research into RSI and moving average crossover signals on natural gas futures with seasonality analysis.",
    objective:
      "Determine whether simple RSI and MA signals generate edge on natural gas futures after accounting for seasonality.",
    hypothesis:
      "Natural gas exhibits strong seasonal patterns that, when controlled for, reveal genuine RSI mean-reversion edge.",
    methodology:
      "Decomposed seasonal component from natural gas prices. Tested RSI(14) < 30 long signals and 50/200 MA crossovers on seasonally-adjusted series. Bootstrapped confidence intervals.",
    techStack: ["Python", "pandas", "statsmodels", "matplotlib"],
    results:
      "RSI signal shows Sharpe of 0.82 without seasonal adjustment vs. 1.14 with adjustment — confirming seasonal confound.",
    limitations:
      "Energy markets driven by non-quantifiable geopolitical events.",
    futureWork:
      "Incorporate weather and EIA inventory data as fundamental inputs.",
    metrics: {
      sharpeRatio: 1.14,
      backtestPeriod: "2015–2024",
    },
    featured: false,
    tags: ["RSI", "Natural Gas", "Futures", "Seasonality", "Research"],
  },
  {
    slug: "gold-silver-divergence",
    title: "Gold/Silver/Crude Divergence Research",
    category: "quant",
    shortDescription:
      "Cross-commodity divergence analysis exploring the gold-silver ratio and crude oil correlations as macro trading signals.",
    objective:
      "Research whether gold/silver ratio extremes and crude oil correlation breakdowns predict subsequent price movements.",
    hypothesis:
      "Gold/silver ratio >80 (or <65) represents a statistically significant mean-reversion signal with macro timing value.",
    methodology:
      "Historical gold/silver ratio analysis (1990–2024). Correlation rolling analysis vs. crude oil. Event study around ratio extremes. Compared return distributions in high vs. low ratio regimes.",
    techStack: ["Python", "pandas", "scipy", "matplotlib", "seaborn"],
    results:
      "Ratio > 85 followed by positive silver outperformance in next 6 months with 71% frequency. Statistically significant (p < 0.05).",
    limitations:
      "Sample size limited by ratio extreme events. Long holding periods reduce trade count.",
    futureWork:
      "Add options strategies to express ratio views with defined risk.",
    metrics: {
      winRate: "71%",
      backtestPeriod: "1990–2024",
    },
    featured: false,
    tags: ["Commodities", "Gold", "Silver", "Macro", "Research"],
  },
  {
    slug: "trade-journal-analytics",
    title: "Trade Journal Analytics",
    category: "quant",
    shortDescription:
      "Automated trade journal with statistical performance attribution, emotional pattern analysis, and P&L reporting.",
    objective:
      "Build a data-driven trade journal that identifies patterns in trading behavior and performance.",
    hypothesis:
      "Systematic journaling + statistical analysis can identify personal biases (e.g., premature exits, overtrading) that reduce performance.",
    methodology:
      "CSV import of trade logs. Automated attribution by time-of-day, instrument, setup type, holding period. Statistical significance tests on subgroup performance differences.",
    techStack: ["Python", "pandas", "matplotlib", "seaborn", "Streamlit"],
    results:
      "Identified that Monday trades underperformed by 0.4R/trade on average. Found position-sizing inconsistency causing 20% P&L variance.",
    limitations:
      "Self-reported data subject to logging errors.",
    futureWork:
      "Integrate broker API for automatic trade import. Build web dashboard.",
    metrics: {
      backtestPeriod: "Personal trading data 2023–2024",
    },
    featured: false,
    tags: ["Trade Journal", "Analytics", "Streamlit", "Python"],
  },
  {
    slug: "gsr-alpha",
    title: "Gold–Silver Ratio (GSR) Mean-Reversion",
    category: "quant",
    shortDescription:
      "Systematic mean-reversion trading model on MCX Gold/Silver futures, fully accounting for transaction costs, slippage, and progressive Indian tax slabs.",
    objective:
      "Develop a robust statistical arbitrage strategy capitalizing on macro-driven cointegration between gold and silver futures.",
    hypothesis:
      "Extremes in the Gold/Silver Ratio (GSR) tend to mean-revert due to shared macro drivers, allowing profitable exploitation through laggard-asset trading gated by realized volatility and VIX filters.",
    methodology:
      "Analyzed 10 years of daily precious metal data (May 2016 – May 2026). Constructed entry/exit thresholds based on a rolling 60-day GSR z-score (>= 1.5σ for entries, <= 0.3σ for exits). Implemented structural regime filters (VIX <= 50, rolling 60d correlation >= 0.5) to avoid crisis-period breakdowns. Modeled strict execution friction (MCX exchange fees, STT, bid-ask spreads, slippage) and progressive F&O business tax slabs under FY 2025-26 rules.",
    techStack: ["Python", "pandas", "NumPy", "statsmodels", "yfinance", "matplotlib", "seaborn"],
    results:
      "Delivered a Net Return of +170.88% (Gross +216.11%) over a 10-year backtest. Achieved a Sharpe Ratio of 4.91, Calmar Ratio of 11.78, and a Max Drawdown of -14.50%. The strategy maintained a 63.2% win rate across 76 low-frequency trades.",
    limitations:
      "Susceptible to long-term structural shifts in the macro relationship between gold and silver. Low trade frequency requires long holding-period patience.",
    futureWork:
      "Incorporate dynamic scaling of entry thresholds using VIX term structures and option implied volatility skew.",
    metrics: {
      sharpeRatio: 4.91,
      maxDrawdown: "14.50%",
      winRate: "63.2%",
      backtestPeriod: "2016–2026",
      annualizedReturn: "10.5%",
    },
    githubUrl: "https://github.com/parthsarthisaxena/GSR-Alpha",
    featured: true,
    tags: ["Statistical Arbitrage", "Futures Trading", "Tax Modeling", "Python", "Backtesting"],
  },

  // ─── ENGINEERING PROJECTS ────────────────────────────────────────────
  {
    slug: "options-pricer-cpp",
    title: "Options Pricing Engine (C++)",
    category: "engineering",
    shortDescription:
      "High-performance C++ options pricing library implementing Black-Scholes, Binomial, and Monte Carlo methods.",
    objective:
      "Implement an options pricing library in C++ with performance comparable to production quant systems.",
    methodology:
      "Black-Scholes closed-form. Cox-Ross-Rubinstein binomial tree. Monte Carlo with variance reduction (antithetic variates, control variates). Greeks computation via finite differencing.",
    techStack: ["C++17", "CMake", "Boost", "Google Test"],
    results:
      "Black-Scholes pricing: 50M calculations/second on single core. Monte Carlo within 0.01% of analytical price at 100k paths.",
    githubUrl: "https://github.com/parthsarthiisaxena/options-pricer-cpp",
    featured: false,
    tags: ["C++", "Options Pricing", "Black-Scholes", "Monte Carlo"],
  },
  {
    slug: "roamcircle",
    title: "RoamCircle Full-Stack Platform",
    category: "engineering",
    shortDescription:
      "Secure, real-time travel companion matching platform with custom JWT auth, MongoDB databases, live chat systems, and automated OpenAI itineraries.",
    objective:
      "Build a high-performance full-stack social matching platform for travelers, motorcyclists, and hikers without relying on heavyweight frameworks.",
    methodology:
      "Developed a custom Node.js/Express backend server serving static files and API routes. Implemented secure JWT-based credentials storage with bcrypt hashing (12 salt rounds), utilizing httpOnly and SameSite cookie protocols to prevent CSRF and XSS. Designed a flexible MongoDB data architecture with collections for users, trips, matches, and messages. Integrated the OpenAI API to dynamically generate custom-tailored multi-day travel itineraries based on user travel parameters.",
    techStack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Bcrypt", "OpenAI API", "JavaScript (ES6+)", "HTML5", "CSS3"],
    results:
      "Successfully built and deployed a production-ready MVP. Achieved fast page responses and secure thread-safe user chat messaging. Implemented an interactive AI itinerary planner returning comprehensive travel guides under 3 seconds.",
    limitations:
      "Relies on standard long-polling HTTP requests for chat rather than WebSockets, which could affect real-time sync at scale.",
    futureWork:
      "Upgrade the communication channel to native WebSockets/Socket.io and integrate a mobile-responsive leaflet map interface.",
    githubUrl: "https://github.com/parthsarthisaxena/RoamAround",
    featured: true,
    tags: ["Full Stack", "Node.js", "MongoDB", "JWT Auth", "OpenAI API", "Chat System"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
