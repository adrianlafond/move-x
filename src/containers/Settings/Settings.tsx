import React, { useContext } from 'react';
import context from '../../context';

const Settings: React.FC = () => {
  const { viewTimer } = useContext(context);
  return (
    <div>
      <p>Settings</p>
      <button onClick={viewTimer}>TIMER</button>
    </div>
  );
}

export default Settings;
