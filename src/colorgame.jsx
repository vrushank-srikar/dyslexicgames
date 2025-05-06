import React, { useState, useEffect } from 'react';

const ColorGame = () => {
  const [blocks, setBlocks] = useState([]);
  const [sprinkles, setSprinkles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateRandomPosition = () => ({
    x: Math.random() * (window.innerWidth - 60),
    y: Math.random() * (window.innerHeight - 60),
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
  });

  const addNewColorBlock = () => {
    const numColors = Math.floor(Math.random() * 4) + 5; // Random between 5 and 8
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      colors: Array.from({ length: numColors }, () => generateRandomColor()),
      ...generateRandomPosition(),
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const createSprinkles = (x, y, colors) => {
    const newSprinkles = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 50;
      newSprinkles.push({
        id: Math.random().toString(36).substr(2, 9),
        x: x + 30, // Center of block
        y: y + 30, // Center of block
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      });
    }
    setSprinkles((prev) => [...prev, ...newSprinkles]);
    setTimeout(() => {
      setSprinkles((prev) => prev.filter((s) => !newSprinkles.some((ns) => ns.id === s.id)));
    }, 700);
  };

  useEffect(() => {
    addNewColorBlock();
    const interval = setInterval(() => {
      setBlocks((prev) =>
        prev.map((block) => {
          let newX = block.x + block.dx;
          let newY = block.y + block.dy;

          if (newX <= 0 || newX >= window.innerWidth - 60) block.dx *= -1;
          if (newY <= 0 || newY >= window.innerHeight - 60) block.dy *= -1;

          return { ...block, x: newX, y: newY };
        })
      );
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleBlockClick = (id) => {
    if (score >= 10) return;

    const block = blocks.find((b) => b.id === id);
    if (block) {
      createSprinkles(block.x, block.y, block.colors);
      setBlocks((prev) => prev.filter((b) => b.id !== id));
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore >= 3) {
          setGameOver(true);
        } else {
          addNewColorBlock();
        }
        return newScore;
      });
    }
  };

  return (
    <>
      <style>
        {`
          .game-container {
            width: 1000px;
            height: 500px;
            background-color: black;
            position: relative;
            overflow: hidden;
          }

          .color-block {
            width: 60px;
            height: 60px;
            position: absolute;
            cursor: pointer;
            background-color: transparent;
          }

          .color-block div {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            transform: translate(-50%, -50%);
          }

          .color-block div:nth-child(1) { top: 15px; left: 15px; }
          .color-block div:nth-child(2) { top: 15px; left: 30px; }
          .color-block div:nth-child(3) { top: 15px; left: 45px; }
          .color-block div:nth-child(4) { top: 30px; left: 15px; }
          .color-block div:nth-child(5) { top: 30px; left: 30px; }
          .color-block div:nth-child(6) { top: 30px; left: 45px; }
          .color-block div:nth-child(7) { top: 45px; left: 15px; }
          .color-block div:nth-child(8) { top: 45px; left: 30px; }

          .sprinkle {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            pointer-events: none;
            animation: sprinkleAnimation 0.7s ease-out forwards;
          }

          .score {
            position: absolute;
            top: 20px;
            left: 20px;
            color: white;
            font-size: 24px;
            font-family: Arial, sans-serif;
          }

          .game-over {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 48px;
            font-family: Arial, sans-serif;
            text-align: center;
          }

          @keyframes sprinkleAnimation {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(var(--dx), var(--dy)) scale(0.5);
              opacity: 0;
            }
          }
        `}
      </style>
      <div className="game-container">
        {gameOver ? (
          <div className="game-over">Game Over! Score: {score}</div>
        ) : (
          <>
            <div className="score">Score: {score}</div>
            {blocks.map((block) => (
              <div
                key={block.id}
                className="color-block"
                style={{
                  left: block.x,
                  top: block.y,
                }}
                onClick={() => handleBlockClick(block.id)}
              >
                {block.colors.map((color, index) => (
                  <div key={index} style={{ backgroundColor: color }} />
                ))}
              </div>
            ))}
            {sprinkles.map((sprinkle) => (
              <div
                key={sprinkle.id}
                className="sprinkle"
                style={{
                  left: sprinkle.x,
                  top: sprinkle.y,
                  backgroundColor: sprinkle.color,
                  '--dx': `${sprinkle.dx}px`,
                  '--dy': `${sprinkle.dy}px`,
                }}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ColorGame;