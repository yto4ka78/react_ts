import React, { useEffect, useState } from "react";
import styles from "./manageCategories.module.scss";

const ManageCategories = ({ setActiveView, setCategoryToModify }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: [],
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));
    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));

    URL.revokeObjectURL(urlToRemove);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 1) {
      setMessage("❌ Pas plus d'une photo");
      setShowMessage(true);
    }
    setShowMessage(false);
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData({ ...formData, photo: [...formData.photo, file] });
    const url = URL.createObjectURL(file);
    setPreviewPhotos([...previewPhotos, url]);
  };

  const fetchcategories = async () => {
    try {
      const response = localStorage.getItem("dataStorage");
      if (!response) return;
      const raw = JSON.parse(response);
      setAllCategories(raw.categories);
    } catch (error) {}
  };
  useEffect(() => {
    fetchcategories();
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const stored = localStorage.getItem("dataStorage");
      const dataStorage = stored ? JSON.parse(stored) : {};
      const currentCategories = Array.isArray(dataStorage.categories)
        ? dataStorage.categories
        : [];

      const updatedCategories = currentCategories.filter(
        (c) => c.id !== categoryId
      );

      const updatedData = {
        ...dataStorage,
        categories: updatedCategories,
      };

      localStorage.setItem("dataStorage", JSON.stringify(updatedData));

      setMessage("✅ Categorie supprimée");
      setShowMessage(true);
      setAllCategories(updatedCategories);
    } catch (error) {
      setMessage("❌ Ошибка при удалении категории");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name.trim()) {
        setMessage("❌ Entrez le nom de la catégorie");
        setShowMessage(true);
        return;
      }
      if (formData.photo.length > 1) {
        setMessage("❌ Pas plus d'une photo");
        setShowMessage(true);
        return;
      }
      if (formData.photo.length === 0) {
        setMessage("❌ Ajoutez une photo");
        setShowMessage(true);
        return;
      }
      const file = formData.photo[0];
      const imageUrl = await fileToDataURL(file);
      const stored = localStorage.getItem("dataStorage");
      const dataStorage = stored ? JSON.parse(stored) : {};
      const currentCategories = Array.isArray(dataStorage.categories)
        ? dataStorage.categories
        : [];
      const generateId = () =>
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now());

      const newCategory = {
        id: generateId(),
        name: formData.name,
        imageUrl: [imageUrl],
        showAfterPopular: false,
        showInMenu: false,
        showInNavBar: false,
        showInPopular: false,
      };

      const updatedData = {
        ...dataStorage,
        categories: [...currentCategories, newCategory],
      };

      localStorage.setItem("dataStorage", JSON.stringify(updatedData));
      setAllCategories(updatedData.categories);
      setFormData({ name: "", photo: [] });
      setPreviewPhotos([]);
      setMessage("✅ Catégorie ajoutée");
      setShowMessage(true);
    } catch (error) {
      setMessage("❌ Error.");
      setShowMessage(true);
    }
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 6000);
  };

  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  return (
    <div className={styles.manageCategories_main}>
      <form onSubmit={handleSubmit} className={styles.manageCategories_form}>
        <label htmlFor="">Nom de la categorie</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="photo">Ajouter une photo</label>
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

        <div
          className={`${styles.manageCategories_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
      </form>

      <div className={styles.manageCategories_header}>
        <span className={styles.categories_column}>Noms</span>
        <span className={styles.categories_column}></span>
        <span className={styles.categories_column}></span>
      </div>
      <div className={styles.manageCategories_body}>
        {allCategories.map((category) => (
          <div className={styles.categories}>
            <span className={styles.categories_column}>{category.name}</span>
            <button
              onClick={() => {
                setCategoryToModify(category);
                setActiveView("ModifyCategory");
              }}
            >
              Changer
            </button>
            <button onClick={() => handleDelete(category.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
