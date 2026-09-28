import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useNavigation } from "expo-router"; 
import { useMenu } from "../../context/menuContext";

// Importa tu nuevo componente Navbar reutilizable
import Navbar from "../../components/Navbar";


const { width: SCREEN_WIDTH } = Dimensions.get("window");
 
const COLORS = {
  primary: "#7C3AED",
  primaryContainer: "#7C3AED",
  onPrimaryContainer: "#FFFFFF",
  surface: "#0F172A",
  surfaceContainer: "rgba(15, 23, 42, 0.75)",
  surfaceContainerHigh: "#0F172A",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#C4B5FD",
  cardBg: "rgba(15, 23, 42, 0.75)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  error: "#E11D48",
  success: "#10B981",
};
 
const REPORTS = [
  {
    id: "r1",
    title: "Canino en abandono",
    name: "Apolo",
    location: "Calle 45 #23-10, Popayán",
    breed: "Mestizo (Canino)",
    age: "Aprox. 2 años",
    gender: "Macho",
    status: "Urgente",
    vaccines: "Rabia (Sí), Pentavalente (Incompleta)",
    medicalHistory: "Desnutrición leve, heridas superficiales tratadas. Sin parásitos internos.",
    history: "Fue rescatado vagando cerca de una vía principal tras ser abandonado...",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80",
    tags: [
      { label: "URGENTE", color: "#ef4444" },
      { label: "MALTRATO", color: "#f97316" },
    ],
  }, 
];

const PETS = [
  {
    id: "p1",
    name: "Luna",
    info: "Labrador • 2 años • Popayán",
    breed: "Labrador Retriever",
    age: "2 años",
    gender: "Hembra",
    status: "En Adopción",
    vaccines: "Al día (Rabia, Parvovirus)",
    medicalHistory: "Esterilizada, excelente salud general.",
    history: "Es una perrita muy juguetona, cariñosa y llena de energía.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80",
    tag: { label: "URGENTE", color: "#ef4444" },
  }, 
];

