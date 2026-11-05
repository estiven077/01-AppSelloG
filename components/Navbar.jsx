import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

// Importamos el logo
import logoSello from "../assets/LogoSelloG.png";

export default function Navbar({ unreadNotifications = 2 }) {
  const router = useRouter();
  const { theme, colors } = useTheme();

  const isDark = theme === "dark";
  // Colores adaptados al tema seleccionado (Modo claro/oscuro)
  const navbarBg = colors.navbar;
  const navbarBorder = colors.border;
  const textColor = colors.textLight;

  // Abrir el menu lateral
  const abrirMenuLateral = () => {
    router.push("/drawer");
  };

  return (
    <View
      style={[
        styles.navbar,
        {
          backgroundColor: navbarBg,
          borderBottomColor: navbarBorder,
          
          // Sombra suave debajo del navbar
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: theme === "dark" ? 0.30 : 0.10,
          shadowRadius: 5,

          // Sombra para Android
          elevation: 5,

          // Evita que la sombra interfiera con el contenido
          zIndex: 10,
        },
      ]}
    >
      {/* Logo y nombre de la aplicación */}
      <View style={styles.brandContainer}>
        <TouchableOpacity
          onPress={abrirMenuLateral}
          style={styles.menuButton}
        >
          <Ionicons
            name="menu-outline"
            size={26}
            color={textColor}
          />
        </TouchableOpacity>

        <Image
          source={logoSello}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={[styles.brandTitle, { color: textColor }]}>
          SELLO GUARDIÁN
        </Text>
      </View>

      {/* Botones de notificaciones y perfil */}
      <View style={styles.navActions}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/Notificaciones")}
        >
          <View>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={
                unreadNotifications > 0
                  ? "#EF4444"
                  : textColor
              }
            />

            {/* Mostrar el número de notificaciones sin leer */}
            {unreadNotifications > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {unreadNotifications}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(tabs)/Perfil")}
        >
          <Ionicons
            name="person-circle-outline"
            size={26}
            color={colors.activePurple}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuButton: {
    padding: 4,
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    padding: 4,
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#EF4444",
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
});