import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Teachers from "./pages/Teachers/Teachers";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import Modal from "./components/Modal/Modal";
import { useState, useEffect } from "react";
import { useAuth } from "./context/useAuth";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  const auth = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    console.log("open login modal");
    setIsModalOpen(true);
  };

  const handleCloseLogin = () => {
    setIsModalOpen(false);
  };
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "yellow"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Header auth={auth} onLogin={handleLogin} setTheme={setTheme} />

      {isModalOpen && <Modal onClose={handleCloseLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
