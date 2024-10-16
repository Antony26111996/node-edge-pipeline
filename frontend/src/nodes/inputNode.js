import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const styles = {
    container: {
      backgroundColor: '#2a9dc3',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      width: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    title: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#000',
      margin: 0,
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#000',
      width: '100%',
    },
    inputField: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      transition: 'border 0.3s ease',
    },
    selectField: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '14px',
      width: '100%',
      transition: 'border 0.3s ease',
    },
    handleRight: {
      backgroundColor: '#4a90e2',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      border: '1px solid #333',
    },
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Input</h4>
      <label style={styles.label}>
        Name:
        <input
          style={styles.inputField}
          type="text"
          value={currName}
          onChange={handleNameChange}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
      </label>
      <label style={styles.label}>
        Type:
        <select
          style={styles.selectField}
          value={inputType}
          onChange={handleTypeChange}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
      {/* Ensure the handle style matches the one in LLMNode */}
      <Handle type="source" position={Position.Right} id={`${id}-value`} style={styles.handleRight} />
    </div>
  );
};

export default InputNode;
