import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

const PremiumQRGenerator = () => {
  const [qrText, setQrText] = useState('');
  const [overlayImageUrl, setOverlayImageUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const generateGoldenQRCode = async () => {
    if (!qrText) return;
    
    setIsLoading(true);
    setError('');

    try {
      const qrCanvas = canvasRef.current;
      const ctx = qrCanvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);

      // Create dark background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, 400, 400);

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

      // Apply golden effect to QR code
      const imageData = ctx.getImageData(0, 0, 400, 400);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] === 255) { // If pixel is white
          // Convert to gold
          data[i] = 255; // R
          data[i + 1] = 215; // G
          data[i + 2] = 0; // B
        }
      }
      
      ctx.putImageData(imageData, 0, 0);

      // Add metallic gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 400, 400);
      gradient.addColorStop(0, 'rgba(255, 223, 0, 0.2)');
      gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.1)');
      gradient.addColorStop(1, 'rgba(218, 165, 32, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 400);

      // If overlay image URL is provided, draw it with golden effect
      if (overlayImageUrl) {
        const overlayImage = new Image();
        overlayImage.crossOrigin = 'anonymous';
        overlayImage.src = overlayImageUrl;
        
        await new Promise((resolve, reject) => {
          overlayImage.onload = () => {
            const overlaySize = 120;
            const x = (400 - overlaySize) / 2;
            const y = (400 - overlaySize) / 2;
            
            // Create circular clip for overlay
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + overlaySize/2, y + overlaySize/2, overlaySize/2, 0, Math.PI * 2);
            ctx.clip();

            // Draw golden background circle
            const circleGradient = ctx.createRadialGradient(
              x + overlaySize/2, y + overlaySize/2, 0,
              x + overlaySize/2, y + overlaySize/2, overlaySize/2
            );
            circleGradient.addColorStop(0, '#ffd700');
            circleGradient.addColorStop(1, '#daa520');
            ctx.fillStyle = circleGradient;
            ctx.fill();

            // Draw the overlay image
            ctx.drawImage(overlayImage, x, y, overlaySize, overlaySize);

            // Add metallic shine
            const shineGradient = ctx.createLinearGradient(x, y, x + overlaySize, y + overlaySize);
            shineGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
            shineGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
            shineGradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
            ctx.fillStyle = shineGradient;
            ctx.fill();

            ctx.restore();
            resolve();
          };
          overlayImage.onerror = () => reject(new Error('Failed to load overlay image'));
        });
      }

    } catch (err) {
      setError('Failed to generate QR code. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'golden-qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start p-6 max-w-4xl mx-auto">
      <div className="w-full md:w-1/2 space-y-6 bg-black/90 p-6 rounded-xl">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Premium QR Generator</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-1">
                URL or Text Content
              </label>
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-yellow-400/50 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                placeholder="Enter URL or text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-yellow-400 mb-1">
                Logo Image URL (optional)
              </label>
              <input
                type="text"
                value={overlayImageUrl}
                onChange={(e) => setOverlayImageUrl(e.target.value)}
                className="w-full px-4 py-2 bg-black/50 border border-yellow-400/50 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                placeholder="Enter logo image URL"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={generateGoldenQRCode}
                disabled={!qrText || isLoading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-semibold rounded-md hover:from-yellow-500 hover:to-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
              
              <button
                onClick={handleDownload}
                disabled={!qrText || isLoading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-md hover:from-yellow-300 hover:to-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Download
              </button>
            </div>
          </div>
        </div>

       
      </div>

      <div className="w-full md:w-1/2 flex justify-center items-center bg-black/90 p-8 rounded-xl">
        <div className="w-[400px] h-[400px] rounded-lg shadow-2xl shadow-yellow-400/20">
          <canvas
            ref={canvasRef}
            width="400"
            height="400"
            className="w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumQRGenerator;