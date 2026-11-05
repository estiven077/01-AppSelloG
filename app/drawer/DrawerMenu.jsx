import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context/ThemeContext";

const API_URL = "https://tu-dominio-laravel.com";
const USER_ENDPOINT = "/api/user";
const LOGOUT_ENDPOINT = "/api/logout";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";
const DRAWER_WIDTH = Math.min(Dimensions.get("window").width * 0.8, 320);

export default function DrawerMenu() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { theme, colors } = useTheme();

  const closeMenu = () => {
    if (router.canDismiss()) {
      router.dismiss();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)/Home");
    }
  };

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    role: "usuario",
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const getToken = async () => {
    try {
      if (Platform.OS === "web") {
        return await AsyncStorage.getItem("user_token");
      }
      return await SecureStore.getItemAsync("user_token");
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null;
    }
  };

  const removeToken = async () => {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem("user_token");
      } else {
        await SecureStore.deleteItemAsync("user_token");
      }
    } catch (error) {
      console.error("Error al eliminar el token:", error);
    }
  };

  const clearSession = async () => {
    await removeToken();
    await AsyncStorage.removeItem("user_data");
    setIsLoggedIn(false);
    setUser({
      name: "",
      email: "",
      avatar: "",
      role: "usuario",
    });
  };

  const fetchUserFromApi = async (token) => {
    try {
      const response = await fetch(`${API_URL}${USER_ENDPOINT}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) return "unauthorized";
      if (!response.ok) return null;

      const data = await response.json();
      const apiUser = data.user ?? data.data ?? data;

      return {
        name: apiUser.name || "",
        email: apiUser.email || "",
        avatar: apiUser.avatar || apiUser.profile_photo_url || DEFAULT_AVATAR,
        role: apiUser.role || "usuario",
      };
    } catch (error) {
      console.warn("No se pudo consultar la API, se usan datos locales.");
      return null;
    }
  };

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (token) {
        const savedUser = await AsyncStorage.getItem("user_data");

        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser);
            setUser({
              name: parsedUser.name || "",
              email: parsedUser.email || "",
              avatar: parsedUser.avatar || DEFAULT_AVATAR,
              role: parsedUser.role || "usuario",
            });
          } catch (error) {
            setUser({
              name: "Usuario",
              email: "",
              avatar: DEFAULT_AVATAR,
              role: "usuario",
            });
          }
        } else {
          setUser({
            name: "Carlos Mendoza",
            email: "carlos.guardian@email.com",
            avatar: DEFAULT_AVATAR,
            role: "usuario",
          });
        }

        setIsLoggedIn(true);
        setLoading(false);

        const apiUser = await fetchUserFromApi(token);

        if (apiUser === "unauthorized") {
          await clearSession();
        } else if (apiUser) {
          setUser(apiUser);
          await AsyncStorage.setItem("user_data", JSON.stringify(apiUser));
        }
      } else {
        setIsLoggedIn(false);
        setUser({ name: "", email: "", avatar: "", role: "usuario" });
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      if (token) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);

        try {
          await fetch(`${API_URL}${LOGOUT_ENDPOINT}`, {
            method: "POST",
            signal: controller.signal,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          console.warn("Servidor inaccesible, limpiando datos locales.");
        } finally {
          clearTimeout(timeout);
        }
      }

      await clearSession();

      if (router.canDismiss()) {
        router.dismiss();
      }
      setTimeout(() => {
        router.replace("/(auth)/login");
        Alert.alert("Sesión cerrada", "Has salido de Sello Guardián de forma segura.");
      }, 150);
    } catch (error) {
      console.error("Error en Logout:", error);
    } finally {
      setLoading(false);
    }
  };

  const goTo = (path) => {
    if (router.canDismiss()) {
      router.dismiss();
    }
    router.push(path);
  };

  const isDark = theme === "dark";
  const currentBg = colors.navbar;
  const textLight = colors.textLight;
  const textMuted = colors.textMuted;
  const borderColor = colors.border;

  const getRoleLabel = (role) => {
    switch (role) {
      case "fundacion": return "Fundación";
      case "admin":
      case "administrador": return "Administrador";
      default: return "Guardián";
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.drawer, { width: DRAWER_WIDTH, backgroundColor: currentBg, justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color={colors.activePurple} />
        </View>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* PANEL LATERAL */}
      <View style={[styles.drawer, { width: DRAWER_WIDTH, backgroundColor: currentBg }]}>
        <View style={[styles.menuContainer, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 15 }]}>
          
          {/* SECCIÓN SUPERIOR */}
          <View>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={closeMenu}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={textLight} />
            </TouchableOpacity>

            <View style={[styles.header, { borderBottomColor: borderColor }]}>
              {isLoggedIn ? (
                <TouchableOpacity
                  style={styles.userCard}
                  activeOpacity={0.7}
                  onPress={() => goTo("/Perfil")}
                >
                  <Image
                    source={{ uri: user.avatar || DEFAULT_AVATAR }}
                    style={[styles.avatar, { borderColor: colors.activePurple }]}
                  />
                  <View style={styles.userTextContainer}>
                    <Text style={[styles.userName, { color: textLight }]} numberOfLines={1}>
                      {user.name}
                    </Text>
                    <Text style={[styles.userEmail, { color: textMuted }]} numberOfLines={1}>
                      {user.email}
                    </Text>
                    <View style={[styles.roleBadge, { backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }]}>
                      <Text style={[styles.roleBadgeText, { color: colors.activePurple }]}>
                        {getRoleLabel(user.role)}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={20} color={textMuted} />
                </TouchableOpacity>
              ) : (
                <View style={styles.guestContainer}>
                  <View style={styles.guestAvatarWrapper}>
                    <View style={[styles.guestAvatarBg, { backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)", borderColor: colors.activePurple }]}>
                      <Ionicons name="person" size={40} color={textLight} />
                    </View>
                    <View style={[styles.guestBadge, { backgroundColor: currentBg, borderColor: colors.activePurple }]}>
                      <Text style={[styles.guestBadgeText, { color: textLight }]}>Modo Invitado</Text>
                    </View>
                  </View>
                  <Text style={[styles.guestTitle, { color: textLight }]}>¡Bienvenido a Sello Guardián!</Text>
                  <Text style={[styles.guestDescription, { color: textMuted }]}>
                    Únete a nuestra comunidad para reportar,{"\n"}adoptar o salvar vidas.
                  </Text>
                  <TouchableOpacity
                    style={[styles.loginButton, { backgroundColor: colors.activePurple }]}
                    onPress={() => goTo("/(auth)/login")}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.loginButtonText}>Iniciar Sesión / Registro</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* OPCIONES DEL MENÚ */}
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => goTo("/drawer/SobreNosotros")}
              >
                <Ionicons name="information-circle-outline" size={22} color={textLight} />
                <View style={styles.linkContent}>
                  <Text style={[styles.linkText, { color: textLight }]}>Sobre Sello Guardián</Text>
                  <Text style={[styles.linkDescription, { color: textMuted }]}>Quiénes somos y qué nos mueve</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color={textMuted} />
              </TouchableOpacity>
 
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() => goTo("/drawer/settings")}
              >
                <Ionicons name="settings-outline" size={22} color={textLight} />
                <View style={styles.linkContent}>
                  <Text style={[styles.linkText, { color: textLight }]}>Configuración</Text>
                  <Text style={[styles.linkDescription, { color: textMuted }]}>Preferencias, cuenta y seguridad</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={18} color={textMuted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* SECCIÓN INFERIOR: FRASES + BOTÓN DE CIERRE DE SESIÓN EN MORADO */}
          <View style={styles.footerSection}>
            <View style={styles.quoteContainer}>
              <Text style={[styles.quoteTitle, { color: colors.activePurple }]}>“Every paw print tells a story”</Text>
              <Text style={[styles.quoteSubtitle, { color: textMuted }]}>
                Algunas historias comienzan en las calles, pero todas merecen terminar en un hogar
              </Text>
            </View>

            {isLoggedIn && (
              <TouchableOpacity
                style={[
                  styles.purpleLogoutButton, 
                  { 
                    backgroundColor: isDark ? "rgba(168, 85, 247, 0.15)" : "rgba(147, 51, 234, 0.1)",
                    borderColor: colors.activePurple 
                  }
                ]}
                activeOpacity={0.8}
                onPress={handleLogout}
              >
                <Ionicons name="log-out-outline" size={18} color={colors.activePurple} />
                <Text style={[styles.purpleLogoutText, { color: colors.activePurple }]}>Cerrar Sesión</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>
      </View>

      {/* ZONA OSCURA */}
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu} />
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  drawer: {
    height: "100%",
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    marginBottom: 8,
  },
  header: {
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  userTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  userEmail: {
    fontSize: 11,
    marginTop: 1,
  },
  roleBadge: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  guestContainer: {
    alignItems: "center",
    paddingVertical: 2,
  },
  guestAvatarWrapper: {
    alignItems: "center",
    marginBottom: 8,
  },
  guestAvatarBg: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  guestBadge: {
    marginTop: -10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  guestBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  guestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  guestDescription: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 6,
  },
  options: {
    marginTop: 10,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 4,
    borderRadius: 10,
  },
  linkContent: {
    flex: 1,
    marginLeft: 12,
  },
  linkText: {
    fontSize: 13,
    fontWeight: "600",
  },
  linkDescription: {
    fontSize: 10,
    marginTop: 1,
  },
  footerSection: {
    marginTop: "auto",
    paddingTop: 10,
  },
  quoteContainer: {
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  quoteTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 3,
  },
  quoteSubtitle: {
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
  },
  purpleLogoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    width: "100%",
  },
  purpleLogoutText: {
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 10,
  },
});