import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav-tabs">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        end
      >
        📋 할 일 목록
      </NavLink>
      <NavLink
        to="/stats"
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
      >
        📊 상세 통계
      </NavLink>
    </nav>
  );
}

export default Navigation;