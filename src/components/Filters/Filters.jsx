import FilterDropdown from "../FilterDropdown/FilterDropdown.jsx";
import css from "./Filters.module.css";

export default function Filters({
  languages,
  setLanguages,
  levels,
  setLevels,
  price_per_hour,
  setPrice_per_hour,
}) {
  const priceOptions = [10, 20, 25, 30, 35, 40, 50, 60];

  return (
    <div className={css.filters}>
      <FilterDropdown
        label="Language"
        options={[
          "All",
          "French",
          "English",
          "German",
          "Korean",
          "Italian",
          "Spanish",
          "Mandarin Chinese",
          "Vietnamese",
        ]}
        defaultValue={languages || "All"}
        onChange={(v) => setLanguages(v === "All" ? "" : v)}
        buttonClassName={css.languagesBtn}
      />

      <FilterDropdown
        label="Level"
        options={[
          "All",
          "A1 Beginner",
          "A2 Elementary",
          "B1 Intermediate",
          "B2 Upper-Intermediate",
          "C1 Advanced",
          "C2 Proficient",
        ]}
        defaultValue={levels || "All"}
        onChange={(v) => setLevels(v === "All" ? "" : v)}
        buttonClassName={css.levelBtn}
      />

      <FilterDropdown
        label="Price"
        options={["All", ...priceOptions.map((p) => `$${p}`)]}
        defaultValue={price_per_hour ? `$${price_per_hour}` : "All"}
        onChange={(val) =>
          val === "All"
            ? setPrice_per_hour("")
            : setPrice_per_hour(Number(val.replace("$", "")))
        }
        buttonClassName={css.priceBtn}
      />
    </div>
  );
}
