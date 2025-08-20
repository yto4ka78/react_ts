import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import PageTransition from "../pageTransition/PageTransition";
import styles from "./layout.module.scss";
import { HideAndShowNavBarProvider } from "./HideAndShowNavBarProvider";
export default function Layout() {
  return (
    <div className={styles.back_ground}>
      <div className={styles.root_div}>
        <HideAndShowNavBarProvider>
          <Navbar />
          <PageTransition>
            <Outlet />
          </PageTransition>
        </HideAndShowNavBarProvider>
      </div>
    </div>
  );
}
