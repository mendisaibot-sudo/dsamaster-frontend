export const mlConceptDetails = {
  'ml-overview': {
    'Supervised Learning': {
      explanation: "Models learn from labeled data (input-output pairs). Goal: predict labels for new data.",
      quizQuestions: [
        { q: "Supervised learning requires:", options: ["Labeled data", "Unlabeled data", "No data", "Rules only"], correct: 0, explanation: "Supervised = input-output pairs for training" },
        { q: "Spam detection is:", options: ["Regression", "Classification", "Clustering", "Reinforcement"], correct: 1, explanation: "Predicts categorical label: spam or not" }
      ]
    },
    'Unsupervised Learning': {
      explanation: "Models discover hidden patterns in unlabeled data. Examples: clustering, dimensionality reduction.",
      quizQuestions: [
        { q: "Unsupervised learning uses:", options: ["Labeled data", "Unlabeled data", "Rules only", "Test data"], correct: 1, explanation: "No labels — finds structure automatically" },
        { q: "K-Means is a type of:", options: ["Classification", "Clustering", "Regression", "Reinforcement"], correct: 1, explanation: "Groups similar data points together" }
      ]
    },
    'Reinforcement': {
      explanation: "Agent learns by interacting with an environment, receiving rewards or penalties.",
      quizQuestions: [
        { q: "RL optimizes:", options: ["Accuracy", "Cumulative reward", "Loss function", "Label correctness"], correct: 1, explanation: "Maximize long-term reward signal" },
        { q: "In RL, the agent takes:", options: ["Features", "Actions", "Labels", "Gradients"], correct: 1, explanation: "Agent chooses actions in environment" }
      ]
    },
    'Features': {
      explanation: "Input variables used by the model. Feature engineering transforms raw data into informative representations.",
      quizQuestions: [
        { q: "Features are:", options: ["Input variables", "Output labels", "Model weights", "Errors"], correct: 0, explanation: "X variables fed into the model" },
        { q: "Feature engineering improves:", options: ["Model performance", "Training time only", "Label noise", "Dataset size"], correct: 0, explanation: "Better features → better models" }
      ]
    },
    'Labels': {
      explanation: "Target output variable the model predicts. In supervised learning, labels guide training.",
      quizQuestions: [
        { q: "Labels are:", options: ["Input variables", "Target outputs", "Weights", "Errors"], correct: 1, explanation: "y = what we want to predict" },
        { q: "In unsupervised learning, labels are:", options: ["Required", "Not available", "Engineered", "Gradients"], correct: 1, explanation: "No labels — discovers structure automatically" }
      ]
    },
    'Train/Test Split': {
      explanation: "Split data into training set (model learns) and test set (evaluate generalization).",
      quizQuestions: [
        { q: "Purpose of test set:", options: ["Train model", "Evaluate generalization", "Create features", "Normalize data"], correct: 1, explanation: "Measures performance on unseen data" },
        { q: "Typical train/test split:", options: ["50/50", "90/10", "80/20", "60/40"], correct: 2, explanation: "80% train, 20% test is common" }
      ]
    }
  },
  'linear-regression': {
    'Hypothesis': {
      explanation: "The prediction function h(x) = θ₀ + θ₁x₁ + ... + θₙxₙ.",
      formula: "h(x) = θ₀ + θ₁x",
      quizQuestions: [
        { q: "θ₁ represents:", options: ["Y-intercept", "Slope", "Error", "Feature"], correct: 1, explanation: "θ₁ = change in y per unit x" },
        { q: "Simple linear regression has how many features?", options: ["0", "1", "2", "Many"], correct: 1, explanation: "One input feature x" }
      ]
    },
    'Cost Function': {
      explanation: "Measures prediction error. MSE averages squared differences.",
      formula: "J(θ) = (1/2m)·Σ(h(xⁱ)−yⁱ)²",
      quizQuestions: [
        { q: "MSE penalizes:", options: ["Small errors more", "Large errors more", "All equally", "None"], correct: 1, explanation: "Squaring amplifies large errors" },
        { q: "Why divide by 2m?", options: ["Average only", "For easier derivative", "Normalize", "Scale"], correct: 1, explanation: "Cancels the 2 from derivative" }
      ]
    },
    'Gradient Descent': {
      explanation: "Iteratively update parameters to minimize cost. Move in negative gradient direction.",
      formula: "θⱼ := θⱼ − α·∂J/∂θⱼ",
      quizQuestions: [
        { q: "Learning rate too large causes:", options: ["Slow convergence", "Overshooting", "Perfect fit", "Underfitting"], correct: 1, explanation: "Large steps may jump past minimum" },
        { q: "Gradient descent finds:", options: ["Global minimum", "Local minimum", "Maximum", "Random"], correct: 1, explanation: "May get stuck in local minima" }
      ]
    }
  },
  'logistic-regression': {
    'Sigmoid': {
      explanation: "Maps any real value to (0,1), interpreted as probability.",
      formula: "σ(z) = 1 / (1 + e^(-z))",
      quizQuestions: [
        { q: "Sigmoid outputs range:", options: ["(-∞,∞)", "[0,1]", "[-1,1]", "[0,∞)"], correct: 1, explanation: "Squashes to probability range" },
        { q: "At z=0, σ(z)=", options: ["0", "0.5", "1", "Undefined"], correct: 1, explanation: "1/(1+1) = 0.5" }
      ]
    },
    'Decision Boundary': {
      explanation: "Line (or surface) separating predicted classes. Occurs where p=0.5.",
      quizQuestions: [
        { q: "Default decision threshold:", options: ["0", "0.5", "1", "Depends"], correct: 1, explanation: "Default is 0.5, but tunable" },
        { q: "Logistic boundary is:", options: ["Nonlinear", "Linear", "Curved", "Random"], correct: 1, explanation: "Linear in feature space" }
      ]
    }
  }
};

export default mlConceptDetails;
