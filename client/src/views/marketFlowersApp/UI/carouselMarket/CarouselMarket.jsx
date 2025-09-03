import styles from "./сarouselMarket.module.scss";
import WhatsAppIconWhite from "../icons/WhatsAppIconWhite";
import main_1 from "../../assets/images/main_1.png";
import main_2 from "../../assets/images/main_2.png";
import main_3 from "../../assets/images/main_3.webp";
import mainPhoto from "../../assets/images/mainPhoto.png";

const CarouselMarket = () => {
  return (
    <div className={styles.main_carousel}>
      <div className={styles.main_carousel_info}>
        <div className={styles.firstdiv}>Livraison de fleurs à Paris</div>
        <div className={styles.seconddiv}>
          Commandez un bouquet à partir de 15€ avec une livraison dès 40 minutes
          et un rapport photo avant l’envoi des fleurs.
        </div>
        <a
          href="https://wa.me/your-phone-number"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIconWhite> </WhatsAppIconWhite> ACCÉDER AU CHAT
        </a>
        <div className={styles.thirddiv}>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_1} alt="" />
            </div>
            <div>
              Garantie de fraîcheur <br /> des fleurs !
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_2} alt="" />
            </div>
            <div>
              Photo du bouquet avant <br /> l’envoi
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_3} alt="" />
            </div>
            <div>Paiement échelonné 0-0-3</div>
          </div>
        </div>
      </div>
      <div className={styles.main_carousel_title}>
        <img src={mainPhoto} alt="" />
      </div>
    </div>
  );
};

export default CarouselMarket;
