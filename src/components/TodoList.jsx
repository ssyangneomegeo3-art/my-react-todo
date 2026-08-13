import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoList() {
  const { filteredTodos, toggleTodo, deleteTodo, editTodo } = useTodo();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      editTodo(id, editText);
    }
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') handleSaveEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  };

  if (filteredTodos.length === 0) {
    return <div className="empty-message">목록이 비어 있습니다.</div>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="todo-checkbox"
          />

          {editingId === todo.id ? (
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleSaveEdit(todo.id)}
              onKeyDown={(e) => handleKeyDown(e, todo.id)}
              autoFocus
            />
          ) : (
            <div className="todo-content" onClick={() => handleStartEdit(todo)}>
              <span className="todo-text">{todo.text}</span>
              {todo.createdAt && <span className="todo-time">{todo.createdAt}</span>}
            </div>
          )}

          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            🗑️
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;