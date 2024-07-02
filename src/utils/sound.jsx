// sound.js
let audioInstance;

export const playSound = (url) => {
  if (!audioInstance) {
    audioInstance = new Audio(url);
  }
  console.log('Playing sound');
  audioInstance.play();
};

export const stopSound = () => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0; // Reiniciar el audio al comienzo
  }
};
