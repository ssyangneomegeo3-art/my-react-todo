import React, { useState, memo } from 'react';
import { useTodo } from '../context/TodoContext';

const TodoSearch = () => {
  const { searchQuery, setSearchQuery } = useTodo();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setSearchQuery('');
    setIsOpen(false);
  };

  return (
    <div className="todo-search-wrapper" style={{ margin: '8px 0 16px 0', display: 'flex', justifyContent: 'flex-end' }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="search-toggle-btn"
          aria-label="검색창 열기"
          style={{
            background: 'transparent',
            border: '1px solid #cbd5e1',
            borderRadius: '20px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'inherit',
            transition: 'all 0.2s ease',
          }}
        >
          🔍 <span>검색</span>
          {searchQuery && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'inline-block',
              }}
            />
          )}
        </button>
      ) : (
        <div
          className="search-input-box"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
          }}
        >
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              className="search-input"
              placeholder="🔍 할 일 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '8px 32px 8px 12px',
                borderRadius: '8px',
                border: '1px solid #3b82f6',
                boxSizing: 'border-box',
                outline: 'none',
                fontSize: '14px',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                }}
              >
                ✕
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#64748b',
              whiteSpace: 'nowrap',
              padding: '4px 8px',
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(TodoSearch);