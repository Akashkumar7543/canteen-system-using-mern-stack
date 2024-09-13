import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Clebarte = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Confetti duration 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return showConfetti ? <Confetti width={width} height={height} /> : null;
};

export default Clebarte;
