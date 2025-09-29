import React, { useState, useRef, useEffect } from "react";
import { ReactTyped } from "react-typed";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.scss";

const Main = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);
  const [closeWelcomeScreen, setCloseWelcomeScreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowWelcomeScreen(true);
    setTimeout(() => {
      setShowContent(true);
    }, 2500);
  }, []);

  const handleCvInfo = () => {
    const backGround_welcomeScreen = document.getElementById(
      "backGround_welcomeScreen"
    );
    setShowContent(false);
    if (!backGround_welcomeScreen) return;
    setTimeout(() => {
      setShowWelcomeScreen(false);
      setCloseWelcomeScreen(true);
      setTimeout(() => {
        backGround_welcomeScreen.classList.add(styles.hidden);
      }, 2500);
      setTimeout(() => {
        navigate("/cvInfo");
      }, 3000);
    }, 2500);
  };

  return (
    <div className={styles.main}>
      <div
        className={[
          styles.backGround_welcomeScreen,
          showWelcomeScreen && styles.playOpenAnimation,
          closeWelcomeScreen && styles.playHideAnimation,
        ]
          .filter(Boolean)
          .join(" ")}
        id="backGround_welcomeScreen"
      >
        <div
          className={[styles.welcomeScreen, showContent && styles.showContent]
            .filter(Boolean)
            .join(" ")}
        >
          <ReactTyped
            className={styles.textTyped}
            strings={["Web full stack développeur", "React + Express"]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
          <h1>
            <span className={styles.name}>Erik</span>{" "}
            <span className={styles.secondName}>Sitnikov</span>
          </h1>
          <h3>En recherch:</h3>
          <h3>
            Contrat d’apprentissage Concepteur Développeur d’Applications 2
            semaine en entreprise 1 en centre de formation
          </h3>
          <h3>Soit</h3>
          <h3>Du stage en enterprise ou à distance</h3>
          <button
            onClick={() => {
              handleCvInfo();
            }}
          >
            PLUS D'INFO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
