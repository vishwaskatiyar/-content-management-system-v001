import React from "react";
import { useDrop } from "react-dnd";
import EditableComponent from "./EditableComponent";
import MovableComponent from "./MovableComponent";

const Canvas = ({
  components,
  addComponent,
  updatePosition,
  removeComponent,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      const canvasElement = document.getElementById("canvas");
      if (!canvasElement) return;

      const canvasRect = canvasElement.getBoundingClientRect();
      const newX = offset.x - canvasRect.left;
      const newY = offset.y - canvasRect.top;

      // Ensure component stays inside the canvas
      const clampedX = Math.max(0, Math.min(canvasRect.width - 100, newX));
      const clampedY = Math.max(0, Math.min(canvasRect.height - 50, newY));

      addComponent({ ...item, id: Date.now(), x: clampedX, y: clampedY });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      id="canvas"
      ref={drop}
      className={`relative w-[60%] mx-auto h-screen bg-gray-200 p-4 rounded-md border shadow-md ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      {components.map((comp) => (
        <EditableComponent
          key={comp.id}
          component={comp}
          updatePosition={updatePosition}
          onRemove={removeComponent}
        />
      ))}
    </div>
  );
};

export default Canvas;
