// Main application logic
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js';
import { collection, setDoc, doc, getDocs, query, orderBy, deleteDoc } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js';

// UI elements
const dateInput = document.getElementById('dateInput');
const moodInput = document.getElementById('moodInput');
const textInput = document.getElementById('textInput');
const saveBtn = document.getElementById('saveBtn');
const newBtn = document.getElementById('newBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const exportBtn = document.getElementById('exportBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const entriesDiv = document.getElementById('entries');
const searchInput = document.getElementById('searchInput');
const orderSelect = document.getElementById('orderSelect');
const charCount = document.getElementById('charCount');
const countAll = document.getElementById('countAll');
const streakEl = document.getElementById('streak');
const authBox = document.getElementById('authBox');
const chartEl = document.getElementById('chart');

const STORAGE_KEY = 'kagenikki:entries:v2';
const PENDING_KEY = 'kagenikki:pending:v2';
let editingId = null;
let currentUser = null;

function todayStr(){ return new Date().toISOString().slice(0,10) }
function nowISO(){ return new Date().toISOString() }
function genId(){ return 'id-'+Math.random().toString(36).slice(2,9) }

function loadLocal(){ const raw = localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):[] }
function saveLocal(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) }
function loadPending(){ const raw = localStorage.getItem(PENDING_KEY); return raw?JSON.parse(raw):[] }
function savePending(list){ localStorage.setItem(PENDING_KEY, JSON.stringify(list)) }

function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') }

function addLocal(entry){ const list = loadLocal(); list.push(entry); saveLocal(list) }
function updateLocal(entry){ let list = loadLocal(); list = list.map(e=> e.id===entry.id? entry : e); saveLocal(list) }
function removeLocal(id){ let list = loadLocal(); list = list.filter(e=>e.id!==id); saveLocal(list) }

async function saveToFirestore(entry){ if(!currentUser){ queuePending(entry); return } try{ await setDoc(doc(db, 'users', currentUser.uid, 'entradas', entry.id), entry); }catch(e){ console.warn('saveToFirestore failed', e); queuePending(entry) } }

async function loadFromFirestore(){ if(!currentUser) return []; try{ const q = query(collection(db, 'users', currentUser.uid, 'entradas'), orderBy('createdAt','desc')); const snap = await getDocs(q); const out = []; snap.forEach(s=> out.push(s.data())); return out; }catch(e){ console.error('Error loading from Firestore', e); return []; } }

function queuePending(entry){ const p = loadPending(); p.push(entry); savePending(p) }

async function flushPending(){ const pending = loadPending(); if(!pending.length || !currentUser) return; for(const p of pending){ try{ await setDoc(doc(db, 'users', currentUser.uid, 'entradas', p.id), p) }catch(e){ console.warn('flush failed', e); return } } savePending([]); console.log('Pending flushed') }

function computeStreak(list){ const dates = new Set(list.map(e=> e.date)); let streak=0; let d = new Date(); while(true){ const s = d.toISOString().slice(0,10); if(dates.has(s)){ streak++; d.setDate(d.getDate()-1) } else break } return streak }

let chart = null;
function renderChart(list){
  const days = 30; const counts = {}; const labels = [];
  for(let i=days-1;i>=0;i--){ const d=new Date(); d.setDate(d.getDate()-i); const s=d.toISOString().slice(0,10); labels.push(s); counts[s]=0 }
  list.forEach(e=>{ if(counts[e.date]!==undefined) counts[e.date]++ })
  const data = labels.map(l=>counts[l]);
  if(chart){ chart.data.labels = labels; chart.data.datasets[0].data = data; chart.update(); return }
  chart = new Chart(chartEl.getContext('2d'), { type:'bar', data:{ labels, datasets:[{ label:'Entradas', data, backgroundColor:'rgba(125,211,252,0.2)', borderColor:'rgba(125,211,252,0.8)', borderWidth:1 }] }, options:{scales:{y:{beginAtZero:true}}} })
}

function render(){
  const q = (searchInput.value||'').toLowerCase(), order = orderSelect.value;
  let list = loadLocal();
  list = list.filter(e=> !q || (e.text||'').toLowerCase().includes(q) || (e.date||'').toLowerCase().includes(q) || (e.mood||'').toLowerCase().includes(q));
  list.sort((a,b)=> order==='desc' ? b.createdAt.localeCompare(a.createdAt) : a.createdAt.localeCompare(b.createdAt));
  entriesDiv.innerHTML = '';
  if(!list.length){ entriesDiv.innerHTML = '<p class="small">No hay entradas aún.</p>'; countAll.textContent='0'; renderChart([]); streakEl.textContent='0'; return }
  list.forEach(e=>{
    const el = document.createElement('div'); el.className='entry';
    el.innerHTML = `<div class="meta"><span>${e.date||''} ${e.mood? '• '+escapeHtml(e.mood):''}</span><span>${new Date(e.createdAt).toLocaleString()}</span></div><div style="margin-top:8px;white-space:pre-wrap">${escapeHtml(e.text)}</div><div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"><button data-id="${e.id}" class="editBtn ghost">Editar</button><button data-id="${e.id}" class="delBtn ghost">Eliminar</button><button data-id="${e.id}" class="copyBtn ghost">Copiar</button></div>`;
    entriesDiv.appendChild(el);
  })
  attachListeners();
  countAll.textContent = list.length;
  renderChart(list);
  streakEl.textContent = computeStreak(list);
}

