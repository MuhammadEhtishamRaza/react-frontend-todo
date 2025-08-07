import React, { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText.trim()) {
      onAddTodo(todoText.trim());
      setTodoText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="todo-input"
          maxLength={200}
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={!todoText.trim()}
        >
          <span className="add-icon">+</span>
        </button>
      </div>
      {todoText.length > 0 && (
        <div className="char-count">
          {todoText.length}/200
        </div>
      )}
    </form>
  );
};

export default TodoForm; 