import React from 'react';
import { timer as timerContext, settings as settingsContext } from '../../context';
import Timer from '../../views/Timer/Timer';
import Settings from '../../views/Settings/Settings';
import './Root.css';

interface Time {
  minutes: number;
  seconds: number;
}

enum View {
  SETTINGS = 'SETTINGS',
  TIMER = 'TIMER',
};

interface ModelProps {}

interface ModelState {
  defaults: Time;
  time: Time;
  running: boolean;
  view: View;
}

class Root extends React.Component<ModelProps, ModelState> {
  interval = 0;

  constructor(props: object) {
    super(props);
    this.state = {
      defaults: {
        minutes: 20,
        seconds: 0,
      },
      time: {
        minutes: 20,
        seconds: 0,
      },
      running: false,
      view: View.TIMER,
    }
  }

  render() {
    const { view } = this.state;
    return (
      <div className="move-root">
        {view === View.SETTINGS ?
          this.renderSettings() :
          this.renderTimer()
        }
      </div>
    );
  }

  renderTimer() {
    const { time, running } = this.state;
    const context = {
      running,
      minutes: time.minutes,
      seconds: time.seconds,
      resetTimer: this.resetTimer,
      toggleRunning: this.toggleRunning,
      viewSettings: this.viewSettings,
    };
    return (
      <timerContext.Provider value={context}>
        <Timer />
      </timerContext.Provider>
    );
  }

  renderSettings() {
    const { defaults } = this.state;
    const context = {
      minutes: defaults.minutes,
      seconds: defaults.seconds,
      updateDefaults: this.updateDefaults,
      exitSettings: this.exitSettings,
    };
    return (
      <settingsContext.Provider value={context}>
        <Settings />
      </settingsContext.Provider>
    );
  }

  resetTimer = () => {
    const time = { ...this.state.defaults };
    this.setState({ time });
  }

  toggleRunning = () => {
    this.setState({ running: !this.state.running }, () => {
      if (this.state.running) {
        this.interval = window.setInterval(() => {
          const { minutes, seconds} = this.state.time;
          const time = { minutes, seconds };
          time.seconds = time.seconds === 0 ? 59 : time.seconds - 1;
          time.minutes = time.seconds === 59 ? time.minutes - 1 : time.minutes;
          const running = time.minutes !== 0 || time.seconds !== 0;
          if (!running) {
            window.clearInterval(this.interval);
          }
          this.setState({ time, running });
        }, 1000);
      } else {
        window.clearInterval(this.interval);
      }
    });
  }

  updateDefaults = (minutes: number, seconds: number) => {
    this.setState({ defaults: { minutes, seconds } });
  }

  viewSettings = () => {
    this.setState({ view: View.SETTINGS });
  }

  exitSettings = () => {
    this.setState({ view: View.TIMER });
  }
}

export default Root;
