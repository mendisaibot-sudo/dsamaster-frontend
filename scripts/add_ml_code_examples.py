import re

with open('src/data/machineLearning.js', 'r') as f:
    content = f.read()

code_examples = {
    'ml-overview': {
        'title': 'Train/Test Split and Basic Evaluation',
        'code': "from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score, precision_score, recall_score\nimport numpy as np\n\n# Generate sample data\nX = np.random.randn(100, 5)\ny = (X[:, 0] + X[:, 1] > 0).astype(int)\n\n# Train/Test Split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = LogisticRegression().fit(X_train, y_train)\ny_pred = model.predict(X_test)\n\nprint(f\"Accuracy: {accuracy_score(y_test, y_pred):.2f}\")\nprint(f\"Precision: {precision_score(y_test, y_pred):.2f}\")\nprint(f\"Recall: {recall_score(y_test, y_pred):.2f}\")"
    },
    'linear-regression': {
        'title': 'Linear Regression with Scikit-Learn',
        'code': "from sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nimport numpy as np\n\n# Generate data: y = 3x + 5\nX = np.random.rand(100, 1) * 10\ny = 3 * X.squeeze() + 5 + np.random.randn(100)\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = LinearRegression().fit(X_train, y_train)\n\nprint(f\"Coef: {model.coef_[0]:.3f} (true: 3.000)\")\nprint(f\"Intercept: {model.intercept_:.3f} (true: 5.000)\")\nprint(f\"R2 Score: {model.score(X_test, y_test):.4f}\")\nprint(f\"Prediction for x=7: {model.predict([[7]])[0]:.2f}\")"
    },
    'logistic-regression': {
        'title': 'Logistic Regression for Binary Classification',
        'code': "from sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\n\n# Generate binary classification data\nX, y = make_classification(n_samples=200, n_features=4, n_classes=2, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nmodel = LogisticRegression(max_iter=200).fit(X_train, y_train)\n\nprint(f\"Accuracy: {model.score(X_test, y_test):.2f}\")\nprobs = model.predict_proba(X_test[:1])[0]\nprint(f\"P(class 0)={probs[0]:.3f}, P(class 1)={probs[1]:.3f}\")"
    },
    'decision-trees': {
        'title': 'Decision Trees and Random Forest',
        'code': "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\n\nX, y = make_classification(n_samples=300, n_features=5, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\ntree = DecisionTreeClassifier(max_depth=5).fit(X_train, y_train)\nprint(f\"Decision Tree Accuracy: {tree.score(X_test, y_test):.2f}\")\n\nrf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X_train, y_train)\nprint(f\"Random Forest Accuracy: {rf.score(X_test, y_test):.2f}\")\n\nfor i, imp in enumerate(rf.feature_importances_):\n    print(f\"Feature {i}: {imp:.3f}\")"
    },
    'svm': {
        'title': 'Support Vector Machine with Kernel',
        'code': "from sklearn.svm import SVC\nfrom sklearn.datasets import make_moons\nfrom sklearn.model_selection import train_test_split\n\n# Non-linear data\nX, y = make_moons(n_samples=200, noise=0.2, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nlinear_svm = SVC(kernel='linear').fit(X_train, y_train)\nprint(f\"Linear SVM Accuracy: {linear_svm.score(X_test, y_test):.2f}\")\n\nrbf_svm = SVC(kernel='rbf', gamma='scale').fit(X_train, y_train)\nprint(f\"RBF SVM Accuracy: {rbf_svm.score(X_test, y_test):.2f}\")\nprint(\"Kernel trick handles non-linear boundaries!\")"
    },
    'knn': {
        'title': 'K-Nearest Neighbors Classification',
        'code': "from sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\n\nX, y = make_classification(n_samples=200, n_features=4, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nscaler = StandardScaler()\nX_train_s = scaler.fit_transform(X_train)\nX_test_s = scaler.transform(X_test)\n\nfor k in [3, 5, 7, 10]:\n    knn = KNeighborsClassifier(n_neighbors=k).fit(X_train_s, y_train)\n    acc = knn.score(X_test_s, y_test)\n    print(f\"K={k}: Accuracy={acc:.2f}\")"
    },
    'kmeans': {
        'title': 'K-Means Clustering',
        'code': "from sklearn.cluster import KMeans\nfrom sklearn.datasets import make_blobs\n\n# Generate 3 clusters\nX, _ = make_blobs(n_samples=300, centers=3, cluster_std=1.0, random_state=42)\n\n# Elbow method\nfor k in [2, 3, 4, 5]:\n    km = KMeans(n_clusters=k, random_state=42, n_init=10).fit(X)\n    print(f\"K={k}: Inertia={km.inertia_:.1f}\")\n\nkm = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X)\nprint(f\"\\nK=3 cluster centers:\")\nprint(km.cluster_centers_)"
    },
    'pca': {
        'title': 'PCA Dimensionality Reduction',
        'code': "from sklearn.decomposition import PCA\nfrom sklearn.datasets import load_iris\n\niris = load_iris()\nX = iris.data\n\npca = PCA().fit(X)\nprint(\"Explained Variance Ratio:\")\nfor i, ratio in enumerate(pca.explained_variance_ratio_):\n    print(f\"  PC{i+1}: {ratio:.3f}\")\n\npca2 = PCA(n_components=2)\nX_2d = pca2.fit_transform(X)\nprint(f\"\\nOriginal shape: {X.shape}\")\nprint(f\"Reduced shape: {X_2d.shape}\")\nprint(f\"Variance preserved: {sum(pca2.explained_variance_ratio_):.1%}\")"
    },
    'neural-networks': {
        'title': 'Simple Neural Network with Keras',
        'code': "from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Dense\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = make_classification(n_samples=500, n_features=10, n_classes=2, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test)\n\nmodel = Sequential([\n    Dense(32, activation='relu', input_shape=(10,)),\n    Dense(16, activation='relu'),\n    Dense(1, activation='sigmoid')\n])\n\nmodel.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])\nmodel.fit(X_train, y_train, epochs=10, batch_size=32, verbose=0)\nloss, acc = model.evaluate(X_test, y_test, verbose=0)\nprint(f\"Test Accuracy: {acc:.2f}\")"
    },
    'overfitting-validation': {
        'title': 'Cross-Validation and Regularization',
        'code': "from sklearn.linear_model import Ridge, Lasso\nfrom sklearn.model_selection import cross_val_score, train_test_split\nfrom sklearn.preprocessing import PolynomialFeatures\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.datasets import make_regression\nimport numpy as np\n\nX, y = make_regression(n_samples=100, n_features=1, noise=20, random_state=42)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# L2 Regularization (Ridge)\nridge = make_pipeline(PolynomialFeatures(degree=5), Ridge(alpha=1.0))\nridge.fit(X_train, y_train)\nprint(f\"Ridge R2: {ridge.score(X_test, y_test):.3f}\")\n\n# L1 Regularization (Lasso)\nlasso = make_pipeline(PolynomialFeatures(degree=5), Lasso(alpha=1.0, max_iter=10000))\nlasso.fit(X_train, y_train)\nprint(f\"Lasso R2: {lasso.score(X_test, y_test):.3f}\")\n\n# Cross
