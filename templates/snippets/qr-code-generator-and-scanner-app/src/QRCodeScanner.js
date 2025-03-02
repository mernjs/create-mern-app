import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCode = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(true);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermission(true); 
      } catch (err) {
        setCameraPermission(false);
        alert(err.message)
      }
    };

    checkCameraPermission();
  }, []);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result.text || result);
      setIsScanned(true);
    }
  };

  const handleError = (err) => {
    console.log('Error scanning QR code', err);
  };

  useEffect(() => {
    if (isScanned && isValidUrl(scanResult)) {
      const timer = setTimeout(() => {
        window.open(scanResult, '_blank');
        setScanResult(null);
        setIsScanned(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isScanned, scanResult]);

  const handleLinkClick = () => {
    setScanResult(null);
    setIsScanned(false);
  };

  return (
    <div className="relative border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {!cameraPermission && (
          <p className='p-5'>Camera permission is required to scan QR codes. Please enable camera access.</p>
      )}

      {cameraPermission && (
        <div className="w-full h-64 md:h-96 relative">
          <QrReader
            onResult={(result, error) => {
              if (result) handleScan(result);
              if (error) handleError(error);
            }}
            className="w-full h-full object-cover rounded-lg border-4 border-gray-200 shadow-xl transition-all duration-300 transform hover:scale-105"
          />
        </div>
      )}

      {scanResult && isScanned && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-lg p-4 rounded-lg">
          <p className="text-center">
            {isValidUrl(scanResult) ? (
              <a
                href={scanResult}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Click to visit: {scanResult}
              </a>
            ) : (
              <span className="text-white">Scanned Data: {scanResult}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

const QRCodeScanner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-8 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">QR Code Scanner</h2>
        
        <div className="w-full rounded-xl shadow-lg mb-6">
          <QRCode />
        </div>

        <p className="text-center text-gray-500 mt-4">Scan a QR code to get the result.</p>
      </div>
    </div>
  );
};

export default QRCodeScanner;
