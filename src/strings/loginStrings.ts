import type { FormStrings } from "../types/formTypes";

export const loginStrings: FormStrings = {
  title: "Inicio de Sesión",
  imageUrl: "http://localhost:8000/static/images/wallpapers/login.webp",
  inputs: [
    {
      id: "email",
      type: "email",
      label: "Ingresa tu email",
      placeholder: "Ej: usuario@correo.com",
    },
    {
      id: "password",
      type: "password",
      label: "Ingresa tu contraseña",
      placeholder: "Ej: Secreto123*",
    },
  ],
  validations: {
    email: "Por favor, ingresa un email válido.",
    password: "Este campo es obligatorio",
  },
  toastSuccess: {
    severity: "success",
    summary: "¡Inicio de Sesión Exitoso!",
  },
  toastError: {
    severity: "error",
    summary: "Error al Iniciar Sesión",
  },
  primaryButton: "Iniciar Sesión",
  secondaryButton: "Registrarse",
  optional: "Olvidé mi contraseña",
};
