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
} from "react-native";

import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// =====================================================
// COLORES
// =====================================================

const COLORS = {
  background: "#0A0C0E",
  surface: "#12161A",
  activePurple: "#A855F7",
  textLight: "#F8FAFC",
  textMuted: "#64748B",
};

// =====================================================
// URL DE TU API DE LARAVEL
// =====================================================

// Cuando tengas tu API real, cambia esta URL.
const API_URL = "https://tu-dominio-laravel.com";

// =====================================================
// IMAGEN POR DEFECTO
// =====================================================

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

// =====================================================
// COMPONENTE DRAWER MENU
// =====================================================

export default function DrawerMenu() {
  // Router de Expo Router
  const router = useRouter();

  // Navigation pertenece al Drawer de Expo Router
  const navigation = useNavigation();

  // ===================================================
  // ESTADOS
  // ===================================================

  // Indica si estamos cargando la información
  const [loading, setLoading] = useState(true);

  // Indica si existe una sesión iniciada
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Información del usuario
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  // ===================================================
  // COMPROBAR SESIÓN AL CARGAR EL MENÚ
  // ===================================================

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // ===================================================
  // OBTENER TOKEN
  // ===================================================

  const getToken = async () => {
    try {
      // En web usamos AsyncStorage
      if (Platform.OS === "web") {
        return await AsyncStorage.getItem("user_token");
      }

      // En Android / iOS usamos SecureStore
      return await SecureStore.getItemAsync("user_token");
    } catch (error) {
      console.error("Error al obtener token:", error);
      return null;
    }
  };

  // ===================================================
  // ELIMINAR TOKEN
  // ===================================================

  const removeToken = async () => {
    try {
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem("user_token");
      } else {
        await SecureStore.deleteItemAsync("user_token");
      }
    } catch (error) {
      console.error("Error al eliminar token:", error);
    }
  };

  // ===================================================
  // COMPROBAR ESTADO DE AUTENTICACIÓN
  // ===================================================

  const checkAuthStatus = async () => {
    try {
      setLoading(true);

      // Obtener token guardado
      const token = await getToken();

      // =================================================
      // SI EXISTE TOKEN
      // =================================================

      if (token) {
        // Buscar información del usuario guardada
        const savedUser = await AsyncStorage.getItem("user_data");

        if (savedUser) {
          // Si existen datos guardados, los usamos
          setUser(JSON.parse(savedUser));
        } else {
          // Datos de prueba mientras responde el backend
          setUser({
            name: "Carlos Mendoza",
            email: "carlos.guardian@email.com",
            avatar: DEFAULT_AVATAR,
          });
        }

        setIsLoggedIn(true);
      }

      // =================================================
      // SI NO EXISTE TOKEN
      // =================================================

      else {
        setIsLoggedIn(false);

        setUser({
          name: "",
          email: "",
          avatar: "",
        });
      }
    } catch (error) {
      console.error(
        "Error al verificar el estado de la autenticación:",
        error
      );

      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // CERRAR SESIÓN
  // ===================================================

  const handleLogout = async () => {
    try {
      setLoading(true);

      // Obtener token
      const token = await getToken();

      // =================================================
      // AVISAR AL BACKEND
      // =================================================

      if (token) {
        try {
          await fetch(`${API_URL}/logout`, {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          // Si el servidor todavía no está conectado,
          // igualmente limpiamos la sesión local.
          console.warn(
            "Servidor inaccesible, limpiando datos locales."
          );
        }
      }

      // =================================================
      // LIMPIAR SESIÓN LOCAL
      // =================================================

      await removeToken();

      await AsyncStorage.removeItem("user_data");

      setIsLoggedIn(false);

      setUser({
        name: "",
        email: "",
        avatar: "",
      });

      // =================================================
      // CERRAR DRAWER
      // =================================================

      navigation.closeDrawer();

      // =================================================
      // IR AL LOGIN
      // =================================================

      router.replace("/(auth)/login");

      // =================================================
      // MENSAJE
      // =================================================

      Alert.alert(
        "Sesión Cerrada",
        "Has salido de Sello Guardián de forma segura."
      );
    } catch (error) {
      console.error("Error en Logout:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // PANTALLA DE CARGA
  // ===================================================

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={COLORS.activePurple}
        />
      </View>
    );
  }

  // ===================================================
  // MENÚ PRINCIPAL
  // ===================================================

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>

        {/* =================================================
            PERFIL
        ================================================= */}

        <View style={styles.header}>
          {isLoggedIn ? (
            <TouchableOpacity
              style={styles.userCard}
              activeOpacity={0.7}
              onPress={() => {
                // Cerrar Drawer
                navigation.closeDrawer();

                // Ir al perfil
                router.push("/Perfil");
              }}
            >
              {/* FOTO DEL USUARIO */}

              <Image
                source={{
                  uri: user.avatar || DEFAULT_AVATAR,
                }}
                style={styles.avatar}
              />

              {/* INFORMACIÓN DEL USUARIO */}

              <View style={styles.userTextContainer}>
                <Text
                  style={styles.userName}
                  numberOfLines={1}
                >
                  {user.name}
                </Text>

                <Text
                  style={styles.userEmail}
                  numberOfLines={1}
                >
                  {user.email}
                </Text>
              </View>

              {/* FLECHA */}

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          ) : (
            // =================================================
            // MODO INVITADO
            // =================================================

            <View style={styles.guestContainer}>
              <View style={styles.guestAvatarBg}>
                <Ionicons
                  name="person"
                  size={26}
                  color={COLORS.textMuted}
                />
              </View>

              <Text style={styles.guestTitle}>
                Modo Invitado
              </Text>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => {
                  // Cerrar Drawer
                  navigation.closeDrawer();

                  // Ir al login
                  router.push("/(auth)/login");
                }}
              >
                <Ionicons
                  name="log-in-outline"
                  size={18}
                  color={COLORS.textLight}
                />

                <Text style={styles.loginButtonText}>
                  Iniciar Sesión / Registro
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* =================================================
            OPCIONES DEL MENÚ
        ================================================= */}

        <View style={styles.options}>

          {/* =================================================
              MIS DENUNCIAS Y SEGUIMIENTOS
          ================================================= */}

          {isLoggedIn && (
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                // Ir a MisCasos
                router.push("/drawer/MisCasos");
              }}
            >
              <Ionicons
                name="folder-open-outline"
                size={22}
                color={COLORS.textLight}
              />

              <View style={styles.linkContent}>
                <Text style={styles.linkText}>
                  Mis Denuncias y Seguimientos
                </Text>

                <Text style={styles.linkDescription}>
                  Consulta tus casos y su estado
                </Text>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          )}

          {/* =================================================
              SOBRE NOSOTROS
          ================================================= */}

          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.push("/drawer/SobreNosotros");
            }}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={COLORS.textLight}
            />

            <View style={styles.linkContent}>
              <Text style={styles.linkText}>
                Sobre Sello Guardián
              </Text>

              <Text style={styles.linkDescription}>
                Historia, misión y visión
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {/* =================================================
              CONFIGURACIÓN
          ================================================= */}

          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.push("/drawer/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={COLORS.textLight}
            />

            <View style={styles.linkContent}>
              <Text style={styles.linkText}>
                Configuración o Ajustes
              </Text>

              <Text style={styles.linkDescription}>
                Preferencias y notificaciones
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {/* =================================================
              PRIVACIDAD
          ================================================= */}

          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.push("/drawer/Privacidad");
            }}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color={COLORS.textLight}
            />

            <View style={styles.linkContent}>
              <Text style={styles.linkText}>
                Privacidad y Contacto
              </Text>

              <Text style={styles.linkDescription}>
                Términos, privacidad y soporte
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>

          {/* =================================================
              CERRAR SESIÓN
          ================================================= */}

          {isLoggedIn && (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color="#EF4444"
              />

              <Text style={styles.logoutText}>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  // ===================================================
  // CONTENEDOR PRINCIPAL
  // ===================================================

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ===================================================
  // CONTENEDOR DEL MENÚ
  // ===================================================

  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  // ===================================================
  // TARJETA DEL USUARIO
  // ===================================================

  userCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  // ===================================================
  // AVATAR
  // ===================================================

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.activePurple,
  },

  // ===================================================
  // INFORMACIÓN DEL USUARIO
  // ===================================================

  userTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  // ===================================================
  // NOMBRE
  // ===================================================

  userName: {
    color: COLORS.textLight,
    fontWeight: "bold",
    fontSize: 15,
  },

  // ===================================================
  // EMAIL
  // ===================================================

  userEmail: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  // ===================================================
  // INVITADO
  // ===================================================

  guestContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },

  // ===================================================
  // ICONO DEL INVITADO
  // ===================================================

  guestAvatarBg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  // ===================================================
  // TÍTULO INVITADO
  // ===================================================

  guestTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

  // ===================================================
  // BOTÓN LOGIN
  // ===================================================

  loginButton: {
    backgroundColor: COLORS.activePurple,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  // ===================================================
  // TEXTO LOGIN
  // ===================================================

  loginButtonText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 7,
  },

  // ===================================================
  // OPCIONES
  // ===================================================

  options: {
    flex: 1,
    marginTop: 20,
  },

  // ===================================================
  // LINK
  // ===================================================

  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  // ===================================================
  // CONTENIDO DEL LINK
  // ===================================================

  linkContent: {
    flex: 1,
    marginLeft: 15,
  },

  // ===================================================
  // TEXTO DEL LINK
  // ===================================================

  linkText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "500",
  },

  // ===================================================
  // DESCRIPCIÓN
  // ===================================================

  linkDescription: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 3,
  },

  // ===================================================
  // FOOTER
  // ===================================================

  footer: {
    justifyContent: "flex-end",
  },

  // ===================================================
  // BOTÓN LOGOUT
  // ===================================================

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  // ===================================================
  // TEXTO LOGOUT
  // ===================================================

  logoutText: {
    color: "#EF4444",
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 15,
  },
});