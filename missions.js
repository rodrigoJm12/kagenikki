export function renderMissions(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>📜 Misiones</h2>
    <ul>
      <li>Escribir una entrada en el diario</li>
      <li>Enviar un mensaje en el chat</li>
    </ul>
  `;
  container.appendChild(div);
}
