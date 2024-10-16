import React, { useState } from 'react';
import { useStore } from './store';

const submitPipeline = async (nodes, edges, setPopupData, setShowPopup) => {
  console.log("Nodes:", JSON.stringify(nodes, null, 2)); 
  console.log("Edges:", JSON.stringify(edges, null, 2)); 

  if (!nodes || nodes.length === 0) {
    setPopupData({
      error: true,
      message: "No nodes found to submit."
    });
    setShowPopup(true);
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();

    setPopupData({
      error: false,
      numNodes: data.num_nodes,
      numEdges: data.num_edges,
      isDAG: data.is_dag
    });
    setShowPopup(true);

  } catch (error) {
    console.error('Error submitting pipeline:', error);
    setPopupData({
      error: true,
      message: 'An error occurred while submitting the pipeline.'
    });
    setShowPopup(true);
  }
};

const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    error: false,
    numNodes: 0,
    numEdges: 0,
    isDAG: false,
    message: ''
  });

  const handleSubmit = () => {
    submitPipeline(nodes, edges, setPopupData, setShowPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '0vh', 
    },
    button: {
      backgroundColor: '#4CAF50', 
      color: 'white', 
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    popupOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
    },
    popupContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '300px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
      marginTop: '10px',
      backgroundColor: '#f44336',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '14px',
    }
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleSubmit}
        style={styles.button}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
      >
        Submit Pipeline
      </button>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h3>{popupData.error ? 'Error' : 'Pipeline Details'}</h3>
            {popupData.error ? (
              <p>{popupData.message}</p>
            ) : (
              <>
                <p><strong>Number of Nodes:</strong> {popupData.numNodes}</p>
                <p><strong>Number of Edges:</strong> {popupData.numEdges}</p>
                <p><strong>Is DAG:</strong> {popupData.isDAG ? 'Yes' : 'No'}</p>
              </>
            )}
            <button style={styles.closeButton} onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitButton;
