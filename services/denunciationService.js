import { apiRequest } from './api';

// Consultar denuncias publicas
export const obtenerDenuncias = () => {
  return apiRequest('/denunciations');
};

// Enviar una denuncia
export const crearDenuncia = (datos) => {
  return apiRequest('/denunciations', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
};

// Consultar las denuncias del usuario autenticado
export const obtenerMisDenuncias = (token) => {
  return apiRequest('/denunciations/mine', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
