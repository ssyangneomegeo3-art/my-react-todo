import React from 'react';
import Quote from '../components/Quote';
import TodoInput from '../components/TodoInput';
import FilterButtons from '../components/FilterButtons';
import TodoList from '../components/TodoList';
import ClearCompleted from '../components/ClearCompleted';

function MainPage({
  todos,
  filter,
  setFilter,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
}) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="page-content">
      <Quote />
      <TodoInput addTodo={addTodo} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <ClearCompleted
        completedCount={completedCount}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default MainPage;