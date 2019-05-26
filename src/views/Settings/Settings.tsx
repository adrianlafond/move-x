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
      <p>Move! relies on notifications. If you're anything like me, you have probably disabled all notifications in your web browser. To re-enable them, at least for this app:</p>
      <ul>
        <li>Dig into your web browser preferences: most web browsers allow you to enable notifications for specific domains while keeping them disabled for all others.</li>
        <li>Open your system or operating system preferences: you may have disabled all notifications entirely for your web browser.</li>
        <li>Your computer may be in "do not disturb" mode (yes, even your desktop computer).</li>
      </ul>
    </div>
  );
}

export default Settings;
