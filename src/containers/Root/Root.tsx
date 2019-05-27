import React from 'react';
import { timer as timerContext, settings as settingsContext } from '../../context';
import Timer from '../../views/Timer';
import Settings from '../../views/Settings';
import Favicon from '../../components/Favicon';
import MoveAlarm from '../../components/MoveAlarm';
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
  alarm: boolean;
  running: boolean;
  view: View;
}

class Root extends React.Component<ModelProps, ModelState> {
  interval = 0;

  constructor(props: object) {
    super(props);
    const storedDefaults = window.localStorage.getItem('defaults');
    const defaults = storedDefaults ? JSON.parse(storedDefaults) : {
      minutes: 20,
      seconds: 0,
    };
    this.state = {
      defaults,
      time: defaults,
      alarm: false,
      running: false,
      view: View.TIMER,
    }
  }

  render() {
    const { view, alarm } = this.state;
    return (
      <div className="move-root">
        <Favicon fire={alarm} />
        <MoveAlarm fire={alarm} alarmAcknowledged={this.alarmAcknowledged} />
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
      addTime: this.addTime,
      decreaseTime: this.decreaseTime,
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

  alarmAcknowledged = () => {
    window.requestAnimationFrame(() => {
      this.resetTimer();
    });
  }

  resetTimer = (alarm = false) => {
    const alarmValue = alarm === true;
    this.setState({ time: { ...this.state.defaults }, alarm: alarmValue });
  }

  toggleRunning = () => {
    const { defaults, time, running } = this.state;
    const { minutes, seconds } = time;
    const newTime = !running && minutes === 0 && seconds === 0 ?
      { ...defaults } : time;
    this.setState({ running: !running, time: newTime }, () => {
      if (this.state.running) {
        if (time.minutes === 0 && time.seconds === 0) {
          this.setState({ alarm: true });
        } else {
          this.requestNotificationsPermission();
          this.interval = window.setInterval(() => {
            const { minutes, seconds } = this.state.time;
            const time = { minutes, seconds };
            time.seconds = time.seconds === 0 ? 59 : time.seconds - 1;
            time.minutes = time.seconds === 59 ? time.minutes - 1 : time.minutes;
            time.minutes = Math.max(0, time.minutes);
            if (time.minutes === 0) {
              time.seconds = Math.max(0, time.seconds);
            }
            const running = time.minutes !== 0 || time.seconds !== 0;
            this.setState({ time, running }, () => {
              if (!running) {
                window.clearInterval(this.interval);
                this.setState({ alarm: true });
              }
            });
          }, 1000);
        }
      } else {
        window.clearInterval(this.interval);
      }
    });
  }

  addTime = () => {
    this.updateTime(1);
  }

  decreaseTime = () => {
    this.updateTime(-1);
  }

  updateTime = (increment: number) => {
    const { running, defaults, time } = this.state;
    let { minutes, seconds } = running ? time : defaults;
    if (increment < 0) {
      if (minutes > 0) {
        minutes -= 1;
        seconds = minutes === 0 ? 59 : 0;
      } else if (seconds > 0) {
        seconds -= 1;
      }
    } else {
      if (minutes === 0 && seconds < 59) {
        seconds += 1;
      } else if (minutes < 99) {
        minutes += 1;
        seconds = 0;
      }
    }
    this.setState({ time: { minutes, seconds } });
    if (!running) {
      this.updateDefaults(minutes, seconds);
    }
  }

  requestNotificationsPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  updateDefaults = (minutes: number, seconds: number) => {
    const defaults = { minutes, seconds };
    this.setState({ defaults }, () => {
      window.localStorage.setItem('defaults', JSON.stringify(defaults));
    });
    if (!this.state.running) {
      this.setState({ time: defaults });
    }
  }

  viewSettings = () => {
    this.setState({ view: View.SETTINGS });
  }

  exitSettings = () => {
    this.setState({ view: View.TIMER });
  }
}

export default Root;
