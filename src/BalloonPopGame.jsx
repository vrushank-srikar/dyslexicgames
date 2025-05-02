import React, { useState, useEffect } from 'react';

const BalloonPopGame = ({ onComplete }) => {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
  const [balloons, setBalloons] = useState(generateBalloons());
  const [score, setScore] = useState(0);
  const [popped, setPopped] = useState({}); // Track which balloons are popped
  const [feedback, setFeedback] = useState(null); // Feedback for correct/wrong pops

  // Generate 5 balloons with a mix of vowels and consonants (ensures at least 1 vowel but not 2 vowels together)
  function generateBalloons() {
    const allLetters = [...vowels, ...consonants];
    const selected = [];
    let vowelCount = 0;

    while (selected.length < 5) {
      const letter = allLetters[Math.floor(Math.random() * allLetters.length)];
      // Ensure at least 1 vowel is included but no 2 vowels in sequence
      if (vowels.includes(letter) && vowelCount < 2) {
        selected.push(letter);
        vowelCount++;
      } else if (consonants.includes(letter)) {
        selected.push(letter);
      }
    }
    return selected;
  }

  // Handle balloon pop
  const handlePop = (index) => {
    if (!popped[index]) {
      const letter = balloons[index];
      setPopped((prev) => ({ ...prev, [index]: true }));
      if (vowels.includes(letter)) {
        setFeedback('Correct! 💥');
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
        .balloon-grid {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 20px;
          flex-wrap: wrap;
        }
        .balloon {
          width: 80px;
          height: 100px;
          border-radius: 50% 50% 40% 40%; 
          background-color: #f7d794;
          color: #000000;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          transform: scale(1);
          opacity: 1;
        }
        .balloon.popped {
          background-color: #90ee90;
          transform: scale(0.8);
          opacity: 0.5;
        }
        .balloon.incorrect {
          background-color: #ff6347;
        }
        .score-display {
          font-size: 1.2rem;
          font-weight: 500;
          color: #555;
        }
        .feedback {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 10px;
          color: green;
        }
      `}</style>

      <h1 className="find-letter-title">Balloon Pop Game</h1>
      <p className="find-letter-instruction">Pop the balloons with vowels (a, e, i, o, u)!</p>
      <div className="balloon-grid">
        {balloons.map((letter, index) => (
          <div
            key={index}
            onClick={() => handlePop(index)}
            className={`balloon ${popped[index] ? (vowels.includes(letter) ? 'popped' : 'incorrect') : ''}`}
          >
            {popped[index] ? '💥' : letter} {/* Show 💥 when balloon is popped */}
          </div>
        ))}
      </div>

      {feedback && (
        <p className="feedback" style={{ color: feedback === 'Correct! 💥' ? 'green' : 'red' }}>
          {feedback}
        </p>
      )}
      <p className="score-display">Score: {score}</p>
    </div>
  );
};

export default BalloonPopGame;
