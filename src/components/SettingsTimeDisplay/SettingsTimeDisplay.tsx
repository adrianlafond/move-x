import React, { useContext } from 'react';
import { settings } from '../../context';
import { padZero } from '../../util/numbers';
import './SettingsTimeDisplay.css';

const SettingsTimeDisplay: React.FC = () => {
  const { minutes, seconds } = useContext(settings);
  return (
    <div className='move-time-numbers'>
      <p className='move-time-numbers__text'>
        {padZero(minutes)}:{padZero(seconds)}
      </p>
    </div>
  )
};

export default SettingsTimeDisplay;
