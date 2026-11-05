import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import { styles, TAB_BAR_WIDTH } from "../styles/CustomTabBar"; 

const ICONS = {
  Home: { active: "home", inactive: "home-outline" },
  Adopcion: { active: "paw", inactive: "paw-outline" },
  Reportes: { active: "alert-circle", inactive: "alert-circle-outline" },
  Favoritos: { active: "heart", inactive: "heart-outline" },
};

export function CustomTabBar({ state, descriptors, navigation }) {
  const visibleRoutes = state.routes.filter(
    (route) => descriptors[route.key].options.href !== null
  );

  const TAB_WIDTH = TAB_BAR_WIDTH / visibleRoutes.length;
  const activeIndex = visibleRoutes.findIndex((r) => r.key === state.routes[state.index].key);

  const translateX = useSharedValue(0);

  useEffect(() => {
    const targetIndex = activeIndex >= 0 ? activeIndex : 0;
    translateX.value = withSpring(targetIndex * TAB_WIDTH, {
      damping: 18,
      stiffness: 120,
    });
  }, [activeIndex, TAB_WIDTH]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.activeIndicator,
          { width: TAB_WIDTH - 12, marginHorizontal: 6 },
          animatedIndicatorStyle,
        ]}
      />

      {visibleRoutes.map((route) => {
        const isFocused = state.index === state.routes.findIndex((r) => r.key === route.key);
        const iconData = ICONS[route.name] || { active: "ellipse", inactive: "ellipse-outline" };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            style={styles.tabButton}
          >
            <View style={isFocused ? styles.activeIconWrapper : null}>
              <Ionicons
                name={isFocused ? iconData.active : iconData.inactive}
                size={22}
                color={isFocused ? "#ffffff" : "#bccabc"}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}