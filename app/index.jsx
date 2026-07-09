import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const segments = useSegments();
  const router = useRouter();
  // Cambia esta variable a 'true' para simular usuario logueado
  const isAuthenticated = false;

  useEffect(() => {
    if (!isAuthenticated && segments[0] !== '(auth)') {
      router.replace('/login');
    } else if (isAuthenticated && segments[0] === '(auth)') {
      router.replace('/home');
    }
  }, [isAuthenticated, segments]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#141824' }}>
      <ActivityIndicator size="large" color="#6c8cff" />
    </View>
  );
}