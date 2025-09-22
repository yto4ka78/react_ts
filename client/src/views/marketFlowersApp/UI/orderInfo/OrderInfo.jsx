import styles from "./orderInfo.module.scss";

const OrderInfo = ({ messageSended, formData }) => {
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
  const messageSended = () => {};
  return (
    <div className={styles.overlay}>
      <div className={styles.orderDiv}>
        <div>×</div>
        <div>
          <h1>
            Cette information peut être traitée par le serveur pour valider la
            commande et accepter le paiement
          </h1>
          <h2>Information de la commande:</h2>
          <h3>
            {formData.bouquets.map((bouquet) => (
              <span key={bouquet.id}>{bouquet.name} </span>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default OrderInfo;
