import axios from 'axios';

/**
 * Utilitário para o Pixel do Facebook e CAPI
 */

// @ts-ignore
export const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Enviar evento para a API de Conversões (Servidor)
const sendToCAPI = async (eventName: string, eventData = {}, userData = {}) => {
  try {
    await axios.post('/api/fb-event', {
      eventName,
      eventData,
      userData
    });
  } catch (error) {
    console.error('Erro ao enviar para CAPI:', error);
  }
};

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('[PIXEL] Enviando PageView');
    window.fbq('track', 'PageView');
  }
  sendToCAPI('PageView');
};

// Rastrear eventos personalizados (ex: Purchase, Lead, AddToCart)
export const event = (name: string, options = {}, userData = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log(`[PIXEL] Enviando Evento: ${name}`, options);
    window.fbq('track', name, options);
  }
  sendToCAPI(name, options, userData);
};

export const initPixel = () => {
  console.log('[PIXEL] Tentando inicializar com ID:', FB_PIXEL_ID);
  if (!FB_PIXEL_ID) {
    console.error('[PIXEL] Erro: ID do Pixel não encontrado no ambiente (VITE_FB_PIXEL_ID)');
    return;
  }

  // Script padrão do Facebook Pixel
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  console.log('[PIXEL] Script injetado, chamando init');
  window.fbq('init', FB_PIXEL_ID);
  pageview();
};
