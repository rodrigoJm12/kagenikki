export function renderDiary(container){
  const div = document.createElement('div');
  div.innerHTML = `<h2>📝 Diario</h2>
  <textarea id="diaryInput" placeholder="今日、学校で..."></textarea>
  <button id="saveDiary">Guardar Entrada</button>`;
  container.appendChild(div);

  document.getElementById('saveDiary').onclick = () => {
    const text = document.getElementById('diaryInput').value;
    if(text) alert('Entrada guardada: ' + text);
  };
}
