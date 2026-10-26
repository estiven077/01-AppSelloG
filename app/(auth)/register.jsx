import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Picker } from '@react-native-picker/picker';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

// ======================================================
// PALETA DE COLORES (IGUAL QUE EL LOGIN)
// ======================================================

const COLORS = {
  primary: '#8B5CF6',
  primaryDark: '#8B5CF6',
  background: '#0d0d0d', // Fondo negro/oscuro para la safe area superior

  cardBg: '#0F172A',
  cardText: '#1E1B4B',
  cardSubtext: '#6B7280',

  inputBg: '#F9FAFB',
  inputBorder: '#E5E7EB',
  inputIcon: '#A78BFA',

  purpleLink: '#7C3AED',
  roleSelectedBg: '#EDE9FE',
  roleSelectedBorder: '#7C3AED',

  error: '#E11D48',
};

// ======================================================
// VALIDACIÓN CON YUP
// ======================================================

const validationSchema = Yup.object().shape({
  rol: Yup.string().required('Selecciona un '),

  // ---------------- USUARIO ----------------
  tipoDocumento: Yup.string().when('rol', {
    is: 'usuario',
    then: (schema) => schema.required('Selecciona el tipo de documento'),
    otherwise: (schema) => schema.notRequired(),
  }),

  documento: Yup.string().when('rol', {
    is: 'usuario',
    then: (schema) =>
      schema
        .matches(/^[0-9]+$/, 'El documento solo debe contener números')
        .min(6, 'El documento debe tener mínimo 6 números')
        .required('El número de documento es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),

  nombre: Yup.string().when('rol', {
    is: 'usuario',
    then: (schema) =>
      schema
        .min(3, 'El nombre debe tener mínimo 3 caracteres')
        .required('El nombre de usuario es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // ---------------- FUNDACIÓN ----------------
  nombreFundacion: Yup.string().when('rol', {
    is: 'fundacion',
    then: (schema) =>
      schema
        .min(3, 'El nombre debe tener mínimo 3 caracteres')
        .required('El nombre de la fundación es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),

  representanteLegal: Yup.string().when('rol', {
    is: 'fundacion',
    then: (schema) =>
      schema
        .min(3, 'El nombre debe tener mínimo 3 caracteres')
        .required('El representante legal es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),

  telefono: Yup.string().when('rol', {
    is: 'fundacion',
    then: (schema) =>
      schema
        .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
        .min(7, 'El teléfono debe tener mínimo 7 números')
        .required('El teléfono de contacto es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),

  ciudadDireccion: Yup.string().when('rol', {
    is: 'fundacion',
    then: (schema) =>
      schema
        .min(3, 'Ingresa una ciudad o dirección válida')
        .required('La ciudad/dirección es obligatoria'),
    otherwise: (schema) => schema.notRequired(),
  }),

  // ---------------- COMUNES ----------------
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),

  confirmarPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),

  terminos: Yup.boolean().oneOf(
    [true],
    'Debes aceptar los términos y la política de privacidad'
  ),
});

// ======================================================
// COMPONENTES REUTILIZABLES
// ======================================================

const Field = ({ formik, name, label, icon, placeholder, ...inputProps }) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, hasError && styles.inputError]}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.inputIcon}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.inputWithIcon}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          {...inputProps}
        />
      </View>

      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </View>
  );
};

const PasswordField = ({ formik, name, label, placeholder }) => {
  const [visible, setVisible] = useState(false);
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.passwordContainer, hasError && styles.inputError]}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={COLORS.inputIcon}
        />

        <TextInput
          style={styles.passwordInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          secureTextEntry={!visible}
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={21}
            color={COLORS.inputIcon}
          />
        </TouchableOpacity>
      </View>

      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </View>
  );
};

const RoleCard = ({ icon, title, subtitle, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.roleCard, selected && styles.roleCardSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Ionicons
      name={icon}
      size={28}
      color={selected ? COLORS.purpleLink : COLORS.inputIcon}
    />
    <Text style={[styles.roleTitle, selected && styles.roleTitleSelected]}>
      {title}
    </Text>
    <Text style={styles.roleSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

// ======================================================
// COMPONENTE REGISTER
// ======================================================

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      rol: '',
      tipoDocumento: '',
      documento: '',
      nombre: '',
      nombreFundacion: '',
      representanteLegal: '',
      telefono: '',
      ciudadDireccion: '',
      email: '',
      password: '',
      confirmarPassword: '',
      terminos: false,
    },

    validationSchema,

    onSubmit: (values) => {
      console.log('Datos del registro:', values);

      const nombreRegistro =
        values.rol === 'fundacion' ? values.nombreFundacion : values.nombre;

      Alert.alert('Registro exitoso', `¡Bienvenido/a ${nombreRegistro}!`, [
        {
          text: 'Iniciar sesión',
          onPress: () => {
            router.replace('/login');
          },
        },
      ]);
    },
  });

  const cambiarRol = (value) => {
    formik.setValues({
      ...formik.values,
      rol: value,
      tipoDocumento: '',
      documento: '',
      nombre: '',
      nombreFundacion: '',
      representanteLegal: '',
      telefono: '',
      ciudadDireccion: '',
    });
    formik.setTouched({});
  };

  const esFundacion = formik.values.rol === 'fundacion';
  const errorRol = formik.touched.rol && formik.errors.rol;
  const errorTipoDoc = formik.touched.tipoDocumento && formik.errors.tipoDocumento;
  const errorTerminos = formik.touched.terminos && formik.errors.terminos;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
        translucent={false}
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ==================================================
              SECCIÓN SUPERIOR: IMAGEN DE FONDO + TEXTO
          ================================================== */}
          <ImageBackground
            source={require('../../assets/perrito.png')}
            style={styles.topHeader}
            imageStyle={styles.headerImage}
            resizeMode="cover"
          >
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>
                {esFundacion ? 'Únete a\nla causa.' : 'Únete a\nnuestra\ncomunidad.'}
              </Text>
              <Text style={styles.welcomeSubtitle}>
                {esFundacion
                  ? 'Tu fundación puede ayudar a cambiar la vida de muchos animales.'
                  : 'Cada registro nos acerca a encontrar un hogar para quienes más lo necesitan.'}
              </Text>
            </View>
          </ImageBackground>

          {/* ==================================================
              CURVA SVG SEPARADORA
          ================================================== */}
          <View style={styles.svgContainer}>
            <Svg height="50" width={width} viewBox={`0 0 ${width} 50`}>
              <Path
                d={`M 0 30 Q ${width * 0.4} 0, ${width * 0.75} 25 T ${width} 15 L ${width} 50 L 0 50 Z`}
                fill={COLORS.cardBg}
              />
            </Svg>
          </View>

          {/* ==================================================
              TARJETA BLANCA DEL FORMULARIO
          ================================================== */}
          <View style={styles.cardContainer}>
            <Text style={styles.title}>
              {esFundacion ? 'Registrar fundación' : 'Crear cuenta'}
            </Text>

            {/* ROL (TARJETAS) */}
            <View style={styles.group}>
              <Text style={styles.label}>Soy:</Text>

              <View style={styles.roleRow}>
                <RoleCard
                  icon="paw"
                  title="Usuario"
                  subtitle="Adoptar y reportar"
                  selected={formik.values.rol === 'usuario'}
                  onPress={() => cambiarRol('usuario')}
                />

                <RoleCard
                  icon="home"
                  title="Fundación"
                  subtitle="Gestionar mascotas"
                  selected={formik.values.rol === 'fundacion'}
                  onPress={() => cambiarRol('fundacion')}
                />
              </View>

              {errorRol && <Text style={styles.error}>{formik.errors.rol}</Text>}
            </View>

            {/* CAMPOS DE USUARIO */}
            {formik.values.rol === 'usuario' && (
              <>
                <View style={styles.group}>
                  <Text style={styles.label}>Tipo de documento</Text>

                  <View
                    style={[
                      styles.pickerContainer,
                      errorTipoDoc && styles.inputError,
                    ]}
                  >
                    <Ionicons
                      name="card-outline"
                      size={20}
                      color={COLORS.inputIcon}
                      style={styles.pickerIcon}
                    />

                    <Picker
                      selectedValue={formik.values.tipoDocumento}
                      onValueChange={(value) =>
                        formik.setFieldValue('tipoDocumento', value)
                      }
                      onBlur={() => formik.setFieldTouched('tipoDocumento', true)}
                      style={styles.picker}
                      dropdownIconColor={COLORS.inputIcon}
                    >
                      <Picker.Item label="Seleccionar tipo" value="" color="#6B7280" />
                      <Picker.Item
                        label="Cédula de ciudadanía"
                        value="cedula_ciudadania"
                        color="#1E1B4B"
                      />
                      <Picker.Item
                        label="Cédula de extranjería"
                        value="cedula_extranjeria"
                        color="#1E1B4B"
                      />
                      <Picker.Item label="PEP" value="pep" color="#1E1B4B" />
                      <Picker.Item
                        label="Permiso por Protección Temporal"
                        value="ppt"
                        color="#1E1B4B"
                      />
                    </Picker>
                  </View>

                  {errorTipoDoc && (
                    <Text style={styles.error}>{formik.errors.tipoDocumento}</Text>
                  )}
                </View>

                <Field
                  formik={formik}
                  name="documento"
                  label="Número de documento"
                  icon="id-card-outline"
                  placeholder="Ingresar número de documento"
                  keyboardType="numeric"
                  maxLength={15}
                />

                <Field
                  formik={formik}
                  name="nombre"
                  label="Nombre de usuario"
                  icon="person-outline"
                  placeholder="Nombre y apellidos"
                  autoCapitalize="words"
                />
              </>
            )}

            {/* CAMPOS DE FUNDACIÓN */}
            {esFundacion && (
              <>
                <Field
                  formik={formik}
                  name="nombreFundacion"
                  label="Nombre de la fundación"
                  icon="business-outline"
                  placeholder="Nombre de la fundación"
                  autoCapitalize="words"
                />

                <Field
                  formik={formik}
                  name="representanteLegal"
                  label="Representante legal"
                  icon="person-outline"
                  placeholder="Nombre del representante legal"
                  autoCapitalize="words"
                />

                <Field
                  formik={formik}
                  name="telefono"
                  label="Teléfono de contacto"
                  icon="call-outline"
                  placeholder="Número de teléfono"
                  keyboardType="phone-pad"
                  maxLength={15}
                />

                <Field
                  formik={formik}
                  name="ciudadDireccion"
                  label="Ciudad / Dirección"
                  icon="location-outline"
                  placeholder="Ciudad y dirección"
                  autoCapitalize="words"
                />
              </>
            )}

            {/* CAMPOS COMUNES */}
            <Field
              formik={formik}
              name="email"
              label="Correo electrónico"
              icon="mail-outline"
              placeholder="Ingresar correo"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <PasswordField
              formik={formik}
              name="password"
              label="Contraseña"
              placeholder="Ingresar contraseña"
            />

            <PasswordField
              formik={formik}
              name="confirmarPassword"
              label="Confirmar contraseña"
              placeholder="Repetir contraseña"
            />

            {/* TÉRMINOS Y CONDICIONES */}
            <TouchableOpacity
              style={styles.remember}
              onPress={() => {
                formik.setFieldValue('terminos', !formik.values.terminos);
                formik.setFieldTouched('terminos', true, false);
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  formik.values.terminos && styles.checkboxActive,
                  errorTerminos && styles.inputError,
                ]}
              >
                {formik.values.terminos && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>

              <Text style={styles.rememberText}>
                Acepto los{' '}
                <Text style={styles.footerLink}>términos de servicio</Text> y la{' '}
                <Text style={styles.footerLink}>política de privacidad</Text>.
              </Text>
            </TouchableOpacity>

            {errorTerminos && (
              <Text style={[styles.error, styles.errorTerminos]}>
                {formik.errors.terminos}
              </Text>
            )}

            {/* BOTÓN CREAR CUENTA */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={formik.handleSubmit}
              activeOpacity={0.85}
              disabled={formik.isSubmitting}
            >
              <Ionicons name="paw" size={20} color="#FFFFFF" />
              <Text style={styles.registerButtonText}>
                {formik.isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.footerLink}>Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
  },

  topHeader: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60,
  },

  headerImage: {
    transform: [{ scale: 1.15 }, { translateX: 25 }],
  },

  welcomeTextContainer: {
    maxWidth: '65%',
    alignItems: 'flex-start',
  },

  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '900',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },

  welcomeSubtitle: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },

  svgContainer: {
    width: '100%',
    height: 50,
    marginTop: -50,
    marginBottom: -1,
    position: 'relative',
  },

  cardContainer: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 40,
  },

  title: {
    color: COLORS.primaryDark,
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
  },

  roleRow: {
    flexDirection: 'row',
    gap: 12,
  },

  roleCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    borderRadius: 16,
  },

  roleCardSelected: {
    backgroundColor: COLORS.roleSelectedBg,
    borderColor: COLORS.roleSelectedBorder,
  },

  roleTitle: {
    color: COLORS.cardSubtext,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 8,
  },

  roleTitleSelected: {
    color: COLORS.primaryDark,
  },

  roleSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'center',
  },

  group: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.cardSubtext,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },

  inputContainer: {
    height: 52,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  inputError: {
    borderColor: COLORS.error,
  },

  inputIcon: {
    marginRight: 10,
  },

  inputWithIcon: {
    flex: 1,
    height: '100%',
    color: COLORS.cardText,
    fontSize: 14,
  },

  passwordContainer: {
    height: 52,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 14,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    color: COLORS.cardText,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },

  pickerContainer: {
    height: 52,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },

  pickerIcon: {
    marginLeft: 16,
    marginRight: 3,
  },

  picker: {
    flex: 1,
    height: 52,
    color: COLORS.cardText,
    backgroundColor: COLORS.inputBg,
  },

  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  errorTerminos: {
    marginTop: -16,
    marginBottom: 16,
  },

  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 11,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  rememberText: {
    flex: 1,
    color: COLORS.cardSubtext,
    fontSize: 13,
    lineHeight: 19,
  },

  registerButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginTop: 24,
    marginBottom: 20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    color: COLORS.cardSubtext,
    fontSize: 13,
    marginRight: 6,
  },

  footerLink: {
    color: COLORS.purpleLink,
    fontSize: 13,
    fontWeight: '700',
  },
});