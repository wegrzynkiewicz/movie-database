const express = require('express');
const asyncHandler = require('express-async-handler');
const superagent = require('superagent');

const app = express();
const api = new express.Router();

async function getMovies({name, page}) {
    const searchParams = new URLSearchParams();
    searchParams.append('apikey', 'd7e259ae');
    searchParams.append('p', page);
    searchParams.append('s', name);
    const queryString = searchParams.toString();
    const url = `http://www.omdbapi.com/?${queryString}`;
    const response = await superagent.get(url);
    const data = JSON.parse(response.text);
    return {response, data};
}

api.get('/movies', asyncHandler(async (req, res) => {
    const {name, page} = req.query;
    const {data} = await getMovies({name, page});
    const movies = data.Search.map((movie) => ({
        eid: movie.imdbID,
        image: movie.Poster,
        title: movie.Title,
        type: movie.Type,
        year: movie.Year,
    }));
    res.json({movies});
}));

app.use('/api', api);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started listening...');
});
