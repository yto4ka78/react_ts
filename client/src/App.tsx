import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Main from "./views/main/Main";
import styles from "./App.module.scss";
import CvInfo from "./views/cvInfo/CvInfo";
import Navbar from "./views/navbar/Navbar";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className={`${styles.pageTransition} ${isVisible ? styles.visible : ""}`}
    >
      {children}
    </div>
  );
};

const AppRoutes = () => {
  return (
    <PageTransition>
      <Routes>
        <Route path="/cvInfo" element={<CvInfo />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <div className={styles.back_ground}>
      <div className={styles.root_div}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
