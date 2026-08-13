import React, { useState, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { isOnline } = useTodo();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="pwa-status-wrapper">
      {!isOnline && (
        <div className="offline-banner">
          📡 현재 오프라인 상태입니다. (캐시된 데이터로 동작 중)
        </div>
      )}
      {deferredPrompt && !isInstalled && (
        <div className="pwa-install-banner">
          <span>📱 앱으로 설치하고 편리하게 이용하세요!</span>
          <button onClick={handleInstallClick} className="pwa-install-btn">
            설치하기
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(PwaInstallPrompt);