import { useState, useEffect } from 'react';

export default function Quote() {
  const [quote, setQuote] = useState({ text: '로딩 중...', author: '' });
  const [loading, setLoading] = useState(false);

  // 명언을 가져오는 독립 함수
  const fetchQuote = () => {
    setLoading(true);
    fetch('https://dummyjson.com/quotes/random')
      .then((res) => res.json())
      .then((data) => {
        setQuote({ text: data.quote, author: data.author });
        setLoading(false);
      })
      .catch(() => {
        setQuote({ text: '오늘의 명언을 불러오지 못했습니다.', author: '' });
        setLoading(false);
      });
  };

  // 최초 1회 실행
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-box">
      <div className="quote-header">
        <p className="quote-text">"{quote.text}"</p>
        <button
          className="quote-refresh-btn"
          onClick={fetchQuote}
          disabled={loading}
          title="새 명언 불러오기"
        >
          🔄
        </button>
      </div>
      <small className="quote-author">- {quote.author || '익명'}</small>
    </div>
  );
}