import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useHideAndShowNavBarContextContext } from "../layout/HideAndShowNavBarProvider";

const Navbar = () => {
  const [showNavBar, setShowNavBar] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { isVisible, setIsVisible } = useHideAndShowNavBarContextContext();
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
    if (href !== hrefActual.pathname) {
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

  return (
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
        <a data-href="/cvInfo" className="" onClick={handleHide}>
          Mon CV
        </a>
        <a data-href="/cvInfo" className="" onClick={handleHide}>
          Testez mes projets
        </a>
        <a data-href="/cvInfo" className="" onClick={handleHide}>
          Contacts
        </a>
        <a data-href="/cvInfo" className="" onClick={handleHide}>
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
  );
};

export default Navbar;
