import React, { useState, useEffect } from "react";
import styles from "./createBouquet.module.scss";

const CreateBouquet = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    photo: [],
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchcategories = () => {
      try {
        const stored = localStorage.getItem("dataStorage");
        if (!stored) return;
        const parsed = JSON.parse(stored);
        setAllCategories(
          Array.isArray(parsed?.categories) ? parsed.categories : []
        );
      } catch (error) {}
    };
    fetchcategories();
  }, []);

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
    const currentCount = previewPhotos.length;
    const remaining = Math.max(0, 5 - currentCount);
    const filesArr = Array.from(files).slice(0, remaining);
    if (filesArr.length === 0) return;

    setFormData({ ...formData, photo: [...formData.photo, ...filesArr] });

    const urls = filesArr.map((file) => URL.createObjectURL(file));
    setPreviewPhotos([...previewPhotos, ...urls]);
  };

  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));

    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));

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
      const parsed = stored ? JSON.parse(stored) : {};
      const bouquets = Array.isArray(parsed?.bouquets) ? parsed.bouquets : [];
      const bouquetCategory = Array.isArray(parsed?.bouquetCategory)
        ? parsed.bouquetCategory
        : [];

      const newId = Date.now().toString();
      const newImages = await filesToDataUrls(formData.photo);
      const imageUrl = newImages.slice(0, 5);

      const newBouquet = {
        id: newId,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        saleprice: formData.salePrice,
        imageUrl,
      };

      const additions = categoriesSelected.map((id) => ({
        bouquet_id: newId,
        category_id: Number(id),
      }));

      const nextData = {
        ...parsed,
        bouquets: [...bouquets, newBouquet],
        bouquetCategory: [...bouquetCategory, ...additions],
      };
      localStorage.setItem("dataStorage", JSON.stringify(nextData));

      setShowMessage(true);
      setMessage("Bouquet ajouté");
      setIsError(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        salePrice: "",
        photo: [],
      });
      setPreviewPhotos([]);
      setCategoriesSelected([]);
      setSelectedCategoryId("");
    } catch (error) {
      setShowMessage(true);
      setMessage("Error!");
      setIsError(true);
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  return (
    <div className={styles.createBouquet_main}>
      <form className={styles.createBouquet_main_form} onSubmit={handleSubmit}>
        <div
          className={`${styles.createBouquet_message} ${
            showMessage ? styles.visible : styles.hidden
          } ${isError ? styles.error : styles.success}`}
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
          required
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
        <label htmlFor="salePrice">Remise</label>
        <input
          id="salePrice"
          name="salePrice"
          type="text"
          value={formData.salePrice}
          onChange={handleChange}
        />
        <label htmlFor="category">Categorie</label>
        <div className={styles.createBouquet_main_form_category}>
          <select
            className={styles.select}
            id="category"
            name="category"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option className={styles.option} value="">
              Sans categorie
            </option>
            {allCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name || category.Name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              addCategory();
            }}
          >
            ✚
          </button>
        </div>
        <div>
          {categoriesSelected.map((id) => {
            const category = allCategories.find(
              (cat) => String(cat.id) === String(id)
            );
            return (
              <div
                className={styles.createBouquet_main_form_categorySelected}
                key={id}
              >
                {category?.name || category?.Name} <hr />
              </div>
            );
          })}
        </div>
        <label htmlFor="photo">Ajouter des photos</label>
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
                ✖
              </button>
              <img src={url} alt={`Preview ${index + 1}`} />
            </div>
          ))}
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default CreateBouquet;
