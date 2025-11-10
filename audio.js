export function playAmbient(){
  const audio = new Audio('assets/sounds/ambient.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.play();
}
