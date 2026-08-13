import React from 'react';
import { useTodo } from '../context/TodoContext';

const CATEGORIES = ['전체', '공부', '업무', '개인', '기타'];

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useTodo();

  return (
    <div className="category-filter-container">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`category-badge-btn ${selectedCategory === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default React.memo(CategoryFilter);