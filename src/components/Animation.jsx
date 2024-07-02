import React, { useState } from 'react';
import { motion } from 'framer-motion';
import demosBee from '../../public/demos-bee-icon.png';
import callingChallengesBee from '../../public/calling-challenges-bee-icon.png';
import countryBee from '../../public/country-bee-icon.png';

const HypeComponent = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Define las imágenes y sus tipos
  const images = [demosBee, callingChallengesBee, countryBee];

  // Configuración de animación
  const animationVariants = {
    initial: {
      opacity: 0,
      y: '-100%',
    },
    animate: {
      opacity: 1,
      y: '0%',
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  // Al finalizar la animación, cierra el componente
  const onAnimationComplete = () => {
    setTimeout(() => {
      setAnimationComplete(true);
      // Llama a onClose para cerrar el componente desde el padre
    }, 3000); // 3 segundos de duración de la animación
  };

  return (
    <motion.div
      className="hype-component"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={animationVariants}
      onAnimationComplete={onAnimationComplete}
    >
      {images.map((image, index) => (
        <motion.img
          key={index}
          src={image}
          alt={image.type}
          style={{ position: 'absolute', top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%`, zIndex: 100 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        ></motion.img>
      ))}
    </motion.div>
  );
};
export default HypeComponent;
