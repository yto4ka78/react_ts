import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import styles from "./productPage.module.scss";
import Gallery from "../gallery/Gallery.jsx";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/carteSlice";
import ContactWhatsApp from "../contactWhatsApp/ContactWhatsApp.jsx";
import { useNavigate } from "react-router-dom";
import MainServiceBenefits from "../mainServiceBenefits/MainServiceBenefits.jsx";
import SomeInfo from "../someInfo/SomeInfo.jsx";

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [selectedSize, setSelectedSize] = useState("S");
  const sizeOptions = {
    S: { label: "S (Standard)", multiplier: 1 },
    M: { label: "M (+30% de fleurs)", multiplier: 1.3 },
    L: { label: "L (+50% de fleurs)", multiplier: 1.5 },
    XL: { label: "XL (+100% de fleurs)", multiplier: 2 },
  };
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const basePrice = parseFloat(product?.saleprice || product?.price || 0);
  const finalPrice = Math.round(
    basePrice * sizeOptions[selectedSize].multiplier
  );
  const normalPrice = parseFloat(product?.price || 0);
  const finalnormalPrice = Math.round(
    normalPrice * sizeOptions[selectedSize].multiplier
  );
  useEffect(() => {
    const getProduct = async () => {
      try {
        const raw = localStorage.getItem("dataStorage");
        if (!raw) return;
        const data = JSON.parse(raw);
        const bouquets = Array.isArray(data?.bouquets) ? data.bouquets : [];
        const bouquet = bouquets.find((b) => String(b.id) === String(id));
        setProduct(bouquet || null);
      } catch (error) {}
    };
    getProduct();
  }, [id]);
  if (!product) {
    return <div>Chargement...</div>;
  }
  return (
    <div className={styles.productPage}>
      <div className={styles.productPage_mainDiv}>
        <div className={styles.header}>
          <Link to="/marketFlowers/allCategories">Retour au choix</Link>
          <div className={styles.header_text}>
            <div>
              Vous pouvez vérifier les détails de la livraison auprès de notre
              opérateur
            </div>
            <div>
              Tous les moyens de contact sont indiqués dans l’onglet « Contacts
              ».
            </div>
          </div>
        </div>
        <div className={styles.hr}>
          <hr />
        </div>
        <div className={styles.body}>
          <Gallery images={product.imageUrl} />
          <div className={styles.body_information}>
            <div className={styles.title_bouquet}>
              <h3>{product.name}</h3>
              <div>
                📦 Livraison : <span>dans l’heure</span>
              </div>
            </div>
            <div className={styles.sizeSelector}>
              {Object.entries(sizeOptions).map(([key, option]) => (
                <button
                  key={key}
                  className={`${styles.sizeButton} ${
                    selectedSize === key ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSize(key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className={styles.price}>
              <div className={styles.priceTitle}>Prix: </div>
              {product.saleprice ? (
                <div className={styles.saleStyles}>
                  <div className={styles.oldPrice}> {finalnormalPrice} €</div>
                  <div className={styles.salePrice}>{finalPrice} €</div>
                </div>
              ) : (
                <div className={styles.salePrice}> {finalnormalPrice} €</div>
              )}
            </div>
            <hr />
            <div className={styles.description}>
              <div className={styles.description_head}>Description:</div>
              <div className={styles.description_body}>
                {product.description}
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      price: product.saleprice ? finalPrice : finalnormalPrice,
                      size: selectedSize,
                    })
                  )
                }
              >
                Ajouter au panier
              </button>
              <button
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: product.id,
                      price: product.saleprice ? finalPrice : finalnormalPrice,
                      size: selectedSize,
                    })
                  );
                  navigate("/marketFlowers/basket");
                }}
              >
                Acheter en un clic
              </button>
            </div>
          </div>
        </div>
        {/* Payment */}
        <div className={styles.payment}>
          <div className={styles.tab}>Paiement</div>
          <div className={styles.tab_info}>
            <div className={styles.head}>
              <div className={styles.head_text}>
                Comment peut-on payer l’achat ?
              </div>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                {isOpen ? "−" : "+"}
              </button>
            </div>

            {isOpen && (
              <div className={styles.body}>
                <p className={styles.subheading}>En espèces:</p>
                <p className={styles.paragraph}>
                  Dans notre magasin, à l’adresse : Orleans, rue Pushkina, 50 —
                  au coursier lors de la réception du bouquet.
                </p>
                <p className={styles.subheading}>En ligne:</p>
                <p className={styles.paragraph}>Wirement sur le compte</p>
                <p className={styles.paragraph}>
                  (Veuillez vérifier les coordonnées bancaires auprès de notre
                  gestionnaire)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Контакт */}
        <ContactWhatsApp> </ContactWhatsApp>
      </div>

      <SomeInfo></SomeInfo>

      <MainServiceBenefits></MainServiceBenefits>
    </div>
  );
};

export default ProductPage;
