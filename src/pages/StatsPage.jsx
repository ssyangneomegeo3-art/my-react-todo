import React from 'react';
import TodoChart from '../components/TodoChart';

function StatsPage({ todos }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;
  const completionRate =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="page-content stats-page">
      <h2>📊 할 일 달성 통계</h2>
      <p className="stats-subtitle">현재 할 일들의 달성 현황 분석입니다.</p>

      <TodoChart todos={todos} />

      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-label">전체 할 일</span>
          <span className="stat-value">{totalCount}개</span>
        </div>
        <div className="stat-card active-card">
          <span className="stat-label">진행 중</span>
          <span className="stat-value">{activeCount}개</span>
        </div>
        <div className="stat-card completed-card">
          <span className="stat-label">완료됨</span>
          <span className="stat-value">{completedCount}개</span>
        </div>
        <div className="stat-card rate-card">
          <span className="stat-label">달성률</span>
          <span className="stat-value">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPage;