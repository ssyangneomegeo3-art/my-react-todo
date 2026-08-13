export default function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <div className="dark-mode-toggle-wrapper">
      <button
        className="dark-mode-toggle-btn"
        onClick={onToggle}
        title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
      >
        {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
      </button>
    </div>
  );
}