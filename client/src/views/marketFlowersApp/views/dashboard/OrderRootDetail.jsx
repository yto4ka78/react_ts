import React, { useState } from "react";
import styles from "./OrderRootDetail.module.scss";

const OrderRootDetail = ({ setActiveView, order }) => {
  const orderDetails = [
    { label: "Email заказчика", value: order?.emailuser || "Не указано" },
    {
      label: "Имя заказчика",
      value: order?.sendername || "Не указано",
    },
    {
      label: "Фамилия заказчика",
      value: order?.senderfamilyname || "Не указано",
    },
    {
      label: "Номер телефона заказчика",
      value: order?.sendernumberphone || "Не указано",
    },
    {
      label: "Имя получателя",
      value: order?.recipientname || "Не указано",
    },
    {
      label: "Телефон получателя",
      value: order?.recipientnumberphone || "Не указано",
    },
    {
      label: "Цена",
      value: order?.totalPrice ? `${order.totalPrice} €` : "Не указано",
    },
    {
      label: "Букеты",
      value: Array.isArray(order?.bouquets)
        ? order.bouquets
            .map((b) => `${b.name} — ${b.quantity} шт. — ${b.price} €`)
            .join("\n")
        : "—",
    },
    { label: "Дополнение к заказу", value: order?.comments || "Не указано" },
    {
      label: "Дата заказа",
      value: order?.createdAt
        ? new Date(order.createdAt).toLocaleDateString("ru-RU")
        : "—",
    },
    { label: "Адрес", value: order?.address || "Самовывоз" },
    {
      label: "Статус",
      value:
        order?.status === "confirmed"
          ? "Подтверждён"
          : order?.status === "pending"
          ? "Ожидает"
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
      console.error("Ошибка подтверждения заказа:", error);
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
      console.error("Ошибка удаления заказа:", error);
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
              Подтвердить
            </button>
            <button
              className={styles.button_deleted}
              onClick={() => {
                deleteOrder(order.id);
              }}
            >
              Удалить
            </button>
          </div>
        ) : (
          <div className={styles.orderConfirmed_text}>✅ Заказ Подтверждён</div>
        )}
      </div>
    </div>
  );
};

export default OrderRootDetail;
