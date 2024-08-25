import React, { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { setTool } from '../reducers/drawingSlice';

const Sidebar = forwardRef(({ selectedMenu, sidebarItems }, ref) => {
  const dispatch = useDispatch();

  const handleToolChange = (tool) => {
    dispatch(setTool(tool));
  };

  return (
    <div ref={ref} className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-4 text-center font-bold text-2xl bg-gray-900">
        {selectedMenu}
      </div>
      <nav className="mt-4">
        {sidebarItems.map((item, index) => (
          <div key={index} onClick={()=> handleToolChange(item.name)} className="flex items-center py-2 px-4 hover:bg-gray-700">
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.name || item}
          </div>
        ))}
      </nav>
    </div>
  );
});

export default Sidebar;
