import React from 'react';
import TodoChart from '../components/TodoChart';
import { useTodo } from '../context/TodoContext';

function StatsPage() {
  const { todos } = useTodo();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="page-container stats-page">
      <h2>📊 상세 학습 통계</h2>
      <TodoChart />
      <div className="stats-cards">
        <div className="stat-card">
          <span className="label">전체 할 일</span>
          <span className="value">{total}개</span>
        </div>
        <div className="stat-card">
          <span className="label">진행 중</span>
          <span className="value active">{active}개</span>
        </div>
        <div className="stat-card">
          <span className="label">완료됨</span>
          <span className="value completed">{completed}개</span>
        </div>
        <div className="stat-card">
          <span className="label">달성률</span>
          <span className="value rate">{rate}%</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;