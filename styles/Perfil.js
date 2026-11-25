import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    navbar: {
        flexDirection: "row",
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        justifyContent: "space-between",
        alignItems: "center",
    },
    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    brandTitle: {
        fontSize: 18,
        fontWeight: "900",
        letterSpacing: 0.5,
    },
    navActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    navButton: {
        padding: 4,
        position: "relative",
    },
    notificationDot: {
        position: "absolute",
        top: 4,
        right: 4,
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: "#FF6B6B",
    },
    scrollContent: {
        paddingBottom: 30,
    },

    // PERFIL
    profileSection: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 20,
    },
    profilePhotoWrapper: {
        marginBottom: 12,
    },
    mainProfilePhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
    },
    mainDefaultPhoto: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    heroSubtitle: {
        fontSize: 13,
        marginTop: 2,
        marginBottom: 6,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    locationText: {
        fontSize: 12,
        marginLeft: 4,
    },
    profileDescription: {
        fontSize: 13,
        textAlign: "center",
        lineHeight: 18,
        marginBottom: 16,
        paddingHorizontal: 10,
    },
    editProfileButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        paddingHorizontal: 18,
        borderRadius: 10,
    },
    editProfileText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 13,
        marginLeft: 6,
    },

    // ESTADÍSTICAS
    statsRowContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 14,
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 10,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        height: 28,
    },

    // TABS
    tabsContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
        gap: 6,
    },
    tabText: {
        fontSize: 12,
    },

    // SECCIONES / CARDS
    sectionContainer: {
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
    card: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 10,
    },
    cardContent: {
        padding: 14,
    },
    cardHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    itemIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "bold",
    },
    cardDetail: {
        fontSize: 12,
    },
    itemLocation: {
        fontSize: 12,
        marginTop: 2,
    },
    emptyContainer: {
        alignItems: "center",
        paddingVertical: 35,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 4,
    },
    emptyText: {
        fontSize: 13,
        textAlign: "center",
        fontStyle: "italic",
    },

    // FORMULARIO DE EDICIÓN
    editContainer: {
        paddingHorizontal: 16,
        paddingTop: 18,
    },
    photoSection: {
        alignItems: "center",
        marginBottom: 18,
    },
    photoContainer: {
        position: "relative",
    },
    profilePhoto: {
        width: 95,
        height: 95,
        borderRadius: 47.5,
        borderWidth: 2,
    },
    defaultPhoto: {
        width: 95,
        height: 95,
        borderRadius: 47.5,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    cameraButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
    photoButtons: {
        flexDirection: "row",
        marginTop: 12,
        gap: 10,
    },
    changePhotoButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
    },
    photoButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 5,
    },
    deletePhotoButton: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
    },
    deletePhotoText: {
        color: "#FF6B6B",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 5,
    },
    inputGroup: {
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 6,
    },
    searchWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },
    textAreaWrap: {
        height: "auto",
        paddingVertical: 10,
        alignItems: "flex-start",
    },
    textArea: {
        minHeight: 70,
    },
    primaryButton: {
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 16,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    cancelButton: {
        alignItems: "center",
        paddingVertical: 12,
    },
    cancelButtonText: {
        fontSize: 13,
    },

    // MODALES
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalContainer: {
        width: "100%",
        borderRadius: 20,
        borderWidth: 1,
        padding: 18,
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14,
        borderBottomWidth: 1,
        paddingBottom: 8,
    },
    modalHeaderTitle: {
        fontSize: 17,
        fontWeight: "bold",
    },
    modalHeaderSubtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    closeButton: {
        padding: 4,
        borderRadius: 12,
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    notificationIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    infoValue: {
        fontSize: 13,
        fontWeight: "bold",
    },
});

export default styles;
