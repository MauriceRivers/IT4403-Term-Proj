const apiKey = 'YOUR_API_KEY'; // Replace with your TMDb API key

$(document).ready(function () {
    loadPopularMovies();

    $('#search-button').on('click', function () {
        const query = $('#search-input').val().trim();
        if (query) {
            searchMovies(query);
        }
    });
});

function searchMovies(query) {
    $.ajax({
        url: `https://api.themoviedb.org/3/search/movie`,
        data: {
            api_key: apiKey,
            query: query,
            language: 'en-US',
            page: 1
        },
        success: function (data) {
            $('#app').html(`<h2>Search Results for "${query}"</h2>`);
            if (data.results.length === 0) {
                $('#app').append('<p>No results found.</p>');
                return;
            }
            data.results.forEach(movie => {
                $('#app').append(`
                    <div>
                        <h3>${movie.title}</h3>
                        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
                        <p>${movie.overview}</p>
                    </div>
                `);
            });
        },
        error: function () {
            $('#app').html('<p>Error loading search results.</p>');
        }
    });
}

function loadPopularMovies() {
    $.ajax({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
        method: 'GET',
        success: function (data) {
            $('#app').html('<h2>Popular Movies</h2>');
            data.results.forEach(movie => {
                $('#app').append(`
                    <div>
                        <h3>${movie.title}</h3>
                        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" />
                        <p>${movie.overview}</p>
                    </div>
                `);
            });
        },
        error: function () {
            $('#app').html('<p>Error loading movies.</p>');
        }
    });
}
