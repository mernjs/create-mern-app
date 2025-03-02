import { useRef, useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [qrText, setQrText] = useState('');
  const [overlayImageUrl, setOverlayImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    if (!qrText) return;
    
    setIsLoading(true);

    try {
      const qrCanvas = canvasRef.current;
      const ctx = qrCanvas.getContext('2d');
      ctx.clearRect(0, 0, 400, 400);

      // Generate QR code
      const qrCodeDataURL = await QRCode.toDataURL(qrText, {
        errorCorrectionLevel: 'H',
        width: 400,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });

      // Draw QR code
      const qrImage = new Image();
      qrImage.src = qrCodeDataURL;
      await new Promise((resolve) => {
        qrImage.onload = () => {
          ctx.drawImage(qrImage, 0, 0, 400, 400);
          resolve();
        };
      });

      // If overlay image URL is provided, draw it
      if (overlayImageUrl) {
        const overlayImage = new Image();
        overlayImage.crossOrigin = 'anonymous';
        overlayImage.src = overlayImageUrl;
        
        await new Promise((resolve, reject) => {
          overlayImage.onload = () => {
            const overlaySize = 100;
            const x = (400 - overlaySize) / 2;
            const y = (400 - overlaySize) / 2;
            
            // Draw white background circle
            ctx.beginPath();
            ctx.arc(x + overlaySize/2, y + overlaySize/2, overlaySize/2, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
            
            // Draw the overlay image
            ctx.drawImage(overlayImage, x, y, overlaySize, overlaySize);
            resolve();
          };
          overlayImage.onerror = () => reject(new Error('Failed to load overlay image'));
        });
      }
    } catch (err) {
      console.log('Failed to generate QR code. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'custom-qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg m-5">
      <div className="w-full md:w-1/2 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Custom QR Code Generator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL or Text Content
              </label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter URL or text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo Image URL (optional)
              </label>
              <input
                type="text"
                value={overlayImageUrl}
                onChange={(e) => setOverlayImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter logo image URL"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={generateQRCode}
                disabled={!qrText || isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
              
              <button
                onClick={handleDownload}
                disabled={!qrText || isLoading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-white rounded-lg shadow-md p-4">
          <canvas
            ref={canvasRef}
            width="400"
            height="400"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;