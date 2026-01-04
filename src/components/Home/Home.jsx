import css from "./Home.module.css";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useMeta from "../../hooks/useMeta";

export default function Home() {
  useMeta({
    title: "Learnlingo – Home",
    description:
      "Start learning languages online with experienced tutors on Learnlingo.",
  });

  const { theme } = useTheme();

  const images = {
    yellow: `${import.meta.env.BASE_URL}yellow_hero_desk_1x.jpg`,
    green: `${import.meta.env.BASE_URL}green_hero_desk_1x.jpg`,
    blue: `${import.meta.env.BASE_URL}blue_hero_desk_1x.jpg`,
    rose: `${import.meta.env.BASE_URL}rose_hero_desk_1x.jpg`,
    peach: `${import.meta.env.BASE_URL}peach_hero_desk_1x.jpg`,
  };

  return (
    <section className={css.section}>
      <div className={css.declaration}>
        <h1 className={css.title}>
          Unlock your potential with the best
          <span> language </span> tutors
        </h1>

        <p className={css.text}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <Link to="/teachers" className={css.button}>
          Get started
        </Link>
      </div>
      <div className={css.imageSection}>
        <img
          src={images[theme] || images.yellow}
          alt="Woman learning languages online"
          className={css.heroImage}
        />
      </div>
    </section>
  );
}
