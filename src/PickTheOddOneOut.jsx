import React, { useState } from 'react';

const PickTheOddOneOut = ({ onComplete }) => {
  const sets = [
    { options: ['Apple', 'Ant', 'Aeroplane', 'Dog'], odd: 'Dog' }, // D is odd
    { options: ['Ball', 'Bat', 'Bed', 'Cat'], odd: 'Cat' },        // C is odd
    { options: ['Sun', 'Sock', 'Sand', 'Map'], odd: 'Map' },      // M is odd
    { options: ['Hat', 'Ham', 'Hen', 'Pig'], odd: 'Pig' },        // P is odd
    { options: ['Car', 'Cup', 'Cake', 'Fan'], odd: 'Fan' },       // F is odd
  ];
  const [currentSet, setCurrentSet] = useState(getRandomSet());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pick the Odd One Out</h1>
      <p>Which one doesn’t belong?</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
        {currentSet.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '18px',
              backgroundColor:
                selectedOption === option && feedback === 'Correct!'
                  ? '#90ee90' // Green for correct
                  : selectedOption === option && feedback === 'Try Again!'
                  ? '#ff6347' // Red for wrong
                  : '#fff', // Default white
              border: '2px solid #000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {option}
            {/* Replace with: <img src={`/images/${option.toLowerCase()}.png`} alt={option} style={{ width: '80px' }} /> */}
          </button>
        ))}
      </div>
      {feedback && <p style={{ color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</p>}
      <p>Score: {score}</p>
    </div>
  );
};

export default PickTheOddOneOut;