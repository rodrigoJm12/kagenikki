export function renderAchievements(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>🏆 Logros</h2>
    <ul>
      <li>Primer día en el diario</li>
      <li>Primer mensaje en el chat</li>
    </ul>
  `;
  container.appendChild(div);
}
