const superagent = require('superagent');

function getUrl(params) {
    const searchParams = new URLSearchParams();
    searchParams.append('apikey', 'd7e259ae');
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value);
    } 
    const queryString = searchParams.toString();
    const url = `http://www.omdbapi.com/?${queryString}`;
    return url;
}

async function request(params) {
    const url = getUrl(params);
    const response = await superagent.get(url);
    const data = JSON.parse(response.text);
    return {response, data};
}

async function getMovies({name, page}) {
    return await request({s: name, page});
}

async function getMovie({eid}) {
    return await request({
        i: eid,
        plot: 'full',
    });
}

exports.getMovies = getMovies;
exports.getMovie = getMovie;
