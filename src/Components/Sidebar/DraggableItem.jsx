import React from "react";
import { useDrag } from "react-dnd";

const DraggableItem = ({ component }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item: { type: component.type, label: component.label },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer mb-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {component.label}
    </div>
  );
};

export default DraggableItem;
