import type { NavigateFunction } from "react-router";
import type { FormData } from "../types/formTypes";
import { useState } from "react";
import axios from "axios";
import type { AuthResponse } from "../types/authTypes";

export const useNewFlat = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const API_BASE_URL = "http://localhost:8000";
  axios.defaults.withCredentials = true;

  const newFlat = async (formData: FormData, navigate: NavigateFunction) => {
    setLoading(true);

    try {
      const response = await axios.post<AuthResponse>(
        `${API_BASE_URL}/all_flats/new_flat`,
        formData
      );

      if (response.status === 200) {
        setLoading(false);
        navigate("/myFlats");
        return response.data.message;
      }

      setLoading(false);
      return response.data.message;
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        console.error(
          "Error al publicar:",
          error.response?.data || error.message
        );
        throw new Error(error.response?.data?.detail || "Error al publicar");
      } else {
        console.error("Error inesperado:", error);
        throw new Error("Ha ocurrido un error inesperado");
      }
    }
  };

  return { newFlat, loading };
};
