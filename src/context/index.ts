import { createContext } from 'react';

export const timer = createContext({
  minutes: 20,
  seconds: 0,
  running: false,
  resetTimer: () => { },
  toggleRunning: () => { },
  addTime: () => {},
  decreaseTime: () => {},
  viewSettings: () => { },
});

export const settings = createContext({
  minutes: 20,
  seconds: 0,
  updateDefaults: (minutes: number, seconds: number) => {},
  exitSettings: () => { },
});
