import React, { useState } from 'react';

const getDisplayTime = (todo) => {
  if (todo.createdAt) return todo.createdAt;

  if (todo.id && typeof todo.id === 'number') {
    const date = new Date(todo.id);
    if (!isNaN(date.getTime())) {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${month}-${day} ${hours}:${minutes}`;
    }
  }
  return '';
};

function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    editTodo(id, editText.trim());
    setEditingId(null);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  if (todos.length === 0) {
    return <p className="empty-msg">목록이 비어 있습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        const displayTime = getDisplayTime(todo);

        return (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, todo.id)}
                  autoFocus
                />
                <button className="save-btn" onClick={() => handleSaveEdit(todo.id)}>
                  저장
                </button>
                <button className="cancel-btn" onClick={() => setEditingId(null)}>
                  취소
                </button>
              </div>
            ) : (
              <div className="todo-content-wrapper">
                <div className="todo-main-info">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="todo-text" onClick={() => handleStartEdit(todo)}>
                    {todo.text}
                  </span>
                </div>
                <div className="todo-right-info">
                  {displayTime && (
                    <span className="todo-timestamp">{displayTime}</span>
                  )}
                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;