import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function Perfil() {

  const [isEditing, setIsEditing] = useState(false);

  // Imagen de perfil
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Informacion personal
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [fecha, setFecha] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [ocupacion, setOcupacion] = useState("");

  // Informacion de ubicacion
  const [ciudad, setCiudad] = useState("");

  // Descripcion del perfil
  const [descripcion, setDescripcion] = useState("");

  // Seleccionar foto
  const seleccionarImagen = async () => {

    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Necesitamos acceso a tus fotos para cambiar la imagen de perfil."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes: ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [1, 1],

        quality: 0.7,
      });

    if (!result.canceled) {

      setFotoPerfil(result.assets[0].uri);

    }
  };

  // Eliminar foto
  const eliminarFoto = () => {

    Alert.alert(
      "Eliminar foto",
      "¿Estás seguro de que deseas eliminar tu foto de perfil?",

      [
        {
          text: "Cancelar",
          style: "cancel",
        },

        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => setFotoPerfil(null),
        },
      ]
    );
  };

  // Guardar perfil
  const guardarPerfil = () => {

    setIsEditing(false);

    Alert.alert(
      "Perfil actualizado",
      "Tu información ha sido guardada correctamente."
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/fondo.jpg")}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.card}>

            {/* Encabezado */}

            <View style={styles.encabezado}>

              <View style={styles.tituloContainer}>

                <Text style={styles.titulo}>
                  {isEditing
                    ? "Completa tu perfil"
                    : "Mi Perfil"}
                </Text>

              </View>

              {!isEditing && (

                <TouchableOpacity
                  style={styles.botonEditarSuperior}
                  onPress={() => setIsEditing(true)}
                >

                  <Ionicons
                    name="create-outline"
                    size={23}
                    color="#33CC66"
                  />

                </TouchableOpacity>

              )}

            </View>

            {/* Subtitulo */}

            <Text style={styles.subtitulo}>

              {isEditing
                ? "Actualiza tu información personal para mantener tu perfil completo."
                : "Aquí puedes consultar y mantener actualizada tu información personal."}

            </Text>


            


            {/* Foto */}

            <View style={styles.fotoContainer}>

              <View style={styles.fotoWrapper}>

                <Image
                  source={
                    fotoPerfil
                      ? { uri: fotoPerfil }
                      : require("../../assets/user.png")
                  }
                  style={styles.foto}
                />


                {isEditing && (

                  <TouchableOpacity
                    style={styles.botonFoto}
                    onPress={seleccionarImagen}
                  >

                    <Ionicons
                      name="add"
                      size={22}
                      color="#fff"
                    />

                  </TouchableOpacity>

                )}


                {isEditing && fotoPerfil && (

                  <TouchableOpacity
                    style={styles.botonEliminarFoto}
                    onPress={eliminarFoto}
                  >

                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color="#fff"
                    />

                  </TouchableOpacity>

                )}

              </View>


              {isEditing && (

                <Text style={styles.ayudaFoto}>

                  Toca el botón + para cambiar tu foto

                </Text>

              )}

            </View>


            {/* Informacion personal */}

            <Text style={styles.seccion}>
              Información personal
            </Text>


            {/* Tipo de documento */}

            <View style={styles.campoCompleto}>

              <Text style={styles.label}>
                Tipo de documento
              </Text>

              <View
                style={[
                  styles.pickerContainer,
                  !isEditing && styles.inputBloqueado,
                ]}
              >

                <Picker
                  selectedValue={tipoDocumento}
                  onValueChange={(itemValue) =>
                    setTipoDocumento(itemValue)
                  }
                  enabled={isEditing}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >

                  <Picker.Item
                    label="Selecciona un tipo de documento"
                    value=""
                  />

                  <Picker.Item
                    label="Cédula de ciudadanía"
                    value="cedula_ciudadania"
                  />

                  <Picker.Item
                    label="Cédula de extranjería"
                    value="cedula_extranjeria"
                  />

                  <Picker.Item
                    label="PEP"
                    value="pep"
                  />

                  <Picker.Item
                    label="Permiso por Protección Temporal"
                    value="ppt"
                  />

                </Picker>

              </View>

            </View>


            {/* Numero de documento */}

            <View style={styles.campoCompleto}>

              <Text style={styles.label}>
                Número de documento
              </Text>

              <TextInput
                style={[
                  styles.input,
                  !isEditing && styles.inputBloqueado,
                ]}
                placeholder="Escribe tu número de documento"
                placeholderTextColor="rgba(0,0,0,0.38)"
                value={documento}
                onChangeText={setDocumento}
                editable={isEditing}
                keyboardType="numeric"
              />

            </View>


            {/* Fecha de nacimiento */}

            <View style={styles.campoCompleto}>

              <Text style={styles.label}>
                Fecha de nacimiento
              </Text>

              <TextInput
                style={[
                  styles.input,
                  !isEditing && styles.inputBloqueado,
                ]}
                placeholder="dd/mm/aaaa"
                placeholderTextColor="rgba(0,0,0,0.38)"
                value={fecha}
                onChangeText={setFecha}
                editable={isEditing}
              />

            </View>


            {/* Telefono y Ocupacion */}

            <View style={styles.row}>

              <View style={styles.campo}>

                <Text style={styles.label}>
                  Teléfono
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    !isEditing && styles.inputBloqueado,
                  ]}
                  placeholder="+57 3000000000"
                  placeholderTextColor="rgba(0,0,0,0.38)"
                  value={telefono}
                  onChangeText={setTelefono}
                  editable={isEditing}
                  keyboardType="phone-pad"
                />

              </View>


              <View style={styles.campo}>

                <Text style={styles.label}>
                  Ocupación
                </Text>

                <TextInput
                  style={[
                    styles.input,
                    !isEditing && styles.inputBloqueado,
                  ]}
                  placeholder="Ej. Diseñador"
                  placeholderTextColor="rgba(0,0,0,0.38)"
                  value={ocupacion}
                  onChangeText={setOcupacion}
                  editable={isEditing}
                />

              </View>

            </View>


            {/* Correo electronico */}

            <View style={styles.campoCompleto}>

              <Text style={styles.label}>
                Correo electrónico
              </Text>

              <TextInput
                style={[
                  styles.input,
                  !isEditing && styles.inputBloqueado,
                ]}
                placeholder="ejemplo@correo.com"
                placeholderTextColor="rgba(0,0,0,0.38)"
                value={correo}
                onChangeText={setCorreo}
                editable={isEditing}
                keyboardType="email-address"
                autoCapitalize="none"
              />

            </View>


            {/* Informacion de ubicacion */}

            <Text style={styles.seccion}>
              Información de ubicación
            </Text>


            {/* Ciudad */}

            <View style={styles.campoCompleto}>

              <Text style={styles.label}>
                Ciudad o municipio
              </Text>

              <TextInput
                style={[
                  styles.input,
                  !isEditing && styles.inputBloqueado,
                ]}
                placeholder="Ej. Popayán"
                placeholderTextColor="rgba(0,0,0,0.38)"
                value={ciudad}
                onChangeText={setCiudad}
                editable={isEditing}
              />

            </View>


            {/* Informacion adicional */}

            <Text style={styles.seccion}>
              Información adicional
            </Text>


            <View style={styles.infoExtra}>

              <Ionicons
                name="shield-checkmark-outline"
                size={23}
                color="#33CC66"
              />

              <Text style={styles.textoInfoExtra}>

                Mantén actualizados tus datos para facilitar
                la comunicación y mejorar la seguridad de tu cuenta.

              </Text>

            </View>


            {/* Botones */}

            {isEditing ? (

              <>

                <TouchableOpacity
                  style={styles.botonPrincipal}
                  onPress={guardarPerfil}
                >

                  <Ionicons
                    name="checkmark-circle-outline"
                    size={21}
                    color="#fff"
                  />

                  <Text style={styles.textoBoton}>
                    Guardar perfil
                  </Text>

                </TouchableOpacity>


                <TouchableOpacity
                  style={styles.botonCancelar}
                  onPress={() => setIsEditing(false)}
                >

                  <Text style={styles.textoCancelar}>
                    Cancelar
                  </Text>

                </TouchableOpacity>

              </>

            ) : (

              <TouchableOpacity
                style={[
                  styles.botonPrincipal,
                  styles.botonEditar,
                ]}
                onPress={() => setIsEditing(true)}
              >

                <Ionicons
                  name="create-outline"
                  size={21}
                  color="#fff"
                />

                <Text style={styles.textoBoton}>
                  Editar perfil
                </Text>

              </TouchableOpacity>

            )}

          </View>

        </ScrollView>

      </View>

    </ImageBackground>
  );
}


