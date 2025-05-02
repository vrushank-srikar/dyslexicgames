import React, { useState } from 'react';

const GuessTheMissingLetter = ({ onComplete }) => {
  const words = [
    { full: 'CAT', partial: '_AT', answer: 'C' },
    { full: 'DOG', partial: 'D_G', answer: 'O' },
    { full: 'BAT', partial: 'B_T', answer: 'A' },
    { full: 'SUN', partial: 'S_N', answer: 'U' },
    { full: 'HAT', partial: '_AT', answer: 'H' },
  ];

  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [options, setOptions] = useState(generateOptions(currentWord.answer));
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function generateOptions(correctAnswer) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const filteredAlphabet = alphabet.filter(letter => letter !== correctAnswer.toUpperCase());
    const wrongOptions = filteredAlphabet.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [correctAnswer.toUpperCase(), ...wrongOptions].sort(() => 0.5 - Math.random());
    return allOptions;
  }

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    if (letter === currentWord.answer.toUpperCase()) {
      setFeedback('Correct!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete();
      } else {
        setTimeout(() => {
          const newWord = getRandomWord();
          setCurrentWord(newWord);
          setOptions(generateOptions(newWord.answer));
          setFeedback(null);
          setSelectedLetter(null);
        }, 1000);
      }
    } else {
      setFeedback('Try Again!');
      setTimeout(() => {
        setFeedback(null);
        setSelectedLetter(null);
      }, 1000);
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

      <h1 className="find-letter-title">Guess the Missing Letter</h1>
      <p className="find-letter-instruction">
        Fill in the blank: <strong>{currentWord.partial}</strong>
      </p>

      <div className="letter-grid">
        {options.map((letter, index) => (
          <button
            key={index}
            className={`letter-button ${
              selectedLetter === letter && feedback === 'Correct!' ? 'correct' :
              selectedLetter === letter && feedback === 'Try Again!' ? 'incorrect' : ''
            }`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {feedback && (
        <p
          className="score-display"
          style={{ color: feedback === 'Correct!' ? '#2e7d32' : '#c62828' }}
        >
          {feedback}
        </p>
      )}

      <p className="score-display">Score: {score}</p>
    </div>
  );
};

export default GuessTheMissingLetter;
