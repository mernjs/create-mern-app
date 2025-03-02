// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeScanner from './QRCodeScanner';
import QRCodeGenerator from './QRCodeGenerator';
import Header from './Header';
import Footer from './Footer';
import VideoPlayer from './VideoPlayer';
import Scanner from './Scanner';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<QRCodeGenerator />} />
          <Route path="/scanner" element={<Scanner />} />
		  <Route path="/video" element={<VideoPlayer />} />
        </Routes>
      </div>
      <Footer /> 
    </Router>
  );
};

export default App;
