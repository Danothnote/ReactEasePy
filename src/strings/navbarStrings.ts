import type { NavbarStrings } from "../types/navbarTypes";

export const navbarStrings: NavbarStrings = {
  logo: {
    src: "http://localhost:8000/static/images/logo/logo.webp",
    alt: "logo",
  },
  avatar: {
    id: "avatar",
    alt: "avatar",
  },
  profileMenu: [
    {
      page: "/myFlats",
      label: "Mis Departamentos",
      id: "myFlatsLink",
      icon: "pi pi-building",
    },
    {
      page: "/allUsers",
      label: "Usuarios",
      id: "allUsersLink",
      icon: "pi pi-users",
    },
    {
      page: "/profile",
      label: "Mi Perfil",
      id: "profileLink",
      icon: "pi pi-user",
    },
    {
      page: "/login",
      label: "Cerrar Sesión",
      id: "logout",
      icon: "pi pi-sign-out",
    },
  ],
  greetings: {
    label: "Hola,",
    id: "greetings",
  },
  loginButton: {
    label: "Iniciar Sesión",
    id: "loginButton",
  },
  pages: [
    {
      page: "/",
      label: "Inicio",
      id: "homeLink",
      icon: "pi pi-home",
    },
    {
      page: "/allFlats",
      label: "Departamentos",
      id: "allFlatsLink",
      icon: "pi pi-building",
    },
    {
      page: "footer",
      label: "Nosotros",
      id: "aboutUsLink",
      icon: "pi pi-briefcase",
    },
  ],
};
