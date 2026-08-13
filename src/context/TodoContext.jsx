import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context 생성
const TodoContext = createContext();

// 2. Provider 컴포넌트 구현
export const TodoProvider = ({ children }) => {
  // [State 1] 할 일 목록 (LocalStorage 연동)
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my-react-todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('LocalStorage parsing error:', e);
        return [];
      }
    }
    return [
      { id: 1, text: 'React Router 적용하기', completed: true, createdAt: '2026. 08. 12. 오후 02:00:00' },
      { id: 2, text: 'Context API로 전역 상태 관리하기', completed: false, createdAt: '2026. 08. 13. 오전 10:30:00' }
    ];
  });

  // [State 2] 필터링 상태 ('all' | 'active' | 'completed')
  const [filter, setFilter] = useState('all');

  // [State 3] 다크 모드 상태 (LocalStorage 연동)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('my-todo-darkmode');
    return saved ? JSON.parse(saved) : false;
  });

  // LocalStorage 동기화 (todos)
  useEffect(() => {
    localStorage.setItem('my-react-todos', JSON.stringify(todos));
  }, [todos]);

  // LocalStorage 및 body 클래스 동기화 (isDarkMode)
  useEffect(() => {
    localStorage.setItem('my-todo-darkmode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // [Action Handlers]
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString()
    };
    setTodos((prev) => [newTodo, ...prev]);
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
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // 계산된 상태 (Filtered Todos)
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filter,
        setFilter,
        isDarkMode,
        toggleDarkMode,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// 3. 커스텀 훅 (easy access)
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};