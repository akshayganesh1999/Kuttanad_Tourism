import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/whatsapp';

const WhatsAppButton = ({
  message = 'Hello Kuttanad Tourism, I would like to enquire about a Kerala trip.',
  label = 'Chat on WhatsApp',
  className = '',
}) => (
  <a
    href={buildWhatsAppLink(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95 ${className}`}
  >
    <MessageCircle size={18} />
    {label}
  </a>
);

export default WhatsAppButton;
