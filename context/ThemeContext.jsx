import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

// PALETA DE COLORES OFICIAL
const lightTheme = {
  primary: "#7C3AED",
  accent: "#C4B5FD",
  background: "#F8FAFC",
  surface: "rgba(255, 255, 255, 0.85)",
  text: "#0F172A",
  success: "#10B981",
  danger: "#E11D48",

  error: "#E11D48",
  warning: "#F59E0B",
  info: "#3B82F6",
  lavender: "#7C3AED",
  onLavender: "#FFFFFF",
  onSurface: "#0F172A",
  onSurfaceVariant: "#475569",
  primaryContainer: "#7C3AED",
  onPrimaryContainer: "#FFFFFF",
};

const darkTheme = {
  primary: "#7C3AED",
  accent: "#C4B5FD",
  background: "#0F172A",
  surface: "rgba(15, 23, 42, 0.75)",
  text: "#FFFFFF",
  success: "#10B981",
  danger: "#E11D48",

  error: "#FB7185",
  warning: "#F59E0B",
  info: "#60A5FA",
  lavender: "#C4B5FD",
  onLavender: "#0F172A",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#94A3B8",
  primaryContainer: "#7C3AED",
  onPrimaryContainer: "#FFFFFF",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState("system");

  const isDark =
    themeMode === "system" ? systemColorScheme === "dark" : themeMode === "dark";
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);