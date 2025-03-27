import React, { useState } from "react";
import DragDropContext from "./context/DragDropContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Canvas from "./Components/Canvas/Canvas";
import Toolbar from "./Components/Toolbar/Toolbar";

const App = () => {
  const [components, setComponents] = useState([]);

  const addComponent = (component) => {
    setComponents((prev) => [
      ...prev,
      { ...component, id: Date.now(), x: 100, y: 100 },
    ]);
  };

  const removeComponent = (id) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const moveComponent = (id, x, y) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, x, y } : comp))
    );
  };

  return (
    <DragDropContext>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <Canvas
          components={components}
          addComponent={addComponent}
          removeComponent={removeComponent}
          moveComponent={moveComponent}
        />
        <Toolbar />
      </div>
    </DragDropContext>
  );
};

export default App;
