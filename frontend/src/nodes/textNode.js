import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);

  const styles = {
    container: {
      width: '300px',
      height: '150px',
      border: '1px solid #2a9dc3',
      overflow: 'hidden',
      padding: '20px',
      borderRadius: '12px',
      backgroundColor: '#2a9dc3',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
      color: '#000',
    },
    textArea: {
      width: '90%',
      height: '50px', 
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
      backgroundColor: '#fff',
      transition: 'border 0.3s ease',
    },
    focus: {
      borderColor: '#007bff',
    },
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateHandles(newText);
  };

  const updateHandles = (text) => {
    const variableMatches = text.match(/{{\s*(\w+)\s*}}/g);
    const newHandles = variableMatches
      ? variableMatches.map((match, index) => {
          const variableName = match.replace(/{{\s*|\s*}}/g, '');
          return (
            <Handle
              key={index}
              type="target"
              position={Position.Left}
              id={`${id}-${variableName}`}
              style={{ top: `${(index + 1) * 100 / (variableMatches.length + 1)}%`, backgroundColor: '#4a90e2', borderRadius: '50%', width: '10px', height: '10px' }} 
            />
          );
        })
      : [];
    setHandles(newHandles);
  };

  return (
    <div style={styles.container}>
      {handles}
      <div style={styles.title}>Text</div>
      <textarea
        style={styles.textArea}
        value={currText}
        onChange={handleTextChange}
        onFocus={(e) => (e.target.style.borderColor = styles.focus.borderColor)}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`} 
        style={{ backgroundColor: '#4a90e2', borderRadius: '50%', width: '10px', height: '10px' }}
      />
    </div>
  );
};
