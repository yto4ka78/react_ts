import sleep from "../middleware/outils";
import styles from "./main.module.scss";

export const handleDivAboutMe = async (targetElement: HTMLButtonElement) => {
  let containerId;
  let fleshId;
  const idsOfDivs = targetElement.dataset.divId;
  if (!idsOfDivs) return;
  const idArray = idsOfDivs.split(",");
  console.log(idsOfDivs);
  if (idArray.length > 1) {
    containerId = idArray[0];
    fleshId = idArray[1];
    const hideDiv = document.getElementById(containerId);
    const flesh = document.getElementById(fleshId);
    if (!hideDiv || !flesh) return;
    await handleAnimationContainer(hideDiv, flesh);
  } else {
    containerId = idArray[0];
    const hideDiv = document.getElementById(containerId);
    if (!hideDiv) return;
    await handleAnimationContainer(hideDiv);
  }
};

async function handleAnimationContainer(
  element: HTMLElement,
  fleshElement?: HTMLElement
) {
  let showElement = element.dataset.show;
  if (!showElement) {
    element.setAttribute("data-show", "true");
    showElement = "true";
  }
  const checkAttributeHeight = element.dataset.height;
  if (!checkAttributeHeight) {
    const height = element.offsetHeight;
    element.setAttribute("data-height", height.toString());
  }
  if (showElement === "true") {
    await handleHideAnimation(element, fleshElement);
  } else {
    await handleShowAnimation(element, fleshElement);
  }
}

export const handleHideAnimation = async (
  element: HTMLElement,
  fleshElement?: HTMLElement
) => {
  const height = parseInt(element.dataset.height || "0");
  for (let i = height; i >= 0; i -= 10) {
    element.style.height = i + "px";
    await sleep(1);
  }
  element.classList.add(styles.hidden);
  if (fleshElement) {
    fleshElement.classList.remove(styles.flesh_button_up);
    fleshElement.classList.add(styles.flesh_button_down);
  }
  element.dataset.show = "false";
};

export const handleShowAnimation = async (
  element: HTMLElement,
  fleshElement?: HTMLElement
) => {
  element.classList.remove(styles.hidden);
  const height = parseInt(element.dataset.height || "0");
  for (let i = 0; i <= height; i += 10) {
    element.style.height = i + "px";
    await sleep(1);
  }
  if (fleshElement) {
    fleshElement.classList.remove(styles.flesh_button_down);
    fleshElement.classList.add(styles.flesh_button_up);
  }
  element.dataset.show = "true";
};
