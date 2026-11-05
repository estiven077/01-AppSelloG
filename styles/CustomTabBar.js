import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const MARGIN = 16;
const TAB_BAR_WIDTH = width - MARGIN * 2;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 24 : 16,
    left: MARGIN,
    right: MARGIN,
    height: 54,
    backgroundColor: "#111414",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  activeIndicator: {
    position: "absolute",
    height: 42,
    backgroundColor: "#6167de",
    borderRadius: 16,
    top: 6,
  },
  tabButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconWrapper: {
    transform: [{ scale: 1.1 }],
  },
});

// Exportamos también estas constantes por si las necesita el componente
export { width, MARGIN, TAB_BAR_WIDTH };