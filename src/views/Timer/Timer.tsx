import React, { useContext } from 'react';
import { timer } from '../../context';
import './Timer.css';

function formatNumber(value: number): string {
  let str = `${value}`;
  while (str.length < 2) {
    str = '0' + str;
  }
  return str;
}

function formatTime(minutes: number, seconds: number): string {
  return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
}

const Timer: React.FC = () => {
  const { minutes, seconds, running, resetTimer, toggleRunning, viewSettings } = useContext(timer);
  return (
    <div className='move-timer'>
      <p>{formatTime(minutes, seconds)}</p>
      <button onClick={resetTimer}>RESET</button>
      <button onClick={toggleRunning}>{running ? 'PAUSE' : 'PLAY'}</button>
      <button onClick={viewSettings}>SETTINGS</button>
    </div>
  );
}

export default Timer;
