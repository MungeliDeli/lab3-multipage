const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("img");

// getting the theme from local storage
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

  // set and save them to local storage
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
  themeIcon.src = "images/light.png";
  themeIcon.alt = "Switch to light mode";
}

function setLightTheme() {
  root.style.setProperty("--theme-background-color-grey", "#f8f8f8");
  root.style.setProperty("--theme-background-color-white", "#ffffff");
  root.style.setProperty("--theme-text-color", "#333");
  root.style.setProperty("--theme-box-shadow", "#959da5");
  themeIcon.src = "images/dark.png";
  themeIcon.alt = "Switch to dark mode";
}

const form = document.querySelector(".contact-form");

// validating form
if (form) {
  form.addEventListener("submit", (e) => {
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
      response.style.display = "block";
    } else {
      alert(`Thanks, ${name}. We'll get back to you soon!`);
    }

    e.target.reset();
  });
}

// Fag display
document.querySelectorAll(".question").forEach((q) => {
  q.addEventListener("click", () => {
    q.nextElementSibling.classList.toggle("visible");
  });
});

// real time clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
  document.querySelector(".clock").textContent = formattedTime;
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

setInterval(updateClock, 1000); //updating in real time every second
updateClock();

// back to top
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
