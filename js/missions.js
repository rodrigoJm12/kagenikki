export function renderMissions(container){
  const missions = JSON.parse(localStorage.getItem('missions')) || [
    {name:'Primer Diario', done:false}
  ];
  const div=document.createElement('div');
  div.innerHTML=`<h2>🎯 Misiones</h2>`;
  missions.forEach((m,i)=>{
    const el=document.createElement('div');
    el.className='entry';
    el.innerHTML=`${m.name} - ${m.done?'✅':'❌'} <button>Completar</button>`;
    el.querySelector('button').onclick=()=>{
      m.done=true;
      localStorage.setItem('missions',JSON.stringify(missions));
      renderMissions(container);
    };
    div.appendChild(el);
  });
  container.innerHTML=''; container.appendChild(div);
}
