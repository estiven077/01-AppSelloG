import { Platform, StatusBar, StyleSheet } from "react-native";

// Se mantiene exportado por si otra pantalla lo importa
export const COLORS = {
  primary: "#c084fc",
  primaryContainer: "#9333ea",
  onPrimaryContainer: "#ffffff",
  surface: "#111414",
  surfaceContainer: "#1d2020",
  onSurface: "#e1e3e2",
  onSurfaceVariant: "#bccabc",
  cardBg: "rgba(255, 255, 255, 0.06)",
  cardBorder: "rgba(255, 255, 255, 0.14)",
  error: "#ef4444",
  warning: "#f39c12",
  info: "#3b82f6",
  lavender: "#a78bfa",
  onLavender: "#1e1038",
};

// Colores neutros que se ven bien en modo claro y oscuro
const GRIS = "rgba(128, 128, 128, 0.15)";
const BORDE = "rgba(128, 128, 128, 0.3)";
const MORADO = "rgba(147, 51, 234, 0.12)";

// Los colores de fondo, borde y texto los pone la pantalla con el tema (useTheme)
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  scrollContent: {
    paddingBottom: 35,
  },

  /* ENCABEZADO */
  header: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
  },

  sectionBadge: {
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: "bold",
  },

  headerSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 18,
  },

  ctaPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 20,
    shadowColor: COLORS.lavender,
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  ctaPrimaryText: {
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
    borderWidth: 1,
  },

  ctaSecondaryText: {
    fontWeight: "700",
    fontSize: 15,
  },

  /* ESTADÍSTICAS */
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 25,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  statLabel: {
    fontSize: 10,
    marginTop: 2,
  },

  /* BUSCADOR + FILTROS */
  busWrapper: {
    paddingHorizontal: 20,
    marginTop: 4,
  },

  busRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  busPill: {
    flex: 1,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 27,
    borderWidth: 1,
    paddingHorizontal: 18,
    gap: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  busInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },

  busFilterBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },

  busFilterDot: {
    position: "absolute",
    top: 12,
    right: 13,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.warning,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },

  busPanel: {
    marginTop: 14,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
  },

  busPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  busPanelTitle: {
    fontSize: 13,
    fontWeight: "700",
  },

  busClear: {
    fontSize: 12,
    fontWeight: "700",
  },

  busWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  busCategoriesTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 22,
    marginBottom: 12,
  },

  busChipsRow: {
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 22,
  },

  busChip: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1,
    gap: 8,
  },

  busChipText: {
    fontSize: 14,
    fontWeight: "600",
  },

  busChipEstado: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
  },

  /* SECCIÓN CASOS */
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  resultCount: {
    fontSize: 12,
  },

  /* TARJETAS DE CASOS */
  caseCard: {
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
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
  },

  caseThumbEmpty: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDE,
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

  dateText: {
    fontSize: 10,
    marginTop: 2,
  },

  caseTitle: {
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
    fontSize: 12,
  },

  caseFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
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
    fontSize: 12,
    fontWeight: "700",
  },

  caseExpanded: {
    marginTop: 14,
  },

  descriptionLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },

  description: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 14,
  },

  detailsText: {
    fontSize: 11,
    opacity: 0.85,
    marginTop: -6,
    marginBottom: 14,
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
    backgroundColor: GRIS,
  },

  anonBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },

  /* SEGUIMIENTO / ACCIONES DE ADMIN */
  trackingBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: MORADO,
    borderColor: "rgba(147, 51, 234, 0.25)",
  },

  trackingTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  trackingText: {
    fontSize: 12,
    lineHeight: 18,
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
    paddingVertical: 9,
    borderRadius: 9,
  },

  attendButtonText: {
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

  /* ESTADO VACÍO Y MENSAJE FINAL */
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  emptyText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },

  helpCard: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    padding: 15,
  },

  helpIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: MORADO,
  },

  helpContent: {
    flex: 1,
  },

  helpTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },

  helpText: {
    fontSize: 11,
    lineHeight: 17,
  },

  /* MODAL DE FORMULARIOS */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingBottom: 30,
    borderWidth: 1,
    maxHeight: "92%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  modalSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },

  modalScrollContent: {
    paddingBottom: 10,
  },

  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MORADO,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 16,
  },

  /* FORMULARIOS */
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
  },

  placeholderText: {
    opacity: 0.8,
  },

  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    paddingVertical: 0,
  },

  inputTextMultiline: {
    minHeight: 90,
  },

  dropdownMenu: {
    marginTop: 6,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },

  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },

  dropdownItemText: {
    fontSize: 14,
  },

  errorText: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.error,
  },

  /* EVIDENCIA VISUAL */
  evidenceBox: {
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: "bold",
  },

  evidenceCount: {
    fontSize: 13,
    fontWeight: "600",
  },

  evidenceHint: {
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
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  evidenceAddText: {
    fontSize: 11,
    fontWeight: "600",
  },

  /* REPORTE ANÓNIMO */
  anonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },

  anonIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GRIS,
  },

  anonTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },

  anonSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },

  /* BOTÓN ENVIAR */
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 16,
    marginTop: 4,
  },

  submitButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  submitNote: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 6,
  },

  /* AVISO PARA INVITADOS */
  invitadoBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  invitadoContainer: {
    padding: 24,
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    borderWidth: 1,
    alignItems: "center",
  },

  invitadoIcon: {
    marginBottom: 14,
  },

  invitadoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  invitadoSubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 22,
  },

  invitadoLoginBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  invitadoLoginText: {
    fontWeight: "bold",
    fontSize: 14,
  },

  invitadoCancelBtn: {
    paddingVertical: 11,
    width: "100%",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDE,
  },

  invitadoCancelText: {
    fontSize: 13,
    fontWeight: "600",
  },
});