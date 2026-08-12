import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css';

function App() {
  // 1. 상태(State) 정의
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 기초 개념 공부하기', completed: false },
    { id: 2, text: 'Vite 개발 환경 세팅하기', completed: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');

  // 명언 상태
  const [quote, setQuote] = useState({ message: '', author: '' });
  const [isLoadingQuote, setIsLoadingQuote] = useState(false);

  // 차트 canvas 참조용 Ref
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // --- [기능 1] API 명언 가져오기 ---
  const fetchQuote = async () => {
    setIsLoadingQuote(true);
    try {
      const response = await fetch('https://korean-advice-open-api.vercel.app/api/advice');
      if (!response.ok) throw new Error('실패');
      const data = await response.json();
      setQuote({ message: data.message, author: data.author });
    } catch (error) {
      setQuote({ message: '⚠️ 명언을 불러오지 못했습니다.', author: '' });
    } finally {
      setIsLoadingQuote(false);
    }
  };

  // 컴포넌트 첫 화면 등장 시 1회 실행
  useEffect(() => {
    fetchQuote();
  }, []);

  // --- [기능 2] Chart.js 도넛 차트 그리기 ---
  useEffect(() => {
    if (!canvasRef.current) return;

    const totalCount = todos.length;
    const completedCount = todos.filter(t => t.completed).length;
    const activeCount = totalCount - completedCount;

    // 기존 차트가 있다면 삭제 (중복 생성 에러 방지)
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // 새 차트 생성
    chartInstanceRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: ['완료됨', '진행 중'],
        datasets: [{
          data: [completedCount, activeCount],
          backgroundColor: ['#4CAF50', '#FF9800'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [todos]); // todos 배열 데이터가 바뀔 때마다 차트가 알아서 다시 그려짐!

  // --- [기능 3] 할 일 추가 / 삭제 / 토글 ---
  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: inputText, completed: false }]);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddTodo();
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // 필터링 목록 및 달성률 계산
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const rate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ padding: '30px', maxWidth: '380px', margin: '40px auto', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', fontSize: '22px', color: '#333', marginTop: 0 }}>React 오늘의 할 일</h1>

      {/* 명언 영역 */}
      <div style={{ background: '#eef6ff', borderLeft: '4px solid #2196F3', padding: '12px', marginBottom: '20px', borderRadius: '6px', position: 'relative' }}>
        {isLoadingQuote ? (
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>명언 불러오는 중...</p>
        ) : (
          <>
            <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontStyle: 'italic', color: '#333' }}>"{quote.message}"</p>
            <span style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>- {quote.author}</span>
          </>
        )}
        <button
          onClick={fetchQuote}
          style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}
          title="새 명언"
        >
          🔄
        </button>
      </div>

      {/* 입력 영역 */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하세요..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', outline: 'none' }}
        />
        <button
          onClick={handleAddTodo}
          style={{ padding: '10px 15px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          추가
        </button>
      </div>

      {/* 필터 버튼 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '15px' }}>
        {['all', 'active', 'completed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              background: filter === type ? '#2196F3' : '#f0f0f0',
              color: filter === type ? 'white' : '#555',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: filter === type ? 'bold' : 'normal'
            }}
          >
            {type === 'all' ? '전체' : type === 'active' ? '진행 중' : '완료'}
          </button>
        ))}
      </div>

      {/* Chart.js 도넛 차트 */}
      <div style={{ width: '180px', margin: '15px auto', textAlign: 'center' }}>
        <canvas ref={canvasRef}></canvas>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginTop: '8px' }}>
          달성률: {rate}%
        </div>
      </div>

      {/* 할 일 목록 */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filteredTodos.length === 0 ? (
          <li style={{ textAlign: 'center', color: '#aaa', fontSize: '13px', padding: '10px 0' }}>해당하는 항목이 없습니다.</li>
        ) : (
          filteredTodos.map(todo => (
            <li
              key={todo.id}
              style={{
                background: '#f9f9f9',
                padding: '10px 15px',
                borderRadius: '5px',
                marginBottom: '8px',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span
                onClick={() => handleToggleTodo(todo.id)}
                style={{
                  cursor: 'pointer',
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : '#333'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '5px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                삭제
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;