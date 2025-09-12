import React from "react";
import styles from "./contacts.module.scss";
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const Contacts = () => {
  return (
    <div className={styles.contacts_mainDiv}>
      <div className={styles.contacts_header}>
        <h3>Contactez-nous par le moyen qui vous convient&nbsp;!</h3>
        <p>
          Nous sommes toujours disponibles et serons ravis de vous aider à
          choisir un bouquet 🌸
        </p>
      </div>

      <div className={styles.contacts_list}>
        <div className={styles.contact_item}>
          <h4>
            <FaWhatsapp /> WhatsApp
          </h4>
          <div>+33 7 80 33 54 90</div>
          <a
            href="https://wa.me/337080335490"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>Ouvrir WhatsApp</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaInstagram /> Instagram
          </h4>
          <div>@erik_jan_yto4ka</div>
          <a href="https://www.instagram.com/erik_jan_yto4ka/" target="_blank">
            <button>Ouvrir Instagram</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaTelegramPlane /> Telegram
          </h4>
          <div>@delphin78</div>
          <a href="https://t.me/@delphin78" target="_blank">
            <button>Ouvrir Telegram</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaMapMarkerAlt /> Adresse
          </h4>
          <div>Orleans</div>
          <a href="https://www.google.fr/maps?q=,+Orl%C3%A9ans,+,+fr">
            <button>Regarder sur la carte</button>
          </a>
        </div>

        <div className={styles.contact_item}>
          <h4>
            <FaPhoneAlt /> Numéros
          </h4>
          <div>+33 7 80 33 54 90</div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
