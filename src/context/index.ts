import { createContext } from 'react';

export const timer = createContext({
  minutes: 20,
  seconds: 0,
  running: false,
  resetTimer: () => { },
  toggleRunning: () => { },
  viewSettings: () => { },
});

export const settings = createContext({
  minutes: 20,
  seconds: 0,
  viewTimer: () => { },
});
