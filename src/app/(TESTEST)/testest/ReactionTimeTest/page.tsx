'use client';

import { useState, useEffect, useRef } from 'react';
import Description from './Desciption';

export default function ReactionTest() {
  const [status, setStatus] = useState<'waiting' | 'ready' | 'clicked' | 'record'>('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState<number[]>([]);
  const [displayResult, setDisplayResult] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [noCheat, setNoCheat] = useState(0);

  const startTime = useRef(0);
  const endTime = useRef(0);

  function playBeep() {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = 1000; // 비프음 주파수 설정 (1000Hz)
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  useEffect(() => {
    if (status === 'ready') {
      const timerId = setTimeout(() => {
        setStatus('clicked');
        playBeep();
        setMessage('지금 클릭하세요!');
        startTime.current = performance.now();
      }, Math.floor(Math.random() * 3000) + 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [status]);

  function onClickScreen() {
    if (status === 'waiting') {
      setStatus('ready');
      setMessage('초록색이 되면 클릭하세요');
    } else if (status === 'ready') {
      setStatus('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
      setNoCheat((prev) => prev + 1);
      if (noCheat >= 5) {
        setMessage('어뷰징 방지를 위해 처음부터 시작합니다.');
        setResult([]);
        setDisplayResult(null);
        setCount(0);
        setNoCheat(0);
      }
    } else if (status === 'clicked') {
      endTime.current = performance.now();
      const reactionTime = endTime.current - startTime.current;
      setDisplayResult(reactionTime);
      setStatus('record');
      setCount((prev) => prev + 1);
      setNoCheat(0);
      if (count < 4) {
        setMessage(`${reactionTime.toFixed(2)} ms 걸렸습니다.\n클릭해서 다시 시작하세요.`);
      } else {
        setMessage(`${reactionTime.toFixed(2)} ms 걸렸습니다. 테스트가 끝났습니다.`);
      }
      setResult((prevResult) => [...prevResult, reactionTime]);
    } else if (status === 'record') {
      if (count >= 5) {
        renderAverage();
        onReset();
      } else {
        setStatus('ready');
        setMessage('초록색이 되면 클릭하세요');
      }
    }
  }

  function onReset() {
    setResult([]);
    setDisplayResult(null);
    setCount(0);
    setMessage('클릭해서 시작하세요');
  }

  function renderAverage() {
    if (count === 5) {
      const average = result.reduce((a, c) => a + c) / result.length;
      return <div>평균 시간: {average.toFixed(2)} ms</div>;
    }
  }

  return (
    <>
      <div
        id="screen"
        style={{
          width: '100%',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: status === 'clicked' ? 'green' : 'white',
          color: status === 'clicked' ? 'white' : 'black',
          position: 'relative',
          userSelect: 'none',
        }}
        onClick={onClickScreen}
      >
        {message}
        {status === ('record' || 'waiting') && (
          <div
            style={{
              fontSize: '24px',
              position: 'static',
              bottom: '20px',
              color: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            {count}/5
          </div>
        )}
        {renderAverage()}
      </div>
      <Description />
    </>
  );
}
