import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import DarkModeToggle from './components/DarkModeToggle';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import Toast from './components/Toast';
import MainPage from './pages/MainPage';
import StatsPage from './pages/StatsPage';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <TodoProvider>
      <div className="app-container">
        <header className="app-header">
          <Navigation />
          <DarkModeToggle />
        </header>

        <PwaInstallPrompt />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>

        <Toast />
      </div>
    </TodoProvider>
  );
}

export default App;