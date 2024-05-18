// predict.js

// Function to load and preprocess image
async function preprocessImage(imageFile) {
    const image = await loadImage(imageFile);
    const processedImage = tf.browser.fromPixels(image).resizeNearestNeighbor([64, 64]).toFloat();
    return processedImage.div(255).expandDims();
}

// Function to make predictions using the trained model
async function predictGender(imageFile) {
    const model = await tf.loadLayersModel('downloads://gender_model');
    const processedImage = await preprocessImage(imageFile);
    const prediction = model.predict(processedImage);
    const gender = prediction.argMax(1).dataSync()[0] === 0 ? 'Male' : 'Female';
    console.log('Predicted gender:', gender);
}

// Example usage
const imageInput = document.getElementById('image-input');

imageInput.addEventListener('change', async function(event) {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
        await predictGender(selectedImage);
    } else {
        console.error('No image selected.');
    }
});
