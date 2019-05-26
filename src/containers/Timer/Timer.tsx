import React, { useContext } from 'react';
import context from '../../context';
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
  const { time, running, toggleRunning, viewSettings } = useContext(context);
  const { minutes, seconds } = time;
  return (
    <div className='move-timer'>
      <p>{formatTime(minutes, seconds)}</p>
      <button onClick={toggleRunning}>{running ? 'PAUSE' : 'PLAY'}</button>
      <button onClick={viewSettings}>SETTINGS</button>
    </div>
  );
}

export default Timer;
