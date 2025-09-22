import React, { useEffect, useState } from "react";
import styles from "./categorySpecial.module.scss";
import PaginatedCategories from "../../UI/pagination/PaginatedCategories";
import { useParams, useSearchParams } from "react-router-dom";

const CategorySpecial = () => {
  const [searchParams] = useSearchParams();
  const [nameCategory, setNameCategory] = useState("");
  const [allBouquets, setAllBouquets] = useState([]);
  const name = searchParams.get("name");
  const { id } = useParams();
  const decodedName = name ? decodeURIComponent(name) : null;

  useEffect(() => {
    if (!decodedName) return;
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

        const category = categories.find(
          (c) =>
            String(c?.name || "").toLowerCase() === decodedName.toLowerCase()
        );

        if (category?.id) {
          setNameCategory(category.name || decodedName);
          const bouquetIds = bouquetCategory
            .filter((link) => String(link.category_id) === String(category.id))
            .map((link) => link.bouquet_id);
          const filteredBouquets = bouquets.filter((b) =>
            bouquetIds.includes(b.id)
          );
          setAllBouquets(filteredBouquets);
        } else {
          // Если категория по имени не найдена
          setNameCategory(decodedName);
          setAllBouquets([]);
        }
      } catch (error) {
        console.error("Ошибка загрузки категории по name", error);
      }
    };
    fetchData();
  }, [decodedName]);

  useEffect(() => {
    if (decodedName) return; // приоритет у поиска по name
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
  }, [id, decodedName]);

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
