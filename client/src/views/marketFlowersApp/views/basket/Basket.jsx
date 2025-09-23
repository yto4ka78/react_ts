import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./Basket.module.scss";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Cookies from "js-cookie";
import { validateFormData } from "./formDataValid";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/carteSlice";
import { handleOrderCreationAndGenerateMessage } from "../../utils/messageSender";
import OrderInfo from "../../UI/orderInfo/OrderInfo";

const Basket = () => {
  const center = [47.898949, 1.89709];
  const orderInfoRef = useRef(null);
  const [hideButton, setHideButton] = useState(false);
  const hideButtonRef = useRef(false);
  const [basketItems, setBasketItems] = useState([]);
  const [isSelfRecipient, setIsSelfRecipient] = useState(false);
  const [selectedZone, setSelectedZone] = useState("pickup");
  const [formData, setFormData] = useState({
    bouquets: [],
    anonymously: false,
    isSelfRecipient: false,
    senderName: "",
    senderPhone: "",
    recipientName: "",
    recipientPhone: "",
    deliveryZone: "pickup",
    address: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [formDataValide, setFormDataValide] = useState(false);
  const dispatch = useDispatch();
  const zoneDelivery = {
    pickup: { price: 0 },
    zone1: { price: 2500 },
    zone2: { price: 3000 },
    zone3: { price: 4000 },
  };
  const sizeOptions = {
    S: { label: "S", multiplier: 1 },
    M: { label: "M (+30%)", multiplier: 1.3 },
    L: { label: "L (+50%)", multiplier: 1.5 },
    XL: { label: "XL (+100%)", multiplier: 2 },
  };
  const [anonymously, setAnonymously] = useState(false);

  const [messageOrder, setMessageOrder] = useState(null);
  const [showOrderInfo, setShowOrderInfo] = useState(false);

  const handleClickAnonymously = () => {
    setAnonymously((prev) => {
      const newValue = !prev;
      setFormData((prevForm) => ({
        ...prevForm,
        anonymously: newValue,
      }));
      return newValue;
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [cart, setCart] = useState(() =>
    JSON.parse(Cookies.get("cart") || "[]")
  );

  useEffect(() => {
    const handleBasket = () => {
      try {
        const ids = cart.map((item) => item.id);
        if (ids.length === 0) {
          return;
        }
        const response = localStorage.getItem("dataStorage");
        if (!response) return;
        const parsed = JSON.parse(response);
        const allBouquets = Array.isArray(parsed?.bouquets)
          ? parsed.bouquets
          : [];
        const selectedBouquets = allBouquets.filter((bouquet) =>
          ids.includes(bouquet.id)
        );
        setBasketItems(selectedBouquets);
      } catch {}
    };
    handleBasket();
  }, [cart]);

  const updateSize = (id, oldSize, newSize) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === oldSize) {
        return { ...item, size: newSize };
      }
      return item;
    });

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };

  const updateQuantity = (id, size, delta) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === size) {
        return {
          ...item,
          quantity: Math.max(item.quantity + delta, 1),
        };
      }
      return item;
    });

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };
  const deleteItemFromCart = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );

    setCart(updatedCart);
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 1 });
  };
  const basketWithDetails = useMemo(() => {
    const sizeOptions = {
      S: { label: "S", multiplier: 1 },
      M: { label: "M (+30%)", multiplier: 1.3 },
      L: { label: "L (+50%)", multiplier: 1.5 },
      XL: { label: "XL (+100%)", multiplier: 2 },
    };
    return cart.map((item) => {
      const bouquet = basketItems.find((b) => b.id === item.id);
      if (!bouquet) return item;

      const multiplier = sizeOptions[item.size]?.multiplier || 1;
      const basePrice = parseFloat(bouquet.price || 0);
      const salePrice = bouquet.saleprice
        ? parseFloat(bouquet.saleprice)
        : null;
      const finalBasePrice = Math.round(basePrice * multiplier);
      const finalSalePrice = salePrice
        ? Math.round(salePrice * multiplier)
        : null;
      const finalPrice = finalSalePrice ?? finalBasePrice;

      return {
        ...item,
        name: bouquet.name,
        imageUrl: bouquet.imageUrl,
        finalBasePrice,
        finalSalePrice,
        finalPrice,
        total: finalPrice * item.quantity,
      };
    });
  }, [cart, basketItems]);

  const handleOrderSubmit = () => {
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      setFormDataValide(false);
      setErrorMessage(errors);
    } else {
      setFormDataValide(true);
      setErrorMessage();
      const message = handleOrderCreationAndGenerateMessage(formData);
      setShowOrderInfo(true);
      setMessageOrder(message);
      window.scrollTo({
        top: 120,
        behavior: "smooth",
      });
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bouquets: basketWithDetails,
    }));
  }, [basketWithDetails]);

  const totalSum = basketWithDetails.reduce((sum, item) => sum + item.total, 0);
  const totalProductCount = basketWithDetails.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const deliveryPrice = zoneDelivery[selectedZone]?.price || 0;
  const totalWithDelivery = totalSum + deliveryPrice;

  useEffect(() => {
    let currentY = 0;
    const animate = () => {
      const targetY = window.scrollY - 240;
      currentY += (targetY - currentY) * 0.1;
      if (orderInfoRef.current) {
        if (window.scrollY > 280) {
          orderInfoRef.current.style.transform = `translateY(${currentY}px)`;
        } else {
          orderInfoRef.current.style.transform = `translateY(0px)`;
        }
      }

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div className={styles.main}>
      {showOrderInfo && (
        <OrderInfo
          message={messageOrder}
          setShowOrderInfo={setShowOrderInfo}
        ></OrderInfo>
      )}
      <div className={styles.leftPart}>
        <div className={styles.headTitle}>
          <h2>Panier</h2>
          <hr />
        </div>
        <div>
          {basketWithDetails.length === 0 ? (
            <div className={styles.lackOfBouquets}>
              Vous n’avez ajouté aucun bouquet
            </div>
          ) : (
            basketWithDetails.map((bouquet) => (
              <div>
                <div className={styles.bouquet}>
                  <div className={styles.bouquetImg}>
                    <img src={bouquet.imageUrl?.[0]} alt="Photo" />
                  </div>
                  <div className={styles.bouquetDescription}>
                    <div className={styles.name}>{bouquet.name}</div>
                    <div className={styles.size}>Qté : {bouquet.size}</div>
                    <div className={styles.sizeSelector}>
                      {Object.entries(sizeOptions).map(([key, option]) => (
                        <button
                          key={key}
                          className={`${styles.sizeButton} ${
                            bouquet.size === key ? styles.selected : ""
                          }`}
                          onClick={() =>
                            updateSize(bouquet.id, bouquet.size, key)
                          }
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {bouquet.finalSalePrice ? (
                      <div>
                        <div className={styles.price_container}>
                          <div className={styles.salePrice}>
                            {bouquet.finalSalePrice} €
                          </div>
                          <div className={styles.price}>
                            {bouquet.finalBasePrice} €
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.price_container}>
                        <div className={styles.salePrice}>
                          {bouquet.finalBasePrice} €
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={styles.flex}></div>
                  <div className={styles.quantity}>
                    <div className={styles.quantitySelector}>
                      <button
                        onClick={() =>
                          updateQuantity(bouquet.id, bouquet.size, -1)
                        }
                      >
                        −
                      </button>
                      <span>{bouquet.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(bouquet.id, bouquet.size, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.deleteButton_div}>
                    <div className={styles.deleteButton}>
                      <button
                        onClick={() =>
                          deleteItemFromCart(bouquet.id, bouquet.size)
                        }
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
        {/* Panier version mobile */}
        <div className={styles.orderInfo_phone}>
          <div className={styles.orderTitle}>Votre commande</div>
          <div className={styles.orderDetails}>
            <div className={styles.orderText}>
              <div>Nombre d’articles</div>
              <div className={styles.flex}></div>
              <div>{totalProductCount}</div>
            </div>
            <div className={styles.orderText}>
              <div>Sous-total</div>
              <div className={styles.flex}></div>
              <div>{totalSum} €</div>
            </div>
            <div className={styles.orderText}>
              <div>Livraison</div>
              <div className={styles.flex}></div>
              <div>{deliveryPrice} €</div>
            </div>
            <div className={styles.orderText}>
              <div>Total</div>
              <div className={styles.flex}></div>
              <div>{totalWithDelivery} €</div>
            </div>
          </div>
        </div>

        <div className={styles.userInfo}>
          <h3>Qui recevra la commande ?</h3>
          <div className={styles.choise_client_buttons}>
            <button
              onClick={() => {
                setIsSelfRecipient(false);
                setFormData((prev) => ({
                  ...prev,
                  isSelfRecipient: false,
                }));
              }}
              className={isSelfRecipient ? "" : styles.buttonChoised}
            >
              Une autre personne
            </button>

            <button
              onClick={() => {
                setIsSelfRecipient(true);
                setFormData((prev) => ({
                  ...prev,
                  isSelfRecipient: true,
                }));
              }}
              className={isSelfRecipient ? styles.buttonChoised : ""}
            >
              Moi-même
            </button>
          </div>
          {!isSelfRecipient && (
            <div className={styles.choise_anonymously}>
              <button
                onClick={handleClickAnonymously}
                className={`${styles.button} ${
                  anonymously ? styles.buttonChoised : ""
                }`}
              ></button>
              <span>{anonymously ? "🗸" : ""}</span>
              <div>Anonyme</div>
            </div>
          )}

          <div className={styles.clientNames}>
            <div className={styles.profile_section}>
              <div className={styles.flex}>
                <label htmlFor="senderName">Nom de l’expéditeur</label>
                <input
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.flex}>
                <label htmlFor="senderPhone">Téléphone de l’expéditeur</label>
                <input
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {!isSelfRecipient && (
              <div className={styles.profile_section}>
                <div className={styles.flex}>
                  <label htmlFor="recipientName"> Nom du destinataire</label>
                  <input
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.flex}>
                  <label htmlFor="recipientPhone">
                    Téléphone du destinataire
                  </label>
                  <input
                    id="recipientPhone"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className={styles.deliveryChoise_text}>Livraison</h3>
          <div className={styles.deliveryChoise}>
            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={selectedZone === "pickup"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span className={styles.custom_choise}>Retrait en magasin</span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone1"
                checked={selectedZone === "zone1"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span className={styles.custom_choise}>
                Livraison à partir de 2500 €
              </span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone2"
                checked={selectedZone === "zone2"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span className={styles.custom_choise}>
                Livraison (zone 2) 3000 €
              </span>
            </label>
            <br />

            <label className={styles.option}>
              <input
                type="radio"
                name="delivery"
                value="zone3"
                checked={selectedZone === "zone3"}
                onChange={(e) => {
                  setSelectedZone(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    deliveryZone: e.target.value,
                  }));
                }}
              />
              <span className={styles.custom_choise}>
                Livraison (zone 3) 4000 €
              </span>
            </label>
            <br />
          </div>
          <div className={styles.deliveryChoise_text}>
            Le coût de la livraison est calculé individuellement
          </div>
        </div>

        {/* Carte */}
        <div className={styles.map}>
          <div className={styles.map_title}>
            Choisissez une zone de livraison
          </div>
          <div className={styles.map_underTitle}>
            Utilisez le bouton « chercher » pour entrer une adresse et connaître
            le coût de la livraison.
          </div>
          <MapContainer
            center={center}
            zoom={11}
            style={{ height: "500px", width: "100%", margin: "20px 0px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Зелёная зона */}
            <Circle
              center={center}
              radius={10000}
              pathOptions={{ color: "blue", fillOpacity: 0.1 }}
            >
              <Popup>Zone 3: 30€</Popup>
            </Circle>
            <Circle
              center={center}
              radius={6000}
              pathOptions={{ color: "red", fillOpacity: 0.2 }}
            >
              <Popup>Zone 2: 20€</Popup>
            </Circle>
            <Circle
              center={center}
              radius={3000}
              pathOptions={{ color: "green", fillOpacity: 0.3 }}
            >
              <Popup>Zone 1 : 10€</Popup>
            </Circle>
            {/* Красная зона */}
          </MapContainer>
          <div className={styles.map_info}>
            <div className={styles.map_info_flex}>
              <div className={styles.map_info_containers}>
                <span className={styles.map_green}></span>Coût de la livraison
                10 €
              </div>
              <div className={styles.map_info_containers}>
                <span className={styles.map_red}></span>Coût de la livraison 20€
              </div>
            </div>
            <div className={styles.map_info_flex}>
              <div className={styles.map_info_containers}>
                <span className={styles.map_blue}></span>Coût de la livraison
                30€
              </div>
              <div style={{ opacity: "0", width: "48%" }}>
                <span></span>Стоимость доставки 6000 ₸ (зона 4)
              </div>
            </div>
          </div>
        </div>

        <div className={styles.order_adresse}>
          <h3>Adresse de livraison</h3>
          <div className={styles.flex}>
            <label htmlFor="address">
              Ville, rue, maison, entrée, appartement *
            </label>
            <input
              id="address"
              name="address"
              value={formData.address}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.flex}>
            <label htmlFor="comment">
              Ajoutez un commentaire à la commande
            </label>
            <input
              id="comment"
              name="comment"
              value={formData.comment}
              type="text"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {Array.isArray(errorMessage) && errorMessage.length > 0 && (
          <div className={styles.errorContainer}>
            <div className={styles.errorDiv}>
              <div className={styles.title}>Veuillez remplir les champs :</div>
              {errorMessage.map((message, index) => (
                <div key={index} className={styles.message}>
                  ⚠️ {message}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.sendButton}>
          {formDataValide && (
            <div className={styles.notificationSuccess}>
              ✅ La commande a été envoyée au manager, il vous contactera
              prochainement.
            </div>
          )}
          {!formDataValide && (
            <button onClick={handleOrderSubmit} className={styles.orderButton}>
              Passer la commande
            </button>
          )}
        </div>
        <div className={styles.underButton}>
          En cliquant sur « Passer la commande », vous acceptez le traitement de
          vos données personnelles conformément à la Politique de
          confidentialité et aux conditions de l’Offre publique.
        </div>
      </div>

      {/* Partie droite */}
      <div className={styles.orderInfo} ref={orderInfoRef}>
        <div className={styles.orderTitle}>Votre commande</div>
        <div className={styles.orderDetails}>
          <div className={styles.orderText}>
            <div>Nombre d’articles</div>
            <div className={styles.flex}></div>
            <div>{totalProductCount}</div>
          </div>
          <div className={styles.orderText}>
            <div>Sous-total</div>
            <div className={styles.flex}></div>
            <div>{totalSum} €</div>
          </div>
          <div className={styles.orderText}>
            <div>Livraison</div>
            <div className={styles.flex}></div>
            <div>{deliveryPrice} €</div>
          </div>
          <div className={styles.orderText}>
            <div>Total</div>
            <div className={styles.flex}></div>
            <div>{totalWithDelivery} €</div>
          </div>
        </div>
        {!hideButton && (
          <div>
            {formDataValide && (
              <div className={styles.notificationSuccess}>
                ✅ La commande a été envoyée au manager, il vous contactera
                prochainement.
              </div>
            )}
            {!formDataValide && (
              <button
                onClick={handleOrderSubmit}
                className={styles.orderButton}
              >
                Passer la commande
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
