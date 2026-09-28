import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Importamos el Navbar Reutilizable
import Navbar from "../../components/Navbar";

// IMPORTAMOS LOS ESTILOS Y COLORES DESDE LA CARPETA STYLES
import { styles } from "../../styles/Reportes.js";

// Si en tu archivo de estilos pusiste COLORS de forma local, puedes definir una referencia 
// rápida para los colores que usa tu lógica (como COLORS.surface, COLORS.primary, etc.):
const COLORS = {
  primary: "#a855f7",          // Tu color morado principal
  primaryContainer: "#9333ea",  // Contenedor morado
  onPrimaryContainer: "#ffffff",// Texto sobre contenedor
  surface: "#111414",
  surfaceContainer: "#1d2020",
  onSurface: "#e1e3e2",
  onSurfaceVariant: "#d1ddd1",
  cardBg: "rgba(255, 255, 255, 0.06)",
  cardBorder: "rgba(255, 255, 255, 0.14)",
  error: "#ef4444",
  warning: "#f39c12",
  info: "#3b82f6",
};

const STORAGE_KEY = "@sello_guardian_reportes";

const REPORT_TYPES = [
  { id: 'abuso', icon: 'healing', label: 'Abuso Físico' },
  { id: 'abandono', icon: 'home-work', label: 'Abandono' },
  { id: 'venta', icon: 'storefront', label: 'Venta Ilegal' },
  { id: 'otro', icon: 'more-horiz', label: 'Otra Situación de Riesgo', wide: true },
];

