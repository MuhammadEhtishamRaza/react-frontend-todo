import React, { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Notification from './components/Notification';
import AuthPage from './pages/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import useTodos from './hooks/useTodos';
import './App.css';

const TodoApp = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    markAllCompleted,
    markAllActive
  } = useTodos();

  const showNotification = (message, type = 'success') => {
    setNotification({
      isVisible: true,
      message,
      type
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleAddTodo = (text) => {
    addTodo(text);
    showNotification(`"${text}" added to your todo list!`, 'success');
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    toggleTodo(id);
    if (todo) {
      const action = todo.completed ? 'marked as incomplete' : 'completed';
      showNotification(`Todo "${todo.text}" ${action}!`, 'success');
    }
  };

  const handleDeleteTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    deleteTodo(id);
    if (todo) {
      showNotification(`"${todo.text}" removed from your list`, 'info');
    }
  };

  const handleEditTodo = (id, newText) => {
    editTodo(id, newText);
    showNotification(`Todo updated successfully!`, 'success');
  };

  const handleClearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    clearCompleted();
    if (completedCount > 0) {
      showNotification(`${completedCount} completed todo${completedCount > 1 ? 's' : ''} cleared!`, 'info');
    }
  };

  const handleMarkAllCompleted = () => {
    const activeCount = todos.filter(todo => !todo.completed).length;
    markAllCompleted();
    if (activeCount > 0) {
      showNotification(`All ${activeCount} todo${activeCount > 1 ? 's' : ''} marked as complete!`, 'success');
    }
  };

  const handleMarkAllActive = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    markAllActive();
    if (completedCount > 0) {
      showNotification(`All ${completedCount} todo${completedCount > 1 ? 's' : ''} marked as active!`, 'warning');
    }
  };

  const handleLogout = () => {
    logout();
    showNotification('You have been logged out successfully', 'info');
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">⏳</div>
        <p>Loading...</p>
      </div>
    );
  }

  // Show authentication page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Show main todo app if authenticated
  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <h1 className="app-title">
                <span className="title-icon">✅</span>
                Todo App
              </h1>
              <p className="app-subtitle">Stay organized and boost your productivity</p>
            </div>
            <div className="header-right">
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{user?.name || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                🚪
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <TodoForm onAddTodo={handleAddTodo} />

          {todos.length > 0 && (
            <div className="bulk-actions">
              <div className="bulk-buttons">
                {activeCount > 0 && (
                  <button
                    onClick={handleMarkAllCompleted}
                    className="bulk-btn complete-all-btn"
                  >
                    Mark all complete
                  </button>
                )}
                {completedCount > 0 && (
                  <button
                    onClick={handleMarkAllActive}
                    className="bulk-btn uncomplete-all-btn"
                  >
                    Mark all active
                  </button>
                )}
                {completedCount > 0 && (
                  <button
                    onClick={handleClearCompleted}
                    className="bulk-btn clear-completed-btn"
                  >
                    Clear completed
                  </button>
                )}
              </div>
            </div>
          )}

          <TodoList
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </main>

        <footer className="app-footer">
          <p>Welcome back, {user?.name}! • Local storage enabled • Enhanced UX</p>
        </footer>
      </div>

      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <TodoApp />
    </AuthProvider>
  );
};

export default App;