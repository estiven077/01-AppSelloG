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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  background: "#0A0C0E",
  surface: "#12161A",
  activePurple: "#A855F7",
  textLight: "#F8FAFC",
  textMuted: "#64748B",
};

// URL DE TU API DE LARAVEL
const API_URL = "https://tu-dominio-laravel.com";

export default function DrawerMenu() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  // COMPROBAR ESTADO DE AUTENTICACIÓN
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // COMPROBACIÓN PARA MÓVIL Y WEB
  const checkAuthStatus = async () => {
    try {
      let token = null;

      // WEB usa AsyncStorage
      if (Platform.OS === "web") {
        token = await AsyncStorage.getItem("user_token");
      } else {
        // MÓVIL usa SecureStore
        token = await SecureStore.getItemAsync("user_token");
      }

      if (token) {
        const savedUser = await AsyncStorage.getItem("user_data");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Datos de prueba mientras responde el backend
          setUser({
            name: "Carlos Mendoza",
            email: "carlos.guardian@email.com",
            avatar: "https://unsplash.com",
          });
        }

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(
        "Error al verificar el estado de la autenticación:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // CERRAR SESIÓN
  const handleLogout = async () => {
    try {
      setLoading(true);

      let token = null;

      // Obtener token según la plataforma
      if (Platform.OS === "web") {
        token = await AsyncStorage.getItem("user_token");
      } else {
        token = await SecureStore.getItemAsync("user_token");
      }

      if (token) {
        // Petición POST hacia Laravel
        await fetch(`${API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).catch(() =>
          console.warn(
            "Servidor inaccesible, limpiando datos locales."
          )
        );
      }

      // Eliminar token según la plataforma
      if (Platform.OS === "web") {
        await AsyncStorage.removeItem("user_token");
      } else {
        await SecureStore.deleteItemAsync("user_token");
      }

      // Eliminar datos del usuario
      await AsyncStorage.removeItem("user_data");

      setIsLoggedIn(false);

      setUser({
        name: "",
        email: "",
        avatar: "",
      });

      router.replace("/(auth)/login");

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

  // CARGANDO
  if (loading) {
    return (
      <View
        style={[
          styles.modalOverlay,
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

  return (
    <View style={styles.modalOverlay}>

      {/* MENÚ */}
      <View style={styles.menuContainer}>

        {/* PERFIL */}
        <View style={styles.header}>
          {isLoggedIn ? (
            <TouchableOpacity
              style={styles.userCard}
              activeOpacity={0.7}
              onPress={() => {
                router.back();
                router.push("/Perfil");
              }}
            >
              <Image
                source={{
                  uri:
                    user.avatar ||
                    "https://placeholder.com",
                }}
                style={styles.avatar}
              />

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

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          ) : (

            /* INVITADO */
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
                  router.back();
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

        {/* OPCIONES */}
        <View style={styles.options}>

          {/* MIS DENUNCIAS */}
          {isLoggedIn && (
            <TouchableOpacity
              style={styles.link}
              onPress={() => {
                router.back();
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

          {/* SOBRE NOSOTROS */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.back();
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

          {/* CONFIGURACIÓN */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              Alert.alert(
                "Configuración",
                "Aquí podrás gestionar las preferencias y notificaciones de la aplicación."
              );
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

          {/* PRIVACIDAD */}
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              router.back();
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

        {/* FOOTER */}
        <View style={styles.footer}>

          {/* CERRAR SESIÓN */}
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

      {/* CERRAR MENÚ */}
      <TouchableOpacity
        style={styles.closeOverlay}
        activeOpacity={1}
        onPress={() => router.back()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    flexDirection: "row",
  },

  menuContainer: {
    width: 300,
    backgroundColor: COLORS.background,
    height: "100%",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },

  closeOverlay: {
    flex: 1,
    height: "100%",
  },

  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.06)",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.activePurple,
  },

  userTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  userName: {
    color: COLORS.textLight,
    fontWeight: "bold",
    fontSize: 15,
  },

  userEmail: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },

  guestContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },

  guestAvatarBg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  guestTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },

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

  loginButtonText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 7,
  },

  options: {
    flex: 1,
    marginTop: 20,
  },

  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  linkContent: {
    flex: 1,
    marginLeft: 15,
  },

  linkText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "500",
  },

  linkDescription: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 3,
  },

  footer: {
    justifyContent: "flex-end",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.06)",
  },

  logoutText: {
    color: "#EF4444",
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 15,
  },
});