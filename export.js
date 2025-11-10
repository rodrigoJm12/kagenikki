export function exportDiary(entries){
  const blob = new Blob([JSON.stringify(entries, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'diario.json';
  a.click();
}
