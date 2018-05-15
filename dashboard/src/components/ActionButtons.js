import React from 'react';

const ActionButtons = ({ onUpdate, onRemove }) => (
  <div className="action-buttons">
    <button className="update" onClick={onUpdate}>UPDATE</button>
    <button className="remove" onClick={onRemove}>REMOVE</button>
  </div>
);

export default ActionButtons;