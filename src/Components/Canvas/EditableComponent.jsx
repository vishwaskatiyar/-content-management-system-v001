import React, { useState, useRef } from "react";
import Moveable from "react-moveable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import ContentEditable from "react-contenteditable";

const EditableComponent = ({
  component,
  updatePosition,
  updateSize,
  removeComponent,
  setSelectedId,
  selectedId,
}) => {
  const [imageSrc, setImageSrc] = useState(component.src);
  const ref = useRef(null);

  // Handle component resizing
  const onResize = (e, { size }) => {
    updateSize(component.id, {
      width: size.width,
      height: size.height,
    });
  };

  // Handle dragging
  const onDrag = ({ beforeDelta }) => {
    updatePosition(
      component.id,
      component.x + beforeDelta[0],
      component.y + beforeDelta[1]
    );
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        updateSize(component.id, {
          width: component.width,
          height: component.height,
          src: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle component click for selecting
  const handleSelect = (e) => {
    e.stopPropagation(); // Prevent deselect when clicking the component
    setSelectedId(component.id);
  };

  return (
    <div
      ref={ref}
      className={`editable-component absolute p-2 border bg-white shadow-md transition-transform ${
        selectedId === component.id ? "border-blue-500" : "border-gray-300"
      }`}
      style={{
        left: `${component.x}px`,
        top: `${component.y}px`,
        width: `${component.width}px`,
        height: `${component.height}px`,
        cursor: "move",
      }}
      onClick={handleSelect} // Select the component
    >
      <ResizableBox
        width={component.width}
        height={component.height}
        minConstraints={[50, 50]}
        maxConstraints={[400, 400]}
        onResize={onResize}
        axis="both"
      >
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          {component.type === "text" ? (
            <ContentEditable
              html={component.label}
              onChange={(e) => {
                updateSize(component.id, {
                  width: component.width,
                  height: component.height,
                  label: e.target.value,
                });
              }}
              className="cursor-text border p-1 outline-none w-full h-full text-center"
            />
          ) : component.type === "image" ? (
            <div className="w-full h-full flex justify-center items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute top-0 left-0 opacity-0"
              />
              <img
                src={imageSrc || "https://via.placeholder.com/100"}
                alt="Uploaded"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          ) : component.type === "button" ? (
            <button className="px-4 py-2 bg-blue-500 text-white w-full h-full">
              {component.label}
            </button>
          ) : null}
        </div>
      </ResizableBox>

      {selectedId === component.id && (
        <>
          <button
            onClick={() => removeComponent(component.id)}
            className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs"
          >
            X
          </button>

          <Moveable
            target={ref.current}
            draggable={true}
            resizable={true}
            onDrag={onDrag}
            onResize={({ width, height }) => {
              updateSize(component.id, { width, height });
            }}
          />
        </>
      )}
    </div>
  );
};

export default EditableComponent;
