import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DarkModeToggle from './components/DarkModeToggle';
import MainPage from './pages/MainPage';
import StatsPage from './pages/StatsPage';
import { TodoProvider } from './context/TodoContext';
import './App.css';

function App() {
  return (
    <TodoProvider>
      <div className="app-container">
        <header className="header-bar">
          <Navigation />
          <DarkModeToggle />
        </header>

        <main className="content-container">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </main>
      </div>
    </TodoProvider>
  );
}

export default App;