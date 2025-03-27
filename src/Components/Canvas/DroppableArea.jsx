import React from "react";
import { useDrop } from "react-dnd";
import MovableComponent from "./MovableComponent";

const DroppableArea = ({ components, setComponents }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      setComponents((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: item.type,
          label: item.label,
          x: offset.x,
          y: offset.y,
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full h-full bg-white shadow-lg rounded-lg relative ${
        isOver ? "border-4 border-blue-400" : ""
      }`}
    >
      {components.map((component) => (
        <MovableComponent key={component.id} component={component} />
      ))}
    </div>
  );
};

export default DroppableArea;
