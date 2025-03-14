
// https://docs.aspose.com/pdf/nodejs-cpp/extract-images-from-the-pdf-file/#:~:text=In%20case%20you%20want%20to,js.
const AsposePdf = require('asposepdfnodejs');
const pdf_file = './SampleFileWithImage.pdf';
AsposePdf().then(AsposePdfModule => {
    /*Extract image from a PDF-file with template "ResultPdfExtractImage{0:D2}.jpg" ({0}, {0:D2}, {0:D3}, ... format page number), resolution 150 DPI and save*/
    const json = AsposePdfModule.AsposePdfExtractImage(pdf_file, "ResultPdfExtractImage{0:D2}.jpg", 150);
    console.log("AsposePdfExtractImage => %O", json.errorCode == 0 ? json.filesNameResult : json.errorText);
});
