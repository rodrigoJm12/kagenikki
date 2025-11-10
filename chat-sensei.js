export function renderChat(container){
  const div = document.createElement('div');
  div.innerHTML = `<h2>💬 Chat</h2>
  <input id="chatInput" placeholder="Escribe un mensaje...">
  <button id="sendChat">Enviar</button>`;
  container.appendChild(div);

  document.getElementById('sendChat').onclick = () => {
    const msg = document.getElementById('chatInput').value;
    if(msg) alert('Mensaje enviado: ' + msg);
  };
}
