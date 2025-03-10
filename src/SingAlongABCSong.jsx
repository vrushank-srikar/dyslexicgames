import React, { useState, useEffect } from 'react';

const SingAlongABCSong = ({ onComplete }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Simulate song playback and letter highlighting
  useEffect(() => {
    let interval;
    if (isPlaying) {
      const audio = new Audio();
      audio.src = 'path/to/abc-song.mp3'; // Replace with real ABC song file
      audio.play().catch((err) => console.log('Audio not supported:', err));

      interval = setInterval(() => {
        setCurrentLetterIndex((prev) => {
          if (prev >= alphabet.length - 1) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0; // Reset to A after song ends
          }
          return prev + 1;
        });
      }, 1000); // Change letter every 1 second (adjust to match song timing)
    }
    return () => clearInterval(interval); // Cleanup on unmount or stop
  }, [isPlaying]);

  // Handle letter click (child "sings along")
  const handleLetterClick = (letter, index) => {
    if (index === currentLetterIndex && isPlaying) {
      setFeedback('Great singing!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        setTimeout(() => {
          setIsPlaying(false);
          onComplete(); // Signal completion to App.jsx
        }, 1000);
      }
      setTimeout(() => setFeedback(null), 1000);
    } else {
      setFeedback('Try again when it’s the right letter!');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  // Start or stop the song
  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (!isPlaying) {
      setCurrentLetterIndex(0); // Start from A when playing
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Sing Along ABC Song</h1>
      <p>Sing along with the ABC song and click the highlighted letter!</p>
      <button
        onClick={togglePlay}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          margin: '10px',
          backgroundColor: isPlaying ? '#ff6347' : '#90ee90',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isPlaying ? 'Stop Song' : 'Play Song'}
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', margin: '20px' }}>
        {alphabet.map((letter, index) => (
          <div
            key={index}
            onClick={() => handleLetterClick(letter, index)}
            style={{
              width: '50px',
              height: '50px',
              fontSize: '24px',
              backgroundColor: index === currentLetterIndex && isPlaying ? '#90ee90' : '#f0f0f0',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      {feedback && <p style={{ color: feedback === 'Great singing!' ? 'green' : 'red' }}>{feedback}</p>}
      <p>Score: {score}</p>
    </div>
  );
};

export default SingAlongABCSong;