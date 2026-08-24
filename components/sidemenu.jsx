import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Share, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMenu } from "../context/menuContext";

export default function SideMenu() {
  const { isOpen, closeMenu } = useMenu();

  const handleShare = async () => {
    try {
      await Share.share({
        message: "¡Prueba la app de Sello Guardián!",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: closeMenu },
    ]);
  };

  return (
    <Modal visible={isOpen} transparent animationType="fade" onRequestClose={closeMenu}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeMenu}>
        <View style={styles.menuContainer} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Sello Guardián</Text>

          <Text style={styles.sectionHeader}>Soporte</Text>
          <TouchableOpacity style={styles.item} onPress={closeMenu}>
            <Ionicons name="help-circle-outline" size={20} color="#fff" />
            <Text style={styles.itemText}>Centro de ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={closeMenu}>
            <Ionicons name="information-circle-outline" size={20} color="#fff" />
            <Text style={styles.itemText}>Acerca de Sello Guardián</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={closeMenu}>
            <Ionicons name="document-text-outline" size={20} color="#fff" />
            <Text style={styles.itemText}>Términos y privacidad</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#fff" />
            <Text style={styles.itemText}>Compartir la app</Text>
          </TouchableOpacity>

          <Text style={styles.sectionHeader}>Cuenta</Text>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
            <Text style={[styles.itemText, { color: "#e74c3c" }]}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", flexDirection: "row" },
  menuContainer: { width: 280, backgroundColor: "#1e1e1e", padding: 20, paddingTop: 50, height: "100%" },
  title: { fontSize: 22, fontWeight: "bold", color: "#61de8a", marginBottom: 20 },
  sectionHeader: { fontSize: 12, color: "#888", marginTop: 15, marginBottom: 10, textTransform: "uppercase" },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  itemText: { color: "#fff", fontSize: 15, marginLeft: 12 },
});