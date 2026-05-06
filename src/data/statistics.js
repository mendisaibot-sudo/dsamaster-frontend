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
    visualType: 'venn'
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
    visualType: 'distribution'
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
    visualType: 'sampling'
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
    visualType: 'distribution'
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
    visualType: 'distribution'
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
    visualType: 'scatter'
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
    visualType: 'scatter'
  }
];
