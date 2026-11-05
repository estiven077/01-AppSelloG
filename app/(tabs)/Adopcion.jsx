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
import { useTheme } from '../../context/ThemeContext'; // 1. Importamos el hook global del tema

// Componente Navbar reutilizable
import Navbar from '../../components/Navbar';

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
  const { theme, colors } = useTheme(); // 2. Extraemos theme y colors globales

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
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
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.textLight }]}
            placeholder="Buscar por raza, nombre o edad..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons
                name="close-circle"
                size={18}
                color={colors.textMuted}
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
                  { backgroundColor: colors.surface, borderColor: colors.border },
                  isActive && { backgroundColor: colors.activePurple, borderColor: colors.activePurple },
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryTabText,
                    { color: colors.textMuted },
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
        <View style={[styles.dropdownSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            style={styles.dropdownHeader}
            activeOpacity={0.8}
            onPress={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <View style={styles.dropdownHeaderLeft}>
              <Ionicons name="options-outline" size={18} color={colors.activePurple} />
              <Text style={[styles.dropdownHeaderText, { color: colors.textLight }]}>Filtros Avanzados</Text>
              {activeFiltersCount > 0 && (
                <View style={[styles.activeBadge, { backgroundColor: colors.activePurple }]}>
                  <Text style={styles.activeBadgeText}>{activeFiltersCount}</Text>
                </View>
              )}
            </View>
            <Ionicons
              name={isFiltersOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          {isFiltersOpen && (
            <View style={[styles.dropdownContent, { borderTopColor: colors.border }]}>
              {/* Opción Tamaño */}
              <TouchableOpacity
                style={[
                  styles.subFilterHeader,
                  { backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', borderColor: colors.border },
                  activeSubFilter === 'size' && { borderColor: colors.activePurple, backgroundColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(147, 51, 234, 0.1)' },
                ]}
                onPress={() => toggleSubFilter('size')}
              >
                <Text style={[styles.subFilterTitle, { color: colors.textLight }]}>
                  Tamaño {selectedSize !== 'Todos' ? `(${selectedSize})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'size' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {activeSubFilter === 'size' && (
                <View style={styles.optionsContainer}>
                  {SIZES.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.chipOption,
                        { backgroundColor: colors.background, borderColor: colors.border },
                        selectedSize === size && { backgroundColor: colors.activePurple, borderColor: colors.activePurple },
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          { color: colors.textMuted },
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
                  { backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', borderColor: colors.border },
                  activeSubFilter === 'age' && { borderColor: colors.activePurple, backgroundColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(147, 51, 234, 0.1)' },
                ]}
                onPress={() => toggleSubFilter('age')}
              >
                <Text style={[styles.subFilterTitle, { color: colors.textLight }]}>
                  Edad {selectedAge !== 'Todos' ? `(${selectedAge})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'age' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {activeSubFilter === 'age' && (
                <View style={styles.optionsContainer}>
                  {AGES.map((age) => (
                    <TouchableOpacity
                      key={age}
                      style={[
                        styles.chipOption,
                        { backgroundColor: colors.background, borderColor: colors.border },
                        selectedAge === age && { backgroundColor: colors.activePurple, borderColor: colors.activePurple },
                      ]}
                      onPress={() => setSelectedAge(age)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          { color: colors.textMuted },
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
                  { backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)', borderColor: colors.border },
                  activeSubFilter === 'gender' && { borderColor: colors.activePurple, backgroundColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(147, 51, 234, 0.1)' },
                ]}
                onPress={() => toggleSubFilter('gender')}
              >
                <Text style={[styles.subFilterTitle, { color: colors.textLight }]}>
                  Género {selectedGender !== 'Todos' ? `(${selectedGender})` : ''}
                </Text>
                <Ionicons
                  name={activeSubFilter === 'gender' ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
              {activeSubFilter === 'gender' && (
                <View style={styles.optionsContainer}>
                  {GENDERS.map((gen) => (
                    <TouchableOpacity
                      key={gen}
                      style={[
                        styles.chipOption,
                        { backgroundColor: colors.background, borderColor: colors.border },
                        selectedGender === gen && { backgroundColor: colors.activePurple, borderColor: colors.activePurple },
                      ]}
                      onPress={() => setSelectedGender(gen)}
                    >
                      <Text
                        style={[
                          styles.chipOptionText,
                          { color: colors.textMuted },
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
          <Text style={[styles.resultsCount, { color: colors.textMuted }]}>
            Mascotas encontradas ({filteredPets.length})
          </Text>
          {(selectedCategory !== 'TODOS' ||
            selectedSize !== 'Todos' ||
            selectedAge !== 'Todos' ||
            selectedGender !== 'Todos' ||
            searchQuery !== '') && (
            <TouchableOpacity onPress={resetFilters}>
              <Text style={[styles.resetFiltersText, { color: colors.activePurple }]}>Limpiar filtros</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LISTADO DE TARJETAS */}
        {filteredPets.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="paw-off"
              size={48}
              color={colors.textMuted}
            />
            <Text style={[styles.emptyTitle, { color: colors.textLight }]}>No hay coincidencias</Text>
            <Text style={[styles.emptySub, { color: colors.textMuted }]}>
              Prueba cambiando la raza, la edad o limpiando los filtros seleccionados.
            </Text>
            <TouchableOpacity style={[styles.resetBtn, { backgroundColor: colors.activePurple }]} onPress={resetFilters}>
              <Text style={styles.resetBtnText}>Restablecer búsqueda</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredPets.map((pet) => (
            <View key={pet.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: pet.image }} style={styles.image} />
                <LinearGradient
                  colors={['transparent', theme === 'dark' ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.9)']}
                  style={styles.imageGradient}
                />
                <View style={[styles.badgeTop, { backgroundColor: colors.activePurple }]}>
                  <Text style={styles.badgeTopText}>{pet.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHeaderRow}>
                  <View>
                    <Text style={[styles.animalName, { color: colors.textLight }]}>{pet.name}</Text>
                    <Text style={[styles.animalBreed, { color: colors.activePurple }]}>{pet.breed}</Text>
                  </View>
                  <View style={[styles.typeBadge, { backgroundColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(147, 51, 234, 0.1)', borderColor: theme === 'dark' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(147, 51, 234, 0.2)' }]}>
                    <Text style={[styles.typeBadgeText, { color: colors.textMuted }]}>{pet.type}</Text>
                  </View>
                </View>

                <View style={styles.specsRow}>
                  <View style={styles.specItem}>
                    <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                    <Text style={[styles.specText, { color: colors.textMuted }]}>{pet.age}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="resize-outline" size={13} color={colors.textMuted} />
                    <Text style={[styles.specText, { color: colors.textMuted }]}>{pet.size}</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Ionicons name="transgender-outline" size={13} color={colors.textMuted} />
                    <Text style={[styles.specText, { color: colors.textMuted }]}>{pet.gender}</Text>
                  </View>
                </View>

                <Text style={[styles.description, { color: colors.textMuted }]} numberOfLines={2}>
                  {pet.description}
                </Text>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.activePurple }]}
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
          <View style={[styles.modalContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.modalHeaderTitle, { color: colors.textLight }]} numberOfLines={1}>
                  {selectedPet?.name}
                </Text>
                <Text style={[styles.modalHeaderSubtitle, { color: colors.textMuted }]}>
                  📍 {selectedPet?.location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedPet(null)}
                style={[styles.closeButton, { backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)' }]}
              >
                <Ionicons name="close" size={20} color={colors.textLight} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalTopRow}>
              <View style={styles.modalInfoContainer}>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Raza:</Text>
                  <Text style={[styles.infoValue, { color: colors.textLight }]}>{selectedPet?.breed}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Edad / Etapa:</Text>
                  <Text style={[styles.infoValue, { color: colors.textLight }]}>
                    {selectedPet?.age} ({selectedPet?.ageGroup})
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Tamaño / Sexo:</Text>
                  <Text style={[styles.infoValue, { color: colors.textLight }]}>
                    {selectedPet?.size} • {selectedPet?.gender}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Estado:</Text>
                  <Text style={[styles.infoValue, { color: colors.activePurple }]}>
                    {selectedPet?.status}
                  </Text>
                </View>
              </View>

              <Image
                source={{ uri: selectedPet?.image }}
                style={[styles.modalImage, { borderColor: colors.activePurple }]}
              />
            </View>

            <View style={[styles.healthContainer, { backgroundColor: theme === 'dark' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.03)', borderColor: colors.border }]}>
              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: colors.textMuted }]}>💉 Vacunas y Esquema:</Text>
                <Text style={[styles.healthText, { color: colors.textLight }]}>{selectedPet?.vaccines}</Text>
              </View>

              <View style={styles.healthItem}>
                <Text style={[styles.healthLabel, { color: colors.textMuted }]}>📋 Historial Clínico:</Text>
                <Text style={[styles.healthText, { color: colors.textLight }]}>
                  {selectedPet?.medicalHistory}
                </Text>
              </View>
            </View>

            <View style={styles.historyContainer}>
              <Text style={[styles.historyLabel, { color: colors.activePurple }]}>Sobre {selectedPet?.name}:</Text>
              <Text style={[styles.historyText, { color: colors.textLight }]}>{selectedPet?.description}</Text>
            </View>

            <TouchableOpacity
              style={[styles.modalAdoptButton, { backgroundColor: colors.activePurple }]}
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
              style={[styles.modalActionButton, { borderColor: colors.border }]}
              activeOpacity={0.85}
              onPress={() => setSelectedPet(null)}
            >
              <Text style={[styles.modalActionButtonText, { color: colors.textMuted }]}>Cerrar</Text>
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
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* BUSCADOR */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
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
    borderWidth: 1,
    marginRight: 8,
  },
  categoryTabText: {
    fontSize: 12,
    fontWeight: '700',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },

  /* FILTROS DESPLEGABLES */
  dropdownSection: {
    borderRadius: 14,
    borderWidth: 1,
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
    fontSize: 13,
    fontWeight: '700',
  },
  activeBadge: {
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
    gap: 8,
    paddingTop: 10,
  },
  subFilterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  subFilterTitle: {
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
    borderWidth: 1,
  },
  chipOptionText: {
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
    fontSize: 12,
    fontWeight: '600',
  },
  resetFiltersText: {
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  resetBtn: {
    marginTop: 12,
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
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  animalBreed: {
    fontSize: 12,
    fontWeight: '600',
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  typeBadgeText: {
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
    fontSize: 11,
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 14,
  },
  button: {
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
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '500',
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
    flexDirection: 'column',
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  historyText: {
    fontSize: 11,
    lineHeight: 16,
  },
  modalAdoptButton: {
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
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalActionButtonText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});