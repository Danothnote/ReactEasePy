import axios from "axios";
import type { FormData, LoginResponse } from "../types/formTypes";

const API_URL = 'http://localhost:8000/users/';
axios.defaults.withCredentials = true;

export const loginService = async (userData: FormData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(API_URL + 'login', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en el inicio de sesión:', error.response?.data || error.message);
      throw new Error(error.response?.data?.detail || 'Error al iniciar sesión');
    } else {
      console.error('Error inesperado:', error);
      throw new Error('Ha ocurrido un error inesperado');
    }
  }
};