import { contact } from '../data/content';

export const whatsappUrl = `https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.whatsappMessage)}`;
export const telUrl = `tel:+${contact.phone}`;
