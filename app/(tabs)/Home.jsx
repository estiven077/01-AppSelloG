import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Modal,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

// Importa tu componente Navbar reutilizable
import Navbar from "../../components/Navbar";

// Importa los estilos desde tu archivo externo
import { styles } from "../../styles/Home";

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
    type: "Perros",
    age: "2 años",
    gender: "Hembra",
    location: "Popayán",
    status: "En Adopción",
    vaccines: "Al día (Rabia, Parvovirus)",
    medicalHistory: "Esterilizada, excelente salud general.",
    history: "Es una perrita muy juguetona, cariñosa y llena de energía.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80",
    tag: { label: "URGENTE", color: "#ef4444" },
  },
  {
    id: "p2",
    name: "Max",
    info: "Bulldog • 1.5 años • Popayán",
    breed: "Bulldog Francés",
    type: "Perros",
    age: "1 año y medio",
    gender: "Macho",
    location: "Popayán",
    status: "En Adopción",
    vaccines: "Al día (Antirrábica, Polivalente)",
    medicalHistory: "Desparasitado, sin antecedentes de salud graves.",
    history: "Max es un perrito muy amigable, le encanta correr y convive muy bien con niños.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80",
    tag: { label: "NUEVO", color: "#10b981" },
  },
  {
    id: "p3",
    name: "Milo",
    info: "Gato • 8 meses • Popayán",
    breed: "Europeo Común",
    type: "Gatos",
    age: "8 meses",
    gender: "Macho",
    location: "Popayán",
    status: "En Adopción",
    vaccines: "Vacuna triple felina al día",
    medicalHistory: "Castrado, exámenes de laboratorio negativos a leucemia.",
    history: "Milo es un tierno gatito hogareño, muy tranquilo y le gusta dormir acompañado.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80",
    tag: { label: "DESTACADO", color: "#7c3aed" },
  },
];

