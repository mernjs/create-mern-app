import { exportImages, exportImagesEvents } from 'pdf-export-images'

// Export via promise
exportImages('./sample.pdf', 'extracted_images')
  .then(images => console.log('Exported', images.length, 'images'))
  .catch(console.error)

// Export via EventEmitter
exportImagesEvents('./sample.pdf', 'extracted_images')
  .on('load', event => console.log('Exporting images from', event.pageCount, 'pages...'))
  .on('image', ({ file, width, height }) => console.log(file, `(${width}x${height})`))
  .on('error', console.error)
  .on('done', images => console.log(images.length, 'images exported'))