import React from 'react';
import context from '../../context';
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
    const { view, defaults, time, running } = this.state;
    const contextValue = {
      defaults: { ...defaults },
      time: { ...time },
      running: running,
      toggleRunning: this.toggleRunning,
      viewSettings: this.viewSettings,
      viewTimer: this.viewTimer,
    };
    return (
      <context.Provider value={contextValue}>
        <div className="move-root">
          {view === View.SETTINGS ?
            <Settings /> :
            <Timer />
          }
        </div>
      </context.Provider>
    );
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

  viewSettings = () => {
    this.setState({ view: View.SETTINGS });
  }

  viewTimer = () => {
    this.setState({ view: View.TIMER });
  }
}

export default Root;