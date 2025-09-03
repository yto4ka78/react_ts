import React, { useState } from "react";
import styles from "./CheckBoxListPriceMain.module.scss";

const CheckBoxListPriceMain = ({ onFilterChange }) => {
  const options = [
    { label: "jusqu'à 20 €", range: [0, 20] },
    { label: "20 - 40 €", range: [25, 40] },
    { label: "40 - 55 €", range: [40, 55] },
    { label: "55 - 80 €", range: [55, 80] },
    { label: "à partir de 80 €", range: [80, Infinity] },
  ];

  const [selected, setSelected] = useState([]);

  const handleChange = (range) => {
    let updated = [...selected];
    const alreadySelected = updated.find(
      (item) => item[0] === range[0] && item[1] === range[1]
    );
    if (alreadySelected) {
      updated = updated.filter(
        (item) => !(item[0] === range[0] && item[1] === range[1])
      );
    } else {
      updated.push(range);
    }
    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className={styles.checkboxGroup}>
      {options.map(({ label, range }, index) => (
        <label key={index} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            onChange={() => handleChange(range)}
            checked={selected.some(
              (item) => item[0] === range[0] && item[1] === range[1]
            )}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckBoxListPriceMain;
