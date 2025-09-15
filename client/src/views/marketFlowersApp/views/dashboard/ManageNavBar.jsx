import React, { useEffect, useState } from "react";
import styles from "./manageNavBar.module.scss";
import api from "../../../../utils/api";

const ManageNavBar = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [newCategoryInNavBar, setNewCategoryInNavBar] = useState(null);
  const [categoriesInNavBav, setCategoriesInNavBar] = useState([]);

  const [newCategoryInMenu, setNewCategoryInMenu] = useState(null);
  const [categoriesInMenu, setCategoriesInMenu] = useState([]);

  const [newPopularCategory, setNewPopularCategory] = useState(null);
  const [popularCategories, setPopularCategories] = useState([]);

  const [newAfterPopularCategory, setNewAfterPopularCategory] = useState(null);
  const [afterPopularCategories, setAfterPopularCategories] = useState([]);

  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const response = localStorage.getItem("dataStorage");
        if (!response) return;
        const raw = JSON.parse(response);
        setAllCategories(raw.categories);
        setCategoriesInNavBar(
          raw.categories.filter((category) => category.showInNavBar === true)
        );
        setCategoriesInMenu(
          raw.categories.filter((category) => category.showInMenu === true)
        );
        setPopularCategories(
          raw.categories.filter((category) => category.showInPopular === true)
        );
        setAfterPopularCategories(
          raw.categories.filter(
            (category) => category.showAfterPopular === true
          )
        );
      } catch (error) {}
    };
    fetchcategories();
  }, []);

  const handleCategoryInNavBar = (value) => {
    setNewCategoryInNavBar(value);
  };
  const handleCategoryInMenuChange = (value) => {
    setNewCategoryInMenu(value);
  };
  const handlePopularCategoryChange = (value) => {
    setNewPopularCategory(value);
  };

  const handleNewAfterPopularCategoryChange = (value) => {
    setNewAfterPopularCategory(value);
  };

  const handleAddCategoryInNavBar = async () => {
    try {
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);

      const updatedCategories = raw.categories.map((category) =>
        String(category.id) === String(newCategoryInNavBar)
          ? { ...category, showInNavBar: true }
          : category
      );
      const updatedData = { ...raw, categories: updatedCategories };
      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedCategories);
      setCategoriesInNavBar(
        updatedCategories.filter((category) => category.showInNavBar === true)
      );
    } catch (error) {}
  };

  const handleAddCategoryInMenu = async () => {
    try {
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);

      const updatedCategories = raw.categories.map((category) =>
        String(category.id) === String(newCategoryInMenu)
          ? { ...category, showInMenu: true }
          : category
      );
      const updatedData = { ...raw, categories: updatedCategories };
      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedCategories);
      setCategoriesInMenu(
        updatedCategories.filter((category) => category.showInMenu === true)
      );
    } catch (error) {}
  };

  const handleAddPopularCategory = async () => {
    try {
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);

      const updatedCategories = raw.categories.map((category) =>
        String(category.id) === String(newPopularCategory)
          ? { ...category, showInPopular: true }
          : category
      );
      const updatedData = { ...raw, categories: updatedCategories };
      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedCategories);
      setPopularCategories(
        updatedCategories.filter((category) => category.showInPopular === true)
      );
    } catch (error) {}
  };

  const handleAddAfterPopularCategory = async () => {
    try {
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);

      const updatedCategories = raw.categories.map((category) =>
        String(category.id) === String(newAfterPopularCategory)
          ? { ...category, showAfterPopular: true }
          : category
      );
      const updatedData = { ...raw, categories: updatedCategories };
      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedCategories);
      setAfterPopularCategories(
        updatedCategories.filter(
          (category) => category.showAfterPopular === true
        )
      );
    } catch (error) {}
  };

  const handleDeleteCategory = async (categoryId, type) => {
    try {
      // Получаем данные из localStorage
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);

      // Определяем какое поле нужно установить в false
      let fieldToUpdate = "";
      if (type === "menu") {
        fieldToUpdate = "showInMenu";
      } else if (type === "navBar") {
        fieldToUpdate = "showInNavBar";
      } else if (type === "popular") {
        fieldToUpdate = "showInPopular";
      } else if (type === "afterPopular") {
        fieldToUpdate = "showAfterPopular";
      }

      // Обновляем категорию, устанавливая нужное поле в false
      const updatedCategories = raw.categories.map((category) =>
        category.id === categoryId
          ? { ...category, [fieldToUpdate]: false }
          : category
      );
      const updatedData = { ...raw, categories: updatedCategories };
      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedCategories);

      if (type === "menu") {
        setCategoriesInMenu(
          updatedCategories.filter((cat) => cat.showInMenu === true)
        );
      } else if (type === "navBar") {
        setCategoriesInNavBar(
          updatedCategories.filter((cat) => cat.showInNavBar === true)
        );
      } else if (type === "popular") {
        setPopularCategories(
          updatedCategories.filter((cat) => cat.showInPopular === true)
        );
      } else if (type === "afterPopular") {
        setAfterPopularCategories(
          updatedCategories.filter((cat) => cat.showAfterPopular === true)
        );
      }
    } catch (error) {}
  };

  return (
    <div className={styles.manageNavBar_main}>
      <div className={styles.manageNavBar_title}>
        Ajout de catégories pour le bouton "Menu":
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Choisir une catégorie parmi les existantes:</label>
        <div>
          <select onChange={(e) => handleCategoryInMenuChange(e.target.value)}>
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddCategoryInMenu}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInMenu.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.name}</div>
            <button onClick={() => handleDeleteCategory(category.id, "menu")}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className={styles.manageNavBar_title}>
        Ajouter de catégorie à la barre de navigation:
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Choisir une catégorie parmi les existantes:</label>
        <div>
          <select onChange={(e) => handleCategoryInNavBar(e.target.value)}>
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddCategoryInNavBar}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {categoriesInNavBav.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.name}</div>
            <button onClick={() => handleDeleteCategory(category.id, "navBar")}>
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className={styles.manageNavBar_title}>
        Catégories dans le bloc "Catégories populaires:
      </div>
      <form action="" className={styles.form}>
        <label htmlFor="">Choisir une catégorie parmi les existantes:</label>
        <div>
          <select onChange={(e) => handlePopularCategoryChange(e.target.value)}>
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddPopularCategory}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {popularCategories.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.name}</div>
            <button
              onClick={() => handleDeleteCategory(category.id, "popular")}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      <div className={styles.manageNavBar_title}>Roses:</div>
      <form action="" className={styles.form}>
        <label htmlFor="">Choisir une catégorie parmi les existantes:</label>
        <div>
          <select
            onChange={(e) =>
              handleNewAfterPopularCategoryChange(e.target.value)
            }
          >
            {allCategories.map((category, index) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className={styles.button_addCategory}
            type="button"
            onClick={handleAddAfterPopularCategory}
          >
            ✚
          </button>
        </div>
      </form>
      <div className={styles.categotyInMenu}>
        {afterPopularCategories.map((category, index) => (
          <div key={index} className={styles.category}>
            <div>{category.name}</div>
            <button
              onClick={() => handleDeleteCategory(category.id, "afterPopular")}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNavBar;
