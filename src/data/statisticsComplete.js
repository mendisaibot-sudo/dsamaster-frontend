export const statisticsTopics = [
  {
    id: 'descriptive-statistics',
    name: 'Descriptive Statistics',
    icon: 'FaChartBar',
    color: 'from-blue-400 to-indigo-500',
    category: 'Statistics',
    description: 'Descriptive statistics involves methods for organizing, summarizing, and presenting data in a clear and informative way. It provides simple summaries about the sample and the measures, forming the foundation of quantitative data analysis.',
    concepts: [
      'Measures of Central Tendency: Mean, Median, Mode',
      'Measures of Dispersion: Range, Variance, Standard Deviation',
      'Percentiles and Quartiles',
      'Frequency Distributions and Histograms',
      'Skewness and Kurtosis',
      'Box Plots and Five-Number Summary',
      'Covariance and Correlation',
      'Data Types: Nominal, Ordinal, Interval, Ratio'
    ],
    formulas: [
      {
        name: 'Arithmetic Mean',
        formula: 'x̄ = (Σxi) / n',
        description: 'The sum of all values divided by the number of values. Most common measure of central tendency.'
      },
      {
        name: 'Standard Deviation',
        formula: 'σ = √(Σ(xi - μ)² / N)',
        description: 'Measures the amount of variation or dispersion in a set of values.'
      },
      {
        name: 'Variance',
        formula: 's² = Σ(xi - x̄)² / (n - 1)',
        description: 'The average of squared differences from the mean. Sample variance uses n-1.'
      },
      {
        name: 'Z-Score',
        formula: 'z = (x - μ) / σ',
        description: 'Standardizes a value by measuring how many standard deviations from the mean.'
      },
      {
        name: 'Pearson Correlation',
        formula: 'r = Σ[(xi - x̄)(yi - ȳ)] / √[Σ(xi - x̄)² Σ(yi - ȳ)²]',
        description: 'Measures linear correlation between two variables, ranging from -1 to +1.'
      }
    ],
    examples: [
      {
        title: 'Calculating Central Tendency and Spread',
        problem: 'Given exam scores: [85, 92, 78, 88, 95, 72, 90, 88, 84, 91]. Calculate mean, median, mode, range, variance, and standard deviation.',
        solution: 'Mean = 86.3, Median = 88, Mode = 88, Range = 23, Variance = 45.34, Std Dev = 6.73. The data is slightly left-skewed since mean < median.',
        code: `import numpy as np
from scipy import stats

# Exam scores data
data = [85, 92, 78, 88, 95, 72, 90, 88, 84, 91]

# Central tendency
mean = np.mean(data)
median = np.median(data)
mode = stats.mode(data, keepdims=True)[0][0]

# Dispersion
variance = np.var(data, ddof=1)
std_dev = np.std(data, ddof=1)
range_val = np.max(data) - np.min(data)

print(f"Mean: {mean:.2f}")
print(f"Median: {median}")
print(f"Mode: {mode}")
print(f"Range: {range_val}")
print(f"Variance: {variance:.2f}")
print(f"Standard Deviation: {std_dev:.2f}")

# Five-number summary
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
print(f"Q1: {q1}, Q3: {q3}")
print(f"IQR: {q3 - q1}")`
      },
      {
        title: 'Correlation Analysis',
        problem: 'Analyze the relationship between study hours and exam scores for 10 students.',
        solution: 'The Pearson correlation coefficient r ≈ 0.987, indicating a very strong positive linear relationship.',
        code: `import numpy as np
import matplotlib.pyplot as plt

study_hours = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
scores = [65, 70, 72, 78, 85, 88, 90, 92, 95, 98]

# Calculate Pearson correlation
correlation = np.corrcoef(study_hours, scores)[0, 1]
print(f"Pearson Correlation: {correlation:.4f}")

# Linear regression line (slope and intercept)
coeffs = np.polyfit(study_hours, scores, 1)
slope, intercept = coeffs
print(f"Regression line: y = {slope:.2f}x + {intercept:.2f}")

# Predict score for 6.5 hours
predicted = slope * 6.5 + intercept
print(f"Predicted score for 6.5 hours: {predicted:.2f}")

# Visualization
plt.scatter(study_hours, scores, color='blue', label='Data points')
plt.plot(study_hours, np.polyval(coeffs, study_hours), 'r-', label=f'R²={correlation**2:.4f}')
plt.xlabel('Study Hours')
plt.ylabel('Exam Score')
plt.title('Study Hours vs Exam Scores')
plt.legend()
plt.grid(True)
plt.show()`
      }
    ],
    applications: [
      {
        title: 'Business Analytics',
        description: 'Companies use descriptive statistics to summarize sales data, customer behavior patterns, and financial performance metrics for executive dashboards.'
      },
      {
        title: 'Educational Assessment',
        description: 'Schools and universities analyze student performance distributions, grade curves, and standardized test scores to evaluate teaching effectiveness.'
      },
      {
        title: 'Healthcare Research',
        description: 'Medical researchers summarize patient demographics, clinical measurements, and treatment outcomes to identify patterns in health data.'
      },
      {
        title: 'Quality Control',
        description: 'Manufacturing industries use control charts and process capability analysis to monitor product quality and detect anomalies in production.'
      }
    ],
    codeExamples: [
      {
        language: 'python',
        code: `import pandas as pd
import numpy as np

# Create a sample dataset
data = {
    'Age': [25, 30, 35, 40, 45, 50, 28, 33, 38, 42],
    'Salary': [50000, 60000, 75000, 90000, 110000, 120000, 55000, 68000, 82000, 95000],
    'Experience': [2, 5, 8, 12, 15, 20, 3, 6, 10, 14]
}
df = pd.DataFrame(data)

# Comprehensive descriptive statistics
print("=== Descriptive Statistics ===")
print(df.describe())

# Additional statistics
print("\n=== Advanced Stats ===")
print(f"Skewness:\n{df.skew()}")
print(f"\nKurtosis:\n{df.kurtosis()}")

# Correlation matrix
print("\n=== Correlation Matrix ===")
print(df.corr())

# Detect outliers using IQR method for Salary
Q1 = df['Salary'].quantile(0.25)
Q3 = df['Salary'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['Salary'] < Q1 - 1.5*IQR) | (df['Salary'] > Q3 + 1.5*IQR)]
print(f"\nOutliers in Salary: {len(outliers)} found")`,
        explanation: 'This example demonstrates comprehensive descriptive statistics using pandas and numpy, including measures of central tendency, dispersion, skewness, kurtosis, correlation analysis, and outlier detection using the IQR method.'
      },
      {
        language: 'python',
        code: `import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

# Generate sample data from different distributions
np.random.seed(42)
normal_data = np.random.normal(100, 15, 1000)
skewed_data = np.random.exponential(2, 1000)

# Calculate descriptive statistics for normal data
print("=== Normal Distribution Stats ===")
print(f"Mean: {np.mean(normal_data):.2f}")
print(f"Median: {np.median(normal_data):.2f}")
print(f"Std Dev: {np.std(normal_data):.2f}")
print(f"Skewness: {stats.skew(normal_data):.4f}")
print(f"Kurtosis: {stats.kurtosis(normal_data):.4f}")

# Visualization
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Histogram with normal curve
axes[0, 0].hist(normal_data, bins=30, density=True, alpha=0.7, color='skyblue', edgecolor='black')
mu, sigma = np.mean(normal_data), np.std(normal_data)
x = np.linspace(mu - 4*sigma, mu + 4*sigma, 100)
axes[0, 0].plot(x, stats.norm.pdf(x, mu, sigma), 'r-', linewidth=2, label=f'N({mu:.1f}, {sigma:.1f}²)')
axes[0, 0].set_title('Normal Distribution')
axes[0, 0].legend()

# Box plot
axes[0, 1].boxplot(normal_data, vert=True)
axes[0, 1].set_title('Box Plot')

# Q-Q plot
stats.probplot(normal_data, dist="norm", plot=axes[1, 0])
axes[1, 0].set_title('Q-Q Plot (Normality Test)')

# Comparison: normal vs skewed data
axes[1, 1].hist(normal_data, bins=30, alpha=0.5, label='Normal', density=True)
axes[1, 1].hist(skewed_data, bins=30, alpha=0.5, label='Skewed', density=True)
axes[1, 1].
