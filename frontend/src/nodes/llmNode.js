import React from 'react';
import BaseNode from './BaseNode';
import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id }) => {
 
  const styles = {
    llmNodeContainer: {
      backgroundColor: '#2a9dc3',
      border: '2px solid #2a9dc3',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      width:'300px',
      height:'130px'
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000',
      marginBottom: '12px',
    },
    description: {
      fontSize: '14px',
      color: '#000',
      textAlign: 'center',
      marginBottom: '10px',
    },
    handleLeft: {
      backgroundColor: '#4a90e2',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      border: '1px solid #333',
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
    <BaseNode
      id={id}
      title={<div style={styles.title}>LLM</div>}
      handles={[
        {
          id: 'system',
          type: 'target',
          position: Position.Left,
          style: { ...styles.handleLeft, top: '33%' }, 
        },
        {
          id: 'prompt',
          type: 'target',
          position: Position.Left,
          style: { ...styles.handleLeft, top: '66%' }, 
        },
        {
          id: 'response',
          type: 'source',
          position: Position.Right,
          style: styles.handleRight, 
        },
      ]}
      style={styles.llmNodeContainer} 
    >
      <div style={styles.description}>This is an LLM.</div> 
    </BaseNode>
  );
};
