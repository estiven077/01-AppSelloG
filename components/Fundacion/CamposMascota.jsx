import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // npx expo install expo-image-picker
import { useTheme } from "../context/ThemeContext"; // Hook de temas (ajusta la ruta si es distinta)

import { styles } from "../styles/CamposMascota.js";

// Colores de respaldo por si tu ThemeContext no los define
const FALLBACK_COLORS = {
  success: "#22c55e",
  error: "#ef4444",
  warning: "#f39c12",
  info: "#3b82f6",
};

// Devuelve los colores del tema + los de respaldo
function useColores() {
  const { colors } = useTheme();
  return { ...FALLBACK_COLORS, ...colors };
}

const MAX_FOTO_BYTES = 4 * 1024 * 1024; // 4 MB

const ESPECIES = [
  { value: "perro", label: "Perro" },
  { value: "gato", label: "Gato" },
  { value: "ave", label: "Ave" },
  { value: "otro", label: "Otro" },
];

const TAMANOS = [
  { value: "pequeño", label: "Pequeño" },
  { value: "mediano", label: "Mediano" },
  { value: "grande", label: "Grande" },
];

const SEXOS = [
  { value: "Macho", label: "Macho" },
  { value: "Hembra", label: "Hembra" },
];

const ESTADOS_ADOPCION = [
  { value: "en_cuarentena", label: "En cuarentena" },
  { value: "disponible", label: "Disponible" },
  { value: "en_proceso", label: "En proceso" },
  { value: "adoptado", label: "Adoptado" },
];

// Valores iniciales para el useState del formulario
export const MASCOTA_INICIAL = {
  nombre: "",
  especie: "perro",
  raza: "",
  edadEstimada: "",
  tamano: "mediano",
  sexo: "Macho",
  temperamento: "",
  convivencia: "",
  estadoAdopcion: "en_cuarentena",
  estadoSalud: "",
  descripcion: "",
  fotoUrl: "",
  foto: null,
  vacunado: false,
  esterilizado: false,
  desparasitado: false,
};

// En web los campos con * usaban "required"; en móvil se valida a mano.
export function validarMascota(form) {
  const e = {};
  if (!form.nombre?.trim()) e.nombre = "Escribe el nombre";
  if (!form.raza?.trim()) e.raza = "Escribe la raza";
  if (!form.edadEstimada?.trim()) e.edadEstimada = "Escribe la edad estimada";
  if (!form.estadoSalud?.trim()) e.estadoSalud = "Describe el estado de salud";
  if (!form.descripcion?.trim()) e.descripcion = "Cuenta la historia de la mascota";
  return e;
}

/*     CAMPOS REUTILIZABLES (fuera del componente principal para que el teclado no pierda el foco)     */

