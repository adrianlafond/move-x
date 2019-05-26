import React from 'react';

/**
 * Icons: https://icons8.com/icons/small
 */

const ICON_STATIC = 'icons8-waiting-room-';
const ICON_MOVE_1 = 'icons8-walking-';
const ICON_MOVE_2 = 'icons8-exercise-';

let activeIcon: string;
let interval: number;

interface FaviconProps {
  fire?: boolean;
};

function getIcon(size: number): HTMLLinkElement {
  let el: HTMLLinkElement | null = document.head.querySelector(`link[sizes="${size}x${size}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'shortcut icon');
    // el.setAttribute('href', `${(window as any).PUBLIC_URL}/`);
    el.setAttribute('sizes', `${size}x${size}`);
  }
  return el;
}

function setIcon(icon: string) {
  [16, 32].forEach(size => {
    const url = `${(window as any).PUBLIC_URL}/${icon}${size}.png`;
    getIcon(size).setAttribute('href', url);
  });
  activeIcon = icon;
}

function animateIcon() {
  interval = window.setInterval(() => {
    setIcon(activeIcon === ICON_MOVE_1 ? ICON_MOVE_2 : ICON_MOVE_1);
  }, 500);
}

const Favicon: React.FC<FaviconProps> = props => {
  window.clearInterval(interval);
  if (props.fire) {
    animateIcon();
  } else {
    setIcon(ICON_STATIC);
  }
  return null;
}

export default Favicon;
