import React from 'react';
import { useDispatch } from 'react-redux';
import { setTool } from '../features/drawing/drawingSlice';

const tools = [
  { name: 'Pencil', icon: '✏️' },
  { name: 'Eraser', icon: '🧹' },
  { name: 'Fill', icon: '🎨' },
  { name: 'Rectangle', icon: '⬛' },
  { name: 'Circle', icon: '⚪' },
  { name: 'Line', icon: '📏' },
];

function Toolbar() {
  const dispatch = useDispatch();

  const handleColorChange = (color) => {
    dispatch(setTool(color));
  };

  return (
    <div className="bg-gray-300 w-16 flex flex-col items-center py-4">
      {tools.map((tool, index) => (
        <button
          onClick={() => handleColorChange(tool.name)}
          key={index}
          className="flex flex-col items-center mb-4 hover:bg-gray-400 p-2 rounded"
        >
          <span className="text-xl">{tool.icon}</span>
          <span className="text-xs mt-1">{tool.name}</span>
        </button>
      ))}
    </div>
  );
}

export default Toolbar;
