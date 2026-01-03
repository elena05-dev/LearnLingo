import { useContext, useState } from "react";
import ThemeContext from "../../context/ThemeContext";
import { FaPalette } from "react-icons/fa";
import css from "./ThemeSwitcher.module.css";

export default function ThemeSwitcher() {
  const { setTheme, theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const themes = [
    { name: "yellow", color: "#F4C550" },
    { name: "green", color: "#9FBAAE" },
    { name: "blue", color: "#9FB7CE" },
    { name: "rose", color: "#E0A39A" },
    { name: "peach", color: "#F0AA8D" },
  ];

  return (
    <div className={css.switcher}>
      <button
        className={css.paletteButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open theme switcher"
      >
        <FaPalette size={24} />
      </button>

      {open && (
        <div className={css.colorOptions}>
          {themes.map((t) => (
            <button
              key={t.name}
              className={`${css.colorButton} ${
                theme === t.name ? css.active : ""
              }`}
              style={{ backgroundColor: t.color }}
              onClick={() => {
                setTheme(t.name);
                setOpen(false);
              }}
              aria-label={`Switch to ${t.name} theme`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
