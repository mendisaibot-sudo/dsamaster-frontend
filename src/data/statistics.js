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
      { language: 'python', title: 'Calculate Summary Statistics', code: `import numpy as np
data = [12, 15, 18, 20, 23, 25, 28]
print(f"Mean: {np.mean(data):.2f}")
print(f"Median: {np.median(data):.2f}")
print(f"Std Dev: {np.std(data, ddof=1):.2f}")
print(f"Variance: {np.var(data, ddof=1):.2f}")` }
    ],
    conceptDetails: {
      'Mean': {
        explanation: 'The arithmetic mean is the sum of all values divided by the number of values. It is the most common measure of central tendency but is sensitive to outliers.',
        formula: 'μ = Σxᵢ / N',
        visualType: 'array',
        visualData: { values: [12, 15, 18, 20, 23, 25, 28], highlight: [3] },
        quizQuestions: [
          { q: "What is the mean of [10, 20, 30]?", options: ["15", "20", "25", "30"], correct: 1, explanation: "(10+20+30)/3 = 60/3 = 20" },
          { q: "The mean is most affected by:", options: ["Outliers", "Median", "Mode", "Sample size"], correct: 0, explanation: "Extreme values can shift the mean dramatically toward them." }
        ]
      },
      'Median': {
        explanation: 'The median is the middle value when data is sorted. For an even count, it is the average of the two middle values. It is robust to outliers.',
        visualType: 'array',
        visualData: { values: [12, 15, 18, 20, 23, 25, 28], highlight: [3] },
        quizQuestions: [
          { q: "Median of [12, 15, 20, 22, 28]:", options: ["15", "19", "20", "22"], correct: 2, explanation: "With 5 values, the 3rd sorted value (20) is the median." },
          { q: "Median vs Mean: which is robust to outliers?", options: ["Mean", "Median", "Both", "Neither"], correct: 1, explanation: "Median only cares about position, not extreme values." }
        ]
      },
      'Mode': {
        explanation: 'The mode is the most frequently occurring value. A dataset can have multiple modes (bimodal, multimodal) or no mode at all.',
        visualType: 'array',
        visualData: { values: [2, 3, 3, 4, 5, 5, 5, 6], labels: { 2: 'Mode: 5' } },
        quizQuestions: [
          { q: "Mode of [1, 2, 2, 3, 3, 3, 4]:", options: ["1", "2", "3", "4"], correct: 2, explanation: "3 appears 3 times, more than any other value." },
          { q: "A dataset with two modes is called:", options: ["Unimodal", "Bimodal", "Trimodal", "Amodal"], correct: 1, explanation: "Two modes = bimodal distribution." }
        ]
      },
      'Variance': {
        explanation: 'Variance measures how far data points spread from the mean. Population variance divides by N; sample variance divides by n-1 (Bessel correction).',
        formula: 's² = Σ(xᵢ − x̄)² / (n−1)',
        visualType: 'distribution',
        visualData: { mean: 0, std: 1, shadedArea: [-1, 1] },
        quizQuestions: [
          { q: "Why does sample variance divide by n-1?", options: ["To make it larger", "Bias correction", "Simpler math", "Historical reason"], correct: 1, explanation: "Dividing by n-1 gives an unbiased estimator of the population variance." },
          { q: "Population variance divides by:", options: ["n-1", "n", "2n", "sqrt(n)"], correct: 1, explanation: "Population variance uses N (entire population)." }
        ]
      },
      'Standard Deviation': {
        explanation: 'Standard deviation is the square root of variance, bringing units back to the original scale. It tells us the typical distance from the mean.',
        formula: 'σ = sqrt(σ²)',
        visualType: 'distribution',
        visualData: { mean: 0, std: 1 },
        quizQuestions: [
          { q: "If variance = 25, standard deviation = ?", options: ["5", "25", "12.5", "625"], correct: 0, explanation: "sqrt(25) = 5. SD is the square root of variance." },
          { q: "Standard deviation is in what units?", options: ["Squared units", "Original units", "Log units", "Z units"], correct: 1, explanation: "Square root returns the original measurement units." }
        ]
      }
    }
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
      { language: 'python', title: 'Bayes Theorem: Medical Test', code: `import numpy as np
P_disease = 0.01
P_no_disease = 0.99
P_pos_given_disease = 0.95
P_pos_given_no_disease = 0.05
P_positive = (P_pos_given_disease * P_disease + P_pos_given_no_disease * P_no_disease)
P_disease_given_positive = (P_pos_given_disease * P_disease) / P_positive
print(f"P(Disease | Positive) = {P_disease_given_positive:.3f}")` }
    ],
    conceptDetails: {
      'Sample Space': {
        explanation: 'The set of all possible outcomes of a random experiment. For a die: {1,2,3,4,5,6}.',
        visualType: 'array',
        visualData: { values: [1,2,3,4,5,6], highlight: [0] },
        quizQuestions: [
          { q: 'Two dice sample space size?', options: ['6','12','36','24'], correct: 2, explanation: '6×6 = 36 total outcomes' },
          { q: 'Coin flip sample space:', options: ['{H,T}','{H}','{T}','{H,T,Edge}'], correct: 0, explanation: 'Ideal fair coin = {H,T}' }
        ]
      },
      'Events': {
        explanation: 'A subset of the sample space. Mutually exclusive events cannot occur together.',
        quizQuestions: [
          { q: 'Mutually exclusive means P(A∩B) =', options: ['1','0.5','0','P(A)+P(B)'], correct: 2, explanation: 'No overlap → intersection has probability 0' },
          { q: 'Rolling even on a die:', options: ['{2,4,6}','{1,3,5}','{1,2,3}','{4,5,6}'], correct: 0, explanation: 'Even numbers = {2,4,6}' }
        ]
      },
      'Conditional Probability': {
        explanation: 'Probability of A given B has occurred. Narrows the sample space to just B.',
        formula: 'P(A|B) = P(A∩B) / P(B)',
        visualType: 'bar-chart',
        visualData: { bars: [{label:'P(B)',value:40},{label:'P(A∩B)',value:12}] },
        quizQuestions: [
          { q: 'P(A∩B)=0.2, P(B)=0.5 → P(A|B)=', options: ['0.1','0.2','0.4','1.0'], correct: 2, explanation: '0.2 / 0.5 = 0.4' },
          { q: 'P(A|B)=P(A) means A and B are:', options: ['Dependent','Independent','Identical','Disjoint'], correct: 1, explanation: 'No change in probability → independent' }
        ]
      },
      'Bayes Theorem': {
        explanation: 'Updates belief about a hypothesis H given evidence E. Reverses the conditioning.',
        formula: 'P(H|E) = P(E|H)·P(H) / P(E)',
        quizQuestions: [
          { q: 'Bayes computes:', options: ['P(E|H) from P(H|E)','P(H|E) from P(E|H)','P(H)+P(E)','P(H∩E)'], correct: 1, explanation: 'Reverses the conditional probability' },
          { q: 'P(H) before seeing evidence is called:', options: ['Posterior','Prior','Likelihood','Evidence'], correct: 1, explanation: 'Prior = before evidence, posterior = after' }
        ]
      },
      'Independence': {
        explanation: 'A and B are independent if knowing one gives no information about the other.',
        formula: 'P(A∩B) = P(A)·P(B)',
        quizQuestions: [
          { q: 'P(A)=0.6, P(B)=0.5, independent → P(A∩B)=', options: ['1.1','0.3','0.11','0.8'], correct: 1, explanation: '0.6 × 0.5 = 0.3' },
          { q: 'Drawing with replacement makes draws:', options: ['Independent','Dependent','Identical','Complementary'], correct: 0, explanation: 'Replacement restores original state' }
        ]
      }
    }
  },
  {
    id: 'probability-distributions',
    name: 'Probability Distributions',
    icon: 'FaChartLine',
    color: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    category: 'Intermediate',
    description: 'Normal, Binomial, and Poisson distributions with properties.',
    details: 'Distributions describe probability spread. Normal (bell curve), Binomial (successes in n trials), Poisson (events in interval).',
    concepts: ['Discrete','Continuous','Binomial','Normal','PDF vs CDF'],
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
      { language: 'python', title: 'Normal, Binomial, Poisson', code: `from scipy import stats
mu, sigma = 100, 15
prob = stats.norm.cdf(115, mu, sigma) - stats.norm.cdf(85, mu, sigma)
print(f"P(85 < IQ < 115) = {prob:.3f}")
print(f"P(6 heads) = {stats.binom.pmf(6, n=10, p=0.5):.4f}")
print(f"P(5 emails) = {stats.poisson.pmf(5, mu=3):.4f}")` }
    ],
    conceptDetails: {
      'Discrete': {
        explanation: 'Distributions for countable outcomes: Binomial (success counts), Poisson (rare events), Geometric (trials until success).',
        quizQuestions: [
          { q: 'Binomial models:', options: ['Heights','Success counts','Time','Scores'], correct: 1, explanation: 'Fixed trials, count successes' },
          { q: 'Poisson is for:', options: ['Rare events','Normal data','Binary','Uniform'], correct: 0, explanation: 'Counts in fixed intervals' }
        ]
      },
      'Continuous': {
        explanation: 'Variables that can take any value in a range. Probability at an exact point is always zero; probabilities are computed over intervals.',
        quizQuestions: [
          { q: 'For continuous, P(X=exact)=', options: ['1','0.5','0','Depends'], correct: 2, explanation: 'Probabilities are computed over intervals' },
          { q: 'Most common continuous distribution?', options: ['Uniform','Normal','Binomial','Poisson'], correct: 1, explanation: 'Normal/Gaussian is ubiquitous' }
        ]
      },
      'Binomial': {
        explanation: 'Number of successes k in n independent trials, each with probability p.',
        formula: 'P(X=k) = C(n,k)·p^k·(1-p)^(n-k)',
        visualType: 'bar-chart',
        visualData: { bars: [{label:'k=0',value:1},{label:'k=1',value:6},{label:'k=2',value:15},{label:'k=3',value:20}] },
        quizQuestions: [
          { q: 'n=5, p=0.5, E[X]=', options: ['2','2.5','5','1'], correct: 1, explanation: 'E[X] = np = 5×0.5 = 2.5' },
          { q: 'Variance of Binomial(n,p)=', options: ['np','np(1-p)','√(np)','p(1-p)'], correct: 1, explanation: 'Var = np(1-p)' }
        ]
      },
      'Normal': {
        explanation: 'Bell-shaped and symmetric. ~68% within 1σ, ~95% within 2σ, ~99.7% within 3σ.',
        formula: 'f(x)=(1/σ√2π)·exp(-(x-μ)²/2σ²)',
        visualType: 'distribution',
        visualData: { mean: 0, std: 1 },
        quizQuestions: [
          { q: 'P(μ-σ < X < μ+σ) ≈', options: ['68%','95%','99.7%','50%'], correct: 0, explanation: 'Empirical rule: 68-95-99.7' },
          { q: 'Standard normal has μ=__, σ=__', options: ['0,1','1,0','0,0','1,1'], correct: 0, explanation: 'Z-distribution: μ=0, σ=1' }
        ]
      },
      'PDF vs CDF': {
        explanation: 'PDF gives density at a point (not probability). CDF gives P(X≤x), accumulated probability from -∞ to x.',
        quizQuestions: [
          { q: 'CDF at x gives:', options: ['Density','P(X=x)','P(X≤x)','P(X>x)'], correct: 2, explanation: 'CDF = cumulative probability' },
          { q: 'PDF height represents:', options: ['Probability','Density','Area','Volume'], correct: 1, explanation: 'PDF must integrate to 1; height is density' }
        ]
      }
    }
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
      { language: 'python', title: 'Central Limit Theorem Demo', code: `import numpy as np
np.random.seed(42)
population = np.random.exponential(scale=2, size=10000)
sample_means = []
for _ in range(1000):
    sample = np.random.choice(population, size=30)
    sample_means.append(np.mean(sample))
print(f"Pop mean: {np.mean(population):.2f}, Means mean: {np.mean(sample_means):.2f}")` }
    ],
    conceptDetails: {
      'Random': {
        explanation: 'Every member of population has equal chance of being selected. Eliminates selection bias.',
        quizQuestions: [
          { q: 'Simple random sampling ensures:', options: ['Equal chance','Subgroup balance','Order preservation','Clustering'], correct: 0, explanation: 'Every member has equal probability' },
          { q: 'Without replacement means:', options: ['Same can be picked twice','Cannot pick same twice','Ordered selection','Stratified'], correct: 1, explanation: 'Once picked, removed from pool' }
        ]
      },
      'Stratified': {
        explanation: 'Population divided into subgroups (strata), samples taken from each stratum proportionally.',
        quizQuestions: [
          { q: 'Stratified sampling preserves:', options: ['Randomness','Subgroup proportions','Cluster sizes','Bias'], correct: 1, explanation: 'Ensures representation across strata' },
          { q: 'Strata should be:', options: ['Identical','Mutually exclusive','Overlapping','Random'], correct: 1, explanation: 'Each member belongs to exactly one stratum' }
        ]
      },
      'Bootstrap': {
        explanation: 'Resample with replacement from observed data to estimate sampling distributions. Powerful non-parametric method.',
        quizQuestions: [
          { q: 'Bootstrap samples are drawn:', options: ['Without replacement','With replacement','Only once','From population'], correct: 1, explanation: 'With replacement creates sampling distribution' },
          { q: 'Bootstrap is especially useful when:', options: ['n is very large','Distribution is unknown','σ is known','Data is perfectly normal'], correct: 1, explanation: 'It does not assume any distribution shape' }
        ]
      },
      'Central Limit Theorem': {
        explanation: 'Sample means approach Normal(μ, σ/√n) as n grows, regardless of population distribution shape.',
        formula: 'X̄ ~ N(μ, σ²/n) for large n',
        visualType: 'distribution',
        visualData: { mean: 0, std: 1 },
        quizQuestions: [
          { q: 'CLT applies to:', options: ['Only normal populations','Any population (large n)','Only means','Only proportions'], correct: 1, explanation: 'Key insight: any distribution → normal means' },
          { q: 'Minimum n for CLT often cited:', options: ['5','10','30','100'], correct: 2, explanation: 'Rule of thumb: n≥30' }
        ]
      },
      'Bias': {
        explanation: 'Systematic error that causes estimates to consistently deviate from true values. Types: selection, measurement, confirmation.',
        quizQuestions: [
          { q: 'Bias leads to estimates that are:', options: ['Accurate but imprecise','Consistently wrong','Variable','Unbiased'], correct: 1, explanation: 'Bias = systematic deviation from truth' },
          { q: 'Convenience sampling causes:', options: ['Random error','Selection bias','Reduced variance','Higher precision'], correct: 1, explanation: 'Easy-to-reach samples rarely represent population' }
        ]
      }
    }
  },
  {
    id: 'confidence-intervals',
    name: 'Confidence Intervals',
    icon: 'FaExpandAlt',
    color: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
    category: 'Intermediate',
    description: 'Estimate population parameters with a range at specified confidence level.',
    details: 'A CI gives a range where the true parameter likely falls. Wider intervals = more confidence. Formula uses sample mean ± margin of error.',
    concepts: ['Margin of Error','Z-Score','t-Distribution','Confidence Level'],
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
      { language: 'python', title: 'Calculate Confidence Interval', code: `import numpy as np
from scipy import stats
data = [23,25,22,28,24,26,25,27,24,26,25,23,24,26,25,27,24,25,26,25,24,26,25,27,24,25,26,25,24,26]
n = len(data)
mean = np.mean(data)
std_err = stats.sem(data)
ci = stats.t.interval(0.95, df=n-1, loc=mean, scale=std_err)
print(f"Sample mean: {mean:.2f} min")
print(f"95% CI: [{ci[0]:.2f}, {ci[1]:.2f}]")` }
    ],
    conceptDetails: {
      'Margin of Error': {
        explanation: 'Half-width of confidence interval. ME = Z*(σ/√n). Larger ME → wider interval → more confidence but less precision.',
        formula: 'ME = Z*(σ/√n)',
        quizQuestions: [
          { q: 'To decrease margin of error:', options: ['Decrease n','Increase n','Increase α','Keep same n'], correct: 1, explanation: 'ME ∝ 1/√n → larger n = smaller ME' },
          { q: 'ME increases with confidence level because:', options: ['Z decreases','Z increases','σ shrinks','n shrinks'], correct: 1, explanation: 'Higher confidence needs larger Z multiplier' }
        ]
      },
      't-Distribution': {
        explanation: 'Similar to normal but with heavier tails. Used when population σ is unknown (small samples). Approaches normal as df → ∞.',
        visualType: 'distribution',
        visualData: { mean: 0, std: 1 },
        quizQuestions: [
          { q: 't-distribution has heavier tails than normal:', options: ['Always','Never','When df is small','When df is large'], correct: 2, explanation: 'Small df = more uncertainty = heavier tails' },
          { q: 't-distribution used when:', options: ['σ known and n large','σ unknown','Population normal','All of these'], correct: 1, explanation: 'Specifically when σ is unknown (small samples)' }
        ]
      },
      'Confidence Level': {
        explanation: 'Probability that the CI contains the true parameter. 95% confidence → if repeated 100 times, ~95 intervals will contain μ.',
        quizQuestions: [
          { q: 'Higher confidence level gives:', options: ['Narrower interval','Wider interval','Same width','Smaller Z'], correct: 1, explanation: 'More confidence = more room = wider interval' },
          { q: 'A 95% CI means:', options: ['95% chance μ is in this interval','95% of repeated intervals contain μ','μ is 95% likely','95% of data is inside'], correct: 1, explanation: 'Frequentist interpretation: 95% of intervals capture μ' }
        ]
      },
      'Z-Score': {
        explanation: 'Measures how many standard deviations a value is from the mean. Standardizes values to compare across distributions.',
        formula: 'Z = (X - μ) / σ',
        quizQuestions: [
          { q: 'Z-score of mean is:', options: ['1','0','-1','Depends on σ'], correct: 1, explanation: '(μ - μ)/σ = 0' },
          { q: 'IQ=115 (μ=100,σ=15). Z=', options: ['0.5','1.0','1.5','2.0'], correct: 1, explanation: '(115-100)/15 = 15/15 = 1' }
        ]
      }
    }
  },
  {
    id: 'hypothesis-testing',
    name: 'Hypothesis Testing',
    icon: 'FaFlask',
    color: 'linear-gradient(135deg, #ef4444, #f87171)',
    category: 'Intermediate',
    description: 'Test assumptions using t-tests, p-values, and significance levels.',
    details: 'Decide between H0 and H1 using test statistics, p-values, and significance level alpha.',
    concepts: ['Null Hypothesis','Alternative Hypothesis','p-Value','Type I Error','Type II Error'],
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
      { language: 'python', title: 'Two-Sample t-Test', code: `import numpy as np
from scipy import stats
drug_group = np.array([15,18,12,20,16,14,19,17,15,18])
placebo_group = np.array([8,5,7,6,9,7,6,8,7,5])
t_stat, p_value = stats.ttest_ind(drug_group, placebo_group)
print(f"t-statistic: {t_stat:.3f}")
print(f"p-value: {p_value:.6f}")
if p_value < 0.05:
    print("Reject H0: Drug has significant effect!")
else:
    print("Fail to reject H0")` }
    ],
    conceptDetails: {
      'Null Hypothesis': {
        explanation: 'H₀ states no effect, no difference, or no relationship. Assumed true until evidence contradicts it.',
        quizQuestions: [
          { q: 'The null hypothesis typically claims:', options: ['There is an effect','No effect exists','Effect is large','Effect is small'], correct: 1, explanation: 'H₀ always represents no effect/difference' },
          { q: 'We assume H₀ is true to:', options: ['Prove it','Calculate p-value under it','Reject the alternative','Simplify math'], correct: 1, explanation: 'We compute test statistic assuming H₀ is true' }
        ]
      },
      'Alternative Hypothesis': {
        explanation: 'H₁ states the effect or difference we seek evidence for. Can be one-sided (directional) or two-sided.',
        quizQuestions: [
          { q: 'H₁: μ > 100 is:', options: ['Two-sided','One-sided','Null','Always true'], correct: 1, explanation: 'Directional (> or <) = one-sided' },
          { q: 'Two-sided test detects:', options: ['Only increase','Only decrease','Any difference','No difference'], correct: 2, explanation: '≠ detects deviations in either direction' }
        ]
      },
      'p-Value': {
        explanation: 'Probability of observing data as extreme as, or more extreme than, what was observed, assuming H₀ is true. Smaller p = stronger evidence against H₀.',
        formula: 'p = P(data | H₀ true)',
        quizQuestions: [
          { q: 'p-value of 0.03 means:', options: ['3% probability H₀ is true','3% chance of data if H₀ is true','97% power','Effect size is 0.03'], correct: 1, explanation: 'p = P(data|H₀), not P(H₀|data)' },
          { q: 'At α=0.05, p=0.02 means:', options: ['Fail to reject H₀','Reject H₀','Accept H₀','No conclusion'], correct: 1, explanation: 'p < α → reject null hypothesis' }
        ]
      },
      'Type I Error': {
        explanation: 'Rejecting H₀ when it is actually true (false positive). Probability controlled by significance level α. α = 0.05 means 5% risk of false positive.',
        quizQuestions: [
          { q: 'Type I error is also called:', options: ['False negative','False positive','True positive','True negative'], correct: 1, explanation: 'Rejecting true H₀ = false positive' },
          { q: 'P(Type I error) =', options: ['β','1-β','α','1-α'], correct: 2, explanation: 'α is the significance level = P(reject H₀ | H₀ true)' }
        ]
      },
      'Type II Error': {
        explanation: 'Failing to reject H₀ when it is false (false negative). Probability = β. Power = 1-β = probability of correctly rejecting false H₀.',
        quizQuestions: [
          { q: 'Type II error is also called:', options: ['False positive','False negative','True positive','True negative'], correct: 1, explanation: 'Failing to reject false H₀ = false negative' },
          { q: 'Power of a test equals:', options: ['α','β','1-β','1-α'], correct: 2, explanation: 'Power = probability of detecting an effect = 1-β' }
        ]
      }
    }
  },
  {
    id: 'correlation-regression',
    name: 'Correlation & Regression',
    icon: 'FaSync',
    color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    category: 'Intermediate',
    description: 'Measure relationships and fit predictive models.',
    details: 'Correlation measures linear relationship strength. Regression finds best-fit line. R² tells variance explained.',
    concepts: ['Pearson r','Regression Line','Residuals','R²','Outliers'],
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
      { language: 'python', title: 'Correlation and Linear Regression', code: `import numpy as np
from scipy import stats
hours = np.array([2,3,4,5,6,3,4,5,2,6])
scores = np.array([65,72,78,85,88,70,75,82,68,90])
r, p = stats.pearsonr(hours, scores)
print(f"Correlation r = {r:.3f}")
slope, intercept, r_value, p_value, std_err = stats.linregress(hours, scores)
print(f"Regression: y = {slope:.2f}x + {intercept:.2f}")
print(f"R-squared = {r_value**2:.3f}")` }
    ],
    conceptDetails: {
      'Pearson r': {
        explanation: 'Linear correlation coefficient. Ranges from -1 (perfect negative) to +1 (perfect positive). 0 = no linear relationship.',
        formula: 'r = Σ(x-x̄)(y-ȳ) / √[Σ(x-x̄)²·Σ(y-ȳ)²]',
        visualType: 'scatter',
        visualData: { points: [[0.1,0.2],[0.3,0.35],[0.5,0.55],[0.7,0.8],[0.9,0.85]], regression: {slope:0.8, intercept:0.1} },
        quizQuestions: [
          { q: 'r = 0.9 means:', options: ['Strong positive linear','Strong negative','Weak positive','No correlation'], correct: 0, explanation: 'Close to +1 = strong positive linear' },
          { q: 'r = 0 for a circle pattern means:', options: ['No correlation','Perfect correlation','Nonlinear relation exists','Error'], correct: 2, explanation: 'Pearson r only detects linear; could be nonlinear' }
        ]
      },
      'Regression Line': {
        explanation: 'Best-fit line minimizing sum of squared residuals. Used to predict y from x.',
        formula: 'ŷ = b₀ + b₁x',
        quizQuestions: [
          { q: 'Slope b₁ represents:', options: ['Y-intercept','Change in y per x','Correlation','Error'], correct: 1, explanation: 'Slope = rise/run = change in y per unit x' },
          { q: 'OLS minimizes:', options: ['Sum of x','Sum of squared residuals','Sum of y','Product of errors'], correct: 1, explanation: 'Ordinary Least Squares minimizes Σ(residual)²' }
        ]
      },
      'Residuals': {
        explanation: 'Difference between observed y and predicted ŷ. Small, random residuals = good fit. Patterns in residuals = model problems.',
        formula: 'e = y - ŷ',
        quizQuestions: [
          { q: 'Residual = observed - predicted means:', options: ['Positive = under-predicted','Positive = over-predicted','Always zero','Always positive'], correct: 0, explanation: 'If predicted < observed, residual is positive' },
          { q: 'Patterns in residual plot suggest:', options: ['Good fit','Nonlinearity/missing terms','Perfect model','Outliers only'], correct: 1, explanation: 'Random scatter = good; patterns = problems' }
        ]
      },
      'R²': {
        explanation: 'Coefficient of determination. Fraction of variance in y explained by x. R² = 0.85 means 85% of variance is explained.',
        formula: 'R² = SSR / SST = 1 - (SSE/SST)',
        quizQuestions: [
          { q: 'R² = 0 means:', options: ['Perfect fit','No explanatory power','All variance explained','Negative correlation'], correct: 1, explanation: 'Model explains 0% of variance' },
          { q: 'R² = 0.81 means correlation |r| ≈', options: ['0.81','0.9','0.65','0.95'], correct: 1, explanation: 'R² = r², so |r| = √0.81 = 0.9' }
        ]
      },
      'Outliers': {
        explanation: 'Points far from the overall pattern. Can strongly influence correlation and regression. Always investigate before removing.',
        quizQuestions: [
          { q: 'Outliers in regression:', options: ['Always removed','May strongly influence slope','Never affect results','Only affect R²'], correct: 1, explanation: 'Outliers can disproportionately shift the line' },
          { q: 'Leverage points have:', options: ['High residual','Extreme x values','Small influence','No effect'], correct: 1, explanation: 'High leverage = extreme x → can dominate fit' }
        ]
      }
    }
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
      { language: 'python', title: 'Covariance and Correlation Matrix', code: `import numpy as np
stocks = np.array([[5,-2,8,1],[3,2,4,2],[4,1,6,3]])
cov_matrix = np.cov(stocks)
print("Covariance Matrix:")
print(cov_matrix)
corr_matrix = np.corrcoef(stocks)
print("Correlation Matrix:")
print(corr_matrix)` }
    ],
    conceptDetails: {
      'Covariance': {
        explanation: 'Covariance measures the joint variability of two variables. Positive covariance means variables tend to increase together; negative means one increases while the other decreases.',
        formula: 'Cov(X,Y) = Σ(xᵢ−x̄)(yᵢ−ȳ) / (n−1)',
        visualType: 'scatter',
        visualData: { points: [[1,2],[2,3],[3,4],[4,5],[5,6]], regression: {slope:1, intercept:1} },
        quizQuestions: [
          { q: 'Covariance of X with itself equals:', options: ['0','Variance of X','Standard deviation','Correlation'], correct: 1, explanation: 'Cov(X,X) = Var(X)' },
          { q: 'Covariance is positive when:', options: ['X and Y move opposite','X and Y move together','X is constant','Y is constant'], correct: 1, explanation: 'Both above or both below their means → positive' }
        ]
      },
      'Correlation Matrix': {
        explanation: 'A table showing correlation coefficients between variables. Diagonal is always 1 (perfect self-correlation). Values range from -1 to 1.',
        visualType: 'bar-chart',
        visualData: { bars: [{label:'v1-v2',value:0.8},{label:'v1-v3',value:-0.3},{label:'v2-v3',value:0.1}] },
        quizQuestions: [
          { q: 'Diagonal elements of a correlation matrix are:', options: ['0','1','Variance','Mean'], correct: 1, explanation: 'Each variable perfectly correlates with itself' },
          { q: 'A correlation of -0.9 indicates:', options: ['Weak negative','Strong negative','Weak positive','Strong positive'], correct: 1, explanation: 'Close to -1 = strong negative linear relationship' }
        ]
      },
      'Positive/Negative Correlation': {
        explanation: 'Positive: as one variable increases, the other tends to increase. Negative: as one increases, the other tends to decrease. Zero: no linear relationship.',
        quizQuestions: [
          { q: 'Ice cream sales and temperature typically show:', options: ['Positive','Negative','Zero','Nonlinear'], correct: 0, explanation: 'Warmer weather → more ice cream sales' },
          { q: 'Car age and resale value typically show:', options: ['Positive','Negative','Zero','Nonlinear'], correct: 1, explanation: 'Older cars tend to sell for less' }
        ]
      },
      'Variance-Covariance': {
        explanation: 'A matrix where diagonals are variances of individual variables and off-diagonals are covariances between pairs. Symmetric and positive semi-definite.',
        quizQuestions: [
          { q: 'In a variance-covariance matrix, diagonals are:', options: ['Covariances','Variances','Correlations','Means'], correct: 1, explanation: 'Diagonal = Var(Xᵢ), off-diagonal = Cov(Xᵢ,Xⱼ)' },
          { q: 'A covariance matrix is always:', options: ['Asymmetric','Symmetric','Negative definite','None'], correct: 1, explanation: 'Cov(X,Y) = Cov(Y,X), hence symmetric' }
        ]
      },
      'Eigenvalues': {
        explanation: 'Eigenvalues of a covariance matrix indicate the amount of variance captured by each principal component. Larger eigenvalues = more variance explained.',
        quizQuestions: [
          { q: 'The largest eigenvalue corresponds to:', options: ['Least variance','Most variance','Zero variance','Mean'], correct: 1, explanation: 'PCA: first principal component = largest eigenvalue direction' },
          { q: 'Sum of eigenvalues equals:', options: ['Mean','Total variance','Standard deviation','Zero'], correct: 1, explanation: 'Trace of covariance matrix = total variance' }
        ]
      }
    }
  },
  {
    id: 'bayesian-inference',
    name: 'Bayesian Inference',
    icon: 'FaBrain',
    color: 'linear-gradient(135deg, #ec4899, #f472b6)',
    category: 'Advanced',
    description: 'Update beliefs with evidence using Bayes theorem, prior and posterior distributions.',
    details: 'Bayesian inference treats parameters as random variables with uncertainty. We start with a prior belief, observe data, and compute a posterior distribution. Posterior = Likelihood × Prior. Used for parameter estimation, model selection, and probabilistic machine learning.',
    concepts: ['Prior','Likelihood','Posterior','MAP Estimation','Bayes Factor','Conjugate Prior','Credible Interval'],
    formulas: [
      { name: 'Bayes Theorem', code: 'P(theta|D) = P(D|theta) * P(theta) / P(D)', text: 'Posterior = Likelihood × Prior / Evidence' },
      { name: 'MAP Estimation', code: 'theta_MAP = argmax P(theta|D)', text: 'Mode of posterior' }
    ],
    examples: [
      { title: 'Coin Bias Estimation', steps: ['Observe 7 heads in 10 flips','Prior: Beta(2,2)','Posterior: Beta(9,5)','Peak shifts from 0.5 to 0.64'], result: 'Posterior mean: 0.643' }
    ],
    applications: ['Medical diagnosis','Spam filtering','A/B testing','ML uncertainty'],
    visualType: 'density',
    codeExamples: [
      { language: 'python', title: 'Bayesian Coin Update', code: `import numpy as np
from scipy import stats
heads = 7
flips = 10
alpha_prior, beta_prior = 2, 2
alpha_post = alpha_prior + heads
beta_post = beta_prior + (flips - heads)
print(f"Posterior: Beta({alpha_post}, {beta_post})")
print(f"Posterior mean: {alpha_post / (alpha_post + beta_post):.3f}")
cri = stats.beta.interval(0.95, alpha_post, beta_post)
print(f"95% Credible Interval: [{cri[0]:.3f}, {cri[1]:.3f}]")` }
    ],
    conceptDetails: {
      'Prior': {
        explanation: 'Belief about a parameter before seeing data. Can be informative (strong belief) or uninformative (vague).',
        quizQuestions: [
          { q: 'Prior represents:', options: ['Data likelihood','Initial belief','Posterior','Evidence'], correct: 1, explanation: 'Prior = before seeing data' },
          { q: 'Uninformative prior:', options: ['Strong belief','Vague/no preference','Based on data','Always wrong'], correct: 1, explanation: 'Lets data dominate the posterior' }
        ]
      },
      'Likelihood': {
        explanation: 'P(data | parameter). Measures how likely the observed data is for different parameter values.',
        quizQuestions: [
          { q: 'Likelihood is P(___|___):', options: ['parameter, data','data, parameter','prior, data','posterior, prior'], correct: 1, explanation: 'Likelihood = P(data|parameter)' },
          { q: 'Maximum Likelihood Estimation finds:', options: ['Prior','Parameter maximizing likelihood','Posterior mean','Bayes factor'], correct: 1, explanation: 'MLE finds parameter value most consistent with data' }
        ]
      },
      'Posterior': {
        explanation: 'Updated belief about parameter after seeing data. Posterior ∝ Likelihood × Prior.',
        formula: 'Posterior ∝ Likelihood × Prior',
        quizQuestions: [
          { q: 'With more data, posterior becomes:', options: ['More like prior','More like likelihood','Unchanged','Less certain'], correct: 1, explanation: 'Data overwhelms prior with enough observations' },
          { q: 'Posterior combines:', options: ['Prior only','Likelihood only','Prior and likelihood','Data only'], correct: 2, explanation: 'Posterior = prior updated with data via likelihood' }
        ]
      },
      'MAP Estimation': {
        explanation: 'Maximum A Posteriori estimation finds the parameter value that maximizes the posterior distribution. It is the Bayesian counterpart to MLE but includes the prior.',
        quizQuestions: [
          { q: 'MAP differs from MLE by including:', options: ['Likelihood only','Prior','Evidence','Data'], correct: 1, explanation: 'MAP = argmax P(data|θ)·P(θ); MLE = argmax P(data|θ)' },
          { q: 'With a uniform prior, MAP equals:', options: ['Posterior mean','MLE','Bayes factor','Evidence'], correct: 1, explanation: 'Uniform prior makes MAP equivalent to MLE' }
        ]
      },
      'Bayes Factor': {
        explanation: 'The ratio of marginal likelihoods for two competing models. BF > 1 favors the numerator model. Used for model comparison.',
        quizQuestions: [
          { q: 'Bayes Factor K = 10 means:', options: ['Strong evidence for H0','Strong evidence for H1','Equal evidence','No evidence'], correct: 1, explanation: 'Jeffreys scale: K>10 = strong evidence for numerator model' },
          { q: 'Bayes Factor compares:', options: ['Priors','Likelihoods of models','Posterior means','Predictions'], correct: 1, explanation: 'Ratio of marginal likelihoods P(D|M1)/P(D|M0)' }
        ]
      },
      'Conjugate Prior': {
        explanation: 'A prior that yields a posterior in the same distribution family. E.g., Beta prior + Binomial likelihood → Beta posterior. Makes computation tractable.',
        quizQuestions: [
          { q: 'Beta is conjugate to:', options: ['Normal','Binomial','Poisson','Uniform'], correct: 1, explanation: 'Beta prior + Binomial likelihood = Beta posterior' },
          { q: 'Conjugate priors simplify:', options: ['Data collection','Posterior computation','Visualization','Sampling'], correct: 1, explanation: 'Closed-form posteriors avoid numerical integration' }
        ]
      },
      'Credible Interval': {
        explanation: 'Bayesian counterpart to confidence interval. E.g., 95% CrI means P(parameter ∈ interval | data) = 0.95.',
        quizQuestions: [
          { q: '95% CrI means:', options: ['95% of data inside','P(param in interval|data)=0.95','Interval contains 95% of samples','Confidence level'], correct: 1, explanation: 'Direct probability statement about parameter' },
          { q: 'CrI vs CI: which allows P(param in interval)?', options: ['CI','CrI','Both','Neither'], correct: 1, explanation: 'Bayesian CrI gives direct probability; frequentist CI does not' }
        ]
      }
    }
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
    visualType: 'boxplot',
    codeExamples: [
      { language: 'python', title: 'One-Way ANOVA', code: `import numpy as np
from scipy import stats
placebo = [5,6,5,7,6]
drug_a = [8,9,7,10,9]
drug_b = [7,8,6,8,7]
f_stat, p_value = stats.f_oneway(placebo, drug_a, drug_b)
print(f"F-statistic: {f_stat:.3f}")
print(f"p-value: {p_value:.4f}")` }
    ],
    conceptDetails: {
      'F-statistic': {
        explanation: 'Ratio of model variance to error variance. F > critical value → reject null (at least one group differs).',
        quizQuestions: [
          { q: 'F = 1 suggests:', options: ['Strong differences','No differences','Small sample','Large effect'], correct: 1, explanation: 'F≈1 means between ≈ within → no group differences' },
          { q: 'F-test assumes:', options: ['Normality, equal variance','Only normality','Only equal variance','No assumptions'], correct: 0, explanation: 'Both normality and homogeneity of variance' }
        ]
      },
      'Between-group Variance': {
        explanation: 'Measures how much group means differ from the overall mean. Large between-group variance suggests the factor has an effect.',
        quizQuestions: [
          { q: 'High between-group variance suggests:', options: ['Groups are the same','Groups differ','High random error','Low sample size'], correct: 1, explanation: 'Means deviate from overall mean → factor has effect' },
          { q: 'Between-group variance is in the:', options: ['Denominator','Numerator of F','Error term','Residual'], correct: 1, explanation: 'F = MS_between / MS_within' }
        ]
      },
      'Within-group Variance': {
        explanation: 'Measures variability inside each group (error/residual). Represents random variation not explained by the factor.',
        quizQuestions: [
          { q: 'Within-group variance represents:', options: ['Treatment effect','Random error','Sample size','Mean difference'], correct: 1, explanation: 'Unexplained variation inside groups' },
          { q: 'Smaller within-group variance means:', options: ['Less precision','More precision','Larger effect','More groups'], correct: 1, explanation: 'Less noise → easier to detect between-group differences' }
        ]
      },
      'Factorial Design': {
        explanation: 'Study multiple factors simultaneously with all combinations. Can detect main effects and interactions.',
        quizQuestions: [
          { q: '2×2 factorial has how many groups?', options: ['2','4','6','8'], correct: 1, explanation: '2 levels × 2 factors = 4 combinations' },
          { q: 'Interaction effect means:', options: ['Effect of A depends on B','A and B independent','Only A matters','Only B matters'], correct: 0, explanation: 'The factors influence each other' }
        ]
      },
      'Blocking': {
        explanation: 'Group similar experimental units together (blocks) to reduce nuisance variation. Improves precision.',
        quizQuestions: [
          { q: 'Blocking reduces:', options: ['Treatment effect','Nuisance variation','Sample size','Power'], correct: 1, explanation: 'Accounts for known sources of variability' },
          { q: 'Randomized block design assigns:', options: ['All treatments to each block','One treatment per block','No randomization','Only controls'], correct: 0, explanation: 'Each block gets all treatments in random order' }
        ]
      },
      'Post-hoc Tests': {
        explanation: 'After significant ANOVA, determine which specific groups differ. Controls for multiple comparisons (alpha inflation).',
        quizQuestions: [
          { q: 'Post-hoc is needed because:', options: ['ANOVA is not enough','Multiple comparison problem','Small sample','Large variance'], correct: 1, explanation: 'Multiple tests inflate Type I error rate' },
          { q: 'Tukey HSD controls:', options: ['Type II error','Family-wise error rate','Sample size','Effect size'], correct: 1, explanation: 'Tukey controls overall error across all pairwise tests' }
        ]
      }
    }
  }
];
