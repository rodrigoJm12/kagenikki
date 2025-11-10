export function addSticker(container, name){
  const img = document.createElement('img');
  img.src = `assets/icons/${name}.png`;
  img.style.width = '50px';
  container.appendChild(img);
}
