// QRWithOverlay.js
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRWithOverlay = ({ qrText, overlayImageUrl }) => {
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
        qrImage.src = qrCodeDataURL;

        const overlayImage = new Image();
        overlayImage.src = overlayImageUrl;

        // Wait for both images to load
        await Promise.all([
          new Promise((resolve) => (qrImage.onload = resolve)),
          new Promise((resolve) => (overlayImage.onload = resolve)),
        ]);

        const ctx = qrCanvas.getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        ctx.drawImage(qrImage, 0, 0, 400, 400);

        // Resize the overlay image to 100x100 pixels
        const overlaySize = 100;
        const x = (400 - overlaySize) / 2;
        const y = (400 - overlaySize) / 2;
        ctx.drawImage(
          overlayImage,
          x,
          y,
          overlaySize,
          overlaySize
        );
      } catch (err) {
        console.log('Error generating QR code', err);
      }
    };

    generateQRCode();
  }, [qrText, overlayImageUrl]);

  return (
    <div className="flex justify-center items-center py-4">
      <canvas ref={canvasRef} width="400" height="400" className="border-4 border-gray-300 rounded-lg shadow-lg"></canvas>
    </div>
  );
};

const QRCodeGenerator = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          QR Code Generator
        </h2>
        <QRWithOverlay
          qrText="http://localhost:3000/video"
          overlayImageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
