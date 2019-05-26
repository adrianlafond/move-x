import React from 'react';

type alarmAcknowledgedType = () => void;

interface MoveAlarmProps {
  fire?: boolean;
  alarmAcknowledged: alarmAcknowledgedType;
};

function fireNotification(alarmAcknowledged: alarmAcknowledgedType) {
  const notification = new Notification('MOVE!');
  notification.onclose = alarmAcknowledged;
}

function fireAlert(alarmAcknowledged: alarmAcknowledgedType) {
  window.alert('MOVE!');
  alarmAcknowledged();
}

function fireAlarm(alarmAcknowledged: alarmAcknowledgedType) {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      fireNotification(alarmAcknowledged);
    } else if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          fireNotification(alarmAcknowledged);
        } else {
          fireAlert(alarmAcknowledged);
        }
      });
    } else {
      fireAlert(alarmAcknowledged);
    }
  } else {
    fireAlert(alarmAcknowledged);
  }
}

const MoveAlarm: React.FC<MoveAlarmProps> = (props: MoveAlarmProps) => {
  if (props.fire) {
    fireAlarm(props.alarmAcknowledged);
  }
  return null;
}

export default MoveAlarm;
