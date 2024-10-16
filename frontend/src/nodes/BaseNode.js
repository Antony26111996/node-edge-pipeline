import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, title, handles, style, children }) => {
  return (
    <div id={id} style={style}>
      <h4>{title}</h4>
      {children}
      {/* Render handles with specific styles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type={handle.type}
          position={handle.position}
          style={{
            ...handle.style,
           
            margin: handle.position === Position.Left ? '0 5px' : '0',
          }}
        />
      ))}
    </div>
  );
};

export default BaseNode;
