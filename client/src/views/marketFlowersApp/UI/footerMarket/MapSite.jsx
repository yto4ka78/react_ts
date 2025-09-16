import React, { useEffect, useState } from "react";
import styles from "./MapSite.module.scss";
import { Link } from "react-router-dom";

const MapSite = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dataStorage");
      if (!stored) return;
      const dataStorage = JSON.parse(stored);
      const currentCategories = Array.isArray(dataStorage.categories)
        ? dataStorage.categories
        : [];
      const sortedCategories = [...currentCategories].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
      setCategories(sortedCategories);
    } catch {}
  }, []);
  return (
    <div className={styles.mapSite_container}>
      {categories &&
        categories.map((category) => (
          <Link
            key={category.id}
            to={`/marketFlowers/category/${category.id}`}
            className={styles.category}
          >
            <div> {category.name} </div>
          </Link>
        ))}
    </div>
  );
};

export default MapSite;
