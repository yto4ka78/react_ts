import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.scss";

const Gallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (Array.isArray(images) && images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  if (!Array.isArray(images) || images.length === 0 || !mainImage) {
    return <div>Нет изображений</div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <a href={mainImage} target="_blank" rel="noopener noreferrer">
          <img src={mainImage} alt="Главная фотография" />
        </a>
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Фото ${index + 1}`}
            onClick={() => setMainImage(img)}
            className={img === mainImage ? styles.active : ""}
          />
        ))}
      </div>
      <div className={styles.text}>
        * Arrivage frais de fleurs — garantie 7 jours sur le bouquet !
      </div>
    </div>
  );
};

export default Gallery;
