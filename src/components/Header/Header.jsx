import { Link } from "react-router-dom";
import css from "./Header.module.css";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openRegister = () => setShowRegister(true);
  const closeRegister = () => setShowRegister(false);

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link to="/" className={css.headerLogoWrapper}>
          <svg
            src="./icons.svg#icon-ukraine"
            className={css.headerLogo}
            width="32"
            height="32"
            aria-label="Logo"
          >
            <use href="./icons.svg#icon-ukraine"></use>
          </svg>
          <span className={css.logoText}>LearnLingo</span>
        </Link>

        <button
          className={css.burger}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg className={css.open} width="24" height="24">
            <use href="./icons.svg#icon-menu" />
          </svg>
        </button>

        <nav className={css.nav}>
          <ul className={css.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/teachers">Teachers</Link>
            </li>{" "}
            {user && (
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className={css.headerThemeSwitcher}>
          <ThemeSwitcher />
        </div>

        <div className={css.auth}>
          {!user ? (
            <>
              <button className={css.btnLogin} onClick={openLogin}>
                <FiLogIn
                  color="var(--color-primary)"
                  size={18}
                  style={{ marginRight: "0.3rem" }}
                />
                Log in
              </button>

              <button className={css.btnRegister} onClick={openRegister}>
                Register
              </button>
            </>
          ) : (
            <>
              <button className={css.btnLogin} onClick={logout}>
                <FiLogOut
                  color="var(--color-primary)"
                  size={18}
                  style={{ marginRight: "0.3rem" }}
                />
                Log out
              </button>

              <div className={css.userGreeting}>
                <AiOutlineUser size={20} style={{ marginRight: "0.3rem" }} />
                Hi, {user.name || user.email}
              </div>
            </>
          )}
        </div>

        {showLogin && (
          <Modal onClose={closeLogin}>
            <LoginForm onClose={closeLogin} />
          </Modal>
        )}

        {showRegister && (
          <Modal onClose={closeRegister}>
            <RegistrationForm onClose={closeRegister} />
          </Modal>
        )}
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        user={user}
        openLogin={openLogin}
        openRegister={openRegister}
        logout={logout}
      />
    </header>
  );
}
