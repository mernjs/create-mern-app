import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRCodeImageScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // Handle the file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          setImageSrc(image.src);
          decodeQRFromImage(image);
        };
      };

      reader.readAsDataURL(file);
    }
  };

  // Decode the QR code from the image
  const decodeQRFromImage = (image) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0, image.width, image.height);

    // Get the image data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    // Use jsQR to decode the QR code
    const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

    if (qrCode) {
      setScanResult(qrCode.data);  // Set the decoded result
    } else {
      setScanResult('No QR code found in the image.');
    }
    setIsScanning(false);  // Stop scanning after the image is processed
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">QR Code Image Scanner</h2>

        {/* File upload input */}
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>

        {/* Display the uploaded image */}
        {imageSrc && (
          <div className="mb-6">
            <img src={imageSrc} alt="QR Code" className="max-w-full rounded-lg shadow-md" />
          </div>
        )}

        {/* Display scan result */}
        {scanResult && (
          <div className="text-center mt-4 text-lg text-indigo-700">
            {scanResult.startsWith('No QR code') ? (
              <p className="text-red-500">{scanResult}</p>
            ) : (
              <p>
                <strong>QR Code Data:</strong> <a href={scanResult} target="_blank" without rel="noreferrer">{scanResult}</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeImageScanner;
