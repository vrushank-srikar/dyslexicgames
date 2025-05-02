import React, { useState } from 'react';

const PickTheOddOneOut = ({ onComplete }) => {
  const sets = [
    { options: ['Apple','Dog', 'Ant', 'Air'], odd: 'Dog' },
    { options: ['Cat', 'Ball', 'Bat', 'Bed', ], odd: 'Cat' },
    { options: ['Sun', 'Sock', 'Sand', 'Map'], odd: 'Map' },
    { options: ['Hat', 'Ham', 'Pig','Hen' ], odd: 'Pig' },
    { options: ['Car', 'Cup', 'Cake', 'Fan'], odd: 'Fan' },
  ];

  const [currentSet, setCurrentSet] = useState(getRandomSet());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Get a random set from the list
  function getRandomSet() {
    return sets[Math.floor(Math.random() * sets.length)];
  }

  // Handle option selection
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentSet.odd) {
      setFeedback('Correct!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete(); // Signal completion to App.jsx
      } else {
        setTimeout(() => {
          setCurrentSet(getRandomSet());
          setFeedback(null);
          setSelectedOption(null);
        }, 1000);
      }
    } else {
      setFeedback('Try Again!');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
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
          justify-content: center;
          gap: 20px;
          margin: 20px;
        }
        .letter-button {
          width: 100px;
          height: 100px;
          font-size: 18px;
          font-weight: bold;
          border: 2px solid #333;
          background-color: #ffffff;
          color: #333;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
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

      <h1 className="find-letter-title">Pick the Odd One Out</h1>
      <p className="find-letter-instruction">Which one doesn’t belong?</p>
      <div className="letter-grid">
        {currentSet.options.map((option, index) => (
          <button
            key={index}
            className={`letter-button ${
              selectedOption === option && feedback === 'Correct!' ? 'correct' :
              selectedOption === option && feedback === 'Try Again!' ? 'incorrect' : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option}
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

export default PickTheOddOneOut;
