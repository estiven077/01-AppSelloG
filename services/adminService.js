import { apiRequest } from './api';
// Puedes agregar después las demás funciones para verificar fundaciones, asignar denuncias, consultar mascotas y actualizar la configuración

// Consultar estadisticas del administrador
export const obtenerEstadisticas = (token) => {
  return apiRequest('/admin/stats', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Consultar usuarios civiles
export const obtenerUsuariosCiviles = (token) => {
  return apiRequest('/admin/users/civiles', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Consultar fundaciones
export const obtenerFundaciones = (token) => {
  return apiRequest('/admin/foundations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Consultar denuncias del administrador
export const obtenerDenunciasAdmin = (token) => {
  return apiRequest('/admin/denunciations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


