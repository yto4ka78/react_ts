import React, { useEffect, useState } from "react";
import styles from "./manageBouquet.module.scss";

const ManageBouquet = ({ setActiveView, setSelectedBouquet }) => {
  const [listBouquets, setListBouquets] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const stored = localStorage.getItem("dataStorage");
        if (!stored) {
          setListBouquets([]);
          return;
        }
        const dataStorage = JSON.parse(stored);
        const bouquets = Array.isArray(dataStorage.bouquets)
          ? dataStorage.bouquets
          : [];
        const categories = Array.isArray(dataStorage.categories)
          ? dataStorage.categories
          : [];
        const bouquetCategory = Array.isArray(dataStorage.bouquetCategory)
          ? dataStorage.bouquetCategory
          : [];

        const categoryIdToName = new Map(
          categories.map((c) => [c.id, c.name || c.Name || ""])
        );

        const bouquetsWithCategories = bouquets.map((b) => {
          const catNames = bouquetCategory
            .filter((bc) => bc.bouquet_id === b.id)
            .map((bc) => categoryIdToName.get(bc.category_id))
            .filter(Boolean);
          return { ...b, _categoryNames: catNames };
        });

        setListBouquets(bouquetsWithCategories);
      } catch (error) {}
    };
    fetchBouquets();
  }, []);

  const handleDelete = async (id) => {
    try {
      const stored = localStorage.getItem("dataStorage");
      const dataStorage = stored ? JSON.parse(stored) : {};
      const bouquets = Array.isArray(dataStorage.bouquets)
        ? dataStorage.bouquets
        : [];
      const bouquetCategory = Array.isArray(dataStorage.bouquetCategory)
        ? dataStorage.bouquetCategory
        : [];

      const nextBouquets = bouquets.filter((b) => b.id !== id);
      const nextBouquetCategory = bouquetCategory.filter(
        (bc) => bc.bouquet_id !== id
      );
      const nextData = {
        ...dataStorage,
        bouquets: nextBouquets,
        bouquetCategory: nextBouquetCategory,
      };
      localStorage.setItem("dataStorage", JSON.stringify(nextData));
      const categoryIdToName = new Map(
        (Array.isArray(nextData.categories) ? nextData.categories : []).map(
          (c) => [c.id, c.name || c.Name || ""]
        )
      );
      const bouquetsWithCategories = nextBouquets.map((b) => {
        const catNames = nextBouquetCategory
          .filter((bc) => bc.bouquet_id === b.id)
          .map((bc) => categoryIdToName.get(bc.category_id))
          .filter(Boolean);
        return { ...b, _categoryNames: catNames };
      });

      setMessage("✅ Букет удален");
      setShowMessage(true);
      setListBouquets(bouquetsWithCategories);
    } catch (error) {
      setMessage("❌ Ошибка при удалении букета");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  return (
    <div>
      <div
        className={`${styles.manageBouquets_message} ${
          showMessage ? styles.visible : styles.hidden
        }`}
      >
        {message}
      </div>
      <div className={styles.manageBouquet_header}>
        <span className={styles.bouquet_column}>Bouquet</span>
        <span className={styles.bouquet_column}>Catégorie</span>
        <span className={styles.bouquet_column}>Prix</span>
        <span className={styles.bouquet_column}></span>
        <span className={styles.bouquet_column}></span>
      </div>
      <div className={styles.manageBouquet_body}>
        {Array.isArray(listBouquets) &&
          listBouquets.map((bouquet) => (
            <div className={styles.Bouquet} key={bouquet.id}>
              <span className={styles.bouquet_column}>{bouquet.name}</span>
              <span className={styles.bouquet_column}>
                {(bouquet._categoryNames || []).join(", ")}
              </span>
              <span className={styles.bouquet_column}>{bouquet.price} €</span>
              <button
                type="button"
                onClick={() => {
                  setActiveView("ModifyBouquet");
                  setSelectedBouquet(bouquet);
                }}
                className={styles.bouquet_column}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDelete(bouquet.id);
                }}
                className={styles.bouquet_column}
              >
                Supprimer
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageBouquet;
