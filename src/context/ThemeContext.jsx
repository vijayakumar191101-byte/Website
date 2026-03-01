import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // theme: "light" | "dark" | "system"
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const resolvedTheme = useMemo(() => {
    return theme === "system" ? getSystemTheme() : theme;
  }, [theme]);

  // Apply HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [resolvedTheme]);

  // Persist user preference (light/dark/system)
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // If theme=system, listen for OS changes
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => setTheme((t) => t); // trigger refresh

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};