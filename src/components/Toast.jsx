import React, { useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

function Toast() {
  const { toastMessage, clearToast } = useTodo();

  useEffect(() => {
    if (!toastMessage) return;

    // 0.2초 슬라이드 인 + 1.9초 대기 + 0.5초 퇴장 = 2.6초 후 스토어 상태 초기화
    const timer = setTimeout(() => {
      clearToast();
    }, 2600);

    return () => clearTimeout(timer);
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}

export default React.memo(Toast);