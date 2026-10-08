import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Componente Navbar reutilizable
import Navbar from '../../components/Navbar';

// Paleta del proyecto - Material 3
const COLORS = {
  primary: '#7C3AED',
  primaryContainer: '#7C3AED',
  onPrimaryContainer: '#FFFFFF',
  surface: '#0F172A',
  surfaceContainer: 'rgba(15, 23, 42, 0.75)',
  surfaceContainerHigh: '#0F172A',
  onSurface: '#FFFFFF',
  onSurfaceVariant: '#C4B5FD',
  cardBg: 'rgba(15, 23, 42, 0.75)',
  cardBorder: 'rgba(255, 255, 255, 0.12)',
  error: '#E11D48',
  success: '#10B981',
};

// Base de datos de mascotas
const PETS_DATABASE = [
  {
    id: '1',
    name: 'Mateo',
    type: 'PERRO',
    breed: 'Golden Retriever',
    ageGroup: 'Adulto',
    age: '3 años',
    size: 'Grande',
    gender: 'Macho',
    location: 'Popayán, Cauca',
    status: 'En Adopción',
    vaccines: 'Al día (Rabia, Parvovirus, Sextuple)',
    medicalHistory: 'Esterilizado, desparasitado y en perfecta salud física.',
    description:
      'Un compañero leal que adora las caminatas largas y las tardes de juego. Ideal para familias activas.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
  },
  {
    id: '2',
    name: 'Rebeca',
    type: 'GATO',
    breed: 'Mestizo Felino',
    ageGroup: 'Joven',
    age: '1 año',
    size: 'Pequeño',
    gender: 'Hembra',
    location: 'Popayán, Cauca',
    status: 'Urgente',
    vaccines: 'Triple Felina y Rabia completas',
    medicalHistory: 'Esterilizada. Negativa a leucemia e inmunodeficiencia felina.',
    description:
      'Tranquila y ronroneadora. Busca un rincón cálido, ventanas para mirar aves y manos cariñosas.',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
  },
  {
    id: '3',
    name: 'Jose',
    type: 'AVE',
    breed: 'Loro Guacamayo',
    ageGroup: 'Adulto',
    age: '4 años',
    size: 'Mediano',
    gender: 'Macho',
    location: 'Popayán, Cauca',
    status: 'En Adopción',
    vaccines: 'Chequeo aviar completo',
    medicalHistory: 'Plumaje saludable, dieta equilibrada a base de semillas y frutas.',
    description:
      'Rescatado de cautiverio no apto. Es sociable, inteligente y llenará tu hogar de colores y sonidos.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
  },
  {
    id: '4',
    name: 'Luna',
    type: 'PERRO',
    breed: 'Labrador Mestizo',
    ageGroup: 'Cachorro',
    age: '5 meses',
    size: 'Mediano',
    gender: 'Hembra',
    location: 'Popayán, Cauca',
    status: 'Nuevo',
    vaccines: 'Primera y segunda dosis de cachorro',
    medicalHistory: 'Desparasitada recientemente, proceso de vacunación en marcha.',
    description:
      'Pequeña en tamaño pero grande en corazón. Luna busca una familia amorosa que le enseñe el mundo.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
  },
  {
    id: '5',
    name: 'Ramses',
    type: 'GATO',
    breed: 'Siamés',
    ageGroup: 'Adulto',
    age: '2 años',
    size: 'Mediano',
    gender: 'Macho',
    location: 'Popayán, Cauca',
    status: 'En Adopción',
    vaccines: 'Al día',
    medicalHistory: 'Esterilizado, microchip de identificación instalado.',
    description:
      'Un observador nato. Ramsés es independiente y elegante, perfecto para un hogar tranquilo y respetuoso.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800',
  },
];

const CATEGORIES = ['TODOS', 'PERRO', 'GATO', 'AVE'];
const SIZES = ['Todos', 'Pequeño', 'Mediano', 'Grande'];
const AGES = ['Todos', 'Cachorro', 'Joven', 'Adulto'];
const GENDERS = ['Todos', 'Macho', 'Hembra'];

