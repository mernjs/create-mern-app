# Machine Learning 

---

## 1. What is Machine Learning, in simple terms?

**Answer**
Machine Learning is about writing systems that learn patterns from data instead of hard-coded rules.

**Practical explanation**
Instead of saying “if user clicks X then do Y”, you train a model on past data and let it make predictions on new data.

**Real-world example**
Spam detection learns from past emails instead of manually writing rules for every spam pattern.

---

## 2. What is the difference between supervised and unsupervised learning?

**Answer**
Supervised learning uses labeled data.
Unsupervised learning works with unlabeled data.

**Practical explanation**

* Supervised: input + correct output
* Unsupervised: only input, no ground truth

**Real-world example**

* Supervised: predicting house prices
* Unsupervised: customer segmentation based on behavior

---

## 3. How do you decide which ML algorithm to use?

**Answer**
I start with the problem type, data size, and constraints like explainability and latency.

**Practical explanation**

* Small/medium data → simpler models
* Large data → more flexible models
* Need explainability → linear or tree-based models
* Need high accuracy → ensembles or boosting

**Interview tip**
Interviewers care more about **how you think** than the exact algorithm.

---

## 4. What is overfitting and how do you handle it?

**Answer**
Overfitting happens when a model learns noise instead of the real pattern.

**How to handle it**

* Use more data
* Add regularization
* Reduce model complexity
* Use cross-validation

**Real-world example**
A model that performs great on training data but fails badly in production.

---

## 5. What is the train, validation, and test split?

**Answer**
They serve different purposes:

* Train: learn parameters
* Validation: tune hyperparameters
* Test: final unbiased evaluation

**Practical explanation**
Never touch the test set until the very end.

**Red flag**
Using test data for tuning is a common interview mistake.

---

## 6. How do you evaluate a classification model?

**Answer**
Accuracy alone is not enough. I look at metrics based on the problem.

**Common metrics**

* Precision
* Recall
* F1-score
* ROC-AUC

**Real-world example**
In fraud detection, false negatives are worse than false positives, so recall matters more.

---

## 7. What is feature engineering and why is it important?

**Answer**
Feature engineering is converting raw data into meaningful inputs for the model.

**Why it matters**
Good features often matter more than the algorithm.

**Examples**

* Date → day of week
* Text → word counts or embeddings
* Logs → aggregated behavior metrics

---

## 8. What happens when you deploy an ML model to production?

**Answer**
Deployment is just the start. Monitoring is critical.

**Key production concerns**

* Data drift
* Model performance decay
* Latency
* Retraining strategy

**Interview insight**
Mentioning monitoring shows real-world experience.

---

## 9. How is ML different from traditional backend logic?

**Answer**
ML is probabilistic, backend logic is deterministic.

**Practical difference**

* Backend code: same input → same output
* ML model: same input → probability-based output

**Production implication**
You must handle uncertainty and failure cases explicitly.

---

## 10. What are common mistakes beginners make in ML?

**Answer**

* Using complex models too early
* Ignoring data quality
* Evaluating on the wrong metric
* Training once and never retraining

**Strong closing statement for interviews**
“Most ML problems fail because of data and monitoring, not algorithms.”

---

## 11. How do you handle missing data in Machine Learning?

**Answer**
It depends on why the data is missing and how much is missing.

**Common approaches**

* Drop rows if missing data is small and random
* Fill with mean/median for numerical data
* Use mode or “unknown” category for categorical data
* Sometimes missing itself is a useful signal

**Interview insight**
Always explain *why* you chose a method. Blindly filling values is a red flag.

---

## 12. What is the difference between classification and regression?

**Answer**
Classification predicts categories.
Regression predicts continuous values.

**Examples**

* Classification: spam vs not spam
* Regression: predicting delivery time in minutes

**Interview tip**
Mention output type and evaluation metrics to sound practical.

---

## 13. What is bias–variance tradeoff?

**Answer**
It’s the balance between underfitting and overfitting.

**Simple explanation**

* High bias → model too simple
* High variance → model too complex

**How engineers deal with it**

* Add data
* Tune regularization
* Adjust model complexity

---

## 14. What is regularization and why do we need it?

**Answer**
Regularization prevents the model from fitting noise.

**Practical explanation**
It penalizes large weights so the model stays simple.

**Real-world intuition**
It’s like telling the model: “Don’t be too confident unless the data strongly supports it.”

---

## 15. How do you choose evaluation metrics?

**Answer**
Metrics should reflect business impact, not convenience.

**Examples**

* Fraud detection → recall
* Search ranking → precision@k
* Imbalanced data → F1-score or ROC-AUC

**Interview insight**
Interviewers want to see alignment between ML metrics and product goals.

---

## 16. What is data leakage? Why is it dangerous?

**Answer**
Data leakage happens when future or unintended information leaks into training.

**Examples**

* Using future timestamps
* Aggregating data incorrectly
* Preprocessing before train-test split

**Why it’s dangerous**
The model looks great in testing but fails in production.

---

## 17. How do you debug a poorly performing ML model?

**Answer**
I debug ML models like systems, not math problems.

**Step-by-step approach**

1. Check data quality
2. Verify labels
3. Inspect feature distributions
4. Compare train vs test performance
5. Start with a simple baseline

**Strong interview line**
“If a simple model fails, a complex one won’t help.”

---

## 18. What is model drift and how do you handle it?

**Answer**
Model drift happens when real-world data changes over time.

**Types**

* Data drift → input distribution changes
* Concept drift → target relationship changes

**How to handle**

* Monitor metrics continuously
* Retrain periodically
* Set alerts on feature distribution shifts

---

## 19. How do you explain ML predictions to non-technical stakeholders?

**Answer**
I avoid model internals and focus on impact and trends.

**Practical approach**

* Use simple feature importance
* Show before/after comparisons
* Explain confidence, not certainty

**Interview insight**
Explainability is often more important than accuracy in real products.

---

## 20. What does a typical ML pipeline look like?

**Answer**
A production ML pipeline is more than training a model.

**Typical flow**

1. Data collection
2. Cleaning and validation
3. Feature engineering
4. Training
5. Evaluation
6. Deployment
7. Monitoring and retraining

**Real-world takeaway**
Most effort is spent before and after model training.

---

## 21. What ML skills matter most for software engineers?

**Answer**

* Understanding data, not just algorithms
* Writing clean, testable ML code
* Monitoring and debugging models
* Integrating ML into backend systems

**Interview-ready statement**
“ML in production is mostly engineering, not modeling.”

---

## 22. When should you NOT use Machine Learning?

**Answer**
When rules are clear, stable, and explainable.

**Examples**

* Simple business logic
* Regulatory-heavy decisions
* Low data availability

**Strong closing line**
“If a rule-based system works, ML is unnecessary complexity.”