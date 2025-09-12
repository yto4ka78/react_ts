import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./profile.module.scss";
import NotificationMessage from "../../UI/notificationMessage/NotificationMessage";
import api from "../../../../utils/api";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    familyname: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState({});
  const [responseMessage, setResponseMessage] = useState("");

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (data) => {
    const newErrors = {};
    if (!data.name?.trim()) newErrors.name = "Sasir prénom";
    if (!data.surname?.trim()) newErrors.surname = "Sasir nom affiché";
    if (!data.familyname?.trim()) newErrors.familyname = "Sasir nom";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) newErrors.email = "Incorrect email";

    return newErrors;
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrorMessage(newErrors);
    if (Object.keys(newErrors).length) {
      setResponseMessage("");
      return;
    } else {
      setResponseMessage("Profil mis à jour avec succès");
      setErrorMessage({});
    }
  };

  return (
    <div className={styles.profile_mainContainer}>
      <form action="" onSubmit={handleSubmitInfo}>
        <div>
          <div className={styles.profile_title}>Informations de contact</div>
          {responseMessage && (
            <div className={styles.successContainer}>
              <div className={styles.successMessage}>✅ {responseMessage}</div>
            </div>
          )}
          {Object.keys(errorMessage).length > 0 && (
            <div className={styles.errorContainer}>
              <div className={styles.errorTitle}>
                ⚠️Erreur de mise à jour du profil:
              </div>
              <div className={styles.errorMessage}>
                <ul>
                  {Object.entries(errorMessage).map(([key, message]) => (
                    <li key={key}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className={styles.profile_mainSection}>
            <div className={styles.profile_section}>
              <label htmlFor="name"> Prenom *</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChangeForm}
                value={formData.name}
              />
              <label htmlFor="surname"> Nom affiché *</label>
              <input
                type="text"
                id="surname"
                name="surname"
                onChange={handleChangeForm}
                value={formData.surname}
              />
            </div>
            <div className={styles.profile_section}>
              <label htmlFor="familyname"> Nom *</label>
              <input
                type="text"
                id="familyname"
                name="familyname"
                onChange={handleChangeForm}
                value={formData.familyname}
              />
              <label htmlFor="email"> Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChangeForm}
                value={formData.email}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.profile_title}>Mot de passe</div>
          <div className={styles.profile_section}>
            <label htmlFor="oldPassword">
              {" "}
              Mot de passe actuel (laissez vide pour ne pas le changer)
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              onChange={handleChangeForm}
              value={formData.oldPassword}
            />
            <label htmlFor="newPassword">
              {" "}
              Nouveau mot de passe (laissez vide pour ne pas le changer)
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              onChange={handleChangeForm}
              value={formData.newPassword}
            />
            <label htmlFor="repeatPassword">
              {" "}
              Confirmez le nouveau mot de passe
            </label>
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              onChange={handleChangeForm}
              value={formData.repeatPassword}
            />
          </div>
        </div>
        <button type="submit">ENREGISTRER</button>
      </form>
    </div>
  );
};

export default Profile;
