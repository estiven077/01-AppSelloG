import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importamos el ícono de huellita

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SobreNosotros() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <Navbar unreadNotifications={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. SECCIÓN: SOBRE SELLO GUARDIÁN */}
        <View style={styles.header}>
          <Text style={styles.sectionBadge}>CONOCE NUESTRO PROYECTO</Text>
          <Text style={styles.title}>¿Quiénes Somos?</Text>
          <Text style={styles.intro}>
            Sello Guardián es una plataforma digital que centraliza la protección y
            adopción responsable de animales. Conectamos y apoyamos a fundaciones y
            rescatistas simplificando la gestión de adopciones, el seguimiento de casos
            y la validación de denuncias de maltrato en un solo lugar confiable.
          </Text>
        </View>

        {/* 2. SECCIÓN: LEY ÁNGEL (CON ÍCONO DE HUELLITA) */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name="paw" size={30} color="#A855F7" />
          </View>

          <Text style={styles.cardTitle}>Ley Ángel</Text>

          {/* QUÉ ES */}
          <Text style={styles.sectionSubHeading}>¿Qué es?</Text>
          <Text style={styles.textLeft}>
            La Ley Ángel es una iniciativa legislativa dentro del marco de protección animal en Colombia diseñada para endurecer las penas y sanciones contra el maltrato hacia los animales domésticos y silvestres.
          </Text>

          {/* CÓMO FUNCIONA */}
          <Text style={styles.sectionSubHeading}>¿Cómo funciona?</Text>
          
          <View style={styles.bulletCard}>
            <Text style={styles.bulletTitle}>• Penalización rigurosa</Text>
            <Text style={styles.textLeft}>
              Clasifica los actos de crueldad y negligencia como delitos con sanciones económicas y privación de la libertad.
            </Text>
          </View>

          <View style={styles.bulletCard}>
            <Text style={styles.bulletTitle}>• Rutas de intervención</Text>
            <Text style={styles.textLeft}>
              Habilita mecanismos para que la Policía y entes judiciales actúen de manera prioritaria e intervengan en casos de riesgo.
            </Text>
          </View>

          <View style={styles.bulletCard}>
            <Text style={styles.bulletTitle}>• Protección integral</Text>
            <Text style={styles.textLeft}>
              Promueve la cultura de la denuncia responsable y reconoce jurídicamente el valor del bienestar animal.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
            En Sello Guardián integramos la validación de denuncias para que la comunidad pueda reportar casos sustentados en este marco legal de forma ágil y segura.
            </Text>
          </View>
        </View>

        {/* 3. SECCIÓN: MISIÓN */}
        <View style={styles.splitSection}>
          <View style={styles.textContent}>
            <Text style={styles.sectionTitle}>Misión</Text>
            <Text style={styles.textCenter}>
              Proteger perros y gatos en situación de abandono o de maltrato.
              Apoyar a refugios, rescatistas independientes, hogares de paso y
              personas naturales que día a día están comprometidos con mejorar
              la calidad de vida de los peluditos que lo necesitan.
            </Text>
            <Text style={styles.textCenter}>
              Brindar a dichas personas un espacio en nuestros álbumes de
              animalitos disponibles para adopción y en nuestras redes sociales
              para lograr una mayor visibilidad y fomentar la esterilización.
            </Text>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800",
            }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
        </View>

        {/* 4. SECCIÓN: VISIÓN */}
        <View style={styles.splitSection}>
          <View style={styles.textContent}>
            <Text style={styles.sectionTitle}>Visión</Text>
            <Text style={styles.textCenter}>
              Ser un equipo en constante movimiento y en permanente trabajo por
              los derechos de los animales, comprometido con lograr un cambio en
              nuestra sociedad.
            </Text>
            <Text style={styles.textCenter}>
              Nuestras metas son: llegar a miles de esterilizaciones, superar
              las 6.000 adopciones caninas y felinas, y consolidar nuestro
              apoyo a rescatistas independientes en sus procesos de adopción.
            </Text>
          </View>

          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
            }}
            style={styles.sectionImage}
            resizeMode="cover"
          />
        </View>

        {/* FRASE INSPIRACIONAL */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>“Every paw print tells a story.”</Text>
          <Text style={styles.quoteSpanish}>
            Algunas historias comienzan en las calles, pero todas merecen
            terminar en un hogar.
          </Text>
        </View>

        {/* 5. FOOTER */}
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
    color: "#F8FAFC",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  intro: {
    color: "#CBD5E1",
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
  },
  splitSection: {
    backgroundColor: "#12161A",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#242A30",
    marginVertical: 20,
    alignItems: "center",
  },
  textContent: {
    padding: 24,
    alignItems: "center",
  },
  sectionTitle: {
    color: "#F8FAFC",
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
    color: "#CBD5E1",
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 12,
    textAlign: "center",
  },
  textLeft: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "left",
    alignSelf: "stretch",
  },
  card: {
    backgroundColor: "#12161A",
    borderRadius: 16,
    padding: 22,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#242A30",
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
    color: "#A855F7",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },
  sectionSubHeading: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 10,
    textAlign: "left",
  },
  bulletCard: {
    backgroundColor: "#171D23",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    borderLeftWidth: 3,
    borderLeftColor: "#A855F7",
  },
  bulletTitle: {
    color: "#A855F7",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "left",
  },
  infoBox: {
    backgroundColor: "rgba(168, 85, 247, 0.08)",
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#A855F7",
    width: "100%",
  },
  infoText: {
    color: "#E2E8F0",
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
    color: "#A855F7",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  quoteSpanish: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});