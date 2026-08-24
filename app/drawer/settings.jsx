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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const COLORS = {
  background: "#0A0C0E",
  surface: "#12161A",
  activePurple: "#A855F7",
  textLight: "#F8FAFC",
  textMuted: "#64748B",
  border: "rgba(255,255,255,0.06)",
};

export default function Settings() {
  const router = useRouter();

  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);

  // CARGAR CONFIGURACIÓN
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app_theme");
      const savedNotifications =
        await AsyncStorage.getItem("notifications_enabled");

      if (savedTheme) {
        setTheme(savedTheme);
      }

      if (savedNotifications !== null) {
        setNotifications(savedNotifications === "true");
      }
    } catch (error) {
      console.error("Error cargando configuración:", error);
    }
  };

  // CAMBIAR TEMAS
  const changeTheme = async (newTheme) => {
    try {
      setTheme(newTheme);

      await AsyncStorage.setItem(
        "app_theme",
        newTheme
      );
    } catch (error) {
      console.error("Error guardando el tema:", error);
    }
  };

  // ACTIVAR O DESACTIVAR NOTIFICACIONES
  const changeNotifications = async (value) => {
    try {
      setNotifications(value);

      await AsyncStorage.setItem(
        "notifications_enabled",
        value.toString()
      );
    } catch (error) {
      console.error(
        "Error guardando las notificaciones:",
        error
      );
    }
  };

  // SELECCIONAR TEMA
  const selectTheme = () => {
    Alert.alert(
      "Apariencia",
      "Selecciona cómo quieres ver la aplicación.",
      [
        {
          text: "☀️ Modo claro",
          onPress: () => changeTheme("light"),
        },
        {
          text: "🌙 Modo oscuro",
          onPress: () => changeTheme("dark"),
        },
        {
          text: "📱 Automático",
          onPress: () => changeTheme("system"),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  // NOMBRE DEL TEMA
  const getThemeName = () => {
    if (theme === "light") {
      return "Modo claro";
    }

    if (theme === "dark") {
      return "Modo oscuro";
    }

    return "Automático";
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ENCABEZADO */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color={COLORS.textLight}
            />
          </TouchableOpacity>

          <Text style={styles.title}>
            Configuración
          </Text>
        </View>

        {/* CUENTA */}
        <Text style={styles.sectionTitle}>
          Cuenta
        </Text>

        <View style={styles.section}>

          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/Perfil")}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="person-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Mi perfil
              </Text>

              <Text style={styles.optionDescription}>
                Edita tus datos personales
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />
          </TouchableOpacity>

        </View>

        {/* PREFERENCIAS */}
        <Text style={styles.sectionTitle}>
          Preferencias
        </Text>

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
              <Text style={styles.optionTitle}>
                Notificaciones
              </Text>

              <Text style={styles.optionDescription}>
                Recibe avisos sobre tus denuncias y novedades
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={changeNotifications}
              trackColor={{
                false: "#334155",
                true: COLORS.activePurple,
              }}
              thumbColor="#FFFFFF"
            />

          </View>

          {/* APARIENCIA */}
          <TouchableOpacity
            style={styles.option}
            onPress={selectTheme}
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  theme === "dark"
                    ? "moon-outline"
                    : "sunny-outline"
                }
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Apariencia
              </Text>

              <Text style={styles.optionDescription}>
                {getThemeName()}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

          {/* IDIOMA */}
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                "Idioma",
                "Actualmente Sello Guardián está disponible en español."
              )
            }
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name="language-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Idioma
              </Text>

              <Text style={styles.optionDescription}>
                Español
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

        </View>

        {/* SEGURIDAD */}
        <Text style={styles.sectionTitle}>
          Seguridad y privacidad
        </Text>

        <View style={styles.section}>

          {/* PRIVACIDAD */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/drawer/Privacidad")}
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Privacidad y seguridad
              </Text>

              <Text style={styles.optionDescription}>
                Gestiona tus datos y privacidad
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

          {/* TÉRMINOS */}
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                "Términos y condiciones",
                "Aquí estarán disponibles los términos y condiciones de uso de Sello Guardián."
              )
            }
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Términos y condiciones
              </Text>

              <Text style={styles.optionDescription}>
                Consulta las condiciones de uso
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

        </View>

        {/* AYUDA */}
        <Text style={styles.sectionTitle}>
          Ayuda
        </Text>

        <View style={styles.section}>

          {/* SOPORTE */}
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                "Ayuda y soporte",
                "Si necesitas ayuda, puedes comunicarte con el equipo de Sello Guardián."
              )
            }
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name="help-circle-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Ayuda y soporte
              </Text>

              <Text style={styles.optionDescription}>
                Obtén ayuda con la aplicación
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

          {/* ACERCA DE */}
          <TouchableOpacity
            style={styles.option}
            onPress={() =>
              Alert.alert(
                "Sello Guardián",
                "Aplicación dedicada a la protección, denuncia y adopción responsable de animales."
              )
            }
          >

            <View style={styles.iconContainer}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={COLORS.activePurple}
              />
            </View>

            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>
                Acerca de Sello Guardián
              </Text>

              <Text style={styles.optionDescription}>
                Información sobre la aplicación
              </Text>
            </View>

            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color={COLORS.textMuted}
            />

          </TouchableOpacity>

        </View>

        <Text style={styles.version}>
          Sello Guardián • Versión 1.0.0
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  backButton: {
    marginRight: 15,
  },

  title: {
    color: COLORS.textLight,
    fontSize: 23,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 15,
    marginBottom: 8,
    marginHorizontal: 20,
  },

  section: {
    marginHorizontal: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    overflow: "hidden",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(168,85,247,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  optionContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },

  optionTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: "600",
  },

  optionDescription: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginTop: 3,
  },

  version: {
    color: COLORS.textMuted,
    textAlign: "center",
    fontSize: 11,
    marginVertical: 25,
  },
});