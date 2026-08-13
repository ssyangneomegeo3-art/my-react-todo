import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

const CATEGORIES = ['공부', '업무', '개인', '기타'];

function TodoInput() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('개인');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text, category);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
        aria-label="카테고리 선택"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요..."
        className="todo-input"
      />
      <button type="submit" className="add-btn">
        추가
      </button>
    </form>
  );
}

export default React.memo(TodoInput);