import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // LocalStorage 동기화
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 1. useCallback: 함수 참조값 재사용 (함수재생성 방지)
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback((id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // 2. useMemo: 필터링 연산 결과 메모이제이션
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }, [todos, filter]);

  // 3. useMemo: Provider 전달 value 객체 메모이제이션
  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      filter,
      setFilter,
      isDarkMode,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleDarkMode,
    }),
    [
      todos,
      filteredTodos,
      filter,
      isDarkMode,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleDarkMode,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo는 TodoProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};