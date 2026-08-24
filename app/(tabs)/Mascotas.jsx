import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Limita un valor entre un mínimo y un máximo
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// -----------------------------------------------------------------------
// Datos de ejemplo — reemplaza las imágenes con tus assets locales o URLs
// -----------------------------------------------------------------------
const ANIMALS = [
  {
    id: '1',
    name: 'Mateo',
    type: 'PERRO',
    description:
      'Un compañero leal de 3 años que adora las caminatas largas y las tardes de juego. Ideal para familias activas.',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
  },
  {
    id: '2',
    name: 'Rebeca',
    type: 'GATO',
    description:
      'Rebeca es una gatita tranquila que busca un rincón cálido y manos cariñosas para ronronear todo el día.',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
  },
  {
    id: '3',
    name: 'Jose',
    type: 'AVE',
    description:
      'Rescatado de un hábitat poco apto, Jose es un loro sociable y alegre que llenará tu hogar de colores y sonidos.',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
  },
  {
    id: '4',
    name: 'Luna',
    type: 'PERRO',
    description:
      'Pequeña en tamaño pero grande en corazón. Luna busca una familia que le enseñe que el mundo es un lugar seguro.',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
  },
  {
    id: '5',
    name: 'Ramses',
    type: 'GATO',
    description:
      'Un observador nato. Ramses es independiente y elegante, perfecto para un ambiente tranquilo y respetuoso.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800',
  },
];

const ACCENT = '#3ecf6e';
const BG = '#12140f';
const CARD_BG = '#1c2018';

function AnimalCard({ animal, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: animal.image }} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.imageGradient}
        />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.animalName}>{animal.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{animal.type}</Text>
          </View>
        </View>

        <Text style={styles.description}>{animal.description}</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => onPress?.(animal)}
        >
          <Text style={styles.buttonText}>Ver Detalles</Text>
          <Feather name="arrow-right" size={16} color="#0d1b12" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SpeciesScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // El avatar escala según el ancho de pantalla (clamp entre 30 y 40px)
  const avatarSize = clamp(width * 0.09, 30, 40);
  // Baja el header un poco extra en pantallas altas, sin pasarse en las chicas
  const headerTopOffset = clamp(insets.top * 0.15, 2, 10);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: 12 + headerTopOffset }]}>
        <TouchableOpacity onPress={() => navigation?.openDrawer?.()}>
          <Ionicons name="menu" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerTitleRow}>
          <MaterialCommunityIcons name="paw" size={18} color={ACCENT} />
          <Text style={styles.headerTitle}>Sello Guardian</Text>
        </View>

        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              marginTop: headerTopOffset,
            },
          ]}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: 40 + insets.bottom },
        ]}
      >
        <Text style={styles.pageTitle}>Encuentra Tu Amigo Fiel</Text>
        <Text style={styles.pageSubtitle}>
          Cada rescate tiene una historia, y cada historia merece un final
          feliz. Explora nuestra galería de compañeros que buscan un hogar
          lleno de amor.
        </Text>

        {ANIMALS.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onPress={(a) => navigation?.navigate?.('AnimalDetail', { id: a.id })}
          />
        ))}
      </ScrollView>

      {/* Floating action button */}
      <TouchableOpacity
        style={[styles.fab, { bottom: 24 + insets.bottom }]}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#0d1b12" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  avatar: {
    borderWidth: 1,
    borderColor: ACCENT,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
    marginTop: 8,
    lineHeight: 32,
  },
  pageSubtitle: {
    color: '#a9b3a3',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
  },
  imageWrapper: {
    width: '100%',
    height: 170,
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
    height: 60,
  },
  cardBody: {
    padding: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  animalName: {
    color: ACCENT,
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: 'rgba(62,207,110,0.12)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    color: '#8fd6a3',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  description: {
    color: '#c3cabe',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 14,
  },
  button: {
    backgroundColor: ACCENT,
    borderRadius: 24,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#0d1b12',
    fontWeight: '700',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});
