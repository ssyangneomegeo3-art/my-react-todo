import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  // 1. Initial State Load
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('react-todos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load todos from localStorage', e);
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // all | active | completed
  const [selectedCategory, setSelectedCategory] = useState('전체'); // 전체 | 공부 | 업무 | 개인 | 기타
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // latest | oldest | alphabetical | category
  const [toastMessage, setToastMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 2. LocalStorage & Theme Sync
  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 3. Network Status Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 4. Toast Handler
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage('');
  }, []);

  // 5. Confetti Effect Trigger
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
      disableForReducedMotion: true,
    });
  }, []);

  // 6. Todo Event Handlers
  const addTodo = useCallback((text, category = '기타') => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      category: category,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    showToast('✨ 새로운 할 일이 추가되었습니다!');
  }, [showToast]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const nextState = !todo.completed;
          if (nextState) {
            triggerConfetti();
            showToast('🎉 할 일을 완료했습니다!');
          } else {
            showToast('🔄 할 일을 진행 중으로 변경했습니다.');
          }
          return { ...todo, completed: nextState };
        }
        return todo;
      })
    );
  }, [showToast, triggerConfetti]);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    showToast('🗑️ 할 일이 삭제되었습니다.');
  }, [showToast]);

  const editTodo = useCallback((id, newText, newCategory) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim(), category: newCategory || todo.category } : todo
      )
    );
    showToast('✏️ 할 일이 수정되었습니다.');
  }, [showToast]);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    showToast('🧹 완료된 할 일을 모두 정리했습니다.');
  }, [showToast]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  // 7. Backup Export / Import
  const exportData = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(todos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `todo_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('💾 데이터 백업 파일이 다운로드되었습니다.');
  }, [todos, showToast]);

  const importData = useCallback((importedTodos) => {
    if (Array.isArray(importedTodos)) {
      setTodos(importedTodos);
      showToast('📥 백업 데이터를 성공적으로 복원했습니다.');
    } else {
      showToast('⚠️ 올바르지 않은 백업 파일 형식입니다.');
    }
  }, [showToast]);

  // 8. Multi-layer Filtering & Sorting (Memoized)
  const filteredAndSortedTodos = useMemo(() => {
    // Stage 1: Filtering
    let result = todos.filter((todo) => {
      // Status Filter
      if (filter === 'active' && todo.completed) return false;
      if (filter === 'completed' && !todo.completed) return false;

      // Category Filter
      if (selectedCategory !== '전체' && todo.category !== selectedCategory) return false;

      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const textMatch = todo.text.toLowerCase().includes(query);
        const categoryMatch = todo.category.toLowerCase().includes(query);
        if (!textMatch && !categoryMatch) return false;
      }

      return true;
    });

    // Stage 2: Sorting
    return result.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || a.id) - new Date(b.createdAt || b.id);
      }
      if (sortBy === 'alphabetical') {
        return a.text.localeCompare(b.text, 'ko');
      }
      if (sortBy === 'category') {
        return a.category.localeCompare(b.category, 'ko');
      }
      return 0;
    });
  }, [todos, filter, selectedCategory, searchQuery, sortBy]);

  const value = useMemo(() => ({
    todos,
    filteredTodos: filteredAndSortedTodos,
    filter,
    setFilter,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    toastMessage,
    showToast,
    clearToast,
    isDarkMode,
    toggleDarkMode,
    isOnline,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    exportData,
    importData,
    triggerConfetti,
  }), [
    todos,
    filteredAndSortedTodos,
    filter,
    selectedCategory,
    searchQuery,
    sortBy,
    toastMessage,
    showToast,
    clearToast,
    isDarkMode,
    toggleDarkMode,
    isOnline,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    exportData,
    importData,
    triggerConfetti,
  ]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};