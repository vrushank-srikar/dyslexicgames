import React, { useState } from 'react';

const DragAndDropLetterPuzzle = ({ onComplete }) => {
  const words = [
    { correct: 'dog', jumbled: 'gdo' },
    { correct: 'cat', jumbled: 'tac' },
    { correct: 'bat', jumbled: 'tba' },
    { correct: 'sun', jumbled: 'nus' },
    { correct: 'hat', jumbled: 'aht' },
  ];
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [letters, setLetters] = useState(currentWord.jumbled.split(''));
  const [dropZones, setDropZones] = useState(Array(currentWord.correct.length).fill(null));
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Get a random word from the list
  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  // Handle drag start
  const handleDragStart = (e, letter) => {
    e.dataTransfer.setData('text/plain', letter);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, index) => {
    e.preventDefault();
    const letter = e.dataTransfer.getData('text/plain');
    const newDropZones = [...dropZones];
    newDropZones[index] = letter;
    setDropZones(newDropZones);

    // Check if all zones are filled
    if (newDropZones.every(zone => zone !== null)) {
      const arrangedWord = newDropZones.join('');
      if (arrangedWord === currentWord.correct) {
        setFeedback('Correct!');
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= 2) {
          onComplete(); // Signal completion to App.jsx
        } else {
          setTimeout(() => {
            const newWord = getRandomWord();
            setCurrentWord(newWord);
            setLetters(newWord.jumbled.split(''));
            setDropZones(Array(newWord.correct.length).fill(null));
            setFeedback(null);
          }, 1000);
        }
      } else {
        setFeedback('Try Again!');
        setTimeout(() => {
          setDropZones(Array(currentWord.correct.length).fill(null));
          setFeedback(null);
        }, 1000);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Drag and Drop Letter Puzzle</h1>
      <p>Rearrange the letters to form the word!</p>
 
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {letters.map((letter, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, letter)}
            style={{
              width: '50px',
              height: '50px',
              fontSize: '24px',
              backgroundColor: '#f0f0f0',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
            }}
          >
            {letter}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {dropZones.map((zone, index) => (
          <div
            key={index}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            style={{
              width: '50px',
              height: '50px',
              fontSize: '24px',
              backgroundColor: zone ? '#90ee90' : '#e0e0e0',
              border: '2px dashed #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {zone || '_'}
          </div>
        ))}
      </div>
      {feedback && <p style={{ marginTop: '20px', color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</p>}
      <p style={{ marginTop: '20px' }}>Score: {score}</p>
      <p>Hint: The word is "{currentWord.correct}" (for testing)</p>
    </div>
  );
};

export default DragAndDropLetterPuzzle;