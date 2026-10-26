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
  lavender: "#a78bfa", // botones y acentos del prototipo
  onLavender: "#1e1038", // texto sobre lavender
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

  /*     ENCABEZADO     */
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
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primaryContainer,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 13,
  },

  /*     ESTADÍSTICAS     */
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

  /*     SECCIONES (pantalla principal)     */
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

  /*     BUSCADOR Y FILTROS     */
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
    marginBottom: 14,
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

  /* Etiqueta de categoría + tipo dentro de la tarjeta */
  typeBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  typeBadgeLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
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
  detailsText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    opacity: 0.85,
    marginTop: -6,
    marginBottom: 14,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  
    /* ================= SEGUIMIENTO DEL CASO ================= */
  trackingBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(192, 132, 252, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(192, 132, 252, 0.25)",
    flex: 1,
  },
  trackingTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  trackingText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
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

  /* ================= FORMULARIOS (denuncia / reporte) ================= */
  formGroup: {
    marginTop: 4,
  },
  group: {
    marginBottom: 14,
  },
  inputContainerOutline: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 54,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.cardBg,
  },
  inputContainerMultiline: {
    alignItems: "flex-start",
    paddingTop: 14,
    paddingBottom: 8,
    minHeight: 110,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  selectText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  placeholderText: {
    color: COLORS.onSurfaceVariant,
    opacity: 0.8,
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.onSurface,
    paddingVertical: 0,
  },
  inputTextMultiline: {
    minHeight: 90,
  },
  dropdownMenu: {
    marginTop: 6, 
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.08)",
  },
  dropdownItemText: {
    fontSize: 14,
    color: COLORS.onSurface,
  },
  errorText: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.error,
  },

  /*      Botón registrar      */
  saveButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
    /*      Botón registrar      */
  saveButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 14,
    fontWeight: "bold",
  },

  /* ================= AVISO INVITADOS (NUEVO) ================= */
  invitadoBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  invitadoContainer: {
    backgroundColor: COLORS.surfaceContainer,
    padding: 24,
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
  },
  invitadoIcon: {
    marginBottom: 14,
  },
  invitadoTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  invitadoSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 22,
  },
  invitadoLoginBtn: {
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  invitadoLoginText: {
    color: COLORS.onPrimaryContainer,
    fontWeight: "bold",
    fontSize: 14,
  },
  invitadoCancelBtn: {
    paddingVertical: 11,
    width: "100%",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  invitadoCancelText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "600",
  },
  /* ================= BOTONES PRINCIPALES (prototipo) ================= */
  ctaPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 20,
    backgroundColor: COLORS.lavender,
    shadowColor: COLORS.lavender,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  ctaPrimaryText: {
    color: COLORS.onLavender,
    fontWeight: "700",
    fontSize: 15,
  },
  ctaSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 52,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  ctaSecondaryText: {
    color: COLORS.lavender,
    fontWeight: "700",
    fontSize: 15,
  },

  /* ================= TARJETAS DE CASOS RECIENTES ================= */
  caseCard: {
    backgroundColor: "rgba(192, 132, 252, 0.07)",
    borderWidth: 1.5,
    borderColor: "rgba(192, 132, 252, 0.35)",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  caseTopRow: {
    flexDirection: "row",
    gap: 12,
  },
  caseThumb: {
    width: 96,
    height: 96,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainer,
  },
  caseThumbEmpty: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  caseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  caseMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  casePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  casePillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  casePillText: {
    fontSize: 10,
    fontWeight: "700",
  },
  caseTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
  },
  caseLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  caseLocationText: {
    flex: 1,
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  caseFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
  },
  caseFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  caseFooterLabel: {
    fontSize: 12,
    fontWeight: "700",
  },
  caseLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  caseLinkText: {
    color: COLORS.lavender,
    fontSize: 12,
    fontWeight: "700",
  },
  caseExpanded: {
    marginTop: 14,
  },
  photoStrip: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  photoStripItem: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  anonBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  anonBadgeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: "600",
  },

  /* ================= EVIDENCIA VISUAL ================= */
  evidenceBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 14,
  },
  evidenceBoxError: {
    borderColor: COLORS.error,
  },
  evidenceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  evidenceTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  evidenceTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: "bold",
  },
  evidenceCount: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "600",
  },
  evidenceHint: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginBottom: 12,
  },
  evidenceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  evidenceThumbWrap: {
    width: 84,
    height: 84,
  },
  evidenceThumb: {
    width: 84,
    height: 84,
    borderRadius: 12,
  },
  evidenceRemove: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  evidenceAdd: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  evidenceAddText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: "600",
  },

  /* ================= REPORTE ANÓNIMO ================= */
  anonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  anonIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  anonTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: "bold",
  },
  anonSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
  },

  /* ================= BOTÓN ENVIAR (prototipo) ================= */
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.lavender,
    marginTop: 4,
  },
  submitButtonText: {
    color: COLORS.onLavender,
    fontSize: 15,
    fontWeight: "700",
  },
  submitNote: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 6,
  },
});