// Estilos

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
  },

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 15,
  },

  card: {
    width: "95%",
    maxWidth: 430,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 18,
  },


  /* Encabezado */

  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 55,
    marginBottom: 5,
    paddingHorizontal: 45,
  },

  tituloContainer: {
    flex: 1,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#33CC66",
    textAlign: "center",
  },

  botonEditarSuperior: {
    position: "absolute",
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
  },


  /* Subtitulo */

  subtitulo: {
    marginTop: 10,
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 8,
  },


  /* Aviso */

  avisoEditar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 13,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(51,204,102,0.3)",
  },

  textoAviso: {
    flex: 1,
    color: "#fff",
    fontSize: 13,
    marginLeft: 9,
    lineHeight: 19,
  },


  /* Foto */

  fotoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  fotoWrapper: {
    position: "relative",
  },

  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },

  botonFoto: {
    position: "absolute",
    right: -2,
    bottom: 3,
    backgroundColor: "#33CC66",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  botonEliminarFoto: {
    position: "absolute",
    left: -2,
    bottom: 3,
    backgroundColor: "#e74c3c",
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  ayudaFoto: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    marginTop: 10,
  },


  /* Secciones */

  seccion: {
    color: "#33CC66",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 16,
  },


  /* Campos */

  campoCompleto: {
    width: "100%",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },

  campo: {
    width: "48%",
    marginBottom: 18,
  },

  label: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 7,
    fontSize: 14,
  },

  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 11,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },

  inputBloqueado: {
    backgroundColor: "rgba(255,255,255,0.55)",
  },


  /* Selector */

  pickerContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 11,
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },

  picker: {
    width: "100%",
    height: 50,
    color: "#222",
  },

  pickerItem: {
    fontSize: 14,
  },


  /* Informacion adicional */

  infoExtra: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 12,
    padding: 14,
    marginBottom: 5,
  },

  textoInfoExtra: {
    flex: 1,
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 19,
    marginLeft: 10,
  },


  /* Botones */

  botonPrincipal: {
    backgroundColor: "#33CC66",
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    flexDirection: "row",
    gap: 8,
  },

  botonEditar: {
    marginTop: 25,
  },

  textoBoton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  botonCancelar: {
    alignItems: "center",
    marginTop: 15,
    paddingVertical: 10,
  },

  textoCancelar: {
    color: "#fff",
    fontSize: 14,
  },

});