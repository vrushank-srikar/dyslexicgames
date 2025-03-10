import React, { useState } from 'react';
import FindTheLetter from './FindTheLetter';
import PhonicsVideoMatching from './PhonicsVideoMatching';
import LetterTrace from './LetterTrace';
import GuessTheMissingLetter from './GuessTheMissingLetter';
import MatchObjectWithSound from './MatchObjectWithSound';
import PickTheOddOneOut from './PickTheOddOneOut';
import BalloonPopGame from './BalloonPopGame';
import DragAndDropLetterPuzzle from './DragAndDropLetterPuzzle';
import SingAlongABCSong from './SingAlongABCSong';

const App = () => {
  const games = [
    { component: FindTheLetter, name: 'Find the Letter' },
    { component: PhonicsVideoMatching, name: 'Phonics Video Matching' },
    { component: LetterTrace, name: 'Letter Trace' },
    { component: GuessTheMissingLetter, name: 'Guess the Missing Letter' },
    { component: MatchObjectWithSound, name: 'Match the Object with the Sound' },
    { component: PickTheOddOneOut, name: 'Pick the Odd One Out' },
    { component: BalloonPopGame, name: 'Balloon Pop Game (Vowel Sounds)' },
    { component: DragAndDropLetterPuzzle, name: 'Drag and Drop Letter Puzzle' },
    { component: SingAlongABCSong, name: 'Sing Along ABC Song' },
  ];
  const [currentGame, setCurrentGame] = useState(0);

  const handleGameComplete = () => {
    if (currentGame < games.length - 1) {
      setCurrentGame(currentGame + 1);
    } else {
      alert('All Level 1 games completed!');
      setCurrentGame(0); // Loop back or end
    }
  };

  const CurrentGameComponent = games[currentGame].component;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Level 1: Basic Phonetics & Letter Recognition</h1>
      <h2>Current Game: {games[currentGame].name}</h2>
      <CurrentGameComponent onComplete={handleGameComplete} />
    </div>
  );
};

export default App;