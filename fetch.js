const API_KEY = "api_key=48e3935c5f71efc8fac221cb8952350e";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI = BASE_URL + "/search/movie?" + API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);

      showMovies(data.results);
    });
}

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("query");

function showMovies(data) {
  main.innerHTML = ""; // Clear previous content

  data.forEach((movie) => {
    const { title, poster_path } = movie;

    const altImg = "dee.jpg";

    const card = document.createElement("div");
    card.classList.add("card");

    const imgSrc = poster_path ? IMG_PATH + poster_path : altImg;

    card.innerHTML = `
      <img src="${imgSrc}" alt="${title}" class="moviePoster" />
      <h3 class="movieTitle">${title}</h3>
    `;

    main.appendChild(card);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";
  const searchItem = search.value;

  if (searchItem) {
    getMovies(SEARCHAPI + "&query=" + searchItem);
    search.value = "";
  }
});
