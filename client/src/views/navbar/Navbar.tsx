import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useHideAndShowNavBarContext } from "../layout/HideAndShowNavBarProvider";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isVisible, setIsVisible } = useHideAndShowNavBarContext();
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
                  Voici une démo d’un site que j’ai réalisé pour un ami. Le site
                  n’est pas entièrement traduit en français, vous pouvez parfois
                  y rencontrer des mots en russe. Au lieu d’une base de données,
                  j’utilise localstorage qui charge des données à partir des
                  states préparés à l’avance. N’hésitez pas à utiliser le
                  panneau d’administration et à modifier les données : elles ne
                  seront modifiées que côté client. Dans cette version du site,
                  j’ai supprimé tous les contrôleurs et routeurs, car cela
                  alourdirait le serveur et rendrait la maintenance plus
                  coûteuse. Si vous souhaitez voir l'organisation des controlles
                  du site (back-end), vous pouvez consulter le dépôt Git.
                </p>
                <a data-href="/marketFlowers" onClick={handleHide}>
                  TESTER
                </a>
              </div>

              <div className={styles.project_div}>
                <h3>Bot FunPay</h3>
                <p>
                  À l’heure actuelle, je développe un bot qui traitera
                  automatiquement les commandes sur FunPay. Il n’est pas en
                  accès public, mais vous pouvez suivre l’avancement du projet.
                </p>
                <a>GIT</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
