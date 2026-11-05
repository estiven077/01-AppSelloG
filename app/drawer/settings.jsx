import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, colors, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  const toggleThemeDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowThemeToggle(!showThemeToggle);
  };

  const handleClearCache = () => {
    Alert.alert(
      "Limpiar caché",
      "¿Deseas liberar espacio borrando las imágenes y datos temporales guardados?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Limpiar", style: "destructive", onPress: () => Alert.alert("Éxito", "Caché liberada correctamente.") },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

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
            <Ionicons name="arrow-back" size={24} color={colors.textLight} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.textLight }]}>Configuración</Text>
        </View>

        {/* SECCIÓN CUENTA */}
        <Text style={[styles.sectionTitle, { color: colors.accent }]}>Cuenta</Text>
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/Perfil")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="person-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Mi perfil</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Edita tus datos personales y de cuenta
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() => router.push("/MisAdopciones")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="paw-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Mis solicitudes y reportes</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Historial de adopciones y casos reportados
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN PREFERENCIAS */}
        <Text style={[styles.sectionTitle, { color: colors.accent }]}>Preferencias</Text>
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* NOTIFICACIONES */}
          <View style={[styles.option, { borderBottomColor: colors.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="notifications-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Notificaciones</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Recibe avisos sobre adopciones y denuncias
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.activePurple }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* UBICACIÓN */}
          <View style={[styles.option, { borderBottomColor: colors.border }]}>
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="location-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Servicios de ubicación</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Para mostrar alertas y mascotas cercanas
              </Text>
            </View>
            <Switch
              value={locationAccess}
              onValueChange={setLocationAccess}
              trackColor={{ false: colors.border, true: colors.activePurple }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* APARIENCIA VISUAL */}
          <TouchableOpacity
            style={[styles.option, !showThemeToggle && styles.lastOption, { borderBottomColor: colors.border }]}
            onPress={toggleThemeDropdown}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name={theme === "dark" ? "moon-outline" : "sunny-outline"} size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Apariencia visual</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                {theme === "dark" ? "Modo oscuro activado" : "Modo claro activado"}
              </Text>
            </View>
            <Ionicons name={showThemeToggle ? "chevron-down-outline" : "chevron-forward-outline"} size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* SUBMENÚ MODO OSCURO */}
          {showThemeToggle && (
            <View style={[styles.subOptionContainer, styles.lastOption, { backgroundColor: theme === "dark" ? "rgba(18, 22, 26, 0.5)" : "rgba(241, 245, 249, 0.5)", borderBottomColor: colors.border }]}>
              <View style={styles.subOptionContent}>
                <View style={styles.subIconPlaceholder} />
                <View>
                  <Text style={[styles.subOptionTitle, { color: colors.textLight }]}>Modo oscuro / claro</Text>
                  <Text style={[styles.subOptionSubtitle, { color: colors.textMuted }]}>Cambiar estilo visual</Text>
                </View>
              </View>
              <View style={styles.switchWrapper}>
                <Switch
                  value={theme === "dark"}
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#cbd5e1", true: colors.activePurple }}
                  thumbColor={theme === "dark" ? "#ffffff" : "#334155"}
                />
                <Ionicons
                  name={theme === "dark" ? "moon" : "sunny"}
                  size={14}
                  color={theme === "dark" ? colors.activePurple : "#f59e0b"}
                  style={styles.switchIconOverlay}
                />
              </View>
            </View>
          )}

          {/* IDIOMA */}
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() => Alert.alert("Idioma", "Actualmente Sello Guardián está disponible únicamente en español.")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="language-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Idioma</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>Español (Latinoamérica)</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN DATOS Y ALMACENAMIENTO */}
        <Text style={[styles.sectionTitle, { color: colors.accent }]}>Almacenamiento y Datos</Text>
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="trash-bin-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Limpiar caché</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Libera espacio eliminando imágenes temporales
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN SEGURIDAD */}
        <Text style={[styles.sectionTitle, { color: colors.accent }]}>Seguridad y privacidad</Text>
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: colors.border }]}
            onPress={() => router.push("/Privacidad")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="shield-checkmark-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Privacidad y seguridad</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Gestiona tus permisos y tratamiento de datos
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() => Alert.alert("Términos y condiciones", "Consulta los términos legales y políticas de uso de Sello Guardián.")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="document-text-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Términos y condiciones</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Condiciones del servicio y políticas
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN AYUDA */}
        <Text style={[styles.sectionTitle, { color: colors.accent }]}>Ayuda</Text>
        <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: colors.border }]}
            onPress={() => Alert.alert("Ayuda y soporte", "Comunícate con nuestro equipo de soporte para resolver dudas o reportar fallos.")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="help-circle-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Ayuda y soporte</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Centro de ayuda y atención al usuario
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={() => Alert.alert("Sello Guardián", "Iniciativa enfocada en la protección, adopción y lucha contra el maltrato animal.")}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: theme === "dark" ? "rgba(168, 85, 247, 0.12)" : "rgba(147, 51, 234, 0.1)" }]}>
              <Ionicons name="information-circle-outline" size={22} color={colors.activePurple} />
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: colors.textLight }]}>Acerca de Sello Guardián</Text>
              <Text style={[styles.optionDescription, { color: colors.textMuted }]}>
                Versión del proyecto y créditos
              </Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.version, { color: colors.textMuted }]}>Sello Guardián • Versión 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
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
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContent: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  optionDescription: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  subOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  subOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subIconPlaceholder: {
    width: 42,
    marginRight: 14,
  },
  subOptionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  subOptionSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  switchWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  switchIconOverlay: {
    position: "absolute",
    pointerEvents: "none",
    right: 6,
  },
  version: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 35,
    marginBottom: 10,
  },
});