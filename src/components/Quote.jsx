import React, { useState, useEffect, useCallback, memo } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState({ text: '명언을 불러오는 중...', author: '' });
  const [loading, setLoading] = useState(false);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');
      const data = await res.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (error) {
      setQuote({ text: '명언을 불러오는 데 실패했습니다.', author: '' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="quote-box">
      <p className="quote-text">{quote.text}</p>
      {quote.author && <span className="quote-author">- {quote.author}</span>}
      <button
        onClick={fetchQuote}
        className="quote-refresh-btn"
        disabled={loading}
        aria-label="명언 새로고침"
      >
        {loading ? '...' : '🔄'}
      </button>
    </div>
  );
};

export default memo(Quote);