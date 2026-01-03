import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import css from "./TeacherCard.module.css";
import { FiBookOpen, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Modal from "../Modal/Modal";
import ContactForm from "../ContactForm/ContactForm";

export default function TeacherCard({ teacher }) {
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    return favs.includes(teacher.id);
  });

  const [showDetails, setShowDetails] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleFavorite = () => {
    if (!user) {
      alert("Please log in to add favorites");
      return;
    }

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favs.includes(teacher.id)) {
      const updated = favs.filter((id) => id !== teacher.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      const updated = [...favs, teacher.id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(true);
    }
  };

  const toggleDetails = () => setShowDetails((s) => !s);
  const openContactForm = () => setShowContactForm(true);
  const closeContactForm = () => setShowContactForm(false);

  const handleBookTrial = () => {
    if (!user) {
      alert("Please log in to book a trial lesson");
      return;
    }
    openContactForm();
  };

  return (
    <section className={css.card}>
      <div className={css.cardInner}>
        <div className={css.imgAvatar}>
          <svg viewBox="0 0 12 12" className={css.onlineIcon}>
            <use href="./icons.svg#icon-Group-82" />
          </svg>
          <img
            src={teacher.avatar_url}
            alt={`${teacher.name} ${teacher.surname}`}
            className={css.avatar}
          />
        </div>

        <div className={css.info}>
          <div className={css.teacherInfo}>
            <div className={css.languagesName}>
              <p className={css.languages}>Languages</p>
              <h3 className={css.name}>
                {teacher.name} {teacher.surname}
              </h3>
            </div>

            <nav className={css.lessonActions}>
              <ul className={css.allAboutLesson}>
                <li className={css.lessonsOnline}>
                  <FiBookOpen
                    style={{ marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Lessons online
                </li>

                <li className={css.lessons_done}>
                  Lessons done: {teacher.lessons_done}
                </li>
                <li className={css.rating}>
                  <svg viewBox="0 0 20 20" className={css.star}>
                    <use href="./icons.svg#icon-Star-2" />
                  </svg>
                  Rating: {teacher.rating}
                </li>
                <li className={css.price}>
                  Price 1/hour:
                  <span className={css.priceValue}>
                    ${teacher.price_per_hour}
                  </span>
                </li>
              </ul>

              <button className={css.heartBtn} onClick={toggleFavorite}>
                {isFavorite ? (
                  <FaHeart className={`${css.heartIcon} ${css.heartActive}`} />
                ) : (
                  <FiHeart className={css.heartIcon} />
                )}
              </button>
            </nav>
          </div>
          <p className={css.text}>
            <span className={css.label}>Speaks:</span>{" "}
            {teacher.languages.join(", ")}
          </p>
          <p className={css.text}>
            <span className={css.label}>Lesson Info:</span>{" "}
            {teacher.lesson_info}
          </p>
          <p className={css.text}>
            <span className={css.label}>Conditions:</span>{" "}
            {teacher.conditions.join(", ")}
          </p>
          <button onClick={toggleDetails} className={css.btn}>
            {showDetails ? "Hide details" : "Read more"}
          </button>
          {showDetails && (
            <div className={css.details}>
              <p> {teacher.experience}</p>
              <p>
                {teacher.reviews.map((r, i) => (
                  <span className={css.comments} key={i}>
                    {r.comment} ({r.reviewer_name});{" "}
                  </span>
                ))}
              </p>
            </div>
          )}
          <div className={css.levels}>
            {teacher.levels.map((level, index) => (
              <span
                key={index}
                className={`${css.levelBadge} ${
                  index === 0 ? css.activeLevel : ""
                }`}
              >
                {level}
              </span>
            ))}
          </div>

          {showDetails && (
            <button className={css.btnBook} onClick={handleBookTrial}>
              Book trial lesson
            </button>
          )}

          {showContactForm && (
            <Modal onClose={closeContactForm}>
              <ContactForm teacher={teacher} onClose={closeContactForm} />
            </Modal>
          )}
        </div>
      </div>
    </section>
  );
}
