// Statistics Quiz Questions — organized by topic ID
export const statisticsQuizQuestions = {
  'descriptive-statistics': [
    { q: "What is the median of [12, 15, 18, 20, 23, 25, 28]?", options: ["15", "18", "20", "23"], correct: 2, explanation: "With 7 values, the 4th value (20) is the median." },
    { q: "Which measure is MOST affected by outliers?", options: ["Median", "Mode", "Mean", "Range"], correct: 2, explanation: "Mean uses all values equally. A single extreme value can shift it dramatically." },
    { q: "What does variance measure?", options: ["Center", "Spread", "Frequency", "Correlation"], correct: 1, explanation: "Variance (σ²) measures how far data points spread from the mean." },
    { q: "n=5, sum of squared deviations=100. Sample variance=?", options: ["20", "25", "100", "16"], correct: 0, explanation: "Sample variance = Σ(xᵢ−x̄)²/(n−1) = 100/5 = 20" }
  ],
  'probability-theory': [
    { q: "P(A)=0.3, P(B)=0.4, independent. P(A∩B)=?", options: ["0.12", "0.7", "0.1", "0.04"], correct: 0, explanation: "Independent: P(A∩B)=P(A)×P(B)=0.3×0.4=0.12" },
    { q: "Bayes' Theorem calculates:", options: ["Joint probability", "Prior", "Conditional probability", "Marginal"], correct: 2, explanation: "Bayes calculates P(A|B) using P(B|A), P(A), and P(B)." },
    { q: "3 red, 2 blue balls. P(both red without replacement)?", options: ["0.3", "0.6", "0.36", "0.5"], correct: 0, explanation: "3/5 × 2/4 = 6/20 = 0.3" }
  ],
  'probability-distributions': [
    { q: "X~N(100,15). % between 85 and 115?", options: ["68%", "95%", "99.7%", "50%"], correct: 0, explanation: "85 and 115 are μ±σ. ≈68% within 1 SD." },
    { q: "10 fair coin flips. P(exactly 5 heads)?", options: ["0.5", "0.246", "0.1", "0.05"], correct: 1, explanation: "Binomial: C(10,5)×(0.5)^10 = 252/1024 ≈ 0.246" },
    { q: "Poisson distribution models:", options: ["Binary outcomes", "Events in fixed interval", "Continuous values", "No replacement"], correct: 1, explanation: "Poisson counts events in a fixed interval of time or space." }
  ],
  'sampling-clt': [
    { q: "CLT: sampling distribution approaches normal when:", options: ["n>10", "n>30", "n=population", "Always"], correct: 1, explanation: "Sample means approach normal as n ≥ 30, regardless of population distribution." },
    { q: "Stratified sampling involves:", options: ["Random from entire pop", "Subgroups, sample from each", "Every k-th element", "Resample with replacement"], correct: 1, explanation: "Divides population into homogeneous strata and samples from each." },
    { q: "Standard error of mean =", options: ["SD", "Var/n", "σ/√n", "σ×√n"], correct: 2, explanation: "SE = σ/√n measures variability of sample means." }
  ],
  'confidence-intervals': [
    { q: "95% CI [45,55] means:", options: ["95% of data in range", "95% confident true mean in range", "95% error", "p=0.05"], correct: 1, explanation: "If we repeated sampling many times, 95% of intervals would contain the true mean." }
  ],
  'hypothesis-testing': [
    { q: "p-value of 0.03 means:", options: ["3% H₀ is true", "3% chance of data if H₀ true", "97% alt is true", "Effect=3%"], correct: 1, explanation: "p-value = P(data | H₀ true). Low p means data is unlikely if null were true." },
    { q: "Reject H₀ when it's actually true =", options: ["Type I error", "Type II error", "Correct", "Power error"], correct: 0, explanation: "Type I error (false positive): rejecting null when it is actually true." }
  ],
  'correlation-regression': [
    { q: "r = -0.85 indicates:", options: ["Strong positive", "Strong negative", "No relation", "Weak negative"], correct: 1, explanation: "Values near -1 indicate strong negative correlation." },
    { q: "R² = 0.81 means model explains:", options: ["19%", "81%", "90%", "Can't tell"], correct: 1, explanation: "R² is the proportion of variance in the dependent variable explained by the model." }
  ],
  'covariance-matrix': [
    { q: "Cov(X,Y) = 0 implies:", options: ["Independent", "No linear relation", "Identical", "ρ=1"], correct: 1, explanation: "Zero covariance means no linear relationship, but variables might still be dependent nonlinearly." }
  ],
  'bayesian-inference': [
    { q: "Prior * Likelihood = ?", options: ["Marginal likelihood", "Posterior", "Predictive", "Evidence"], correct: 1, explanation: "Posterior = Likelihood × Prior / Evidence. The numerator alone is proportional to the posterior." },
    { q: "MAP estimation finds:", options: ["Mean of posterior", "Mode of posterior", "Median of posterior", "Variance"], correct: 1, explanation: "Maximum A Posteriori (MAP) finds the mode (peak) of the posterior distribution." },
    { q: "Beta distribution is conjugate prior for:", options: ["Normal likelihood", "Binomial likelihood", "Poisson likelihood", "Uniform likelihood"], correct: 1, explanation: "Beta conjugates with Binomial: if prior ~ Beta(α,β), posterior ~ Beta(α+k,β+n-k)." },
    { q: "P(H|D) with prior=0.6, likelihood=0.8, evidence=0.72:", options: ["0.48", "0.72", "0.667", "0.60"], correct: 2, explanation: "P(H|D) = (0.8 × 0.6) / 0.72 = 0.48/0.72 = 0.667" }
  ],
  'anova-design': [
    { q: "ANOVA tests differences in:", options: ["Variances between groups", "Means between groups", "Standard deviations", "Medians"], correct: 1, explanation: "ANOVA (Analysis of Variance) tests whether the means of 3+ groups differ significantly." },
    { q: "F-statistic = MS_between / MS_within. Large F indicates:", options: ["Small group differences", "Large between-group variation vs within", "Equal variances", "Normal distribution"], correct: 1, explanation: "A large F means between-group variation exceeds within-group variation → groups differ." },
    { q: "Post-hoc test purpose:", options: ["Replace ANOVA", "Find which specific groups differ", "Calculate F-value", "Check normality"], correct: 1, explanation: "Post-hoc tests (Tukey HSD, Bonferroni) identify which pairs differ after ANOVA rejects null." }
  ]
};
