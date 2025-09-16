import styles from "./delivery.module.scss";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";

const Delivery = () => {
  const center = [47.898949, 1.89709];
  return (
    <div className={styles.delivery}>
      <div className={styles.title}>Coût de la livraison par zones</div>
      <div className={styles.head}>
        <div className={styles.head_leftPart}>
          <div className={styles.title_leftPart}>
            Utilisez le bouton « Rechercher » pour entrer votre adresse et
            connaître le coût de la livraison.
          </div>
          <div className={styles.textContainer_leftPart}>
            <div className={styles.p1}>
              Coût de la livraison par zones de la région d’Almaty
            </div>
            <div>
              <span className={styles.map_green}>●</span>Coût de la livraison 10
              €
            </div>
            <div>
              <span className={styles.map_red}>●</span>Coût de la livraison 20€
            </div>
            <div>
              <span className={styles.map_blue}>●</span>Coût de la livraison 30€
            </div>
          </div>
        </div>
        <div className={styles.head_rightpart}>
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

            {/* Красная зона */}
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
            {/* Синяя зона */}
          </MapContainer>
        </div>
      </div>
      <div className={styles.seconde_container}>
        <div className={styles.seconde_container_left_part}>
          <div className={styles.seconde_containerTitle}>Livraison</div>
          <hr />
          <div className={styles.seconde_container_p1}>
            Combien de temps faut-il pour la livraison ?{" "}
          </div>
          <div className={styles.seconde_container_p2}>
            Cela dépend de la taille du bouquet et de la distance jusqu’au
            destinataire. <br />
            <br />
            Le délai moyen de livraison est de 60 minutes. Pour des informations
            précises, veuillez nous contacter par téléphone : <br />
            <br />
            Le coursier attendra 15 minutes sur place en cas d’absence du
            destinataire.
          </div>
          <hr />
        </div>
        <div className={styles.seconde_container_right_part}>
          <div className={styles.seconde_containerTitle}>Paiement</div>
          <hr />
          <div className={styles.seconde_container_p1}>
            Comment peut-on payer l’achat ?{" "}
          </div>
          <div className={styles.seconde_container_p2}>
            <span>En espèces:</span> <br />
            <br /> dans notre magasin à l’adresse : 050010 Almaty, district de
            Medeu, rue Radlova, 50/40 <br /> <br /> au coursier lors de la
            réception du bouquet <br /> <br /> <span>
              Virement sur carte :
            </span>{" "}
            <br /> <br /> veuillez vérifier les coordonnées bancaires auprès de
            notre responsable
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
