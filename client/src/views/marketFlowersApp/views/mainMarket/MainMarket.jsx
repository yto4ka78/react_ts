import CarouselMarket from "../../UI/carouselMarket/CarouselMarket";
import React, { useEffect, useState } from "react";
import styles from "./mainMarket.module.scss";
import { Link } from "react-router-dom";
import CheckBoxListPriceMain from "../../UI/checkbox/CheckBoxListPriceMain";
import FlowerShow from "../../UI/flowerShow/FlowerShow";
import ContactWhatsApp from "../../UI/contactWhatsApp/ContactWhatsApp";
import SomeInfo from "../../UI/someInfo/SomeInfo";
import MainServiceBenefits from "../../UI/mainServiceBenefits/MainServiceBenefits";
import api from "../../../../utils/api";
import logo from "../../assets/images/logo.png";

const MainMarket = () => {
  const [flowers, setFlowers] = useState([]);
  const [allBouquets, setAllBouquets] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [bouquetInPage, setBouquetInPage] = useState(8);
  function mixArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const addBouquetInPage = () => {
    setBouquetInPage(bouquetInPage + 8);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = localStorage.getItem("dataStorage");
        if (response) {
          const result = JSON.parse(response);
          if (result && Array.isArray(result.bouquets)) {
            const shuffledBouquets = [...result.bouquets].sort(
              () => Math.random() - 0.5
            );
            setAllBouquets(shuffledBouquets);
            setFlowers(shuffledBouquets.slice(0, bouquetInPage));
          }
        }
      } catch (e) {
        console.error("Error MAIN MARKET bouquets", e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    try {
      if (Array.isArray(allBouquets)) {
        setFlowers(allBouquets.slice(0, bouquetInPage));
      }
    } catch (e) {
      console.error("Error MAIN MARKET bouquets ", e);
    }
  }, [bouquetInPage, allBouquets]);

  const handlePriceFilterChange = (ranges) => {
    try {
      if (!Array.isArray(allBouquets)) return;

      if (ranges.length === 0) {
        const all = mixArray(allBouquets).slice(0, bouquetInPage);
        setFlowers(all);
        return;
      }

      const filtered = allBouquets.filter((flower) => {
        const price = Number(flower.saleprice ?? flower.price);
        return ranges.some(([min, max]) => price >= min && price <= max);
      });

      const shuffled = mixArray(filtered).slice(0, bouquetInPage);
      setFlowers(shuffled);
    } catch (e) {
      console.error("Ошибка фильтрации", e);
    }
  };

  return (
    <div>
      <CarouselMarket> </CarouselMarket>
      <div className={styles.main}>
        <div className={styles.main_priceSection}>
          <div>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              € Choisire le budget {isOpen ? "↑" : "↓"}
            </button>
          </div>
          {isOpen && (
            <div className={styles.main_priceSection_checkList}>
              <CheckBoxListPriceMain
                onFilterChange={handlePriceFilterChange}
              ></CheckBoxListPriceMain>
            </div>
          )}
          <div className={styles.main_priceSection_categories}>
            <Link to={`/marketFlowers/category?name=${"Roses"}`}>
              {" "}
              Roses 🌹
            </Link>
            <Link to={`/marketFlowers/category?name=${"Pivoines"}`}>
              {" "}
              Pivoines
            </Link>

            <Link to={`/marketFlowers/category?name=${"Tulipes"}`}>
              {" "}
              Tulipes 🌷
            </Link>
            <Link to={`/marketFlowers/category?name=${"Coffrets cadeaux"}`}>
              {" "}
              Coffrets cadeaux
            </Link>
            <Link
              to={`/marketFlowers/category?name=${"Fraises enrobées de chocolat"}`}
            >
              {" "}
              Fraises enrobées de chocolat 🍓
            </Link>
            <Link to={`/marketFlowers/category?name=${"Hortensias"}`}>
              {" "}
              Hortensias
            </Link>
            <Link to={`/marketFlowers/category?name=${"Roses en spray"}`}>
              {" "}
              Roses en spray{" "}
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.main_flowersSection}>
        <div className={styles.main_flowersSection_products}>
          {flowers &&
            flowers.map((flower, index) => (
              <FlowerShow flower={flower} index={index} key={index} />
            ))}
        </div>
        <div className={styles.showMoreflowers}>
          <button onClick={addBouquetInPage}>Voir plus</button>
        </div>
      </div>

      <ContactWhatsApp> </ContactWhatsApp>

      <div className={styles.main_description}>
        <div className={styles.description_firstSection}>
          <div className={styles.description_firstSection_text}>
            <div>Fleurs Paris</div>
            <div>
              «Anoli Flowers» est un réseau de livraison de magnifiques fleurs
              et cadeaux. Depuis plus de 5 ans, nous vous aidons à rendre vos
              fêtes spéciales. Offrez de l’amour à vos proches avec nous.
            </div>
            <hr />
          </div>
          <div className={styles.description_firstSection_img}>
            <img src={logo} alt="" />
          </div>
        </div>
        <div className={styles.description_secondSection}>
          Bienvenue dans un monde d’émotions vives et de souvenirs inoubliables
          avec Anoli Flowers – votre partenaire de confiance pour la livraison
          de fleurs et de cadeaux à Almaty ! Nos fleuristes, inspirés par des
          années d’expérience et une passion profonde pour leur métier, créent
          de véritables chefs-d’œuvre floraux – des compositions romantiques
          délicates aux somptueux bouquets de fête, qui deviendront une surprise
          mémorable pour vous et vos proches. Chaque création est réalisée avec
          un soin particulier et une grande attention aux détails, en utilisant
          uniquement les fleurs les plus fraîches, sélectionnées auprès de
          fournisseurs de confiance. La livraison de fleurs à Almaty à un prix
          avantageux avec Anoli Flowers, c’est la garantie de fraîcheur et de
          beauté.
        </div>
        <h3>
          Livraison de fleurs à Paris, dans n’importe quel quartier de la ville
          !
        </h3>
        <div className={styles.description_secondSection}>
          Avec Anoli Flowers, créer le bouquet parfait devient une aventure
          passionnante ! Nous proposons un large choix : des roses et tulipes
          classiques aux orchidées et lys exotiques — vous trouverez chez nous
          des options pour tous les goûts et tous les budgets. Vous pouvez
          choisir un bouquet prêt à l’emploi dans notre catalogue, une option
          abordable en promotion, ou commander un design personnalisé pour
          donner vie à toutes vos envies. Envie de surprendre votre bien-aimée
          avec un geste romantique ? Ou de féliciter vos collègues à l’occasion
          d’une fête ? Nous vous aiderons à trouver la composition idéale.
          Acheter des fleurs en ligne à Paris — c’est simple et agréable avec la
          boutique Anoli Flowers !
        </div>
        <h3>
          Nos coursiers livreront les fleurs à Paris à l’adresse et à l’heure
          indiquées.
        </h3>
        <div className={styles.description_secondSection}>
          Passer commande est très simple : choisissez une option sur notre
          site, indiquez une adresse à Almaty, un mode de paiement et l’heure
          souhaitée. Une fois la commande passée, notre conseiller vous
          contactera pour confirmation. La livraison de fleurs à Almaty est
          effectuée à l’heure qui vous convient, 24h/24 et 7j/7. Une livraison
          express dans n’importe quel quartier — à domicile, au bureau, au
          restaurant — est possible dans l’heure suivant le paiement. Le
          paiement peut être effectué de la manière qui vous convient : carte
          bancaire, systèmes de paiement en ligne ou en espèces à la livraison.
          Si la variété de fleurs choisie est temporairement indisponible, notre
          conseiller vous contactera pour proposer une alternative équivalente,
          en respectant au mieux le style, les couleurs et votre budget. Avant
          l’envoi, nous vous transmettrons une photo du bouquet. Confidentialité
          garantie : la livraison anonyme de fleurs à Almaty est disponible sur
          demande. Nous assurons un transport soigneux des compositions, avec un
          emballage spécial et un véhicule adapté pour éviter tout dommage. Pour
          rendre votre cadeau encore plus agréable, vous pouvez l’accompagner
          d’un assortiment comestible, d’une carte, d’une peluche, de chocolats
          ou d’autres petites attentions disponibles dans notre catalogue.
        </div>
        <h3>Des fleurs à Paris à des prix abordables en toute saison.</h3>
        <div className={styles.description_secondSection}>
          Commander de magnifiques fleurs sur notre boutique en ligne, c’est un
          jeu d’enfant ! Choisissez parmi une large sélection de bouquets frais
          à prix avantageux — des roses délicates aux compositions exotiques
          éclatantes. Nous proposons plusieurs modes de paiement et des prix
          abordables. Profitez dès maintenant d’une livraison rapide et offrez
          de la joie à vos proches ! Anoli Flowers — des fleurs qui expriment
          vos sentiments !
        </div>
        <h3>Nos fleurs avec livraison à Paris sont toujours en stock !!</h3>
        <div className={styles.description_secondSection}>
          Dans notre boutique, vous trouverez des fleurs sur commande à Paris
          pour toutes les occasions. Colorées et joyeuses — pour un
          anniversaire, douces et romantiques — pour un rendez-vous, sobres et
          élégantes — pour des réunions d’affaires. Nous proposons un large
          choix qui saura satisfaire tous les goûts et s’adapter à chaque moment
          de vie. Nos conseillers vous aideront à faire le bon choix en tenant
          compte de l’occasion, des préférences du destinataire et de votre
          budget. Veuillez noter que la disponibilité de certaines variétés peut
          varier selon la saison. Notre assortiment à jour est toujours présenté
          sur notre site en ligne. Nous ne travaillons qu’avec des plantes
          fraîches livrées directement par les meilleurs fournisseurs, ce qui
          garantit que la surprise restera belle pendant longtemps — entre 7 et
          14 jours. Notre sélection est régulièrement renouvelée pour que vous
          puissiez toujours profiter de la fraîcheur et de la beauté des
          variétés les plus actuelles. La livraison est effectuée exactement à
          l’heure convenue, et vous pouvez également acheter un bouquet à Almaty
          sans remise en main propre : le coursier laissera la commande devant
          la porte du destinataire. Pour faciliter votre choix, nous proposons
          plusieurs catégories : monobouquets, bouquets d’auteur, fleurs en
          boîte, fleurs en panier, bouquets comestibles, compositions de
          mariage, coffrets cadeaux, bouquets masculins. Acheter des fleurs à
          Almaty à petit prix pour n’importe quel événement, c’est facile 24h/24
          et 7j/7 dans la boutique florale Anoli Flowers !
        </div>
      </div>

      <SomeInfo></SomeInfo>
      <MainServiceBenefits></MainServiceBenefits>
    </div>
  );
};
export default MainMarket;
