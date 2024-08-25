const tf = require('@tensorflow/tfjs-node');
const { Canvas, Image } = require('canvas');
const fs = require('fs');
const cocoSsd = require('@tensorflow-models/coco-ssd');

async function loadModel() {
  const model = await cocoSsd.load();
  return model;
}

async function detectObjects(imagePath) {
  const model = await loadModel();

  const imageBuffer = fs.readFileSync(imagePath);
  const image = new Image();
  image.src = imageBuffer;

  const canvas = new Canvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);

  const imageTensor = tf.browser.fromPixels(canvas);

  const predictions = await model.detect(imageTensor);

  console.log(`Detected objects: ${predictions.length}`);

  predictions.forEach((prediction, i) => {
    console.log(`Object ${i + 1}:`);
    console.log(`Class: ${prediction.class}`);
    console.log(`Score: ${prediction.score}`);
    console.log(`Bounding Box: ${prediction.bbox}`);
  });
}

detectObjects('./images4.jpg');
