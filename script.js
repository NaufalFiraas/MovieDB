const inputTitle = document.getElementById('input-title');
const btnSearch = document.getElementById('btn-search');
const contentContainer = document.getElementsByClassName('content-container')[0];

btnSearch.addEventListener('click', async function (e) {
    const moviesResponse = await getMovies(inputTitle.value);
    if (moviesResponse.Response === 'True') {
        const movies = moviesResponse.Search;
        contentContainer.innerHTML = showMovies(movies);

        const btnDetail = document.getElementsByClassName('btn-detail');
        for (let i = 0; i < btnDetail.length; i++) {
            btnDetail[i].addEventListener('click', async function (e) {
                e.preventDefault();
                const details = await getMovieDetails(this.dataset.imdbid);
                contentContainer.innerHTML = showDetails(details);
            });
        }
    } else {
        contentContainer.innerHTML = showError();
    }
});

async function getMovies(title) {
    const request = new Request(`http://www.omdbapi.com/?apikey=854e54f9&s=${title}`, {
        method: 'GET'
    });

    const response = await fetch(request);
    return response.json();
}

async function getMovieDetails(imdbid) {
    const request = new Request(`http://www.omdbapi.com/?apikey=854e54f9&i=${imdbid}`, {
        method: 'GET',
    });

    const response = await fetch(request);
    return response.json();
}

function showMovies(movies) {
    let cards = ``;
    movies.forEach(movie => {
        cards += `<div class="movie-card">
                    <img src="${movie.Poster}"
                        alt="poster-image">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                    <a href="" type="button" id="btn-detail" class="btn-detail" name="btn-detail" data-imdbid="${movie.imdbID}">Details</a>
                </div>`
    });
    return `<div class="movies-container">${cards}</div>`;
}

function showError() {
    return `<div class="not-found-container">
                <h1>Movie Not Found!</h1>
            </div>`;
}

function showDetails(movie) {
    return `<div class="detail-container">
                <img src="${movie.Poster}"
                    alt="">
                <h2 style="color: white;">${movie.Title}</h2>
                <table cellspacing="5">
                    <tr>
                        <th>Released</th>
                        <td>: ${movie.Released}</td>
                    </tr>
                    <tr>
                        <th>Duration</th>
                        <td>: ${movie.Runtime}</td>
                    </tr>
                    <tr>
                        <th>Genre</th>
                        <td>: ${movie.Genre}</td>
                    </tr>
                    <tr>
                        <th>Director</th>
                        <td>: ${movie.Director}</td>
                    </tr>
                    <tr>
                        <th>Writer</th>
                        <td>: ${movie.Writer}</td>
                    </tr>
                    <tr>
                        <th>Actors</th>
                        <td>: ${movie.Actors}</td>
                    </tr>
                    <tr>
                        <th>Plot</th>
                        <td>: ${movie.Plot}</td>
                    </tr>
                </table>
            </div>`;
}