import React, { useState, useEffect } from 'react';

const BalloonPopGame = ({ onComplete }) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  const [balloons, setBalloons] = useState(generateBalloons());
  const [score, setScore] = useState(0);
  const [popped, setPopped] = useState({}); // Track which balloons are popped
  const [feedback, setFeedback] = useState(null); // Feedback for correct/wrong pops

  // Generate 5 balloons with a mix of vowels and consonants (at least 1 vowel)
  function generateBalloons() {
    const allLetters = [...vowels, ...consonants];
    const shuffled = allLetters.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5); // Pick 5 random letters
    // Ensure at least one vowel is included
    if (!selected.some(letter => vowels.includes(letter))) {
      const randomIndex = Math.floor(Math.random() * 5);
      selected[randomIndex] = vowels[Math.floor(Math.random() * vowels.length)];
    }
    return selected;
  }

  // Handle balloon pop
  const handlePop = (index) => {
    if (!popped[index]) {
      const letter = balloons[index];
      setPopped((prev) => ({ ...prev, [index]: true }));
      if (vowels.includes(letter)) {
        setFeedback('Correct!');
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= 2) {
          setTimeout(() => {
            onComplete(); // Signal completion to App.jsx
          }, 1000);
        } else {
          setTimeout(() => {
            setBalloons(generateBalloons());
            setPopped({});
            setFeedback(null);
          }, 1000);
        }
      } else {
        setFeedback('That’s a consonant!');
        setTimeout(() => {
          setPopped((prev) => ({ ...prev, [index]: false })); // Un-pop consonant balloon
          setFeedback(null);
        }, 1000);
      }
    }
  };

  // Reset balloons if none are popped yet (initial render safety)
  useEffect(() => {
    if (score === 0) {
      setBalloons(generateBalloons());
      setPopped({});
    }
  }, [score]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Balloon Pop Game</h1>
      <p>Pop the balloons with vowels (a, e, i, o, u)!</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px', flexWrap: 'wrap' }}>
        {balloons.map((letter, index) => (
          <div
            key={index}
            onClick={() => handlePop(index)}
            style={{
              width: '80px',
              height: '100px',
              borderRadius: '50% 50% 40% 40%', // Balloon-like shape
              backgroundColor: popped[index] ? (vowels.includes(letter) ? '#90ee90' : '#ff6347') : getRandomColor(),
              color: '#fff',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: popped[index] && vowels.includes(letter) ? 'default' : 'pointer',
              transition: 'background-color 0.3s, transform 0.2s',
              transform: popped[index] ? 'scale(0.8)' : 'scale(1)',
              opacity: popped[index] ? 0.5 : 1,
            }}
          >
            {popped[index] ? (vowels.includes(letter) ? 'Pop!' : letter) : letter}
          </div>
        ))}
      </div>
      {feedback && <p style={{ color: feedback === 'Correct!' ? 'green' : 'red' }}>{feedback}</p>}
      <p>Score: {score}</p>
    </div>
  );
};

// Helper function to generate random balloon colors
function getRandomColor() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', '#f7d794'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default BalloonPopGame;