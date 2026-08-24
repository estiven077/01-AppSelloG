import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Limita un valor entre un mínimo y un máximo
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// -----------------------------------------------------------------------
// Paleta — mismos tokens Material 3 que las demás pantallas
// -----------------------------------------------------------------------
const COLORS = {
  primary: '#61de8a',
  primaryContainer: '#27ae60',
  onPrimaryContainer: '#00391a',
  surface: '#111414',
  surfaceContainer: '#1d2020',
  onSurface: '#e1e3e2',
  onSurfaceVariant: '#bccabc',
  cardBg: 'rgba(255, 255, 255, 0.06)',
  cardBorder: 'rgba(255, 255, 255, 0.14)',
  inputBg: 'rgba(17, 20, 20, 0.6)',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
};

const MAX_EVIDENCE_FILES = 5;

const REPORT_TYPES = [
  { id: 'abuso', icon: 'healing', label: 'Abuso Físico' },
  { id: 'abandono', icon: 'home-work', label: 'Abandono' },
  { id: 'venta', icon: 'storefront', label: 'Venta Ilegal' },
  { id: 'otro', icon: 'more-horiz', label: 'Otra Situación de Riesgo', wide: true },
];

export default function ReportScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const avatarSize = clamp(width * 0.09, 32, 40);

  const [reportType, setReportType] = useState('abuso');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleUseGPS() {
    // TODO: cuando se pueda instalar `expo-location`, reemplazar este aviso
    // por la obtención real de coordenadas + reverse geocoding.
    Alert.alert(
      'GPS no disponible todavía',
      'Por ahora escribe la dirección manualmente en el buscador. Cuando instalemos expo-location, este botón la completará automáticamente.'
    );
  }

  function handlePickEvidence() {
    // TODO: cuando se pueda instalar `expo-image-picker`, reemplazar este
    // aviso por la selección real de fotos/videos de la galería.
    Alert.alert(
      'Carga de archivos no disponible todavía',
      'Esta función se activará cuando instalemos expo-image-picker. Por ahora puedes describir la evidencia en el campo de texto de arriba.'
    );
  }

  function resetForm() {
    setReportType('abuso');
    setLocation('');
    setDescription('');
    setEvidence([]);
  }

  function handleSubmit() {
    if (!reportType) {
      Alert.alert('Falta el tipo de situación', 'Selecciona qué tipo de denuncia quieres realizar.');
      return;
    }
    if (!location.trim() && !description.trim()) {
      Alert.alert(
        'Falta información',
        'Agrega al menos la ubicación o una descripción para poder verificar tu denuncia.'
      );
      return;
    }

    setIsSubmitting(true);

    // TODO: reemplazar por el POST real cuando exista backend
    // (Laravel de Sello Guardian). Por ahora simula el envío.
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Denuncia enviada',
        'Gracias por reportar. Nuestro equipo revisará la información lo antes posible.',
        [{ text: 'Entendido', onPress: resetForm }]
      );
    }, 900);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.openDrawer?.()}>
          <Ionicons name="menu" size={26} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sello Guardian</Text>

        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            borderWidth: 1,
            borderColor: COLORS.cardBorder,
          }}
        />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 + insets.bottom }]}
        >
          <Text style={styles.pageTitle}>Realizar Denuncia</Text>
          <Text style={styles.pageSubtitle}>
            Su reporte puede salvar una vida. Complete el formulario con la
            mayor precisión posible.
          </Text>

          {/* Card educativa */}
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <MaterialIcons name="security" size={22} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoTitle}>Denuncia Segura y Anónima</Text>
                <Text style={styles.infoText}>
                  Toda la información proporcionada es estrictamente
                  confidencial. Nuestro equipo de rescate verificará los datos
                  antes de intervenir para asegurar la seguridad de los
                  animales y la suya.
                </Text>
              </View>
            </View>
          </View>

          {/* 1. Tipo de situación */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="warning" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>1. Tipo de Situación</Text>
            </View>

            <View style={styles.typeGrid}>
              {REPORT_TYPES.map((type) => {
                const selected = reportType === type.id;
                return (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeOption,
                      type.wide && styles.typeOptionWide,
                      selected && styles.typeOptionSelected,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => setReportType(type.id)}
                  >
                    <MaterialIcons
                      name={type.icon}
                      size={22}
                      color={selected ? COLORS.primary : COLORS.onSurfaceVariant}
                    />
                    <Text style={styles.typeLabel}>{type.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 2. Ubicación */}
          <View style={styles.card}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeader}>
                <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>2. Ubicación Exacta</Text>
              </View>

              <TouchableOpacity
                style={styles.gpsButton}
                onPress={handleUseGPS}
                activeOpacity={0.75}
              >
                <MaterialIcons name="my-location" size={14} color={COLORS.primary} />
                <Text style={styles.gpsButtonText}>Usar GPS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchInputWrap}>
              <MaterialIcons
                name="search"
                size={18}
                color={COLORS.onSurfaceVariant}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar dirección o punto de referencia..."
                placeholderTextColor={COLORS.onSurfaceVariant}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {location ? (
              <View style={styles.locationPreview}>
                <MaterialIcons name="place" size={18} color={COLORS.primary} />
                <Text style={styles.locationPreviewText} numberOfLines={2}>
                  {location}
                </Text>
              </View>
            ) : null}
          </View>

          {/* 3. Descripción */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="description" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>3. Detalles Adicionales</Text>
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="Describa el estado del animal, número de animales involucrados, personas responsables (si las conoce) o cualquier detalle relevante..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* 4. Evidencia */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="photo-camera" size={20} color={COLORS.primary} />
              <Text style={styles.sectionTitle}>4. Evidencia (Opcional)</Text>
            </View>

            <TouchableOpacity
              style={styles.uploadBox}
              activeOpacity={0.8}
              onPress={handlePickEvidence}
            >
              <View style={styles.uploadIconWrap}>
                <MaterialIcons name="upload-file" size={28} color={COLORS.onSurface} />
              </View>
              <Text style={styles.uploadTitle}>Toque para subir fotos o videos</Text>
              <Text style={styles.uploadHint}>
                Máx {MAX_EVIDENCE_FILES} archivos. JPG, PNG o MP4.
              </Text>
            </TouchableOpacity>
          </View>

          {/* Enviar */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <MaterialIcons name="send" size={18} color={COLORS.onPrimaryContainer} />
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Enviando…' : 'Enviar Denuncia'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Al enviar, confirma que la información proporcionada es veraz.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  pageTitle: {
    color: COLORS.onSurface,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  pageSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 14,
  },
  infoIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    width: '31%',
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  typeOptionWide: {
    width: '100%',
  },
  typeOptionSelected: {
    borderColor: COLORS.primaryContainer,
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
  },
  typeLabel: {
    color: COLORS.onSurface,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  gpsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gpsButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  searchInputWrap: {
    height: 48,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  searchInput: {
    height: 48,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    paddingLeft: 42,
    paddingRight: 14,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  locationPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  locationPreviewText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    flex: 1,
  },
  textArea: {
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    padding: 14,
    color: COLORS.onSurface,
    fontSize: 14,
    minHeight: 100,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  uploadHint: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
  },
  submitButton: {
    height: 48,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 14,
    fontWeight: '700',
  },
  disclaimer: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
  },
});