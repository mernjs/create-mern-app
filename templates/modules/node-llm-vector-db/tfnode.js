import tf from '@tensorflow/tfjs-node'

// Define and train the model
async function trainModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1], units: 1, activation: 'linear'}));
    model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});

    const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
    const ys = tf.tensor2d([[2], [4], [6], [8]], [4, 1]);

    await model.fit(xs, ys, {epochs: 1000});

    // Save the model
    await model.save('file://./saved_model');
}

// Train the model and save it
trainModel().then(() => console.log('Model trained and saved.'));
