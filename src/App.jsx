import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import Navigation from './components/Navigation';
import DarkModeToggle from './components/DarkModeToggle';
import Toast from './components/Toast';
import MainPage from './pages/MainPage';
import StatsPage from './pages/StatsPage';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app-container">
        {/* 상단 탭과 다크모드 토글을 한 줄로 깔끔하게 배치 */}
        <header className="app-header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Navigation />
          <DarkModeToggle />
        </header>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
        
        <Toast />
      </div>
    </TodoProvider>
  );
}

export default App;