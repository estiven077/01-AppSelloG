import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

// Importamos el Navbar reutilizable
import Navbar from "../../components/Navbar";

// Importamos el Footer reutilizable
import Footer from "../../components/Footer";

export default function SobreNosotros() {
  return (
    <SafeAreaView style={styles.container}>

      {/* ================= STATUS BAR ================= */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0F172A"
      />

      {/* ================= NAVBAR ================= */}
      <Navbar unreadNotifications={2} />

      {/* ================= CONTENIDO ================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================= ENCABEZADO ================= */}
        <View style={styles.header}>
          <Text style={styles.sectionBadge}>
            CONOCE NUESTRO PROYECTO
          </Text>

          <Text style={styles.title}>
            Sobre Sello Guardián
          </Text>

          <Text style={styles.intro}>
            Sello Guardián es una iniciativa orientada a apoyar la protección,
            el bienestar y la adopción responsable de animales que se
            encuentran en situación de abandono o vulnerabilidad.
          </Text>
        </View>

        {/* ================= MISIÓN ================= */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              🐾
            </Text>
          </View>

          <Text style={styles.cardTitle}>
            Nuestra Misión
          </Text>

          <Text style={styles.text}>
            Nuestra misión es facilitar la gestión y seguimiento de casos de
            animales en situación de vulnerabilidad, conectando fundaciones,
            organizaciones y personas interesadas en brindarles una segunda
            oportunidad.
          </Text>
        </View>

        {/* ================= VISIÓN ================= */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              🌎
            </Text>
          </View>

          <Text style={styles.cardTitle}>
            Nuestra Visión
          </Text>

          <Text style={styles.text}>
            Nuestra visión es contribuir a una sociedad más consciente,
            responsable y comprometida con la protección animal, utilizando la
            tecnología como herramienta para facilitar la atención, el
            seguimiento y la búsqueda de hogares responsables.
          </Text>
        </View>

        {/* ================= LEY ÁNGEL ================= */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>
              ⚖️
            </Text>
          </View>

          <Text style={styles.cardTitle}>
            Ley Ángel
          </Text>

          <Text style={styles.text}>
            Sello Guardián busca promover el conocimiento y la sensibilización
            frente a la protección de los animales y la importancia de actuar
            ante situaciones de maltrato.
          </Text>

          <Text style={styles.text}>
            La Ley Ángel hace parte del marco colombiano de protección animal
            y busca fortalecer las medidas frente al maltrato de los animales.
            Esta información se incluye en nuestra aplicación como contenido
            educativo relacionado con el propósito de Sello Guardián.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Conocer nuestros derechos y responsabilidades frente a los
              animales es un paso importante para construir una sociedad más
              responsable.
            </Text>
          </View>
        </View>

        {/* ================= FRASE ================= */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            “Every paw print tells a story.”
          </Text>

          <Text style={styles.quoteSpanish}>
            Algunas historias comienzan en las calles,
            pero todas merecen terminar en un hogar.
          </Text>
        </View>

        {/* ================= FOOTER ================= */}
        <Footer />

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0C0E",
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* ================= ENCABEZADO ================= */

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
  },

  sectionBadge: {
    color: "#A855F7",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 8,
  },

  title: {
    color: "#F8FAFC",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  intro: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  /* ================= TARJETAS ================= */

  card: {
    backgroundColor: "#12161A",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#242A30",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(168, 85, 247, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  icon: {
    fontSize: 24,
  },

  cardTitle: {
    color: "#A855F7",
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 12,
  },

  text: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 10,
  },

  /* ================= INFORMACIÓN ================= */

  infoBox: {
    backgroundColor: "rgba(168, 85, 247, 0.08)",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#A855F7",
  },

  infoText: {
    color: "#E2E8F0",
    fontSize: 14,
    lineHeight: 21,
  },

  /* ================= FRASE ================= */

  quoteContainer: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    alignItems: "center",
  },

  quote: {
    color: "#A855F7",
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  quoteSpanish: {
    color: "#94A3B8",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },
});