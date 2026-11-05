import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Contextos
import { MenuProvider } from "../context/menuContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext"; // 1. Importamos el ThemeProvider (y useTheme si lo necesitas aquí)

// Componente interno opcional para sincronizar el StatusBar dinámicamente con el tema
function RootNavigation() {
  const { theme } = useTheme();

  return (
    <>
      {/* El StatusBar cambia a 'light' o 'dark' según el tema global */}
      <StatusBar style={theme === "dark" ? "light" : "dark"} />

      <Stack screenOptions={{ headerShown: false }}>
        {/* Pantallas principales */}
        <Stack.Screen name="(tabs)" />

        {/* Menú drawer en modo modal */}
        <Stack.Screen
          name="drawer"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            contentStyle: { backgroundColor: "transparent" },
          }}
        />

        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (

    <AuthProvider>
      <UserProvider>
        <MenuProvider>

          <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootNavigation />
            </GestureHandlerRootView>
          </ThemeProvider>
        </MenuProvider>
      </UserProvider>
    </AuthProvider>
  );
}