import React from 'react';
import { useTodo } from '../context/TodoContext';

function ClearCompleted() {
  const { todos, clearCompleted } = useTodo();
  const hasCompleted = todos.some((todo) => todo.completed);

  if (!hasCompleted) return null;

  return (
    <div className="clear-completed-wrapper">
      <button className="clear-completed-btn" onClick={clearCompleted}>
        완료된 항목 모두 삭제
      </button>
    </div>
  );
}

export default ClearCompleted;