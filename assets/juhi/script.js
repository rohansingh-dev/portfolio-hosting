// Dummy data for movies/shows
const MOVIES = [
  {
    id: 1,
    title: "The Lost City",
    year: 2022,
    genre: ["Action", "Adventure"],
    description: "A reclusive romance novelist and her cover model get swept up in a jungle adventure.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Midnight Sky",
    year: 2021,
    genre: ["Sci-Fi", "Drama"],
    description: "A scientist races to stop a crew of astronauts from returning home to a mysterious global catastrophe.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c5c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Comedy Nights",
    year: 2023,
    genre: ["Comedy"],
    description: "A group of friends navigate the ups and downs of life with laughter and heart.",
    image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Haunted Manor",
    year: 2020,
    genre: ["Horror", "Thriller"],
    description: "A family moves into a mysterious old house with a dark past.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c5c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Space Explorers",
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    description: "A team of astronauts embarks on a mission to the edge of the galaxy.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    banner: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80"
  }
];

function getDetailsLink(movieId) {
  // If on root (juhi.html), use assets/juhi/details.html; else, use details.html
  if (window.location.pathname.endsWith("juhi.html")) {
    return `assets/juhi/details.html?id=${movieId}`;
  } else {
    return `details.html?id=${movieId}`;
  }
}

function loadHero() {
  const hero = document.getElementById('hero-section');
  const featured = MOVIES[0];
  hero.innerHTML = `
    <img class="hero-bg" src="${featured.banner}" alt="${featured.title}">
    <div class="hero-content">
      <div class="hero-title">${featured.title}</div>
      <div class="hero-desc">${featured.description}</div>
      <a href="${getDetailsLink(featured.id)}" class="hero-btn">Watch Now</a>
    </div>
  `;
}

function loadTrending() {
  const row = document.getElementById('trending-row');
  row.innerHTML = '';
  MOVIES.forEach(movie => {
    row.appendChild(createMovieCard(movie));
  });
}

function loadGenres() {
  const genres = {};
  MOVIES.forEach(movie => {
    movie.genre.forEach(g => {
      if (!genres[g]) genres[g] = [];
      genres[g].push(movie);
    });
  });
  const genreList = document.getElementById('genre-list');
  genreList.innerHTML = '';
  Object.keys(genres).forEach(genre => {
    const section = document.createElement('div');
    section.className = 'genre-section';
    section.innerHTML = `<div class="genre-title">${genre}</div>`;
    const row = document.createElement('div');
    row.className = 'movie-row';
    genres[genre].forEach(movie => {
      row.appendChild(createMovieCard(movie));
    });
    section.appendChild(row);
    genreList.appendChild(section);
  });
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.onclick = () => {
    window.location.href = getDetailsLink(movie.id);
  };
  card.innerHTML = `
    <img class="movie-thumb" src="${movie.image}" alt="${movie.title}">
    <div class="movie-title">${movie.title}</div>
    <div class="movie-meta">${movie.year} &bull; ${movie.genre.join(', ')}</div>
  `;
  return card;
}

function loadDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const movie = MOVIES.find(m => m.id === id);
  const container = document.getElementById('details-container');
  if (!movie) {
    container.innerHTML = '<p style="padding:2em;">Movie/show not found.</p>';
    return;
  }
  container.innerHTML = `
    <img class="details-thumb" src="${movie.image}" alt="${movie.title}">
    <div class="details-content">
      <div class="details-title">${movie.title}</div>
      <div class="details-meta">${movie.year} &bull; ${movie.genre.join(', ')}</div>
      <div class="details-desc">${movie.description}</div>
      <a href="#" class="details-btn">Play</a>
    </div>
  `;
}
