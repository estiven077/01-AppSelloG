import { Platform, StatusBar, StyleSheet } from "react-native";

// Exportamos COLORS para usar exactamente los mismos colores en la pantalla
export const COLORS = {
  primary: "#c084fc", // Morado claro principal
  primaryContainer: "#9333ea", // Contenedor morado
  onPrimaryContainer: "#ffffff", // Texto sobre contenedor
  surface: "#111414",
  surfaceContainer: "#1d2020",
  onSurface: "#e1e3e2",
  onSurfaceVariant: "#bccabc",
  cardBg: "rgba(255, 255, 255, 0.06)",
  cardBorder: "rgba(255, 255, 255, 0.14)",
  error: "#ef4444",
  warning: "#f39c12",
  info: "#3b82f6",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    paddingBottom: 35,
  },

  /* ================= ENCABEZADO ================= */
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

  /* ================= ESTADÍSTICAS ================= */
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

  /* ================= SECCIONES (pantalla principal) ================= */
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

  /* ================= BUSCADOR Y FILTROS ================= */
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

  /* ================= TARJETAS DE REPORTES ================= */
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
    backgroundColor: "rgba(147, 51, 234, 0.1)",
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
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(192, 132, 252, 0.06)",
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

  /* ================= ESTADO VACÍO ================= */
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

  /* ================= MENSAJE FINAL ================= */
  helpCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "rgba(192, 132, 252, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.2)",
    borderRadius: 16,
    padding: 15,
  },
  helpIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(192, 132, 252, 0.12)",
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

  /* ==== MODALES ==== */
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
    maxHeight: "92%", // Evita que el modal se salga de la pantalla
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
  modalScrollContent: {
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(147, 51, 234, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 16,
  },

  /* Encabezado de las tarjetas dentro del modal */
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  /* Tipo de situación */
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  typeOption: {
    flexBasis: "30%",
    flexGrow: 1,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  typeOptionWide: {
    flexBasis: "100%",
  },
  typeOptionSelected: {
    borderColor: COLORS.primaryContainer,
    backgroundColor: "rgba(147, 51, 234, 0.1)",
  },
  typeLabel: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },

  /* Animal */
  animalTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  animalOptions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  animalOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 10,
    borderRadius: 12,
  },
  animalOptionActive: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  animalOptionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: "600",
  },
  animalOptionTextActive: {
    color: COLORS.onPrimaryContainer,
  },

  /* Campos de texto */
  inputLabel: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.onSurface,
    fontSize: 13,
  },
  textArea: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORS.onSurface,
    fontSize: 13,
    height: 100,
  },

  /* Botón registrar */
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 14,
    fontWeight: "bold",
  },
});