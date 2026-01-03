import { useState, useRef, useEffect } from "react";
import styles from "./FilterDropdown.module.css";

export default function FilterDropdown({
  label,
  options,
  defaultValue = "",
  onChange,
  className,
  buttonClassName,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const toggleOpen = () => setOpen(!open);

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      className={`${styles.dropdown} ${open ? styles.open : ""} ${className}`}
      ref={dropdownRef}
    >
      <div className={styles["dropdown-label"]}>{label}</div>

      <button
        className={`${styles["dropdown-btn"]} ${buttonClassName || ""}`}
        onClick={toggleOpen}
      >
        {selected}
        <span className={`${styles.arrow} ${open ? styles.open : ""}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#121417"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul className={styles["dropdown-menu"]}>
          {options.map((opt) => (
            <li
              key={opt}
              className={styles["dropdown-item"]}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