export default function Home() {
  const router = useRouter();
  const { theme, colors } = useTheme();

  const [adoptadosCount, setAdoptadosCount] = useState(0);
  const [denunciasCount, setDenunciasCount] = useState(0);
  const [voluntariosCount, setVoluntariosCount] = useState(0);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [sosModalVisible, setSosModalVisible] = useState(false);
  const [favoritos, setFavoritos] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const reportsScrollViewRef = useRef(null);
  const petsScrollViewRef = useRef(null);

  const mascotasFiltradas = PETS.filter((pet) =>
    pet.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  function toggleFavorito(pet) {
    const isFav = !favoritos[pet.id];
    setFavoritos((prev) => ({ ...prev, [pet.id]: isFav }));

    if (isFav) {
      router.push({
        pathname: "/(tabs)/Favoritos",
        params: {
          newPet: JSON.stringify(pet),
          t: Date.now().toString(),
        },
      });
    }
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

  function irAAdopcion() {
    router.push("/(tabs)/Adopcion");
  }

  function handleWhatsAppSos() {
    setSosModalVisible(false);
    const phoneNumber = "573001234567";
    const message = "¡Hola! Necesito reportar una emergencia o caso de maltrato animal urgente en Popayán.";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("Error", "WhatsApp no está instalado en este dispositivo.");
        }
      })
      .catch((err) => console.error("Error al abrir WhatsApp", err));
  }

  function handleCallSos() {
    setSosModalVisible(false);
    const phoneNumber = "tel:+573001234567";
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Error al realizar la llamada", err)
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
        translucent={false}
      />

      {/* NAVBAR REUTILIZABLE */}
      <Navbar unreadNotifications={2} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* HERO SECTION */}
        <ImageBackground source={require("../../assets/fondo.jpg")} style={styles.heroBackground}>
          <View style={[styles.heroOverlay, { backgroundColor: theme === "dark" ? "rgba(15, 13, 21, 0.85)" : "rgba(255, 255, 255, 0.68)" }]}>
            <Text style={[styles.heroTitle, { color: colors.textLight }]}>
              La lucha contra el{"\n"}
              <Text style={{ color: colors.activePurple }}>maltrato animal{"\n"}</Text>
              nunca termina
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.textMuted }]}>
              Anímate a denunciar, adoptar y proteger a los que no tienen voz.
            </Text>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: colors.activePurple }]}
              activeOpacity={0.85}
              onPress={irAAdopcion}
            >
              <Text style={styles.primaryButtonText}>Adoptar ahora</Text>
            </TouchableOpacity>

            <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.activePurple }]}>{adoptadosCount}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Adoptados</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.activePurple }]}>{denunciasCount}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Denuncias atendidas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.activePurple }]}>{voluntariosCount}</Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>Voluntarios activos</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* CONTENEDOR DESDE EL SOS HACIA ABAJO */}
        <View style={{ backgroundColor: theme === "dark" ? "#0F172A" : colors.background, flex: 1 }}>
          {/* LÍNEA DE REACCIÓN INMEDIATA - SOS */}
          <View style={styles.sosContainer}>
            <View style={styles.sosLeftContent}>
              <View style={styles.sosIconBox}>
                <Ionicons name="alert-circle-outline" size={20} color="#ef4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sosBadgeTitle}>LÍNEA DE REACCIÓN INMEDIATA</Text>
                <Text style={[styles.sosSubtitleText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>¿Presenciaste un caso grave hoy?</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.sosButton}
              activeOpacity={0.85}
              onPress={() => setSosModalVisible(true)}
            >
              <Text style={styles.sosButtonText}>SOS Ahora</Text>
            </TouchableOpacity>
          </View>

          {/* SECCIÓN: REPORTES RECIENTES */}
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionBadge, { color: colors.accent }]}>VIGILANCIA COMUNITARIA</Text>
            <Text style={[styles.sectionTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>Reportes Recientes</Text>
            <Text style={[styles.sectionSubtitle, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
              Mantente al tanto de las incidencias reportadas en tu comunidad.
            </Text>

            <ScrollView
              ref={reportsScrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.cardsScroll}
            >
              {REPORTS.map((report) => (
                <View key={report.id} style={[styles.card, { backgroundColor: theme === "dark" ? "#1e293b" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
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
                    <Text style={[styles.cardTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{report.title}</Text>
                    <Text style={[styles.cardDetail, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>📍 {report.location}</Text>
                    <TouchableOpacity
                      style={[styles.cardButton, { backgroundColor: colors.activePurple }]}
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
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionBadge, { color: colors.accent }]}>EN BUSCA DE HOGAR</Text>
            <Text style={[styles.sectionTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>Mascotas en adopción</Text>
            <Text style={[styles.sectionSubtitle, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
              Estos peludos esperan encontrar una familia que los ame.
            </Text>

            <View style={[styles.searchWrap, { backgroundColor: theme === "dark" ? "#1e293b" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
              <Ionicons
                name="search"
                size={16}
                color={theme === "dark" ? "#94a3b8" : colors.textMuted}
              />
              <TextInput
                style={[styles.searchInput, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}
                placeholder="Buscar por nombre..."
                placeholderTextColor={theme === "dark" ? "#94a3b8" : colors.textMuted}
                value={busqueda}
                onChangeText={setBusqueda}
              />
            </View>

            {mascotasFiltradas.length === 0 ? (
              <Text style={[styles.emptyText, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
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
                    <View key={pet.id} style={[styles.petCard, { backgroundColor: theme === "dark" ? "#1e293b" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
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
                            onPress={() => toggleFavorito(pet)}
                          >
                            <Ionicons
                              name={esFavorito ? "heart" : "heart-outline"}
                              size={16}
                              color={esFavorito ? "#ef4444" : "#ffffff"}
                            />
                          </TouchableOpacity>
                        </View>
                      </ImageBackground>
                      <View style={styles.cardContent}>
                        <Text style={[styles.petName, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{pet.name}</Text>
                        <Text style={[styles.petInfo, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>{pet.info}</Text>
                        <TouchableOpacity
                          style={[styles.adoptButton, { backgroundColor: colors.activePurple }]}
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

            <TouchableOpacity
              style={[styles.seeMorePetsButton, { backgroundColor: colors.activePurple }]}
              activeOpacity={0.85}
              onPress={irAAdopcion}
            >
              <Text style={styles.seeMorePetsButtonText}>Ver más mascotas</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* MODAL ESTILIZADO DE ACCIÓN SOS */}
      <Modal
        visible={sosModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSosModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme === "dark" ? "#0F172A" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme === "dark" ? "#334155" : colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalHeaderTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>
                  🚨 Alerta SOS Inmediata
                </Text>
                <Text style={[styles.modalHeaderSubtitle, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
                  Selecciona cómo deseas comunicarte con el equipo de rescate en Popayán:
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSosModalVisible(false)}
                style={[styles.closeButton, { backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)" }]}
              >
                <Ionicons name="close" size={20} color={theme === "dark" ? "#FFFFFF" : colors.textLight} />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
              <TouchableOpacity
                style={[styles.modalAdoptButton, { backgroundColor: "#25D366" }]}
                activeOpacity={0.85}
                onPress={handleWhatsAppSos}
              >
                <Text style={styles.modalAdoptButtonText}>💬 Escribir por WhatsApp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalAdoptButton, { backgroundColor: "#ef4444" }]}
                activeOpacity={0.85}
                onPress={handleCallSos}
              >
                <Text style={styles.modalAdoptButtonText}>📞 Llamar ahora</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.modalActionButton, { borderColor: theme === "dark" ? "#334155" : colors.border, marginTop: 4 }]}
              activeOpacity={0.85}
              onPress={() => setSosModalVisible(false)}
            >
              <Text style={[styles.modalActionButtonText, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE DETALLES DEL REPORTE */}
      <Modal
        visible={!!reporteSeleccionado}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setReporteSeleccionado(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme === "dark" ? "#0F172A" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme === "dark" ? "#334155" : colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalHeaderTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]} numberOfLines={1}>
                  {reporteSeleccionado?.title}
                </Text>
                <Text style={[styles.modalHeaderSubtitle, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
                  Nombre: <Text style={{ color: colors.activePurple, fontWeight: "bold" }}>{reporteSeleccionado?.name}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setReporteSeleccionado(null)}
                style={[styles.closeButton, { backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)" }]}
              >
                <Ionicons name="close" size={20} color={theme === "dark" ? "#FFFFFF" : colors.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Raza:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{reporteSeleccionado?.breed}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Edad:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{reporteSeleccionado?.age}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Sexo:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{reporteSeleccionado?.gender}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: colors.activePurple }]}>
                    {reporteSeleccionado?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: reporteSeleccionado?.image }}
                style={[styles.modalImage, { borderColor: colors.activePurple }]}
              />
            </View>

            <View style={[styles.healthContainer, { backgroundColor: theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)", borderColor: theme === "dark" ? "#334155" : colors.border }]}>
              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>💉 Vacunas:</Text>
                <Text style={[styles.healthText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{reporteSeleccionado?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>📋 Historial Médico:</Text>
                <Text style={[styles.healthText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{reporteSeleccionado?.medicalHistory}</Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={[styles.historyLabel, { color: colors.activePurple }]}>Antecedentes / Rescate:</Text>
              <Text style={[styles.historyText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>
                {reporteSeleccionado?.history}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.modalAdoptButton, { backgroundColor: colors.activePurple }]}
              activeOpacity={0.85}
              onPress={() => irAFormularioAdopcion(reporteSeleccionado)}
            >
              <Text style={styles.modalAdoptButtonText}>Adoptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalActionButton, { borderColor: theme === "dark" ? "#334155" : colors.border }]}
              activeOpacity={0.85}
              onPress={() => setReporteSeleccionado(null)}
            >
              <Text style={[styles.modalActionButtonText, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Entendido</Text>
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
          <View style={[styles.modalContainer, { backgroundColor: theme === "dark" ? "#0F172A" : colors.surface, borderColor: theme === "dark" ? "#334155" : colors.border }]}>
            <View style={[styles.modalHeader, { borderBottomColor: theme === "dark" ? "#334155" : colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalHeaderTitle, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]} numberOfLines={1}>
                  {mascotaSeleccionada?.name}
                </Text>
                <Text style={[styles.modalHeaderSubtitle, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>
                  Info: <Text style={{ color: colors.activePurple, fontWeight: "bold" }}>{mascotaSeleccionada?.info}</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setMascotaSeleccionada(null)}
                style={[styles.closeButton, { backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)" }]}
              >
                <Ionicons name="close" size={20} color={theme === "dark" ? "#FFFFFF" : colors.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Raza:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{mascotaSeleccionada?.breed}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Edad:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{mascotaSeleccionada?.age}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Sexo:</Text>
                  <Text style={[styles.infoValue, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{mascotaSeleccionada?.gender}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: colors.activePurple }]}>
                    {mascotaSeleccionada?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: mascotaSeleccionada?.image }}
                style={[styles.modalImage, { borderColor: colors.activePurple }]}
              />
            </View>

            <View style={[styles.healthContainer, { backgroundColor: theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.03)", borderColor: theme === "dark" ? "#334155" : colors.border }]}>
              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>💉 Vacunas:</Text>
                <Text style={[styles.healthText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{mascotaSeleccionada?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>📋 Historial Médico:</Text>
                <Text style={[styles.healthText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>{mascotaSeleccionada?.medicalHistory}</Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={[styles.historyLabel, { color: colors.activePurple }]}>Sobre {mascotaSeleccionada?.name}:</Text>
              <Text style={[styles.historyText, { color: theme === "dark" ? "#FFFFFF" : colors.textLight }]}>
                {mascotaSeleccionada?.history}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.modalAdoptButton, { backgroundColor: colors.activePurple }]}
              activeOpacity={0.85}
              onPress={() => irAFormularioAdopcion(mascotaSeleccionada)}
            >
              <Text style={styles.modalAdoptButtonText}>Adoptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalActionButton, { borderColor: theme === "dark" ? "#334155" : colors.border }]}
              activeOpacity={0.85}
              onPress={() => setMascotaSeleccionada(null)}
            >
              <Text style={[styles.modalActionButtonText, { color: theme === "dark" ? "#94a3b8" : colors.textMuted }]}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}