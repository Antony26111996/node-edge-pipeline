


import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import SubmitButton from './submit';
import { useStore } from './store'; 

function App() {
  const { nodes, edges } = useStore(state => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  console.log(nodes,'nodes in app.js file')
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton nodes={nodes} edges={edges} /> 
    </div>
  );
}

export default App;


