import fs from 'fs-extra'
import path from 'path'
import mammoth from 'mammoth'

// https://www.youtube.com/watch?v=h_mgJgZWEj8
// https://docs.aspose.com/pdf/nodejs-cpp/extract-images-from-the-pdf-file/

/**
 * Extracts images from a DOCX file and saves them to the specified directory.
 * @param {string} src - Path to the DOCX file.
 * @param {string} dst - Directory to save extracted images.
 */
async function extractImagesFromDocx(src, dst) {
  try {
    // Ensure the destination directory exists
    await fs.ensureDir(dst)

    // Read the DOCX file and extract HTML content and images
    const result = await mammoth.convertToHtml({ path: src })
    console.log("HTML Content Extracted")

    const { value: htmlContent, images } = result

    // Check if images exist in HTML content
    const imgTags = htmlContent.match(/<img[^>]+src="data:image\/[^;]+;base64[^"]*"[^>]*>/g)
    if (!imgTags || imgTags.length === 0) {
      console.log('No images found in the DOCX file.')
      return
    }

    console.log(`Found ${imgTags.length} images in the DOCX file.`)

    // Extract base64 data from img tags
    for (let i = 0; i < imgTags.length; i++) {
      const imgTag = imgTags[i]
      const base64Data = imgTag.match(/data:image\/[^;]+;base64,([^"]*)/)[1]
      const imageData = Buffer.from(base64Data, 'base64')

      // Determine the file extension from the data URL
      const ext = imgTag.match(/data:image\/([^;]+);base64/)[1]
      const fileName = `image_${i + 1}.${ext}`
      const filePath = path.join(dst, fileName)

      // Save the image to the destination directory
      await fs.writeFile(filePath, imageData)

      console.log(`Saved image ${fileName} to ${dst}`)
    }

    console.log('All images have been extracted.')
  } catch (error) {
    console.error('Error extracting images:', error)
  }
}

// Example usage
const docxFile = './sample1.docx'  // Update this with the path to your DOCX file
const outputDir = './docs_images'  // Update this with the path to your output directory

extractImagesFromDocx(docxFile, outputDir)
