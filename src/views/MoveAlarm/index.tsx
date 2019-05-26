import React from 'react';

interface MoveAlarmProps {
  fire?: boolean;
  alarmAcknowledged: () => void;
};

const MoveAlarm: React.FC<MoveAlarmProps> = (props: MoveAlarmProps) => {
  if (props.fire) {
    if (window.confirm('MOVE!')) {
      props.alarmAcknowledged();
    }
  }
  return null;
}

export default MoveAlarm;
