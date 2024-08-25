"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function Layout({ children, topbarRef, sidebarRef }) {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [sidebarItems, setSidebarItems] = useState([]);
  return (
    <div className="min-h-screen flex">
      <Sidebar ref={sidebarRef} selectedMenu={selectedMenu} sidebarItems={sidebarItems.length > 0 ? sidebarItems : ['New', 'Open', 'Save', 'Save As']} />
      <div className="flex flex-col flex-1">
        <Topbar ref={topbarRef} setSelectedMenu={setSelectedMenu} setSidebarItems={setSidebarItems} selectedMenu={selectedMenu} />
        <main className="flex-1 bg-gray-100 p-2">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
