import React from 'react';
import TodoChart from '../components/TodoChart';
import DataBackup from '../components/DataBackup';
import { useTodo } from '../context/TodoContext';

function StatsPage() {
  const { todos } = useTodo();

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 카테고리별 통계 계산
  const categories = ['공부', '업무', '개인', '기타'];
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = todos.filter((t) => (t.category || '기타') === cat).length;
    return acc;
  }, {});

  return (
    <div className="page-container stats-page">
      <h2 className="stats-title">📊 상세 통계 리포트</h2>
      
      <div className="stats-summary-grid">
        <div className="stat-card">
          <span className="stat-label">전체 할 일</span>
          <span className="stat-value">{total}개</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">진행 중</span>
          <span className="stat-value active-val">{active}개</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">완료됨</span>
          <span className="stat-value completed-val">{completed}개</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">달성률</span>
          <span className="stat-value rate-val">{rate}%</span>
        </div>
      </div>

      <TodoChart />

      <div className="category-stats-card">
        <h3>🏷️ 카테고리별 분포</h3>
        <div className="category-stats-list">
          {categories.map((cat) => (
            <div key={cat} className="category-stat-item">
              <span className={`category-tag category-${cat}`}>{cat}</span>
              <span className="category-count">{categoryCounts[cat]}개</span>
            </div>
          ))}
        </div>
      </div>

      <div className="backup-section">
        <h3>💾 데이터 백업 및 복원</h3>
        <p className="backup-desc">JSON 파일로 데이터를 안전하게 보관하고 복원하세요.</p>
        <DataBackup />
      </div>
    </div>
  );
}

export default StatsPage;