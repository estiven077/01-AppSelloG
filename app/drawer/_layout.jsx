import { Stack } from "expo-router";

export default function DrawerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: "transparent" },
      }}
    />
  );
}