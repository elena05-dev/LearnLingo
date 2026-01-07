import { useState, useEffect } from "react";
import css from "./Teachers.module.css";
import { fetchTeachers } from "../../firebase-api";
import Filters from "../../components/Filters/Filters";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import useMeta from "../../hooks/useMeta";
import { FiFilter } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export default function TeachersPage() {
  useMeta({
    title: "Learnlingo – Teachers",
    description:
      "Browse experienced language tutors on Learnlingo. Filter by language, student level, and lesson price per hour.",
  });

  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const [step, setStep] = useState(4);

  const [languages, setLanguages] = useState("");
  const [levels, setLevels] = useState("");
  const [price_per_hour, setPrice_per_hour] = useState("");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const updateStep = () => {
      const width = window.innerWidth;

      let newStep = 4;
      if (width < 768) newStep = 2;
      else if (width < 1200) newStep = 3;

      setStep(newStep);
      setVisibleCount(newStep);
    };

    updateStep();
    window.addEventListener("resize", updateStep);

    return () => window.removeEventListener("resize", updateStep);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isFiltersOpen) {
      const scrollY = window.scrollY;
      body.classList.add(css.noScroll);
      body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = parseInt(body.style.top || "0") * -1;
      body.classList.remove(css.noScroll);
      body.style.top = "";
      window.scrollTo(0, scrollY);
    }
  }, [isFiltersOpen]);

  useEffect(() => {
    async function getTeachers() {
      const data = await fetchTeachers();
      setTeachers(data);
      setLoading(false);
    }
    getTeachers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (teachers.length === 0) return <p>No teachers found.</p>;

  const filteredTeachers = teachers.filter((t) => {
    const matchLang = !languages || t.languages.includes(languages);
    const matchLevel = !levels || t.levels.includes(levels);
    const matchPrice = !price_per_hour || t.price_per_hour <= price_per_hour;
    return matchLang && matchLevel && matchPrice;
  });

  const openFilters = () => setIsFiltersOpen(true);
  const closeFilters = () => setIsFiltersOpen(false);
  const loadMore = () => setVisibleCount((prev) => prev + step);

  return (
    <section className={css.teachers}>
      <Toaster position="top-right" />
      <div className={css.container}>
        <button className={css.filtersToggle} onClick={openFilters}>
          <FiFilter className={css.filterIcon} />
          Filters
        </button>

        <div className={css.filtersDesktop}>
          <Filters
            languages={languages}
            setLanguages={setLanguages}
            levels={levels}
            setLevels={setLevels}
            price_per_hour={price_per_hour}
            setPrice_per_hour={setPrice_per_hour}
          />
        </div>

        {isFiltersOpen && (
          <>
            <div className={css.overlay} onClick={closeFilters}></div>
            <div className={css.filtersDrawer}>
              <div className={css.drawerHeader}>
                <h3>Filters</h3>
                <button onClick={closeFilters}>✕</button>
              </div>
              <div className={css.drawerContent}>
                <Filters
                  languages={languages}
                  setLanguages={setLanguages}
                  levels={levels}
                  setLevels={setLevels}
                  price_per_hour={price_per_hour}
                  setPrice_per_hour={setPrice_per_hour}
                />
              </div>
              <button className={css.applyBtn} onClick={closeFilters}>
                Apply filters
              </button>
            </div>
          </>
        )}

        <div className={css.teachersList}>
          {filteredTeachers.length > 0 ? (
            filteredTeachers
              .slice(0, visibleCount)
              .map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onRequireLogin={() =>
                    toast.error("Please log in to use this feature")
                  }
                />
              ))
          ) : (
            <p>No teachers found for the selected filters</p>
          )}
        </div>

        {visibleCount < filteredTeachers.length && (
          <button className={css.btnLoadMore} onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
