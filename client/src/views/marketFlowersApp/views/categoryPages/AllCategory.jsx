import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
import { Link } from "react-router-dom";
import styles from "./allCategory.module.scss";
import ContactWhatsApp from "../../UI/contactWhatsApp/ContactWhatsApp";
import PaginatedCategories from "../../UI/pagination/PaginatedCategories";

const AllCategory = () => {
  const [pupularCategories, setPopularCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allBouquets, setAllBouquets] = useState([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = (allCategories || []).slice(
    offset,
    offset + itemsPerPage
  );

  useEffect(() => {
    const getAllCategory = () => {
      try {
        const raw = localStorage.getItem("dataStorage");
        if (!raw) return;
        const data = JSON.parse(raw);
        if (
          !Array.isArray(data?.bouquets) ||
          !Array.isArray(data?.categories)
        ) {
          console.warn("Неверная структура dataStorage:", data);
          return;
        }
        const popular = data.categories.filter((c) => c.showInPopular === true);
        const afterPopular = data.categories.filter(
          (c) => c.showAfterPopular === true
        );

        setAllCategories(data.categories);
        setAllBouquets(data.bouquets);
        setPopularCategories(popular);
        setCategorySelected(afterPopular);
        console.log(data.categories);
      } catch (e) {
        console.error("Ошибка чтения dataStorage:", e);
      }
    };

    getAllCategory();
  }, []);

  return (
    <div className={styles.allCategories_main}>
      <div className={styles.allCategories_TextHeader}>
        <h2>
          Catégories <span>populaires</span>
        </h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(pupularCategories) &&
          pupularCategories.map((category) => (
            <Link
              to={`/marketFlowers/category/${category.id}`}
              key={category.id}
              state={{ id: category.id }}
              className={styles.allCategories_category}
            >
              <img src={category.imageUrl[0]} alt={category.name} />
              <div className={styles.category_title}>{category.name}</div>
            </Link>
          ))}
      </div>
      {categorySelected && (
        <div>
          <div className={styles.allCategories_TextHeader}>
            <h2>
              <span>Roses</span>
            </h2>
          </div>
          <div className={styles.allCategories_list}>
            {Array.isArray(categorySelected) &&
              categorySelected.map((category) => (
                <Link
                  to={`/marketFlowers/category/${category.id}`}
                  key={category.id}
                  state={{ id: category.id }}
                  className={styles.allCategories_category}
                >
                  <img src={category.imageUrl[0]} alt={category.name} />

                  <div className={styles.category_title}>{category.name}</div>
                </Link>
              ))}
          </div>
        </div>
      )}
      {/* {categorySelected &&
        categorySelected.map((category) => (
          <div>
            <div className={styles.allCategories_TextHeader}>
              <h2>
                <span>Розы</span>
              </h2>
            </div>
            <div className={styles.allCategories_list}>
              {Array.isArray(pupularCategories) &&
                pupularCategories.map((category) => (
                  <Link
                    to={`/category/${category.id}`}
                    key={category.id}
                    state={{ id: category.id }}
                    className={styles.allCategories_category}
                  >
                    <img src={category.imageUrl[0]} alt={category.Name} />
                    <div className={styles.category_title}>{category.Name}</div>
                  </Link>
                ))}
            </div>
          </div>
        ))} */}
      <div className={styles.allCategories_TextHeader}>
        <h2>
          <span>Autres </span>catégories
        </h2>
      </div>
      <div className={styles.allCategories_list}>
        {Array.isArray(allCategories) &&
          allCategories.map((category) => (
            <Link
              to={`/marketFlowers/category/${category.id}`}
              key={category.id}
              state={{ id: category.id }}
              className={styles.allCategories_category}
            >
              <img src={category.imageUrl[0]} alt={category.name} />
              <div className={styles.category_title}>{category.name}</div>
            </Link>
          ))}
      </div>

      <ContactWhatsApp></ContactWhatsApp>
      <PaginatedCategories allBouquets={allBouquets} />
    </div>
  );
};

export default AllCategory;
