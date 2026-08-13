import React, { useState, useEffect, memo } from 'react';
import { useTodo } from '../context/TodoContext';

const Toast = () => {
  const { toastMessage, clearToast } = useTodo();
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setVisible(true);
      setIsExiting(false);

      // 1.5초 후에 천천히 퇴장하는 모션 시작
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 1500);

      // 2.0초 후에 DOM에서 완전히 제거
      const removeTimer = setTimeout(() => {
        setVisible(false);
        clearToast();
      }, 2000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [toastMessage, clearToast]);

  if (!visible || !toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        backgroundColor: '#1e293b',
        color: '#ffffff',
        padding: '10px 22px',
        borderRadius: '24px',
        fontSize: '13px',
        fontWeight: '500',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
        zIndex: 1000,
        pointerEvents: 'none',
        animation: isExiting
          ? 'toastSlideOut 0.5s cubic-bezier(0.4, 0, 1, 1) forwards'
          : 'toastSlideIn 0.2s cubic-bezier(0, 0, 0.2, 1) forwards',
      }}
    >
      {toastMessage}
    </div>
  );
};

export default memo(Toast);