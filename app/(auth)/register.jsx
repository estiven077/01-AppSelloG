import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Picker } from '@react-native-picker/picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';


// ======================================================
// PALETA DE COLORES - SELLO GUARDIÁN
// MISMO ESTILO DEL LOGIN
// ======================================================

const COLORS = {
  primary: '#7C3AED',
  primaryContainer: '#7C3AED',
  onPrimaryContainer: '#FFFFFF',

  accent: '#C4B5FD',

  surface: '#0F172A',
  onSurface: '#F8FAFC',
  onSurfaceVariant: '#94A3B8',

  cardBg: 'rgba(15, 23, 42, 0.75)',
  cardBorder: 'rgba(124, 58, 237, 0.25)',

  inputBg: 'rgba(30, 41, 59, 0.6)',
  inputBorder: 'rgba(196, 181, 253, 0.2)',

  error: '#E11D48',
};


// ======================================================
// VALIDACIÓN CON YUP
// ======================================================

const validationSchema = Yup.object().shape({

  // ====================================================
  // ROL
  // ====================================================

  rol: Yup.string()
    .required('Selecciona un rol'),


  // ====================================================
  // CAMPOS DEL USUARIO
  // ====================================================

  tipoDocumento: Yup.string()
    .when('rol', {
      is: 'usuario',

      then: (schema) =>
        schema.required(
          'Selecciona el tipo de documento'
        ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  documento: Yup.string()
    .when('rol', {
      is: 'usuario',

      then: (schema) =>
        schema
          .matches(
            /^[0-9]+$/,
            'El documento solo debe contener números'
          )
          .min(
            6,
            'El documento debe tener mínimo 6 números'
          )
          .required(
            'El número de documento es obligatorio'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  nombre: Yup.string()
    .when('rol', {
      is: 'usuario',

      then: (schema) =>
        schema
          .min(
            3,
            'El nombre debe tener mínimo 3 caracteres'
          )
          .required(
            'El nombre de usuario es obligatorio'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  // ====================================================
  // CAMPOS DE LA FUNDACIÓN
  // ====================================================

  nombreFundacion: Yup.string()
    .when('rol', {
      is: 'fundacion',

      then: (schema) =>
        schema
          .min(
            3,
            'El nombre debe tener mínimo 3 caracteres'
          )
          .required(
            'El nombre de la fundación es obligatorio'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  representanteLegal: Yup.string()
    .when('rol', {
      is: 'fundacion',

      then: (schema) =>
        schema
          .min(
            3,
            'El nombre debe tener mínimo 3 caracteres'
          )
          .required(
            'El representante legal es obligatorio'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  telefono: Yup.string()
    .when('rol', {
      is: 'fundacion',

      then: (schema) =>
        schema
          .matches(
            /^[0-9]+$/,
            'El teléfono solo debe contener números'
          )
          .min(
            7,
            'El teléfono debe tener mínimo 7 números'
          )
          .required(
            'El teléfono de contacto es obligatorio'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  ciudadDireccion: Yup.string()
    .when('rol', {
      is: 'fundacion',

      then: (schema) =>
        schema
          .min(
            3,
            'Ingresa una ciudad o dirección válida'
          )
          .required(
            'La ciudad/dirección es obligatoria'
          ),

      otherwise: (schema) =>
        schema.notRequired(),
    }),


  // ====================================================
  // CAMPOS COMUNES
  // ====================================================

  email: Yup.string()
    .email(
      'Correo electrónico inválido'
    )
    .required(
      'El correo electrónico es obligatorio'
    ),


  password: Yup.string()
    .min(
      6,
      'La contraseña debe tener mínimo 6 caracteres'
    )
    .required(
      'La contraseña es obligatoria'
    ),


  confirmarPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'Las contraseñas no coinciden'
    )
    .required(
      'Confirma tu contraseña'
    ),

});


// ======================================================
// COMPONENTE REGISTER
// ======================================================

export default function Register() {

  const router = useRouter();


  // ====================================================
  // MOSTRAR / OCULTAR CONTRASEÑA
  // ====================================================

  const [
    mostrarPassword,
    setMostrarPassword
  ] = useState(false);


  const [
    mostrarConfirmarPassword,
    setMostrarConfirmarPassword
  ] = useState(false);


  // ====================================================
  // FORMIK
  // ====================================================

  const formik = useFormik({

    initialValues: {

      // ROL
      rol: '',

      // USUARIO
      tipoDocumento: '',
      documento: '',
      nombre: '',

      // FUNDACIÓN
      nombreFundacion: '',
      representanteLegal: '',
      telefono: '',
      ciudadDireccion: '',

      // COMUNES
      email: '',
      password: '',
      confirmarPassword: '',

    },


    validationSchema,


    onSubmit: (values) => {

      console.log(
        'Datos del registro:',
        values
      );


      const nombreRegistro =
        values.rol === 'fundacion'
          ? values.nombreFundacion
          : values.nombre;


      Alert.alert(
        'Registro exitoso',

        `¡Bienvenido/a ${nombreRegistro}!`,

        [
          {
            text: 'Iniciar sesión',

            onPress: () => {
              router.replace('/login');
            },
          },
        ]
      );

    },

  });


  // ====================================================
  // CAMBIAR ROL
  // ====================================================

  const cambiarRol = (value) => {

    // Cambiar rol
    formik.setFieldValue(
      'rol',
      value
    );


    // Limpiar errores
    formik.setErrors({});


    // Limpiar campos del rol anterior
    formik.setTouched({});


    // ==================================================
    // SI ES USUARIO
    // ==================================================

    if (value === 'usuario') {

      formik.setFieldValue(
        'nombreFundacion',
        ''
      );

      formik.setFieldValue(
        'representanteLegal',
        ''
      );

      formik.setFieldValue(
        'telefono',
        ''
      );

      formik.setFieldValue(
        'ciudadDireccion',
        ''
      );

    }


    // ==================================================
    // SI ES FUNDACIÓN
    // ==================================================

    if (value === 'fundacion') {

      formik.setFieldValue(
        'tipoDocumento',
        ''
      );

      formik.setFieldValue(
        'documento',
        ''
      );

      formik.setFieldValue(
        'nombre',
        ''
      );

    }

  };


  // ====================================================
  // FUNCIÓN PARA MOSTRAR ERRORES
  // ====================================================

  const mostrarError = (campo) => {

    return (
      formik.touched[campo] &&
      formik.errors[campo]
    );

  };


  // ====================================================
  // RETURN
  // ====================================================

  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
      />


      <KeyboardAvoidingView
        style={styles.keyboard}

        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >


          {/* ==================================================
              TARJETA PRINCIPAL
          ================================================== */}

          <View style={styles.registerContainer}>


            {/* ==================================================
                IMAGEN
            ================================================== */}

            <View style={styles.visual}>

              <Image
                source={require('../../assets/perro-rescate.jpg')}
                style={styles.visualImage}
                resizeMode="cover"
              />


              <View style={styles.visualOverlay}>

                <Text style={styles.visualTitle}>

                  {formik.values.rol === 'fundacion'
                    ? 'Únete a la causa.'
                    : 'Únete a nuestra comunidad.'}

                </Text>


                <Text style={styles.visualSubtitle}>

                  {formik.values.rol === 'fundacion'
                    ? 'Tu fundación puede ayudar a cambiar la vida de muchos animales.'
                    : 'Cada registro nos acerca un paso más a encontrar un hogar para quienes más lo necesitan.'}

                </Text>

              </View>

            </View>


            {/* ==================================================
                FORMULARIO
            ================================================== */}

            <View style={styles.formSide}>


              {/* ==================================================
                  ENCABEZADO
              ================================================== */}

              <View style={styles.formHeader}>

                <View style={styles.logoCircle}>

                  <Ionicons
                    name="paw"
                    size={34}
                    color={COLORS.primary}
                  />

                </View>


                <Text style={styles.title}>

                  {formik.values.rol === 'fundacion'
                    ? 'Registrar fundación'
                    : 'Registrarse'}

                </Text>


                <Text style={styles.subtitle}>

                  {formik.values.rol === 'fundacion'
                    ? 'Únete a la causa'
                    : 'Únete a la causa y ayuda a cambiar vidas.'}

                </Text>

              </View>


              {/* ==================================================
                  ROL
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Rol
                </Text>


                <View
                  style={[
                    styles.pickerContainer,

                    mostrarError('rol') &&
                    styles.inputError,
                  ]}
                >

                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={COLORS.accent}
                    style={styles.pickerIcon}
                  />


                  <Picker

                    selectedValue={
                      formik.values.rol
                    }

                    onValueChange={
                      cambiarRol
                    }

                    onBlur={() => {

                      formik.setFieldTouched(
                        'rol',
                        true
                      );

                    }}

                    style={styles.picker}

                    dropdownIconColor={
                      COLORS.accent
                    }

                  >

                    <Picker.Item
                      label="Seleccionar rol"
                      value=""
                      color="#0F172A"
                    />

                    <Picker.Item
                      label="Usuario"
                      value="usuario"
                      color="#0F172A"
                    />

                    <Picker.Item
                      label="Fundación"
                      value="fundacion"
                      color="#0F172A"
                    />

                  </Picker>

                </View>


                {mostrarError('rol') && (

                  <Text style={styles.error}>
                    {formik.errors.rol}
                  </Text>

                )}

              </View>


              {/* ==================================================
                  FORMULARIO USUARIO
              ================================================== */}

              {formik.values.rol === 'usuario' && (

                <>


                  {/* ==================================================
                      TIPO DE DOCUMENTO
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Tipo de documento
                    </Text>


                    <View
                      style={[
                        styles.pickerContainer,

                        mostrarError(
                          'tipoDocumento'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="card-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.pickerIcon}
                      />


                      <Picker

                        selectedValue={
                          formik.values.tipoDocumento
                        }

                        onValueChange={(value) => {

                          formik.setFieldValue(
                            'tipoDocumento',
                            value
                          );

                        }}

                        onBlur={() => {

                          formik.setFieldTouched(
                            'tipoDocumento',
                            true
                          );

                        }}

                        style={styles.picker}

                        dropdownIconColor={
                          COLORS.accent
                        }

                      >

                        <Picker.Item
                          label="Seleccionar tipo"
                          value=""
                          color="#0F172A"
                        />

                        <Picker.Item
                          label="Cédula de ciudadanía"
                          value="cedula_ciudadania"
                          color="#0F172A"
                        />

                        <Picker.Item
                          label="Cédula de extranjería"
                          value="cedula_extranjeria"
                          color="#0F172A"
                        />

                        <Picker.Item
                          label="PEP"
                          value="pep"
                          color="#0F172A"
                        />

                        <Picker.Item
                          label="Permiso por Protección Temporal"
                          value="ppt"
                          color="#0F172A"
                        />

                      </Picker>

                    </View>


                    {mostrarError(
                      'tipoDocumento'
                    ) && (

                      <Text style={styles.error}>
                        {formik.errors.tipoDocumento}
                      </Text>

                    )}

                  </View>


                  {/* ==================================================
                      NÚMERO DE DOCUMENTO
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Número de documento
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'documento'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="id-card-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Ingresar número de documento"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values.documento
                        }

                        onChangeText={
                          formik.handleChange(
                            'documento'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'documento'
                          )
                        }

                        keyboardType="numeric"

                        maxLength={15}

                      />

                    </View>


                    {mostrarError(
                      'documento'
                    ) && (

                      <Text style={styles.error}>
                        {formik.errors.documento}
                      </Text>

                    )}

                  </View>


                  {/* ==================================================
                      NOMBRE DE USUARIO
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Nombre de usuario
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'nombre'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Nombre y apellidos"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values.nombre
                        }

                        onChangeText={
                          formik.handleChange(
                            'nombre'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'nombre'
                          )
                        }

                        autoCapitalize="words"

                      />

                    </View>


                    {mostrarError(
                      'nombre'
                    ) && (

                      <Text style={styles.error}>
                        {formik.errors.nombre}
                      </Text>

                    )}

                  </View>

                </>

              )}


              {/* ==================================================
                  FORMULARIO FUNDACIÓN
              ================================================== */}

              {formik.values.rol === 'fundacion' && (

                <>


                  {/* ==================================================
                      NOMBRE DE LA FUNDACIÓN
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Nombre de la fundación
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'nombreFundacion'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="business-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Nombre de la fundación"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values.nombreFundacion
                        }

                        onChangeText={
                          formik.handleChange(
                            'nombreFundacion'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'nombreFundacion'
                          )
                        }

                        autoCapitalize="words"

                      />

                    </View>


                    {mostrarError(
                      'nombreFundacion'
                    ) && (

                      <Text style={styles.error}>
                        {
                          formik.errors
                            .nombreFundacion
                        }
                      </Text>

                    )}

                  </View>


                  {/* ==================================================
                      REPRESENTANTE LEGAL
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Representante legal
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'representanteLegal'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="person-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Nombre del representante legal"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values
                            .representanteLegal
                        }

                        onChangeText={
                          formik.handleChange(
                            'representanteLegal'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'representanteLegal'
                          )
                        }

                        autoCapitalize="words"

                      />

                    </View>


                    {mostrarError(
                      'representanteLegal'
                    ) && (

                      <Text style={styles.error}>
                        {
                          formik.errors
                            .representanteLegal
                        }
                      </Text>

                    )}

                  </View>


                  {/* ==================================================
                      TELÉFONO
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Teléfono de contacto
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'telefono'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="call-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Número de teléfono"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values.telefono
                        }

                        onChangeText={
                          formik.handleChange(
                            'telefono'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'telefono'
                          )
                        }

                        keyboardType="phone-pad"

                        maxLength={15}

                      />

                    </View>


                    {mostrarError(
                      'telefono'
                    ) && (

                      <Text style={styles.error}>
                        {formik.errors.telefono}
                      </Text>

                    )}

                  </View>


                  {/* ==================================================
                      CIUDAD / DIRECCIÓN
                  ================================================== */}

                  <View style={styles.group}>

                    <Text style={styles.label}>
                      Ciudad / Dirección
                    </Text>


                    <View
                      style={[
                        styles.inputContainer,

                        mostrarError(
                          'ciudadDireccion'
                        ) &&
                        styles.inputError,
                      ]}
                    >

                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={COLORS.accent}
                        style={styles.inputIcon}
                      />


                      <TextInput

                        style={
                          styles.inputWithIcon
                        }

                        placeholder="Ciudad y dirección"

                        placeholderTextColor={
                          COLORS.onSurfaceVariant
                        }

                        value={
                          formik.values
                            .ciudadDireccion
                        }

                        onChangeText={
                          formik.handleChange(
                            'ciudadDireccion'
                          )
                        }

                        onBlur={
                          formik.handleBlur(
                            'ciudadDireccion'
                          )
                        }

                        autoCapitalize="words"

                      />

                    </View>


                    {mostrarError(
                      'ciudadDireccion'
                    ) && (

                      <Text style={styles.error}>
                        {
                          formik.errors
                            .ciudadDireccion
                        }
                      </Text>

                    )}

                  </View>

                </>

              )}


              {/* ==================================================
                  CORREO ELECTRÓNICO
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Correo electrónico
                </Text>


                <View
                  style={[
                    styles.inputContainer,

                    mostrarError('email') &&
                    styles.inputError,
                  ]}
                >

                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.accent}
                    style={styles.inputIcon}
                  />


                  <TextInput

                    style={
                      styles.inputWithIcon
                    }

                    placeholder="Ingresar correo"

                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }

                    value={
                      formik.values.email
                    }

                    onChangeText={
                      formik.handleChange('email')
                    }

                    onBlur={
                      formik.handleBlur('email')
                    }

                    keyboardType="email-address"

                    autoCapitalize="none"

                    autoCorrect={false}

                  />

                </View>


                {mostrarError('email') && (

                  <Text style={styles.error}>
                    {formik.errors.email}
                  </Text>

                )}

              </View>


              {/* ==================================================
                  CONTRASEÑAS
              ================================================== */}

              <View style={styles.passwordRow}>


                {/* ==================================================
                    CONTRASEÑA
                ================================================== */}

                <View style={styles.passwordColumn}>

                  <Text style={styles.label}>
                    Contraseña
                  </Text>


                  <View
                    style={[
                      styles.passwordContainer,

                      mostrarError(
                        'password'
                      ) &&
                      styles.inputError,
                    ]}
                  >

                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={COLORS.accent}
                    />


                    <TextInput

                      style={
                        styles.passwordInput
                      }

                      placeholder="Ingresar contraseña"

                      placeholderTextColor={
                        COLORS.onSurfaceVariant
                      }

                      value={
                        formik.values.password
                      }

                      onChangeText={
                        formik.handleChange(
                          'password'
                        )
                      }

                      onBlur={
                        formik.handleBlur(
                          'password'
                        )
                      }

                      secureTextEntry={
                        !mostrarPassword
                      }

                      autoCapitalize="none"

                    />


                    <TouchableOpacity

                      style={
                        styles.passwordEye
                      }

                      onPress={() =>
                        setMostrarPassword(
                          !mostrarPassword
                        )
                      }

                    >

                      <Ionicons
                        name={
                          mostrarPassword
                            ? 'eye-off-outline'
                            : 'eye-outline'
                        }

                        size={21}

                        color={
                          COLORS.accent
                        }

                      />

                    </TouchableOpacity>

                  </View>


                  {mostrarError(
                    'password'
                  ) && (

                    <Text style={styles.error}>
                      {formik.errors.password}
                    </Text>

                  )}

                </View>


                {/* ==================================================
                    CONFIRMAR CONTRASEÑA
                ================================================== */}

                <View style={styles.passwordColumn}>

                  <Text style={styles.label}>
                    Confirmar contraseña
                  </Text>


                  <View
                    style={[
                      styles.passwordContainer,

                      mostrarError(
                        'confirmarPassword'
                      ) &&
                      styles.inputError,
                    ]}
                  >

                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={COLORS.accent}
                    />


                    <TextInput

                      style={
                        styles.passwordInput
                      }

                      placeholder="Repetir contraseña"

                      placeholderTextColor={
                        COLORS.onSurfaceVariant
                      }

                      value={
                        formik.values
                          .confirmarPassword
                      }

                      onChangeText={
                        formik.handleChange(
                          'confirmarPassword'
                        )
                      }

                      onBlur={
                        formik.handleBlur(
                          'confirmarPassword'
                        )
                      }

                      secureTextEntry={
                        !mostrarConfirmarPassword
                      }

                      autoCapitalize="none"

                    />


                    <TouchableOpacity

                      style={
                        styles.passwordEye
                      }

                      onPress={() =>
                        setMostrarConfirmarPassword(
                          !mostrarConfirmarPassword
                        )
                      }

                    >

                      <Ionicons
                        name={
                          mostrarConfirmarPassword
                            ? 'eye-off-outline'
                            : 'eye-outline'
                        }

                        size={21}

                        color={
                          COLORS.accent
                        }

                      />

                    </TouchableOpacity>

                  </View>


                  {mostrarError(
                    'confirmarPassword'
                  ) && (

                    <Text style={styles.error}>
                      {
                        formik.errors
                          .confirmarPassword
                      }
                    </Text>

                  )}

                </View>

              </View>


              {/* ==================================================
                  BOTÓN REGISTRARSE
              ================================================== */}

              <TouchableOpacity

                style={
                  styles.registerButton
                }

                onPress={
                  formik.handleSubmit
                }

                activeOpacity={0.85}

                disabled={
                  formik.isSubmitting
                }

              >

                <Ionicons
                  name="paw"
                  size={21}
                  color={
                    COLORS.onPrimaryContainer
                  }
                />


                <Text
                  style={
                    styles.registerButtonText
                  }
                >

                  {formik.isSubmitting
                    ? 'Registrando...'
                    : 'Registrarse'}

                </Text>

              </TouchableOpacity>


              {/* ==================================================
                  FOOTER
              ================================================== */}

              <View style={styles.footer}>

                <Text style={styles.footerText}>
                  ¿Ya tienes una cuenta?
                </Text>


                <TouchableOpacity
                  onPress={() =>
                    router.push('/login')
                  }
                >

                  <Text style={styles.footerLink}>
                    Inicia sesión
                  </Text>

                </TouchableOpacity>

              </View>


            </View>

          </View>

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

}


// ======================================================
// ESTILOS
// MISMA BASE DEL LOGIN
// ======================================================

const styles = StyleSheet.create({

  // ====================================================
  // FONDO
  // ====================================================

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },


  // ====================================================
  // TARJETA PRINCIPAL
  // ====================================================

  registerContainer: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',

    borderRadius: 24,

    overflow: 'hidden',

    backgroundColor: COLORS.cardBg,

    borderWidth: 1,

    borderColor: COLORS.cardBorder,
  },


  // ====================================================
  // IMAGEN
  // ====================================================

  visual: {
    height: 200,
    position: 'relative',
  },

  visualImage: {
    width: '100%',
    height: '100%',
  },

  visualOverlay: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    padding: 20,

    backgroundColor:
      'rgba(15, 23, 42, 0.85)',
  },

  visualTitle: {
    color: COLORS.accent,

    fontSize: 20,

    fontWeight: '700',

    marginBottom: 6,
  },

  visualSubtitle: {
    color: COLORS.onSurface,

    fontSize: 12,

    lineHeight: 18,
  },


  // ====================================================
  // FORMULARIO
  // ====================================================

  formSide: {
    padding: 24,
  },

  formHeader: {
    marginBottom: 24,
  },


  // ====================================================
  // LOGO
  // ====================================================

  logoCircle: {
    width: 68,

    height: 68,

    borderRadius: 34,

    borderWidth: 2,

    borderColor: COLORS.primary,

    backgroundColor:
      'rgba(124, 58, 237, 0.1)',

    justifyContent: 'center',

    alignItems: 'center',

    alignSelf: 'center',

    marginBottom: 18,
  },


  // ====================================================
  // TÍTULOS
  // ====================================================

  title: {
    color: COLORS.onSurface,

    fontSize: 28,

    fontWeight: '700',

    textAlign: 'center',

    marginBottom: 8,
  },

  subtitle: {
    color: COLORS.onSurfaceVariant,

    fontSize: 13,

    lineHeight: 19,

    textAlign: 'center',
  },


  // ====================================================
  // GRUPOS
  // ====================================================

  group: {
    marginBottom: 16,
  },

  label: {
    color: COLORS.accent,

    fontSize: 12,

    fontWeight: '600',

    marginBottom: 8,
  },


  // ====================================================
  // INPUTS
  // ====================================================

  inputContainer: {
    height: 50,

    width: '100%',

    backgroundColor: COLORS.inputBg,

    borderWidth: 1,

    borderColor: COLORS.inputBorder,

    borderRadius: 12,

    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 15,

    overflow: 'hidden',
  },

  inputIcon: {
    marginRight: 10,

    flexShrink: 0,
  },

  inputWithIcon: {
    flex: 1,

    height: '100%',

    color: COLORS.onSurface,

    fontSize: 14,

    paddingVertical: 0,
  },


  // ====================================================
  // PICKER / SELECTORES
  // ====================================================

  pickerContainer: {
    height: 50,

    width: '100%',

    backgroundColor: COLORS.inputBg,

    borderWidth: 1,

    borderColor: COLORS.inputBorder,

    borderRadius: 12,

    flexDirection: 'row',

    alignItems: 'center',

    overflow: 'hidden',
  },

  pickerIcon: {
    marginLeft: 15,

    marginRight: 3,

    flexShrink: 0,
  },

  picker: {
    flex: 1,

    height: 50,

    color: '#F8FAFC',

    backgroundColor:
      COLORS.inputBg,

    fontSize: 14,
  },


  // ====================================================
  // CONTRASEÑAS
  // ====================================================

  passwordRow: {
    flexDirection: 'row',

    gap: 12,

    marginBottom: 4,
  },

  passwordColumn: {
    flex: 1,

    minWidth: 0,
  },

  passwordContainer: {
    height: 50,

    width: '100%',

    backgroundColor: COLORS.inputBg,

    borderWidth: 1,

    borderColor: COLORS.inputBorder,

    borderRadius: 12,

    flexDirection: 'row',

    alignItems: 'center',

    paddingLeft: 12,

    paddingRight: 6,

    overflow: 'hidden',
  },

  passwordInput: {
    flex: 1,

    minWidth: 0,

    height: '100%',

    color: COLORS.onSurface,

    fontSize: 12,

    marginLeft: 7,

    marginRight: 4,

    paddingVertical: 0,
  },


  // ====================================================
  // BOTÓN DEL OJO
  // ====================================================

  passwordEye: {
    width: 34,

    height: 46,

    justifyContent: 'center',

    alignItems: 'center',

    flexShrink: 0,
  },


  // ====================================================
  // ERRORES
  // ====================================================

  inputError: {
    borderColor: COLORS.error,
  },

  error: {
    color: COLORS.error,

    fontSize: 12,

    marginTop: 6,

    marginLeft: 4,
  },


  // ====================================================
  // BOTÓN REGISTRARSE
  // ====================================================

  registerButton: {
    height: 52,

    width: '100%',

    backgroundColor:
      COLORS.primaryContainer,

    borderRadius: 12,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    gap: 9,

    marginTop: 10,
  },

  registerButtonText: {
    color:
      COLORS.onPrimaryContainer,

    fontSize: 15,

    fontWeight: '700',
  },


  // ====================================================
  // FOOTER
  // ====================================================

  footer: {
    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    borderTopWidth: 1,

    borderTopColor:
      COLORS.cardBorder,

    marginTop: 20,

    paddingTop: 18,
  },

  footerText: {
    color:
      COLORS.onSurfaceVariant,

    fontSize: 12,

    marginRight: 4,
  },

  footerLink: {
    color: COLORS.accent,

    fontSize: 12,

    fontWeight: '700',
  },

});