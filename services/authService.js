import { apiRequest } from './api';

// Iniciar sesion
export const iniciarSesion = (email, password) => {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

// Registrar usuario civil
export const registrarUsuario = (datos) => {
  return apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
};

// Registrar fundacion
export const registrarFundacion = (datos) => {
  return apiRequest('/register/foundation', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
};

// Consultar el usuario autenticado
export const obtenerUsuario = (token) => {
  return apiRequest('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Cerrar sesióo
export const cerrarSesion = (token) => {
  return apiRequest('/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
