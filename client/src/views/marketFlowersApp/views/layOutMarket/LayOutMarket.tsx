import { Outlet } from "react-router-dom";
import NavBarMarket from "../navBarMarket/NavBarMarket";
import styles from "./layOutMarket.module.scss";
import {
  HeightForOverlayProvider,
  useHeightForOverlay,
} from "./HeightForOverlay";
import { useEffect } from "react";
import FooterMarket from "../../UI/footerMarket/FooterMarket";

function HeightBinder() {
  const { setHeight } = useHeightForOverlay();
  useEffect(() => {
    const element = document.getElementById("site_frame");
    if (!element) return;

    const compute = () => {
      const el = document.getElementById("site_frame");
      if (!el) return;
      setHeight((el as HTMLDivElement).offsetHeight);
    };

    compute();
  }, [setHeight]);
  return null;
}

export default function LayOutMarket() {
  return (
    <div className={styles.flexLayOut}>
      <div className={styles.nameOfProject}>Market Flower</div>
      <div className={styles.back_ground}>
        <HeightForOverlayProvider>
          <HeightBinder />
          <div id="site_frame" className={styles.site_frame} />
          <NavBarMarket />
          <div className={styles.make_full_height}>
            <Outlet />
          </div>
          <FooterMarket />
        </HeightForOverlayProvider>
      </div>
    </div>
  );
}
