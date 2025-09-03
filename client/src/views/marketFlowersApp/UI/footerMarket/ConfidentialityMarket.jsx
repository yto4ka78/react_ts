import React from "react";
import styles from "./confidentialityMarket.module.scss";

const Confidentiality = () => {
  return (
    <div className={styles.container}>
      <h1>Politique de confidentialité</h1>

      <p>
        Nous respectons votre vie privée et ne collectons pas de données
        personnelles des utilisateurs sur ce site.
      </p>

      <h2>Ce que nous pouvons collecter :</h2>
      <ul>
        <li>
          Des statistiques de visite anonymisées (par exemple via des outils
          d’analyse) dans le but d’améliorer la qualité du site.
        </li>
        <li>
          Les informations que vous fournissez volontairement en nous contactant
          (par exemple via WhatsApp, Telegram ou Instagram).
        </li>
      </ul>

      <h2>
        Ce que nous <strong>ne faisons pas</strong> :
      </h2>
      <ul>
        <li>Nous ne partageons pas vos données avec des tiers.</li>
        <li>Nous n'utilisons pas de cookies à des fins publicitaires.</li>
        <li>Nous ne collectons ni ne traitons de données de paiement.</li>
      </ul>

      <h2>Sécurité</h2>
      <p>
        Le site est hébergé et maintenu sur le territoire de la République du
        Kazakhstan. Toutes les données reçues sont protégées et ne sont pas
        transférées en dehors du serveur.
      </p>

      <p>
        Si vous avez des questions concernant la confidentialité, veuillez nous
        contacter par e-mail :
        <br />
        📧{" "}
        <a href="mailto:erik.sitnikov.fr@gmail.com">
          erik.sitnikov.fr@gmail.com
        </a>
      </p>
      <p style={{ fontSize: "14px", color: "#6c757d" }}>
        © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Confidentiality;
