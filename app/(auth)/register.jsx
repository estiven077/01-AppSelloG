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


// ======================================================
// COLORES
// ======================================================

const COLORS = {
  primary: '#61de8a',
  primaryContainer: '#27ae60',
  onPrimaryContainer: '#00391a',

  surface: '#111414',
  onSurface: '#e1e3e2',
  onSurfaceVariant: '#bccabc',

  cardBg: 'rgba(255, 255, 255, 0.06)',
  cardBorder: 'rgba(255, 255, 255, 0.14)',

  inputBg: 'rgba(17, 20, 20, 0.6)',
  inputBorder: 'rgba(255, 255, 255, 0.1)',
};


// ======================================================
// REGISTRO
// ======================================================

export default function RegisterScreen() {

  const router = useRouter();


  // Datos del formulario
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  // Mostrar contraseñas
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] =
    useState(false);


  // ======================================================
  // CAMBIAR DATOS
  // ======================================================

  const handleChange = (name, value) => {

    setForm({
      ...form,
      [name]: value,
    });

  };


  // ======================================================
  // CREAR CUENTA
  // ======================================================

  const handleRegister = () => {

    const name = form.name.trim();
    const email = form.email.trim();
    const password = form.password.trim();
    const confirmPassword = form.confirmPassword.trim();


    // Nombre
    if (!name) {

      Alert.alert(
        'Campo requerido',
        'Por favor ingresa tu nombre completo.'
      );

      return;
    }


    // Correo
    if (!email) {

      Alert.alert(
        'Campo requerido',
        'Por favor ingresa tu correo electrónico.'
      );

      return;
    }


    // Validar correo
    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {

      Alert.alert(
        'Correo inválido',
        'Por favor ingresa un correo electrónico válido.'
      );

      return;
    }


    // Contraseña
    if (!password) {

      Alert.alert(
        'Campo requerido',
        'Por favor ingresa una contraseña.'
      );

      return;
    }


    // Longitud contraseña
    if (password.length < 6) {

      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener mínimo 6 caracteres.'
      );

      return;
    }


    // Confirmar contraseña
    if (!confirmPassword) {

      Alert.alert(
        'Campo requerido',
        'Por favor confirma tu contraseña.'
      );

      return;
    }


    // Comparar contraseñas
    if (password !== confirmPassword) {

      Alert.alert(
        'Contraseñas diferentes',
        'Las contraseñas no coinciden.'
      );

      return;
    }


    // ==================================================
    // REGISTRO CORRECTO
    // ==================================================

    console.log('Registrando usuario:', {
      name,
      email,
      password,
    });


    Alert.alert(
      '¡Registro exitoso!',
      'Tu cuenta ha sido creada correctamente.',
      [
        {
          text: 'Ir al Login',
          onPress: () => {
            router.replace('/login');
          },
        },
      ]
    );

  };


  // ======================================================
  // VOLVER AL LOGIN
  // ======================================================

  const handleBackToLogin = () => {

    router.back();

  };


  // ======================================================
  // INTERFAZ
  // ======================================================

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
                  Únete a nuestra comunidad.
                </Text>


                <Text style={styles.visualSubtitle}>
                  Crea tu cuenta y ayúdanos a cambiar
                  la vida de quienes más lo necesitan.
                </Text>

              </View>

            </View>



            {/* ==================================================
                FORMULARIO
            ================================================== */}

            <View style={styles.formSide}>


              {/* ENCABEZADO */}

              <View style={styles.formHeader}>

                <View style={styles.logoCircle}>

                  <Ionicons
                    name="paw"
                    size={34}
                    color={COLORS.primary}
                  />

                </View>


                <Text style={styles.title}>
                  Crear cuenta
                </Text>


                <Text style={styles.subtitle}>
                  Regístrate para formar parte de nuestra
                  comunidad de rescate.
                </Text>

              </View>



              {/* ==================================================
                  NOMBRE
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Nombre completo
                </Text>


                <View style={styles.inputContainer}>

                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={COLORS.onSurfaceVariant}
                    style={styles.inputIcon}
                  />


                  <TextInput
                    style={styles.input}
                    placeholder="Ingresa tu nombre"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={form.name}
                    onChangeText={(value) =>
                      handleChange('name', value)
                    }
                    autoCapitalize="words"
                  />

                </View>

              </View>



              {/* ==================================================
                  CORREO
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Correo electrónico
                </Text>


                <View style={styles.inputContainer}>

                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={COLORS.onSurfaceVariant}
                    style={styles.inputIcon}
                  />


                  <TextInput
                    style={styles.input}
                    placeholder="Ingresar correo"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={form.email}
                    onChangeText={(value) =>
                      handleChange('email', value)
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                </View>

              </View>



              {/* ==================================================
                  CONTRASEÑA
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Contraseña
                </Text>


                <View style={styles.passwordContainer}>


                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.onSurfaceVariant}
                  />


                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Crear contraseña"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={form.password}
                    onChangeText={(value) =>
                      handleChange('password', value)
                    }
                    secureTextEntry={!mostrarPassword}
                    autoCapitalize="none"
                  />


                  <TouchableOpacity
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
                      color={COLORS.onSurfaceVariant}
                    />

                  </TouchableOpacity>

                </View>

              </View>



              {/* ==================================================
                  CONFIRMAR CONTRASEÑA
              ================================================== */}

              <View style={styles.group}>

                <Text style={styles.label}>
                  Confirmar contraseña
                </Text>


                <View style={styles.passwordContainer}>


                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.onSurfaceVariant}
                  />


                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar tu contraseña"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={form.confirmPassword}
                    onChangeText={(value) =>
                      handleChange(
                        'confirmPassword',
                        value
                      )
                    }
                    secureTextEntry={
                      !mostrarConfirmPassword
                    }
                    autoCapitalize="none"
                  />


                  <TouchableOpacity
                    onPress={() =>
                      setMostrarConfirmPassword(
                        !mostrarConfirmPassword
                      )
                    }
                  >

                    <Ionicons
                      name={
                        mostrarConfirmPassword
                          ? 'eye-off-outline'
                          : 'eye-outline'
                      }
                      size={21}
                      color={COLORS.onSurfaceVariant}
                    />

                  </TouchableOpacity>

                </View>

              </View>



              {/* ==================================================
                  BOTÓN REGISTRARSE
              ================================================== */}

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                activeOpacity={0.85}
              >

                <Ionicons
                  name="person-add-outline"
                  size={21}
                  color={COLORS.onPrimaryContainer}
                />


                <Text style={styles.registerButtonText}>
                  Crear cuenta
                </Text>

              </TouchableOpacity>



              {/* ==================================================
                  VOLVER AL LOGIN
              ================================================== */}

              <View style={styles.footer}>

                <Text style={styles.footerText}>
                  ¿Ya tienes una cuenta?
                </Text>


                <TouchableOpacity
                  onPress={handleBackToLogin}
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
  // CONTENEDOR
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
    height: 190,
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
      'rgba(13, 20, 16, 0.75)',
  },


  visualTitle: {
    color: COLORS.primary,

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
  // ICONO
  // ====================================================

  logoCircle: {
    width: 68,
    height: 68,

    borderRadius: 34,

    borderWidth: 2,

    borderColor: COLORS.primary,

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
  // CAMPOS
  // ====================================================

  group: {
    marginBottom: 16,
  },


  label: {
    color: COLORS.onSurfaceVariant,

    fontSize: 12,

    fontWeight: '600',

    marginBottom: 8,
  },


  // ====================================================
  // INPUT
  // ====================================================

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


  inputIcon: {
    marginRight: 10,
  },


  input: {
    flex: 1,

    height: '100%',

    color: COLORS.onSurface,

    fontSize: 14,
  },


  // ====================================================
  // PASSWORD
  // ====================================================

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


  // ====================================================
  // BOTÓN REGISTRO
  // ====================================================

  registerButton: {
    height: 52,

    backgroundColor: COLORS.primaryContainer,

    borderRadius: 12,

    justifyContent: 'center',

    alignItems: 'center',

    flexDirection: 'row',

    gap: 9,

    marginTop: 4,
  },


  registerButtonText: {
    color: COLORS.onPrimaryContainer,

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
    color: COLORS.primary,

    fontSize: 12,

    fontWeight: '700',
  },

});