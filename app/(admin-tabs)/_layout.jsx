// app/(admin-tabs)/_layout.jsx
import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();

  // Si no es admin, lo expulsa al Home común o al Login
  if (user?.role !== 'admin') {
    return <Redirect href="/(tabs)/Home" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="DashboardAdmin" options={{ title: 'Panel Admin' }} />
      {/* Tus pantallas de administrador aquí */}
    </Tabs>
  );
}
