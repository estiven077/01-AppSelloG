import { apiRequest } from './api';

// Consultar las mascotas disponibles
export const obtenerMascotas = () => {
  return apiRequest('/pets');
};

// Consultar mascotas de la fundacion autenticada
export const obtenerMascotasFundacion = (token) => {
  return apiRequest('/foundation/pets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Crear una mascota desde el panel de fundación
export const crearMascota = (datos, token) => {
  return apiRequest('/foundation/pets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datos),
  });
};
