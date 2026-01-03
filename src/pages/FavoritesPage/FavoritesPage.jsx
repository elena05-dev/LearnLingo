import { useState, useEffect } from "react";
import css from "./FavoritesPage.module.css";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { fetchTeachers } from "../../firebase-api";
import useMeta from "../../hooks/useMeta";

export default function FavoritesPage() {
  useMeta({
    title: "Learnlingo – Favorites",
    description:
      "View your favorite language tutors on Learnlingo. Quickly access tutors you have added to your favorites.",
  });

  const [favoriteIds, setFavoriteIds] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);

      try {
        const allTeachers = await fetchTeachers();

        const filtered = allTeachers.filter((teacher) =>
          favoriteIds.includes(teacher.id)
        );

        setFavoriteTeachers(filtered);
      } catch (error) {
        console.error("Failed to load teachers:", error);
      }

      setLoading(false);
    }

    loadFavorites();
  }, [favoriteIds]);

  function handleRemove(id) {
    const updated = favoriteIds.filter((favId) => favId !== id);
    setFavoriteIds(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  if (loading) {
    return <p className={css.loading}>Loading...</p>;
  }

  return (
    <section className={css.page}>
      <div className={css.container}>
        <h2 className={css.title}>My Favorite Teachers</h2>

        {favoriteTeachers.length === 0 ? (
          <p className={css.empty}>You don’t have favorite teachers yet.</p>
        ) : (
          <div className={css.teachersList}>
            {favoriteTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onRemoveFromFavorites={() => handleRemove(teacher.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
