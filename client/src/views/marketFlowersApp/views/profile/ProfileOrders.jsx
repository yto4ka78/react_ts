import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profileOrders.module.scss";
import ReactPaginate from "react-paginate";

const ProfileOrders = ({ setActiveProfileView, setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);

  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((orders?.length || 0) / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(orders)
    ? orders.slice(offset, offset + itemsPerPage)
    : [];
  useEffect(() => {
    const handleGetOrders = () => {
      try {
        const stored = localStorage.getItem("dataStorage");
        if (!stored) {
          setOrders([]);
          return;
        }
        const parsed = JSON.parse(stored);
        const orders = Array.isArray(parsed?.orderDetails)
          ? parsed.orderDetails
          : [];
        setOrders(orders);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
        setOrders([]);
      }
    };
    handleGetOrders();
  }, []);
  return (
    <div className={styles.profileOrders_main}>
      <div className={styles.profileOrders_header}>
        <span className={styles.profileOrders_column}>Prix</span>
        <span className={styles.profileOrders_column}>Date de commande</span>
        <span className={styles.profileOrders_column}>Adresse</span>
        <span className={styles.profileOrders_column}>
          {" "}
          Numéro de téléphone
        </span>
        <span className={styles.profileOrders_column}></span>
      </div>
      <div className={styles.profileOrders_body}>
        {currentItems.length > 0 ? (
          currentItems.map((order) => (
            <div key={order.id} className={styles.profileOrders_order}>
              <span className={styles.profileOrders_column}>
                {order.totalPrice}
              </span>
              <span className={styles.profileOrders_column}>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("ru-RU")
                  : "Не указано"}
              </span>
              <span className={styles.profileOrders_column}>
                {order.address}
              </span>
              <span className={styles.profileOrders_column}>
                {order.sendernumberphone}
              </span>
              <button
                className={`${styles.profileOrders_column} ${styles.iconOnly}`}
                onClick={() => {
                  setActiveProfileView("profileOrderDetail");
                  setSelectedOrder(order);
                }}
              >
                📄
              </button>
              <button
                className={`${styles.profileOrders_column} ${styles.textOnly}`}
                onClick={() => {
                  setActiveProfileView("profileOrderDetail");
                  setSelectedOrder(order);
                }}
              >
                Подробно
              </button>
            </div>
          ))
        ) : (
          <div className={styles.NoOrdersInfo}>
            <div>Vous n'avez pas de commandes pour le moment.</div>
            <div>
              Si vous avez payé la commande mais ne la voyez pas ici, cela
              signifie que le gestionnaire n’a pas encore mis à jour le statut
              de la commande.{" "}
            </div>
          </div>
        )}
      </div>
      <ReactPaginate
        previousLabel={"← Retour"}
        nextLabel={"Suivant →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
      />
    </div>
  );
};

export default ProfileOrders;
