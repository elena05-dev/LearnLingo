import css from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={css.card}>
      <section className={css.stats}>
        <ul className={css.statsList}>
          <li className={css.statItem}>
            <span className={css.value}>32,000+</span>
            <span className={css.text}>Experienced tutors</span>
          </li>

          <li className={css.statItem}>
            <span className={css.value}>300,000+</span>
            <span className={css.text}>5-star tutor reviews</span>
          </li>

          <li className={css.statItem}>
            <span className={css.value}>120+</span>
            <span className={css.text}>Subjects taught</span>
          </li>

          <li className={css.statItem}>
            <span className={css.value}>200+</span>
            <span className={css.text}>Tutor nationalities</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
