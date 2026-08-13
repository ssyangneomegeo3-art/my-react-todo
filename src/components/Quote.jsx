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
    <div
      className="quote-box"
      style={{
        height: '80px',
        minHeight: '80px',
        maxHeight: '80px',
        width: '100%',
        flexShrink: 0,
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '16px',
      }}
    >
      <div className="quote-content" style={{ paddingRight: '32px', overflow: 'hidden' }}>
        <p
          className="quote-text"
          style={{
            margin: 0,
            fontSize: '13px',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          "{quote.text}"
        </p>
        {quote.author && (
          <span className="quote-author" style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px', display: 'block' }}>
            - {quote.author}
          </span>
        )}
      </div>
      <button
        onClick={fetchQuote}
        className="quote-refresh-btn"
        disabled={loading}
        aria-label="명언 새로고침"
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
        }}
      >
        {loading ? '...' : '🔄'}
      </button>
    </div>
  );
};

export default memo(Quote);