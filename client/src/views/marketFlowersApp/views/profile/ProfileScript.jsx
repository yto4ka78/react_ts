import React, { useState } from "react";
import styles from "./profileScript.module.scss";
import ProfileOrders from "./ProfileOrders";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Adress from "./Adress";
import ProfileOrdersDetail from "./ProfileOrdersDetail";
import busket_profile from "../../assets/images/busket_profile.png";
import admin_profile from "../../assets/images/adminicon_profile.png";
import desconnecticon_profile from "../../assets/images/desconnecticon_profile.png";
import phonicon_profile from "../../assets/images/phoneicon_profile.png";

const ProfileScript = () => {
  const [activeProfileView, setActiveProfileView] = useState("profile");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const RenderMainProfile = () => {
    switch (activeProfileView) {
      case "profile":
        return <Profile />;
      case "orders":
        return (
          <ProfileOrders
            setActiveProfileView={setActiveProfileView}
            setSelectedOrder={setSelectedOrder}
          />
        );
      case "address":
        return <Adress />;
      case "profileOrderDetail":
        return (
          <ProfileOrdersDetail
            setActiveView={setActiveProfileView}
            order={selectedOrder}
          />
        );
      default:
        return <Profile />;
    }
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch {}
  };

  return (
    <div className={styles.profileScript_main}>
      <div className={styles.profileScript_navbar}>
        <button onClick={() => setActiveProfileView("orders")}>
          {" "}
          <img src={busket_profile} alt="" />
          Commandes
        </button>
        <hr />
        {/* <button onClick={() => setActiveProfileView("address")}>
          {" "}
          <img src="/phoneicon_profile.svg" alt="" />
          Адреса
        </button> */}
        <button onClick={() => setActiveProfileView("profile")}>
          <img src={phonicon_profile} alt="" />
          Info
        </button>
        <hr />

        <button onClick={() => navigate("/marketFlowers/dashboard")}>
          <img src={admin_profile} alt="" />
          Admin
        </button>
        <hr />
        <button>
          <img src={desconnecticon_profile} alt="" />
          Se decconecter
        </button>
      </div>
      <div>{RenderMainProfile()}</div>
    </div>
  );
};

export default ProfileScript;
