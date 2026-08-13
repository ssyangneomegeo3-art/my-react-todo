import React, { useState } from 'react';
import { useTodo } from '../context/TodoContext';

function TodoInput() {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="새로운 할 일을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-btn">
        추가
      </button>
    </form>
  );
}

export default TodoInput;