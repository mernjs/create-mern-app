import fs from 'fs-extra'
import path from 'path'
import JSZip from 'jszip'

/**
 * Extracts images from a DOCX file and saves them to the specified directory.
 * @param {string} src - Path to the DOCX file.
 * @param {string} dst - Directory to save extracted images.
 */
async function extractImagesFromDocx(src, dst) {
  try {
    // Ensure the destination directory exists
    await fs.ensureDir(dst)

    // Read the DOCX file
    const data = await fs.readFile(src)
    const zip = await JSZip.loadAsync(data)

    // Find all image files in the DOCX archive
    const imageFiles = Object.keys(zip.files).filter(fileName => fileName.startsWith('word/media/'))

    console.log(`Found ${imageFiles.length} images in ${src}`)

    // Process each image
    for (const [index, fileName] of imageFiles.entries()) {
      const fileData = await zip.files[fileName].async('nodebuffer')
      const ext = path.extname(fileName)
      const baseName = path.basename(fileName, ext)
      const newFileName = `image_${index + 1}${ext}`
      const filePath = path.join(dst, newFileName)

      // Save the image to the destination directory
      await fs.writeFile(filePath, fileData)

      console.log(`Saved image ${newFileName} to ${dst}`)
    }

    console.log('All images have been extracted.')
  } catch (error) {
    console.error('Error extracting images:', error)
  }
}

// Example usage
const docxFile = './sample.doc'  // Update this with the path to your DOCX file
const outputDir = './docs_images'  // Update this with the path to your output directory

extractImagesFromDocx(docxFile, outputDir)
