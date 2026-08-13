import React from 'react';
import Quote from '../components/Quote';
import TodoInput from '../components/TodoInput';
import FilterButtons from '../components/FilterButtons';
import TodoList from '../components/TodoList';
import ClearCompleted from '../components/ClearCompleted';

function MainPage() {
  return (
    <div className="page-container main-page">
      <Quote />
      <TodoInput />
      <FilterButtons />
      <TodoList />
      <ClearCompleted />
    </div>
  );
}

export default MainPage;