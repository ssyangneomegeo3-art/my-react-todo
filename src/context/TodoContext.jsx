import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return parsed.map((todo) => ({
        ...todo,
        category: todo.category || '기타',
      }));
    } catch (e) {
      console.error('Failed to parse todos from localStorage', e);
      return [];
    }
  });

  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 다크 모드 동기화 (body 및 html 클래스 동시 제어)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark', 'dark-mode');
      document.body.classList.add('dark', 'dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark', 'dark-mode');
      document.body.classList.remove('dark', 'dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 온라인 / 오프라인 감지
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setToastMessage('🌐 인터넷 연결이 복구되었습니다.');
    };
    const handleOffline = () => {
      setIsOnline(false);
      setToastMessage('📡 오프라인 상태입니다. (저장 기능은 오프라인에서도 작동합니다)');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // LocalStorage 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const clearToast = useCallback(() => {
    setToastMessage('');
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      showToast(next ? '🌙 다크 모드가 설정되었습니다.' : '☀️ 라이트 모드가 설정되었습니다.');
      return next;
    });
  }, [showToast]);

  const addTodo = useCallback((text, category = '개인') => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      category,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setTodos((prev) => [newTodo, ...prev]);
    showToast('✨ 새로운 할 일이 추가되었습니다!');
  }, [showToast]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          const updated = !todo.completed;
          showToast(updated ? '🎉 할 일을 완료했습니다!' : '🔄 할 일을 진행 중으로 변경했습니다.');
          return { ...todo, completed: updated };
        }
        return todo;
      })
    );
  }, [showToast]);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    showToast('🗑️ 항목이 삭제되었습니다.');
  }, [showToast]);

  const editTodo = useCallback((id, newText, newCategory) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim(), category: newCategory || todo.category } : todo
      )
    );
    showToast('✏️ 할 일이 수정되었습니다.');
  }, [showToast]);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => {
      const activeCount = prev.filter((todo) => !todo.completed).length;
      const removedCount = prev.length - activeCount;
      if (removedCount > 0) {
        showToast(`🧹 완료된 항목 ${removedCount}개가 삭제되었습니다.`);
      }
      return prev.filter((todo) => !todo.completed);
    });
  }, [showToast]);

  const exportData = useCallback(() => {
    if (todos.length === 0) {
      showToast('⚠️ 백업할 할 일 데이터가 없습니다.');
      return;
    }
    const dataStr = JSON.stringify(todos, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `todo_backup_${today}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📥 JSON 백업 파일이 다운로드되었습니다.');
  }, [todos, showToast]);

  const importData = useCallback((importedTodos) => {
    if (!Array.isArray(importedTodos)) {
      showToast('❌ 올바르지 않은 데이터 형식입니다.');
      return;
    }
    const validated = importedTodos.map((item) => ({
      id: item.id || Date.now() + Math.random(),
      text: item.text || '제목 없음',
      completed: Boolean(item.completed),
      category: item.category || '기타',
      createdAt: item.createdAt || new Date().toLocaleString('ko-KR'),
    }));
    setTodos(validated);
    showToast(`📤 ${validated.length}개의 할 일을 성공적으로 복원했습니다!`);
  }, [showToast]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesStatus =
        filter === 'all'
          ? true
          : filter === 'active'
          ? !todo.completed
          : todo.completed;

      const matchesCategory =
        selectedCategory === '전체' ? true : todo.category === selectedCategory;

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [todos, filter, selectedCategory, searchQuery]);

  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      filter,
      setFilter,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
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
    }),
    [
      todos,
      filteredTodos,
      filter,
      selectedCategory,
      searchQuery,
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
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};