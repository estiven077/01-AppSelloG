import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  surface: "#111414",
  primary: "#6167de",
  onSurfaceVariant: "#bccabc",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.onSurfaceVariant,
        // Ocultamos los textos y centalizamos los iconos
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: "rgba(255,255,255,0.1)",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Adopcion"
        options={{
          title: "Adoptar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paw-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Reportes"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "alert-circle" : "alert-circle-outline"} size={size} color={color} />
          ),
        }}
      />

      {/* Forzarmos a Expo a ocultar el perfil de la barra */}
      <Tabs.Screen
        name="Perfil"
        options={{
          href: null, // Esto rompe el enlace automático y lo borra visualmente
        }}
      />

      <Tabs.Screen
        name="Favoritos"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}