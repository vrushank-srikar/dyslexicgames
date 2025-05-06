import React, { useState } from 'react';
import FindTheLetter from './FindTheLetter';
import GuessTheMissingLetter from './GuessTheMissingLetter';
import PickTheOddOneOut from './PickTheOddOneOut';
import BalloonPopGame from './BalloonPopGame';
import colorgame from './colorgame';

const App = () => {
  const levels = [
    {
      name: 'Level 1: Basic Phonetics & Letter Recognition',
      games: [
        { component: FindTheLetter, name: 'Find the Letter' },
        { component: GuessTheMissingLetter, name: 'Guess the Missing Letter' },
        { component: PickTheOddOneOut, name: 'Pick the Odd One Out' },
        { component: BalloonPopGame, name: 'Balloon Pop Game (Vowel Sounds)' },
        { component: colorgame, name: 'colorgame' },
      ],
    },
    {
      name: 'Level 2: Simple Words & Blending',
      games: [
        // { component: MatchWordWithPicture, name: 'Match the Word with the Picture' },       
        
      ],
    },
  ];

  const [currentLevel, setCurrentLevel] = useState(0); // 0 = Level 1, 1 = Level 2
  const [currentGame, setCurrentGame] = useState(0); // Index of current game in the level

  const handleGameComplete = () => {
    const currentLevelGames = levels[currentLevel].games;
    if (currentGame < currentLevelGames.length - 1) {
      setCurrentGame(currentGame + 1); // Next game in current level
    } else if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1); // Move to next level
      setCurrentGame(0); // Start at first game of new level
      alert(`Completed ${levels[currentLevel].name}! Starting ${levels[currentLevel + 1].name}.`);
    } else {
      alert('All levels completed! Starting over.');
      setCurrentLevel(0); // Reset to Level 1
      setCurrentGame(0);
    }
  };

  const CurrentGameComponent = levels[currentLevel].games[currentGame].component;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{levels[currentLevel].name}</h1>
      <h2>Current Game: {levels[currentLevel].games[currentGame].name}</h2>
      <CurrentGameComponent onComplete={handleGameComplete} />
    </div>
  );
};

export default App;