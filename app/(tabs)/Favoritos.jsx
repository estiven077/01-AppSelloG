import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Importa tu Navbar reutilizable tal como en el Home
import Navbar from "../../components/Navbar";

const COLORS = {
  surface: "#0F172A",
  cardBg: "rgba(15, 23, 42, 0.75)",
  cardBorder: "rgba(255, 255, 255, 0.12)",
  primary: "#7C3AED",
  primaryContainer: "#7C3AED",
  onPrimaryContainer: "#FFFFFF",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#C4B5FD",
  heartBg: "rgba(225, 29, 72, 0.2)",
  heartIcon: "#F43F5E",
  chipInactive: "#1E293B",
};

const CATEGORIES = ["Todos", "Perros", "Gatos", "Otros"];

export default function FavoritosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Lista de mascotas favoritas (Inicia vacía)
  const [favorites, setFavorites] = useState([]);

  // Escuchar parámetros entrantes desde el Home (incluyendo el parámetro de refresco params?.t)
  useEffect(() => {
    if (params?.newPet) {
      try {
        const petData = JSON.parse(params.newPet);
        setFavorites((prevFavorites) => {
          const exists = prevFavorites.find((item) => item.id === petData.id);
          if (exists) {
            // Si la mascota ya estaba registrada en la lista pero se había desmarcado, la vuelve a activar
            return prevFavorites.map((item) =>
              item.id === petData.id ? { ...item, isFavorite: true } : item
            );
          } else {
            const formattedPet = {
              id: petData.id,
              name: petData.name,
              type: petData.type || "Perros",
              breed: petData.breed || "Mestizo",
              age: petData.age || "2 años",
              location: petData.location || "Popayán",
              image: petData.image,
              isFavorite: true,
            };
            return [formattedPet, ...prevFavorites];
          }
        });
      } catch (error) {
        console.error("Error al procesar la mascota enviada:", error);
      }
    }
  }, [params?.newPet, params?.t]); // Se añade params?.t como dependencia para detectar re-agregaciones

  // Alternar o remover de favoritos
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Filtrado: SOLO MUESTRA LAS MASCOTAS CON isFavorite: true
  const filteredFavorites = favorites.filter((item) => {
    if (!item.isFavorite) return false;

    const matchesCategory =
      selectedCategory === "Todos" || item.type === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderPetCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/DetalleMascota?id=${item.id}`)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        {/* Badge de Categoría */}
        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{item.type}</Text>
        </View>

        {/* Botón de Corazón flotante */}
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={18}
            color={
              item.isFavorite ? COLORS.heartIcon : COLORS.onSurfaceVariant
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.petName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.petBreed} numberOfLines={1}>
            {item.breed}
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons
              name="gift-outline"
              size={12}
              color={COLORS.onSurfaceVariant}
            />
            <Text style={styles.detailText}>{item.age}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons
              name="location-outline"
              size={12}
              color={COLORS.onSurfaceVariant}
            />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
        translucent={false}
      />

      {/* NAVBAR REUTILIZABLE */}
      <Navbar unreadNotifications={2} />

      {/* HEADER DE LA SECCIÓN FAVORITOS CON EL BADGE EN LA ESQUINA */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionBadge}>TUS MASCOTAS FAVORITAS</Text>
          <Text style={styles.headerTitle}>Guardados</Text>
        </View>

        {/* Badge con el conteo de favoritos llevado hacia la esquina */}
        <View style={styles.favCountBadge}>
          <Ionicons name="heart" size={16} color={COLORS.heartIcon} />
          <Text style={styles.favCountText}>
            {favorites.filter((f) => f.isFavorite).length}
          </Text>
        </View>
      </View>

      {/* BARRA DE BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={COLORS.onSurfaceVariant}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar mascota o raza..."
          placeholderTextColor={COLORS.onSurfaceVariant}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={18}
              color={COLORS.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* CHIPS DE CATEGORÍAS */}
      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                isSelected && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <View style={styles.contentArea}>
        {filteredFavorites.length > 0 ? (
          <FlatList
            data={filteredFavorites}
            keyExtractor={(item) => item.id}
            renderItem={renderPetCard}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="paw-outline"
              size={54}
              color={COLORS.onSurfaceVariant}
            />
            <Text style={styles.emptyTitle}>No tienes mascotas guardadas</Text>
            <Text style={styles.emptyDescription}>
              Agrega tus mascotas favoritas haciendo clic en el corazón desde la sección de adopción.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionBadge: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 22,
    fontWeight: "bold",
  },
  favCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.heartBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  favCountText: {
    color: COLORS.onSurface,
    fontWeight: "700",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 13, 21, 0.6)",
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 14,
    height: 44,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 8,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.chipInactive,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primaryContainer,
    borderColor: COLORS.primaryContainer,
  },
  categoryText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryTextActive: {
    color: COLORS.onPrimaryContainer,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    width: "48%",
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 120,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  tagBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagBadgeText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 10,
    fontWeight: "bold",
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    padding: 10,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  petName: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: "bold",
    flex: 1,
  },
  petBreed: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginLeft: 4,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  emptyTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  emptyDescription: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
});