export default function ReportesScreen() {
  const [reportes, setReportes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [modalVisible, setModalVisible] = useState(false);
  const [animal, setAnimal] = useState("");
  const [zona, setZona] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [reportType, setReportType] = useState('abuso');

  useEffect(() => {
    cargarReportes();
  }, []);

  async function cargarReportes() {
    try {
      const datos = await AsyncStorage.getItem(STORAGE_KEY);
      if (datos !== null) {
        setReportes(JSON.parse(datos));
      }
    } catch (error) {
      console.log("Error cargando reportes:", error);
    }
  }

  async function guardarReportes(nuevosReportes) {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevosReportes)
      );
      setReportes(nuevosReportes);
    } catch (error) {
      console.log("Error guardando reportes:", error);
      Alert.alert(
        "Error",
        "No fue posible guardar los reportes."
      );
    }
  }

  async function crearReporte() {
    if (!animal.trim()) {
      Alert.alert(
        "Falta información",
        "Selecciona el animal que quieres reportar."
      );
      return;
    }

    if (!zona.trim()) {
      Alert.alert(
        "Falta información",
        "Escribe la zona, ciudad, barrio o dirección."
      );
      return;
    }

    if (!descripcion.trim()) {
      Alert.alert(
        "Falta información",
        "Describe lo que está ocurriendo."
      );
      return;
    }

    const nuevoReporte = {
      id: Date.now().toString(),
      animal: animal.trim(),
      zona: zona.trim(),
      descripcion: descripcion.trim(),
      estado: "En proceso",
      fecha: new Date().toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const nuevosReportes = [
      nuevoReporte,
      ...reportes,
    ];

    await guardarReportes(nuevosReportes);

    setAnimal("");
    setZona("");
    setDescripcion("");
    setModalVisible(false);

    Alert.alert(
      "Reporte registrado",
      "La denuncia fue registrada correctamente."
    );
  }

  async function marcarAtendido(id) {
    const nuevosReportes = reportes.map((reporte) => {
      if (reporte.id === id) {
        return {
          ...reporte,
          estado: "Atendido",
        };
      }
      return reporte;
    });

    await guardarReportes(nuevosReportes);
  }

  function confirmarEliminar(id) {
    Alert.alert(
      "Eliminar reporte",
      "¿Seguro que quieres eliminar este reporte?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const nuevosReportes = reportes.filter(
              (reporte) => reporte.id !== id
            );
            await guardarReportes(nuevosReportes);
          },
        },
      ]
    );
  }

  const totalReportes = reportes.length;
  const totalAtendidos = reportes.filter(
    (reporte) => reporte.estado === "Atendido"
  ).length;
  const totalEnProceso = reportes.filter(
    (reporte) => reporte.estado === "En proceso"
  ).length;

  const reportesFiltrados = reportes.filter((reporte) => {
    const texto = busqueda.toLowerCase().trim();

    const coincideBusqueda =
      texto === "" ||
      reporte.animal.toLowerCase().includes(texto) ||
      reporte.zona.toLowerCase().includes(texto) ||
      reporte.descripcion.toLowerCase().includes(texto);

    const coincideFiltro =
      filtro === "Todos" ||
      reporte.estado === filtro;

    return coincideBusqueda && coincideFiltro;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
      />

      <Navbar unreadNotifications={0} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ============== ENCABEZADO ============== */}
        <View style={styles.header}>
          <Text style={styles.sectionBadge}>
            VIGILANCIA COMUNITARIA
          </Text>

          <Text style={styles.headerTitle}>
            Reportes y Denuncias
          </Text>

          <Text style={styles.headerSubtitle}>
            Reporta casos de abandono, maltrato o animales
            que necesiten ayuda en tu comunidad.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons
              name="add-circle-outline"
              size={21}
              color={COLORS.onPrimaryContainer}
            />
            <Text style={styles.primaryButtonText}>
              Realizar una denuncia
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================= ESTADÍSTICAS ================= */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons
              name="alert-circle-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.statNumber}>
              {totalReportes}
            </Text>
            <Text style={styles.statLabel}>
              Denuncias
            </Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="time-outline"
              size={22}
              color={COLORS.warning}
            />
            <Text style={styles.statNumber}>
              {totalEnProceso}
            </Text>
            <Text style={styles.statLabel}>
              En proceso
            </Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons
              name="checkmark-circle-outline"
              size={22}
              color={COLORS.primary}
            />
            <Text style={styles.statNumber}>
              {totalAtendidos}
            </Text>
            <Text style={styles.statLabel}>
              Atendidas
            </Text>
          </View>
        </View>

        {/* ================= BUSCADOR ================= */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Buscar reportes
          </Text>
          <Text style={styles.sectionSubtitle}>
            Busca por zona, ciudad, barrio, dirección o animal.
          </Text>

          <View style={styles.searchWrap}>
            <Ionicons
              name="search"
              size={18}
              color={COLORS.onSurfaceVariant}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Ej: Bogotá, Suba, perro..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={busqueda}
              onChangeText={setBusqueda}
            />
            {busqueda.length > 0 && (
              <TouchableOpacity onPress={() => setBusqueda("")}>
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={COLORS.onSurfaceVariant}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ===== FILTROS ===== */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {["Todos", "En proceso", "Atendido"].map((opcion) => {
            const activo = filtro === opcion;
            return (
              <TouchableOpacity
                key={opcion}
                style={[
                  styles.filterButton,
                  activo && styles.filterButtonActive,
                ]}
                onPress={() => setFiltro(opcion)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activo && styles.filterTextActive,
                  ]}
                >
                  {opcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/*===== REPORTES =====*/}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionBadge}>
                REPORTES REGISTRADOS
              </Text>
              <Text style={styles.sectionTitle}>
                Casos recientes
              </Text>
            </View>
            <Text style={styles.resultCount}>
              {reportesFiltrados.length}
            </Text>
          </View>

          {reportesFiltrados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="document-text-outline"
                size={42}
                color={COLORS.onSurfaceVariant}
              />
              <Text style={styles.emptyTitle}>
                No hay reportes
              </Text>
              <Text style={styles.emptyText}>
                {busqueda
                  ? `No encontramos reportes para "${busqueda}".`
                  : "Todavía no se ha registrado ningún reporte."}
              </Text>
            </View>
          ) : (
            reportesFiltrados.map((reporte) => (
              <View key={reporte.id} style={styles.card}>
                <View style={styles.reportHeader}>
                  <View style={styles.animalIcon}>
                    <Ionicons
                      name="paw-outline"
                      size={23}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={styles.reportHeaderInfo}>
                    <Text style={styles.cardTitle}>
                      {reporte.animal}
                    </Text>
                    <Text style={styles.dateText}>
                      {reporte.fecha}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusTag,
                      reporte.estado === "Atendido"
                        ? styles.statusAttended
                        : styles.statusProcess,
                    ]}
                  >
                    <Text style={styles.statusText}>
                      {reporte.estado}
                    </Text>
                  </View>
                </View>

                <View style={styles.locationBox}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.locationLabel}>
                      Ubicación
                    </Text>
                    <Text style={styles.locationText}>
                      {reporte.zona}
                    </Text>
                  </View>
                </View>

                <Text style={styles.descriptionLabel}>
                  Descripción
                </Text>
                <Text style={styles.description}>
                  {reporte.descripcion}
                </Text>

                <View style={styles.actionsRow}>
                  {reporte.estado !== "Atendido" && (
                    <TouchableOpacity
                      style={styles.attendButton}
                      activeOpacity={0.85}
                      onPress={() => marcarAtendido(reporte.id)}
                    >
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={17}
                        color={COLORS.onPrimaryContainer}
                      />
                      <Text style={styles.attendButtonText}>
                        Marcar como atendido
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmarEliminar(reporte.id)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={COLORS.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ================= MENSAJE FINAL ================= */}
        <View style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={25}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>
              Tu denuncia puede salvar una vida
            </Text>
            <Text style={styles.helpText}>
              Si presencias maltrato o abandono animal,
              repórtalo para que pueda ser atendido.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ================= MODAL PARA CREAR REPORTE ================= */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>

            {/* HEADER FIJO */}
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.modalTitle}>Nueva denuncia</Text>
                <Text style={styles.modalSubtitle}>
                  Su reporte puede salvar una vida. Complete el formulario con la mayor precisión posible.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={27} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            {/* TODO LO DEMÁS VA DENTRO DEL SCROLLVIEW */}
            <ScrollView
              style={{ flexShrink: 1 }}
              showsVerticalScrollIndicator={true}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalScrollContent}
            >
              {/* Denuncia segura */}
              <View style={styles.card}>
                <View style={styles.infoRow}>
                  <View style={styles.infoIconWrap}>
                    <MaterialIcons name="security" size={22} color={COLORS.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoTitle}>Denuncia Segura y Anónima</Text>
                    <Text style={styles.infoText}>
                      Toda la información proporcionada es estrictamente confidencial.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Tipo de situación */}
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Tipo de Situación</Text>
                </View>
                <View style={styles.typeGrid}>
                  {REPORT_TYPES.map((type) => {
                    const selected = reportType === type.id;
                    return (
                      <TouchableOpacity
                        key={type.id}
                        style={[
                          styles.typeOption,
                          type.wide && styles.typeOptionWide,
                          selected && styles.typeOptionSelected,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => setReportType(type.id)}
                      >
                        <MaterialIcons
                          name={type.icon}
                          size={22}
                          color={selected ? COLORS.primary : COLORS.onSurfaceVariant}
                        />
                        <Text style={styles.typeLabel}>{type.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Animal */}
              <Text style={styles.animalTitle}>Animal</Text>
              <View style={styles.animalOptions}>
                {["Perro", "Gato", "Otro"].map((opcion) => {
                  const activo = animal === opcion;
                  return (
                    <TouchableOpacity
                      key={opcion}
                      style={[styles.animalOption, activo && styles.animalOptionActive]}
                      onPress={() => setAnimal(opcion)}
                    >
                      <Ionicons
                        name="paw-outline"
                        size={18}
                        color={activo ? COLORS.onPrimaryContainer : COLORS.onSurfaceVariant}
                      />
                      <Text
                        style={[
                          styles.animalOptionText,
                          activo && styles.animalOptionTextActive,
                        ]}
                      >
                        {opcion}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Zona */}
              <Text style={styles.inputLabel}>Zona / ciudad / barrio / dirección</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Suba, Bogotá"
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={zona}
                onChangeText={setZona}
              />

              {/* Descripción (un solo campo) */}
              <Text style={styles.inputLabel}>Descripción del caso</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe qué está ocurriendo y el estado del animal..."
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              {/* Registrar */}
              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.85}
                onPress={crearReporte}
              >
                <Ionicons name="send-outline" size={19} color={COLORS.onPrimaryContainer} />
                <Text style={styles.saveButtonText}>Registrar denuncia</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}