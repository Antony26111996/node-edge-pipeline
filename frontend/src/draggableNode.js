export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const styles = {
    container: {
      cursor: 'grab',
      minWidth: '80px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '8px',
      backgroundColor: '#2a9dc3', 
      justifyContent: 'center',
      flexDirection: 'column',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
      transition: 'transform 0.2s ease, background-color 0.3s ease',
      padding: '0px',
      border: '1px solid transparent',
    },
    label: {
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
    },
    hover: {
      backgroundColor: '#334155', 
      border: '1px solid #4CAF50', 
    },
  };

  const handleMouseEnter = (event) => {
    Object.assign(event.target.style, styles.hover);
  };

  const handleMouseLeave = (event) => {
    event.target.style.backgroundColor = styles.container.backgroundColor;
    event.target.style.border = styles.container.border;
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.container}
      draggable
    >
      <span style={styles.label}>{label}</span>
    </div>
  );
};
