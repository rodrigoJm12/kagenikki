export function renderStore(container){
  const profile = JSON.parse(localStorage.getItem('profile')) || {kage:100, items:[]};
  const items = [
    {id:'bg1', name:'Fondo Sakura', cost:50},
    {id:'sticker1', name:'Sticker Ninja', cost:30}
  ];

  const div = document.createElement('div');
  div.innerHTML = `<h2>🛒 Tienda</h2>`;
  const list = document.createElement('div');
  list.className = 'entries';

  items.forEach(item=>{
    const el = document.createElement('div');
    el.className='entry';
    el.innerHTML=`${item.name} - ${item.cost} KageCoins 
      <button>Comprar</button>`;
    el.querySelector('button').onclick=()=>{
      if(profile.kage >= item.cost){
        profile.kage -= item.cost;
        profile.items.push(item.id);
        localStorage.setItem('profile',JSON.stringify(profile));
        alert('Comprado: '+item.name);
      } else alert('No tienes suficientes KageCoins');
    };
    list.appendChild(el);
  });

  div.appendChild(list);
  container.innerHTML='';
  container.appendChild(div);
}
