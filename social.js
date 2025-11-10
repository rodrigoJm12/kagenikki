export function renderSocial(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>🌐 Red Social</h2>
    <p>Publicaciones de ejemplo:</p>
    <ul>
      <li>Usuario1: ¡Hola a todos!</li>
      <li>Usuario2: 今日も元気です！</li>
    </ul>
  `;
  container.appendChild(div);
}
