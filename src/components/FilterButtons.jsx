import React from 'react';
import { useTodo } from '../context/TodoContext';

function FilterButtons() {
  const { filter, setFilter } = useTodo();

  return (
    <div className="filter-buttons">
      <button
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => setFilter('all')}
      >
        전체
      </button>
      <button
        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        onClick={() => setFilter('active')}
      >
        진행 중
      </button>
      <button
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => setFilter('completed')}
      >
        완료
      </button>
    </div>
  );
}

export default FilterButtons;