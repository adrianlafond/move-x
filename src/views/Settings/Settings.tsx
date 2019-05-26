import React, { useContext } from 'react';
import { settings } from '../../context';
import './Settings.css';

const Settings: React.FC = () => {
  const { minutes, seconds, updateDefaults, exitSettings } = useContext(settings);
  const onMinutesChange = (event: { target: HTMLInputElement }) => {
    updateDefaults(+event.target.value, seconds);
  };
  const onSecondsChange = (event: { target: HTMLInputElement }) => {
    updateDefaults(minutes, +event.target.value);
  }
  return (
    <div className='move-settings'>
      <h2 className='move-settings__title'>Settings</h2>
      <input
        type="number"
        onChange={onMinutesChange}
        id="input-defaults-minutes"
        min="0"
        max="480"
        step="1"
        value={minutes}
      />
      <input
        type="number"
        onChange={onSecondsChange}
        id="input-defaults-seconds"
        min="0"
        max="59"
        step="1"
        value={seconds}
      />
      <button onClick={exitSettings}>EXIT</button>
    </div>
  );
}

export default Settings;
