import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import styles from "./categorySpecial.module.scss";
import PaginatedCategories from "../../UI/pagination/PaginatedCategories";
import { useParams } from "react-router-dom";

const CategorySpecial = () => {
  const { id } = useParams();
  const [nameCategory, setNameCategory] = useState("Розы");
  const [allBouquets, setAllBouquets] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const raw = localStorage.getItem("dataStorage");
        if (!raw) return;
        const data = JSON.parse(raw);
        const bouquets = Array.isArray(data?.bouquets) ? data.bouquets : [];
        const categories = Array.isArray(data?.categories)
          ? data.categories
          : [];
        const bouquetCategory = Array.isArray(data?.bouquetCategory)
          ? data.bouquetCategory
          : [];
        const category = categories.find((c) => String(c.id) === String(id));
        if (category?.name) {
          setNameCategory(category.name);
        }
        const bouquetIds = bouquetCategory
          .filter((link) => String(link.category_id) === String(id))
          .map((link) => link.bouquet_id);
        const filteredBouquets = bouquets.filter((b) =>
          bouquetIds.includes(b.id)
        );

        setAllBouquets(filteredBouquets);
      } catch (error) {
        console.error("Ошибка загрузки категории", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.categorySpecial_main}>
      <h3>{nameCategory}</h3>
      <h5>Si vous avez des questions, écrivez-moi sur WhatsApp !</h5>
      {!Array.isArray(allBouquets) ? (
        <div>Загрузка букетов...</div>
      ) : (
        <PaginatedCategories allBouquets={allBouquets} />
      )}
    </div>
  );
};

export default CategorySpecial;
