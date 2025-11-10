import { initAuth } from './security/auth.js';
import { renderProfile } from './profile.js';
import { renderDiary } from './diary.js';
import { renderChat } from './chat-sensei.js';
import { renderStore } from './store.js';

const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.onclick = () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
};

document.getElementById('profileBtn').onclick = () => {
  renderProfile(document.getElementById('app'));
};

// Inicializaciones
initAuth();
renderDiary(document.getElementById('app'));
renderChat(document.getElementById('app'));
renderStore(document.getElementById('app'));
