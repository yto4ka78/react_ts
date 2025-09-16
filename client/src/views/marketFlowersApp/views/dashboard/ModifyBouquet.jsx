import React, { useState, useEffect } from "react";
import styles from "./ModifyBouquet.module.scss";
// Все операции выполняются локально через localStorage

const ModifyBouquet = ({ bouquet }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    saleprice: "",
    photo: [],
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [photoToDeleted, setPhotoToDeleted] = useState([]);
  const [bouquetId, setBouquetId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchcategories = () => {
      try {
        const response = localStorage.getItem("dataStorage");
        if (!response) return;
        const raw = JSON.parse(response);
        setAllCategories(Array.isArray(raw?.categories) ? raw.categories : []);
      } catch (error) {}
    };
    fetchcategories();
    if (!bouquet) return;
    setFormData((prev) => ({
      name: bouquet?.name || "",
      description: bouquet?.description || "",
      price: bouquet?.price || "",
      saleprice: bouquet?.saleprice || "",
      photo: [],
    }));
    setPreviewPhotos(
      Array.isArray(bouquet?.imageUrl)
        ? bouquet.imageUrl
        : bouquet?.imageUrl
        ? [bouquet.imageUrl]
        : []
    );
    let initialCategoryIds = [];
    try {
      const raw = localStorage.getItem("dataStorage");
      if (raw) {
        const parsed = JSON.parse(raw);
        const bouquetCategory = Array.isArray(parsed?.bouquetCategory)
          ? parsed.bouquetCategory
          : [];
        initialCategoryIds = bouquetCategory
          .filter((bc) => bc.bouquet_id === bouquet.id)
          .map((bc) => String(bc.category_id));
      }
    } catch (e) {}
    setCategoriesSelected(initialCategoryIds);
    setBouquetId(bouquet.id);
  }, [bouquet]);

  const removeCategory = (idToRemove) => {
    setCategoriesSelected((prev) => prev.filter((cat) => cat !== idToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCategory = () => {
    if (
      selectedCategoryId &&
      !categoriesSelected.includes(selectedCategoryId)
    ) {
      setCategoriesSelected([...categoriesSelected, selectedCategoryId]);
      setSelectedCategoryId("");
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, photo: [...formData.photo, ...files] });

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewPhotos([...previewPhotos, ...urls]);
  };

  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));
    setPhotoToDeleted((prev) => [...prev, urlToRemove]);
    URL.revokeObjectURL(urlToRemove);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filesToDataUrls = (files) =>
      Promise.all(
        Array.from(files || []).map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(file);
            })
        )
      );
    try {
      const stored = localStorage.getItem("dataStorage");
      if (!stored) throw new Error("dataStorage is empty");
      const parsed = JSON.parse(stored);

      const bouquets = Array.isArray(parsed?.bouquets) ? parsed.bouquets : [];
      const bouquetCategory = Array.isArray(parsed?.bouquetCategory)
        ? parsed.bouquetCategory
        : [];
      const currentBouquetId = String(bouquetId || bouquet?.id || "");
      if (!currentBouquetId) throw new Error("No bouquet id provided");
      const idx = bouquets.findIndex((b) => String(b.id) === currentBouquetId);
      if (idx === -1) {
        setShowMessage(true);
        setMessage("Букет не найден в локальном хранилище");
        return;
      }
      const current = bouquets[idx] || {};
      const existingImages = Array.isArray(current?.imageUrl)
        ? current.imageUrl
        : current?.imageUrl
        ? [current.imageUrl]
        : [];

      const keptImages = existingImages.filter(
        (url) => !photoToDeleted.includes(url)
      );
      const newImages = await filesToDataUrls(formData.photo);
      const nextImages = [...keptImages, ...newImages].slice(0, 5);
      const nextBouquet = {
        ...current,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        saleprice: formData.saleprice,
        imageUrl: nextImages,
      };
      const nextBouquets = [...bouquets];
      nextBouquets[idx] = nextBouquet;
      const existingForBouquet = bouquetCategory.filter(
        (bc) => String(bc.bouquet_id) === currentBouquetId
      );

      const existingIds = new Set(
        existingForBouquet.map((bc) => String(bc.category_id))
      );
      const selectedIds = new Set(categoriesSelected.map((id) => String(id)));

      const toAdd = Array.from(selectedIds).filter(
        (id) => !existingIds.has(id)
      );
      const toRemoveIds = Array.from(existingIds).filter(
        (id) => !selectedIds.has(id)
      );
      let nextBouquetCategory = bouquetCategory.filter(
        (bc) =>
          String(bc.bouquet_id) !== currentBouquetId ||
          !toRemoveIds.includes(String(bc.category_id))
      );
      const additions = toAdd.map((id) => ({
        bouquet_id: currentBouquetId,
        category_id: Number(id),
      }));
      nextBouquetCategory = [...nextBouquetCategory, ...additions];
      const nextData = {
        ...parsed,
        bouquets: nextBouquets,
        bouquetCategory: nextBouquetCategory,
      };
      localStorage.setItem("dataStorage", JSON.stringify(nextData));

      setPhotoToDeleted([]);
      setFormData((prev) => ({ ...prev, photo: [] }));
      setPreviewPhotos(nextImages);
      setShowMessage(true);
      setMessage("Букет сохранен");
    } catch (error) {
      console.error(error);
      setShowMessage(true);
      setMessage("Ошибка изменения букета");
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  if (!bouquet) {
    return (
      <div>
        <h2>Erreur de chargement du bouquet</h2>
      </div>
    );
  }

  return (
    <div className={styles.createBouquet_main}>
      <form className={styles.createBouquet_main_form} onSubmit={handleSubmit}>
        <div
          className={`${styles.createBouquet_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
        <label htmlFor="name">Nom du bouquet</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="price">Prix</label>
        <input
          id="price"
          name="price"
          type="text"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="saleprice">Remise</label>
        <input
          id="saleprice"
          name="saleprice"
          type="text"
          value={formData.saleprice}
          onChange={handleChange}
        />
        <label htmlFor="category">Catégorie </label>
        <div className={styles.createBouquet_main_form_category}>
          <select
            id="category"
            name="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">Sans catégorie </option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              addCategory();
            }}
            className={styles.button_add}
          >
            ✚
          </button>
        </div>
        <div>
          {categoriesSelected.map((id) => {
            const category = allCategories.find((cat) => String(cat.id) === id);
            return (
              <div key={id}>
                <div
                  className={styles.createBouquet_main_form_categorySelected}
                >
                  {category?.name || "Catégorie n'est pas trouvé "}
                  <button
                    type="button"
                    onClick={() => removeCategory(id)}
                    className={styles.button_remove}
                  >
                    Supprimer
                  </button>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <div>5 photos max</div>
        <label htmlFor="photo">Charger des photos</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={handleFileChange}
          multiple
        />
        <div className={styles.div_preview}>
          {previewPhotos.map((url, index) => (
            <div key={index} className={styles.preview}>
              <button type="button" onClick={() => removePhoto(url)}>
                ×
              </button>
              <img src={url} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className={styles.button_save} type="submit">
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default ModifyBouquet;
