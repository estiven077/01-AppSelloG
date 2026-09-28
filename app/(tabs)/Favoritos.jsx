import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COLORS = {
  background: "#0F172A",
  surface: "rgba(30, 41, 59, 0.7)",  
  activePurple: "#7C3AED",
  accent: "#C4B5FD",
  starYellow: "#F59E0B",
  textLight: "#F8FAFC",
  textMuted: "#94A3B8",
  border: "rgba(124, 58, 237, 0.2)",
};

export default function FavoritosScreen() {
  const router = useRouter();

  // Ejemplo de estado con mascotas guardadas
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Luna",
      type: "Perro",
      breed: "Mestizo",
      age: "2 años",
      location: "Popayán",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400",
    },
    {
      id: "2",
      name: "Oliver",
      type: "Gato",
      breed: "Criollo",
      age: "1 año",
      location: "Popayán",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400",
    },
  ]);

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const renderFavoriteCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push(`/DetalleMascota?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.petName}>{item.name}</Text>
          {/* Logo / Botón de estrella de favorito */}
          <TouchableOpacity
            onPress={() => removeFavorite(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="star" size={22} color={COLORS.starYellow} />
          </TouchableOpacity>
        </View>

        <Text style={styles.petBreed}>
          {item.type} • {item.breed}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.infoBadge}>
            <Ionicons name="time-outline" size={14} color={COLORS.accent} />
            <Text style={styles.badgeText}>{item.age}</Text>
          </View>

          <View style={styles.infoBadge}>
            <Ionicons name="location-outline" size={14} color={COLORS.accent} />
            <Text style={styles.badgeText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      {/* ENCABEZADO CON LOGO DE ESTRELLA */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textLight} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Ionicons
            name="star"
            size={22}
            color={COLORS.starYellow}
            style={styles.headerStarIcon}
          />
          <Text style={styles.title}>Mis Favoritos</Text>
        </View>
      </View>

      {/* LISTA DE FAVORITOS O ESTADO VACÍO */}
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="star-outline" size={60} color={COLORS.accent} />
          </View>
          <Text style={styles.emptyTitle}>Sin guardados aún</Text>
          <Text style={styles.emptyDescription}>
            Explora el catálogo de adopción y presiona el ícono de estrella para
            guardar a tus mascotas favoritas.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  backButton: {
    marginRight: 15,
    padding: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerStarIcon: {
    marginRight: 8,
  },
  title: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    overflow: "hidden",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  petName: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: "700",
  },
  petBreed: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  cardFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    color: COLORS.accent,
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(124, 58, 237, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyDescription: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});