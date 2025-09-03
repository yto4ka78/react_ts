import React from "react";
import { Link } from "react-router-dom";
import insta_logo from "../../assets/images/instagram_logo.png";
import vk_logo from "../../assets/images/vk_logo.png";
import styles from "./FooterMarket.module.scss";
import WhatsAppIcon from "../../views/navBarMarket/WhatsAppIcon";
import InstagramIcon from "../../views/navBarMarket/InstagramIcon";

const FooterMarket = () => {
  return (
    <div className={styles.footer_maindiv}>
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
          <div className={styles.navLinks_menu}>
            <img src="/logo.png" alt="" />
          </div>

          <div className={styles.navLinks__categories}>
            <div>
              <Link to="">Catalogue</Link>
            </div>
            <div>
              <Link to="">Roses</Link>
            </div>
            <div>
              <Link to="">Pivoines</Link>
            </div>
            <div>
              <Link to="">Comestibles</Link>
            </div>
            <div>
              <Link to="">En boîte</Link>
            </div>
            <div>
              <Link to="">Tulipes</Link>
            </div>
            <div>
              <Link to="">Dans un pot</Link>
            </div>
            <div>
              <Link to="/contacts">Contacts</Link>
            </div>
            <div>
              <Link to="/delivery">Livraison</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_maindiv_secondsection_size}>
        <div className={styles.footer_maindiv_secondsection}>
          <div className={styles.left_side}>
            <Link to="/mapsite">Carte du site</Link>
            <Link to="/marketFlowers/confidentiality">Confidentialité</Link>
          </div>
          <div className={styles.right_side}>
            <div>+337-80-33-54-90</div>
            <div>
              <WhatsAppIcon></WhatsAppIcon>
            </div>
            <div>
              <InstagramIcon></InstagramIcon>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FooterMarket;
