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

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

// VALIDACIÓN CON YUP
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio'),

  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
});

// ======================================================
// COMPONENTES REUTILIZABLES
// IMPORTANTE: Definidos fuera de la pantalla principal para 
// evitar que pierdan el foco al escribir en los inputs.
// ======================================================

function Field({ formik, tema, name, label, icon, placeholder, ...inputProps }) {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: tema.cardSubtext }]}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: tema.inputBg, borderColor: tema.inputBorder },
          hasError && styles.inputError,
        ]}
      >
        <Ionicons
          name={icon}
          size={20}
          color={tema.primaryColor}
          style={styles.inputIcon}
        />

        <TextInput
          style={[styles.inputWithIcon, { color: tema.cardText }]}
          placeholder={placeholder}
          placeholderTextColor={tema.cardSubtext}
          value={formik.values[name]}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          {...inputProps}
        />
      </View>

      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </View>
  );
}

function PasswordField({ formik, tema, name, label, placeholder, onForgotPress }) {
  const [visible, setVisible] = useState(false);
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <View style={styles.group}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, { color: tema.cardSubtext }]}>{label}</Text>
        {onForgotPress && (
          <TouchableOpacity onPress={onForgotPress}>
            <Text style={[styles.forgot, { color: tema.primaryColor }]}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={[
          styles.passwordContainer,
          { backgroundColor: tema.inputBg, borderColor: tema.inputBorder },
          hasError && styles.inputError,
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={tema.primaryColor}
        />

        <TextInput
          style={[styles.passwordInput, { color: tema.cardText }]}
          placeholder={placeholder}
          placeholderTextColor={tema.cardSubtext}
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
            color={tema.primaryColor}
          />
        </TouchableOpacity>
      </View>

      {hasError && <Text style={styles.error}>{formik.errors[name]}</Text>}
    </View>
  );
}

// COMPONENTE LOGIN

export default function Login() {
  const router = useRouter();
  const { theme, colors } = useTheme();

  const isDark = theme === 'dark';

  // Variables dinámicas según el tema activo
  const currentBg = isDark ? '#0F172A' : '#3B1578';
  const cardBg = isDark ? '#1e293b' : '#FFFFFF';
  const cardText = isDark ? '#FFFFFF' : '#1E1B4B';
  const cardSubtext = isDark ? '#94a3b8' : '#6B7280';
  const inputBg = isDark ? '#172033' : '#F9FAFB';
  const inputBorder = isDark ? '#334155' : '#E5E7EB';
  const primaryColor = colors.activePurple || '#8B5CF6';

  const tema = {
    isDark,
    cardText,
    cardSubtext,
    inputBg,
    inputBorder,
    primaryColor,
  };

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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: currentBg }]} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={currentBg}
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
          {/* SECCIÓN SUPERIOR */}
          <ImageBackground
            source={require('../../assets/perrito.png')}
            style={styles.topHeader}
            imageStyle={styles.headerImage}
            resizeMode="cover"
          >
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Sello{'\n'}Guardián</Text>
              <Text style={styles.welcomeSubtitle}>
                ¡Bienvenido de nuevo. Inicia sesión para denunciar, adoptar y seguir tus casos
              </Text>
            </View>
          </ImageBackground>

          {/* CURVA SVG SEPARADORA */}
          <View style={styles.svgContainer}>
            <Svg height="50" width={width} viewBox={`0 0 ${width} 50`}>
              <Path
                d={`M 0 30 Q ${width * 0.4} 0, ${width * 0.75} 25 T ${width} 15 L ${width} 50 L 0 50 Z`}
                fill={cardBg}
              />
            </Svg>
          </View>

          {/* TARJETA DEL FORMULARIO */}
          <View style={[styles.cardContainer, { backgroundColor: cardBg }]}>
            <Text style={[styles.title, { color: cardText }]}>Iniciar Sesión</Text>

            {/* CORREO ELECTRÓNICO */}
            <Field
              formik={formik}
              tema={tema}
              name="email"
              label="Correo electrónico"
              icon="mail-outline"
              placeholder="Ingresa tu correo"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* CONTRASEÑA */}
            <PasswordField
              formik={formik}
              tema={tema}
              name="password"
              label="Contraseña"
              placeholder="Ingresar contraseña"
              onForgotPress={handleForgotPassword}
            />

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
                  { borderColor: inputBorder },
                  formik.values.remember && { backgroundColor: primaryColor, borderColor: primaryColor },
                ]}
              >
                {formik.values.remember && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>

              <Text style={[styles.rememberText, { color: cardSubtext }]}>
                Recordarme en este dispositivo
              </Text>
            </TouchableOpacity>

            {/* BOTÓN DE INGRESO */}
            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: primaryColor }]}
              onPress={formik.handleSubmit}
              activeOpacity={0.85}
              disabled={formik.isSubmitting}
            >
              <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
              <Text style={styles.loginButtonText}>
                {formik.isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
              </Text>
            </TouchableOpacity>

            <View style={[styles.divider, { backgroundColor: isDark ? '#334155' : '#F3F4F6' }]} />

            {/* FOOTER */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: cardSubtext }]}>¿No tienes una cuenta?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={[styles.footerLink, { color: primaryColor }]}>Regístrate</Text>
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
    maxWidth: '75%',
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
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
  },
  group: {
    marginBottom: 18,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  forgot: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: '#E11D48',
  },
  inputIcon: {
    marginRight: 10,
  },
  inputWithIcon: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  passwordContainer: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 14,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: '#E11D48',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
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
    borderRadius: 11,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  loginButton: {
    height: 54,
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
    marginTop: 24,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    marginRight: 6,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});