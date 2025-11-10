export function playSound(name){
  const audio = new Audio(`assets/sounds/${name}.mp3`);
  audio.play();
}
