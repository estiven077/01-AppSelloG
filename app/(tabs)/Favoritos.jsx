import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  StatusBar,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

// Importa tu Navbar reutilizable
import Navbar from "../../components/Navbar";

// Importa los estilos externos
import { styles } from "../../styles/Favoritos";

const CATEGORIES = ["Todos", "Perros", "Gatos", "Cachorros"];

const COLORS = {
  surface: "#0F172A",
  heartIcon: "#F43F5E",
  onSurfaceVariant: "#94a3b8",
};

export default function FavoritosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [favorites, setFavorites] = useState([]);

  // Estado para el modal de detalle con toda la información real
  const [detalleMascotaModal, setDetalleMascotaModal] = useState(null);

  // Sincronizar parámetros entrantes desde el Home con la información REAL
  useEffect(() => {
    if (params?.newPet) {
      try {
        const petData = JSON.parse(params.newPet);
        setFavorites((prevFavorites) => {
          const exists = prevFavorites.find((item) => item.id === petData.id);
          if (exists) {
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
              gender: petData.gender || "Hembra",
              location: petData.location || "Popayán",
              image: petData.image,
              status: petData.status || "En Adopción",
              vaccines: petData.vaccines || "Al día (Rabia, Parvovirus)",
              medicalHistory: petData.medicalHistory || "Esterilizada, excelente salud general.",
              history: petData.history || "Es una mascota muy juguetona, cariñosa y llena de energía.",
              weight: petData.weight || "10 kg",
              isFavorite: true,
            };
            return [formattedPet, ...prevFavorites];
          }
        });
      } catch (error) {
        console.error("Error al procesar la mascota enviada:", error);
      }
    }
  }, [params?.newPet, params?.t]);

  // Alternar o remover de favoritos
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const filteredFavorites = favorites.filter((item) => {
    if (!item.isFavorite) return false;

    const matchesCategory =
      selectedCategory === "Todos" ||
      item.type.toLowerCase() === selectedCategory.toLowerCase() ||
      (selectedCategory === "Cachorros" && item.age?.toLowerCase().includes("mes"));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  function handleIniciarAdopcion(pet) {
    setDetalleMascotaModal(null);
    Alert.alert("Formulario de Adopción", `Iniciando proceso de adopción responsable para ${pet.name}.`);
  }

  const renderPetCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => setDetalleMascotaModal(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />

        <View style={styles.tagBadge}>
          <Text style={styles.tagBadgeText}>{item.type ? item.type.toUpperCase() : "PERROS"}</Text>
        </View>

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(item.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={COLORS.heartIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.petName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.vaccines && (
            <View style={styles.statusChip}>
              <Text style={styles.statusChipText} numberOfLines={1}>
                Vacunada
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.petBreed} numberOfLines={1}>
          {item.breed}
        </Text>

        <View style={styles.detailsRow}>
          <Ionicons
            name="location-outline"
            size={12}
            color={COLORS.onSurfaceVariant}
          />
          <Text style={styles.detailText} numberOfLines={1}>
            {item.age} • {item.location}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.adoptButton}
          activeOpacity={0.85}
          onPress={() => setDetalleMascotaModal(item)}
        >
          <Text style={styles.adoptButtonText}>Ver</Text>
          <Ionicons name="eye-outline" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const totalFavoritesCount = favorites.filter((f) => f.isFavorite).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
        translucent={false}
      />

      {/* NAVBAR REUTILIZABLE */}
      <Navbar unreadNotifications={2} />

      {/* HEADER */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionBadge}>TUS MASCOTAS FAVORITAS</Text>
          <Text style={styles.headerTitle}>Guardados & Adopción</Text>
        </View>

        <View style={styles.favCountBadge}>
          <Ionicons name="heart" size={14} color={COLORS.heartIcon} />
          <Text style={styles.favCountText}>{totalFavoritesCount}</Text>
        </View>
      </View>

      {/* BÚSQUEDA */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={18}
          color={COLORS.onSurfaceVariant}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar mascota, raza o ciudad..."
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

      {/* CATEGORÍAS */}
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
              {cat === "Todos" && (
                <View style={[styles.chipCounter, isSelected && styles.chipCounterActive]}>
                  <Text style={[styles.chipCounterText, isSelected && styles.chipCounterTextActive]}>
                    {favorites.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* LISTA DE FAVORITOS */}
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

      {/* ================= MODAL CON INFORMACIÓN REAL DETALLADA ================= */}
      <Modal
        visible={!!detalleMascotaModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDetalleMascotaModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            {/* Header flotante con botón atrás y corazón */}
            <View style={styles.floatingHeader}>
              <TouchableOpacity
                style={styles.iconCircleBtn}
                onPress={() => setDetalleMascotaModal(null)}
              >
                <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconCircleBtn}
                onPress={() => detalleMascotaModal && toggleFavorite(detalleMascotaModal.id)}
              >
                <Ionicons
                  name={detalleMascotaModal?.isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={COLORS.heartIcon}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 35 }}>

              {/* Imagen de la mascota superior */}
              <View style={styles.heroImageContainer}>
                {detalleMascotaModal?.image && (
                  <Image
                    source={{ uri: detalleMascotaModal.image }}
                    style={styles.heroImage}
                  />
                )}
              </View>

              {/* Contenido flotante con los datos reales */}
              <View style={styles.detailsCardBody}>

                {/* Nombre y Ubicación */}
                <View style={styles.nameLocationRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.petProfileName}>{detalleMascotaModal?.name}</Text>
                    <Text style={styles.petProfileLocation}>
                      📍 {detalleMascotaModal?.location || "Popayán"}
                    </Text>
                  </View>
                  <View style={styles.statusBadgeModal}>
                    <Text style={styles.statusBadgeModalText}>{detalleMascotaModal?.status || "En Adopción"}</Text>
                  </View>
                </View>

                {/* Tarjetas de Estadísticas (Edad, Sexo, Raza) */}
                <View style={styles.statsRow}>
                  <View style={styles.statCard}>
                    <Ionicons name="time-outline" size={16} color="#7C3AED" />
                    <Text style={styles.statCardValue}>{detalleMascotaModal?.age}</Text>
                    <Text style={styles.statCardLabel}>Edad</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="female-outline" size={16} color="#7C3AED" />
                    <Text style={styles.statCardValue}>{detalleMascotaModal?.gender}</Text>
                    <Text style={styles.statCardLabel}>Sexo</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Ionicons name="shield-checkmark-outline" size={16} color="#7C3AED" />
                    <Text style={styles.statCardValue} numberOfLines={1}>{detalleMascotaModal?.breed}</Text>
                    <Text style={styles.statCardLabel}>Raza</Text>
                  </View>
                </View>

                {/* Historial Médico y Vacunas */}
                <View style={styles.medicalBox}>
                  <View style={styles.medicalItemRow}>
                    <Ionicons name="medical" size={16} color="#38bdf8" />
                    <Text style={styles.medicalItemTitle}>Vacunas:</Text>
                    <Text style={styles.medicalItemText}>{detalleMascotaModal?.vaccines}</Text>
                  </View>
                  <View style={[styles.medicalItemRow, { marginTop: 10 }]}>
                    <Ionicons name="document-text" size={16} color="#34D399" />
                    <Text style={styles.medicalItemTitle}>Historial:</Text>
                    <Text style={styles.medicalItemText}>{detalleMascotaModal?.medicalHistory}</Text>
                  </View>
                </View>

                {/* Sección "Sobre [Nombre]" con la historia real */}
                <View style={styles.aboutSectionBox}>
                  <Text style={styles.aboutHeaderTitle}>
                    Sobre <Text style={{ color: "#7C3AED" }}>{detalleMascotaModal?.name}</Text>:
                  </Text>
                  <Text style={styles.aboutTextContent}>
                    {detalleMascotaModal?.history}
                  </Text>
                </View>

                {/* Botón de Adopción Real */}
                <TouchableOpacity
                  style={styles.adoptActionButton}
                  activeOpacity={0.85}
                  onPress={() => detalleMascotaModal && handleIniciarAdopcion(detalleMascotaModal)}
                >
                  <Text style={styles.adoptActionButtonText}>Adoptar</Text>
                  <Ionicons name="paw" size={18} color="#FFFFFF" />
                </TouchableOpacity>

              </View>
            </ScrollView>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}