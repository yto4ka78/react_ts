import React from "react";
import styles from "./navbar.module.scss";
const Navbar = () => {
  return (
    <div>
      <div className={styles.flex_buttons}>
        <a href="">Mon CV</a>
        <a href="">Testez mes projets</a>
        <a href="">Contacts</a>
        <a href="">Sosal?</a>
      </div>
    </div>
  );
};

export default Navbar;
