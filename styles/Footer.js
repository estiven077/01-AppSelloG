import { StyleSheet } from "react-native";

export const COLORS = {
  surface: "#1E1A18", // Tono oscuro contrastante
  onSurface: "#FFFFFF",
  muted: "#A0AEC0", 
  primary: "#7C3AED", 
};

export const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 24,
    width: "100%",
    marginTop: 35, // ESPACIADO PARA QUE NO SE VEA PEGADO
    borderTopWidth: 2,
    borderTopColor: "rgba(210, 204, 220, 0.4)", // Línea superior llamativa
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  followSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.12)",
    marginBottom: 20,
  },
  followTitle: {
    color: COLORS.onSurface,
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 1,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 10,
  },
  socialButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  column: {
    width: "48%",
  },
  columnTitle: {
    color: COLORS.onSurface,
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 12,
    letterSpacing: 0.8,
  },
  columnTextBold: {
    color: COLORS.onSurface,
    fontWeight: "bold",
    fontSize: 12,
  },
  columnText: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  linkText: {
    color: COLORS.muted,
    fontSize: 12,
    marginBottom: 8,
  },
  copyContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    paddingTop: 16,
    alignItems: "center",
  },
  copyText: {
    color: COLORS.muted,
    fontSize: 11,
    textAlign: "center",
  },
});