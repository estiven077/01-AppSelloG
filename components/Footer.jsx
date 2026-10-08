import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles, COLORS } from "../styles/Footer";

export default function Footer() {
  const router = useRouter();

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Error al abrir el enlace", err));
  };

  return (
    <View style={styles.footer}>
      {/* ================= SÍGUENOS (FOLLOW US) ================= */}
      <View style={styles.followSection}>
        <Text style={styles.followTitle}>SÍGUENOS</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#3b5998" }]} 
            onPress={() => handleOpenLink("https://facebook.com")}
          >
            <Ionicons name="logo-facebook" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#e1306c" }]} 
            onPress={() => handleOpenLink("https://instagram.com")}
          >
            <Ionicons name="logo-instagram" size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.socialButton, { backgroundColor: "#ff0000" }]} 
            onPress={() => handleOpenLink("https://youtube.com")}
          >
            <Ionicons name="logo-youtube" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTÁCTANOS Y NAVEGAR (DOS COLUMNAS) ================= */}
      <View style={styles.columnsContainer}>
        {/* Columna Izquierda: Contáctanos */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>CONTÁCTANOS</Text>
          
          <Text style={styles.columnTextBold}>Dirección:</Text>
          <Text style={styles.columnText}>Calle Principal #14A, Popayán, Colombia</Text>

          <Text style={[styles.columnTextBold, { marginTop: 8 }]}>Contacto:</Text>
          <Text style={styles.columnText}>+57 300 123 4567</Text>

          <Text style={[styles.columnTextBold, { marginTop: 8 }]}>E-mail:</Text>
          <Text style={styles.columnText}>Selloguardian@gmail.com</Text>
        </View>

        {/* Columna Derecha: Navegar */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>NAVEGAR</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/Home")}>
            <Text style={styles.linkText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/Reportes")}>
            <Text style={styles.linkText}>Reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/Mascotas")}>
            <Text style={styles.linkText}>Mascotas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/Ayuda")}>
            <Text style={styles.linkText}>Ayuda</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= COPYRIGHT ================= */}
      <View style={styles.copyContainer}>
        <Text style={styles.copyText}>Sello Guardián 2026. Todos los derechos reservados.</Text>
      </View>
    </View>
  );
}