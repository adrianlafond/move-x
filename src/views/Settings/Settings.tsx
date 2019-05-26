import React, { useContext } from 'react';
import { settings } from '../../context';

const Settings: React.FC = () => {
  const { viewTimer } = useContext(settings);
  return (
    <div>
      <p>Settings</p>
      <button onClick={viewTimer}>TIMER</button>
    </div>
  );
}

export default Settings;
