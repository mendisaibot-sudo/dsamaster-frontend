// Auto-generated concept details for statistics topics
// Each key matches a statistics topic ID

export const statisticsConceptDetails = {
  // === PROBABILITY THEORY ===
  'probability-theory': {
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
  },

  // === PROBABILITY DISTRIBUTIONS ===
  'probability-distributions': {
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
  },

  // === SAMPLING & CLT ===
  'sampling-clt': {
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
  },

  // === CONFIDENCE INTERVALS ===
  'confidence-intervals': {
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
  },

  // === HYPOTHESIS TESTING ===
  'hypothesis-testing': {
    'Null Hypothesis': {
      explanation: 'H₀ states no effect, no difference, or no relationship. Assumed true until evidence contradicts it.',
      quizQuestions: [
        { q: 'The null hypothesis typically claims:', options: ['There is an effect','No effect exists','Effect is large','Effect is small'], correct: 1, explanation: 'H₀ always represents no effect/difference' },
        { q: 'We assume H₀ is true to:', options: ['Prove it','Calculate p-value under it','Reject the alternative','Simplify math'], correct: 1, explanation: 'We compute test statistic assuming H₀ is true' }
      ]
    },
    'Alternative Hypothesis': {
      "explanation": "H₁ states the effect or difference we seek evidence for. Can be one-sided (directional) or two-sided.",
      quizQuestions: [
        { q: 'H₁: μ > 100 is:', options: ['Two-sided','One-sided','Null','Always true'], correct: 1, explanation: 'Directional (> or <) = one-sided' },
        { q: 'Two-sided test detects:', options: ['Only increase','Only decrease','Any difference','No difference'], correct: 2, explanation: '≠ detects deviations in either direction' }
      ]
    },
    'p-Value': {
      "explanation": "Probability of observing data as extreme as, or more extreme than, what was observed, assuming H₀ is true. Smaller p = stronger evidence against H₀.",
      formula: 'p = P(data | H₀ true)',
      quizQuestions: [
        { q: 'p-value of 0.03 means:', options: ['3% probability H₀ is true','3% chance of data if H₀ is true','97% power','Effect size is 0.03'], correct: 1, explanation: 'p = P(data|H₀), not P(H₀|data)' },
        { q: 'At α=0.05, p=0.02 means:', options: ['Fail to reject H₀','Reject H₀','Accept H₀','No conclusion'], correct: 1, explanation: 'p < α → reject null hypothesis' }
      ]
    },
    'Type I Error': {
      "explanation": "Rejecting H₀ when it is actually true (false positive). Probability controlled by significance level α. α = 0.05 means 5% risk of false positive.",
      quizQuestions: [
        { q: 'Type I error is also called:', options: ['False negative','False positive','True positive','True negative'], correct: 1, explanation: 'Rejecting true H₀ = false positive' },
        { q: 'P(Type I error) =', options: ['β','1-β','α','1-α'], correct: 2, explanation: 'α is the significance level = P(reject H₀ | H₀ true)' }
      ]
    },
    'Type II Error': {
      "explanation": "Failing to reject H₀ when it is false (false negative). Probability = β. Power = 1-β = probability of correctly rejecting false H₀.",
      quizQuestions: [
        { q: 'Type II error is also called:', options: ['False positive','False negative','True positive','True negative'], correct: 1, explanation: 'Failing to reject false H₀ = false negative' },
        { q: 'Power of a test equals:', options: ['α','β','1-β','1-α'], correct: 2, explanation: 'Power = probability of detecting an effect = 1-β' }
      ]
    }
  },

  // === CORRELATION & REGRESSION ===
  'correlation-regression': {
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
  },

  // === BAYESIAN INFERENCE ===
  'bayesian-inference': {
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
    'Credible Interval': {
      explanation: 'Bayesian counterpart to confidence interval. E.g., 95% CrI means P(parameter ∈ interval | data) = 0.95.',
      quizQuestions: [
        { q: '95% CrI means:', options: ['95% of data inside','P(param in interval|data)=0.95','Interval contains 95% of samples','Confidence level'], correct: 1, explanation: 'Direct probability statement about parameter' },
        { q: 'CrI vs CI: which allows P(param in interval)?', options: ['CI','CrI','Both','Neither'], correct: 1, explanation: 'Bayesian CrI gives direct probability; frequentist CI does not' }
      ]
    }
  },

  // === ANOVA & DESIGN ===
  'anova-design': {
    'One-Way ANOVA': {
      explanation: 'Compares means across 3+ groups. Tests if at least one group mean differs. F = between-group variance / within-group variance.',
      formula: 'F = MS_between / MS_within',
      quizQuestions: [
        { q: 'ANOVA compares:', options: ['Two means','Three or more means','Variances only','Medians'], correct: 1, explanation: 'ANOVA = ANalysis Of VAriance across groups' },
        { q: 'Large F statistic suggests:', options: ['Groups are similar','Between-group variance dominates','Small sample sizes','Equal variances'], correct: 1, explanation: 'Large F = between-group differences are significant' }
      ]
    },
    'F-Statistic': {
      explanation: 'Ratio of model variance to error variance. F > critical value → reject null (at least one group differs).',
      quizQuestions: [
        { q: 'F = 1 suggests:', options: ['Strong differences','No differences','Small sample','Large effect'], correct: 1, explanation: 'F≈1 means between ≈ within → no group differences' },
        { q: 'F-test assumes:', options: ['Normality, equal variance','Only normality','Only equal variance','No assumptions'], correct: 0, explanation: 'Both normality and homogeneity of variance' }
      ]
    },
    'Post-Hoc Tests': {
      explanation: 'After significant ANOVA, determine which specific groups differ. Controls for multiple comparisons (alpha inflation).',
      quizQuestions: [
        { q: 'Post-hoc is needed because:', options: ['ANOVA is not enough','Multiple comparison problem','Small sample','Large variance'], correct: 1, explanation: 'Multiple tests inflate Type I error rate' },
        { q: 'Tukey HSD controls:', options: ['Type II error','Family-wise error rate','Sample size','Effect size'], correct: 1, explanation: 'Tukey controls overall error across all pairwise tests' }
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
    }
  }
};

export default statisticsConceptDetails;
