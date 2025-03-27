import React, { useState, useRef, useEffect } from "react";
import { Resizable } from "react-resizable";
import ContentEditable from "react-contenteditable";
import Moveable from "react-moveable";

const EditableComponent = ({ component, onRemove, updatePosition }) => {
  const [size, setSize] = useState({ width: 150, height: 50 });
  const [content, setContent] = useState(component.label);
  const [position, setPosition] = useState({ x: component.x, y: component.y });
  const [selected, setSelected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSelected(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResize = (e, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

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
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: "move",
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(true);
      }}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={handleResize}
        minConstraints={[50, 30]}
        maxConstraints={[300, 300]}
      >
        <div className="w-full h-full flex items-center justify-center">
          {component.type === "text" ? (
            <ContentEditable
              html={content}
              onChange={(e) => setContent(e.target.value)}
              className="cursor-text border p-1 outline-none"
            />
          ) : component.type === "image" ? (
            <img
              src="https://via.placeholder.com/100"
              alt="placeholder"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white">
              {content}
            </button>
          )}
        </div>
      </Resizable>

      {selected && (
        <>
          <button
            onClick={() => onRemove(component.id)}
            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs"
          >
            X
          </button>
          <Moveable
            target={ref.current}
            draggable={true}
            onDrag={handleDrag}
            throttleDrag={1}
            keepRatio={false}
          />
        </>
      )}
    </div>
  );
};

export default EditableComponent;
