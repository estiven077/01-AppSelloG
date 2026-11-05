
/* Obtenemos la URL de la API desde el archivo .env. */
export const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Comprobamos que la URL este configurada
if (!API_URL) {
  throw new Error('No se ha configurado la URL de la API');
}