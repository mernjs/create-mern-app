import React, { forwardRef, useState, useRef } from 'react';
import { FaSquare, FaCircle, FaStar, FaAlignLeft } from 'react-icons/fa';

const Topbar = forwardRef(({ setSelectedMenu, setSidebarItems, selectedMenu }, ref) => {
  const menuItems = {
    File: ['New', 'Open', 'Save', 'Save As'],
    View: ['Zoom In', 'Zoom Out', 'Full Screen'],
    Insert: ['Image', 'Text', 'Shapes', 'Lines']
  };

  const subMenuItems = {
    'Zoom In': ['25%', '50%', '75%', '100%'],
    'Zoom Out': ['25%', '50%', '75%', '100%'],
    'Full Screen': ['Enable', 'Disable'],
    'Image': ['Upload', 'Edit', 'Delete'],
    'Text': ['Bold', 'Italic', 'Underline'],
    'Shapes': [
      { name: 'Square', icon: <FaSquare /> },
      { name: 'Circle', icon: <FaCircle /> },
      { name: 'Star', icon: <FaStar /> },
      { name: 'Triangle', icon: <FaStar /> },
    ],
    'Lines': [
      { name: 'Line', icon: <FaAlignLeft /> },
      { name: 'Xline', icon: <FaAlignLeft /> },
      { name: 'Ray', icon: <FaAlignLeft /> },
      { name: 'Polyline', icon: <FaAlignLeft /> },
      { name: 'Spline', icon: <FaAlignLeft /> },
      { name: 'Centerline', icon: <FaAlignLeft /> },
      { name: 'Dashed Line', icon: <FaAlignLeft /> },
      { name: 'Dotted Line', icon: <FaAlignLeft /> },
      { name: 'Phantom Line', icon: <FaAlignLeft /> },
      { name: '3D Polyline', icon: <FaAlignLeft /> },
      { name: '3D Line', icon: <FaAlignLeft /> },
      { name: 'Custom Linetype', icon: <FaAlignLeft /> },
      { name: 'Dimension Line', icon: <FaAlignLeft /> },
      { name: 'Leader Line', icon: <FaAlignLeft /> },
    ]
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (item) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const handleMenuClick = (item) => {
    setSelectedMenu(item);
    setSidebarItems(subMenuItems[item] || []);
    setOpenDropdown(null); // Close dropdown when a menu item is selected
  };

  return (
    <div ref={ref} className="bg-gray-900 text-white px-4 py-4">
      <nav className="flex space-x-4">
        {Object.keys(menuItems).map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => handleDropdownToggle(item)}
              className={`${
                selectedMenu === item ? 'bg-gray-700' : ''
              } px-3 py-2 rounded hover:bg-gray-700`}
            >
              {item}
            </button>
            {openDropdown === item && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-gray-800 rounded shadow-lg">
                {menuItems[item].map((subItem) => (
                  <a
                    key={subItem}
                    href="#"
                    onClick={() => handleMenuClick(subItem)}
                    className="block py-2 px-4 hover:bg-gray-600"
                  >
                    {subItem}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
});

export default Topbar;
