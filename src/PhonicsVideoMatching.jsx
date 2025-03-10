import React, { useState, useEffect } from 'react';

const PhonicsVideoMatching = ({ onComplete }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [targetLetter, setTargetLetter] = useState(getRandomLetter());
  const [letters, setLetters] = useState(generateRandomLetters(targetLetter));
  const [droppedLetter, setDroppedLetter] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);

  function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function generateRandomLetters(target) {
    const shuffled = [...alphabet].sort(() => 0.5 - Math.random());
    const randomLetters = shuffled.slice(0, 3);
    randomLetters.push(target);
    return randomLetters.sort(() => 0.5 - Math.random());
  }

  useEffect(() => {
    const audio = new Audio();
    audio.src = `path/to/phonics/${targetLetter.toLowerCase()}.mp3`;
    audio.play().catch((err) => console.log('Audio not supported:', err));
  }, [targetLetter]);

  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    setDroppedLetter(letter);
    if (letter === targetLetter) {
      setFeedback('Correct!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete(); // Signal completion to App.jsx
      } else {
        setTimeout(() => {
          const newTarget = getRandomLetter();
          setTargetLetter(newTarget);
          setLetters(generateRandomLetters(newTarget));
          setDroppedLetter(null);
          setFeedback(null);
        }, 1000);
      }
    } else {
      setFeedback('Try Again!');
      setTimeout(() => {
        setDroppedLetter(null);
        setFeedback(null);
      }, 1000);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Phonics Video Matching</h1>
      <p>Match the sound to the letter!</p>
      <div style={{ margin: '20px' }}>
        <p>Playing sound for: <strong>{targetLetter}</strong></p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {letters.map((letter, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, letter)}
            style={{
              width: '60px',
              height: '60px',
              fontSize: '24px',
              lineHeight: '60px',
              backgroundColor: '#f0f0f0',
              border: '2px solid #000',
              cursor: 'grab',
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '100px',
          height: '100px',
          margin: '0 auto',
          backgroundColor: droppedLetter ? (droppedLetter === targetLetter ? '#90ee90' : '#ff6347') : '#e0e0e0',
          border: '3px dashed #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        {droppedLetter || 'Drop Here'}
      </div>
      {feedback && <p style={{ marginTop: '20px', color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</p>}
      <p style={{ marginTop: '20px' }}>Score: {score}</p>
    </div>
  );
};

export default PhonicsVideoMatching;