import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Editor from './Editor'; // Import the drag-and-drop page editor component

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Editor />
    </DndProvider>
  );
}

export default App;
