import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useTodo } from '../context/TodoContext';

function TodoChart() {
  const { todos, isDarkMode } = useTodo();
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.data.datasets[0].data = [activeCount, completedCount];
      chartInstanceRef.current.data.datasets[0].backgroundColor = isDarkMode
        ? ['#38bdf8', '#34d399']
        : ['#0284c7', '#10b981'];
      chartInstanceRef.current.update();
    } else {
      chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['진행 중', '완료됨'],
          datasets: [
            {
              data: [activeCount, completedCount],
              backgroundColor: isDarkMode ? ['#38bdf8', '#34d399'] : ['#0284c7', '#10b981'],
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: isDarkMode ? '#f8fafc' : '#334155'
              }
            }
          }
        }
      });
    }
  }, [activeCount, completedCount, isDarkMode]);

  return (
    <div className="chart-wrapper">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default TodoChart;