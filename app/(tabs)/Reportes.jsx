import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// -----------------------------------------------------------------------
// PALETA — mismos colores del Home
// -----------------------------------------------------------------------

const COLORS = {
  primary: "#61de8a",
  primaryContainer: "#27ae60",
  onPrimaryContainer: "#00391a",
  surface: "#111414",
  surfaceContainer: "#1d2020",
  onSurface: "#e1e3e2",
  onSurfaceVariant: "#bccabc",
  cardBg: "rgba(255, 255, 255, 0.06)",
  cardBorder: "rgba(255, 255, 255, 0.14)",
  error: "#ffb4ab",
  warning: "#f59e0b",
  info: "#3b82f6",
};

const STORAGE_KEY = "@sello_guardian_reportes";

// -----------------------------------------------------------------------
// PANTALLA
// -----------------------------------------------------------------------

export default function ReportesScreen() {
  // ---------------------------------------------------------------------
  // REPORTES
  // ---------------------------------------------------------------------

  const [reportes, setReportes] = useState([]);

  // ---------------------------------------------------------------------
  // BUSCADOR
  // ---------------------------------------------------------------------

  const [busqueda, setBusqueda] = useState("");

  // ---------------------------------------------------------------------
  // FILTRO
  // ---------------------------------------------------------------------

  const [filtro, setFiltro] = useState("Todos");

  // ---------------------------------------------------------------------
  // MODAL
  // ---------------------------------------------------------------------

  const [modalVisible, setModalVisible] = useState(false);

  // ---------------------------------------------------------------------
  // FORMULARIO
  // ---------------------------------------------------------------------

  const [animal, setAnimal] = useState("");
  const [zona, setZona] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // ---------------------------------------------------------------------
  // CARGAR LOS REPORTES AL ABRIR LA PANTALLA
  // ---------------------------------------------------------------------

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

  // ---------------------------------------------------------------------
  // GUARDAR REPORTES
  // ---------------------------------------------------------------------

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

  // ---------------------------------------------------------------------
  // CREAR REPORTE
  // ---------------------------------------------------------------------

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

    // Limpiar formulario
    setAnimal("");
    setZona("");
    setDescripcion("");

    // Cerrar modal
    setModalVisible(false);

    Alert.alert(
      "Reporte registrado",
      "La denuncia fue registrada correctamente."
    );
  }

  // ---------------------------------------------------------------------
  // MARCAR REPORTE COMO ATENDIDO
  // ---------------------------------------------------------------------

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

  // ---------------------------------------------------------------------
  // ELIMINAR REPORTE
  // ---------------------------------------------------------------------

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

  // ---------------------------------------------------------------------
  // CONTADORES REALES
  // ---------------------------------------------------------------------

  const totalReportes = reportes.length;

  const totalAtendidos = reportes.filter(
    (reporte) => reporte.estado === "Atendido"
  ).length;

  const totalEnProceso = reportes.filter(
    (reporte) => reporte.estado === "En proceso"
  ).length;

  // ---------------------------------------------------------------------
  // BUSCADOR REAL
  //
  // Busca dentro de:
  // - Animal
  // - Zona
  // - Ciudad
  // - Barrio
  // - Dirección
  // - Descripción
  // ---------------------------------------------------------------------

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

  // ---------------------------------------------------------------------
  // INTERFAZ
  // ---------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* =============================================================
            NAVBAR
        ============================================================= */}

        <View style={styles.navbar}>

          <View style={styles.brandContainer}>

            <Text style={styles.logoIcon}>
              🛡️
            </Text>

            <View>

              <Text style={styles.brandTitle}>
                SELLO GUARDIÁN
              </Text>

              <Text style={styles.brandSubtitle}>
                Vigilancia comunitaria
              </Text>

            </View>

          </View>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() =>
              Alert.alert(
                "Notificaciones",
                "No tienes notificaciones nuevas."
              )
            }
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={COLORS.onSurface}
            />
          </TouchableOpacity>

        </View>

        {/* =============================================================
            ENCABEZADO
        ============================================================= */}

        <View style={styles.header}>

          <Text style={styles.sectionBadge}>
            VIGILANCIA COMUNITARIA
          </Text>

          <Text style={styles.headerTitle}>
            Reportes y denuncias
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

        {/* =============================================================
            ESTADÍSTICAS REALES
        ============================================================= */}

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

        {/* =============================================================
            BUSCADOR
        ============================================================= */}

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
              <TouchableOpacity
                onPress={() => setBusqueda("")}
              >
                <Ionicons
                  name="close-circle"
                  size={18}
                  color={COLORS.onSurfaceVariant}
                />
              </TouchableOpacity>
            )}

          </View>

        </View>

        {/* =============================================================
            FILTROS
        ============================================================= */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >

          {[
            "Todos",
            "En proceso",
            "Atendido",
          ].map((opcion) => {

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

        {/* =============================================================
            REPORTES
        ============================================================= */}

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

          {/* -----------------------------------------------------------
              NO HAY REPORTES
          ----------------------------------------------------------- */}

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

            /* ---------------------------------------------------------
               LISTA DE REPORTES
            --------------------------------------------------------- */

            reportesFiltrados.map((reporte) => (

              <View
                key={reporte.id}
                style={styles.card}
              >

                {/* CABECERA */}

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

                {/* UBICACIÓN */}

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

                {/* DESCRIPCIÓN */}

                <Text style={styles.descriptionLabel}>
                  Descripción
                </Text>

                <Text style={styles.description}>
                  {reporte.descripcion}
                </Text>

                {/* ACCIONES */}

                <View style={styles.actionsRow}>

                  {reporte.estado !== "Atendido" && (

                    <TouchableOpacity
                      style={styles.attendButton}
                      activeOpacity={0.85}
                      onPress={() =>
                        marcarAtendido(reporte.id)
                      }
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
                    onPress={() =>
                      confirmarEliminar(reporte.id)
                    }
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

        {/* =============================================================
            MENSAJE FINAL
        ============================================================= */}

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

      {/* ===============================================================
          MODAL PARA CREAR REPORTE
      =============================================================== */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>

            {/* HEADER MODAL */}

            <View style={styles.modalHeader}>

              <View>

                <Text style={styles.modalTitle}>
                  Nueva denuncia
                </Text>

                <Text style={styles.modalSubtitle}>
                  Registra la información del caso
                </Text>

              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >

                <Ionicons
                  name="close"
                  size={27}
                  color={COLORS.onSurface}
                />

              </TouchableOpacity>

            </View>

            {/* ANIMAL */}

            <Text style={styles.inputLabel}>
              Animal
            </Text>

            <View style={styles.animalOptions}>

              {[
                "Perro",
                "Gato",
                "Otro",
              ].map((opcion) => {

                const activo = animal === opcion;

                return (
                  <TouchableOpacity
                    key={opcion}
                    style={[
                      styles.animalOption,
                      activo && styles.animalOptionActive,
                    ]}
                    onPress={() => setAnimal(opcion)}
                  >

                    <Ionicons
                      name="paw-outline"
                      size={18}
                      color={
                        activo
                          ? COLORS.onPrimaryContainer
                          : COLORS.onSurfaceVariant
                      }
                    />

                    <Text
                      style={[
                        styles.animalOptionText,
                        activo &&
                          styles.animalOptionTextActive,
                      ]}
                    >
                      {opcion}
                    </Text>

                  </TouchableOpacity>
                );

              })}

            </View>

            {/* ZONA */}

            <Text style={styles.inputLabel}>
              Zona / ciudad / barrio / dirección
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: Suba, Bogotá"
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={zona}
              onChangeText={setZona}
            />

            {/* DESCRIPCIÓN */}

            <Text style={styles.inputLabel}>
              Descripción del caso
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.descriptionInput,
              ]}
              placeholder="Describe qué está ocurriendo..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline={true}
              textAlignVertical="top"
            />

            {/* REGISTRAR */}

            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.85}
              onPress={crearReporte}
            >

              <Ionicons
                name="send-outline"
                size={19}
                color={COLORS.onPrimaryContainer}
              />

              <Text style={styles.saveButtonText}>
                Registrar denuncia
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

// =======================================================================
// ESTILOS
// =======================================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  // ---------------------------------------------------------------------
  // NAVBAR
  // ---------------------------------------------------------------------

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

  logoIcon: {
    fontSize: 20,
    marginRight: 7,
  },

  brandTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  brandSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },

  navButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.cardBg,
    justifyContent: "center",
    alignItems: "center",
  },

  // ---------------------------------------------------------------------
  // HEADER
  // ---------------------------------------------------------------------

  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },

  sectionBadge: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 27,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 18,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 13,
  },

  // ---------------------------------------------------------------------
  // ESTADÍSTICAS
  // ---------------------------------------------------------------------

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 25,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  statLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },

  // ---------------------------------------------------------------------
  // SECCIONES
  // ---------------------------------------------------------------------

  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 21,
    fontWeight: "bold",
  },

  sectionSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 3,
    marginBottom: 10,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  resultCount: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },

  // ---------------------------------------------------------------------
  // BUSCADOR
  // ---------------------------------------------------------------------

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    marginTop: 6,
  },

  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 13,
  },

  // ---------------------------------------------------------------------
  // FILTROS
  // ---------------------------------------------------------------------

  filtersContainer: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 22,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  filterButtonActive: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },

  filterText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "600",
  },

  filterTextActive: {
    color: COLORS.onPrimaryContainer,
  },

  // ---------------------------------------------------------------------
  // TARJETA
  // ---------------------------------------------------------------------

  card: {
    width: "100%",
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },

  reportHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  animalIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(97, 222, 138, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  reportHeaderInfo: {
    flex: 1,
  },

  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: "bold",
  },

  dateText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    marginTop: 2,
  },

  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
  },

  statusProcess: {
    backgroundColor: COLORS.warning,
  },

  statusAttended: {
    backgroundColor: COLORS.primaryContainer,
  },

  statusText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },

  // ---------------------------------------------------------------------
  // UBICACIÓN
  // ---------------------------------------------------------------------

  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(97, 222, 138, 0.06)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  locationLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 9,
  },

  locationText: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  // ---------------------------------------------------------------------
  // DESCRIPCIÓN
  // ---------------------------------------------------------------------

  descriptionLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },

  description: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },

  // ---------------------------------------------------------------------
  // ACCIONES
  // ---------------------------------------------------------------------

  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  attendButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 9,
    borderRadius: 9,
  },

  attendButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 11,
    fontWeight: "bold",
  },

  deleteButton: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },

  // ---------------------------------------------------------------------
  // SIN RESULTADOS
  // ---------------------------------------------------------------------

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  emptyTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },

  // ---------------------------------------------------------------------
  // MENSAJE FINAL
  // ---------------------------------------------------------------------

  helpCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "rgba(97, 222, 138, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(97, 222, 138, 0.2)",
    borderRadius: 16,
    padding: 15,
  },

  helpIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(97, 222, 138, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  helpContent: {
    flex: 1,
  },

  helpTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },

  helpText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 17,
  },

  // ---------------------------------------------------------------------
  // MODAL
  // ---------------------------------------------------------------------

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: COLORS.surfaceContainer,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    color: COLORS.onSurface,
    fontSize: 22,
    fontWeight: "bold",
  },

  modalSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 3,
  },

  // ---------------------------------------------------------------------
  // FORMULARIO
  // ---------------------------------------------------------------------

  inputLabel: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },

  animalOptions: {
    flexDirection: "row",
    gap: 8,
  },

  animalOption: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.surface,
  },

  animalOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  animalOptionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "600",
  },

  animalOptionTextActive: {
    color: COLORS.onPrimaryContainer,
  },

  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 11,
    color: COLORS.onSurface,
    paddingHorizontal: 13,
    height: 46,
    fontSize: 13,
  },

  descriptionInput: {
    height: 90,
    paddingTop: 12,
  },

  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 20,
  },

  saveButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 14,
    fontWeight: "bold",
  },
});