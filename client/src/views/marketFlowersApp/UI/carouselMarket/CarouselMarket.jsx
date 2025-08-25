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
        <div className={styles.firstdiv}>Доставка цветов Алматы</div>
        <div className={styles.seconddiv}>
          Закажите букет от 9990 тг. с доставкой от 40 минут и фотоотчетом перед
          отправкой цветов.
        </div>
        <a
          href="https://wa.me/your-phone-number"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIconWhite> </WhatsAppIconWhite> ПЕРЕЙТИ В ЧАТ
        </a>
        <div className={styles.thirddiv}>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_1} alt="" />
            </div>
            <div>
              Гарантия свежести <br /> цветов!
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_2} alt="" />
            </div>
            <div>
              Фото букета перед <br /> отправкой
            </div>
          </div>
          <div className={styles.thirddiv_relative}>
            <div>
              <img src={main_3} alt="" />
            </div>
            <div>Рассрочка 0-0-3</div>
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
