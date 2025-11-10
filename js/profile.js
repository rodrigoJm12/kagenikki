export function renderProfile(container){
  const profile = JSON.parse(localStorage.getItem('profile')) || {user:'Usuario', nivel:1, kage:100};
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>👤 Perfil</h2>
    <p>Usuario: ${profile.user}</p>
    <p>Nivel: ${profile.nivel}</p>
    <p>KageCoins: ${profile.kage}</p>
  `;
  container.innerHTML = '';
  container.appendChild(div);
}
export function saveProfile(profile){ localStorage.setItem('profile', JSON.stringify(profile)); }