export default function Home() {
  const router = useRouter();
 
  const [adoptadosCount, setAdoptadosCount] = useState(0);
  const [denunciasCount, setDenunciasCount] = useState(0);
  const [voluntariosCount, setVoluntariosCount] = useState(0); 
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [favoritos, setFavoritos] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const reportsScrollViewRef = useRef(null);
  const petsScrollViewRef = useRef(null);

  const mascotasFiltradas = PETS.filter((pet) =>
    pet.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  function toggleFavorito(id) {
    setFavoritos((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function verDetalleReporte(report) {
    setReporteSeleccionado(report);
  }

  function verDetalleMascota(pet) {
    setMascotaSeleccionada(pet);
  }

  function irAFormularioAdopcion(item) {
    setReporteSeleccionado(null);
    setMascotaSeleccionada(null);
    Alert.alert("Formulario de Adopción", `Iniciando formulario para ${item?.name || "esta mascota"}.`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} translucent={false} />

      {/* NAVBAR REUTILIZABLE LLAMADO AQUÍ */}
      <Navbar unreadNotifications={2} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* HERO SECTION */}
        <ImageBackground source={require("../../assets/fondo.jpg")} style={styles.heroBackground}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              La lucha contra el{"\n"}
              <Text style={styles.heroHighlight}>maltrato animal{"\n"}</Text>
              nunca termina
            </Text> 
            <Text style={styles.heroSubtitle}>
              Anímate a denunciar, adoptar y proteger a los que no tienen voz.
            </Text> 
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => router.push("/(tabs)/Mascotas")}
            >
              <Text style={styles.primaryButtonText}>Adoptar ahora</Text>
            </TouchableOpacity>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{adoptadosCount}</Text>
                <Text style={styles.statLabel}>Adoptados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{denunciasCount}</Text>
                <Text style={styles.statLabel}>Denuncias atendidas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{voluntariosCount}</Text>
                <Text style={styles.statLabel}>Voluntarios activos</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* SECCIÓN: REPORTES RECIENTES */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionBadge}>VIGILANCIA COMUNITARIA</Text>
          <Text style={styles.sectionTitle}>Reportes Recientes</Text>
          <Text style={styles.sectionSubtitle}>
            Mantente al tanto de las incidencias reportadas en tu comunidad.
          </Text>

          <ScrollView
            ref={reportsScrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardsScroll}
          >
            {REPORTS.map((report) => (
              <View key={report.id} style={styles.card}>
                <ImageBackground
                  source={{ uri: report.image }}
                  style={styles.cardImage}
                >
                  <View style={styles.tagGroup}>
                    {report.tags.map((tag) => (
                      <View
                        key={tag.label}
                        style={[styles.tag, { backgroundColor: tag.color }]}
                      >
                        <Text style={styles.tagText}>{tag.label}</Text>
                      </View>
                    ))}
                  </View>
                </ImageBackground>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{report.title}</Text>
                  <Text style={styles.cardDetail}>📍 {report.location}</Text>
                  <TouchableOpacity
                    style={styles.cardButton}
                    activeOpacity={0.85}
                    onPress={() => verDetalleReporte(report)}
                  >
                    <Text style={styles.cardButtonText}>Ver detalles →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* SECCIÓN: MASCOTAS EN ADOPCIÓN */}
        <View style={[styles.sectionContainer, styles.graySection]}>
          <Text style={styles.sectionBadge}>EN BUSCA DE HOGAR</Text>
          <Text style={styles.sectionTitle}>Mascotas en adopción</Text>
          <Text style={styles.sectionSubtitle}>
            Estos peludos esperan encontrar una familia que los ame.
          </Text>

          <View style={styles.searchWrap}>
            <Ionicons
              name="search"
              size={16}
              color={COLORS.onSurfaceVariant}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>

          {mascotasFiltradas.length === 0 ? (
            <Text style={styles.emptyText}>
              No encontramos mascotas con ese nombre.
            </Text>
          ) : (
            <ScrollView
              ref={petsScrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cardsScroll}
            >
              {mascotasFiltradas.map((pet) => {
                const esFavorito = !!favoritos[pet.id];
                return (
                  <View key={pet.id} style={styles.petCard}>
                    <ImageBackground
                      source={{ uri: pet.image }}
                      style={styles.cardImage}
                    >
                      <View style={styles.petCardTopRow}>
                        <View
                          style={[
                            styles.tag,
                            { backgroundColor: pet.tag.color },
                          ]}
                        >
                          <Text style={styles.tagText}>{pet.tag.label}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.favButton}
                          activeOpacity={0.8}
                          onPress={() => toggleFavorito(pet.id)}
                        >
                          <Ionicons
                            name={esFavorito ? "heart" : "heart-outline"}
                            size={16}
                            color={esFavorito ? COLORS.error : "#ffffff"}
                          />
                        </TouchableOpacity>
                      </View>
                    </ImageBackground>
                    <View style={styles.cardContent}>
                      <Text style={styles.petName}>{pet.name}</Text>
                      <Text style={styles.petInfo}>{pet.info}</Text>
                      <TouchableOpacity
                        style={styles.adoptButton}
                        activeOpacity={0.85}
                        onPress={() => verDetalleMascota(pet)}
                      >
                        <Text style={styles.adoptButtonText}>
                          Ver detalles
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}

          {/* BOTÓN NAVEGAR A MÁS MASCOTAS */}
          <TouchableOpacity
            style={styles.seeMorePetsButton}
            activeOpacity={0.85}
            onPress={() => router.push("/(tabs)/Mascotas")}
          >
            <Text style={styles.seeMorePetsButtonText}>Ver más mascotas</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.onPrimaryContainer} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MODAL DE DETALLES DEL REPORTE */}
      <Modal
        visible={!!reporteSeleccionado}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReporteSeleccionado(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}> 
              <View style={{ flex: 1 }}>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  {reporteSeleccionado?.title}
                </Text>
                <Text style={styles.modalHeaderSubtitle}>
                  Nombre: <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>{reporteSeleccionado?.name}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setReporteSeleccionado(null)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>
 
            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Raza:</Text>
                  <Text style={styles.infoValue}>{reporteSeleccionado?.breed}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Edad:</Text>
                  <Text style={styles.infoValue}>{reporteSeleccionado?.age}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Sexo:</Text>
                  <Text style={styles.infoValue}>{reporteSeleccionado?.gender}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: COLORS.primary }]}>
                    {reporteSeleccionado?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: reporteSeleccionado?.image }}
                style={styles.modalImage}
              />
            </View>
 
            <View style={styles.healthContainer}>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>💉 Vacunas:</Text>
                <Text style={styles.healthText}>{reporteSeleccionado?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>📋 Historial Médico:</Text>
                <Text style={styles.healthText}>{reporteSeleccionado?.medicalHistory}</Text>
              </View>
            </View>
 
            <View style={styles.historyContainer}>
              <Text style={styles.historyLabel}>Antecedentes / Rescate:</Text>
              <Text style={styles.historyText}>
                {reporteSeleccionado?.history}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalAdoptButton}
              activeOpacity={0.85}
              onPress={() => irAFormularioAdopcion(reporteSeleccionado)}
            >
              <Text style={styles.modalAdoptButtonText}>Adoptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalActionButton}
              activeOpacity={0.85}
              onPress={() => setReporteSeleccionado(null)}
            >
              <Text style={styles.modalActionButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE DETALLES DE LA MASCOTA */}
      <Modal
        visible={!!mascotaSeleccionada}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMascotaSeleccionada(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  {mascotaSeleccionada?.name}
                </Text>
                <Text style={styles.modalHeaderSubtitle}>
                  Info: <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>{mascotaSeleccionada?.info}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setMascotaSeleccionada(null)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Raza:</Text>
                  <Text style={styles.infoValue}>{mascotaSeleccionada?.breed}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Edad:</Text>
                  <Text style={styles.infoValue}>{mascotaSeleccionada?.age}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Sexo:</Text>
                  <Text style={styles.infoValue}>{mascotaSeleccionada?.gender}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: COLORS.primary }]}>
                    {mascotaSeleccionada?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: mascotaSeleccionada?.image }}
                style={styles.modalImage}
              />
            </View>

            <View style={styles.healthContainer}>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>💉 Vacunas:</Text>
                <Text style={styles.healthText}>{mascotaSeleccionada?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>📋 Historial Médico:</Text>
                <Text style={styles.healthText}>{mascotaSeleccionada?.medicalHistory}</Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={styles.historyLabel}>Sobre {mascotaSeleccionada?.name}:</Text>
              <Text style={styles.historyText}>
                {mascotaSeleccionada?.history}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.modalAdoptButton}
              activeOpacity={0.85}
              onPress={() => irAFormularioAdopcion(mascotaSeleccionada)}
            >
              <Text style={styles.modalAdoptButtonText}>Adoptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalActionButton}
              activeOpacity={0.85}
              onPress={() => setMascotaSeleccionada(null)}
            >
              <Text style={styles.modalActionButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
  logoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  brandTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navButton: {
    padding: 4,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: COLORS.error,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  heroBackground: {
    width: "100%", 
  },
  heroOverlay: {
    backgroundColor: "rgba(15, 13, 21, 0.85)",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heroTitle: {
    color: COLORS.onSurface,
    fontSize: 26,
    fontWeight: "bold",
    lineHeight: 32,
  },
  heroHighlight: {
    color: COLORS.primary,
  },
  heroSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    marginVertical: 14,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 25,
  },
  primaryButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 15,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.15)",
    paddingTop: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "flex-start",
  },
  statNumber: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
  },
  sectionContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
  },
  graySection: {
    backgroundColor: COLORS.surfaceContainer,
  },
  sectionBadge: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.onSurface,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginBottom: 16,
    marginTop: 2,
  },
  cardsScroll: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(15, 13, 21, 0.6)",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontStyle: "italic",
  },
  card: {
    width: Math.min(260, SCREEN_WIDTH * 0.72),
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
  },
  cardImage: {
    height: 130,
    width: "100%",
  },
  tagGroup: {
    flexDirection: "row",
    padding: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
    alignSelf: "flex-start",
    marginTop: 8,
    marginLeft: 8,
  },
  tagText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  cardButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 12,
  },
  petCard: {
    width: Math.min(210, SCREEN_WIDTH * 0.58),
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  petCardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 8,
  },
  favButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginRight: 4,
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.onSurface,
  },
  petInfo: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginVertical: 4,
  },
  adoptButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  adoptButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 12,
  },
  seeMorePetsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 18,
    gap: 8,
  },
  seeMorePetsButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 14,
  },

  /* ESTILOS DEL MODAL DE DETALLES */
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
    marginBottom: 12,
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
  modalTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  modalInfoContainer: {
    flex: 1,
    gap: 5,
  },
  infoRow: {
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    fontWeight: "bold",
  },
  infoValue: {
    fontSize: 12,
    color: COLORS.onSurface,
    fontWeight: "500",
  },
  modalImage: {
    width: 105,
    height: 115,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primaryContainer,
  },
  healthContainer: {
    marginTop: 10,
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  healthItem: {
    flexDirection: "column",
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.onSurfaceVariant,
  },
  healthText: {
    fontSize: 11,
    color: COLORS.onSurface,
    marginTop: 1,
  },
  historyContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  historyLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 2,
  },
  historyText: {
    fontSize: 11,
    color: COLORS.onSurface,
    lineHeight: 16,
  },
  modalAdoptButton: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  modalAdoptButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 13,
  },
  modalActionButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  modalActionButtonText: {
    color: COLORS.onSurfaceVariant,
    fontWeight: "bold",
    fontSize: 13,
  },
});