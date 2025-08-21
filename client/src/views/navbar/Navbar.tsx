import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useHideAndShowNavBarContextContext } from "../layout/HideAndShowNavBarProvider";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isVisible, setIsVisible } = useHideAndShowNavBarContextContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const hrefActual = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleHide = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).dataset.href;
    if (href === hrefActual.pathname) {
      return;
    }
    if (!href) return;
    setIsVisible(false);
    setTimeout(() => {
      navigate(href);
    }, 600);
  };

  const toggleNavbar = () => {
    setShowNavBar(!showNavBar);
  };

  const handleModalWindowMyProjects = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`${styles.navBar} ${isLoaded ? styles.loaded : ""} ${
          showNavBar ? styles.visible : styles.hidden
        }`}
        id="navBar"
      >
        <div
          className={`${styles.flex_buttons} ${
            showNavBar ? styles.visible : styles.show
          } `}
        >
          <a data-href="/cvInfo" onClick={handleHide}>
            Mon CV
          </a>
          <a data-href="/cvInfo" onClick={handleModalWindowMyProjects}>
            Testez mes projets
          </a>
          <a data-href="/cvInfo" onClick={handleHide}>
            Contacts
          </a>
          <a data-href="/cvInfo" onClick={handleHide}>
            Sosal?
          </a>
        </div>
        <button
          className={`${styles.handleButton} ${
            showNavBar ? styles.buttonUp : styles.buttonDown
          }`}
          onClick={toggleNavbar}
        >
          ᐁ
        </button>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2>Mes Projets</h2>
            <div className={styles.projects}>
              <div className={styles.project_div}>
                <h3>Magasin de fleurs</h3>
                <p>
                  Boutique en ligne de fleurs: j'ai seulement ajouté la page
                  d'accueil, le panier et le panneau d'administration
                  (uniquement pour une démonstration visuelle).
                </p>
                <button>TESTER</button>
              </div>

              <div className={styles.project_div}>
                <h3>Portfolio React</h3>
                <p>
                  Portfolio personnel développé avec React et TypeScript,
                  incluant des animations et une interface moderne.
                </p>
                <button>VOIR PLUS</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
