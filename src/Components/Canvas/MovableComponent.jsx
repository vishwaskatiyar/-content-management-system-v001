import React, { useState, useRef, useEffect } from "react";
import Moveable from "react-moveable";

const MovableComponent = ({ component, updatePosition }) => {
  const [position, setPosition] = useState({ x: component.x, y: component.y });
  const [selected, setSelected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setPosition({ x: component.x, y: component.y });
  }, [component.x, component.y]);

  const handleDrag = (e) => {
    const newX = position.x + e.beforeDelta[0];
    const newY = position.y + e.beforeDelta[1];

    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();
    const componentRect = ref.current.getBoundingClientRect();

    if (
      componentRect.left + e.beforeDelta[0] >= canvasRect.left &&
      componentRect.right + e.beforeDelta[0] <= canvasRect.right &&
      componentRect.top + e.beforeDelta[1] >= canvasRect.top &&
      componentRect.bottom + e.beforeDelta[1] <= canvasRect.bottom
    ) {
      setPosition({ x: newX, y: newY });
      updatePosition(component.id, newX, newY);
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute p-2 border bg-white shadow-md transition-transform ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "move",
      }}
      onMouseDown={() => setSelected(true)}
    >
      {component.type === "text" ? (
        <p className="p-2">{component.label}</p>
      ) : component.type === "image" ? (
        <img src="https://via.placeholder.com/100" alt="placeholder" />
      ) : (
        <button className="px-4 py-2 bg-blue-500 text-white">
          {component.label}
        </button>
      )}

      {selected && (
        <Moveable target={ref.current} draggable={true} onDrag={handleDrag} />
      )}
    </div>
  );
};

export default MovableComponent;
