import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext"; // 1. Importamos el hook de temas

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SobreNosotros() {
  const { theme, colors } = useTheme(); // 2. Obtenemos theme y colors globales

  // Variables dinámicas según el tema activo
  const isDark = theme === "dark";
  const currentBg = isDark ? "#0F172A" : colors.background;
  const surfaceColor = isDark ? "#1e293b" : colors.surface;
  const cardInnerBg = isDark ? "#172033" : (colors.card || "#f1f5f9");
  const borderColor = isDark ? "#334155" : colors.border;
  const textLight = isDark ? "#FFFFFF" : colors.textLight;
  const textMuted = isDark ? "#94a3b8" : colors.textMuted;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBg }]}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={currentBg}
      />

      <Navbar unreadNotifications={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SOBRE SELLO GUARDIÁN */}
        <View style={styles.header}>
          <Text style={styles.sectionBadge}>CONOCE NUESTRO PROYECTO</Text>
          <Text style={[styles.title, { color: textLight }]}>¿Quiénes Somos?</Text>
          <Text style={[styles.intro, { color: textMuted }]}>
            Sello Guardián es una plataforma digital que centraliza la protección y
            adopción responsable de animales. Conectamos y apoyamos a fundaciones y
            rescatistas simplificando la gestión de adopciones, el seguimiento de casos
            y la validación de denuncias de maltrato en un solo lugar confiable.
          </Text>
        </View>

        {/* LEY ÁNGEL (CON ÍCONO DE HUELLITA) */}
        <View style={[styles.card, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
          <View style={styles.iconContainer}>
            <Ionicons name="paw" size={30} color={colors.activePurple} />
          </View>

          <Text style={[styles.cardTitle, { color: colors.activePurple }]}>Ley Ángel</Text>

          {/* QUÉ ES */}
          <Text style={[styles.sectionSubHeading, { color: textLight }]}>¿Qué es?</Text>
          <Text style={[styles.textLeft, { color: textMuted }]}>
            La Ley Ángel es una iniciativa legislativa dentro del marco de protección animal en Colombia diseñada para endurecer las penas y sanciones contra el maltrato hacia los animales domésticos y silvestres.
          </Text>

          {/* CÓMO FUNCIONA */}
          <Text style={[styles.sectionSubHeading, { color: textLight }]}>¿Cómo funciona?</Text>

          <View style={[styles.bulletCard, { backgroundColor: cardInnerBg, borderLeftColor: colors.activePurple }]}>
            <Text style={[styles.bulletTitle, { color: colors.activePurple }]}>Penalización rigurosa</Text>
            <Text style={[styles.textLeft, { color: textMuted }]}>
              Clasifica los actos de crueldad y negligencia como delitos con sanciones económicas y privación de la libertad.
            </Text>
          </View>

          <View style={[styles.bulletCard, { backgroundColor: cardInnerBg, borderLeftColor: colors.activePurple }]}>
            <Text style={[styles.bulletTitle, { color: colors.activePurple }]}>Rutas de intervención</Text>
            <Text style={[styles.textLeft, { color: textMuted }]}>
              Habilita mecanismos para que la Policía y entes judiciales actúen de manera prioritaria e intervengan en casos de riesgo.
            </Text>
          </View>

          <View style={[styles.bulletCard, { backgroundColor: cardInnerBg, borderLeftColor: colors.activePurple }]}>
            <Text style={[styles.bulletTitle, { color: colors.activePurple }]}>Protección integral</Text>
            <Text style={[styles.textLeft, { color: textMuted }]}>
              Promueve la cultura de la denuncia responsable y reconoce jurídicamente el valor del bienestar animal.
            </Text>
          </View>

          <View style={[styles.infoBox, { backgroundColor: isDark ? "rgba(168, 85, 247, 0.08)" : "rgba(124, 58, 237, 0.06)", borderLeftColor: colors.activePurple }]}>
            <Text style={[styles.infoText, { color: textLight }]}>
              En Sello Guardián integramos la validación de denuncias para que la comunidad pueda reportar casos sustentados en este marco legal de forma ágil y segura.
            </Text>
          </View>
        </View>

        {/*  MISIÓN */}
        <View style={[styles.splitSection, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
          <View style={styles.textContent}>
            <Text style={[styles.sectionTitle, { color: textLight }]}>Misión</Text>
            <Text style={[styles.textCenter, { color: textMuted }]}>
              Proteger perros y gatos en situación de abandono o de maltrato.
              Apoyar a refugios, rescatistas independientes, hogares de paso y
              personas naturales que día a día están comprometidos con mejorar
              la calidad de vida de los peluditos que lo necesitan.
            </Text>
            <Text style={[styles.textCenter, { color: textMuted }]}>
              Brindar a dichas personas un espacio en nuestros álbumes de
              animalitos disponibles para adopción y en nuestras redes sociales
              para lograr una mayor visibilidad y fomentar la esterilización.
            </Text>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
            }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
        </View>

        {/* VISIÓN */}
        <View style={[styles.splitSection, { backgroundColor: surfaceColor, borderColor: borderColor }]}>
          <View style={styles.textContent}>
            <Text style={[styles.sectionTitle, { color: textLight }]}>Visión</Text>
            <Text style={[styles.textCenter, { color: textMuted }]}>
              Ser un equipo en constante movimiento y en permanente trabajo por
              los derechos de los animales, comprometido con lograr un cambio en
              nuestra sociedad.
            </Text>
            <Text style={[styles.textCenter, { color: textMuted }]}>
              Nuestras metas son: llegar a miles de esterilizaciones, superar
              las 6.000 adopciones caninas y felinas, y consolidar nuestro
              apoyo a rescatistas independientes en sus procesos de adopción.
            </Text>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
            }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
        </View>

        {/* FOOTER */}
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 25,
    alignItems: "center",
  },
  sectionBadge: {
    color: "#A855F7",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.2,
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  intro: {
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
  },
  splitSection: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 20,
    alignItems: "center",
  },
  textContent: {
    padding: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionImage: {
    width: "100%",
    height: 280,
  },
  textCenter: {
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 12,
    textAlign: "center",
  },
  textLeft: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "left",
    alignSelf: "stretch",
  },
  card: {
    borderRadius: 16,
    padding: 22,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(168, 85, 247, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  sectionSubHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 10,
    textAlign: "left",
  },
  bulletCard: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    borderLeftWidth: 3,
  },
  bulletTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "left",
  },
  infoBox: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    width: "100%",
  },
  infoText: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: "left",
  },
  quoteContainer: {
    paddingHorizontal: 25,
    paddingVertical: 35,
    alignItems: "center",
  },
  quote: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  quoteSpanish: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});