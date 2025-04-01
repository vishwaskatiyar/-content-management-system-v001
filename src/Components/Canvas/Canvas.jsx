import React, { useState, useEffect, useCallback } from "react";
import { useDrop } from "react-dnd";
import EditableComponent from "./EditableComponent";

const Canvas = () => {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      if (!offset) return;

      const canvas = document.getElementById("canvas");
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const newX = Math.max(
        0,
        Math.min(canvasRect.width - 150, offset.x - canvasRect.left)
      );
      const newY = Math.max(
        0,
        Math.min(canvasRect.height - 50, offset.y - canvasRect.top)
      );

      const newComponent = {
        id: Date.now(),
        type: item.type,
        label: item.label || "Text",
        x: newX,
        y: newY,
        width: 150,
        height: 50,
        src: item.src || null,
      };

      setComponents((prev) => [...prev, newComponent]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Restrict component dragging within the canvas
  const updatePosition = (id, newX, newY) => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    // Ensure components stay inside the canvas boundaries
    const boundedX = Math.max(0, Math.min(canvasRect.width - 150, newX));
    const boundedY = Math.max(0, Math.min(canvasRect.height - 50, newY));

    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, x: boundedX, y: boundedY } : comp
      )
    );
  };

  // Handle component resizing
  const updateSize = (id, newSize) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...newSize } : comp))
    );
  };

  // Handle deleting component
  const removeComponent = (id) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  // Deselect component when clicking outside of it
  const handleCanvasClick = useCallback((e) => {
    if (!e.target.closest(".editable-component")) {
      setSelectedId(null); // Deselect when clicking outside
    }
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    canvas.addEventListener("click", handleCanvasClick);
    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [handleCanvasClick]);

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
          updateSize={updateSize}
          removeComponent={removeComponent}
          setSelectedId={setSelectedId}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
};

export default Canvas;
