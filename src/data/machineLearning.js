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
    visualType: 'classification'
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
    visualType: 'regression'
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
    visualType: 'classification'
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
    visualType: 'tree'
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
    visualType: 'classification'
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
    visualType: 'scatter'
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
    visualType: 'scatter'
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
    visualType: 'scatter'
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
    visualType: 'network'
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
    visualType: 'fitting'
  }
];

export default mlTopics;