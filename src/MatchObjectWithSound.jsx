import React, { useState, useEffect } from 'react';

const MatchObjectWithSound = ({ onComplete }) => {
  const objects = [
    { sound: 'Ba', options: ['Ball', 'Bat', 'Bed'], correct: 'Ball' },
    { sound: 'Ca', options: ['Cat', 'Car', 'Cup'], correct: 'Cat' },
    { sound: 'Da', options: ['Dog', 'Duck', 'Door'], correct: 'Dog' },
    { sound: 'Ma', options: ['Map', 'Mat', 'Man'], correct: 'Mat' },
    { sound: 'Sa', options: ['Sun', 'Sock', 'Sand'], correct: 'Sun' },
  ];
  const [currentObject, setCurrentObject] = useState(getRandomObject());
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  function getRandomObject() {
    return objects[Math.floor(Math.random() * objects.length)];
  }

  const playSound = () => {
    const audioPath = `/sounds/${currentObject.sound.toLowerCase()}.mp3`;
    const audio = new Audio(audioPath);
    audio.play()
      .then(() => console.log(`Playing sound: ${audioPath}`))
      .catch((err) => console.error(`Error playing ${audioPath}:`, err));
  };

  // Only play sound on mount if triggered by user interaction elsewhere
  useEffect(() => {
    // Uncomment the next line if you want to test autoplay (may not work without interaction)
    // playSound();
  }, [currentObject]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentObject.correct) {
      setFeedback('Correct!');
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= 2) {
        onComplete();
      } else {
        setTimeout(() => {
          setCurrentObject(getRandomObject());
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
      <h1>Match the Object with the Sound</h1>
      <p>Listen to the sound: <strong>{currentObject.sound}</strong></p>
      <button
        onClick={playSound}
        style={{ padding: '10px 20px', margin: '10px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#90ee90', border: 'none' }}
      >
        Play Sound
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
        {currentObject.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            style={{
              width: '100px',
              height: '100px',
              fontSize: '18px',
              backgroundColor:
                selectedOption === option && feedback === 'Correct!'
                  ? '#90ee90'
                  : selectedOption === option && feedback === 'Try Again!'
                  ? '#ff6347'
                  : '#fff',
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

export default MatchObjectWithSound;