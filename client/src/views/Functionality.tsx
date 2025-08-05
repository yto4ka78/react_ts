import sleep from "../middleware/outils";
import styles from "./main.module.scss";

//Div about me
export const handleDivAboutMe = async (
  targetElement: HTMLButtonElement,
  heightAboutMeHideDiv: number,
  heightExperienceHideDiv: number
) => {
  const idOfDiv = targetElement.dataset.div;
  if (!idOfDiv) return;
  const hideDiv = document.getElementById(idOfDiv);
  if (!hideDiv) return;

  switch (idOfDiv) {
    case "aboutMe_hideDiv":
      const flesh_aboutMe = document.getElementById("flesh_aboutMe");
      if (!flesh_aboutMe) return;
      await handleAnimationContainer(
        hideDiv,
        heightAboutMeHideDiv,
        flesh_aboutMe
      );
      break;
    case "expreience_hideDiv":
      const flesh_expreience = document.getElementById("flesh_expreience");
      if (!flesh_expreience) return;
      await handleAnimationContainer(
        hideDiv,
        heightExperienceHideDiv,
        flesh_expreience
      );
      break;
  }
};

async function handleAnimationContainer(
  element: HTMLElement,
  height: number,
  fleshElement: HTMLElement
) {
  const showElement = element.dataset.show;
  console.log(showElement);
  if (showElement === "true") {
    await handleHideAnimation(element, height, fleshElement);
  } else {
    await handleShowAnimation(element, height, fleshElement);
  }
}

export const handleHideAnimation = async (
  element: HTMLElement,
  height: number,
  fleshElement: HTMLElement
) => {
  for (let i = height; i >= 0; i -= 10) {
    element.style.height = i + "px";
    await sleep(1);
    console.log("Скрытие, текущая высота:", i);
  }
  element.classList.add(styles.hidden);
  fleshElement.classList.remove(styles.flesh_button_up);
  fleshElement.classList.add(styles.flesh_button_down);
  element.dataset.show = "false";
};

export const handleShowAnimation = async (
  element: HTMLElement,
  height: number,
  fleshElement: HTMLElement
) => {
  element.classList.remove(styles.hidden);
  for (let i = 0; i <= height; i += 10) {
    element.style.height = i + "px";
    console.log("Показ, текущая высота:", i);
    await sleep(1);
  }
  fleshElement.classList.remove(styles.flesh_button_down);
  fleshElement.classList.add(styles.flesh_button_up);
  element.dataset.show = "true";
};
