const imgs = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const img = document.querySelectorAll('#imgs img');

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

let idx = 0;

const changeImage = () => {
  if (idx > img.length - 1) {
    idx = 0;
  } else if (idx < 0) {
    idx = img.length - 1;
  }

  imgs.style.transform = `translateX(${-idx * 100}%)`;
};

const run = () => {
  idx++;
  changeImage();
};

let interval = setInterval(run, 5000);

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 5000);
}

rightBtn.addEventListener('click', () => {
  idx++;
  changeImage();
  resetInterval();
});

leftBtn.addEventListener('click', () => {
  idx--;
  changeImage();
  resetInterval();
});

const API_URL_POPULAR =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7a99de78c37341de6b10a183483f8f1c&page=1';
const API_URL_KIDS =
  'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=7a99de78c37341de6b10a183483f8f1c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=7a99de78c37341de6b10a183483f8f1c&query="';

/// *** FETCH DATA FUNC *** ///
const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);

  console.log(data.results);
};

getMovies(API_URL_POPULAR);
// getMovies(API_URL_KIDS);

/// *** SHOW MOVIES FUNC *** ///
const showMovies = (movies) => {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = ` <img class="poster" src="${
      IMG_PATH + poster_path
    }" alt="${title}" />
    <div class="movie-info">
      <div class="title-container">
        <h3 class="movie-title">${title}</h3>
        <h4 class="date-released">${release_date}</h4>
      </div>
      <span class="${getClassByRate(vote_average)} rt">${vote_average}</span>
    </div>
    <div class="overview">
      <h3 class="ov">Overview</h3>
      <p>
        ${overview}
      </p>
    </div>`;

    main.appendChild(movieEl);
  });
};

/// *** MANIPULATE RATINGS FUNCTION *** ///
const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) return 'orange';
  else {
    return 'red';
  }
};

/// *** SEARCH FUNC *** ///
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});

/////////////////AUTO TEXT EFFECT//////////
const textEl = document.querySelector('.desc');
const text = 'Latest and most popular movies across the Globe.';
let i = 1;

function writeText() {
  textEl.innerText = text.slice(0, i);

  i++;

  if (i > text.length) {
    i = 1;
  }

  setTimeout(writeText, 300);
}

writeText();
