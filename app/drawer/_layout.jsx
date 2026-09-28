import React from "react";
import { Drawer } from "expo-router/drawer";

import DrawerMenu from "./DrawerMenu";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        name="MisCasos"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="SobreNosotros"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="settings"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />

      <Drawer.Screen
        name="Privacidad"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}