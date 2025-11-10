export function renderStore(container){
  const div = document.createElement('div');
  div.innerHTML = `
    <h2>🛒 Tienda</h2>
    <button onclick="alert('Compraste un fondo!')">Fondo de ejemplo - 50 KageCoins</button>
    <button onclick="alert('Compraste un sticker!')">Sticker de ejemplo - 20 KageCoins</button>
  `;
  container.appendChild(div);
}
