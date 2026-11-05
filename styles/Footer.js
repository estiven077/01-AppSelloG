
import { StyleSheet } from "react-native";

// Los colores de fondo, texto y bordes se configuran desde Footer.jsx
// usando los colores del tema seleccionado por el usuario.
export const styles = StyleSheet.create({
  // Contenedor principal
  footer: {
    position: "relative",
    overflow: "hidden",
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
  },

  // Huellitas decorativas de fondo
  pawWrap: {
    position: "absolute",
  },
  pawTop: {
    top: 12,
    right: -12,
    transform: [{ rotate: "-25deg" }],
  },
  pawMiddle: {
    top: "45%",
    left: -18,
    transform: [{ rotate: "20deg" }],
  },
  pawBottom: {
    bottom: 25,
    right: 15,
    transform: [{ rotate: "15deg" }],
  },

  // Distribución para pantallas grandes
  gridWide: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 24,
  },

  // Distribución para móviles
  gridNarrow: {
    gap: 18,
  },
  rowNarrow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },

  // Columnas
  column: {
    flex: 1,
    minWidth: 0,
  },
  columnBrand: {
    flex: 1.3,
    minWidth: 0,
  },

  // Marca
  brandHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 4,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  brandSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    marginBottom: 7,
  },
  brandDescription: {
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 340,
  },

  // Títulos de sección y línea morada
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 7,
  },
  titleLine: {
    height: 1,
    marginBottom: 10,
    opacity: 0.65,
  },

  // Enlaces de navegación
  linkText: {
    fontSize: 13,
    marginBottom: 9,
  },

  // Información de contacto
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    marginBottom: 9,
  },
  contactText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
  },

  // Botones de redes sociales
  socialContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 9,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  // Copyright
  copyContainer: {
    marginTop: 16,
    paddingVertical: 11,
    borderTopWidth: 1,
    alignItems: "center",
  },
  copyText: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 15,
  },
});