function attachListeners(){
  document.querySelectorAll('.editBtn').forEach(b=> b.onclick = ()=>{ const id = b.getAttribute('data-id'); const entry = loadLocal().find(x=>x.id===id); if(!entry) return; editingId = id; dateInput.value = entry.date; moodInput.value = entry.mood; textInput.value = entry.text; saveBtn.textContent = 'Actualizar entrada'; window.scrollTo({top:0,behavior:'smooth'}) })
  document.querySelectorAll('.delBtn').forEach(b=> b.onclick = async ()=>{ const id = b.getAttribute('data-id'); if(!confirm('Eliminar entrada?')) return; removeLocal(id); try{ if(currentUser) await deleteDoc(doc(db,'users',currentUser.uid,'entradas',id)) }catch(e){ console.warn('No se pudo eliminar en Firestore',e) } render() })
  document.querySelectorAll('.copyBtn').forEach(b=> b.onclick = async ()=>{ const id = b.getAttribute('data-id'); const entry = loadLocal().find(x=>x.id===id); if(!entry) return; try{ await navigator.clipboard.writeText(entry.text||''); alert('Texto copiado al portapapeles') }catch(e){ alert('No se pudo copiar') } })
}

saveBtn.onclick = async ()=>{
  const text = textInput.value.trim(); if(!text){ alert('La entrada está vacía.'); return }
  const date = dateInput.value || todayStr(); const mood = moodInput.value.trim();
  if(editingId){
    const entry = { id: editingId, date, mood, text, createdAt: nowISO() }
    updateLocal(entry);
    if(currentUser) await setDoc(doc(db,'users',currentUser.uid,'entradas',entry.id), entry).catch(e=>{ console.warn(e); queuePending(entry) });
    editingId = null; saveBtn.textContent = 'Guardar entrada'; clearForm(); render();
  } else {
    const id = genId(); const entry = { id, date, mood, text, createdAt: nowISO() };
    addLocal(entry); saveToFirestore(entry); render(); clearForm();
  }
}

function clearForm(){ dateInput.value = todayStr(); moodInput.value=''; textInput.value=''; charCount.textContent=''; editingId = null; saveBtn.textContent='Guardar entrada' }
newBtn.onclick = clearForm;
textInput.oninput = ()=> charCount.textContent = `${textInput.value.length} caracteres`;

exportBtn.onclick = ()=>{ const blob = new Blob([JSON.stringify(loadLocal(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='kagenikki-entries.json'; a.click(); URL.revokeObjectURL(url) }

exportPdfBtn.onclick = async ()=>{
  const { jsPDF } = window.jspdf; const doc = new jsPDF(); const list = loadLocal(); let y=10; list.forEach((e,i)=>{ doc.setFontSize(12); doc.text(`${e.date} ${e.mood||''}`,10,y); y+=6; const lines = doc.splitTextToSize(e.text, 180); doc.setFontSize(10); doc.text(lines,10,y); y += lines.length*6 + 8; if(y>270 && i<list.length-1){ doc.addPage(); y=10 } }); doc.save('kagenikki.pdf');
}

copyBtn.onclick = async ()=>{ try{ await navigator.clipboard.writeText(textInput.value||''); alert('Texto copiado') }catch(e){ alert('No se pudo copiar') } }
shareBtn.onclick = async ()=>{ if(navigator.share){ try{ await navigator.share({ title:'Entrada KageNikki', text:textInput.value }); }catch(e){ console.warn('share failed', e) } } else { alert('Compartir no soportado en este navegador') } }

// --- AUTH UI ---
function renderAuthUI(user){
  authBox.innerHTML = '';
  if(user){
    currentUser = user;
    const div = document.createElement('div');
    div.innerHTML = `<div class="muted">Conectado: ${user.email || user.displayName || user.uid}</div><div style="display:flex;gap:6px;margin-top:6px"><button id="signOutBtn" class="ghost">Salir</button></div>`;
    authBox.appendChild(div);
    document.getElementById('signOutBtn').onclick = async ()=>{ await signOut(auth) };
    flushPending().then(()=> syncFromCloud());
  } else {
    currentUser = null;
    const html = `<div style="display:flex;flex-direction:column;gap:6px"><input id="emailInput" type="email" placeholder="Email" /><input id="passInput" type="password" placeholder="Contraseña" /><div style="display:flex;gap:6px"><button id="signInBtn" class="ghost">Entrar</button><button id="signUpBtn" class="ghost">Crear cuenta</button></div><button id="googleBtn" class="ghost">Entrar con Google</button></div>`;
    authBox.innerHTML = html;
    document.getElementById('signUpBtn').onclick = async ()=>{ const email = document.getElementById('emailInput').value; const pass = document.getElementById('passInput').value; try{ await createUserWithEmailAndPassword(auth,email,pass); alert('Cuenta creada') }catch(e){ alert('Error crear cuenta: '+e.message) } }
    document.getElementById('signInBtn').onclick = async ()=>{ const email = document.getElementById('emailInput').value; const pass = document.getElementById('passInput').value; try{ await signInWithEmailAndPassword(auth,email,pass); }catch(e){ alert('Error entrar: '+e.message) } }
    document.getElementById('googleBtn').onclick = async ()=>{ try{ const provider = new GoogleAuthProvider(); await signInWithPopup(auth,provider); }catch(e){ alert('Google sign-in falló: '+e.message) } }
  }
}

onAuthStateChanged(auth, async (user)=>{ renderAuthUI(user) })

// --- Sync & merge ---
async function syncFromCloud(){
  if(!currentUser) return;
  try{
    const cloud = await loadFromFirestore();
    const local = loadLocal();
    const map = new Map(local.map(x=>[x.id,x]));
    cloud.forEach(c=> map.set(c.id,c));
    const merged = Array.from(map.values());
    saveLocal(merged);
    render();
  }catch(e){ console.error('syncFromCloud error', e) }
}

window.addEventListener('online', ()=>{ if(currentUser) flushPending().then(()=> syncFromCloud()) })

// init
(function init(){ dateInput.value = todayStr(); render(); })()
