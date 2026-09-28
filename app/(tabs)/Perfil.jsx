import React, { useState, useContext } from "react";
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
  Platform,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../context/UserContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const COLORS = {
  surface: "#17121F",
  surfaceContainer: "#1F192B",
  surfaceContainerHigh: "#282038",
  cardBg: "#21182D",
  cardBorder: "#34253F",
  primary: "#A78BFA",
  primaryContainer: "#6D4CC7",
  onPrimaryContainer: "#FFFFFF",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#9E97A7",
  danger: "#FF6B6B",
};

export default function Perfil({ navigation }) {
  const { userData, updateUser } = useContext(UserContext);

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surfaceContainer} />

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>Mi Perfil</Text>
        </View>

        <View style={styles.navActions}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => setModalNotificaciones(true)}
          >
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurface} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={handleCerrarSesion}
          >
            <Feather name="log-out" size={20} color={COLORS.danger} />
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
                  <Image source={{ uri: fotoPerfil }} style={styles.profilePhoto} />
                ) : (
                  <View style={styles.defaultPhoto}>
                    <Ionicons name="person" size={50} color={COLORS.primary} />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={handleSeleccionarFoto}
                >
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.photoButtons}>
                <TouchableOpacity
                  style={styles.changePhotoButton}
                  onPress={handleSeleccionarFoto}
                >
                  <Feather name="upload" size={14} color="#FFFFFF" />
                  <Text style={styles.photoButtonText}>Cambiar foto</Text>
                </TouchableOpacity>

                {fotoPerfil && (
                  <TouchableOpacity
                    style={styles.deletePhotoButton}
                    onPress={handleEliminarFoto}
                  >
                    <Feather name="trash-2" size={14} color={COLORS.danger} />
                    <Text style={styles.deletePhotoText}>Eliminar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* FORMULARIO DE EDICIÓN */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombre completo</Text>
              <View style={styles.searchWrap}>
                <Feather name="user" size={16} color={COLORS.primary} />
                <TextInput
                  style={styles.searchInput}
                  value={nombre}
                  onChangeText={setNombre}
                  placeholderTextColor={COLORS.onSurfaceVariant}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View style={styles.searchWrap}>
                <Feather name="mail" size={16} color={COLORS.primary} />
                <TextInput
                  style={styles.searchInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={COLORS.onSurfaceVariant}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Ubicación</Text>
              <View style={styles.searchWrap}>
                <Feather name="map-pin" size={16} color={COLORS.primary} />
                <TextInput
                  style={styles.searchInput}
                  value={ubicacion}
                  onChangeText={setUbicacion}
                  placeholderTextColor={COLORS.onSurfaceVariant}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Biografía / Descripción</Text>
              <View style={[styles.searchWrap, styles.textAreaWrap]}>
                <TextInput
                  style={[styles.searchInput, styles.textArea]}
                  value={descripcion}
                  onChangeText={setDescripcion}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor={COLORS.onSurfaceVariant}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleGuardarPerfil}>
              <Text style={styles.primaryButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelarEdicion}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (

          /* VISTA PERFIL DETALLADO */
          <>
            <View style={styles.profileSection}>
              <View style={styles.profilePhotoWrapper}>
                {fotoPerfil ? (
                  <Image source={{ uri: fotoPerfil }} style={styles.mainProfilePhoto} />
                ) : (
                  <View style={styles.mainDefaultPhoto}>
                    <Ionicons name="person" size={48} color={COLORS.primary} />
                  </View>
                )}
              </View>

              <Text style={styles.heroTitle}>{nombre}</Text>
              <Text style={styles.heroSubtitle}>{email}</Text>

              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
                <Text style={styles.locationText}>{ubicacion}</Text>
              </View>

              <Text style={styles.profileDescription}>{descripcion}</Text>

              <TouchableOpacity
                style={styles.editProfileButton}
                onPress={handleIniciarEdicion}
              >
                <Feather name="edit-3" size={15} color="#FFFFFF" />
                <Text style={styles.editProfileText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>

            {/* BARRA DE ESTADÍSTICAS */}
            <View style={styles.statsRowContainer}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{publicaciones.length}</Text>
                  <Text style={styles.statLabel}>REPORTES</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{adopciones.length}</Text>
                  <Text style={styles.statLabel}>ADOPCIONES</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{favoritos.length}</Text>
                  <Text style={styles.statLabel}>FAVORITOS</Text>
                </View>
              </View>
            </View>

            {/* TAB BAR DE NAVEGACIÓN */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[styles.tab, activeTab === "publicaciones" && styles.activeTab]}
                onPress={() => setActiveTab("publicaciones")}
              >
                <Ionicons
                  name="grid-outline"
                  size={16}
                  color={activeTab === "publicaciones" ? COLORS.primary : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "publicaciones" && styles.activeTabText,
                  ]}
                >
                  Publicaciones
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "favoritos" && styles.activeTab]}
                onPress={() => setActiveTab("favoritos")}
              >
                <Ionicons
                  name={activeTab === "favoritos" ? "heart" : "heart-outline"}
                  size={16}
                  color={activeTab === "favoritos" ? COLORS.primary : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "favoritos" && styles.activeTabText,
                  ]}
                >
                  Favoritos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, activeTab === "adopciones" && styles.activeTab]}
                onPress={() => setActiveTab("adopciones")}
              >
                <MaterialCommunityIcons
                  name="paw-outline"
                  size={16}
                  color={activeTab === "adopciones" ? COLORS.primary : COLORS.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "adopciones" && styles.activeTabText,
                  ]}
                >
                  Adopciones
                </Text>
              </TouchableOpacity>
            </View>

            {/* RENDERIZADO DINÁMICO DE LOS TABS */}
            <View style={styles.sectionContainer}>
              {activeTab === "publicaciones" &&
                (publicaciones.length > 0 ? (
                  publicaciones.map((pub) => (
                    <View style={styles.card} key={pub.id}>
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeaderRow}>
                          <View style={styles.itemIcon}>
                            <Ionicons name="alert-circle" size={22} color={COLORS.primary} />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.cardTitle}>{pub.titulo}</Text>
                            <Text style={styles.cardDetail}>{pub.fecha}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => handleEliminarPublicacion(pub.id)}
                            style={{ padding: 4 }}
                          >
                            <Feather name="trash-2" size={16} color={COLORS.danger} />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.itemLocation}>{pub.ubicacion}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="documents-outline" size={38} color={COLORS.cardBorder} />
                    <Text style={styles.sectionTitle}>Sin publicaciones</Text>
                    <Text style={styles.emptyText}>No has realizado ningún reporte aún.</Text>
                  </View>
                ))}

              {activeTab === "favoritos" &&
                (favoritos.length > 0 ? (
                  favoritos.map((pet) => (
                    <View style={styles.card} key={pet.id}>
                      <Text style={styles.cardTitle}>{pet.nombre}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={38} color={COLORS.cardBorder} />
                    <Text style={styles.sectionTitle}>Sin favoritos</Text>
                    <Text style={styles.emptyText}>
                      Aquí verás las mascotas o publicaciones que te han gustado.
                    </Text>
                  </View>
                ))}

              {activeTab === "adopciones" && (
                <View style={styles.emptyContainer}>
                  <MaterialCommunityIcons name="paw-off-outline" size={38} color={COLORS.cardBorder} />
                  <Text style={styles.sectionTitle}>Sin adopciones</Text>
                  <Text style={styles.emptyText}>
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
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalHeaderTitle}>Notificaciones</Text>
                <Text style={styles.modalHeaderSubtitle}>Alertas e interacciones</Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalNotificaciones(false)}
              >
                <Ionicons name="close" size={20} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={styles.notificationItem}>
              <View style={styles.notificationIcon}>
                <Ionicons name="heart" size={18} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoValue}>Nueva respuesta</Text>
                <Text style={styles.cardDetail}>Comentaron en tu publicación de rescate.</Text>
                <Text style={styles.statLabel}>Hace 10 min</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

/* ============ ESTILOS ============ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  navbar: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navButton: {
    padding: 4,
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.danger,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  // PERFIL
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: COLORS.surface,
  },
  profilePhotoWrapper: {
    marginBottom: 12,
  },
  mainProfilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  mainDefaultPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: COLORS.onSurface,
    fontSize: 22,
    fontWeight: "bold",
  },
  heroSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginTop: 2,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginLeft: 4,
  },
  profileDescription: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  editProfileText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 6,
  },

  // ESTADÍSTICAS
  statsRowContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    paddingVertical: 14,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.cardBorder,
  },

  // TABS
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    backgroundColor: COLORS.surface,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    gap: 6,
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  // SECCIONES / CARDS
  sectionContainer: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
  },
  cardContent: {
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.onSurface,
  },
  cardDetail: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
  },
  itemLocation: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 35,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.onSurface,
    marginTop: 10,
    marginBottom: 4,
  },
  emptyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
  },

  // FORMULARIO DE EDICIÓN
  editContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 18,
  },
  photoContainer: {
    position: "relative",
  },
  profilePhoto: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  defaultPhoto: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  photoButtons: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  photoButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  deletePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  deletePhotoText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: "bold",
    marginBottom: 6,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(15, 13, 21, 0.6)",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  textAreaWrap: {
    height: "auto",
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  textArea: {
    minHeight: 70,
  },
  primaryButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  primaryButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
  },

  // MODALES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingBottom: 8,
  },
  modalHeaderTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.onSurface,
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.onSurface,
    fontWeight: "bold",
  },
});