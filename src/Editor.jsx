import React from "react";
import Sidebar from "./sidebar";
import Canvas from "./canvas";
import Toolbar from "./toolbar";

const Editor = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Canvas />
      <Toolbar />
    </div>
  );
};

export default Editor;
