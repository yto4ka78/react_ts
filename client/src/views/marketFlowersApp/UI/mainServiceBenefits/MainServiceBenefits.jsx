import React from "react";
import styles from "./MainServiceBenefits.module.scss";

const MainServiceBenefits = () => {
  return (
    <div className={styles.main_service_benefits}>
      <div className={styles.service_benefits}>
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_firstSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>
            Carte pour le bouquet
          </div>
          <div className={styles.service_benefits_text}>
            Sur demande, nous ajouterons une{" "}
            <strong>carte de vœux gratuite</strong> dans le bouquet avec un
            message pour le destinataire de votre part.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_secondSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>Rapport photo</div>
          <div className={styles.service_benefits_text}>
            <strong>Nous prenons en photo votre bouquet</strong> avant l’envoi
            pour que vous soyez rassuré : vous recevrez exactement ce que vous
            avez commandé.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_thirdSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>Notification SMS</div>
          <div className={styles.service_benefits_text}>
            <strong>Nous vous informons</strong> de toutes les étapes de la
            livraison : quand le cadeau est prêt, en cours de livraison et
            livré.
          </div>
        </div>
        <hr className={styles.vertical_line} />
        <div className={styles.service_benefits_Section}>
          <div className={styles.service_benefits_img}>
            <img src="/service_benefits_fourthSection.png" alt="" />
          </div>
          <div className={styles.service_benefits_title}>RAPPORT VIDÉO</div>
          <div className={styles.service_benefits_text}>
            <strong>Nous enregistrons en vidéo les émotions</strong> du
            destinataire heureux de votre cadeau.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainServiceBenefits;
