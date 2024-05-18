const tf = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_WIDTH = 64;
const IMAGE_HEIGHT = 64;

// Function to load and preprocess your image dataset
async function loadData() {
    const maleImages = await loadImages('dataset/male');
    const femaleImages = await loadImages('dataset/female');

    // Concatenate male and female images
    const images = [...maleImages, ...femaleImages];

    // Create corresponding labels
    const labels = Array.from({ length: maleImages.length }, () => 0) // 0 for male
        .concat(Array.from({ length: femaleImages.length }, () => 1)); // 1 for female

    console.log("{ images, labels }", { images, labels })
    return { images, labels };
}

// Function to load images from a directory in Node.js
async function loadImages(directory) {
    try {
        const fileNames = await fs.readdir(directory);

        const images = await Promise.all(fileNames.map(async (fileName) => {
            const imagePath = path.join(directory, fileName);
            const imageBuffer = await fs.readFile(imagePath);

            // Assuming the images are JPEG, adjust accordingly
            const img = tf.node.decodeImage(imageBuffer, 3); // 3 channels (RGB)
            return img.resizeNearestNeighbor([IMAGE_WIDTH, IMAGE_HEIGHT]).toFloat();
        }));

        return images;
    } catch (err) {
        console.error('Error loading images:', err);
        throw err;
    }
}

// Function to define and train the model
async function trainModel() {
    const model = tf.sequential();
    model.add(tf.layers.flatten({ inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 3] }));
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
        optimizer: tf.train.adam(),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    // Load and preprocess your image dataset
    const { images, labels } = await loadData();

    // Convert labels to tensors
    const ys = tf.tensor1d(labels);

    // Normalize image data
    const xs = tf.stack(images).div(255);

    // Train the model
    await model.fit(xs, ys, {
        epochs: 10,
        batchSize: 32,
        shuffle: true
    });

    console.log('Training complete');

    return model;
}

// Function to train the model and save it
async function trainModelAndSave() {
    const trainedModel = await trainModel();

    // Save the trained model to a local file path
    const savePath = 'file://gender-deduction';  // Update this path
    await trainedModel.save(savePath);
    console.log('Model saved successfully.');
}

// Call trainModelAndSave() when the script is run
trainModelAndSave();

