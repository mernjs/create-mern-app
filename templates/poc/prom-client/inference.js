// inference.js

const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Function to load the saved model
async function loadModel() {
    const modelPath = 'file://gender-deduction/model.json';  // Update this path
    const loadedModel = await tf.loadLayersModel(modelPath);
    console.log('Model loaded successfully.');
    return loadedModel;
}

// Function to preprocess input data (adjust based on your data preprocessing)
function preprocessInput(data) {
    // Your preprocessing logic here
    // Load the image from file
    const imageBuffer = fs.readFileSync(data);
    const img = tf.node.decodeImage(imageBuffer, 3); // 3 channels (RGB)

    // Resize the image to match the expected input size
    const resizedImg = img.resizeNearestNeighbor([64, 64]).toFloat().div(255);

    // Expand dimensions to add a batch size of 1
    const expandedImg = resizedImg.expandDims(0);

    // Dispose of the original image tensor to free up memory
    img.dispose();

    return expandedImg;
}



// Function to make predictions using the loaded model
// async function predict(inputData) {
//     const loadedModel = await loadModel();
//     const inputTensor = preprocessInput(inputData);

//     // Perform inference
//     const predictions = loadedModel.predict(inputTensor);
//     const genderPrediction = predictions.argMax(1).dataSync()[0] === 0 ? 'Male' : 'Female';
//     console.log(`Predicted Gender: ${predictions}`);
// }

// Function to make predictions using the loaded model
async function predict(inputData) {
    const loadedModel = await loadModel();
    const inputTensor = preprocessInput(inputData);

    // Perform inference
    const predictions = loadedModel.predict(inputTensor);

    // Extract numeric values from the tensor
    const predictedValues = predictions.arraySync();

    // Apply threshold to obtain binary predictions (0 or 1)
    const binaryPrediction = predictedValues[0][0] >= 0.5 ? 1 : 0;

    // Log or use the binary prediction as needed
    console.log(`Predicted Gender (Binary): ${binaryPrediction === 0 ? 'Male' : 'Female'}`);

    // Clean up resources
    inputTensor.dispose();
    predictions.dispose();

    console.log('Prediction complete.');
}

// Example usage
const inputData = "dataset/test6.jpeg";

// Run the prediction
predict(inputData);
