import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-container">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        end
      >
        📋 할 일 목록
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      >
        📊 상세 통계
      </NavLink>
    </nav>
  );
}

export default Navigation;