function TextField({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  multiline = false,
  keyboardType = "default",
}) {
  const colors = useColores();
  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <View
        style={[
          styles.inputContainerOutline,
          { backgroundColor: colors.surface, borderColor: colors.border },
          multiline && styles.inputContainerMultiline,
          !!error && styles.inputError,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={colors.textMuted}
          style={multiline ? { marginTop: 2 } : null}
        />
        <TextInput
          style={[
            styles.inputText,
            { color: colors.textLight },
            multiline && styles.inputTextMultiline,
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? "top" : "center"}
          keyboardType={keyboardType}
        />
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function SelectField({ label, icon, value, options, onSelect, isOpen, onToggle }) {
  const colors = useColores();
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.inputContainerOutline,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Ionicons name={icon} size={20} color={colors.textMuted} />
        <Text
          style={[
            styles.selectText,
            { color: selected ? colors.textLight : colors.textMuted },
          ]}
        >
          {selected ? selected.label : "Selecciona una opción"}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={18}
          color={colors.textMuted}
        />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={[
            styles.dropdownMenu,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {options.map((item, i) => {
            const activo = item.value === value;
            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.dropdownItem,
                  { borderBottomColor: colors.border },
                  i === options.length - 1 && styles.dropdownItemLast,
                  activo && { backgroundColor: `${colors.activePurple}1A` },
                ]}
                onPress={() => onSelect(item.value)}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    { color: activo ? colors.activePurple : colors.textLight },
                    activo && styles.dropdownItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

// Etiqueta de salud que se alterna al tocarla
function EtiquetaSalud({ activo, alerta = false, iconoOn, iconoOff, textoOn, textoOff, onPress }) {
  const colors = useColores();
  const color = activo ? colors.success : alerta ? colors.warning : colors.textMuted;
  const neutral = !activo && !alerta;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: neutral ? colors.surface : `${color}1F`,
          borderColor: neutral ? colors.border : `${color}73`,
        },
      ]}
    >
      {(activo ? iconoOn : iconoOff) && (
        <Ionicons name={activo ? iconoOn : iconoOff} size={15} color={color} />
      )}
      <Text style={[styles.chipText, { color }]}>{activo ? textoOn : textoOff}</Text>
    </TouchableOpacity>
  );
}

/* ================= COMPONENTE PRINCIPAL ================= */
export default function CamposMascota({ form, setForm, errors = {} }) {
  const colors = useColores();
  const [modoUrl, setModoUrl] = useState(false);
  const [openSelect, setOpenSelect] = useState(null);

  const cambiar = (campo) => (valor) => setForm({ ...form, [campo]: valor });
  const alternar = (campo) => () => setForm({ ...form, [campo]: !form[campo] });

  const toggleSelect = (nombre) =>
    setOpenSelect((actual) => (actual === nombre ? null : nombre));

  const elegirOpcion = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
    setOpenSelect(null);
  };

  // Guarda la foto elegida (galería o cámara) con el formato que necesita un FormData
  const guardarFoto = (asset) => {
    if (asset.fileSize && asset.fileSize > MAX_FOTO_BYTES) {
      Alert.alert("Foto muy pesada", "La imagen debe pesar máximo 4 MB.");
      return;
    }
    setForm({
      ...form,
      foto: {
        uri: asset.uri,
        name: asset.fileName || `mascota-${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      },
      fotoUrl: asset.uri,
    });
  };

  const desdeGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Permite el acceso a tus fotos para adjuntar la imagen.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // si tu SDK es < 52 usa ImagePicker.MediaTypeOptions.Images
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!res.canceled) guardarFoto(res.assets[0]);
  };

  const desdeCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Permite el acceso a la cámara para tomar la foto.");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!res.canceled) guardarFoto(res.assets[0]);
  };

  const elegirFoto = () => {
    Alert.alert("Foto de la mascota", "¿Cómo quieres añadir la foto?", [
      { text: "Tomar foto", onPress: desdeCamara },
      { text: "Elegir de la galería", onPress: desdeGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const quitarFoto = () => setForm({ ...form, fotoUrl: "", foto: null });

  return (
    <View>
      <TextField
        label="Nombre *"
        icon="paw-outline"
        placeholder="Ej: Max, Luna"
        value={form.nombre}
        onChangeText={cambiar("nombre")}
        error={errors.nombre}
      />

      <SelectField
        label="Especie"
        icon="apps-outline"
        value={form.especie}
        options={ESPECIES}
        isOpen={openSelect === "especie"}
        onToggle={() => toggleSelect("especie")}
        onSelect={(v) => elegirOpcion("especie", v)}
      />

      <TextField
        label="Raza *"
        icon="ribbon-outline"
        placeholder="Ej: Criollo, Labrador"
        value={form.raza}
        onChangeText={cambiar("raza")}
        error={errors.raza}
      />

      <TextField
        label="Edad estimada *"
        icon="calendar-outline"
        placeholder="Ej: 2 años, 8 meses"
        value={form.edadEstimada}
        onChangeText={cambiar("edadEstimada")}
        error={errors.edadEstimada}
      />

      <SelectField
        label="Tamaño"
        icon="resize-outline"
        value={form.tamano}
        options={TAMANOS}
        isOpen={openSelect === "tamano"}
        onToggle={() => toggleSelect("tamano")}
        onSelect={(v) => elegirOpcion("tamano", v)}
      />

      <SelectField
        label="Sexo"
        icon="male-female-outline"
        value={form.sexo}
        options={SEXOS}
        isOpen={openSelect === "sexo"}
        onToggle={() => toggleSelect("sexo")}
        onSelect={(v) => elegirOpcion("sexo", v)}
      />

      <SelectField
        label="Estado de adopción"
        icon="home-outline"
        value={form.estadoAdopcion}
        options={ESTADOS_ADOPCION}
        isOpen={openSelect === "estadoAdopcion"}
        onToggle={() => toggleSelect("estadoAdopcion")}
        onSelect={(v) => elegirOpcion("estadoAdopcion", v)}
      />

      <TextField
        label="Temperamento"
        icon="happy-outline"
        placeholder="Ej: Juguetón, tranquilo, tímido"
        value={form.temperamento}
        onChangeText={cambiar("temperamento")}
      />

      <TextField
        label="Convivencia"
        icon="people-outline"
        placeholder="Ej: Apto con niños y otros perros"
        value={form.convivencia}
        onChangeText={cambiar("convivencia")}
      />

      {/* Foto: se sube desde el teléfono o se pega un enlace */}
      <View style={styles.group}>
        <View style={styles.photoHeader}>
          <Text style={[styles.photoHeaderLabel, { color: colors.textMuted }]}>
            Foto de la mascota
          </Text>
          <TouchableOpacity onPress={() => setModoUrl(!modoUrl)}>
            <Text style={[styles.linkText, { color: colors.activePurple }]}>
              {modoUrl ? "Subir desde el teléfono" : "Pegar URL de imagen"}
            </Text>
          </TouchableOpacity>
        </View>

        {modoUrl ? (
          <View
            style={[
              styles.inputContainerOutline,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Ionicons name="link-outline" size={20} color={colors.textMuted} />
            <TextInput
              style={[styles.inputText, { color: colors.textLight }]}
              placeholder="https://ejemplo.com/foto.jpg"
              placeholderTextColor={colors.textMuted}
              value={form.fotoUrl}
              onChangeText={(t) => setForm({ ...form, fotoUrl: t, foto: null })}
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        ) : form.fotoUrl ? (
          <View style={[styles.previewWrap, { borderColor: colors.border }]}>
            <Image
              source={{ uri: form.fotoUrl }}
              style={styles.previewImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.previewRemove} onPress={quitarFoto}>
              <Ionicons name="close" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.dropzone,
              {
                borderColor: `${colors.activePurple}80`,
                backgroundColor: `${colors.activePurple}0D`,
              },
            ]}
            activeOpacity={0.8}
            onPress={elegirFoto}
          >
            <Ionicons name="cloud-upload-outline" size={34} color={colors.activePurple} />
            <Text style={[styles.dropzoneText, { color: colors.textLight }]}>
              <Text style={[styles.dropzoneLink, { color: colors.activePurple }]}>
                Sube una foto
              </Text>{" "}
              desde tu galería o cámara
            </Text>
            <Text style={[styles.dropzoneHint, { color: colors.textMuted }]}>
              PNG, JPG o WEBP (máximo 4 MB)
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TextField
        label="Estado de salud *"
        icon="heart-outline"
        placeholder="Ej: Saludable, esquema de vacunas completo..."
        value={form.estadoSalud}
        onChangeText={cambiar("estadoSalud")}
        error={errors.estadoSalud}
      />

      <View style={styles.group}>
        <Text style={[styles.label, { color: colors.textMuted }]}>
          Etiquetas de salud (toca para alternar)
        </Text>
        <View style={styles.chipsRow}>
          <EtiquetaSalud
            activo={form.vacunado}
            alerta
            iconoOn="checkmark"
            iconoOff="warning-outline"
            textoOn="Vacunado"
            textoOff="Sin vacunas"
            onPress={alternar("vacunado")}
          />
          <EtiquetaSalud
            activo={form.esterilizado}
            iconoOn="checkmark"
            textoOn="Esterilizado"
            textoOff="Sin esterilizar"
            onPress={alternar("esterilizado")}
          />
          <EtiquetaSalud
            activo={form.desparasitado}
            alerta
            iconoOn="shield-checkmark-outline"
            iconoOff="warning-outline"
            textoOn="Desparasitado"
            textoOff="Sin desparasitar"
            onPress={alternar("desparasitado")}
          />
        </View>
      </View>

      <TextField
        label="Historia de la mascota *"
        icon="book-outline"
        placeholder="Cuenta cómo llegó al refugio, su historia y cómo es su carácter. Es lo que leerán quienes quieran adoptarlo."
        value={form.descripcion}
        onChangeText={cambiar("descripcion")}
        multiline
        error={errors.descripcion}
      />
    </View>
  );
}