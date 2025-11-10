export function renderStory(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>📖 Story Mode</h2>
    <p>Comienzas tu aventura en la ciudad de Kage...</p>
  `;
  container.appendChild(div);
}
