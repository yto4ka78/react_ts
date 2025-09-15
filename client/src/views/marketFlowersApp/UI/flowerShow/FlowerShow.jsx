import React, { useState } from "react";
import styles from "./flowerShow.module.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/carteSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FlowerShow = ({ flower, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={styles.main_product} key={index}>
      <Link
        className={styles.main_product_link}
        to={`/marketFlowers/product_page/${flower.id}`}
        state={{ id: flower.id }}
      >
        <img src={flower.imageUrl[0]} alt={flower.name} />
      </Link>
      <div className={styles.flower_description}>
        <div className={styles.flowerName}>{flower.name}</div>
        <div style={{ flex: 1 }}></div>
        <div className={styles.flowerStock}>Fleurs en stock</div>
        <div className={styles.flowerPrice}>
          {flower.saleprice ? (
            <div className={styles.flowerSaleStyles}>
              <div className={styles.flowerSalePrice}>{flower.saleprice} €</div>
              <div className={styles.flowerOldPrice}> {flower.price} €</div>
              <div className={styles.flowerPercentSale}>
                -
                {Math.round(
                  ((flower.price - flower.saleprice) / flower.price) * 100
                )}
                %
              </div>
            </div>
          ) : (
            <div className={styles.flowerNormalPrice}> {flower.price} €</div>
          )}
        </div>
      </div>
      <div>
        <div className={styles.flowerButton}>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: flower.id,
                  price: flower.saleprice || flower.price,
                  size: "S",
                })
              );
              navigate("/basket");
            }}
          >
            Acheter
          </button>
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: flower.id,
                  price: flower.saleprice || flower.price,
                  size: "S",
                })
              );
              toast.success("Ajouté!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
              });
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowerShow;
