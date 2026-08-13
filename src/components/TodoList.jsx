import { useState } from 'react';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
  // 1. 현재 수정 중인 할 일의 ID와 수정 중인 입력 텍스트 상태
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // 수정 시작 모드로 전환
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // 수정 완료 및 저장
  const handleSaveEdit = (id) => {
    if (!editText.trim()) return;
    onEditTodo(id, editText);
    setEditingId(null); // 수정 모드 종료
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // 키보드 이벤트 (Enter 저장, Esc 취소)
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (todos.length === 0) {
    return <p style={{ color: '#94a3b8', textAlign: 'center', margin: '20px 0' }}>등록된 할 일이 없습니다.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {/* editingId와 현재 todo.id가 같으면 수정 폼을, 다르면 일반 항목 표시 */}
          {editingId === todo.id ? (
            <div className="todo-edit-form">
              <input
                type="text"
                className="todo-edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo.id)}
                autoFocus
              />
              <button onClick={() => handleSaveEdit(todo.id)} className="todo-save-btn">저장</button>
              <button onClick={handleCancelEdit} className="todo-cancel-btn">취소</button>
            </div>
          ) : (
            <>
              <span
                onClick={() => onToggleTodo(todo.id)}
                className={`todo-text ${todo.completed ? 'completed' : ''}`}
              >
                {todo.completed ? '✅ ' : '⬜ '} {todo.text}
              </span>
              <div className="todo-btn-group">
                <button onClick={() => handleStartEdit(todo)} className="todo-edit-btn">수정</button>
                <button onClick={() => onDeleteTodo(todo.id)} className="todo-delete-btn">삭제</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}