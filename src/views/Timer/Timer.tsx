import React, { useContext } from 'react';
import { timer } from '../../context';
import { padZero } from '../../util/numbers';
import './Timer.css';

function formatTime(minutes: number, seconds: number): string {
  return `${padZero(minutes)}:${padZero(seconds)}`;
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
};

export default Timer;
