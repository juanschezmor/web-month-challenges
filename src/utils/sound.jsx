// sound.js
let audioInstance;

export const playSound = (url) => {
  stopSound(); // Detener la reproducción actual si hay alguna
  audioInstance = new Audio(url);
  console.log('audioInstance:', audioInstance);
  audioInstance.play();
};

export const stopSound = () => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
    audioInstance = null; // Liberar la instancia de Audio
  }
};
