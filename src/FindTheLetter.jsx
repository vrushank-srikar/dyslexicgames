import React, { useState, useEffect } from 'react';

const FindTheLetter = ({ onComplete }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const [targetLetter, setTargetLetter] = useState(getRandomLetter());
  const [letters, setLetters] = useState(generateRandomLetters(targetLetter));
  const [feedback, setFeedback] = useState({});
  const [score, setScore] = useState(0);

  function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  function generateRandomLetters(target) {
    const shuffled = [...alphabet].sort(() => 0.5 - Math.random());
    const randomLetters = shuffled.slice(0, 5);
    randomLetters.push(target);
    return randomLetters.sort(() => 0.5 - Math.random());
  }

  useEffect(() => {
    const audio = new Audio();
    audio.src = `path/to/audio/find-the-letter-${targetLetter.toLowerCase()}.mp3`;
    audio.play().catch((err) => console.log('Audio not supported:', err));
  }, [targetLetter]);

  const handleLetterClick = (letter) => {
    if (letter === targetLetter) {
      setFeedback({ [letter]: true });
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete(); // Signal completion to App.jsx
      } else {
        setTimeout(() => {
          const newTarget = getRandomLetter();
          setTargetLetter(newTarget);
          setLetters(generateRandomLetters(newTarget));
          setFeedback({});
        }, 1000);
      }
    } else {
      setFeedback({ [letter]: false });
      setTimeout(() => setFeedback({}), 1000);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Find the Letter</h1>
      <p>Find the letter '{targetLetter}'</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '20px' }}>
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            style={{
              width: '60px',
              height: '60px',
              fontSize: '24px',
              margin: '5px',
              backgroundColor: feedback[letter] === true ? '#90ee90' : feedback[letter] === false ? '#ff6347' : '#fff',
              border: '2px solid #000',
              cursor: 'pointer',
            }}
          >
            {letter}
          </button>
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default FindTheLetter;