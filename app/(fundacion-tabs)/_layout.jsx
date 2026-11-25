import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FundacionTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      }}
    >
      {/* PESTAÑAS VISIBLES */}
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Adopciones"
        options={{
          title: 'Adopciones',
          tabBarIcon: ({ color, size }) => <Ionicons name="paw" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Denuncias"
        options={{
          title: 'Denuncias',
          tabBarIcon: ({ color, size }) => <Ionicons name="alert-circle" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Ajustes"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Solicitudes"
        options={{
          title: 'Solicitudes',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
        }}
      />

      {/* PANTALLAS SECUNDARIAS (OCULTAS DE LA BARRA INFERIOR) */}
      <Tabs.Screen
        name="Expedientes"
        options={{
          title: 'Expedientes',
          href: null, // Oculta el ícono en la barra pero mantiene la ruta activa
        }}
      />
      <Tabs.Screen
        name="Proximamente"
        options={{
          title: 'Próximamente',
          href: null,
        }}
      />
    </Tabs>
  );
}
