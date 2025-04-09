const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setDarkTheme();
} else {
  setLightTheme();
}

themeToggle.addEventListener("click", () => {
  const currentBg = getComputedStyle(root)
    .getPropertyValue("--theme-background-color-grey")
    .trim();

  if (currentBg === "#f8f8f8" || currentBg === "rgb(248, 248, 248)") {
    setDarkTheme();
    localStorage.setItem("theme", "dark");
  } else {
    setLightTheme();
    localStorage.setItem("theme", "light");
  }
});

function setDarkTheme() {
  root.style.setProperty("--theme-background-color-grey", "#1a1a1a");
  root.style.setProperty("--theme-background-color-white", "#181818");
  root.style.setProperty("--theme-text-color", "#f1f1f1");
  root.style.setProperty("--theme-box-shadow", "#000");
}



function setLightTheme() {
  root.style.setProperty("--theme-background-color-grey", "#f8f8f8");
  root.style.setProperty("--theme-background-color-white", "#ffffff");
  root.style.setProperty("--theme-text-color", "#333");
  root.style.setProperty("--theme-box-shadow", "#959da5");
}

document.querySelector(".contact-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill out all fields.");
    return;
  }

  const response = document.getElementById("response");
  if (response) {
    response.innerText = `Thanks, ${name}. We'll get back to you soon!`;
  } else {
    alert(`Thanks, ${name}. We'll get back to you soon!`);
  }

  e.target.reset();
});
