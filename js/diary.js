export function renderDiary(container){
  const entries = JSON.parse(localStorage.getItem('diary')) || [];
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>📝 Diario</h2>
    <textarea id="diaryInput" placeholder="今日、学校で..."></textarea>
    <button id="saveDiary">Guardar Entrada</button>
    <div id="diaryList"></div>
  `;
  container.innerHTML = '';
  container.appendChild(div);

  function refreshList(){
    const listDiv = document.getElementById('diaryList');
    listDiv.innerHTML = '';
    entries.forEach((e,i)=>{
      const el = document.createElement('div');
      el.className='entry';
      el.innerHTML=`<span>${e.date||new Date().toLocaleDateString()}</span>: ${e.text} 
      <button onclick="entries.splice(${i},1); localStorage.setItem('diary',JSON.stringify(entries)); refreshList()">🗑️</button>`;
      listDiv.appendChild(el);
    });
  }
  document.getElementById('saveDiary').onclick=()=>{
    const text=document.getElementById('diaryInput').value.trim();
    if(!text) return alert('La entrada está vacía.');
    entries.push({text,date:new Date().toLocaleDateString()});
    localStorage.setItem('diary',JSON.stringify(entries));
    document.getElementById('diaryInput').value='';
    refreshList();
  }
  refreshList();
}
