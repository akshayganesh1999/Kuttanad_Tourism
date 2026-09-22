export const buildWhatsAppLink = (message = '') => {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};
