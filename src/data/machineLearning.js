export const mlTopics = [
  {
    id: 'ml-overview',
    name: 'Machine Learning Overview',
    icon: 'FaBrain',
    color: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    category: 'Fundamentals',
    description: 'Types of ML: Supervised, Unsupervised, Reinforcement Learning and the ML pipeline.',
    details: 'Machine Learning enables computers to learn patterns from data without explicit programming. Supervised learning uses labeled data, unsupervised finds hidden patterns, reinforcement learns through trial and error with rewards.',
    concepts: ['Supervised Learning','Unsupervised Learning','Reinforcement','Features','Labels','Train/Test Split'],
    formulas: [
      { name: 'Accuracy', code: 'Accuracy = (TP+TN)/(TP+TN+FP+FN)', text: 'Proportion correct' },
      { name: 'Precision', code: 'Precision = TP/(TP+FP)', text: 'Of predicted positive, how many are' },
      { name: 'Recall', code: 'Recall = TP/(TP+FN)', text: 'Of actual positive, how many predicted' }
    ],
    examples: [
      { title: 'Spam Detection', steps: ['Supervised: emails labeled spam/not-spam','Extract features: words, sender, links','Train classifier on training set','Evaluate on test set'], result: '91% accuracy on unseen emails' }
    ],
    applications: ['Image recognition','Speech recognition','Recommendations','Autonomous vehicles'],
    visualType: 'classification',
    codeExamples: [
      {
        language: 'python',
        title: 'Train/Test Split and Accuracy',
        code: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score

# Example: simple 2D classification data
X = np.array([[1, 2], [2, 3], [3, 4], [6, 7], [7, 8], [8, 9]])
y = np.array([0, 0, 0, 1, 1, 1])

# Train/test split (80/20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)
predictions = model.predict(X_test)

print(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")
print(f"Precision: {precision_score(y_test, predictions):.2f}")
print(f"Recall: {recall_score(y_test, predictions):.2f}")`
      }
    ]
  },
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    icon: 'FaChartArea',
    color: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
    category: 'Supervised',
    description: 'Predict continuous values by fitting a line to minimize error.',
    details: 'Linear regression models relationship between input features and continuous target. Uses cost function (MSE) and gradient descent to find optimal weights.',
    concepts: ['Hypothesis','Cost Function','Gradient Descent','Learning Rate','Normal Equation'],
    formulas: [
      { name: 'Hypothesis', code: 'h(x) = θ0 + θ1*x1 + θ2*x2 + ...', text: 'Linear combination of features' },
      { name: 'MSE Cost', code: 'J(θ) = (1/2m)*Σ(h(x^i)-y^i)^2', text: 'Mean squared error' },
      { name: 'Gradient Update', code: 'θj := θj - α * ∂J/∂θj', text: 'Update rule' }
    ],
    examples: [
      { title: 'House Price Prediction', steps: ['Features: sqft, bedrooms, location','Collect training data with actual prices','Fit line: Price = 50k + 200*sqft + 10k*bedrooms','Predict: 1500 sqft, 3 bed = USD 380k'], result: 'R^2 = 0.87 on test set' }
    ],
    applications: ['Price prediction','Demand forecasting','Risk assessment','Sales prediction'],
    visualType: 'regression',
    codeExamples: [
      {
        language: 'python',
        title: 'Linear Regression with sklearn',
        code: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# House size (sqft) vs price ($1000s)
X = np.array([[1000], [1500], [2000], [2500], [3000], [3500]])
y = np.array([200, 280, 350, 420, 500, 580])

model = LinearRegression()
model.fit(X, y)

print(f"Intercept: {model.intercept_:.2f}")
print(f"Slope: {model.coef_[0]:.3f}")
print(f"R2 Score: {r2_score(y, model.predict(X)):.3f}")

# Predict price for 1800 sqft
predicted = model.predict([[1800]])
print(f"Predicted price for 1800 sqft: ${predicted[0]:,.0f}k")`
      }
    ]
  },
  {
    id: 'logistic-regression',
    name: 'Logistic Regression',
    icon: 'FaRobot',
    color: 'linear-gradient(135deg, #10b981, #34d399)',
    category: 'Supervised',
    description: 'Binary classification using sigmoid function and decision boundary.',
    details: 'Despite the name, logistic regression is for classification. Uses sigmoid to squash output to 0-1 probability range. Decision boundary separates classes.',
    concepts: ['Sigmoid','Decision Boundary','Log Loss','Odds Ratio','Maximum Likelihood'],
    formulas: [
      { name: 'Sigmoid', code: 'σ(z) = 1/(1+e^(-z))', text: 'Maps any value to 0-1' },
      { name: 'Hypothesis', code: 'h(x) = σ(θ^T * x)', text: 'Probability of class 1' },
      { name: 'Log Loss', code: 'J(θ) = -(1/m)*Σ[y*log(h)+(1-y)*log(1-h)]', text: 'Cost for classification' }
    ],
    examples: [
      { title: 'Will Customer Churn?', steps: ['Collect: usage, tenure, complaints','Train logistic regression','Prediction: P(churn)=0.73 for customer X','Threshold at 0.5: predict churn'], result: '82% accuracy, 75% precision on churn prediction' }
    ],
    applications: ['Medical diagnosis','Credit scoring','Customer churn','Ad click prediction'],
    visualType: 'classification',
    codeExamples: [
      {
        language: 'python',
        title: 'Logistic Regression for Binary Classification',
        code: `import numpy as np
from sklearn.linear_model import LogisticRegression

# Credit score and income vs loan approval
X = np.array([[650, 40000], [720, 60000], [580, 30000],
              [800, 90000], [610, 35000], [750, 70000]])
y = np.array([0, 1, 0, 1, 0, 1])  # 0=reject, 1=approve

model = LogisticRegression()
model.fit(X, y)

# Predict for a new applicant
new_applicant = np.array([[700, 55000]])
prob = model.predict_proba(new_applicant)[0][1]
pred = model.predict(new_applicant)[0]

print(f"Approval probability: {prob:.3f}")
print(f"Decision: {'Approve' if pred == 1 else 'Reject'}")`
      }
    ]
  },
  {
    id: 'decision-trees',
    name: 'Decision Trees & Random Forests',
    icon: 'FaTree',
    color: 'linear-gradient(135deg, #22c55e, #4ade80)',
    category: 'Supervised',
    description: 'Tree-based models for classification and regression with ensemble methods.',
    details: 'Decision trees split data based on feature values to create rules. Random forests combine multiple trees via bagging to reduce overfitting and improve accuracy.',
    concepts: ['Entropy','Information Gain','Gini Impurity','Pruning','Bagging','Voting'],
    formulas: [
      { name: 'Entropy', code: 'H(S) = -Σ p_i * log2(p_i)', text: 'Measure of impurity' },
      { name: 'Information Gain', code: 'IG = H(parent) - Σ(|S_j|/|S|)*H(S_j)', text: 'Reduction in entropy after split' },
      { name: 'Gini', code: 'Gini = 1 - Σ p_i^2', text: 'Alternative impurity measure' }
    ],
    examples: [
      { title: 'Loan Approval', steps: ['Root: Income > 50k?','Left: Yes -> Credit score > 700?','Right: No -> Years employed > 2?','Leaf: Approve (85%) or Reject (72%)'], result: 'Random forest: 94% accuracy vs 89% single tree' }
    ],
    applications: ['Credit scoring','Medical diagnosis','Fraud detection','Feature selection'],
    visualType: 'tree',
    codeExamples: [
      {
        language: 'python',
        title: 'Decision Tree and Random Forest',
        code: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Iris-like dataset (2 features, 2 classes)
X = np.array([[1, 2], [1.5, 1.8], [5, 8], [6, 9], [1, 0.6], [9, 11]])
y = np.array([0, 0, 1, 1, 0, 1])

# Single Decision Tree
dt = DecisionTreeClassifier(max_depth=3, random_state=42)
dt.fit(X, y)
print(f"Decision Tree Accuracy: {accuracy_score(y, dt.predict(X)):.2f}")

# Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X, y)
print(f"Random Forest Accuracy: {accuracy_score(y, rf.predict(X)):.2f}")`
      }
    ]
  },
  {
    id: 'svm',
    name: 'Support Vector Machines',
    icon: 'FaBuffer',
    color: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    category: 'Supervised',
    description: 'Find the optimal hyperplane that maximally separates classes.',
    details: 'SVM finds the best separating boundary (hyperplane) by maximizing the margin between classes. Support vectors are the critical data points. Kernels transform non-linear data into linearly separable spaces.',
    concepts: ['Hyperplane','Margin','Support Vectors','Kernel Trick','Soft Margin','C Parameter'],
    formulas: [
      { name: 'Hyperplane', code: 'w^T*x + b = 0', text: 'Decision boundary equation' },
      { name: 'Margin', code: 'Margin = 2/||w||', text: 'Distance between support vectors' },
      { name: 'RBF Kernel', code: 'K(x,y) = exp(-γ||x-y||^2)', text: 'Maps to infinite dimensions' }
    ],
    examples: [
      { title: 'Cancer Classification', steps: ['Features: cell size, shape, texture','Linear SVM: separate benign/malignant','Only support vectors define boundary','Non-linear: RBF kernel for complex shapes'], result: '96% accuracy on Wisconsin breast cancer dataset' }
    ],
    applications: ['Text classification','Image recognition','Bioinformatics','Handwriting recognition'],
    visualType: 'classification',
    codeExamples: [
      {
        language: 'python',
        title: 'SVM with Kernel Trick',
        code: `import numpy as np
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Non-linearly separable data
X = np.array([[0, 0], [1, 1], [1, 0], [0, 1], [2, 2], [2, 3], [3, 2], [3, 3]])
y = np.array([0, 0, 1, 1, 1, 1, 0, 0])

# Linear SVM
linear_svm = SVC(kernel='linear')
linear_svm.fit(X, y)
print(f"Linear SVM Accuracy: {accuracy_score(y, linear_svm.predict(X)):.2f}")

# RBF Kernel SVM
rbf_svm = SVC(kernel='rbf', gamma='scale')
rbf_svm.fit(X, y)
print(f"RBF SVM Accuracy: {accuracy_score(y, rbf_svm.predict(X)):.2f}")`
      }
    ]
  },
  {
    id: 'knn',
    name: 'K-Nearest Neighbors',
    icon: 'FaPeopleArrows',
    color: 'linear-gradient(135deg, #14b8a6, #2dd4bf)',
    category: 'Supervised',
    description: 'Classify based on the majority class among k closest training examples.',
    details: 'KNN is a lazy learner - no training required. Classify new points by finding k nearest neighbors in feature space. Distance metrics: Euclidean, Manhattan, Minkowski.',
    concepts: ['Lazy Learning','Distance Metrics','Euclidean Distance','K Selection','Voting','Feature Scaling'],
    formulas: [
      { name: 'Euclidean', code: 'd(x,y) = √(Σ(x_i - y_i)^2)', text: 'Straight-line distance' },
      { name: 'Manhattan', code: 'd(x,y) = Σ|x_i - y_i|', text: 'Grid-based distance' }
    ],
    examples: [
      { title: 'Fruit Classification', steps: ['Features: weight, color intensity, diameter','New fruit: [150g, 0.8, 7cm]','Find 5 nearest neighbors','3 are apples, 2 are oranges'], result: 'Classify as Apple (3/5 majority vote)' }
    ],
    applications: ['Recommendation systems','Image recognition','Medical diagnosis','Anomaly detection'],
    visualType: 'scatter',
    codeExamples: [
      {
        language: 'python',
        title: 'K-Nearest Neighbors',
        code: `import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler

# Fruit classification: weight, color_intensity
X = np.array([[150, 0.8], [170, 0.9], [130, 0.7],
              [300, 0.3], [320, 0.2], [280, 0.4]])
y = np.array([0, 0, 0, 1, 1, 1])

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_scaled, y)

# Classify new fruit
new_fruit = scaler.transform(np.array([[160, 0.85]]))
pred = knn.predict(new_fruit)[0]
print(f"Predicted: {'Apple' if pred == 0 else 'Orange'}")`
      }
    ]
  },
  {
    id: 'kmeans',
    name: 'K-Means Clustering',
    icon: 'FaProjectDiagram',
    color: 'linear-gradient(135deg, #a855f7, #c084fc)',
    category: 'Unsupervised',
    description: 'Partition data into K clusters by minimizing within-cluster variance.',
    details: 'K-Means iteratively assigns points to nearest centroid, then updates centroids. Simple but effective for discovering natural groups in data. Requires specifying K.',
    concepts: ['Centroids','Cluster Assignment','Update Step','Elbow Method','Inertia','Silhouette Score'],
    formulas: [
      { name: 'Centroid Update', code: 'μ_k = (1/|C_k|) * Σ x_i', text: 'Mean of points in cluster k' },
      { name: 'Inertia', code: 'Σ Σ ||x - μ_k||^2', text: 'Sum of squared distances to centroid' }
    ],
    examples: [
      { title: 'Customer Segmentation', steps: ['Features: annual income, spending score','Set K=5 (elbow method)','Assign each customer to nearest centroid','Update centroids, repeat until convergence'], result: '5 distinct customer segments identified for targeted marketing' }
    ],
    applications: ['Customer segmentation','Image compression','Document clustering','Anomaly detection'],
    visualType: 'scatter',
    codeExamples: [
      {
        language: 'python',
        title: 'K-Means Clustering',
        code: `import numpy as np
from sklearn.cluster import KMeans

# Customer data: annual income, spending score
X = np.array([[15, 39], [15, 81], [16, 6], [16, 77],
              [17, 40], [17, 76], [18, 6], [18, 94],
              [19, 3], [19, 72], [19, 14], [19, 99],
              [20, 15], [20, 77], [20, 13], [20, 79],
              [21, 35], [21, 66], [23, 29], [23, 98]])

kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
kmeans.fit(X)

print(f"Cluster centers:
{kmeans.cluster_centers_}")
print(f"Inertia (within-cluster SSE): {kmeans.inertia_:.2f}")

# Predict cluster for new customer
new_customer = np.array([[22, 50]])
cluster = kmeans.predict(new_customer)[0]
print(f"New customer belongs to cluster: {cluster}")`
      }
    ]
  },
  {
    id: 'pca',
    name: 'Principal Component Analysis',
    icon: 'FaCompressArrowsAlt',
    color: 'linear-gradient(135deg, #e11d48, #fb7185)',
    category: 'Unsupervised',
    description: 'Reduce dimensionality while preserving maximum variance.',
    details: 'PCA finds directions (principal components) of maximum variance. Projects data onto fewer dimensions while keeping most information. Uses eigenvectors of covariance matrix.',
    concepts: ['Eigenvectors','Eigenvalues','Variance Preservation','Dimensionality Reduction','Principal Components'],
    formulas: [
      { name: 'PCA Step', code: 'Cov(X) = (1/n)*X^T*X', text: 'Compute covariance matrix' },
      { name: 'Eigen Decomposition', code: 'Cov*v = λ*v', text: 'Find eigenvectors and eigenvalues' },
      { name: 'Projection', code: 'Z = X * W_k', text: 'Project onto top k components' }
    ],
    examples: [
      { title: 'Iris Dataset (4D to 2D)', steps: ['4 features: sepal/petal length/width','Compute covariance matrix','Top 2 eigenvectors explain 95% variance','Project: 4D -> 2D, still separable!'], result: '2 components preserve 95% variance, visualization possible' }
    ],
    applications: ['Data visualization','Noise reduction','Feature extraction','Image processing'],
    visualType: 'scatter',
    codeExamples: [
      {
        language: 'python',
        title: 'PCA Dimensionality Reduction',
        code: `import numpy as np
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# 4D data: sepal length, sepal width, petal length, petal width
X = np.array([[5.1, 3.5, 1.4, 0.2],
              [4.9, 3.0, 1.4, 0.2],
              [6.2, 3.4, 5.4, 2.3],
              [5.9, 3.0, 5.1, 1.8]])

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
print(f"Total variance explained: {sum(pca.explained_variance_ratio_):.3f}")
print(f"Original shape: {X.shape}, Reduced shape: {X_pca.shape}")`
      }
    ]
  },
  {
    id: 'neural-networks',
    name: 'Neural Networks',
    icon: 'FaNetworkWired',
    color: 'linear-gradient(135deg, #ef4444, #f87171)',
    category: 'Deep Learning',
    description: 'Layers of interconnected neurons for complex pattern recognition.',
    details: 'Neural networks consist of input, hidden, and output layers. Each neuron applies weights and activation function. Backpropagation adjusts weights to minimize error.',
    concepts: ['Perceptron','Activation Functions','Backpropagation','Hidden Layers','Weights','Biases'],
    formulas: [
      { name: 'Neuron', code: 'z = Σ w_i*x_i + b, a = g(z)', text: 'Weighted sum + activation' },
      { name: 'ReLU', code: 'g(z) = max(0, z)', text: 'Most common activation' },
      { name: 'Sigmoid Der', code: "g'(z) = g(z)*(1-g(z))", text: 'Derivative for backprop' }
    ],
    examples: [
      { title: 'MNIST Digit Recognition', steps: ['Input: 28x28 pixel image (784 features)','Hidden layer: 128 neurons with ReLU','Output: 10 neurons (digits 0-9)','Softmax for probabilities'], result: '98.5% accuracy on test set' }
    ],
    applications: ['Image recognition','NLP','Speech recognition','Game playing'],
    visualType: 'network',
    codeExamples: [
      {
        language: 'python',
        title: 'Neural Network with Keras',
        code: `import numpy as np
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler

# XOR problem
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([0, 1, 1, 0])

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Multi-layer perceptron
mlp = MLPClassifier(hidden_layer_sizes=(4,), activation='relu',
                    max_iter=1000, random_state=42)
mlp.fit(X_scaled, y)

predictions = mlp.predict(X_scaled)
print(f"Predictions: {predictions}")
print(f"Accuracy: {np.mean(predictions == y):.2f}")
print(f"Weights shape: {mlp.coefs_[0].shape}")`
      }
    ]
  },
  {
    id: 'overfitting-validation',
    name: 'Overfitting & Validation',
    icon: 'FaBalanceScale',
    color: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
    category: 'Model Evaluation',
    description: 'Prevent overfitting with train/test split, cross-validation, and regularization.',
    details: 'Overfitting: model memorizes training data but fails on new data. Solutions: more data, simpler model, regularization (L1/L2), dropout, early stopping, cross-validation.',
    concepts: ['Overfitting','Underfitting','Cross-Validation','Regularization','Bias-Variance Tradeoff'],
    formulas: [
      { name: 'L2 Regularization', code: 'J(θ) = MSE + λ*Σθ_j^2', text: 'Ridge: penalizes large weights' },
      { name: 'L1 Regularization', code: 'J(θ) = MSE + λ*Σ|θ_j|', text: 'Lasso: encourages sparse weights' },
      { name: 'CV Score', code: 'CV = (1/k)*Σ MSE_i', text: 'Average across k folds' }
    ],
    examples: [
      { title: 'Degree 10 Polynomial', steps: ['Training: 10 points, degree 10 polynomial','Training error: 0% (perfect fit!)','Test error: 45% (terrible generalization)','Solution: reduce to degree 3, test error: 12%'], result: 'Degree 3 generalizes best' }
    ],
    applications: ['Model selection','Hyperparameter tuning','Feature selection','Ensemble methods'],
    visualType: 'fitting',
    codeExamples: [
      {
        language: 'python',
        title: 'Cross-Validation and Regularization',
        code: `import numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import cross_val_score

# Generate synthetic data with noise
np.random.seed(42)
X = np.random.randn(100, 5)
true_coef = np.array([2, -1, 0, 0, 0.5])
y = X @ true_coef + np.random.randn(100) * 0.5

# Ridge regression with cross-validation
ridge = Ridge(alpha=1.0)
scores = cross_val_score(ridge, X, y, cv=5, scoring='neg_mean_squared_error')

print(f"CV MSE: {-np.mean(scores):.3f}")

ridge.fit(X, y)
print(f"Ridge coefficients: {ridge.coef_}")
print(f"L2 penalty shrinks coefficients toward zero")`
      }
    ]
  }
];

export default mlTopics;