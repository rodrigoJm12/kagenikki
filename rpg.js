export function renderRPG(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>⚔️ RPG</h2>
    <p>Nivel: 1</p>
    <button onclick="alert('Has luchado contra un enemigo!')">Luchar</button>
  `;
  container.appendChild(div);
}
