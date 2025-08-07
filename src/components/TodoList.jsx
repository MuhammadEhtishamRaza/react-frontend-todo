import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('created');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortBy === 'alphabetical') return a.text.localeCompare(b.text);
        if (sortBy === 'priority') return (b.priority || 0) - (a.priority || 0);
        return 0;
    });

    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;
    const activeCount = totalCount - completedCount;

    return (
        <div className="todo-list-container">
            {todos.length > 0 && (
                <div className="todo-controls">
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({totalCount})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                            onClick={() => setFilter('active')}
                        >
                            Active ({activeCount})
                        </button>
                        <button
                            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed ({completedCount})
                        </button>
                    </div>

                    <div className="sort-controls">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="created">Date Created</option>
                            <option value="alphabetical">Alphabetical</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="todo-list">
                {sortedTodos.length === 0 ? (
                    <div className="empty-state">
                        {todos.length === 0 ? (
                            <>
                                <div className="empty-icon">📝</div>
                                <h3>No todos yet!</h3>
                                <p>Add your first todo to get started.</p>
                            </>
                        ) : (
                            <>
                                <div className="empty-icon">✅</div>
                                <h3>No {filter} todos</h3>
                                <p>Try changing the filter to see more todos.</p>
                            </>
                        )}
                    </div>
                ) : (
                    sortedTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>

            {todos.length > 0 && (
                <div className="todo-stats">
                    <span>
                        {completedCount} of {totalCount} completed
                    </span>
                    {completedCount > 0 && (
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${(completedCount / totalCount) * 100}%` }}
                            ></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoList; 