import React from 'react';
import { useTodo } from '../context/TodoContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTodo();

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode} title="다크 모드 토글">
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;