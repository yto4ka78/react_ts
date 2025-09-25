import React, { useEffect, useState } from "react";
import styles from "./ordersRoot.module.scss";
import ReactPaginate from "react-paginate";

const OrdersRoot = ({ setActiveView, setSelectedOrder }) => {
  const [allOrders, setAllOrders] = useState([]);

  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil((allOrders?.length || 0) / itemsPerPage);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(allOrders)
    ? allOrders.slice(offset, offset + itemsPerPage)
    : [];

  useEffect(() => {
    const handleGetOrders = () => {
      try {
        const stored = localStorage.getItem("dataStorage");
        if (!stored) {
          setAllOrders([]);
          return;
        }
        const parsed = JSON.parse(stored);
        const orders = Array.isArray(parsed?.orderDetails)
          ? parsed.orderDetails
          : [];
        setAllOrders(orders);
      } catch (error) {
        console.error("Ошибка загрузки заказов:", error);
        setAllOrders([]);
      }
    };
    handleGetOrders();
  }, []);
  return (
    <div>
      <div className={styles.orderRoot_header}>
        <span className={styles.orderRoot_column}>Expéditeur</span>
        <span className={styles.orderRoot_column}>Prix</span>
        <span className={styles.orderRoot_column}>Date de commande</span>
        <span className={styles.orderRoot_column}>Adresse</span>
        <span className={styles.orderRoot_column}>Numéro de téléphone</span>
        <span className={styles.orderRoot_column}></span>
      </div>
      <div className={styles.orderRoot_body}>
        {currentItems.map((order) => (
          <div key={order.id} className={styles.orderRoot_order}>
            <span className={styles.orderRoot_column}>
              {order.sendername || order.emailuser}
            </span>
            <span className={styles.orderRoot_column}>{order.totalPrice}</span>
            <span className={styles.orderRoot_column}>
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("ru-RU")
                : "Не указано"}
            </span>
            <span className={styles.orderRoot_column}>{order.address}</span>
            <span className={styles.orderRoot_column}>
              {order.sendernumberphone}
            </span>
            <button
              className={styles.orderRoot_column}
              onClick={() => {
                setActiveView("OrderRootDetail");
                setSelectedOrder(order);
              }}
            >
              En detail
            </button>
          </div>
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Назад"}
        nextLabel={"Вперёд →"}
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

export default OrdersRoot;
