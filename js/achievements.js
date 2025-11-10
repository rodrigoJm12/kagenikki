export function renderAchievements(container){
  const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
  const div = document.createElement('div');
  div.innerHTML=`<h2>🏆 Logros</h2>`;
  if(!achievements.length) div.innerHTML+=`<p>No hay logros aún.</p>`;
  else achievements.forEach(a=>{
    const el = document.createElement('div');
    el.className='entry';
    el.textContent=a;
    div.appendChild(el);
  });
  container.innerHTML=''; container.appendChild(div);
}
