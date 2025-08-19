import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./navbar.module.scss";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const pathName = useLocation();

  // Анимация появления при загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleHide = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = (e.currentTarget as HTMLAnchorElement).dataset.href;
  };

  const toggleNavbar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`${styles.navBar} ${isLoaded ? styles.loaded : ""} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      id="navBar"
    >
      <div
        className={`${styles.flex_buttons} ${
          isVisible ? styles.visible : styles.show
        } `}
      >
        <Link to="/cvInfo" className="">
          Mon CV
        </Link>
        <Link to="/monCv" className="">
          Testez mes projets
        </Link>
        <Link to="/monCv" className="">
          Contacts
        </Link>
        <Link to="/monCv" className="">
          Sosal?
        </Link>
      </div>
      <button
        className={`${styles.handleButton} ${
          isVisible ? styles.buttonUp : styles.buttonDown
        }`}
        onClick={toggleNavbar}
      >
        ᐁ
      </button>
    </div>
  );
};

export default Navbar;
