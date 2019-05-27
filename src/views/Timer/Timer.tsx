import React, { Component } from 'react';
import { timer } from '../../context';
import { padZero } from '../../util/numbers';
import './Timer.css';

function formatTime(minutes: number, seconds: number): string {
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

class Timer extends Component {
  static contextType = timer;

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        this.context.addTime();
        break;
      case 'ArrowDown':
        this.context.decreaseTime();
        break;
    }
  }

  render() {
    const { minutes, seconds, running, resetTimer, toggleRunning, viewSettings } = this.context;
    return (
      <div className='move-timer'>
        <p>{formatTime(minutes, seconds)}</p>
        <button onClick={resetTimer}>RESET</button>
        <button onClick={toggleRunning}>{running ? 'PAUSE' : 'PLAY'}</button>
        <button onClick={viewSettings}>SETTINGS</button>
      </div>
    );
  }
}

export default Timer;
