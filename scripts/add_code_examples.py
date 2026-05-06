import re

with open('src/data/statistics.js', 'r') as f:
    content = f.read()

code_examples = {
    'probability-theory': {
        'language': 'python',
        'title': 'Bayesian Probability Calculation',
        'code': "# Medical Test Paradox - Bayes' Theorem\nP_disease = 0.01  # Prior probability\nP_pos_given_disease = 0.95  # Test sensitivity\nP_pos_given_no_disease = 0.05  # False positive rate\n\n# Calculate total probability of positive test\nP_pos = P_pos_given_disease * P_disease + P_pos_given_no_disease * (1 - P_disease)\n\n# Bayes' Theorem: P(Disease | Positive)\nP_disease_given_pos = (P_pos_given_disease * P_disease) / P_pos\n\nprint(f\"P(Disease | Positive Test) = {P_disease_given_pos:.3f}\")\nprint(\"Despite positive test, only 16.1% chance of actually having the disease!\")"
    },
    'probability-distributions': {
        'language': 'python',
        'title': 'Normal, Binomial, Poisson Distributions',
        'code': "import numpy as np\nfrom scipy import stats\n\n# Normal Distribution - IQ Scores\nmu, sigma = 100, 15\nP_85_115 = stats.norm.cdf(115, mu, sigma) - stats.norm.cdf(85, mu, sigma)\nprint(f\"P(85 < IQ < 115) = {P_85_115:.2%}\")\n\n# Binomial - Coin flips\nn, p = 10, 0.5\nbinom_pmf = stats.binom.pmf(5, n, p)\nprint(f\"P(exactly 5 heads in 10 flips) = {binom_pmf:.4f}\")\n\n# Poisson - Events per hour\nlambda_rate = 4\npoisson_pmf = stats.poisson.pmf(2, lambda_rate)\nprint(f\"P(exactly 2 events) = {poisson_pmf:.4f}\")"
    },
    'sampling-clt': {
        'language': 'python',
        'title': 'Central Limit Theorem Demo',
        'code': "import numpy as np\n\n# Generate samples from non-normal distribution (uniform)\npopulation = np.random.uniform(0, 100, size=100000)\nprint(f\"Population mean: {population.mean():.1f}\")\n\n# Draw many samples of size n=30 and compute means\nsample_means = [np.random.choice(population, size=30).mean() for _ in range(1000)]\n\nprint(f\"Mean of sample means: {np.mean(sample_means):.1f}\")\nprint(f\"Std of sample means: {np.std(sample_means):.2f}\")\nprint(\"Sample means follow Normal distribution (CLT)!\")"
    },
    'confidence-intervals': {
        'language': 'python',
        'title': 'Confidence Intervals',
        'code': "import numpy as np\nfrom scipy import stats\n\nsample = [22, 25, 28, 24, 26, 23, 27, 25, 24, 26, 25, 28, 23, 24, 27]\nn = len(sample)\nx_bar = np.mean(sample)\ns = np.std(sample, ddof=1)\n\nt_critical = stats.t.ppf(0.975, df=n-1)\nmargin_error = t_critical * (s / np.sqrt(n))\n\nprint(f\"Sample mean: {x_bar:.2f}\")\nprint(f\"95% CI: [{x_bar - margin_error:.2f}, {x_bar + margin_error:.2f}]\")"
    },
    'hypothesis-testing': {
        'language': 'python',
        'title': 'One-Sample t-Test',
        'code': "import numpy as np\nfrom scipy import stats\n\n# Test if population mean is 25\nsample = [27, 23, 29, 26, 24, 28, 25, 27, 26, 24]\nmu_0 = 25\n\nt_stat, p_value = stats.ttest_1samp(sample, mu_0)\n\nprint(f\"Sample mean: {np.mean(sample):.2f}\")\nprint(f\"t-statistic: {t_stat:.3f}\")\nprint(f\"p-value: {p_value:.3f}\")\n\nif p_value < 0.05:\n    print(\"Reject H0: Mean is significantly different from 25\")\nelse:\n    print(\"Fail to reject H0: No significant difference from 25\")"
    },
    'correlation-regression': {
        'language': 'python',
        'title': 'Linear Regression with Scikit-Learn',
        'code': "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\n# Study hours vs Exam scores\nX = np.array([[2], [3], [4], [5], [6]])\ny = np.array([65, 72, 78, 85, 88])\n\nmodel = LinearRegression().fit(X, y)\n\nprint(f\"Slope (b): {model.coef_[0]:.2f}\")\nprint(f\"Intercept (a): {model.intercept_:.2f}\")\nprint(f\"Score = {model.intercept_:.2f} + {model.coef_[0]:.2f} * hours\")\nprint(f\"R2 Score: {model.score(X, y):.4f}\")\n\n# Predict for 4.5 hours\nprint(f\"Predicted score for 4.5h: {model.predict([[4.5]])[0]:.1f}\")"
    },
    'covariance-matrix': {
        'language': 'python',
        'title': 'Covariance and Correlation Matrix',
        'code': "import numpy as np\n\n# Portfolio returns: Stocks vs Bonds\nstocks = np.array([5, -2, 8, 1, 3, -1, 6]) / 100\nbonds = np.array([3, 2, 4, 2, 3, 1, 3]) / 100\n\ndata = np.column_stack([stocks, bonds])\ncov_matrix = np.cov(data, rowvar=False, ddof=1)\ncorr_matrix = np.corrcoef(stocks, bonds)\n\nprint(\"Covariance Matrix:\")\nprint(cov_matrix)\nprint(\"\\nCorrelation Matrix:\")\nprint(corr_matrix)\nprint(f\"\\nCorrelation between stocks and bonds: {corr_matrix[0,1]:.3f}\")\nprint(\"Negative correlation = diversification benefit!\")"
    }
}

for topic_id, example in code_examples.items():
    # Find all occurrences of visualType in the file
    # We need to insert codeExamples before the } that closes each topic
    # A simpler approach: for each topic_id, find its visualType line and replace
    pattern = rf"(id: '{re.escape(topic_id)}'.*?visualType: '[^']+',)(\n\s*}})"

    def replacer(m):
        code_block = (
            m.group(1) +
            "\n    codeExamples: [\n"
            f"      {{ language: 'python', title: '{example['title']}', code: `{example['code']}` }}\n"
            "    ]" +
            m.group(2)
        )
        return code_block

    content_new = re.sub(pattern, replacer, content, flags=re.DOTALL)
    if content_new != content:
        content = content_new
        print(f"Added codeExamples to {topic_id}")
    else:
        print(f"WARNING: Could not find pattern for {topic_id}")

with open('src/data/statistics.js', 'w') as f:
    f.write(content)

print("Done!")
