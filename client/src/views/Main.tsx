import React from "react";
import styles from "./main.module.scss";
import insta_logo from "../assets/img/inst_icon.png";
import git_logo from "../assets/img/git_icon.png";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.name}>Erik SITNIKOV</div>
      <div className={styles.firstDiv}>
        <div className={styles.firstDiv_img}>
          <img src="https://tagican.com/upload/blog/preview/215.jpg" alt="" />
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
            d’une <span>alternance</span>
            pour mettre en pratique mes compétences. <br /> <br /> Pendant mon
            temps libre, je regarde des animés, j’apprends Unity, j’explore les
            possibilités de l’IA ou je joue à des jeux vidéo.
          </p>
        </div>
      </div>
      <div>
        <div className={styles.secondeDiv_info}>
          <p>
            Si vous êtes recruteur (RH), fermez mon site et cherchez un autre
            candidat. Si vous êtes un team lead qui constitue une équipe et qui
            comprend la programmation, alors cet information ers pour vous :
            J’ai commencé à apprendre le codage à l’été 2024. J’ai débuté par
            l’étude de JavaScript, mais il me manquait cruellement de
            connaissances théoriques. De plus, je ne savais pas quel stack
            apprendre pour travailler en France, alors j’ai décidé d’acheter une
            formation en ligne. Elle s’est révélée très chère et inutile. Pour
            résumer, on peut décrire cette formation ainsi (Apprends JS,
            apprends PHP, apprends SQL, apprends Git, apprends Symfony). Cela a
            été très difficile d’étudier et de travailler en même temps pour
            financer mes études. Mais vers la fin de la formation, j’ai commencé
            à avoir une petite compréhension de la création de projets web. J’ai
            réussi à développer une petite application avec Symfony. Puis mon
            ami développeur m’a expliqué les avantages et les inconvénients de
            Symfony. J’en ai conclu qu’il valait mieux me concentrer sur
            l’apprentissage de React et d’Express. J’ai réussi à créer une
            boutique en ligne de fleurs avec une interface d’administration, des
            routes, une base de données MySQL et à la déployer sur un VPS
            tournant sous Ubuntu.
          </p>
          <p>
            J’essaie d’apprendre les outils à un niveau technique (par exemple,
            comprendre que les fonctions en JS sont aussi des objets, savoir
            quelles données sont stockées dans la stack, etc.), mais encore une
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
    </div>
  );
};

export default Main;
