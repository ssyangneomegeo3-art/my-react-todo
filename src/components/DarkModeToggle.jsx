import React from 'react';

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      title="다크 모드 전환"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
}

export default DarkModeToggle;