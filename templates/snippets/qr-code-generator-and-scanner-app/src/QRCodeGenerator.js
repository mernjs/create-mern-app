import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

const QRWithOverlay = ({ qrText, overlayImageUrl, onDownload }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrCanvas = canvasRef.current;

        const qrCodeDataURL = await QRCode.toDataURL(qrText, {
          errorCorrectionLevel: 'H',
          width: 400,
        });

        const qrImage = new Image();
        qrImage.crossOrigin = 'anonymous';
        qrImage.src = qrCodeDataURL;

        const overlayImage = new Image();
        overlayImage.crossOrigin = 'anonymous';
        overlayImage.src = overlayImageUrl;

        await Promise.all([
          new Promise((resolve) => (qrImage.onload = resolve)),
          new Promise((resolve) => (overlayImage.onload = resolve)),
        ]);

        const ctx = qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        ctx.drawImage(qrImage, 0, 0, 400, 400);

        const overlaySize = 100;
        const x = (400 - overlaySize) / 2;
        const y = (400 - overlaySize) / 2;
        ctx.drawImage(overlayImage, x, y, overlaySize, overlaySize);
      } catch (err) {
        console.log('Error generating QR code', err);
      }
    };

    generateQRCode();
  }, [qrText, overlayImageUrl]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL("image/png");
    onDownload(imageUrl);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4">
      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        className="border-4 border-gray-300 rounded-xl shadow-xl transition-transform transform hover:scale-105 duration-300"
      ></canvas>

      <button
        onClick={handleDownload}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 focus:outline-none transition-all duration-200"
      >
        Download QR Code
      </button>
    </div>
  );
};

const QRCodeGenerator = () => {
  const [qrText, setQrText] = useState('');
  const [overlayImageUrl, setOverlayImageUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qrText) return;
    setSubmitted(true);
  };

  const handleDownload = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'qr_code.png';
    link.click();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row space-y-8 md:space-y-0">

        <div className="w-full md:w-1/2 p-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-6">
            QR Code Generator
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="qrText" className="block text-sm font-medium text-gray-700">
                URL (or Text)
              </label>
              <input
                type="text"
                id="qrText"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Enter URL or text"
                required
              />
            </div>

            <div>
              <label htmlFor="overlayImageUrl" className="block text-sm font-medium text-gray-700">
                Logo Image URL
              </label>
              <input
                type="text"
                id="overlayImageUrl"
                value={overlayImageUrl}
                onChange={(e) => setOverlayImageUrl(e.target.value)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Enter logo image URL"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none transition-all duration-200"
              >
                Generate QR Code
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
          {submitted && qrText ? (
            <QRWithOverlay
              qrText={qrText}
              overlayImageUrl={
                overlayImageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'
              }
              onDownload={handleDownload}
            />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img
                src="https://cdn.dayschedule.com/img/qr-placeholder.webp"
                alt="QR Code Placeholder"
                className="w-40 h-40 mb-6 rounded-lg shadow-xl"
              />
              <p className="text-lg text-gray-500 text-center">Please enter the URL to generate the QR code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
