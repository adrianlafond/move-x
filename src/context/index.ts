import { createContext } from 'react';

const context = createContext({
  defaults: {
    minutes: 20,
    seconds: 0,
  },
  time: {
    minutes: 20,
    seconds: 0,
  },
  running: false,
  resetTimer: () => {},
  toggleRunning: () => {},
  viewSettings: () => {},
  viewTimer: () => {},
});

export default context;
