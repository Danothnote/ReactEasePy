import type { FooterStrings } from "../types/footerTypes";

export const footerStrings: FooterStrings = {
  title: "Acerca de Nosotros",
  about: {
    title: "¿Por qué elegirnos?",
    list: [
      "Renta inmediatamente",
      "Sin tiempos de espera",
      "Escoge el que más te guste",
      "Opciones imprecionantes",
      "Precios increibles",
    ],
  },
  social: {
    title: "Síguenos en nuestras redes sociales",
    list: [
      {
        name: "YouTube",
        iconUrl: "http://localhost:8000/static/images/socials/youtube.webp",
        socialUrl: "https://youtube.com",
      },
      {
        name: "Instagram",
        iconUrl: "http://localhost:8000/static/images/socials/instagram.webp",
        socialUrl: "https://instagram.com",
      },
      {
        name: "TikTok",
        iconUrl: "http://localhost:8000/static/images/socials/tiktok.webp",
        socialUrl: "https://tiktok.com",
      },
      {
        name: "Facebook",
        iconUrl: "http://localhost:8000/static/images/socials/facebook.webp",
        socialUrl: "https://facebook.com",
      },
    ],
  },
  contact: {
    title: "Escríbenos a nuestro WhatsApp",
    list: [{ number: "+593 998 551 234", iconUrl: "http://localhost:8000/static/images/socials/whatsapp.webp" }],
  },
  copyright: "BaobabTech. Todos los derechos reservados."
};