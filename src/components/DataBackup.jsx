import React, { useRef } from 'react';
import { useTodo } from '../context/TodoContext';

function DataBackup() {
  const { exportData, importData, showToast } = useTodo();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importData(parsed);
      } catch (err) {
        showToast('❌ JSON 데이터 파일 읽기에 실패했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="data-backup-container">
      <button onClick={exportData} className="backup-btn export-btn">
        📥 JSON 백업 다운로드
      </button>
      <button onClick={() => fileInputRef.current.click()} className="backup-btn import-btn">
        📤 JSON 데이터 복원
      </button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default React.memo(DataBackup);