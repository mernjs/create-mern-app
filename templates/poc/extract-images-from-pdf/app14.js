import EventEmitter from 'node:events'
import Path from 'node:path'
import { getDocument, OPS } from 'pdfjs-dist'
import sharp from 'sharp'


// https://www.youtube.com/watch?v=h_mgJgZWEj8
// https://docs.aspose.com/pdf/nodejs-cpp/extract-images-from-the-pdf-file/

/**
 * Extracts images from a PDF and emits events for progress and results.
 * @param {string} src - Path to the source PDF file.
 * @param {string} [dst='.'] - Directory to save extracted images.
 * @returns {EventEmitter} EventEmitter with `done`, `error`, `load`, and `image` events.
 */
 function exportImagesEvents(src, dst = '.') {
  const ee = new EventEmitter()

  getDocument(src).promise
    .then(doc => processDoc(doc, dst, ee))
    .catch(error => ee.emit('error', error))

  return ee
}

/**
 * Extracts images from a PDF and returns a promise that resolves when done.
 * @param {string} src - Path to the source PDF file.
 * @param {string} [dst='.'] - Directory to save extracted images.
 * @returns {Promise<Array>} Promise resolving to an array of extracted images.
 */
 async function exportImages(src, dst = '.') {
  return new Promise((resolve, reject) => {
    exportImagesEvents(src, dst)
      .on('done', images => resolve(images))
      .on('error', error => reject(error))
  })
}

/**
 * Processes the PDF document to extract images and emit events.
 * @param {PDFDocumentProxy} doc - PDF document.
 * @param {string} dst - Directory to save extracted images.
 * @param {EventEmitter} ee - EventEmitter for emitting events.
 */
async function processDoc(doc, dst, ee) {
  const pageCount = doc.numPages // `doc.numPages` is a more standard way to get page count
  ee.emit('load', { pageCount })
  const images = []

  for (let p = 1; p <= pageCount; p++) {
    const page = await doc.getPage(p)
    const ops = await page.getOperatorList()

    for (let i = 0; i < ops.fnArray.length; i++) {
      try {
        if (ops.fnArray[i] === OPS.paintImageXObject || ops.fnArray[i] === OPS.paintInlineImageXObject) {
          const name = `page_${p}_img_${i}`  // Generate unique name for each image
          const img = await (page.commonObjs.has(ops.argsArray[i][0])
            ? page.commonObjs.get(ops.argsArray[i][0])
            : page.objs.get(ops.argsArray[i][0])
          )
          const { width, height, kind, data } = img
          const bytes = data.length
          const channels = bytes / (width * height)
          if (![1, 2, 3, 4].includes(channels)) {
            throw new Error(`Invalid image channel count: ${channels}`)
          }
          const file = Path.join(dst, `${name}.png`)
          await sharp(data, {
            raw: { width, height, channels }
          }).toFile(file)

          const event = { name, kind, width, height, channels, bytes, file }
          ee.emit('image', event)
          images.push(event)
        }
      } catch (error) {
        ee.emit('error', error)
      }
    }
  }
  ee.emit('done', images)
}


exportImages('./sample.pdf', 'extracted_images')
  .then(images => {
    console.log('Extracted images:', images)
  })
  .catch(error => {
    console.error('Error extracting images:', error)
  })
