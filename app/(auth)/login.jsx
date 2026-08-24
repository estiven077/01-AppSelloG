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

  error: '#ff6b6b',
};




export default function Login() {

  const router = useRouter();

  // Datos del formulario
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Mostrar / ocultar contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);


  // ======================================================
  // CAMBIAR VALORES DEL FORMULARIO
  // ======================================================

  const handleChange = (name, value) => {

    setCredentials({
      ...credentials,
      [name]: value,
    });

  };


  // ======================================================
  // INICIAR SESIÓN
  // ======================================================

  const handleSubmit = () => {

    const email = credentials.email.trim();
    const password = credentials.password.trim();


    // Validar correo vacío
    if (!email) {

      Alert.alert(
        'Campo requerido',
        'Por favor ingresa tu correo electrónico.'
      );

      return;
    }


    // Validar formato del correo
    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {

      Alert.alert(
        'Correo inválido',
        'Por favor ingresa un correo electrónico válido.'
      );

      return;
    }


    // Validar contraseña vacía
    if (!password) {

      Alert.alert(
        'Campo requerido',
        'Por favor ingresa tu contraseña.'
      );

      return;
    }


    // Validar longitud mínima
    if (password.length < 6) {

      Alert.alert(
        'Contraseña inválida',
        'La contraseña debe tener mínimo 6 caracteres.'
      );

      return;
    }


    // ==================================================
    // LOGIN CORRECTO
    // ==================================================

    console.log('Iniciando sesión con:', {
      email,
      password,
      remember: credentials.remember,
    });


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

  };


  // ======================================================
  // RECUPERAR CONTRASEÑA
  // ======================================================

  const handleForgotPassword = () => {

    Alert.alert(
      'Recuperar contraseña',
      'Aquí podrás recuperar tu contraseña cuando conectemos la autenticación.'
    );

  };


  // ======================================================
  // REGISTRO
  // ======================================================

  const handleRegister = () => {

    router.push('/register');

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
                  Cada ingreso nos acerca un paso más
                  a encontrar el hogar perfecto para
                  quienes más lo necesitan.
                </Text>

              </View>

            </View>



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
                  Bienvenido de nuevo a nuestra comunidad
                  de rescate.
                </Text>

              </View>

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
                    style={styles.inputWithIcon}
                    placeholder="Ingresar correo"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={credentials.email}
                    onChangeText={(value) =>
                      handleChange('email', value)
                    }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                </View>

              </View>



             

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


                <View style={styles.passwordContainer}>


                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={COLORS.onSurfaceVariant}
                  />


                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Ingresar contraseña"
                    placeholderTextColor={
                      COLORS.onSurfaceVariant
                    }
                    value={credentials.password}
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



              
              <TouchableOpacity
                style={styles.remember}
                onPress={() =>
                  handleChange(
                    'remember',
                    !credentials.remember
                  )
                }
                activeOpacity={0.7}
              >


                <View
                  style={[
                    styles.checkbox,

                    credentials.remember &&
                      styles.checkboxActive,
                  ]}
                >

                  {credentials.remember && (

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



           

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
                activeOpacity={0.85}
              >

                <Ionicons
                  name="paw"
                  size={21}
                  color={COLORS.onPrimaryContainer}
                />


                <Text style={styles.loginButtonText}>
                  Ingresar
                </Text>

              </TouchableOpacity>



             
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


 
  group: {
    marginBottom: 16,
  },


  label: {
    color: COLORS.onSurfaceVariant,

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
    color: COLORS.primary,

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


 

  remember: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 22,
  },


  checkbox: {
    width: 20,

    height: 20,

    borderWidth: 1,

    borderColor: COLORS.onSurfaceVariant,

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