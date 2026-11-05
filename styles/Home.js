import { StyleSheet, Platform, Dimensions, StatusBar } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    heroBackground: {
        width: "100%",
    },
    heroOverlay: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 28,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: "bold",
        lineHeight: 32,
    },
    heroSubtitle: {
        fontSize: 14,
        marginVertical: 14,
        lineHeight: 20,
    },
    primaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignSelf: "flex-start",
        marginBottom: 25,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15,
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        paddingTop: 16,
    },
    statItem: {
        flex: 1,
        alignItems: "flex-start",
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 10,
    },
    sosContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(239, 68, 68, 0.08)",
        borderWidth: 1,
        borderColor: "rgba(239, 68, 68, 0.3)",
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    sosLeftContent: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 10,
    },
    sosIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(239, 68, 68, 0.15)",
        justifyContent: "center",
        alignItems: "center",
    },
    sosBadgeTitle: {
        color: "#ef4444",
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 0.5,
    },
    sosSubtitleText: {
        fontSize: 12,
        fontWeight: "600",
        marginTop: 2,
    },
    sosButton: {
        backgroundColor: "#ef4444",
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    sosButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
    },
    sectionContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    sectionBadge: {
        fontSize: 11,
        fontWeight: "bold",
        letterSpacing: 1,
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    sectionSubtitle: {
        fontSize: 13,
        marginBottom: 16,
        marginTop: 2,
    },
    cardsScroll: {
        flexDirection: "row",
        paddingBottom: 10,
    },
    searchWrap: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 44,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },
    emptyText: {
        fontSize: 13,
        fontStyle: "italic",
    },
    card: {
        width: Math.min(260, SCREEN_WIDTH * 0.72),
        borderWidth: 1,
        borderRadius: 16,
        marginRight: 16,
        overflow: "hidden",
    },
    cardImage: {
        height: 130,
        width: "100%",
    },
    tagGroup: {
        flexDirection: "row",
        padding: 8,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        marginRight: 6,
        alignSelf: "flex-start",
        marginTop: 8,
        marginLeft: 8,
    },
    tagText: {
        color: "#ffffff",
        fontSize: 9,
        fontWeight: "bold",
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    cardDetail: {
        fontSize: 12,
        marginBottom: 12,
    },
    cardButton: {
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    cardButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
    },
    petCard: {
        width: Math.min(210, SCREEN_WIDTH * 0.58),
        borderRadius: 16,
        marginRight: 16,
        overflow: "hidden",
        borderWidth: 1,
    },
    petCardTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 8,
    },
    favButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
        marginRight: 4,
    },
    petName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    petInfo: {
        fontSize: 11,
        marginVertical: 4,
    },
    adoptButton: {
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 8,
    },
    adoptButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 12,
    },
    seeMorePetsButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 18,
        gap: 8,
    },
    seeMorePetsButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
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
        marginBottom: 12,
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
    modalTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 12,
    },
    modalInfoContainer: {
        flex: 1,
        gap: 5,
    },
    infoRow: {
        flexDirection: "column",
    },
    infoLabel: {
        fontSize: 10,
        fontWeight: "bold",
    },
    infoValue: {
        fontSize: 12,
        fontWeight: "500",
    },
    modalImage: {
        width: 105,
        height: 115,
        borderRadius: 12,
        borderWidth: 1,
    },
    healthContainer: {
        marginTop: 10,
        gap: 6,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    healthItem: {
        flexDirection: "column",
    },
    healthLabel: {
        fontSize: 11,
        fontWeight: "bold",
    },
    healthText: {
        fontSize: 11,
        marginTop: 1,
    },
    historyContainer: {
        marginTop: 10,
        marginBottom: 16,
    },
    historyLabel: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 2,
    },
    historyText: {
        fontSize: 11,
        lineHeight: 16,
    },
    modalAdoptButton: {
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 8,
    },
    modalAdoptButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 13,
    },
    modalActionButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    modalActionButtonText: {
        fontWeight: "bold",
        fontSize: 13,
    },
});