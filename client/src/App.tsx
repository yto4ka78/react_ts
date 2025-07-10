import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.back_ground}>
      <div className={styles.root_div}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
