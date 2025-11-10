export function renderChat(container){
  const chatHistory = JSON.parse(localStorage.getItem('chat')) || [];
  const div=document.createElement('div');
  div.innerHTML=`
    <h2>💬 Chat</h2>
    <div id="chatMessages" style="max-height:200px;overflow:auto;margin-bottom:8px;"></div>
    <input id="chatInput" placeholder="Escribe un mensaje...">
    <button id="sendChat">Enviar</button>
  `;
  container.innerHTML=''; container.appendChild(div);

  function refreshChat(){
    const chatDiv = document.getElementById('chatMessages');
    chatDiv.innerHTML='';
    chatHistory.forEach(m=>{
      const p=document.createElement('p'); p.textContent=`${m.date}: ${m.msg}`;
      chatDiv.appendChild(p);
    });
    chatDiv.scrollTop=chatDiv.scrollHeight;
  }

  document.getElementById('sendChat').onclick=()=>{
    const msg=document.getElementById('chatInput').value.trim();
    if(!msg) return;
    chatHistory.push({msg,date:new Date().toLocaleTimeString()});
    localStorage.setItem('chat',JSON.stringify(chatHistory));
    document.getElementById('chatInput').value='';
    refreshChat();
  }
  refreshChat();
}
