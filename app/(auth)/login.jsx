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
  SafeAreaView,
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useFormik } from 'formik';
import * as Yup from 'yup';

// ======================================================
// PALETA DE COLORES: SELLO GUARDIÁN
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

  success: '#10B981',
  error: '#E11D48',
};

//validacion con yup
const validationSchema = Yup.object().shape({

  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),

});


// componente login
export default function Login() {

  const router = useRouter();

  // Mostrar / ocultar contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);


  // formik
  const formik = useFormik({

    initialValues: {
      email: '',
      password: '',
      remember: false,
    },

    validationSchema,

    onSubmit: (values) => {

      console.log('Iniciando sesión con:', values);

      Alert.alert(
        'Inicio de sesión',
        '¡Inicio de sesión exitoso!',
        [
          {
            text: 'Continuar',
            onPress: () => {
              router.replace('/(tabs)/Home');
            },
          },
        ]
      );

    },

  });

// recuperar contraseña
  const handleForgotPassword = () => {

    Alert.alert(
      'Recuperar contraseña',
      'Aquí podrás recuperar tu contraseña cuando conectemos la autenticación.'
    );

  };

//registro
  const handleRegister = () => {
    router.push('/register');
  };


  return (

    <SafeAreaView style={styles.safeArea}>

      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.surface}
      />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.loginContainer}>

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
                  Tu compromiso cambia vidas.
                </Text>

                <Text style={styles.visualSubtitle}>
                  Cada ingreso nos acerca un paso más a encontrar el hogar
                  perfecto para quienes más lo necesitan.
                </Text>

              </View>

            </View>


            {/* ==================================================
                FORMULARIO
            ================================================== */}

            <View style={styles.formSide}>

              <View style={styles.formHeader}>

                <View style={styles.logoCircle}>

                  <Ionicons
                    name="paw"
                    size={34}
                    color={COLORS.primary}
                  />

                </View>

                <Text style={styles.title}>
                  Iniciar Sesión
                </Text>

                <Text style={styles.subtitle}>
                  Bienvenido de nuevo a nuestra comunidad de rescate.
                </Text>

              </View>


              {/* ==================================================
                  CORREO
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Correo electrónico
                </Text>

                <View
                  style={[
                    styles.inputContainer,
                    formik.touched.email &&
                    formik.errors.email &&
                    styles.inputError
                  ]}
                >

                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.accent}
                    style={styles.inputIcon}
                  />

                  <TextInput
                    style={styles.inputWithIcon}
                    placeholder="Ingresar correo"
                    placeholderTextColor={COLORS.onSurfaceVariant}
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                </View>


                {/* ERROR DEL CORREO */}

                {formik.touched.email &&
                  formik.errors.email && (

                    <Text style={styles.error}>
                      {formik.errors.email}
                    </Text>

                  )}

              </View>


              {/* ==================================================
                  CONTRASEÑA
              ================================================== */}

              <View style={styles.group}>

                <View style={styles.labelRow}>

                  <Text style={styles.label}>
                    Contraseña
                  </Text>

                  <TouchableOpacity
                    onPress={handleForgotPassword}
                  >

                    <Text style={styles.forgot}>
                      ¿Olvidaste tu contraseña?
                    </Text>

                  </TouchableOpacity>

                </View>


                <View
                  style={[
                    styles.passwordContainer,
                    formik.touched.password &&
                    formik.errors.password &&
                    styles.inputError
                  ]}
                >

                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.accent}
                  />

                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Ingresar contraseña"
                    placeholderTextColor={COLORS.onSurfaceVariant}
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    secureTextEntry={!mostrarPassword}
                    autoCapitalize="none"
                  />


                  {/* MOSTRAR / OCULTAR CONTRASEÑA */}

                  <TouchableOpacity
                    onPress={() =>
                      setMostrarPassword(!mostrarPassword)
                    }
                  >

                    <Ionicons
                      name={
                        mostrarPassword
                          ? 'eye-off-outline'
                          : 'eye-outline'
                      }
                      size={21}
                      color={COLORS.accent}
                    />

                  </TouchableOpacity>

                </View>


                {/* ERROR DE CONTRASEÑA */}

                {formik.touched.password &&
                  formik.errors.password && (

                    <Text style={styles.error}>
                      {formik.errors.password}
                    </Text>

                  )}

              </View>


              {/* ==================================================
                  RECORDARME
              ================================================== */}

              <TouchableOpacity
                style={styles.remember}
                onPress={() =>
                  formik.setFieldValue(
                    'remember',
                    !formik.values.remember
                  )
                }
                activeOpacity={0.7}
              >

                <View
                  style={[
                    styles.checkbox,
                    formik.values.remember &&
                    styles.checkboxActive,
                  ]}
                >

                  {formik.values.remember && (

                    <Ionicons
                      name="checkmark"
                      size={14}
                      color={COLORS.onPrimaryContainer}
                    />

                  )}

                </View>

                <Text style={styles.rememberText}>
                  Recordarme en este dispositivo
                </Text>

              </TouchableOpacity>


              {/* ==================================================
                  BOTÓN INGRESAR
              ================================================== */}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={formik.handleSubmit}
                activeOpacity={0.85}
                disabled={formik.isSubmitting}
              >

                <Ionicons
                  name="paw"
                  size={21}
                  color={COLORS.onPrimaryContainer}
                />

                <Text style={styles.loginButtonText}>
                  {formik.isSubmitting
                    ? 'Ingresando...'
                    : 'Ingresar'}
                </Text>

              </TouchableOpacity>


              {/* ==================================================
                  FOOTER
              ================================================== */}

              <View style={styles.footer}>

                <Text style={styles.footerText}>
                  ¿No tienes una cuenta?
                </Text>

                <TouchableOpacity
                  onPress={handleRegister}
                >

                  <Text style={styles.footerLink}>
                    Regístrate aquí
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


const styles = StyleSheet.create({

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

  loginContainer: {
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },



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
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
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



  formSide: {
    padding: 24,
  },

  formHeader: {
    marginBottom: 24,
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 18,
  },

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

  // ======================================================
  // INPUTS
  // ======================================================

  group: {
    marginBottom: 16,
  },

  label: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  forgot: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
  },

  inputContainer: {
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    color: COLORS.onSurface,
    fontSize: 14,
  },

  passwordContainer: {
    height: 50,
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 14,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    color: COLORS.onSurface,
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },

  // ======================================================
  // ERRORES
  // ======================================================

  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  // ======================================================
  // RECORDARME
  // ======================================================

  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  rememberText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },

  // ======================================================
  // BOTÓN
  // ======================================================

  loginButton: {
    height: 52,
    backgroundColor: COLORS.primaryContainer,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 9,
  },

  loginButtonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 15,
    fontWeight: '700',
  },

  // ======================================================
  // FOOTER
  // ======================================================

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.cardBorder,
    marginTop: 20,
    paddingTop: 18,
  },

  footerText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginRight: 4,
  },

  footerLink: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
  },

});