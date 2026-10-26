import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  Modal,
  Switch,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker"; // npx expo install expo-image-picker
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router"; // IMPORTANTE: Para la navegacion
import { useAuth } from "../../context/AuthContext"; // IMPORTANTE: Cambia la ruta segun tu proyecto


import Navbar from "../../components/Navbar";
import { styles } from "../../styles/Reportes.js";

const COLORS = {
  primary: "#a855f7",
  primaryContainer: "#9333ea",
  onPrimaryContainer: "#ffffff",
  surface: "#111414",
  surfaceContainer: "#1d2020",
  onSurface: "#e1e3e2",
  onSurfaceVariant: "#d1ddd1",
  cardBg: "rgba(255, 255, 255, 0.06)",
  cardBorder: "rgba(255, 255, 255, 0.14)",
  error: "#ef4444",
  warning: "#f39c12",
  info: "#3b82f6",
  success: "#22c55e",
  lavender: "#a78bfa", // botones y acentos del prototipo
  onLavender: "#1e1038", // texto sobre lavender
};

const STORAGE_KEY = "@sello_guardian_reportes";

const TIPOS_DENUNCIA = [
  { value: "abuso", label: "Abuso físico" },
  { value: "abandono", label: "Abandono" },
  { value: "venta", label: "Venta ilegal" },
  { value: "otro", label: "Otra situación de riesgo" },
];

const TIPOS_REPORTE = [
  { value: "perdido", label: "Animal perdido" },
  { value: "encontrado", label: "Animal encontrado" },
  { value: "herido", label: "Animal herido o enfermo" },
  { value: "otro", label: "Otro" },
];

const ANIMALES = [
  { value: "Perro", label: "Perro" },
  { value: "Gato", label: "Gato" },
  { value: "Ave", label: "Ave" },
  { value: "Otro", label: "Otro" },
];

const URGENCIAS = [
  { value: "Baja", label: "Baja" },
  { value: "Media", label: "Media" },
  { value: "Alta", label: "Alta (riesgo inmediato)" },
];

const ESTADOS = [
  "Recibido",
  "En revision",
  "En atencion",
  "Atendido",
];

const labelDe = (opciones, valor) =>
  opciones.find((o) => o.value === valor)?.label || valor;

