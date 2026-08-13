import React from 'react';
import Quote from '../components/Quote';
import TodoInput from '../components/TodoInput';
import TodoSearch from '../components/TodoSearch';
import FilterButtons from '../components/FilterButtons';
import CategoryFilter from '../components/CategoryFilter';
import TodoSort from '../components/TodoSort';
import TodoList from '../components/TodoList';
import ClearCompleted from '../components/ClearCompleted';

const MainPage = () => {
  return (
    <div className="main-page">
      <Quote />
      <TodoInput />
      
      <div className="toolbar-section">
        <TodoSearch />
        <TodoSort />
      </div>

      <CategoryFilter />
      <FilterButtons />
      
      <TodoList />
      <ClearCompleted />
    </div>
  );
};

export default React.memo(MainPage);