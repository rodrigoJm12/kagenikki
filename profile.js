export function renderProfile(container){
  const div = document.createElement('div');
  div.innerHTML = `<h2>👤 Perfil</h2>
  <p>Usuario: Ejemplo</p>
  <p>Nivel: 1</p>`;
  container.appendChild(div);
}
