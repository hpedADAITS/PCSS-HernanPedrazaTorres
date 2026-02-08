// Inyectar librería CSS Devicon desde CDN (iconos de lenguajes de programación)
const deviconLink = document.createElement('link');
deviconLink.rel = 'stylesheet'; // Relación: hoja de estilos
deviconLink.type = 'text/css'; // Tipo MIME
deviconLink.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'; // CDN jsdelivr (rápido)
document.head.appendChild(deviconLink); // Agregar a <head> para cargar estilos
