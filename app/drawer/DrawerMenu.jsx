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
    Share,   // Importacion funcion de compartir
  } from "react-native";

  import { useRouter } from "expo-router";
  import { Ionicons } from "@expo/vector-icons";

  import * as SecureStore from "expo-secure-store";
  import AsyncStorage from "@react-native-async-storage/async-storage";


  // COLORES


  const COLORS = {
    background: "#0A0C0E",
    surface: "#12161A",
    activePurple: "#7C3AED",
    textLight: "#F8FAFC",
    textMuted: "#64748B",
  };

  const API_URL = "https://tu-dominio-laravel.com";

  const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

  // DRAWER MENU

  export default function DrawerMenu() {

    // ROUTER

    const router = useRouter();

    // FUNCIÓN PARA CERRAR EL MENÚ



    const closeMenu = () => {
      router.back();
    };


    // ESTADOS


    // Indica si se está comprobando la sesión
    const [loading, setLoading] = useState(true);

    // Indica si el usuario está autenticado
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Información del usuario
    const [user, setUser] = useState({
      name: "",
      email: "",
      avatar: "",
    });

    // COMPROBAR SESIÓN AL CARGAR


    useEffect(() => {
      checkAuthStatus();
    }, []);


    // OBTENER TOKEN


    const getToken = async () => {
      try {

        // WEB


        if (Platform.OS === "web") {
          return await AsyncStorage.getItem("user_token");
        }


        // ANDROID / IOS

        return await SecureStore.getItemAsync("user_token");
      } catch (error) {
        console.error("Error al obtener el token:", error);
        return null;
      }
    };

    // ELIMINAR TOKEN


    const removeToken = async () => {
      try {

        // WEB


        if (Platform.OS === "web") {
          await AsyncStorage.removeItem("user_token");
        }


        // ANDROID / IOS


        else {
          await SecureStore.deleteItemAsync("user_token");
        }
      } catch (error) {
        console.error("Error al eliminar el token:", error);
      }
    };


    // COMPROBAR ESTADO DE AUTENTICACIÓN


    const checkAuthStatus = async () => {
      try {
        setLoading(true);

        // Obtener token
        const token = await getToken();


        // EXISTE TOKEN


        if (token) {
          // Buscar información del usuario
          const savedUser = await AsyncStorage.getItem("user_data");


          // SI EXISTEN DATOS GUARDADOS


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
              console.error(
                "Error al convertir user_data:",
                error
              );

              setUser({
                name: "Usuario",
                email: "",
                avatar: DEFAULT_AVATAR,
              });
            }
          }


          // SI NO EXISTEN DATOS GUARDADOS


          else {
            // Datos temporales mientras conectamos Laravel
            setUser({
              name: "Carlos Mendoza",
              email: "carlos.guardian@email.com",
              // avatar: DEFAULT_AVATAR,
            });
          }

          setIsLoggedIn(true);
        }


        // NO EXISTE TOKEN


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
          "Error al verificar el estado de autenticación:",
          error
        );

        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };


    // CERRAR SESIÓN


    const handleLogout = async () => {
      try {
        setLoading(true);

        // Obtener token
        const token = await getToken();


        // PETICIÓN AL BACKEND


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
            console.warn(
              "Servidor inaccesible, limpiando datos locales."
            );
          }
        }

        // LIMPIAR DATOS LOCALES


        await removeToken();

        await AsyncStorage.removeItem("user_data");

        // Actualizar estado
        setIsLoggedIn(false);

        setUser({
          name: "",
          email: "",
          avatar: "",
        });

        // IR AL LOGIN


        router.replace("/(auth)/login");


        // MENSAJE


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


    // MENÚ COMPLETO


    return (
      <View style={styles.container}>
        <View style={styles.menuContainer}>



          <View style={styles.header}>
            {isLoggedIn ? (
              <TouchableOpacity
                style={styles.userCard}
                activeOpacity={0.7}
                onPress={() => {
                  // Cerrar el menú
                  closeMenu();

                  // Ir al perfil
                  router.push("/Perfil");
                }}
              >
                {/* AVATAR */}

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
              /* =================================================
                MODO INVITADO
              ================================================= */

              <View style={styles.guestContainer}>
                {/* ICONO */}

                <View style={styles.guestAvatarBg}>
                  <Ionicons
                    name="person"
                    size={26}
                    color={COLORS.textMuted}
                  />
                </View>

                {/* TEXTO */}

                <Text style={styles.guestTitle}>
                  Modo Invitado
                </Text>

                {/* BOTÓN LOGIN */}

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={() => {
                    // Cerrar menú
                    closeMenu();

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
                activeOpacity={0.7}
                onPress={() => {
                  router.push("/drawer/MisCasos");
                }}
              >
                {/* ICONO */}

                <Ionicons
                  name="folder-open-outline"
                  size={22}
                  color={COLORS.textLight}
                />

                {/* TEXTO */}

                <View style={styles.linkContent}>
                  <Text style={styles.linkText}>
                    Mis Denuncias y Seguimientos
                  </Text>

                  <Text style={styles.linkDescription}>
                    Consulta tus casos y su estado
                  </Text>
                </View>

                {/* FLECHA */}

                <Ionicons
                  name="chevron-forward-outline"
                  size={18}
                  color={COLORS.textMuted}
                />
              </TouchableOpacity>
            )}

            {/* =================================================
                SOBRE SELLO GUARDIÁN
            ================================================= */}

            <TouchableOpacity
              style={styles.link}
              activeOpacity={0.7}
              onPress={() => {
                router.push("/drawer/SobreNosotros");
              }}
            >
              {/* ICONO */}

              <Ionicons
                name="information-circle-outline"
                size={22}
                color={COLORS.textLight}
              />

              {/* TEXTO */}

              <View style={styles.linkContent}>
                <Text style={styles.linkText}>
                  Sobre Sello Guardián
                </Text>

                <Text style={styles.linkDescription}>
                  Historia, misión y visión
                </Text>
              </View>

              {/* FLECHA */}

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
              activeOpacity={0.7}
              onPress={() => {
                router.push("/drawer/settings");
              }}
            >
              {/* ICONO */}

              <Ionicons
                name="settings-outline"
                size={22}
                color={COLORS.textLight}
              />

              {/* TEXTO */}

              <View style={styles.linkContent}>
                <Text style={styles.linkText}>
                  Configuración o Ajustes
                </Text>

                <Text style={styles.linkDescription}>
                  Preferencias y notificaciones
                </Text>
              </View>

              {/* FLECHA */}

              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>

            {/* =================================================
                PRIVACIDAD Y CONTACTO
            ================================================= */}

            <TouchableOpacity
              style={styles.link}
              activeOpacity={0.7}
              onPress={() => {
                router.push("/drawer/Privacidad");
              }}
            >
              {/* ICONO */}

              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={COLORS.textLight}
              />

              {/* TEXTO */}

              <View style={styles.linkContent}>
                <Text style={styles.linkText}>
                  Privacidad y Contacto
                </Text>

                <Text style={styles.linkDescription}>
                  Términos, privacidad y soporte
                </Text>
              </View>

              {/* FLECHA */}

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
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                {/* ICONO */}

                <Ionicons
                  name="log-out-outline"
                  size={22}
                  color="#EF4444"
                />

                {/* TEXTO */}

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
    // TARJETA USUARIO
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
    // CONTENEDOR TEXTO USUARIO
    // ===================================================

    userTextContainer: {
      marginLeft: 12,
      flex: 1,
    },

    // ===================================================
    // NOMBRE USUARIO
    // ===================================================

    userName: {
      color: COLORS.textLight,
      fontWeight: "bold",
      fontSize: 15,
    },

    // ===================================================
    // EMAIL USUARIO
    // ===================================================

    userEmail: {
      color: COLORS.textMuted,
      fontSize: 12,
      marginTop: 2,
    },

    // ===================================================
    // CONTENEDOR INVITADO
    // ===================================================

    guestContainer: {
      alignItems: "center",
      paddingVertical: 5,
    },

    // ===================================================
    // FONDO AVATAR INVITADO
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
    // TITULO INVITADO
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
    // TEXTO BOTÓN LOGIN
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
    // CONTENIDO LINK
    // ===================================================

    linkContent: {
      flex: 1,
      marginLeft: 15,
    },

    // ===================================================
    // TEXTO LINK
    // ===================================================

    linkText: {
      color: COLORS.textLight,
      fontSize: 14,
      fontWeight: "500",
    },

    // ===================================================
    // DESCRIPCIÓN LINK
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
    // BOTÓN CERRAR SESIÓN
    // ===================================================

    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 14,
      borderTopWidth: 1,
      borderTopColor: "rgba(255,255,255,0.06)",
    },

    // ===================================================
    // TEXTO CERRAR SESIÓN
    // ===================================================

    logoutText: {
      color: "#EF4444",
      marginLeft: 15,
      fontWeight: "bold",
      fontSize: 15,
    },
  });