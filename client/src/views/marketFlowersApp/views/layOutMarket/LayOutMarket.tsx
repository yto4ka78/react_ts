import { Outlet } from "react-router-dom";
import NavBarMarket from "../navBarMarket/NavBarMarket";
import styles from "./layOutMarket.module.scss";

export default function LayOutMarket() {
  return (
    <div className={styles.flexLayOut}>
      <div className={styles.nameOfProject}>Market Flower</div>
      <div className={styles.back_ground}>
        <div className={styles.site_frame} />
        <div className={styles.root_div}>
          <NavBarMarket />
          <div className={styles.borders_market}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
