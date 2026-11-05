import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Paletas de colores para ambos modos
export const THEMES = {
  // Modo oscuro
  dark: {
    background: "#0A0C0E",
    surface: "#12161A",
    activePurple: "#A855F7",
    accent: "#C084FC",
    textLight: "#F8FAFC",
    textMuted: "#CBD5E1",
    border: "#242A30",

    navbar: "#0F172A",
    footer: "#0D1015",
    drawer: "#0A0C0E", 
  },
  // Modo claro 
  light: {
    background: "#F1F5F9",
    surface: "#FFFFFF",
    activePurple: "#9333EA",
    accent: "#A855F7",
    textLight: "#0F172A",
    textMuted: "#64748B",
    border: "#E2E8F0",

    navbar: "#ede8f4",
    footer: "#ede8f4",
    drawer: "#EDE8F4",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const colors = THEMES[theme];

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("app_theme");
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error("Error cargando el tema:", error);
    }
  };

  const toggleTheme = async (isDark) => {
    try {
      const newTheme = isDark ? "dark" : "light";
      setTheme(newTheme);
      await AsyncStorage.setItem("app_theme", newTheme);
    } catch (error) {
      console.error("Error guardando el tema:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);