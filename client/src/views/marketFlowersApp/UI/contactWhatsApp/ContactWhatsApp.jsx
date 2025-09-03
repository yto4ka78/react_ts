import React, { useState } from "react";
import styles from "./ContactWhatsApp.module.scss";
import woman from "../../assets/images/womanManager.webp";

const ContactWhatsApp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);
  const [phonesended, setPhoneSended] = useState(false);
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    if (errorPhone) setErrorPhone(false);
  };

  return (
    <div className={styles.main_contact_width}>
      <div className={styles.contact_firstSection}>
        <div>
          Laissez une demande et nous composerons pour vous le bouquet idéal
        </div>
        <div>
          Remplissez le formulaire et nous vous contacterons dans les plus brefs
          délais.
        </div>
      </div>
      <div className={styles.contact_secondSection}>
        <div className={styles.contact_secondSection_input}>
          <input
            type="tel"
            onChange={handleChangePhoneNumber}
            value={phoneNumber}
            placeholder="+33 7 ˍˍ ˍˍ ˍˍ ˍˍ "
          />
          <img src="icon_phone.png" alt="" />
          {errorPhone && (
            <div className={styles.error_phone}>
              Numéro saisi incorrectement
            </div>
          )}
        </div>
        {phonesended ? (
          <div className={styles.phoneSended}>
            Demande envoyée, un conseiller vous contactera.
          </div>
        ) : (
          <button>Envoyer la demande</button>
        )}

        <div className={styles.contact_secondSection_checkbox}>
          <label className={styles.custom_checkbox}>
            <input type="checkbox" defaultChecked />
            <span className={styles.checkmark}></span>
          </label>
          <div>
            En cliquant sur le bouton, vous consentez au traitement de vos
            données personnelles.
          </div>
        </div>
      </div>
      <div className={styles.contact_thirdSection}>
        <img src={woman} alt="" />
        <div>
          Un conseiller vous rappellera pour préciser l’heure qui vous convient.
        </div>
      </div>
    </div>
  );
};

export default ContactWhatsApp;
