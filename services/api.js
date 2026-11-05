// Importamos la URL de la API
import { API_URL } from '../config/api';

// Funcion general para consultar la API de Laravel
export const apiRequest = async (endpoint, options = {}) => {
  try {
    // Realizamos la peticion con fetch 
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // Convertimos la respuesta a JSON
    const data = await response.json();

    // Revisamos si Laravel respondió con un error
    if (!response.ok) {
      throw new Error(
        data.message || 'Error al conectar con la API'
      );
    }

    return data;
  } catch (error) {
    console.error('Error en la petición:', error.message);
    throw error;
  }
};
