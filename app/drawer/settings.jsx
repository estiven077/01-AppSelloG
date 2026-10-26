import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  StatusBar,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Habilitar animaciones para Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// PALETA DE COLORES - SELLO GUARDIÁN
const COLORS = {
  background: "#0A0C0E",
  surface: "#12161A",
  activePurple: "#A855F7",
  accent: "#C084FC",
  textLight: "#F8FAFC",
  textMuted: "#CBD5E1",
  border: "#242A30",
};

export default function SettingsScreen() {
  const router = useRouter();

  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  // CARGAR CONFIGURACIÓN AL INICIAR
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app_theme");
      const savedNotifications = await AsyncStorage.getItem("notifications_enabled");

      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme("dark");
      }

      if (savedNotifications !== null) {
        setNotifications(savedNotifications === "true");
      }
    } catch (error) {
      console.error("Error cargando configuración:", error);
    }
  };

  // CAMBIAR TEMA CON SWITCH
  const changeThemeSwitch = async (isDark) => {
    try {
      const newTheme = isDark ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem("app_theme", newTheme);
    } catch (error) {
      console.error("Error guardando el tema:", error);
    }
  };

  // ACTIVAR O DESACTIVAR NOTIFICACIONES
  const changeNotifications = async (value) => {
    try {
      setNotifications(value);
      await AsyncStorage.setItem("notifications_enabled", value.toString());
    } catch (error) {
      console.error("Error guardando las notificaciones:", error);
    }
  };

  // Desplegar u ocultar el switch de apariencia
  const toggleThemeDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowThemeToggle(!showThemeToggle);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={COLORS.textLight}
            />
          </TouchableOpacity>

          <Text style={styles.title}>Configuración</Text>
        </View>

        {/* SECCIÓN CUENTA */}
        <Text style={styles.sectionTitle}>Cuenta</Text>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() => router.push("/Perfil")}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Mi perfil</Text>
              <Text style={styles.optionDescription}>
                Edita tus datos personales y de cuenta
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN PREFERENCIAS */}
        <Text style={styles.sectionTitle}>Preferencias</Text>

        <View style={styles.section}>
          {/* NOTIFICACIONES */}
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Notificaciones</Text>
              <Text style={styles.optionDescription}>
                Recibe avisos sobre adopciones y denuncias
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={changeNotifications}
              trackColor={{
                false: "#242A30",
                true: COLORS.activePurple,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* APARIENCIA VISUAL */}
          <TouchableOpacity
            style={[styles.option, !showThemeToggle && styles.lastOption]}
            onPress={toggleThemeDropdown}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name={theme === "dark" ? "moon-outline" : "sunny-outline"}
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Apariencia visual</Text>
              <Text style={styles.optionDescription}>
                {theme === "dark" ? "Modo oscuro activado" : "Modo claro activado"}
              </Text>
            </View>

            <Ionicons
              name={showThemeToggle ? "chevron-down-outline" : "chevron-forward-outline"}
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          {/* SUBMENÚ DESPLEGABLE CORREGIDO (Alineado con el texto principal) */}
          {showThemeToggle && (
            <View style={[styles.subOptionContainer, styles.lastOption]}>
              <View style={styles.subOptionContent}>
                <View style={styles.subIconPlaceholder} />
                <Text style={styles.subOptionTitle}>Modo oscuro</Text>
              </View>

              <Switch
                value={theme === "dark"}
                onValueChange={changeThemeSwitch}
                trackColor={{
                  false: "#242A30",
                  true: COLORS.activePurple,
                }}
                thumbColor="#FFFFFF"
              />
            </View>
          )}

          {/* IDIOMA */}
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() =>
              Alert.alert(
                "Idioma",
                "Actualmente Sello Guardián está disponible únicamente en español."
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="language-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Idioma</Text>
              <Text style={styles.optionDescription}>Español (Latinoamérica)</Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN SEGURIDAD */}
        <Text style={styles.sectionTitle}>Seguridad y privacidad</Text>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/Privacidad")}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Privacidad y seguridad</Text>
              <Text style={styles.optionDescription}>
                Gestiona tus permisos y tratamiento de datos
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() =>
              Alert.alert(
                "Términos y condiciones",
                "Consulta los términos legales y políticas de uso de Sello Guardián."
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Términos y condiciones</Text>
              <Text style={styles.optionDescription}>
                Condiciones del servicio y políticas
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN AYUDA */}
        <Text style={styles.sectionTitle}>Ayuda</Text>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                "Ayuda y soporte",
                "Comunícate con nuestro equipo de soporte para resolver dudas o reportar fallos."
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Ayuda y soporte</Text>
              <Text style={styles.optionDescription}>
                Centro de ayuda y atención al usuario
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() =>
              Alert.alert(
                "Sello Guardián",
                "Iniciativa enfocada en la protección, adopción y lucha contra el maltrato animal."
              )
            }
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Acerca de Sello Guardián</Text>
              <Text style={styles.optionDescription}>
                Versión del proyecto y créditos
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Sello Guardián • Versión 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  title: {
    color: COLORS.textLight,
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 22,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  section: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(168, 85, 247, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  optionTitle: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: "600",
  },
  optionDescription: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  /* ESTILOS DEL SUBMENÚ ALINEADO */
  subOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "rgba(18, 22, 26, 0.5)",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  subOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subIconPlaceholder: {
    width: 42, // Ancho exacto del contenedor del icono superior para guardar la misma distancia
    marginRight: 14,
  },
  subOptionTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "500",
  },
  version: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: 13,
    marginTop: 35,
    marginBottom: 10,
  },
});