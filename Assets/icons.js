// SVG Icon definitions
const icons = {
  phone: `<svg class="icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
    <path d="M19.95,21c-1.05,0-4.08-1.5-7.05-4.5-3-3-4.5-6-4.5-7.05C8.35,8.35,8.92,7.85,9.57,7.26c0.63-.56,1.32-1.18,1.32-2.04 c0-.98-.54-2.08-1.42-3.19c-.88-1.11-1.48-1.87-2.08-1.87c-.4,0-.81.35-1.19.73l-0.56.56C4.73,2.81,4,4.04,4,5.5 c0,3.83,2.45,7.8,6.54,11.89C14.63,21.48,18.6,24,22.43,24c1.46,0,2.69-.73,3.28-1.32l0.56-.56c0.38-.38,0.73-.79,0.73-1.19 c0-.6-.76-1.2-1.87-2.08c-1.11-.88-2.21-1.42-3.19-1.42c-.86,0-1.48.69-2.04,1.32c-.59.65-1.09,1.22-2.46,1.22z"/>
  </svg>`,

  email: `<svg class="icon" fill="currentColor" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
    <path d="M30,9.9C30,9.9,30,9.8,30,9.9c0-0.2-0.1-0.3-0.1-0.4c0,0,0,0,0,0c0,0,0,0,0,0c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0 c0,0,0,0,0,0l-13-9c-0.3-0.2-0.8-0.2-1.1,0l-13,9c0,0,0,0,0,0c0,0,0,0,0,0C2.3,9.3,2.2,9.4,2.2,9.4c0,0,0,0,0,0c0,0,0,0,0,0 C2.1,9.6,2,9.7,2,9.8c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1v13c0,2.8,2.2,5,5,5h18c2.8,0,5-2.2,5-5V10C30,10,30,9.9,30,9.9z M16,2.2 L27.2,10L16,16.8L4.8,10L16,2.2z"/>
  </svg>`,

  location: `<svg class="icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 28">
    <path d="M16,2C10.5,2,6,6.5,6,12c0,6,10,18,10,18s10-12,10-18C26,6.5,21.5,2,16,2z M16,16c-2.2,0-4-1.8-4-4s1.8-4,4-4 s4,1.8,4,4S18.2,16,16,16z"/>
  </svg>`
};

// Inject icons into DOM when called
function getIcon(name) {
  return icons[name] || '';
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { icons, getIcon };
}