export default function MascotasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Estados de Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TODOS');
  const [selectedSize, setSelectedSize] = useState('Todos');
  const [selectedAge, setSelectedAge] = useState('Todos');
  const [selectedGender, setSelectedGender] = useState('Todos');

  // Estados del Menú Desplegable de Filtros
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(null);

  // Estado del Modal
  const [selectedPet, setSelectedPet] = useState(null);

  // Lógica de filtrado en tiempo real
  const filteredPets = useMemo(() => {
    return PETS_DATABASE.filter((pet) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        pet.name.toLowerCase().includes(q) ||
        pet.breed.toLowerCase().includes(q) ||
        pet.age.toLowerCase().includes(q) ||
        pet.type.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === 'TODOS' || pet.type === selectedCategory;

      const matchesSize =
        selectedSize === 'Todos' || pet.size === selectedSize;

      const matchesAge =
        selectedAge === 'Todos' || pet.ageGroup === selectedAge;

      const matchesGender =
        selectedGender === 'Todos' || pet.gender === selectedGender;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesSize &&
        matchesAge &&
        matchesGender
      );
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedAge, selectedGender]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('TODOS');
    setSelectedSize('Todos');
    setSelectedAge('Todos');
    setSelectedGender('Todos');
    setActiveSubFilter(null);
    setIsFiltersOpen(false);
  };

  const toggleSubFilter = (filterType) => {
    setActiveSubFilter((prev) => (prev === filterType ? null : filterType));
  };

  const activeFiltersCount = [
    selectedSize !== 'Todos',
    selectedAge !== 'Todos',
    selectedGender !== 'Todos',
  ].filter(Boolean).length;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* NAVBAR REUTILIZABLE */}
      <Navbar unreadNotifications={2} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 80 + insets.bottom },
        ]}
      >
        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por raza, nombre o edad..."
            placeholderTextColor={COLORS.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={COLORS.onSurfaceVariant}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* TABS DE CATEGORÍAS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryTab,
                  isActive && styles.categoryTabActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    isActive && styles.categoryTabTextActive,
                  ]}
                >
                  {cat === 'TODOS' ? '🐾 Todos' : cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* MÓDULO DE FILTROS DESPLEGABLE */}
        <View style={styles.dropdownSection}>
          <TouchableOpacity
            style={styles.dropdownHeader}
            activeOpacity={0.8}
            onPress={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <View style={styles.dropdownHeaderLeft}>
              <Ionicons name="options-outline" size={18} color={COLORS.primary} />
              <Text style={styles.dropdownHeaderText}>Filtros Avanzados</Text>
              {activeFiltersCount > 0 && (
                <View style={styles.activeBadge}>
                  <Text style={styles.activeBadgeText}>{activeFiltersCount}</Text>
                </View>
              )}
            </View>
            <Ionicons
              name={isFiltersOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.onSurfaceVariant}
            />
          </TouchableOpacity>

          {isFiltersOpen && (
            <View style={styles.dropdownContent}>
              {/* Opción Tamaño */}
              <TouchableOpacity
                style={[
                  styles.subFilterHeader,
                  activeSubFilter === 'size' && styles.subFilterHeaderActive,
                ]}
                onPress={() => toggleSubFilter('size')}
              >
                <Text style={styles.subFilterTitle}>
                  Tamaño {selectedSize !== 'Todos' ? `(${selectedSize})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'size' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={COLORS.onSurfaceVariant}
                />
              </TouchableOpacity>
              {activeSubFilter === 'size' && (
                <View style={styles.optionsContainer}>
                  {SIZES.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.chipOption,
                        selectedSize === size && styles.chipOptionActive,
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          selectedSize === size && styles.chipOptionTextActive,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Opción Edad */}
              <TouchableOpacity
                style={[
                  styles.subFilterHeader,
                  activeSubFilter === 'age' && styles.subFilterHeaderActive,
                ]}
                onPress={() => toggleSubFilter('age')}
              >
                <Text style={styles.subFilterTitle}>
                  Edad {selectedAge !== 'Todos' ? `(${selectedAge})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'age' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={COLORS.onSurfaceVariant}
                />
              </TouchableOpacity>
              {activeSubFilter === 'age' && (
                <View style={styles.optionsContainer}>
                  {AGES.map((age) => (
                    <TouchableOpacity
                      key={age}
                      style={[
                        styles.chipOption,
                        selectedAge === age && styles.chipOptionActive,
                      ]}
                      onPress={() => setSelectedAge(age)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          selectedAge === age && styles.chipOptionTextActive,
                        ]}
                      >
                        {age}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Opción Género */}
              <TouchableOpacity
                style={[
                  styles.subFilterHeader,
                  activeSubFilter === 'gender' && styles.subFilterHeaderActive,
                ]}
                onPress={() => toggleSubFilter('gender')}
              >
                <Text style={styles.subFilterTitle}>
                  Género {selectedGender !== 'Todos' ? `(${selectedGender})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'gender' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={COLORS.onSurfaceVariant}
                />
              </TouchableOpacity>
              {activeSubFilter === 'gender' && (
                <View style={styles.optionsContainer}>
                  {GENDERS.map((gen) => (
                    <TouchableOpacity
                      key={gen}
                      style={[
                        styles.chipOption,
                        selectedGender === gen && styles.chipOptionActive,
                      ]}
                      onPress={() => setSelectedGender(gen)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          selectedGender === gen && styles.chipOptionTextActive,
                        ]}
                      >
                        {gen}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        {/* ENCABEZADO DE RESULTADOS */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            Mascotas encontradas ({filteredPets.length})
          </Text>
          {(selectedCategory !== 'TODOS' ||
            selectedSize !== 'Todos' ||
            selectedAge !== 'Todos' ||
            selectedGender !== 'Todos' ||
            searchQuery !== '') && (
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetFiltersText}>Limpiar filtros</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LISTADO DE TARJETAS */}
        {filteredPets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="paw-off"
              size={48}
              color={COLORS.onSurfaceVariant}
            />
            <Text style={styles.emptyTitle}>No hay coincidencias</Text>
            <Text style={styles.emptySub}>
              Prueba cambiando la raza, la edad o limpiando los filtros seleccionados.
            </Text>
            <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
              <Text style={styles.resetBtnText}>Restablecer búsqueda</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredPets.map((pet) => (
            <View key={pet.id} style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: pet.image }} style={styles.image} />
                <LinearGradient
                  colors={['transparent', 'rgba(15,23,42,0.9)']}
                  style={styles.imageGradient}
                />
                <View style={styles.badgeTop}>
                  <Text style={styles.badgeTopText}>{pet.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={styles.animalName}>{pet.name}</Text>
                    <Text style={styles.animalBreed}>{pet.breed}</Text>
                  </View>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>{pet.type}</Text>
                  </View>
                </View>

                <View style={styles.specsRow}>
                  <View style={styles.specItem}>
                    <Ionicons name="time-outline" size={13} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.specText}>{pet.age}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="resize-outline" size={13} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.specText}>{pet.size}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="transgender-outline" size={13} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.specText}>{pet.gender}</Text>
                  </View>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {pet.description}
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.85}
                  onPress={() => setSelectedPet(pet)}
                >
                  <Text style={styles.buttonText}>Ver Ficha Completa</Text>
                  <Feather name="arrow-right" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* MODAL DETALLES */}
      <Modal
        visible={!!selectedPet}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedPet(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalHeaderTitle} numberOfLines={1}>
                  {selectedPet?.name}
                </Text>
                <Text style={styles.modalHeaderSubtitle}>
                  📍 {selectedPet?.location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedPet(null)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Raza:</Text>
                  <Text style={styles.infoValue}>{selectedPet?.breed}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Edad / Etapa:</Text>
                  <Text style={styles.infoValue}>
                    {selectedPet?.age} ({selectedPet?.ageGroup})
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tamaño / Sexo:</Text>
                  <Text style={styles.infoValue}>
                    {selectedPet?.size} • {selectedPet?.gender}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: COLORS.primary }]}>
                    {selectedPet?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: selectedPet?.image }}
                style={styles.modalImage}
              />
            </View>

            <View style={styles.healthContainer}>
              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>💉 Vacunas y Esquema:</Text>
                <Text style={styles.healthText}>{selectedPet?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={styles.healthLabel}>📋 Historial Clínico:</Text>
                <Text style={styles.healthText}>
                  {selectedPet?.medicalHistory}
                </Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={styles.historyLabel}>Sobre {selectedPet?.name}:</Text>
              <Text style={styles.historyText}>{selectedPet?.description}</Text>
            </View>

            <TouchableOpacity
              style={styles.modalAdoptButton}
              activeOpacity={0.85}
              onPress={() => {
                const pet = selectedPet;
                setSelectedPet(null);
                router.push({
                  pathname: '/drawer/Index',
                  params: { petId: pet?.id },
                });
              }}
            >
              <Text style={styles.modalAdoptButtonText}>Iniciar Adopción</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalActionButton}
              activeOpacity={0.85}
              onPress={() => setSelectedPet(null)}
            >
              <Text style={styles.modalActionButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* BUSCADOR */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
  },

  /* CATEGORÍAS */
  categoriesScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTabText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },

  /* FILTROS DESPLEGABLES */
  dropdownSection: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
    overflow: 'hidden',
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  dropdownHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropdownHeaderText: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: '700',
  },
  activeBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dropdownContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    gap: 8,
    paddingTop: 10,
  },
  subFilterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  subFilterHeaderActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  subFilterTitle: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  chipOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipOptionActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipOptionText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  chipOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* RESULTADOS */
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsCount: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  resetFiltersText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  /* SIN RESULTADOS */
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySub: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resetBtn: {
    marginTop: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* TARJETAS DE ANIMALES */
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  imageWrapper: {
    width: '100%',
    height: 160,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  badgeTop: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeTopText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  animalName: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  animalBreed: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  typeBadge: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
  },
  typeBadgeText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    fontWeight: 'bold',
  },
  specsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  description: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* MODAL DETALLES */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingBottom: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.onSurface,
  },
  modalHeaderSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  modalInfoContainer: {
    flex: 1,
    gap: 5,
  },
  infoRow: {
    flexDirection: 'column',
  },
  infoLabel: {
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 12,
    color: COLORS.onSurface,
    fontWeight: '500',
  },
  modalImage: {
    width: 105,
    height: 115,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  healthContainer: {
    marginTop: 10,
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  healthItem: {
    flexDirection: 'column',
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.onSurfaceVariant,
  },
  healthText: {
    fontSize: 11,
    color: COLORS.onSurface,
    marginTop: 1,
  },
  historyContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  historyLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  historyText: {
    fontSize: 11,
    color: COLORS.onSurface,
    lineHeight: 16,
  },
  modalAdoptButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  modalAdoptButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  modalActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalActionButtonText: {
    color: COLORS.onSurfaceVariant,
    fontWeight: 'bold',
    fontSize: 13,
  },
});