
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { styles } from "../styles/Footer";

export default function Footer() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const { width } = useWindowDimensions();

  // Detectar si hay espacio para mostrar cuatro columnas
  const esAncho = width >= 768;
  const esOscuro = theme === "dark";

  // Colores del tema seleccionado
  // Fondo del footer, ligeramente más oscuro que el contenido
  const fondo = colors.footer;
  const borde = colors.border;
  const textoPrincipal = colors.textLight;
  const textoSuave = colors.textMuted;
  const acento = colors.activePurple;

  // Huellas claras en modo oscuro y moradas en modo claro
  const colorHuella = esOscuro
    ? "rgba(255,255,255,0.08)"
    : "rgba(147,51,234,0.10)";

  // Abrir enlaces externos
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((error) =>
      console.error("Error al abrir el enlace:", error)
    );
  };

  // Navegar dentro de la aplicación
  const handleNavigate = (route) => {
    router.push(route);
  };

  // Estilos de los botones sociales según el tema
  const estiloSocial = {
    backgroundColor: esOscuro
      ? "rgba(168,85,247,0.12)"
      : "rgba(147,51,234,0.08)",
    borderColor: esOscuro
      ? "rgba(168,85,247,0.45)"
      : "rgba(147,51,234,0.35)",
  };

  /* ================= MARCA ================= */
  const marca = (
    <View style={esAncho ? styles.columnBrand : null}>
      <View style={styles.brandHeader}>
        <Ionicons name="paw" size={23} color={acento} />

        <Text style={[styles.brandTitle, { color: textoPrincipal }]}>
          Sello Guardián
        </Text>
      </View>

      <Text style={[styles.brandSubtitle, { color: acento }]}>
        Protección y adopción responsable
      </Text>

      <Text style={[styles.brandDescription, { color: textoSuave }]}>
        Plataforma para reportar maltrato animal, adoptar y apoyar
        a las fundaciones de nuestra región.
      </Text>
    </View>
  );

  /* ================= EXPLORA ================= */
  const explora = (
    <View style={styles.column}>
      <Text style={[styles.sectionTitle, { color: textoPrincipal }]}>
        Explora
      </Text>

      <View style={[styles.titleLine, { backgroundColor: acento }]} />

      <TouchableOpacity onPress={() => handleNavigate("/(tabs)/Home")}>
        <Text style={[styles.linkText, { color: textoSuave }]}>
          Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigate("/(tabs)/Mascotas")}>
        <Text style={[styles.linkText, { color: textoSuave }]}>
          Adopción
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigate("/(tabs)/Reportes")}>
        <Text style={[styles.linkText, { color: textoSuave }]}>
          Denuncia
        </Text>
      </TouchableOpacity>
    </View>
  );

  /* ================= CONTACTO ================= */
  const contacto = (
    <View style={styles.column}>
      <Text style={[styles.sectionTitle, { color: textoPrincipal }]}>
        Contacto
      </Text>

      <View style={[styles.titleLine, { backgroundColor: acento }]} />

      <View style={styles.contactItem}>
        <Ionicons name="location-sharp" size={16} color={acento} />

        <Text style={[styles.contactText, { color: textoSuave }]}>
          Calle Principal #14A, Popayán, Colombia
        </Text>
      </View>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handleOpenLink("tel:+573001234567")}
      >
        <Ionicons name="call" size={16} color={acento} />

        <Text style={[styles.contactText, { color: textoSuave }]}>
          +57 300 123 4567
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.contactItem}
        onPress={() =>
          handleOpenLink("mailto:Selloguardian@gmail.com")
        }
      >
        <Ionicons name="mail" size={16} color={acento} />

        <Text style={[styles.contactText, { color: textoSuave }]}>
          Selloguardian@gmail.com
        </Text>
      </TouchableOpacity>
    </View>
  );

  /* ================= REDES SOCIALES ================= */
  const redes = (
    <View style={esAncho ? styles.column : null}>
      <Text style={[styles.sectionTitle, { color: textoPrincipal }]}>
        Síguenos
      </Text>

      <View style={[styles.titleLine, { backgroundColor: acento }]} />

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={[styles.socialButton, estiloSocial]}
          onPress={() => handleOpenLink("https://facebook.com")}
          accessibilityLabel="Facebook"
        >
          <Ionicons name="logo-facebook" size={18} color={textoPrincipal} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, estiloSocial]}
          onPress={() => handleOpenLink("https://instagram.com")}
          accessibilityLabel="Instagram"
        >
          <Ionicons name="logo-instagram" size={18} color={textoPrincipal} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, estiloSocial]}
          onPress={() => handleOpenLink("https://x.com")}
          accessibilityLabel="X"
        >
          <Ionicons name="logo-twitter" size={18} color={textoPrincipal} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.socialButton, estiloSocial]}
          onPress={() =>
            handleOpenLink("https://wa.me/573001234567")
          }
          accessibilityLabel="WhatsApp"
        >
          <Ionicons name="logo-whatsapp" size={18} color={textoPrincipal} />
        </TouchableOpacity>
      </View>
    </View>
  );

  /* ================= FOOTER ================= */
  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: fondo,
          borderTopColor: borde,
        },
      ]}
    >
      {/* Huellitas decorativas de fondo */}
      <View
        pointerEvents="none"
        style={[styles.pawWrap, styles.pawTop]}
      >
        <Ionicons name="paw" size={62} color={colorHuella} />
      </View>

      <View
        pointerEvents="none"
        style={[styles.pawWrap, styles.pawMiddle]}
      >
        <Ionicons name="paw" size={44} color={colorHuella} />
      </View>

      <View
        pointerEvents="none"
        style={[styles.pawWrap, styles.pawBottom]}
      >
        <Ionicons name="paw" size={38} color={colorHuella} />
      </View>

      {esAncho ? (
        <View style={styles.gridWide}>
          {marca}
          {explora}
          {contacto}
          {redes}
        </View>
      ) : (
        <View style={styles.gridNarrow}>
          {marca}

          <View style={styles.rowNarrow}>
            {explora}
            {contacto}
          </View>

          {redes}
        </View>
      )}

      {/* Derechos reservados */}
      <View
        style={[
          styles.copyContainer,
          { borderTopColor: borde },
        ]}
      >
        <Text style={[styles.copyText, { color: textoSuave }]}>
          © {new Date().getFullYear()} Sello Guardián.
          {"\n"}Todos los derechos reservados.
        </Text>
      </View>
    </View>
  );
}
