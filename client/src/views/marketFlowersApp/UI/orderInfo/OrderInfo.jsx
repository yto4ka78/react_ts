import styles from "./orderInfo.module.scss";

const OrderInfo = ({ message, setShowOrderInfo }) => {
  console.log(message);
  return (
    <div className={styles.overlay}>
      <div className={styles.orderDiv}>
        <div className={styles.flex_button}>
          <p>Order info</p>
          <button onClick={() => setShowOrderInfo(false)}>×</button>
        </div>
        <div className={styles.order_message}>
          <h3>{message}</h3>
          <h1>
            ❗Cette information peut être traitée par le serveur pour valider la
            commande et accepter le paiement
          </h1>
        </div>
      </div>
    </div>
  );
};
export default OrderInfo;
