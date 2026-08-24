import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MenuProvider } from "../context/menuContext";
import { GestureHandlerRootView } from "react-native-gesture-handler"; 

export default function RootLayout() {
  return (
    <MenuProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        
        <Stack screenOptions={{ headerShown: false }}>
          {/* Declaramos tus módulos como pantallas independientes */}
          <Stack.Screen name="(tabs)" />
          
          {/* Hacemos que la carpeta drawer se comporte como un menú modal vertical */}
          <Stack.Screen 
            name="drawer" 
            options={{ 
              presentation: "transparentModal", // 🌟 Esto hace que flote sobre el Home
              animation: "fade_from_bottom"
            }} 
          />
          
          <Stack.Screen name="(auth)" />
        </Stack>
      </GestureHandlerRootView>
    </MenuProvider>
  );
}
