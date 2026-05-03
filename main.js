const actionLabels = {
  start: "Simulan ang Laro",
  poems: "Koleksyon ng Tula",
  settings: "Mga Setting",
  audio: "Audio",
  menu: "Menu",
  info: "Impormasyon",
  home: "Home",
  "next-level-continue": "Susunod"
};

const menuScreen = document.querySelector(".menu-screen");
const introPanel = document.querySelector(".intro-panel:not(.intro-panel-next)");
const introPanelNext = document.querySelector(".intro-panel-next");

function showIntroPanel() {
  if (!menuScreen || !introPanel || !introPanelNext) {
    return;
  }

  menuScreen.classList.remove("show-intro-next");
  menuScreen.classList.add("show-intro");
  introPanel.hidden = false;
  introPanelNext.hidden = true;
}

function showIntroNextPanel() {
  if (!menuScreen || !introPanel || !introPanelNext) {
    return;
  }

  menuScreen.classList.remove("show-intro");
  menuScreen.classList.add("show-intro-next");
  introPanel.hidden = true;
  introPanelNext.hidden = false;
}

function showMainMenu() {
  if (!menuScreen || !introPanel || !introPanelNext) {
    return;
  }

  menuScreen.classList.remove("show-intro", "show-intro-next");
  introPanel.hidden = true;
  introPanelNext.hidden = true;
}

function makeTitleBackgroundTransparent() {
  const titleImage = document.querySelector(".title-image");
  if (!titleImage) {
    return;
  }

  const processImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = titleImage.naturalWidth;
    canvas.height = titleImage.naturalHeight;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(titleImage, 0, 0);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];

      // Remove the light gray/white matte around the imported title image.
      const isLightMatte = r > 190 && g > 190 && b > 190;
      if (isLightMatte) {
        pixels[i + 3] = 0;
      }
    }

    context.putImageData(imageData, 0, 0);
    titleImage.src = canvas.toDataURL("image/png");
  };

  if (titleImage.complete) {
    processImage();
    return;
  }

  titleImage.addEventListener("load", processImage, { once: true });
}

makeTitleBackgroundTransparent();

const buttons = document.querySelectorAll("[data-action]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "start" || action === "poems" || action === "settings") {
      window.location.href = `index.php?page=${action}`;
      return;
    }

    if (action === "home") {
      showMainMenu();
      return;
    }

    if (action === "info") {
      showIntroPanel();
      return;
    }

    if (action === "next-level") {
      showIntroNextPanel();
      return;
    }

    const label = actionLabels[action] || action;

    // Placeholder actions so the menu is clickable while game scenes are not yet wired.
    alert(`${label} clicked`);
  });
});
