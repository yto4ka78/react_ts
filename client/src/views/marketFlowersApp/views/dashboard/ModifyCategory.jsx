import React, { useEffect, useState } from "react";
import styles from "./ModifyCategory.module.scss";
const ModifyCategory = ({ category: initialCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    photo: [],
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [photoToDeleted, setPhotoToDeleted] = useState([]);

  useEffect(() => {
    setFormData({
      name: initialCategory.name,
      photo: [],
    });
    setPreviewPhotos(initialCategory.imageUrl || []);
  }, []);

  const removePhoto = (urlToRemove) => {
    const indexToRemove = previewPhotos.indexOf(urlToRemove);
    setPreviewPhotos((prev) => prev.filter((url) => url !== urlToRemove));

    setFormData((prev) => ({
      ...prev,
      photo: prev.photo.filter((_, index) => index !== indexToRemove),
    }));
    setPhotoToDeleted((prev) => [...prev, urlToRemove]);

    URL.revokeObjectURL(urlToRemove);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length > 1 || previewPhotos.length + files.length > 1) {
      setMessage("❌ Pas plus d'une photo");
      setShowMessage(true);
      return;
    }
    setShowMessage(false);

    const file = files[0];
    setFormData({ ...formData, photo: [...formData.photo, file] });
    const url = URL.createObjectURL(file);
    setPreviewPhotos([...previewPhotos, url]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name.trim()) {
        setMessage("❌ Entrez le nom de la catégorie");
        setShowMessage(true);
        return;
      }
      if (previewPhotos.length > 1) {
        setMessage("❌ Pas plus d'une photo");
        setShowMessage(true);
        return;
      }

      const stored = localStorage.getItem("dataStorage");
      const dataStorage = stored ? JSON.parse(stored) : {};
      const currentCategories = Array.isArray(dataStorage.categories)
        ? dataStorage.categories
        : [];

      const index = currentCategories.findIndex(
        (c) => c.id === initialCategory.id
      );
      if (index === -1) {
        setMessage("❌ Catégorie introuvable");
        setShowMessage(true);
        return;
      }

      const existing = currentCategories[index];

      let nextImageUrls = (existing.imageUrl || []).filter(
        (url) => !photoToDeleted.includes(url)
      );

      if (formData.photo && formData.photo.length > 0) {
        const file = formData.photo[0];
        const imageUrl = await fileToDataURL(file);
        nextImageUrls = [imageUrl];
      }

      if (nextImageUrls.length === 0 && previewPhotos.length === 0) {
        setMessage("❌ Ajoutez une photo");
        setShowMessage(true);
        return;
      }

      const updatedCategory = {
        ...existing,
        name: formData.name,
        imageUrl: nextImageUrls.length > 0 ? nextImageUrls : previewPhotos,
      };

      const updatedCategories = [...currentCategories];
      updatedCategories[index] = updatedCategory;

      const updatedData = {
        ...dataStorage,
        categories: updatedCategories,
      };

      localStorage.setItem("dataStorage", JSON.stringify(updatedData));

      setMessage("✅ Catégorie mise à jour");
      setShowMessage(true);
      setPreviewPhotos(updatedCategory.imageUrl);
      setPhotoToDeleted([]);
      setFormData((prev) => ({ ...prev, photo: [] }));
    } catch (error) {
      setMessage("❌ Ошибка при добавлении категории.");
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
    <div className={styles.modifyCategory_main}>
      <form onSubmit={handleSubmit} className={styles.modifyCategory_form}>
        <div
          className={`${styles.modifyCategory_message} ${
            showMessage ? styles.visible : styles.hidden
          }`}
        >
          {message}
        </div>
        <label htmlFor="">Nom de la catégorie</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="photo"> Ajoieter une photo</label>
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
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default ModifyCategory;
