import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  group: {
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputContainerOutline: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  inputContainerMultiline: {
    alignItems: "flex-start",
    paddingTop: 14,
    paddingBottom: 8,
    minHeight: 120,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    paddingVertical: 0,
  },
  inputTextMultiline: {
    minHeight: 100,
  },
  selectText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  errorText: {
    marginTop: 5,
    marginLeft: 4,
    fontSize: 12,
    color: "#ef4444",
  },

  /* Desplegable */
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
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  dropdownItemText: {
    fontSize: 14,
  },
  dropdownItemTextActive: {
    fontWeight: "600",
  },

  /* Foto */
  photoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  photoHeaderLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  linkText: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  dropzone: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
  },
  dropzoneText: {
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },
  dropzoneLink: {
    fontWeight: "700",
  },
  dropzoneHint: {
    marginTop: 4,
    fontSize: 11,
  },
  previewWrap: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },
  previewImage: {
    width: "100%",
    height: 200,
  },
  previewRemove: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },

  /* Etiquetas de salud */
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
});