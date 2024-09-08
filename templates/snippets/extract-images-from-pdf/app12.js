
// import AsposePdf from 'asposepdfnodejs';
// const AsposePdfModule = await AsposePdf();
// const pdf_file = './sample.pdf';
// /*Extract image from a PDF-file with template "ResultPdfExtractImage{0:D2}.jpg" ({0}, {0:D2}, {0:D3}, ... format page number), resolution 150 DPI and save*/
// const json = AsposePdfModule.AsposePdfExtractImage(pdf_file, "ResultPdfExtractImage{0:D2}.jpg", 150);
// console.log("AsposePdfExtractImage => %O",  json);
// import AsposePdf from 'asposepdfnodejs';

// const checkAvailableMethods = async () => {
//     const AsposePdfModule = await AsposePdf();
//     console.log(JSON.stringify(Object.keys(AsposePdfModule)));
// };

// checkAvailableMethods();



// import AsposePdf from 'asposepdfnodejs';

// const extractImagesFromPdf = async (pdfFilePath) => {
//     const AsposePdfModule = await AsposePdf();
//     const pdf_file = pdfFilePath;
//     const resolution = 150; // DPI for the images
//     const outputTemplate = "ResultPdfExtractImage{0:D2}.jpg"; // Output file name pattern

//     // Extract images from all pages in the PDF
//     try {
//         const result = await AsposePdfModule.AsposePdfExtractImage(pdf_file, outputTemplate, resolution);
//         console.log("Extracted images:", result);
//     } catch (error) {
//         console.error("Error extracting images:", error);
//     }
// };

// import AsposePdf from 'asposepdfnodejs';

// const extractAllImagesFromPdf = async (pdfFilePath) => {
//     const AsposePdfModule = await AsposePdf();
//     const pdf_file = pdfFilePath;
//     const outputTemplate = "ResultPdfExtractImage{0:D32}.jpg"; // Output file name pattern
//     const resolution = 150; // DPI for the images

//     try {
//         // Extract images from all pages
//         const result = await AsposePdfModule.AsposePdfExtractImage(pdf_file, outputTemplate, resolution);
//         console.log("Extracted images:", result);
//     } catch (error) {
//         console.error("Error extracting images:", error);
//     }
// };

// extractAllImagesFromPdf('./sample.pdf');



// import AsposePdf from 'asposepdfnodejs';

// const extractImagesFromPdf = async (pdfFilePath, template, dpi) => {
//     const AsposePdfModule = await AsposePdf();
//     const pdf_file = pdfFilePath;
//     const outputTemplate = template; // e.g., "ResultPdfExtractImage{0:D2}.jpg"
//     const resolution = dpi; // e.g., 150 DPI

//     try {
//         // Extract images from the PDF
//         const json = await AsposePdfModule.AsposePdfExtractImage(pdf_file, outputTemplate, resolution);
//         if (json.errorCode === 0) {
//             console.log("Extracted images:", json.filesNameResult);
//         } else {
//             console.error("Error extracting images:", json.errorText);
//         }
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };

// // Example Usage:
// extractImagesFromPdf('./sample.pdf', 'ResultPdfExtractImage{0:D2}.jpg', 150);
// extractImagesFromPdf('./sample.pdf', 'Page{0:D3}.png', 150);
// extractImagesFromPdf('./sample.pdf', 'ExtractedPage{0:D1}.jpg', 150);



import AsposePdf from 'asposepdfnodejs';

const extractAllImagesFromPdf = async (pdfFilePath, outputTemplate, dpi) => {
    try {
        const AsposePdfModule = await AsposePdf();
        const pdf_file = pdfFilePath;
        const resolution = dpi; // DPI for the images

        // Extract images from the PDF
        const json = await AsposePdfModule.AsposePdfExtractImage(pdf_file, outputTemplate, resolution);
        
        // Check for errors
        if (json.errorCode === 0) {
            console.log("Extracted images:", json.filesNameResult);
        } else {
            console.error("Error extracting images:", json.errorText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

// Example Usage:
extractAllImagesFromPdf('./sample.pdf', 'ExtractedImage_{0:D2}.jpg', 150); // For two-digit page numbers
extractAllImagesFromPdf('./sample.pdf', 'ExtractedImage_{0:D3}.jpg', 150); // For three-digit page numbers
extractAllImagesFromPdf('./sample.pdf', 'ExtractedImage_{0:D1}.jpg', 150); // For single-digit page numbers
