export function renderDreams(container){
  const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
  const div=document.createElement('div');
  div.innerHTML=`<h2>💭 Sueños / Ideas</h2>
    <textarea id="dreamInput" placeholder="Escribe un sueño..."></textarea>
    <button id="saveDream">Guardar</button>
    <div id="dreamList"></div>
  `;
  container.innerHTML=''; container.appendChild(div);

  const saveBtn = div.querySelector('#saveDream');
  const input = div.querySelector('#dreamInput');
  const listDiv = div.querySelector('#dreamList');

  function refresh(){
    listDiv.innerHTML='';
    dreams.forEach((d,i)=>{
      const el=document.createElement('div');
      el.className='entry';
      el.textContent=d;
      listDiv.appendChild(el);
    });
  }

  saveBtn.onclick=()=>{
    const val = input.value.trim();
    if(!val) return alert('Vacío');
    dreams.push(val);
    localStorage.setItem('dreams',JSON.stringify(dreams));
    input.value=''; refresh();
  }

  refresh();
}
