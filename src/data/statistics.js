export const statisticsTopics = [
  {
    id: 'descriptive-statistics',
    name: 'Descriptive Statistics',
    icon: 'FaChartPie',
    color: 'linear-gradient(135deg, #10b981, #34d399)',
    category: 'Fundamentals',
    description: 'Summarize and describe data using measures of central tendency and dispersion.',
    details: 'Descriptive statistics provide simple summaries about the sample and observations. Central tendency tells us where the center lies (mean, median, mode). Dispersion tells us how spread out data is (variance, standard deviation).',
    concepts: ['Mean','Median','Mode','Variance','Standard Deviation','Percentiles','Quartiles'],
    formulas: [
      { name: 'Population Mean', code: 'μ = Σxᵢ / N', text: 'Sum of all values divided by total count' },
      { name: 'Sample Variance', code: 's² = Σ(xᵢ − x̄)² / (n−1)', text: 'Unbiased estimator with Bessel correction' },
      { name: 'Standard Deviation', code: 'σ = √(σ²)', text: 'Square root of variance in original units' }
    ],
    examples: [
      { title: 'Dataset: [12,15,18,20,23,25,28]', steps: ['n=7','Sum=141','Mean=141/7=20.14','Median=20','Variance=24.81'], result: 'Mean=20.14, Median=20, Std Dev=4.98' }
    ],
    applications: ['Data preprocessing','Business analytics','Quality control','Education'],
    visualType: 'histogram',
    codeExamples: [
      { language: 'python', title: 'Calculate Summary Statistics', code: `import numpy as np\n\ndata = [12, 15, 18, 20, 23, 25, 28]\n\nprint(f"Mean: {np.mean(data):.2f}")\nprint(f"Median: {np.median(data):.2f}")\nprint(f"Std Dev: {np.std(data, ddof=1):.2f}")\nprint(f"Variance: {np.var(data, ddof=1):.2f}")\n\n# Output:\n# Mean: 20.14\n# Median: 20.00\n# Std Dev: 4.98\n# Variance: 24.81` }
    ]
  },
  {
    id: 'probability-theory',
    name: 'Probability Theory',
    icon: 'FaDice',
    color: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    category: 'Fundamentals',
    description: 'Calculate likelihood of events using rules of probability and Bayes theorem.',
    details: 'Probability theory quantifies uncertainty. Sample Space (all outcomes), Events (subsets), Conditional Probability, Bayes Theorem for updating beliefs with evidence.',
    concepts: ['Sample Space','Events','Conditional Probability','Bayes Theorem','Independence'],
    formulas: [
      { name: 'Probability', code: 'P(A)=|A|/|S|', text: 'Favorable over total outcomes' },
      { name: 'Conditional', code: 'P(A|B)=P(A∩B)/P(B)', text: 'Probability of A given B' },
      { name: 'Bayes', code: 'P(A|B)=P(B|A)*P(A)/P(B)', text: 'Update with new evidence' }
    ],
    examples: [
      { title: 'Medical Test Paradox', steps: ['Disease: 1%','Test: 95% true pos, 5% false pos','P(D|+)=0.95*0.01/(0.95*0.01+0.05*0.99)','P(D|+)=0.161'], result: 'Only 16.1% chance despite positive test!' }
    ],
    applications: ['Risk assessment','Medical diagnosis','ML classification','Game theory'],
    visualType: 'venn',
    codeExamples: [
      {
        language: 'python',
        title: 'Bayes Theorem: Medical Test',
        code: `import numpy as np

# Bayes Theorem: Medical Test
# Disease prevalence: 1%, Test accuracy: 95%

P_disease = 0.01
P_no_disease = 0.99
P_pos_given_disease = 0.95
P_pos_given_no_disease = 0.05

# Total probability of positive test
P_positive = (P_pos_given_disease * P_disease +
              P_pos_given_no_disease * P_no_disease)

# Posterior probability
P_disease_given_positive = (P_pos_given_disease * P_disease) / P_positive
print(f"P(Disease | Positive) = {P_disease_given_positive:.3f}")
# Output: 0.161 (only 16.1% chance!)`
      }
    ]
  },
  {
    id: 'probability-distributions',
    name: 'Probability Distributions',
    icon: 'FaChartLine',
    color: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    category: 'Intermediate',
    description: 'Normal, Binomial, and Poisson distributions with properties.',
    details: 'Distributions describe probability spread. Normal (bell curve), Binomial (successes in n trials), Poisson (events in interval).',
    concepts: ['Normal','Binomial','Poisson','PDF','CDF','Expected Value'],
    formulas: [
      { name: 'Normal PDF', code: 'f(x)=(1/σ√2π)*e^(-(x-μ)²/2σ²)', text: 'Bell curve density' },
      { name: 'Binomial', code: 'P(X=k)=C(n,k)*p^k*(1-p)^(n-k)', text: 'k successes in n trials' },
      { name: 'Poisson', code: 'P(X=k)=(λ^k*e^-λ)/k!', text: 'Events in fixed interval' }
    ],
    examples: [
      { title: 'IQ Scores', steps: ['Mean=100, σ=15','P(85<X<115)=?','Z=(X-μ)/σ → Z=±1','P(-1<Z<1)≈68%'], result: '68% of people have IQ 85−115' }
    ],
    applications: ['Statistical inference','Quality control','Queueing','A/B testing'],
    visualType: 'distribution',
    codeExamples: [
      {
        language: 'python',
        title: 'Normal, Binomial, and Poisson',
        code: `import numpy as np
from scipy import stats

# Normal Distribution: IQ Scores (μ=100, σ=15)
mu, sigma = 100, 15
prob_85_115 = stats.norm.cdf(115, mu, sigma) - stats.norm.cdf(85, mu, sigma)
print(f"P(85 < IQ < 115) = {prob_85_115:.3f}")

# Binomial: 10 coin flips, exactly 6 heads
prob_binom = stats.binom.pmf(6, n=10, p=0.5)
print(f"P(exactly 6 heads) = {prob_binom:.4f}")

# Poisson: 3 emails per hour, P(5 in an hour)
prob_poisson = stats.poisson.pmf(5, mu=3)
print(f"P(5 emails) = {prob_poisson:.4f}")`
      }
    ]
  },
  {
    id: 'sampling-clt',
    name: 'Sampling Methods & CLT',
    icon: 'FaRandom',
    color: 'linear-gradient(135deg, #ec4899, #f472b6)',
    category: 'Intermediate',
    description: 'Select representative samples and understand the Central Limit Theorem.',
    details: 'Simple Random (equal chance), Stratified (subgroups), Systematic (every k-th), Bootstrap (resampling). CLT: sample means approach normal as n>=30.',
    concepts: ['Random','Stratified','Bootstrap','Bias','Central Limit Theorem'],
    formulas: [
      { name: 'Sample Size', code: 'n=(Z²*σ²)/E²', text: 'For margin of error E' },
      { name: 'Std Error', code: 'SE=σ/√n', text: 'Sample mean variability' }
    ],
    examples: [
      { title: 'Election Poll', steps: ['Pop: 1M voters','95% conf, ±3%','Z=1.96, p=0.5','n=(1.96²*0.25)/0.03²=1067'], result: 'Only 1,067 people needed!' }
    ],
    applications: ['Polling','Market research','Clinical trials','Surveys'],
    visualType: 'sampling',
    codeExamples: [
      {
        language: 'python',
        title: 'Central Limit Theorem Demo',
        code: `import numpy as np

np.random.seed(42)
population = np.random.exponential(scale=2, size=10000)

sample_means = []
n_samples = 1000
sample_size = 30

for _ in range(n_samples):
    sample = np.random.choice(population, size=sample_size)
    sample_means.append(np.mean(sample))

print(f"Population mean: {np.mean(population):.2f}")
print(f"Mean of sample means: {np.mean(sample_means):.2f}")
print(f"Standard error: {np.std(sample_means):.3f}")
# CLT: sample means are normally distributed regardless of population!`
      }
    ]
  },
  {
    id: 'confidence-intervals',
    name: 'Confidence Intervals',
    icon: 'FaExpandAlt',
    color: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    category: 'Intermediate',
    description: 'Estimate population parameters with a range at specified confidence level.',
    details: 'A CI gives a range where the true parameter likely falls. Wider intervals = more confidence. Formula uses sample mean ± margin of error.',
    concepts: ['Margin of Error','Critical Value','t-Distribution','Interval Estimation'],
    formulas: [
      { name: '95% CI (known σ)', code: 'x̄ ± 1.96*(σ/√n)', text: 'Z-based confidence interval' },
      { name: '95% CI (unknown σ)', code: 'x̄ ± t*(s/√n)', text: 't-distribution based CI' }
    ],
    examples: [
      { title: 'Coffee Shop Visit Time', steps: ['Sample mean=25 min, s=5, n=30','t* (29 df, 95%) = 2.045','ME = 2.045*(5/√30) = 1.87','CI: 25 ± 1.87 = [23.13, 26.87]'], result: 'We are 95% confident true mean is 23.13 to 26.87 min' }
    ],
    applications: ['Opinion polls','Medical studies','Quality assurance','Economic indicators'],
    visualType: 'distribution',
    codeExamples: [
      {
        language: 'python',
        title: 'Calculate Confidence Interval',
        code: `import numpy as np
from scipy import stats

# Coffee shop visit times (minutes)
data = [23, 25, 22, 28, 24, 26, 25, 27, 24, 26,
        25, 23, 24, 26, 25, 27, 24, 25, 26, 25,
        24, 26, 25, 27, 24, 25, 26, 25, 24, 26]

n = len(data)
mean = np.mean(data)
std_err = stats.sem(data)

# 95% confidence interval
ci = stats.t.interval(0.95, df=n-1, loc=mean, scale=std_err)
print(f"Sample mean: {mean:.2f} min")
print(f"95% CI: [{ci[0]:.2f}, {ci[1]:.2f}]")`
      }
    ]
  },
  {
    id: 'hypothesis-testing',
    name: 'Hypothesis Testing',
    icon: 'FaFlask',
    color: 'linear-gradient(135deg, #ef4444, #f87171)',
    category: 'Intermediate',
    description: 'Test assumptions using t-tests, p-values, and significance levels.',
    details: 'Decide between H0 and H1 using test statistics, p-values, and significance level alpha.',
    concepts: ['Null Hypothesis','Alternative','p-value','Significance','Type I/II Errors'],
    formulas: [
      { name: 't-statistic', code: 't=(x̄-μ₀)/(s/√n)', text: 'Distance from null' },
      { name: 'p-value', code: 'P(T≥t | H0 true)', text: 'Probability if H0 is true' }
    ],
    examples: [
      { title: 'New Drug', steps: ['H0: μ_new=μ_old','H1: μ_new>μ_old','Compute t-statistic','If p<0.05 reject H0'], result: 'Drug has statistically significant effect' }
    ],
    applications: ['Clinical trials','A/B testing','Quality assurance','Research'],
    visualType: 'distribution',
    codeExamples: [
      {
        language: 'python',
        title: 'Two-Sample t-Test',
        code: `import numpy as np
from scipy import stats

# New drug vs placebo (blood pressure reduction)
drug_group = np.array([15, 18, 12, 20, 16, 14, 19, 17, 15, 18])
placebo_group = np.array([8, 5, 7, 6, 9, 7, 6, 8, 7, 5])

t_stat, p_value = stats.ttest_ind(drug_group, placebo_group)
print(f"t-statistic: {t_stat:.3f}")
print(f"p-value: {p_value:.6f}")

if p_value < 0.05:
    print("Reject H0: Drug has significant effect!")
else:
    print("Fail to reject H0")`
      }
    ]
  },
  {
    id: 'correlation-regression',
    name: 'Correlation & Regression',
    icon: 'FaSync',
    color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    category: 'Intermediate',
    description: 'Measure relationships and fit predictive models.',
    details: 'Correlation measures linear relationship strength. Regression finds best-fit line. R² tells variance explained.',
    concepts: ['Pearson r','Linear Regression','R-squared','Least Squares','Residuals'],
    formulas: [
      { name: 'Pearson r', code: 'r=Σ(xᵢ-x̄)(yᵢ-ȳ)/√Σ(xᵢ-x̄)²Σ(yᵢ-ȳ)²', text: 'Correlation -1 to 1' },
      { name: 'Slope', code: 'b=Σ(xᵢ-x̄)(yᵢ-ȳ)/Σ(xᵢ-x̄)²', text: 'Best-fit line slope' },
      { name: 'R²', code: 'R²=1-SS_res/SS_tot', text: 'Variance explained' }
    ],
    examples: [
      { title: 'Study vs Score', steps: ['Data: [(2,65),(3,72),(4,78),(5,85),(6,88)]','x̄=4, ȳ=77.6','Covariance and variance','b=5.8, a=54.4'], result: 'Score=54.4+5.8*Hours, r=0.98' }
    ],
    applications: ['Predictive modeling','Economics','Epidemiology','Finance'],
    visualType: 'scatter',
    codeExamples: [
      {
        language: 'python',
        title: 'Correlation and Linear Regression',
        code: `import numpy as np
from scipy import stats

# Study hours vs exam scores
hours = np.array([2, 3, 4, 5, 6, 3, 4, 5, 2, 6])
scores = np.array([65, 72, 78, 85, 88, 70, 75, 82, 68, 90])

# Pearson correlation
r, p = stats.pearsonr(hours, scores)
print(f"Correlation r = {r:.3f}")

# Linear regression
slope, intercept, r_value, p_value, std_err = stats.linregress(hours, scores)
print(f"Regression line: y = {slope:.2f}x + {intercept:.2f}")
print(f"R-squared = {r_value**2:.3f}")

# Predict score for 7 hours
predicted = slope * 7 + intercept
print(f"Predicted score for 7 hours: {predicted:.1f}")`
      }
    ]
  },
  {
    id: 'covariance-matrix',
    name: 'Covariance & Correlation Matrix',
    icon: 'FaTable',
    color: 'linear-gradient(135deg, #6366f1, #818cf8)',
    category: 'Intermediate',
    description: 'Understand how multiple variables vary together using covariance and correlation matrices.',
    details: 'Covariance measures how two variables change together. A covariance matrix shows all pairwise covariances. Correlation standardizes this to a -1 to 1 scale. Essential for multivariate analysis, PCA, and portfolio theory.',
    concepts: ['Covariance','Correlation Matrix','Positive/Negative Correlation','Variance-Covariance','Eigenvalues'],
    formulas: [
      { name: 'Covariance', code: 'Cov(X,Y) = Σ(xᵢ−x̄)(yᵢ−ȳ) / (n−1)', text: 'How X and Y vary together' },
      { name: 'Correlation', code: 'ρ(X,Y) = Cov(X,Y) / (σx·σy)', text: 'Standardized to -1..1' }
    ],
    examples: [
      { title: 'Stocks & Bonds', steps: ['Stock returns: [5%, -2%, 8%, 1%]','Bond returns: [3%, 2%, 4%, 2%]','Covariance is negative','Correlation ≈ −0.7'], result: 'Negative correlation means diversification benefit' }
    ],
    applications: ['Portfolio optimization','Multivariate analysis','PCA','Feature selection','Risk management'],
    visualType: 'scatter',
    codeExamples: [
      {
        language: 'python',
        title: 'Covariance and Correlation Matrix',
        code: `import numpy as np

# Stock returns data
stocks = np.array([[5, -2, 8, 1],
                   [3, 2, 4, 2],
                   [4, 1, 6, 3]])

cov_matrix = np.cov(stocks)
print("Covariance Matrix:")
print(cov_matrix)

corr_matrix = np.corrcoef(stocks)
print("Correlation Matrix:")
print(corr_matrix)
# Negative correlation means diversification benefit`
      }
    ]
  },
  {
    id: 'bayesian-inference',
    name: 'Bayesian Inference',
    icon: 'FaBrain',
    color: 'linear-gradient(135deg, #ec4899, #f472b6)',
    category: 'Advanced',
    description: 'Update beliefs with evidence using Bayes theorem, prior and posterior distributions.',
    details: 'Bayesian inference treats parameters as random variables with uncertainty. We start with a prior belief, observe data, and compute a posterior distribution. Posterior = Likelihood × Prior. Used for parameter estimation, model selection, and probabilistic machine learning.',
    concepts: ['Prior Distribution','Likelihood','Posterior Distribution','MAP Estimation','Bayes Factor','Conjugate Prior','Credible Interval'],
    formulas: [
      { name: 'Bayes Theorem', code: 'P(theta|D) = P(D|theta) * P(theta) / P(D)', text: 'Posterior = Likelihood × Prior / Evidence' },
      { name: 'MAP Estimation', code: 'theta_MAP = argmax P(theta|D)', text: 'Mode of posterior' }
    ],
    examples: [
      { title: 'Coin Bias Estimation', steps: ['Observe 7 heads in 10 flips','Prior: Beta(2,2)','Posterior: Beta(9,5)','Peak shifts from 0.5 to 0.64'], result: 'Posterior mean: 0.643' }
    ],
    applications: ['Medical diagnosis','Spam filtering','A/B testing','ML uncertainty'],
    visualType: 'density'
  },
  {
    id: 'anova-design',
    name: 'ANOVA & Experiments',
    icon: 'FaFlask',
    color: 'linear-gradient(135deg, #6366f1, #818cf8)',
    category: 'Advanced',
    description: 'Compare multiple group means and design statistically valid experiments.',
    details: 'ANOVA tests whether group means differ significantly. One-way ANOVA compares one factor. Two-way handles interactions between factors. Factorial designs, blocking, and randomization eliminate confounding variables and reduce variance.',
    concepts: ['F-statistic','Between-group Variance','Within-group Variance','Factorial Design','Blocking','Post-hoc Tests'],
    formulas: [
      { name: 'F-statistic', code: 'F = MS_between / MS_within', text: 'Between over within mean square' },
      { name: 'SS Groups', code: 'SS_B = Σ n_i(x̄_i - x̄)²', text: 'Between-groups variation' }
    ],
    examples: [
      { title: 'Drug Efficacy', steps: ['Groups: Placebo, A, B','ANOVA: F=5.2, p<0.05','Significant difference found','Post-hoc: A differs from Placebo'], result: 'Drug A shows significant improvement' }
    ],
    applications: ['Clinical trials','Agriculture','Manufacturing','Psychology'],
    visualType: 'boxplot'
  }
];
