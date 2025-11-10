export function renderRPG(container){
  const profile = JSON.parse(localStorage.getItem('profile')) || {nivel:1, xp:0};
  const div = document.createElement('div');
  div.innerHTML=`
    <h2>🗡️ RPG</h2>
    <p>Nivel: ${profile.nivel} | XP: ${profile.xp}</p>
    <button id="train">Entrenar (+10 XP)</button>
  `;
  container.innerHTML=''; container.appendChild(div);

  div.querySelector('#train').onclick=()=>{
    profile.xp += 10;
    if(profile.xp>=100){ profile.nivel++; profile.xp=0; alert('¡Subiste de nivel!'); }
    localStorage.setItem('profile',JSON.stringify(profile));
    renderRPG(container);
  };
}
