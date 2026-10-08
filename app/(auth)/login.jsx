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
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const { width } = Dimensions.get('window');

// ======================================================
// PALETA DE COLORES
// ======================================================

const COLORS = {
  primary: '#8B5CF6',          // Morado principal para botones
  primaryDark: '#1E1B4B',      // Morado oscuro para títulos
  background: '#3B1578',       // Fondo morado (status bar / safe area)

  cardBg: '#FFFFFF',           // Fondo blanco del formulario
  cardText: '#1E1B4B',         // Texto principal dentro del formulario
  cardSubtext: '#6B7280',      // Texto secundario

  inputBg: '#F9FAFB',          // Fondo de los inputs
  inputBorder: '#E5E7EB',      // Borde suave de inputs
  inputIcon: '#A78BFA',        // Iconos de los campos

  purpleLink: '#7C3AED',       // Enlaces morados
  error: '#E11D48',
};

// Validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

export default function Login() {
  const router = useRouter();
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Iniciando sesión con:', values);
      Alert.alert('Inicio de sesión', '¡Inicio de sesión exitoso!', [
        {
          text: 'Continuar',
          onPress: () => {
            router.replace('/(tabs)/Home');
          },
        },
      ]);
    },
  });

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar contraseña',
      'Aquí podrás recuperar tu contraseña cuando conectemos la autenticación.'
    );
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <View style={styles.safeArea}>
    <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
    />

      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
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
              <Text style={styles.welcomeTitle}>Sello{'\n'}Guardián</Text>
              <Text style={styles.welcomeSubtitle}>
                ¡Bienvenido de nuevo a nuestra comunidad de rescate!
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
              CONTENEDOR DEL FORMULARIO (TARJETA BLANCA)
          ================================================== */}
          <View style={styles.cardContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {/* CAMPO: CORREO ELECTRÓNICO */}
            <View style={styles.group}>
              <Text style={styles.label}>Correo electrónico</Text>

              <View
                style={[
                  styles.inputContainer,
                  formik.touched.email && formik.errors.email && styles.inputError,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.inputIcon}
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="Ingresar correo"
                  placeholderTextColor="#9CA3AF"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {formik.touched.email && formik.errors.email && (
                <Text style={styles.error}>{formik.errors.email}</Text>
              )}
            </View>

            {/* CAMPO: CONTRASEÑA */}
            <View style={styles.group}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Contraseña</Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.passwordContainer,
                  formik.touched.password &&
                    formik.errors.password &&
                    styles.inputError,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.inputIcon}
                />

                <TextInput
                  style={styles.passwordInput}
                  placeholder="Ingresar contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  secureTextEntry={!mostrarPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  onPress={() => setMostrarPassword(!mostrarPassword)}
                >
                  <Ionicons
                    name={mostrarPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={21}
                    color={COLORS.inputIcon}
                  />
                </TouchableOpacity>
              </View>

              {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
              )}
            </View>

            {/* RECORDARME */}
            <TouchableOpacity
              style={styles.remember}
              onPress={() =>
                formik.setFieldValue('remember', !formik.values.remember)
              }
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  formik.values.remember && styles.checkboxActive,
                ]}
              >
                {formik.values.remember && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>

              <Text style={styles.rememberText}>
                Recordarme en este dispositivo
              </Text>
            </TouchableOpacity>

            {/* BOTÓN DE INGRESO */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={formik.handleSubmit}
              activeOpacity={0.85}
              disabled={formik.isSubmitting}
            >
              <Ionicons name="paw" size={20} color="#FFFFFF" />
              <Text style={styles.loginButtonText}>
                {formik.isSubmitting ? 'Ingresando...' : 'Ingresar'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.footerLink}>Regístrate aquí</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

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
    justifyContent: 'flex-end',
  },

  // ======================================================
  // SECCIÓN SUPERIOR: IMAGEN DE FONDO Y BIENVENIDA
  // ======================================================
  topHeader: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 60, // espacio para la curva blanca
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
    fontSize: 37,
    lineHeight: 42,
    fontWeight: '900',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },

  welcomeSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },

  // ======================================================
  // CURVA SVG
  // ======================================================
  svgContainer: {
    width: '100%',
    height: 50,
    marginTop: -50, // sube la curva sobre la imagen
    marginBottom: -1,
    position: 'relative',
  },

  // ======================================================
  // CONTENEDOR BLANCO
  // ======================================================
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

  // ======================================================
  // INPUTS
  // ======================================================
  group: {
    marginBottom: 18,
  },

  label: {
    color: COLORS.cardSubtext,
    fontSize: 13,
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
    color: COLORS.purpleLink,
    fontSize: 12,
    fontWeight: '600',
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

  error: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  // ======================================================
  // CHECKBOX Y BOTÓN
  // ======================================================
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  rememberText: {
    color: COLORS.cardSubtext,
    fontSize: 13,
  },

  loginButton: {
    height: 54,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  loginButtonText: {
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

  // ======================================================
  // FOOTER
  // ======================================================
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