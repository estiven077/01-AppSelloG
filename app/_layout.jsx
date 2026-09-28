import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Contextos
import { MenuProvider } from "../context/menuContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <UserProvider>
        <MenuProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />

            <Stack screenOptions={{ headerShown: false }}>
              {/* Pantallas principales */}
              <Stack.Screen name="(tabs)" />

              {/* Menú drawer en modo modal */}
              <Stack.Screen
                name="drawer"
                options={{
                  presentation: "transparentModal",
                  animation: "fade_from_bottom",
                }}
              />

              <Stack.Screen name="(auth)" />
            </Stack>
          </GestureHandlerRootView>
        </MenuProvider>
      </UserProvider>
    </AuthProvider>
  );
}