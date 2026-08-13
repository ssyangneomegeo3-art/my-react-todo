import React, { useState, useEffect } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import Quote from './components/Quote';
import TodoInput from './components/TodoInput';
import TodoChart from './components/TodoChart';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import ClearCompleted from './components/ClearCompleted';
import './App.css';

// 공통 날짜 포맷팅 도우미 함수 (MM-DD HH:mm)
const getFormattedDate = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${month}-${date} ${hours}:${minutes}`;
};

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: getFormattedDate(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <h1>📋 오늘의 할 일 목록</h1>
      <Quote />
      <TodoInput addTodo={addTodo} />
      <TodoChart todos={todos} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <ClearCompleted
        completedCount={todos.filter((t) => t.completed).length}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;