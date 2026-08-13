import React, { useState, useEffect } from 'react';

function Quote() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/quotes/random');
      if (!response.ok) throw new Error('명언을 불러오는데 실패했습니다.');
      const data = await response.json();
      setQuote({ text: data.quote, author: data.author });
    } catch (error) {
      setQuote({
        text: '고통 없이는 얻는 것도 없다.',
        author: '벤저민 프랭클린'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-container">
      <div className="quote-content">
        {loading ? (
          <>
            <p className="quote-text loading">✨ 명언을 불러오는 중...</p>
            <p className="quote-author loading-author">&nbsp;</p>
          </>
        ) : (
          <>
            <p className="quote-text" title={quote.text}>
              "{quote.text}"
            </p>
            <p className="quote-author">- {quote.author}</p>
          </>
        )}
      </div>
      <button
        className="quote-refresh-btn"
        onClick={fetchQuote}
        title="새로운 명언 불러오기"
        disabled={loading}
      >
        🔄
      </button>
    </div>
  );
}

export default Quote;