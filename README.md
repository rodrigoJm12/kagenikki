KageNikki — Diario de las Sombras (影日記)
Proyecto entregado en archivos separados (index.html, styles/, js/, sw.js, manifest.json)

Instrucciones rápidas:
1) Abre index.html localmente (algunas funciones Firebase requieren un servidor local o deploy).
2) En Firebase Console:
   - Agrega la app web y pega el firebaseConfig en js/firebase-config.js (ya incluido).
   - Habilita Authentication -> Sign-in method: Email/Password and Google.
   - Crea Firestore database in production mode and add rules:
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId}/entradas/{entryId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
3) Para usar PWA/Service Worker: sirve el sitio (ej: `npx serve .` o deploy en Netlify/Vercel) y abre desde HTTPS.
4) Deploy recomendado: Firebase Hosting, Netlify o Vercel. Si querés, te mando los pasos de deploy.

Archivos:
- index.html : UI principal
- styles/app.css : estilos
- js/firebase-config.js : configuración e inicialización Firebase (ya con tu config)
- js/app.js : lógica principal
- sw.js : service worker para PWA
- manifest.json : PWA manifest
- README.md : este archivo

Seguridad:
- Cambia las reglas de Firestore a producción antes de publicar.
- Revisa dominios autorizados en Firebase Console para OAuth.
