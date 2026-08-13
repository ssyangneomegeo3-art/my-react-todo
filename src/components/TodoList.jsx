import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const CATEGORIES = ['공부', '업무', '개인', '기타'];

function TodoList() {
  const { filteredTodos, toggleTodo, deleteTodo, editTodo } = useTodo();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState('개인');

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditCategory(todo.category || '기타');
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    editTodo(id, editText, editCategory);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  if (filteredTodos.length === 0) {
    return <div className="empty-message" style={{ textAlign: 'center', padding: '24px 0', color: '#94a3b8', fontSize: '0.85rem' }}>등록된 할 일이 없습니다.</div>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {editingId === todo.id ? (
            <div className="inline-edit-form" style={{ display: 'flex', gap: '6px', width: '100%' }}>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="edit-category-select"
                style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
                style={{ flex: 1, padding: '4px 8px', borderRadius: '6px', border: '1px solid #2563eb' }}
                autoFocus
              />
              <button onClick={() => handleSaveEdit(todo.id)} className="save-btn" style={{ padding: '4px 8px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                저장
              </button>
              <button onClick={handleCancelEdit} className="cancel-btn" style={{ padding: '4px 8px', background: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                취소
              </button>
            </div>
          ) : (
            <>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className={`category-tag category-${todo.category || '기타'}`}>
                  {todo.category || '기타'}
                </span>
                <span className="todo-text">{todo.text}</span>
              </div>
              <div className="todo-actions">
                <span className="todo-timestamp">{todo.createdAt}</span>
                <button onClick={() => handleStartEdit(todo)} className="edit-btn" title="수정">
                  ✏️
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn" title="삭제">
                  🗑️
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default React.memo(TodoList);