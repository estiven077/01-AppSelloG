import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Registro</Text>
      <Button title="Volver al Login" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#141824' },
  title: { fontSize: 28, fontWeight: '700', color: '#eef2f8', marginBottom: 24 },
});