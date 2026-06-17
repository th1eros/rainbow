const host = window.location.hostname;
const isDev = host === 'localhost' || host === '127.0.0.1';

window.__ENV__ = isDev ? 'development' : 'production';
window.__API_BLUE__ = isDev ? 'http://localhost:5073' : `https://blue.${host.replace(/^(blue|red|violet|silver)\./, '')}`;
window.__API_RED__ = isDev ? 'http://localhost:5074' : `https://red.${host.replace(/^(blue|red|violet|silver)\./, '')}`;
window.__API_VIOLET__ = isDev ? 'http://localhost:5075' : `https://violet.${host.replace(/^(blue|red|violet|silver)\./, '')}`;
window.__API_SILVER__ = isDev ? 'http://localhost:5076' : `https://silver.${host.replace(/^(blue|red|violet|silver)\./, '')}`;
window.__DEBUG__ = isDev;