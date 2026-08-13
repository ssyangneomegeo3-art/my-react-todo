import React from 'react';
import { useTodo } from '../context/TodoContext';

const TodoSort = () => {
  const { sortBy, setSortBy } = useTodo();

  return (
    <div className="todo-sort-container">
      <label htmlFor="sort-select" className="sort-label">
        🔀 정렬:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-select"
      >
        <option value="latest">최신등록순</option>
        <option value="oldest">오래된순</option>
        <option value="alphabetical">가나다순</option>
        <option value="category">카테고리순</option>
      </select>
    </div>
  );
};

export default React.memo(TodoSort);