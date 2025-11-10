export function renderDreams(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>💭 Sueños</h2>
    <p>Ejemplo: Aprender 100 kanji este mes</p>
  `;
  container.appendChild(div);
}
