'use client';
import { useState, useEffect, useRef } from 'react';
import Description from './Desciption';

const AimTest = () => {
  const [totalTime, setTotalTime] = useState(0 as number);
  const [attempts, setAttempts] = useState(0);
  const [gameArea, setGameArea] = useState({ width: 0, height: 0 });
  const [reactionTime, setReactionTime] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(30); // totalAttempts 상태 추가
  const [targetSize, setTargetSize] = useState(50);
  const [isGaming, setIsGaming] = useState(false); // gameStatus 상태 추가
  const [muted, setMuted] = useState(false);
  const [targets, setTargets] = useState([{ id: 0, position: { x: 0, y: 0 } }]);
  const [activeTarget, setActiveTarget] = useState<number | null>(null);

  const timeRef = useRef(0);

  function playBeep(hz: number) {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = hz; // 비프음 주파수 설정
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  useEffect(() => {
    if (targets.length > 0 && activeTarget === null) {
      setActiveTarget(targets[0].id);
    }
  }, [targets, activeTarget]);

  useEffect(() => {
    generateTargets();
  }, [gameArea]);

  useEffect(() => {
    const handleResize = () => {
      setGameArea({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.7,
      });
    };

    handleResize(); // Call the function at mount
    window.addEventListener('resize', handleResize); // Call the function whenever the window size changes

    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = (id: number) => {
    const currentTime = performance.now();
    const elapsedTime = currentTime - timeRef.current;
    timeRef.current = currentTime; // Update the timer for the next click
    setReactionTime(elapsedTime);
    muted ? null : playBeep(elapsedTime);
    setTargets(targets.slice(1));
    setActiveTarget(targets[1]?.id || null);
    setTotalTime((time) => time + elapsedTime);
    setAttempts((count) => count + 1);
  };

  const generateTargets = () => {
    const newTargets = Array.from({ length: totalAttempts }, (_, i) => {
      const x = Math.floor(Math.random() * (gameArea.width - targetSize));
      const y = Math.floor(Math.random() * (gameArea.height - targetSize));
      return { id: i + 1, position: { x, y } };
    });
    setTargets(newTargets);
    setActiveTarget(newTargets[0].id);
    timeRef.current = performance.now();
  };

  const resetGameState = () => {
    setAttempts(0);
    setTotalTime(0);
    setReactionTime(0);
    setActiveTarget(null);
  };

  const averageTime = attempts ? totalTime / attempts : 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div
          className="relative bg-white cursor-crosshair"
          style={{ width: `${gameArea.width}px`, height: `${gameArea.height}px` }}
        >
          {!isGaming ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="mb-2 flex flex-col py-4">
                <label>Total Attempts: {totalAttempts}</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={totalAttempts}
                  onChange={(e) => setTotalAttempts(Number(e.target.value))}
                />
              </div>
              <div className="mb-2 flex flex-col py-4 ">
                <label>Target Size: {targetSize}px</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={targetSize}
                  onChange={(e) => setTargetSize(Number(e.target.value))}
                />
              </div>
              <button
                onClick={() => {
                  setIsGaming(true);
                  resetGameState(); //혹시몰라서
                  generateTargets();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Game
              </button>
            </div>
          ) : isGaming && attempts < totalAttempts ? (
            <>
              <p>반응 속도: {reactionTime.toFixed(2)} ms</p>
              {targets.map((target) =>
                target.id === activeTarget ? (
                  <div
                    key={target.id}
                    style={{
                      position: 'absolute',
                      width: `${targetSize}px`,
                      height: `${targetSize}px`,
                      background: `radial-gradient(
                      red ${targetSize * 0.05}px, transparent 0,
                      transparent ${targetSize * 0.15}px, red 0,
                      red ${targetSize * 0.25}px, transparent 0,
                      transparent ${targetSize * 0.35}px, red 0,
                      red ${targetSize * 0.45}px, transparent 0
                    )`,
                      borderRadius: '50%',
                      cursor: 'crosshair',
                      top: `${target.position.y}px`,
                      left: `${target.position.x}px`,
                      zIndex: 30,
                    }}
                    onClick={() => handleClick(target.id)}
                  />
                ) : null,
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="py-4">평균 반응 속도: {averageTime.toFixed(2)} ms</p>
              <button
                onClick={() => {
                  resetGameState();
                  generateTargets();
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Try again
              </button>
              <div className="py-4">
                <button
                  onClick={() => {
                    setIsGaming(false);
                    resetGameState();
                  }}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  HOME
                </button>
              </div>
            </div>
          )}
          <div className="absolute top-0 right-0 p-2 flex space-x-2">
            <button
              onClick={() => {
                setIsGaming(false);
                resetGameState();
              }}
              className=" bg-opacity-50 hover:scale-125 p-2 rounded-full"
            >
              ←{/* 뒤로가기 아이콘 */}
            </button>
            <button
              onClick={() => {
                //setIsGaming(false);
                resetGameState();
                generateTargets();
              }}
              className=" bg-opacity-50 hover:scale-125 p-2 rounded-full"
            >
              &#x21bb;{/* 다시하기 아이콘 */}
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className=" bg-opacity-50 hover:scale-125 p-2 rounded-full"
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AimTest;
