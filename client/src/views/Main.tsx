import React, { useState, useRef, useEffect } from "react";
import styles from "./main.module.scss";
import insta_logo from "../assets/img/inst_icon.png";
import git_logo from "../assets/img/git_icon.png";
import me_1 from "../assets/img/me_1.jpg";
import { handleDivAboutMe } from "./Functionality";

const Main = () => {
  const handleAnimationButton = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = event.currentTarget;
    targetElement.style.transform = "scale(1.05)";
    targetElement.style.transition = "transform 0.3s ease";
  };

  const handleAnimationButtonLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const targetElement = event.currentTarget;
    targetElement.style.transform = "scale(1.0)";
    targetElement.style.transition = "transform 0.3s ease";
  };

  const handleDivAboutMeClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const targetElement = event.currentTarget;
    await handleDivAboutMe(targetElement);
  };

  return (
    <div className={styles.main}>
      <div className={styles.firstDiv}>
        <div className={styles.firstDiv_img}>
          <img src={me_1} alt="" />
        </div>
      </div>
      <div className={styles.secondeDiv}>
        <div className={styles.secondeDiv_name}>
          <p>Erik SITNIKOV</p>
          <a href="">
            <img src={insta_logo} alt="" />
          </a>
          <a href="">
            <img src={git_logo} alt="" />
          </a>
        </div>
        <div className={styles.secondeDiv_info}>
          <p>
            Actuellement, je suis à la recherche d’un <span>stage</span> ou
            d’une <span>alternance </span>
            pour mettre en pratique mes compétences. <br /> <br /> Pendant mon
            temps libre, je regarde des animés, j’apprends Unity, j’explore les
            possibilités de l’IA ou je joue à des jeux vidéo.
          </p>
        </div>
      </div>
      <div className={styles.cv_container}>
        <div
          onMouseEnter={handleAnimationButton}
          onMouseLeave={handleAnimationButtonLeave}
          className={styles.divButton_cv_container}
        >
          <button
            data-div-id="aboutMe_hideDiv,flesh_aboutMe"
            onClick={handleDivAboutMeClick}
          >
            ABOUT ME
          </button>
          <span
            id="flesh_aboutMe"
            className={`${styles.flesh_button} ${styles.flesh_button_up}`}
          />
        </div>
        <div className={styles.cv_hideDiv} id="aboutMe_hideDiv">
          <p>
            Si vous êtes recruteur (RH), fermez mon site et cherchez un autre
            candidat. Si vous êtes un team lead qui constitue une équipe et qui
            comprend la programmation, alors cet information ers pour vous :
            J’ai commencé à apprendre le codage à l’été 2024. J’ai débuté par
            l’étude de JavaScript, mais il me manquait cruellement de
            connaissances pratiques. De plus, je ne savais pas quel stack
            apprendre pour travailler en France, alors j’ai décidé d’acheter une
            formation en ligne. Elle s’est révélée très chère et inutile... Je
            peux résumer cette formation comme ca (Apprenez JS, apprenez PHP,
            apprenez SQL, apprenez Git, apprenez Symfony)😐 . Cela a été très
            difficile d’étudier et de travailler en même temps pour financer mes
            études. Mais vers la fin de la formation, j’ai commencé à avoir une
            petite compréhension de la création des projets web. J’ai réussi à
            développer une petite application avec Symfony. Puis mon ami
            développeur m’a expliqué les avantages et les inconvénients de
            Symfony. J’en ai conclu qu’il valait mieux me concentrer sur
            l’apprentissage de React et d’Express. J’ai réussi à créer une
            boutique en ligne de fleurs avec une interface d’administration, des
            routes, une base de données MySQL et à la déployer sur un VPS
            tournant sous Ubuntu.
          </p>
          <br />
          <p>
            J’essaie d’apprendre les outils à un niveau technique (par exemple,
            comprendre que les fonctions en JS sont aussi des objets, savoir
            quelles données sont stockées dans le stack, etc.), mais encore une
            fois, tout cela reste théorique et, malheureusement, sans pratique,
            ces connaissances s’oublient vite. Concernant l’utilisation de l’IA
            dans mon travail : je n’utilise pas l’IA pour écrire entièrement du
            code, mais comme un outil pour m’aider à le rédiger. Par exemple, je
            peux lui demander de me trouver une bibliothèque adaptée, une
            méthode d’une classe ou de repérer une vulnérabilité dans le code,
            etc. Bien sûr, lorsque certaines parties du code me paraissent
            obscures, j’utilise l’IA pour mieux les comprendre. J’ai également
            pris plaisir à créer des bots pour Telegram et j’ai un peu exploré
            Python. Mais aujourd’hui, je cherche activement une opportunité pour
            mettre en pratique mes compétences.
          </p>
        </div>
      </div>
      <div className={styles.cv_container}>
        <div
          onMouseEnter={handleAnimationButton}
          onMouseLeave={handleAnimationButtonLeave}
          className={styles.divButton_cv_container}
        >
          <button
            data-div-id="expreience_hideDiv,flesh_expreience"
            onClick={handleDivAboutMeClick}
          >
            EXPERIENCE
          </button>
          <span
            id="flesh_expreience"
            className={`${styles.flesh_button} ${styles.flesh_button_up}`}
          />
        </div>
        <div className={styles.cv_hideDiv} id="expreience_hideDiv">
          <h2>Projet personnel </h2>
          <h3>L'année: 2025</h3>
          <h3>Python (FFmpeg)</h3>
          <div className={styles.info_experience}>
            <p>
              Mon ami, qui travaille dans le domaine de TikTok, avait besoin
              d’un script pour découper des vidéos. L’application effectuait les
              actions suivantes :
            </p>
            <br />
            <p>
              1. Téléchargement d’une vidéo à partir d’un lien YouTube. <br />
              2. Choix d’un fichier qui servira d’arrière-plan. <br />
              3. Sélection d’un masque pour la vidéo. <br />
              4. Rendu final de la vidéo.
            </p>
            <br />
            <p>
              Je n’avais jamais étudié Python auparavant, mais comme la
              programmation est aussi mon passe-temps, j’ai réussi à créer une
              application fonctionnelle grâce à l’IA. Je n’ai pas étudié Python
              de manière approfondie, mais j’inclus cette expérience pour
              montrer que je suis prêt à apprendre n’importe quel framework ou
              langage de programmation.
            </p>
            <button
              data-div-id="video_python_experience"
              onClick={handleDivAboutMeClick}
            ></button>
            <div id="video_python_experience">
              <iframe
                src="https://www.youtube.com/embed/PmNjlMtktYQ"
                frameBorder="0"
                title="YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
