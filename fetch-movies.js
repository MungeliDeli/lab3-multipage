const API_KEY = "api_key=48e3935c5f71efc8fac221cb8952350e";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const searchForm = document.getElementById("form");
const search = document.getElementById("query");
const noResultsMessage = document.createElement("p");
const loader = document.getElementById("loader");
const loaderContainer = document.getElementById("loader-content");

getMovies(API_URL);

// page loader 
function showLoader() {
  loaderContainer.style.display = "block";

  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
}


// gtting all movies 
function getMovies(url) {
  showLoader();
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    })
    .catch((err) => {
      console.error("Failed to fetch movies:", err);
    })
    .finally(() => {
      hideLoader();
    });
}


// sh0wing only the first 20 movies 
function showMovies(data) {
  main.innerHTML = "";

  if (data.length === 0) {
    noResultsMessage.textContent = "No movies found. Try a different search.";
    noResultsMessage.classList.add("no-results-message");
    searchForm.appendChild(noResultsMessage);
    return;
  }

  if (main.contains(noResultsMessage)) {
    main.removeChild(noResultsMessage);
  }

  data.forEach((movie) => {
    const { title, poster_path, overview } = movie;

    const shortOverview =
      overview.split(" ").slice(0, 20).join(" ") +
      (overview.split(" ").length > 20 ? "..." : "");

    const card = document.createElement("div");
    card.classList.add("service-card");

    const imgSrc = poster_path
      ? IMG_PATH + poster_path
      : "images/default-poster.jpg";

    card.innerHTML = `
      <div class="service-card-image">
        <img src="${imgSrc}" alt="${title}" />
      </div>
      <h2>${title}</h2>
      <p>${shortOverview}</p>
    `;

    main.appendChild(card);
  });
}


// search bar 
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const searchItem = search.value.trim();

  if (searchItem) {
    getMovies(SEARCHAPI + "&query=" + searchItem);
    search.value = "";
  }
});
