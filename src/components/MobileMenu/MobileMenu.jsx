import { Link } from "react-router-dom";
import css from "./MobileMenu.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function MobileMenu({
  isOpen,
  onClose,
  user,
  openLogin,
  openRegister,
  logout,
}) {
  return (
    <nav className={`${css.nav} ${isOpen ? css.open : ""}`}>
      <button className={css.closeBtn} onClick={onClose}>
        <svg width="24" height="24" aria-label="close">
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <ul className={css.navList}>
        <li>
          <Link to="/" onClick={onClose}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/teachers" onClick={onClose}>
            Teachers
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/favorites" onClick={onClose}>
              Favorites
            </Link>
          </li>
        )}

        <li>
          {!user ? (
            <>
              <button
                className={css.mobileBtn}
                onClick={() => {
                  openLogin();
                  onClose();
                }}
              >
                Log in
              </button>
              <button
                className={css.mobileBtn}
                onClick={() => {
                  openRegister();
                  onClose();
                }}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                className={css.mobileBtn}
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                Log out
              </button>
              <p className={css.userGreeting}>Hi, {user.name || user.email}</p>
            </>
          )}
        </li>
      </ul>

      <div className={css.mobileThemeSwitcher}>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
