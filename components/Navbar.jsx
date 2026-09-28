import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Importa tu logo (ajusta la ruta según la ubicación de tu archivo components/)
import logoSello from "../assets/LogoSelloG.png";

const COLORS = {
  primary: "#7C3AED",
  surface: "#0F172A",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#C4B5FD",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  error: "#E11D48",
};

export default function Navbar({ unreadNotifications = 2 }) {
  const router = useRouter();

  const abrirMenuLateral = () => {
    router.push("/drawer");
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.brandContainer}>
        <TouchableOpacity
          onPress={abrirMenuLateral}
          style={{ marginRight: 12, padding: 4 }}
        >
          <Ionicons name="menu-outline" size={26} color={COLORS.onSurface} />
        </TouchableOpacity>

        <Image
          source={logoSello}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.brandTitle}>SELLO GUARDIÁN</Text>
      </View>

      <View style={styles.navActions}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/Notificaciones")}
        >
          <View>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={unreadNotifications > 0 ? COLORS.error : COLORS.onSurface}
            />
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
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  brandTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navButton: {
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: COLORS.error,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});