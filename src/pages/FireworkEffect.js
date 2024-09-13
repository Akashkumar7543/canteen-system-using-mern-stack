import React, { useEffect } from 'react';
import { Fireworks } from 'fireworks-js';

const FireworkEffect = () => {
  useEffect(() => {
    const container = document.getElementById('firework-container');
    const fireworks = new Fireworks(container, {
      rocketsPoint: {
        min: 50,
        max: 50
      },
      speed: 2,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      boundaries: {
        x: 50,
        y: 50,
        width: container.clientWidth,
        height: container.clientHeight
      }
    });
    fireworks.start();

    setTimeout(() => {
      fireworks.stop();
    }, 8000); // Show fireworks for 5 seconds

    return () => fireworks.stop();
  }, []);

  return <div id="firework-container" style={{ width: '100%', height: '300px', position: 'absolute', top: 0, left: 0 }}></div>;
};

export default FireworkEffect;
