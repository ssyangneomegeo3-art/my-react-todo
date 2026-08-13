import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const TodoItem = React.memo(({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category || '기타');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      editTodo(todo.id, editText, editCategory);
      setIsEditing(false);
    }
  };

  const getCategoryClass = (cat) => {
    switch (cat) {
      case '공부': return 'badge-study';
      case '업무': return 'badge-work';
      case '개인': return 'badge-personal';
      default: return 'badge-etc';
    }
  };

  const formattedDate = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="edit-category-select"
          >
            <option value="공부">공부</option>
            <option value="업무">업무</option>
            <option value="개인">개인</option>
            <option value="기타">기타</option>
          </select>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <button type="submit" className="save-btn">저장</button>
          <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">취소</button>
        </form>
      ) : (
        <div className="todo-content">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="checkmark"></span>
          </label>
          
          <div className="todo-text-group">
            <div className="todo-header-row">
              <span className={`category-badge ${getCategoryClass(todo.category)}`}>
                {todo.category || '기타'}
              </span>
              <span className={`todo-text ${todo.completed ? 'strikethrough' : ''}`}>
                {todo.text}
              </span>
            </div>
            {formattedDate && <span className="todo-date">{formattedDate}</span>}
          </div>

          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-btn" title="수정">✏️</button>
            <button onClick={() => deleteTodo(todo.id)} className="delete-btn" title="삭제">🗑️</button>
          </div>
        </div>
      )}
    </li>
  );
});

const TodoList = () => {
  const { filteredTodos } = useTodo();

  if (filteredTodos.length === 0) {
    return (
      <div className="empty-state">
        <p>📋 표시할 할 일이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default React.memo(TodoList);