const normalizar = (valor) =>
  String(valor ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/*     CAMPOS REUTILIZABLES     */

function SelectField({
  icon,
  placeholder,
  value,
  options,
  onSelect,
  isOpen,
  onToggle,
  error,
}) {
  const selected = options.find((o) => o.value === value);

  return (
    <View style={styles.group}>
      <TouchableOpacity
        style={[
          styles.inputContainerOutline,
          !!error && styles.inputError,
        ]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Ionicons name={icon} size={20} color={COLORS.onSurfaceVariant} />
        <Text style={[styles.selectText, !selected && styles.placeholderText]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={18}
          color={COLORS.onSurfaceVariant}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          {options.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.dropdownItem}
              onPress={() => onSelect(item.value)}
            >
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function TextField({
  icon,
  placeholder,
  value,
  onChangeText,
  error,
  multiline = false,
  keyboardType = "default",
}) {
  return (
    <View style={styles.group}>
      <View
        style={[
          styles.inputContainerOutline,
          multiline && styles.inputContainerMultiline,
          !!error && styles.inputError,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.onSurfaceVariant}
          style={multiline ? { marginTop: 6 } : null}
        />
        <TextInput
          style={[styles.inputText, multiline && styles.inputTextMultiline]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.onSurfaceVariant}
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

/*     EVIDENCIA VISUAL (mínimo 2 fotos)     */

const MIN_FOTOS = 2;
const MAX_FOTOS = 5;
const ERROR_FOTOS = `Agrega mínimo ${MIN_FOTOS} fotos como evidencia`;

function EvidenciaPicker({ fotos, onChange, error }) {
  const quitar = (uri) => onChange(fotos.filter((f) => f !== uri));

  const desdeGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Permite el acceso a tus fotos para adjuntar evidencia.");
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // si tu SDK es < 52 usa ImagePicker.MediaTypeOptions.Images
      allowsMultipleSelection: true,
      selectionLimit: MAX_FOTOS - fotos.length,
      quality: 0.7,
    });
    if (!res.canceled) {
      onChange([...fotos, ...res.assets.map((a) => a.uri)].slice(0, MAX_FOTOS));
    }
  };

  const desdeCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert("Permiso necesario", "Permite el acceso a la cámara para tomar la foto.");
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });
    if (!res.canceled) {
      onChange([...fotos, res.assets[0].uri].slice(0, MAX_FOTOS));
    }
  };

  const agregar = () => {
    if (fotos.length >= MAX_FOTOS) {
      Alert.alert("Límite alcanzado", `Puedes adjuntar máximo ${MAX_FOTOS} fotos.`);
      return;
    }
    Alert.alert("Agregar evidencia", "¿Cómo quieres añadir la foto?", [
      { text: "Tomar foto", onPress: desdeCamara },
      { text: "Elegir de la galería", onPress: desdeGaleria },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  const completo = fotos.length >= MIN_FOTOS;

  return (
    <View style={styles.group}>
      <View style={[styles.evidenceBox, !!error && styles.evidenceBoxError]}>
        <View style={styles.evidenceHeader}>
          <View style={styles.evidenceTitleRow}>
            <Ionicons name="camera-outline" size={20} color={COLORS.success} />
            <Text style={styles.evidenceTitle}>Evidencia visual *</Text>
          </View>
          <Text
            style={[
              styles.evidenceCount,
              completo && { color: COLORS.success },
            ]}
          >
            {fotos.length} de {MAX_FOTOS} fotos
          </Text>
        </View>
        <Text style={styles.evidenceHint}>
          Mínimo {MIN_FOTOS} fotos, máximo {MAX_FOTOS}.
        </Text>

        <View style={styles.evidenceRow}>
          {fotos.map((uri) => (
            <View key={uri} style={styles.evidenceThumbWrap}>
              <Image source={{ uri }} style={styles.evidenceThumb} />
              <TouchableOpacity
                style={styles.evidenceRemove}
                onPress={() => quitar(uri)}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons name="close" size={13} color="#ffffff" />
              </TouchableOpacity>
            </View>
          ))}

          {fotos.length < MAX_FOTOS && (
            <TouchableOpacity style={styles.evidenceAdd} activeOpacity={0.8} onPress={agregar}>
              <Ionicons name="camera-outline" size={22} color={COLORS.onSurfaceVariant} />
              <Text style={styles.evidenceAddText}>Agregar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

/*     SWITCH DE REPORTE ANÓNIMO     */

function AnonimoToggle({ value, onChange }) {
  return (
    <View style={styles.anonRow}>
      <View style={styles.anonIconWrap}>
        <Ionicons name="eye-off-outline" size={20} color={COLORS.onSurfaceVariant} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.anonTitle}>Reporte anónimo</Text>
        <Text style={styles.anonSubtitle}>Tu identidad estará protegida ante terceros</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "rgba(255,255,255,0.18)", true: COLORS.primaryContainer }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

/*     BOTÓN DE ENVÍO (estilo prototipo)     */

function BotonEnviar({ texto, onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.submitButton} activeOpacity={0.85} onPress={onPress}>
        <Ionicons name="send-outline" size={19} color={COLORS.onLavender} />
        <Text style={styles.submitButtonText}>{texto}</Text>
      </TouchableOpacity>
      <Text style={styles.submitNote}>
        Al enviar, se alertará de inmediato a la red de rescatistas y cuadrilla de bienestar animal
        en Popayán.
      </Text>
    </>
  );
}

/*     FORMULARIO DE DENUNCIA     */

function DenunciaForm({ onSubmit, onInvitado }) {
  const [form, setForm] = useState({
    tipo: "",
    otraSituacion: "",
    animal: "",
    cantidad: "",
    urgencia: "",
    zona: "",
    referencia: "",
    descripcion: "",
    fotos: [],
  });
  const [errors, setErrors] = useState({});
  const [openSelect, setOpenSelect] = useState(null);

  const setField = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrors((prev) => ({ ...prev, [campo]: undefined }));
  };

  const toggle = (nombre) =>
    setOpenSelect((actual) => (actual === nombre ? null : nombre));

  const elegir = (campo, valor) => {
    setField(campo, valor);
    setOpenSelect(null);
  };

  function validar() {
    const e = {};
    if (!form.tipo) e.tipo = "Selecciona el tipo de situación";
    if (form.tipo === "otro" && !form.otraSituacion.trim())
      e.otraSituacion = "Indica cuál es la situación";
    if (!form.animal) e.animal = "Selecciona el animal";
    if (form.cantidad && !/^\d+$/.test(form.cantidad.trim()))
      e.cantidad = "Escribe solo números";
    if (!form.urgencia) e.urgencia = "Selecciona la urgencia";
    if (!form.zona.trim()) e.zona = "Escribe la zona, barrio o dirección";
    if (!form.descripcion.trim()) e.descripcion = "Describe lo que ocurre";
    if (form.fotos.length < MIN_FOTOS) e.fotos = ERROR_FOTOS;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function enviar() {
    if (onInvitado()) return; // INTERCEPTOR: Si es invitado cancela el envio

    if (!validar()) return;

    const detalles = [`Urgencia: ${form.urgencia}`];
    if (form.cantidad.trim()) detalles.push(`Cantidad: ${form.cantidad.trim()}`);
    if (form.referencia.trim())
      detalles.push(`Referencia: ${form.referencia.trim()}`);

    onSubmit({
      categoria: "denuncia",
      tipo: form.tipo,
      tipoLabel:
        form.tipo === "otro"
          ? form.otraSituacion.trim()
          : labelDe(TIPOS_DENUNCIA, form.tipo),
      animal: form.animal,
      zona: form.zona.trim(),
      descripcion: form.descripcion.trim(),
      detalles,
      fotos: form.fotos,
    });
  }

  return (
    <View style={styles.formGroup}>
      <SelectField
        icon="alert-circle-outline"
        placeholder="Tipo de situación *"
        value={form.tipo}
        options={TIPOS_DENUNCIA}
        isOpen={openSelect === "tipo"}
        onToggle={() => toggle("tipo")}
        onSelect={(v) => elegir("tipo", v)}
        error={errors.tipo}
      />

      {form.tipo === "otro" && (
        <TextField
          icon="create-outline"
          placeholder="¿Cual es la situacion? *"
          value={form.otraSituacion}
          onChangeText={(t) => setField("otraSituacion", t)}
          error={errors.otraSituacion}
        />
      )}

      <SelectField
        icon="paw-outline"
        placeholder="Animal *"
        value={form.animal}
        options={ANIMALES}
        isOpen={openSelect === "animal"}
        onToggle={() => toggle("animal")}
        onSelect={(v) => elegir("animal", v)}
        error={errors.animal}
      />

      <TextField
        icon="layers-outline"
        placeholder="Cantidad de animales afectados (opcional)"
        value={form.cantidad}
        onChangeText={(t) => setField("cantidad", t)}
        keyboardType="numeric"
        error={errors.cantidad}
      />

      <SelectField
        icon="speedometer-outline"
        placeholder="Nivel de urgencia *"
        value={form.urgencia}
        options={URGENCIAS}
        isOpen={openSelect === "urgencia"}
        onToggle={() => toggle("urgencia")}
        onSelect={(v) => elegir("urgencia", v)}
        error={errors.urgencia}
      />

      <TextField
        icon="location-outline"
        placeholder="Zona / ciudad / barrio / direccion *"
        value={form.zona}
        onChangeText={(t) => setField("zona", t)}
        error={errors.zona}
      />

      <TextField
        icon="navigate-outline"
        placeholder="Punto de referencia (opcional)"
        value={form.referencia}
        onChangeText={(t) => setField("referencia", t)}
      />

      <TextField
        icon="document-text-outline"
        placeholder="Describe que esta ocurriendo y el estado del animal *"
        value={form.descripcion}
        onChangeText={(t) => setField("descripcion", t)}
        multiline
        error={errors.descripcion}
      />

      <EvidenciaPicker
        fotos={form.fotos}
        onChange={(f) => setField("fotos", f)}
        error={errors.fotos}
      />

      <BotonEnviar texto="Enviar Denuncia y Notificar" onPress={enviar} />
    </View>
  );
}

/*       FORMULARIO DE REPORTE      */

function ReporteForm({ onSubmit, onInvitado }) {
  const [form, setForm] = useState({
    tipo: "",
    otro: "",
    animal: "",
    nombreAnimal: "",
    zona: "",
    descripcion: "",
    contacto: "",
    fotos: [],
    anonimo: false,
  });
  const [errors, setErrors] = useState({});
  const [openSelect, setOpenSelect] = useState(null);

  const setField = (campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrors((prev) => ({ ...prev, [campo]: undefined }));
  };

  const toggle = (nombre) =>
    setOpenSelect((actual) => (actual === nombre ? null : nombre));

  const elegir = (campo, valor) => {
    setField(campo, valor);
    setOpenSelect(null);
  };

  function validar() {
    const e = {};
    if (!form.tipo) e.tipo = "Selecciona el tipo de reporte";
    if (form.tipo === "otro" && !form.otro.trim())
      e.otro = "Indica de qué trata el reporte";
    if (!form.animal) e.animal = "Selecciona el animal";
    if (!form.zona.trim()) e.zona = "Escribe la zona, barrio o dirección";
    if (!form.descripcion.trim()) e.descripcion = "Describe el caso";
    if (!form.contacto.trim()) e.contacto = "Escribe un teléfono de contacto";
    else if (form.contacto.replace(/\D/g, "").length < 7)
      e.contacto = "Escribe un teléfono válido";
    if (form.fotos.length < MIN_FOTOS) e.fotos = ERROR_FOTOS;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function enviar() {
    if (onInvitado()) return;

    if (!validar()) return;

    const detalles = [`Contacto: ${form.contacto.trim()}`];
    if (form.nombreAnimal.trim())
      detalles.unshift(`Nombre: ${form.nombreAnimal.trim()}`);

    onSubmit({
      categoria: "reporte",
      tipo: form.tipo,
      tipoLabel:
        form.tipo === "otro"
          ? form.otro.trim()
          : labelDe(TIPOS_REPORTE, form.tipo),
      animal: form.animal,
      zona: form.zona.trim(),
      descripcion: form.descripcion.trim(),
      detalles,
      fotos: form.fotos,
      anonimo: form.anonimo,
    });
  }

  return (
    <View style={styles.formGroup}>
      <SelectField
        icon="flag-outline"
        placeholder="Tipo de reporte *"
        value={form.tipo}
        options={TIPOS_REPORTE}
        isOpen={openSelect === "tipo"}
        onToggle={() => toggle("tipo")}
        onSelect={(v) => elegir("tipo", v)}
        error={errors.tipo}
      />

      {form.tipo === "otro" && (
        <TextField
          icon="create-outline"
          placeholder="¿De qué trata el reporte? *"
          value={form.otro}
          onChangeText={(t) => setField("otro", t)}
          error={errors.otro}
        />
      )}

      <SelectField
        icon="paw-outline"
        placeholder="Animal *"
        value={form.animal}
        options={ANIMALES}
        isOpen={openSelect === "animal"}
        onToggle={() => toggle("animal")}
        onSelect={(v) => elegir("animal", v)}
        error={errors.animal}
      />

      <TextField
        icon="pricetag-outline"
        placeholder="Nombre del animal (si lo conoces)"
        value={form.nombreAnimal}
        onChangeText={(t) => setField("nombreAnimal", t)}
      />

      <TextField
        icon="location-outline"
        placeholder="Zona / ciudad / barrio / dirección *"
        value={form.zona}
        onChangeText={(t) => setField("zona", t)}
        error={errors.zona}
      />

      <TextField
        icon="document-text-outline"
        placeholder="Descripción (color, tamaño, señas particulares...) *"
        value={form.descripcion}
        onChangeText={(t) => setField("descripcion", t)}
        multiline
        error={errors.descripcion}
      />

      <TextField
        icon="call-outline"
        placeholder="Teléfono de contacto *"
        value={form.contacto}
        onChangeText={(t) => setField("contacto", t)}
        keyboardType="phone-pad"
        error={errors.contacto}
      />

      <EvidenciaPicker
        fotos={form.fotos}
        onChange={(f) => setField("fotos", f)}
        error={errors.fotos}
      />

      <AnonimoToggle
        value={form.anonimo}
        onChange={(v) => setField("anonimo", v)}
      />

      <BotonEnviar texto="Enviar Reporte y Notificar" onPress={enviar} />
    </View>
  );
}

/* ================= PANTALLA PRINCIPAL ================= */
export default function ReportesScreen() {

  const { user } = useAuth(); // Trae el usuario logueado
  const router = useRouter(); // Llama al enrutador
  const [mostrarModalInvitado, setMostrarModalInvitado] = useState(false); // Controla el aviso visual

  const esAdmin = user?.role === "admin" || user?.role === "fundacion";
  const usuarioId = user?.id || null;

  const [reportes, setReportes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [modalMode, setModalMode] = useState(null);
  const [expandidoId, setExpandidoId] = useState(null);

  useEffect(() => {
    cargarReportes();
  }, []);

  const verificarInvitado = () => {
    if (!user) {
      setMostrarModalInvitado(true);
      return true;
    }
    return false;
  };

  async function cargarReportes() {
    try {
      const datos = await AsyncStorage.getItem(STORAGE_KEY);
      if (datos !== null) {
        const registros = JSON.parse(datos);
        setReportes(Array.isArray(registros) ? registros : []);
      }
    } catch (error) {
      console.log("Error cargando reportes:", error);
      Alert.alert("Error", "No fue posible cargar los registros.");
    }
  }

  async function guardarReportes(nuevosReportes) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosReportes));
      setReportes(nuevosReportes);
      return true;
    } catch (error) {
      console.log("Error guardando reportes:", error);
      Alert.alert("Error", "No fue posible guardar los registros.");
      return false;
    }
  }


  async function agregarRegistro(datos) {
    const nuevo = {
      id: `${Date.now()}`,
      creadorId: usuarioId ?? "usuario-local",
      estado: "Recibido",
      fecha: new Date().toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      ...datos,
    };

    const guardado = await guardarReportes([nuevo, ...reportes]);

    if (!guardado) return;

    setModalMode(null);

    Alert.alert(
      datos.categoria === "denuncia"
        ? "Denuncia registrada"
        : "Reporte registrado",
      "Tu caso se guardó correctamente y puedes consultar su estado."
    );
  }


  async function cambiarEstado(id, nuevoEstado) {
    if (!esAdmin) {
      Alert.alert("Acceso restringido", "Solo el administrador puede actualizar el estado.");
      return;
    }

    const nuevosReportes = reportes.map((r) =>
      r.id === id
        ? {
          ...r,
          estado: nuevoEstado,
          actualizadoEn: new Date().toISOString(),
        }
        : r
    );

    await guardarReportes(nuevosReportes);
  }

  function seleccionarEstado(r) {
    Alert.alert("Actualizar estado", "Selecciona el estado del caso:", [
      ...ESTADOS.map((estado) => ({
        text: estado,
        onPress: () => cambiarEstado(r.id, estado),
      })),
      { text: "Cancelar", style: "cancel" },
    ]);
  }

  function confirmarEliminar(id) {
    if (!esAdmin) return;

    Alert.alert("Eliminar registro", "¿Seguro que quieres eliminar este caso?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await guardarReportes(reportes.filter((r) => r.id !== id));
        },
      },
    ]);
  }

  const categoriaDe = (r) => r.categoria || "denuncia";

  // Filtra por propietario antes de mostrar los resultados.
  const misReportes = reportes.filter(
    (r) => esAdmin || (usuarioId != null && String(r.creadorId) === String(usuarioId))
  );

  const totalDenuncias = misReportes.filter(
    (r) => categoriaDe(r) === "denuncia"
  ).length;
  const totalReportesSolo = misReportes.filter(
    (r) => categoriaDe(r) === "reporte"
  ).length;
  const totalAtendidos = misReportes.filter(
    (r) => r.estado === "Atendido"
  ).length;

  const reportesFiltrados = misReportes.filter((r) => {
    const texto = normalizar(busqueda);
    const camposBusqueda = [
      r.animal,
      r.zona,
      r.descripcion,
      r.tipoLabel,
      r.fecha,
      r.estado,
      ...(Array.isArray(r.detalles) ? r.detalles : []),
    ];

    const coincideBusqueda =
      !texto || camposBusqueda.some((campo) => normalizar(campo).includes(texto));

    const coincideEstado = filtro === "Todos" || r.estado === filtro;
    const coincideCategoria =
      filtroCategoria === "Todas" || categoriaDe(r) === filtroCategoria;

    return coincideBusqueda && coincideEstado && coincideCategoria;
  });

  const colorEstado = (estado) => {
    const e = normalizar(estado);
    if (e === "atendido") return COLORS.success;
    if (e === "en atencion") return COLORS.warning;
    if (e === "en revision") return COLORS.info;
    return COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.surface} />
      <Navbar unreadNotifications={0} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.sectionBadge}>
            {esAdmin ? "PANEL DE GESTIÓN" : "SEGUIMIENTO COMUNITARIO"}
          </Text>
          <Text style={styles.headerTitle}>
            {esAdmin ? "Reportes y Denuncias" : "Mis reportes y denuncias"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {esAdmin
              ? "Consulta los casos registrados y actualiza su estado de atención."
              : "Ayúdanos a proteger a los animales. Aquí puedes informar sobre situaciones de riesgo, abandono, maltrato o animales que necesiten ayuda."}
          </Text>

          <TouchableOpacity
            style={styles.ctaPrimary}
            activeOpacity={0.85}
            onPress={() => setModalMode("denuncia")}
          >
            <Ionicons name="add-circle" size={21} color={COLORS.onLavender} />
            <Text style={styles.ctaPrimaryText}>Realizar una denuncia</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ctaSecondary}
            activeOpacity={0.85}
            onPress={() => setModalMode("reporte")}
          >
            <Ionicons name="flag-outline" size={20} color={COLORS.lavender} />
            <Text style={styles.ctaSecondaryText}>Realizar un reporte</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="alert-circle-outline" size={22} color={COLORS.error} />
            <Text style={styles.statNumber}>{totalDenuncias}</Text>
            <Text style={styles.statLabel}>Denuncias</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flag-outline" size={22} color={COLORS.info} />
            <Text style={styles.statNumber}>{totalReportesSolo}</Text>
            <Text style={styles.statLabel}>Reportes</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.success} />
            <Text style={styles.statNumber}>{totalAtendidos}</Text>
            <Text style={styles.statLabel}>Atendidos</Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Buscar casos</Text>
          <Text style={styles.sectionSubtitle}>
            Busca por animal, ubicación, tipo, fecha, descripción o estado.
          </Text>
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} />
            <TextInput
              style={styles.searchInput}
              placeholder="Ej: perro, Popayán, abandono..."
              placeholderTextColor={COLORS.onSurfaceVariant}
              value={busqueda}
              onChangeText={setBusqueda}
              returnKeyType="search"
            />
            {!!busqueda && (
              <TouchableOpacity onPress={() => setBusqueda("")}>
                <Ionicons name="close-circle" size={18} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {[
            { value: "Todas", label: "Todas" },
            { value: "denuncia", label: "Denuncias" },
            { value: "reporte", label: "Reportes" },
          ].map((op) => {
            const activo = filtroCategoria === op.value;
            return (
              <TouchableOpacity
                key={op.value}
                style={[styles.filterButton, activo && styles.filterButtonActive]}
                onPress={() => setFiltroCategoria(op.value)}
              >
                <Text style={[styles.filterText, activo && styles.filterTextActive]}>
                  {op.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {["Todos", ...ESTADOS].map((opcion) => {
            const activo = filtro === opcion;
            return (
              <TouchableOpacity
                key={opcion}
                style={[styles.filterButton, activo && styles.filterButtonActive]}
                onPress={() => setFiltro(opcion)}
              >
                <Text style={[styles.filterText, activo && styles.filterTextActive]}>
                  {opcion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionBadge}>
                {esAdmin ? "TODOS LOS CASOS" : "TUS REGISTROS"}
              </Text>
              <Text style={styles.sectionTitle}>Casos recientes</Text>
            </View>
            <Text style={styles.resultCount}>{reportesFiltrados.length}</Text>
          </View>

          {reportesFiltrados.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-text-outline" size={42} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyTitle}>No hay registros</Text>
              <Text style={styles.emptyText}>
                {busqueda
                  ? `No encontramos resultados para "${busqueda}".`
                  : "Todavía no hay casos que coincidan con estos filtros."}
              </Text>
              {(busqueda || filtro !== "Todos" || filtroCategoria !== "Todas") && (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setBusqueda("");
                    setFiltro("Todos");
                    setFiltroCategoria("Todas");
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Limpiar filtros</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            reportesFiltrados.map((r) => {
              const esDenuncia = categoriaDe(r) === "denuncia";
              const estadoColor = colorEstado(r.estado);
              const estadoNorm = normalizar(r.estado);
              const acento = esDenuncia ? COLORS.error : COLORS.info;
              const abierto = expandidoId === r.id;
              const fotos = Array.isArray(r.fotos) ? r.fotos : [];

              return (
                <View key={r.id} style={styles.caseCard}>
                  {/* ---- Parte superior: foto + datos principales ---- */}
                  <View style={styles.caseTopRow}>
                    {fotos.length > 0 ? (
                      <Image source={{ uri: fotos[0] }} style={styles.caseThumb} />
                    ) : (
                      <View style={[styles.caseThumb, styles.caseThumbEmpty]}>
                        <Ionicons name="paw-outline" size={30} color={COLORS.primary} />
                      </View>
                    )}

                    <View style={styles.caseInfo}>
                      <View style={styles.caseMetaRow}>
                        <View
                          style={[
                            styles.casePill,
                            {
                              backgroundColor: `${estadoColor}26`,
                              borderColor: `${estadoColor}66`,
                            },
                          ]}
                        >
                          <View style={[styles.casePillDot, { backgroundColor: estadoColor }]} />
                          <Text style={[styles.casePillText, { color: estadoColor }]}>
                            {r.estado || "Recibido"}
                          </Text>
                        </View>
                        <Text style={styles.dateText}>{r.fecha}</Text>
                      </View>

                      <Text style={styles.caseTitle} numberOfLines={2}>
                        {r.animal}
                        {r.tipoLabel ? ` · ${r.tipoLabel}` : ""}
                      </Text>

                      <View style={styles.caseLocationRow}>
                        <Ionicons name="location-outline" size={14} color={COLORS.primary} />
                        <Text style={styles.caseLocationText} numberOfLines={1}>
                          {r.zona}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* ---- Pie: categoria + ver seguimiento ---- */}
                  <View style={styles.caseFooter}>
                    <View style={styles.caseFooterLeft}>
                      <Ionicons
                        name={esDenuncia ? "alert-circle" : "flag"}
                        size={14}
                        color={acento}
                      />
                      <Text style={[styles.caseFooterLabel, { color: acento }]}>
                        {esDenuncia ? "Denuncia" : "Reporte"}
                      </Text>
                      {!!r.anonimo && (
                        <View style={styles.anonBadge}>
                          <Ionicons name="eye-off-outline" size={11} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.anonBadgeText}>Anónimo</Text>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.caseLink}
                      activeOpacity={0.7}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={() => setExpandidoId(abierto ? null : r.id)}
                    >
                      <Text style={styles.caseLinkText}>
                        {abierto ? "Ocultar" : esAdmin ? "Ver detalles" : "Ver seguimiento"}
                      </Text>
                      <Ionicons
                        name={abierto ? "chevron-up" : "chevron-forward"}
                        size={14}
                        color={COLORS.lavender}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* ---- Detalle desplegable ---- */}
                  {abierto && (
                    <View style={styles.caseExpanded}>
                      <Text style={styles.descriptionLabel}>Descripción</Text>
                      <Text style={styles.description}>{r.descripcion}</Text>

                      {Array.isArray(r.detalles) && r.detalles.length > 0 && (
                        <Text style={styles.detailsText}>{r.detalles.join(" · ")}</Text>
                      )}

                      {fotos.length > 1 && (
                        <View style={styles.photoStrip}>
                          {fotos.map((uri) => (
                            <Image key={uri} source={{ uri }} style={styles.photoStripItem} />
                          ))}
                        </View>
                      )}

                      {esAdmin ? (
                        <View style={styles.actionsRow}>
                          <TouchableOpacity
                            style={styles.attendButton}
                            activeOpacity={0.85}
                            onPress={() => seleccionarEstado(r)}
                          >
                            <Ionicons
                              name="clipboard-outline"
                              size={17}
                              color={COLORS.onPrimaryContainer}
                            />
                            <Text style={styles.attendButtonText}>Actualizar estado</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => confirmarEliminar(r.id)}
                          >
                            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.trackingBox}>
                          <Ionicons
                            name={estadoNorm === "atendido" ? "checkmark-circle-outline" : "time-outline"}
                            size={21}
                            color={estadoColor}
                          />
                          <View style={{ flex: 1 }}>
                            <Text style={[styles.trackingTitle, { color: estadoColor }]}>
                              Estado: {r.estado || "Recibido"}
                            </Text>
                            <Text style={styles.trackingText}>
                              {estadoNorm === "atendido"
                                ? "Este caso ha sido marcado como atendido."
                                : estadoNorm === "en atencion"
                                  ? "Se están realizando acciones para atender este caso."
                                  : estadoNorm === "en revision"
                                    ? "La información de tu caso está siendo revisada."
                                    : "Tu caso fue recibido y está pendiente de revisión."}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        <View style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Ionicons name="shield-checkmark-outline" size={25} color={COLORS.primary} />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Tu reporte puede ayudar a salvar una vida</Text>
            <Text style={styles.helpText}>
              Registra informacion clara para facilitar el seguimiento de cada caso.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalMode !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setModalMode(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.modalTitle}>
                  {modalMode === "denuncia" ? "Nueva denuncia" : "Nuevo reporte"}
                </Text>
                <Text style={styles.modalSubtitle}>
                  {modalMode === "denuncia"
                    ? "Describe la situacion con la mayor precisión posible. La información debe tratarse con responsabilidad."
                    : "Reporta animales perdidos, encontrados o que necesiten ayuda. Los campos con * son obligatorios."}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalMode(null)}>
                <Ionicons name="close" size={27} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ flexShrink: 1 }}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.modalScrollContent}
            >
              {modalMode === "denuncia" && (
                <>
                  <View style={styles.card}>
                    <View style={styles.infoRow}>
                      <View style={styles.infoIconWrap}>
                        <Ionicons
                          name="shield-checkmark-outline"
                          size={22}
                          color={COLORS.primary}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.infoTitle}>Manejo responsable de la información</Text>
                        <Text style={styles.infoText}>
                          Comparte unicamente informacion necesaria para atender el caso.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <DenunciaForm onSubmit={agregarRegistro} onInvitado={verificarInvitado} />
                </>
              )}

              {modalMode === "reporte" && (
                <ReporteForm onSubmit={agregarRegistro} onInvitado={verificarInvitado} />
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={mostrarModalInvitado}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMostrarModalInvitado(false)}
      >
        <View style={styles.invitadoBackground}>
          <View style={styles.invitadoContainer}>

            <Ionicons
              name="lock-closed-outline"
              size={44}
              color={COLORS.warning}
              style={styles.invitadoIcon}
            />

            <Text style={styles.invitadoTitle}>Acción Restringida</Text>

            <Text style={styles.invitadoSubtitle}>
              Debes iniciar sesión o registrarte para poder registrar un caso o denuncia en la plataforma.
            </Text>

            {/* Botón Iniciar Sesión */}
            <TouchableOpacity
              style={styles.invitadoLoginBtn}
              activeOpacity={0.85}
              onPress={() => {
                setMostrarModalInvitado(false);
                router.push("/(auth)/login");
              }}
            >
              <Text style={styles.invitadoLoginText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            {/* Botón Cancelar */}
            <TouchableOpacity
              style={styles.invitadoCancelBtn}
              activeOpacity={0.85}
              onPress={() => setMostrarModalInvitado(false)}
            >
              <Text style={styles.invitadoCancelText}>Tal vez más tarde</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}