import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

function TodoChart({ todos }) {
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  useEffect(() => {
    if (!canvasRef.current) return;

    // 할 일이 아예 없을 때는 빈 차트 형태(회색) 유지
    const chartData = totalCount === 0 ? [1, 0] : [activeCount, completedCount];
    const chartColors = totalCount === 0 
      ? ['#e2e8f0', '#cbd5e1'] 
      : ['#3b82f6', '#10b981'];

    if (chartInstanceRef.current) {
      // 기존 차트가 있으면 데이터만 업데이트하여 부드러운 애니메이션 실행
      const chart = chartInstanceRef.current;
      chart.data.datasets[0].data = chartData;
      chart.data.datasets[0].backgroundColor = chartColors;
      chart.update();
      return;
    }

    // 신규 차트 인스턴스 생성
    const ctx = canvasRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['진행 중', '완료'],
        datasets: [
          {
            data: chartData,
            backgroundColor: chartColors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: totalCount > 0 },
        },
        cutout: '70%',
        animation: { duration: 400 },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeCount, completedCount, totalCount]);

  return (
    <div className="chart-container">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default TodoChart;