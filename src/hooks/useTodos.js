import { useState, useEffect } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 0
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const markAllCompleted = () => {
    setTodos(prev => prev.map(todo => ({ ...todo, completed: true })));
  };

  const markAllActive = () => {
    setTodos(prev => prev.map(todo => ({ ...todo, completed: false })));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    markAllCompleted,
    markAllActive
  };
};

export default useTodos; 