import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TodoChart({ completedCount, pendingCount }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. 차트가 최초 1회 생성될 때만 인스턴스 생성
    if (!chartInstanceRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['완료', '미완료'],
          datasets: [{
            data: [completedCount, pendingCount],
            backgroundColor: ['#4CAF50', '#FF9800'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 600 // 0.6초간 부드럽게 비율 변환 애니메이션 적용
          }
        }
      });
    } else {
      // 2. 이미 차트가 있다면 데이터만 갱신하고 update() 호출 (애니메이션 유지)
      chartInstanceRef.current.data.datasets[0].data = [completedCount, pendingCount];
      chartInstanceRef.current.update();
    }
  }, [completedCount, pendingCount]);

  // 컴포넌트가 완전히 사라질 때만 차트 메모리 해제
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: '200px', marginBottom: '20px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}