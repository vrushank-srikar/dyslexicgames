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
    const distractors = alphabet.filter(letter => letter !== target);
    const randomLetters = [];
  
    while (randomLetters.length < 5) {
      const rand = distractors[Math.floor(Math.random() * distractors.length)];
      if (!randomLetters.includes(rand)) {
        randomLetters.push(rand);
      }
    }
  
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
        onComplete();
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
    <div className="find-letter-container">
      <style>{`
        .find-letter-container {
          text-align: center;
          padding: 40px 20px;
          background-color: #fdfdfd;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #222;
        }
        .find-letter-title {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .find-letter-instruction {
          font-size: 1rem;
          margin-bottom: 30px;
        }
        .letter-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 30px;
        }
        .letter-button {
          height: 70px;
          font-size: 28px;
          font-weight: bold;
          border: 2px solid #333;
          background-color: #ffffff;
          color: #333;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .letter-button:hover {
          background-color: #f0f0f0;
          transform: scale(1.05);
        }
        .letter-button.correct {
          background-color: #c8f7c5;
          border-color: #2e7d32;
          color: #2e7d32;
        }
        .letter-button.incorrect {
          background-color: #fddede;
          border-color: #c62828;
          color: #c62828;
        }
        .score-display {
          font-size: 1.2rem;
          font-weight: 500;
          color: #555;
        }
      `}</style>

      <h1 className="find-letter-title">Find the Letter</h1>
      <p className="find-letter-instruction">Find the letter '{targetLetter}'</p>
      <div className="letter-grid">
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            className={`letter-button ${
              feedback[letter] === true
                ? 'correct'
                : feedback[letter] === false
                ? 'incorrect'
                : ''
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
      <p className="score-display">Score: {score}</p>
    </div>
  );
};

export default FindTheLetter;
