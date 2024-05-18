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
console.log("{ images, labels };", { images, labels })
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
            return img.resizeNearestNeighbor([IMAGE_WIDTH, IMAGE_HEIGHT]).toFloat().div(255); // Normalize
        }));

        return images;
    } catch (err) {
        console.error('Error loading images:', err);
        throw err;
    }
}

// Function to shuffle and split data into training and validation sets
function shuffleAndSplit(images, labels, splitRatio) {
    const indices = tf.util.createShuffledIndices(images.length);
    const numTrain = Math.floor(splitRatio * images.length);

    // Convert Uint32Array to an array
    const indicesArray = Array.from(indices);

    // Convert array to a TensorFlow tensor with shape [length] and dtype 'int32'
    const indicesTensor = tf.tensor(indicesArray, [indicesArray.length], 'int32');

    // Ensure that indicesTensor is explicitly cast to 'int32'
    const indicesTensorInt32 = indicesTensor.toInt(); 

    const xs = tf.gather(images, indicesTensorInt32.slice(0, numTrain));
    const xsVal = tf.gather(images, indicesTensorInt32.slice(numTrain));
    const ysTrain = tf.gather(labels, indicesTensorInt32.slice(0, numTrain));
    const ysVal = tf.gather(labels, indicesTensorInt32.slice(numTrain));

    return { xs, xsVal, ysTrain, ysVal };
}


// Function to define and train the model
async function trainModel() {
    const model = tf.sequential();
    model.add(tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 3],
        kernelSize: 3,
        filters: 16,
        activation: 'relu'
    }));
    model.add(tf.layers.maxPooling2d({ poolSize: 2 }));
    model.add(tf.layers.flatten());
    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dropout(0.5)); // Dropout for regularization
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

    // Shuffle and split data into training and validation sets
    const { xs, xsVal, ysTrain, ysVal } = shuffleAndSplit(images, ys, 0.8);

    // Train the model
    await model.fit(xs, ysTrain, {
        epochs: 10,
        batchSize: 32,
        validationData: [xsVal, ysVal],
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
