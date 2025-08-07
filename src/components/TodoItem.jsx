import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="todo-edit-input"
            autoFocus
          />
        ) : (
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="todo-btn edit-btn"
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="todo-btn delete-btn"
          title="Delete todo"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 