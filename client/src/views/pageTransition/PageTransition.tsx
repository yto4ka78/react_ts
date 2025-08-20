import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./pageTransition.module.scss";
import { useHideAndShowNavBarContextContext } from "../layout/HideAndShowNavBarProvider";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const { isVisible, setIsVisible } = useHideAndShowNavBarContextContext();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateWithTransition = (href: string) => {
    setIsVisible(false);
    setTimeout(() => {
      navigate(href);
      setIsVisible(true);
    }, 600);
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`${styles.pageTransition} ${
        isVisible ? styles.visible : styles.notVisible
      }`}
    >
      {children}
    </div>
  );
};

export default PageTransition;
