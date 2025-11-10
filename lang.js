export const LANGUAGES = {
  es: 'Español',
  ja: '日本語',
  en: 'English'
};

export function changeLanguage(lang){
  localStorage.setItem('lang', lang);
  alert('Idioma cambiado a ' + LANGUAGES[lang]);
}
