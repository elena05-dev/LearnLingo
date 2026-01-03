import { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "yellow"
  );

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
