export default function ClearCompleted({ onClearCompleted, completedCount }) {
  if (completedCount === 0) return null;

  return (
    <button onClick={onClearCompleted} className="clear-btn">
      완료된 항목 전체 삭제 ({completedCount}개)
    </button>
  );
}