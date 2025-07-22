const apiKey = '2b06e9152316d36cd8a11dbbf2257f5e';
$(document).ready(function () {
    // Fetch popular movies
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
});
