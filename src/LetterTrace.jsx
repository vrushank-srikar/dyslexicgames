import React, { useState } from 'react';

const LetterTrace = ({ onComplete }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [currentLetter, setCurrentLetter] = useState(alphabet[0]);
  const [score, setScore] = useState(0);
  const [traceStarted, setTraceStarted] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0); // Tracks swipe progress (0 to 100%)

  // Start tracing
  const handleTraceStart = (e) => {
    setTraceStarted(true);
    setTraceProgress(0); // Reset progress
  };

  // Track movement during tracing
  const handleTraceMove = (e) => {
    if (!traceStarted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.type === 'mousemove' ? e.clientX : e.touches[0].clientX) - rect.left;
    const progress = Math.min(100, Math.max(0, (x / rect.width) * 100)); // Percentage of width swiped
    setTraceProgress(progress);
  };

  // End tracing
  const handleTraceEnd = () => {
    if (traceStarted && traceProgress >= 80) { // Consider traced if 80% of width covered
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete(); // Signal completion to App.jsx
      } else {
        setCurrentLetter(alphabet[(alphabet.indexOf(currentLetter) + 1) % alphabet.length]);
      }
    }
    setTraceStarted(false);
    setTraceProgress(0); // Reset for next trace
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Letter Trace</h1>
      <p>Trace the letter '{currentLetter}' by swiping across it!</p>
      <div
        onMouseDown={handleTraceStart}
        onMouseMove={handleTraceMove}
        onMouseUp={handleTraceEnd}
        onMouseLeave={handleTraceEnd} // End if mouse leaves area
        onTouchStart={handleTraceStart}
        onTouchMove={handleTraceMove}
        onTouchEnd={handleTraceEnd}
        style={{
          width: '200px',
          height: '200px',
          margin: '20px auto',
          fontSize: '100px',
          lineHeight: '200px',
          border: '2px dashed #000',
          background: `linear-gradient(to right, #90ee90 ${traceProgress}%, #fff ${traceProgress}%)`,
          position: 'relative',
          userSelect: 'none',
          cursor: 'pointer',
        }}
      >
        {currentLetter}
      </div>
      <p>Score: {score}</p>
      <p>Swipe left to right across the letter to trace it!</p>
    </div>
  );
};

export default LetterTrace;