import React, { useState } from 'react';

const GuessTheMissingLetter = ({ onComplete }) => {
  const words = [
    { full: 'Cat', partial: '_at', answer: 'C' },
    { full: 'Dog', partial: 'D_g', answer: 'o' },
    { full: 'Bat', partial: 'B_t', answer: 'a' },
    { full: 'Sun', partial: 'S_n', answer: 'u' },
    { full: 'Hat', partial: '_at', answer: 'H' },
  ];
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [options, setOptions] = useState(generateOptions(currentWord.answer));
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState(null); // Track the selected letter

  // Get a random word from the list
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Generate multiple-choice options including the correct answer
  function generateOptions(correctAnswer) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const filteredAlphabet = alphabet.filter(letter => letter !== correctAnswer.toUpperCase());
    const wrongOptions = filteredAlphabet.sort(() => 0.5 - Math.random()).slice(0, 3); // Pick 3 random wrong answers
    const allOptions = [correctAnswer.toUpperCase(), ...wrongOptions].sort(() => 0.5 - Math.random()); // Shuffle with correct answer, all uppercase
    return allOptions;
  }

  // Handle letter selection
  const handleLetterClick = (letter) => {
    setSelectedLetter(letter); // Track which letter was clicked
    if (letter === currentWord.answer.toUpperCase()) { // Compare with uppercase answer
      setFeedback('Correct!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete(); // Signal completion to App.jsx
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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Guess the Missing Letter</h1>
      <p>Fill in the blank: <strong>{currentWord.partial}</strong></p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px' }}>
        {options.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterClick(letter)}
            style={{
              width: '60px',
              height: '60px',
              fontSize: '24px',
              backgroundColor:
                selectedLetter === letter && feedback === 'Correct!'
                  ? '#90ee90' // Green only for correct answer when correct
                  : selectedLetter === letter && feedback === 'Try Again!'
                  ? '#ff6347' // Red only for wrong answer when wrong
                  : '#fff', // Default white
              border: '2px solid #000',
              cursor: 'pointer',
            }}
          >
            {letter} {/* Always uppercase due to generateOptions */}
          </button>
        ))}
      </div>
      {feedback && <p style={{ color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</p>}
      <p>Score: {score}</p>
    </div>
  );
};

export default GuessTheMissingLetter;