const API_KEY = "api_key=48e3935c5f71efc8fac221cb8952350e";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

// fetching the first 5 movies 
async function fetchTopMovies() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.results.slice(0, 5);
  } catch (err) {
    console.error("Failed to fetch top movies:", err);
    return [];
  }
}


document.addEventListener("DOMContentLoaded", async () => {
  const heroTitle = document.querySelector(".hero-content h1");
  const heroOverview = document.querySelector(".hero-content p");
  const heroImage = document.querySelector(".hero-image img");

  if (!heroTitle || !heroOverview || !heroImage) {
    console.warn("Hero elements not found.");
    return;
  }

  const movies = await fetchTopMovies();
  if (movies.length === 0) return;

  let index = 0;

  function updateHero(movie) {
    heroTitle.textContent = movie.title;
    heroOverview.textContent = movie.overview;
    heroImage.src = IMG_PATH + movie.poster_path;
    heroImage.alt = movie.title;
  }

  updateHero(movies[index]); 

  setInterval(() => {
    index = (index + 1) % movies.length;
    updateHero(movies[index]);
  }, 10000); 
});



// fetching the users from als (top viewers )
// loading the first 4 

const BRANCHES_CONTAINER = document.querySelector(".branches");
const LOAD_MORE_BTN = document.getElementById("loadViewerBtn");

let cachedUsers = [];
const imagePaths = Array.from(
  { length: 8 },
  (_, i) => `images/user${i + 1}.jpg`
); 


async function fetchUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    cachedUsers = data.slice(0, 8); 
    displayUsers(4); 
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
}


function displayUsers(count) {
  BRANCHES_CONTAINER.innerHTML = "";

  cachedUsers.slice(0, count).forEach((user, index) => {
    const div = document.createElement("div");
    div.classList.add("branch");
    div.innerHTML = `
      <img src="${imagePaths[index]}" alt="User ${index + 1}" />
      <h2>${user.name}</h2>
      <p>@${user.username}</p>
    `;
    BRANCHES_CONTAINER.appendChild(div);
  });
}


// loading the next 4
LOAD_MORE_BTN.addEventListener("click", () => {
  displayUsers(8);
  LOAD_MORE_BTN.style.display = "none";
});

document.addEventListener("DOMContentLoaded", fetchUsers);
