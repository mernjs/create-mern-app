import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setColor } from '../features/drawing/drawingSlice';

const colors = [
  { hex: '#000000', code: 'bg-black' },
  { hex: '#EF4444', code: 'bg-red-500' },
  { hex: '#F59E0B', code: 'bg-yellow-500' },
  { hex: '#10B981', code: 'bg-green-500' },
  { hex: '#3B82F6', code: 'bg-blue-500' },
  { hex: '#6366F1', code: 'bg-indigo-500' },
  { hex: '#8B5CF6', code: 'bg-purple-500' },
  { hex: '#EC4899', code: 'bg-pink-500' },
];


function Palette() {
  const { color } = useSelector(state => state.drawing);
  const dispatch = useDispatch();

  const handleToolChange = (tool) => {
    dispatch(setColor(tool));
  };

  return (
    <div className="bg-gray-300 w-20 p-4">
      <h2 className="text-sm font-bold mb-2">Colors</h2>
      <div className="flex flex-wrap">
        {colors.map((color, index) => (
          <div
            onClick={() => handleToolChange(color.hex)}
            key={index}
            className={`${color.code} w-10 h-10 p-0 border rounded m-1 cursor-pointer`}
          />
        ))}
        <h2 className="text-sm font-bold mb-2">Custom</h2>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => handleToolChange(e.target.value)}
          className="w-10 h-10 p-0 border rounded m-1 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Palette;
