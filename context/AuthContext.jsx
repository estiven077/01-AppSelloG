import { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const getToken = () =>
    Platform.OS === "web"
      ? AsyncStorage.getItem("user_token")
      : SecureStore.getItemAsync("user_token");

  const setToken = (token) =>
    Platform.OS === "web"
      ? AsyncStorage.setItem("user_token", token)
      : SecureStore.setItemAsync("user_token", token);

  const clearToken = () =>
    Platform.OS === "web"
      ? AsyncStorage.removeItem("user_token")
      : SecureStore.deleteItemAsync("user_token");

  // Al arrancar, carga el usuario desde el backend (no desde datos de prueba)
  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          const res = await fetch(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) setUser(await res.json());
          else await clearToken(); // token expirado --> limpiar
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Cerrar sesión, avisa al servidor y limpia todo
  const logout = async () => {
    const token = await getToken();
    if (token) {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    await clearToken();
    await AsyncStorage.removeItem("user_data");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn: !!user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
