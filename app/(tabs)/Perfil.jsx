import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";

import { 
  Ionicons, 
  MaterialCommunityIcons, 
  Feather, 
} from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

import { UserContext } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext"; // Importamos el hook de temas
import styles from "../../styles/Perfil";   // Importamos los estilos del perfil

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Perfil({ navigation }) {
  const { userData, updateUser } = useContext(UserContext);
  const { theme, colors } = useTheme(); // 2. Extraemos theme y colors globales

  const isDark = theme === "dark";

  // Colores dinámicos basados en el tema actual
  const currentBg = isDark ? "#0F172A" : colors.background;
  const surfaceContainer = isDark ? "#1e293b" : colors.surface;
  const surfaceContainerHigh = isDark ? "#172033" : colors.surface;
  const cardBg = isDark ? "#172033" : colors.surface;
  const cardBorder = isDark ? "#334155" : colors.border;
  const textLight = isDark ? "#FFFFFF" : colors.textLight;
  const textMuted = isDark ? "#94a3b8" : colors.textMuted;
  const primaryColor = colors.activePurple || "#A78BFA";

  // Estados de navegación y modales
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("publicaciones");
  const [modalNotificaciones, setModalNotificaciones] = useState(false);

  // Datos del usuario (vienen de UserContext, sin API)
  const [nombre, setNombre] = useState(userData.nombre ?? "");
  const [email, setEmail] = useState(userData.correo ?? "");
  const [ubicacion, setUbicacion] = useState(userData.ciudad ?? "");
  const [descripcion, setDescripcion] = useState(userData.descripcion ?? "");
  const [fotoPerfil, setFotoPerfil] = useState(userData.fotoPerfil ?? null);

  // Sincronizar datos si userData cambia externamente
  useEffect(() => {
    setNombre(userData.nombre ?? "");
    setEmail(userData.correo ?? "");
    setUbicacion(userData.ciudad ?? "");
    setDescripcion(userData.descripcion ?? "");
    setFotoPerfil(userData.fotoPerfil ?? null);
  }, [userData]);

  // Respaldo para restaurar si se cancela la edición
  const [tempProfile, setTempProfile] = useState({});

  // Listas locales (sin API por ahora)
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      titulo: "Rescate de cachorro en la vía Panamericana",
      fecha: "12/09/2026",
      ubicacion: "Popayán, Cauca",
    },
    {
      id: 2,
      titulo: "Gatita en adopción, busca hogar",
      fecha: "05/09/2026",
      ubicacion: "Casa hogar, Popayán",
    },
  ]);
  const [favoritos, setFavoritos] = useState([]);
  const [adopciones, setAdopciones] = useState([]);

  // --- FOTO DE PERFIL ---
  const handleSeleccionarFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Se necesitan permisos para acceder a la galería."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFotoPerfil(result.assets[0].uri);
    }
  };

  const handleEliminarFoto = () => {
    Alert.alert(
      "Eliminar foto",
      "¿Estás seguro de que quieres quitar tu foto de perfil?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => setFotoPerfil(null),
        },
      ]
    );
  };

  // --- EDICIÓN DE PERFIL ---
  const handleIniciarEdicion = () => {
    setTempProfile({ nombre, email, ubicacion, descripcion });
    setIsEditing(true);
  };

  const handleCancelarEdicion = () => {
    setNombre(tempProfile.nombre);
    setEmail(tempProfile.email);
    setUbicacion(tempProfile.ubicacion);
    setDescripcion(tempProfile.descripcion);
    setIsEditing(false);
  };

  const handleGuardarPerfil = () => {
    if (!nombre.trim() || !email.trim()) {
      Alert.alert("Campo requerido", "El nombre y el correo no pueden estar vacíos.");
      return;
    }

    updateUser({
      nombre,
      correo: email,
      ciudad: ubicacion,
      descripcion,
      fotoPerfil,
    });

    setIsEditing(false);
    Alert.alert("¡Éxito!", "Perfil actualizado correctamente.");
  };

  // --- PUBLICACIONES ---
  const handleEliminarPublicacion = (id) => {
    Alert.alert(
      "Eliminar publicación",
      "¿Deseas eliminar este reporte?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setPublicaciones((prev) => prev.filter((item) => item.id !== id));
            Alert.alert("Eliminado", "La publicación fue eliminada.");
          },
        },
      ]
    );
  };

  // --- CERRAR SESIÓN ---
  const handleCerrarSesion = () => {
    Alert.alert("Cerrar Sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir",
        style: "destructive",
        onPress: () => {
          if (navigation) navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBg }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={currentBg} />

      {/* NAVBAR */}
      <View style={[styles.navbar, { backgroundColor: currentBg, borderBottomColor: cardBorder }]}>
        <View style={styles.brandContainer}>
          <Text style={[styles.brandTitle, { color: primaryColor }]}>Mi Perfil</Text>
        </View>

        <View style={styles.navActions}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setModalNotificaciones(true)}
          >
            <Ionicons name="notifications-outline" size={22} color={textLight} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={handleCerrarSesion}
          >
            <Feather name="log-out" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {isEditing ? (

          /* MODO DE EDICIÓN */
          <View style={styles.editContainer}>
            <View style={styles.photoSection}>
              <View style={styles.photoContainer}>
                {fotoPerfil ? (
                  <Image source={{ uri: fotoPerfil }} style={[styles.profilePhoto, { borderColor: primaryColor }]} />
                ) : (
                  <View style={[styles.defaultPhoto, { backgroundColor: surfaceContainer, borderColor: primaryColor }]}>
                    <Ionicons name="person" size={50} color={primaryColor} />
                  </View>
                )}
                <TouchableOpacity
                  style={[styles.cameraButton, { backgroundColor: primaryColor, borderColor: currentBg }]}
                  onPress={handleSeleccionarFoto}
                >
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.photoButtons}>
                <TouchableOpacity
                  style={[styles.changePhotoButton, { backgroundColor: primaryColor }]}
                  onPress={handleSeleccionarFoto}
                >
                  <Feather name="upload" size={14} color="#FFFFFF" />
                  <Text style={styles.photoButtonText}>Cambiar foto</Text>
                </TouchableOpacity>

                {fotoPerfil && (
                  <TouchableOpacity
                    style={[styles.deletePhotoButton, { borderColor: cardBorder }]}
                    onPress={handleEliminarFoto}
                  >
                    <Feather name="trash-2" size={14} color="#FF6B6B" />
                    <Text style={styles.deletePhotoText}>Eliminar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* FORMULARIO DE EDICIÓN */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: textMuted }]}>Nombre completo</Text>
              <View style={[styles.searchWrap, { backgroundColor: isDark ? "rgba(15, 13, 21, 0.6)" : colors.surface, borderColor: cardBorder }]}>
                <Feather name="user" size={16} color={primaryColor} />
                <TextInput
                  style={[styles.searchInput, { color: textLight }]}
                  value={nombre}
                  onChangeText={setNombre}
                  placeholderTextColor={textMuted}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: textMuted }]}>Correo electrónico</Text>
              <View style={[styles.searchWrap, { backgroundColor: isDark ? "rgba(15, 13, 21, 0.6)" : colors.surface, borderColor: cardBorder }]}>
                <Feather name="mail" size={16} color={primaryColor} />
                <TextInput
                  style={[styles.searchInput, { color: textLight }]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={textMuted}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: textMuted }]}>Ubicación</Text>
              <View style={[styles.searchWrap, { backgroundColor: isDark ? "rgba(15, 13, 21, 0.6)" : colors.surface, borderColor: cardBorder }]}>
                <Feather name="map-pin" size={16} color={primaryColor} />
                <TextInput
                  style={[styles.searchInput, { color: textLight }]}
                  value={ubicacion}
                  onChangeText={setUbicacion}
                  placeholderTextColor={textMuted}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: textMuted }]}>Biografía / Descripción</Text>
              <View style={[styles.searchWrap, styles.textAreaWrap, { backgroundColor: isDark ? "rgba(15, 13, 21, 0.6)" : colors.surface, borderColor: cardBorder }]}>
                <TextInput
                  style={[styles.searchInput, styles.textArea, { color: textLight }]}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor={textMuted}
                />
              </View>
            </View>

            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: primaryColor }]} onPress={handleGuardarPerfil}>
              <Text style={styles.primaryButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelarEdicion}
            >
              <Text style={[styles.cancelButtonText, { color: textMuted }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (

          /* VISTA PERFIL DETALLADO */
          <>
            <View style={[styles.profileSection, { backgroundColor: currentBg }]}>
              <View style={styles.profilePhotoWrapper}>
                {fotoPerfil ? (
                  <Image source={{ uri: fotoPerfil }} style={[styles.mainProfilePhoto, { borderColor: primaryColor }]} />
                ) : (
                  <View style={[styles.mainDefaultPhoto, { backgroundColor: surfaceContainer, borderColor: primaryColor }]}>
                    <Ionicons name="person" size={48} color={primaryColor} />
                  </View>
                )}
              </View>

              <Text style={[styles.heroTitle, { color: textLight }]}>{nombre}</Text>
              <Text style={[styles.heroSubtitle, { color: textMuted }]}>{email}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={primaryColor} />
                <Text style={[styles.locationText, { color: textMuted }]}>{ubicacion}</Text>
              </View>

              <Text style={[styles.profileDescription, { color: textMuted }]}>{descripcion}</Text>

              <TouchableOpacity
                style={[styles.editProfileButton, { backgroundColor: primaryColor }]}
                onPress={handleIniciarEdicion}
              >
                <Feather name="edit-3" size={15} color="#FFFFFF" />
                <Text style={styles.editProfileText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>

            {/* BARRA DE ESTADÍSTICAS */}
            <View style={styles.statsRowContainer}>
              <View style={[styles.statsRow, { backgroundColor: cardBg, borderColor: cardBorder }]}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: primaryColor }]}>{publicaciones.length}</Text>
                  <Text style={[styles.statLabel, { color: textMuted }]}>REPORTES</Text>
                </View>

                <View style={[styles.statDivider, { backgroundColor: cardBorder }]} />

                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: primaryColor }]}>{adopciones.length}</Text>
                  <Text style={[styles.statLabel, { color: textMuted }]}>ADOPCIONES</Text>
                </View>

                <View style={[styles.statDivider, { backgroundColor: cardBorder }]} />

                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { color: primaryColor }]}>{favoritos.length}</Text>
                  <Text style={[styles.statLabel, { color: textMuted }]}>FAVORITOS</Text>
                </View>
              </View>
            </View>

            {/* TAB BAR DE NAVEGACIÓN */}
            <View style={[styles.tabsContainer, { backgroundColor: currentBg, borderBottomColor: cardBorder }]}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "publicaciones" && { borderBottomColor: primaryColor }]}
                onPress={() => setActiveTab("publicaciones")}
              >
                <Ionicons
                  name="grid-outline"
                  size={16}
                  color={activeTab === "publicaciones" ? primaryColor : textMuted}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: textMuted },
                    activeTab === "publicaciones" && { color: primaryColor, fontWeight: "bold" },
                  ]}
                >
                  Mis Publicaciones
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "favoritos" && { borderBottomColor: primaryColor }]}
                onPress={() => setActiveTab("favoritos")}
              >
                <Ionicons
                  name={activeTab === "favoritos" ? "heart" : "heart-outline"}
                  size={16}
                  color={activeTab === "favoritos" ? primaryColor : textMuted}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: textMuted },
                    activeTab === "favoritos" && { color: primaryColor, fontWeight: "bold" },
                  ]}
                >
                  Favoritos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "adopciones" && { borderBottomColor: primaryColor }]}
                onPress={() => setActiveTab("adopciones")}
              >
                <MaterialCommunityIcons
                  name="paw-outline"
                  size={16}
                  color={activeTab === "adopciones" ? primaryColor : textMuted}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: textMuted },
                    activeTab === "adopciones" && { color: primaryColor, fontWeight: "bold" },
                  ]}
                >
                  Mis Adopciones
                </Text>
              </TouchableOpacity>
            </View>

            {/* RENDERIZADO DINÁMICO DE LOS TABS */}
            <View style={[styles.sectionContainer, { backgroundColor: currentBg }]}>
              {activeTab === "publicaciones" &&
                (publicaciones.length > 0 ? (
                  publicaciones.map((pub) => (
                    <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]} key={pub.id}>
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeaderRow}>
                          <View style={[styles.itemIcon, { backgroundColor: surfaceContainer }]}>
                            <Ionicons name="alert-circle" size={22} color={primaryColor} />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.cardTitle, { color: textLight }]}>{pub.titulo}</Text>
                            <Text style={[styles.cardDetail, { color: textMuted }]}>{pub.fecha}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleEliminarPublicacion(pub.id)}
                            style={{ padding: 4 }}
                          >
                            <Feather name="trash-2" size={16} color="#FF6B6B" />
                          </TouchableOpacity>
                        </View>
                        <Text style={[styles.itemLocation, { color: primaryColor }]}>{pub.ubicacion}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="documents-outline" size={38} color={cardBorder} />
                    <Text style={[styles.sectionTitle, { color: textLight }]}>Sin publicaciones</Text>
                    <Text style={[styles.emptyText, { color: textMuted }]}>No has realizado ningún reporte aún.</Text>
                  </View>
                ))}

              {activeTab === "favoritos" &&
                (favoritos.length > 0 ? (
                  favoritos.map((pet) => (
                    <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]} key={pet.id}>
                      <Text style={[styles.cardTitle, { color: textLight }]}>{pet.nombre}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={38} color={cardBorder} />
                    <Text style={[styles.sectionTitle, { color: textLight }]}>Sin favoritos</Text>
                    <Text style={[styles.emptyText, { color: textMuted }]}>
                      Aquí verás las mascotas o publicaciones que te han gustado.
                    </Text>
                  </View>
                ))}

              {activeTab === "adopciones" && (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="paw-off-outline" size={38} color={cardBorder} />
                  <Text style={[styles.sectionTitle, { color: textLight }]}>Sin adopciones</Text>
                  <Text style={[styles.emptyText, { color: textMuted }]}>
                    No tienes solicitudes de adopción en curso.
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* MODAL NOTIFICACIONES */}
      <Modal
        visible={modalNotificaciones}
        transparent
        animationType="fade"
        onRequestClose={() => setModalNotificaciones(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalNotificaciones(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor: surfaceContainerHigh, borderColor: cardBorder }]}>
            <View style={[styles.modalHeader, { borderBottomColor: cardBorder }]}>
              <View>
                <Text style={[styles.modalHeaderTitle, { color: textLight }]}>Notificaciones</Text>
                <Text style={[styles.modalHeaderSubtitle, { color: textMuted }]}>Alertas e interacciones</Text>
              </View>
              <TouchableOpacity
                style={[styles.closeButton, { backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)" }]}
                onPress={() => setModalNotificaciones(false)}
              >
                <Ionicons name="close" size={20} color={textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
              <View style={[styles.notificationIcon, { backgroundColor: surfaceContainer }]}>
                <Ionicons name="heart" size={18} color={primaryColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoValue, { color: textLight }]}>Nueva respuesta</Text>
                <Text style={[styles.cardDetail, { color: textMuted }]}>Comentaron en tu publicación de rescate.</Text>
                <Text style={[styles.statLabel, { color: textMuted }]}>Hace 10 min</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}