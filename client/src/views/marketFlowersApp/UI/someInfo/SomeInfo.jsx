import React from "react";
import styles from "./SomeInfo.module.scss";
import icon_someInfo2 from "../../assets/images/icon_someInfo2.png";
import icon_someInfo1 from "../../assets/images/icon_someInfo1.png";

const SomeInfo = () => {
  return (
    <div className={styles.main_someInfo}>
      <div className={styles.someInfo_centre}>
        <div className={styles.someInfo_flex}>
          <div className={styles.someInfo_image}>
            <img src={icon_someInfo1} alt="" />
          </div>
          <div>
            <p className={styles.someInfo_textBold}>Garantie de fraîcheur</p>
            <p className={styles.someInfo_textNormal}>7 jours</p>
          </div>
        </div>
        <div className={styles.someInfo_flex}>
          <div className={styles.someInfo_image}>
            {" "}
            <p>10%</p>
          </div>
          <div>
            <p className={styles.someInfo_textBold}>Remise de 10%</p>
            <p className={styles.someInfo_textNormal}>
              En cas de retrait sur place
            </p>
          </div>
        </div>
        <div className={styles.someInfo_flex}>
          <div className={styles.someInfo_image2}>
            <img src={icon_someInfo2} alt="" />
          </div>
          <div>
            <p className={styles.someInfo_textNormal}>Paiement</p>
            <p className={styles.someInfo_textBold}>rapide par virement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SomeInfo;
