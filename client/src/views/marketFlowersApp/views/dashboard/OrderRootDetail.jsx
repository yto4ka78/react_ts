import React, { useState } from "react";
import styles from "./OrderRootDetail.module.scss";

const OrderRootDetail = ({ setActiveView, order }) => {
  const orderDetails = [
    { label: "Email du client", value: order?.emailuser || "Non indiqué" },
    {
      label: "Prénom du client",
      value: order?.sendername || "Non indiqué",
    },
    {
      label: "Nom de famille du client",
      value: order?.senderfamilyname || "Non indiqué",
    },
    {
      label: "Téléphone du client",
      value: order?.sendernumberphone || "Non indiqué",
    },
    {
      label: "Prénom du destinataire",
      value: order?.recipientname || "Non indiqué",
    },
    {
      label: "Téléphone du destinataire",
      value: order?.recipientnumberphone || "Non indiqué",
    },
    {
      label: "Prix",
      value: order?.totalPrice ? `${order.totalPrice} €` : "Non indiqué",
    },
    {
      label: "Bouquets",
      value: Array.isArray(order?.bouquets)
        ? order.bouquets
            .map((b) => `${b.name} — ${b.quantity} pcs — ${b.price} €`)
            .join("\n")
        : "—",
    },
    {
      label: "Commentaire de la commande",
      value: order?.comments || "Non indiqué",
    },
    {
      label: "Date de commande",
      value: order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("fr-FR")
        : "—",
    },
    { label: "Adresse", value: order?.address || "Retrait en magasin" },
    {
      label: "Statut",
      value:
        order?.status === "confirmed"
          ? "Confirmée"
          : order?.status === "pending"
          ? "En attente"
          : "—",
    },
  ];
  const [statusOrder, setStatusOrder] = useState(order.status);

  const handleSubmitOrder = (id) => {
    try {
      const stored = localStorage.getItem("dataStorage");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      const orders = Array.isArray(parsed?.orderDetails)
        ? parsed.orderDetails
        : [];

      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: "confirmed" } : order
      );

      const updatedData = {
        ...parsed,
        orderDetails: updatedOrders,
      };

      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setStatusOrder("confirmed");
    } catch (error) {
      console.error("Erreur de confirmation de commande:", error);
    }
  };

  const deleteOrder = (id) => {
    try {
      const stored = localStorage.getItem("dataStorage");
      if (!stored) return;

      const parsed = JSON.parse(stored);
      const orders = Array.isArray(parsed?.orderDetails)
        ? parsed.orderDetails
        : [];

      const updatedOrders = orders.filter((order) => order.id !== id);

      const updatedData = {
        ...parsed,
        orderDetails: updatedOrders,
      };

      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setActiveView("orders");
    } catch (error) {
      console.error("Erreur de suppression de commande:", error);
    }
  };
  return (
    <div className={styles.orderRootDetail_main}>
      <div className={styles.orderRootDetail_container}>
        {orderDetails.map((item, index) => (
          <div key={index} className={styles.orderRootDetail_row}>
            <p className={styles.orderRootDetail_label}>{item.label}</p>
            <p className={styles.orderRootDetail_value}>{item.value}</p>
          </div>
        ))}
        {statusOrder === "pending" ? (
          <div className={styles.orderDetails_buttons}>
            <button
              className={styles.button_confirmed}
              onClick={() => {
                handleSubmitOrder(order.id);
              }}
            >
              Confirmer
            </button>
            <button
              className={styles.button_deleted}
              onClick={() => {
                deleteOrder(order.id);
              }}
            >
              Supprimer
            </button>
          </div>
        ) : (
          <div className={styles.orderConfirmed_text}>
            ✅ Commande confirmée
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderRootDetail;
