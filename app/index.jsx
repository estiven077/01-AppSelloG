import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/Home');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141824',
      }}
    >
      <ActivityIndicator
        size="large"
        color="#6c8cff"
      />
    </View>
  );
}