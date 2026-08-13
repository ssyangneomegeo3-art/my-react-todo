import React, { memo } from 'react';
import { useTodo } from '../context/TodoContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTodo();

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-btn"
      aria-label="다크 모드 토글"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default memo(DarkModeToggle);