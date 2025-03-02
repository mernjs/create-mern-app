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
        className="border-4 border-gray-300 rounded-lg shadow-lg"
      ></canvas>

      <button
        onClick={handleDownload}
        className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 focus:outline-none"
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
            QR Code Generator
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="qrText" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="text"
                id="qrText"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter URL"
                required
              />
            </div>

            <div>
              <label htmlFor="overlayImageUrl" className="block text-sm font-medium text-gray-700">
                Logo Image URL
              </label>
              <input
                type="text"
                id="logoImageUrl"
                value={overlayImageUrl}
                onChange={(e) => setOverlayImageUrl(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter logo image URL"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 focus:outline-none"
              >
                Generate QR Code
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 p-4 flex justify-center items-center mt-8 md:mt-0">
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
                className="w-32 h-32 mb-4"
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
