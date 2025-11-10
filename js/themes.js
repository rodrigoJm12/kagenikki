export function applyTheme(theme){
  document.body.style.backgroundImage=`url('assets/backgrounds/${theme}.jpg')`;
  localStorage.setItem('themeBg',theme);
}
