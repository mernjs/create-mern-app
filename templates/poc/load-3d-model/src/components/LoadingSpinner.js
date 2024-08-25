// components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => (
  <div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    color: '#ffffff',
  }}>
    Loading...
  </div>
);

export default LoadingSpinner;
