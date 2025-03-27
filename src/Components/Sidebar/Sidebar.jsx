import React from "react";
import DraggableItem from "./DraggableItem";

const componentsList = [
  { type: "text", label: "Text Block" },
  { type: "image", label: "Image Block" },
  { type: "button", label: "Button" },
];

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-900 text-white p-4">
      <h2 className="text-lg font-bold mb-4">Components</h2>
      {componentsList.map((component, index) => (
        <DraggableItem key={index} component={component} />
      ))}
    </div>
  );
};

export default Sidebar;
