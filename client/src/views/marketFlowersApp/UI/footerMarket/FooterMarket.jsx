import { Link } from "react-router-dom";
import insta_logo from "../../assets/images/instagram_logo.png";
import vk_logo from "../../assets/images/vk_logo.png";
import styles from "./FooterMarket.module.scss";
import WhatsAppIcon from "../../views/navBarMarket/WhatsAppIcon";
import InstagramIcon from "../../views/navBarMarket/InstagramIcon";
import { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";

const FooterMarket = () => {
  const [linksNavBar, setLinksNavBar] = useState([]);
  useEffect(() => {
    const loadMenuCategories = () => {
      try {
        const raw = localStorage.getItem("dataStorage");
        if (!raw) return;
        const data = JSON.parse(raw);
        const categories = Array.isArray(data?.categories)
          ? data.categories
          : [];
        const navBarCategories = categories.filter(
          (cat) => cat.showInNavBar === true
        );

        setLinksNavBar(navBarCategories);
        console.log(navBarCategories);
      } catch (error) {
        console.error("Ошибка загрузки категорий для меню:", error);
      }
    };

    loadMenuCategories();
  }, []);
  return (
    <div className={styles.footer_maindiv}>
      <div className={styles.NavBar_Main_size2}>
        <div className={styles.NavBar_Main_Section2}>
          <div className={styles.navLinks_menu}>
            <img src={logo} alt="" />
          </div>

          <div className={styles.navLinks__categories}>
            {Array.isArray(linksNavBar) &&
              linksNavBar.map((category, index) => (
                <div key={index}>
                  <Link to={`/marketFlowers/category/${category.id}`}>
                    {category.name}
                  </Link>
                </div>
              ))}
            <div>
              <Link to="/marketFlowers/contacts">Contacts</Link>
            </div>
            <div>
              <Link to="/marketFlowers/delivery">Livraison</Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer_maindiv_secondsection_size}>
        <div className={styles.footer_maindiv_secondsection}>
          <div className={styles.left_side}>
            <Link to="/marketFlowers/mapsite">Carte du site</Link>
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
