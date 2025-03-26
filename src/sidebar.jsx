import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold">Components</h2>
      <div className="mt-4 space-y-2">
        <button className="w-full bg-gray-700 p-2 rounded">Text</button>
        <button className="w-full bg-gray-700 p-2 rounded">Image</button>
        <button className="w-full bg-gray-700 p-2 rounded">Button</button>
      </div>
    </div>
  );
};

export default Sidebar;
