// theme data , making sure its added before the Domcontent is loaded 
// done to prevent the flickering effect 

(function () {
  const savedTheme = localStorage.getItem("theme");
  const root = document.documentElement;

  if (savedTheme === "dark") {
 root.style.setProperty("--theme-background-color-grey", "#1a1a1a");
 root.style.setProperty("--theme-background-color-white", "#181818");
    root.style.setProperty("--theme-text-color", "#f1f1f1");
    root.style.setProperty("--theme-box-shadow", "#000");
  } else {
    root.style.setProperty("--theme-background-color-grey", "#f8f8f8");
    root.style.setProperty("--theme-background-color-white", "#ffffff");
    root.style.setProperty("--theme-text-color", "#333");
    root.style.setProperty("--theme-box-shadow", "#959da5");
  }
})();
