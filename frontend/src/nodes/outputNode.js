import React, { useState } from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

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
    handleLeft: {
      backgroundColor: '#4a90e2',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      border: '1px solid #333',
    },
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[{ id: 'value', type: 'target', position: Position.Left, style: styles.handleLeft }]}
      style={styles.container}
    >
      <label style={styles.label}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={styles.inputField}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        />
      </label>
      <label style={styles.label}>
        Type:
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={styles.selectField}
          onFocus={(e) => (e.target.style.borderColor = '#007bff')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc')}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
