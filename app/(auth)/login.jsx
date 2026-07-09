import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Iniciar sesión</Text>
      <Button title="Ingresar (simular login)" onPress={() => router.replace('/home')} />
      <Button title="Ir a Registro" onPress={() => router.push('/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#141824' },
  title: { fontSize: 28, fontWeight: '700', color: '#eef2f8', marginBottom: 24 },
});