import React from 'react';
import { useTodo } from '../context/TodoContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTodo();

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
      aria-label="다크 모드 토글"
      title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default React.memo(DarkModeToggle);