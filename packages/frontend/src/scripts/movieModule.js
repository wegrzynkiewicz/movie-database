import {createUpdater} from './createUpdater';

async function api({method = 'GET', path, query}) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
        searchParams.append(key, value);
    }
    const queryString = searchParams.toString();
    const url = `/api${path}${(queryString === '' ? '' : `?${queryString}`)}`;

    const response = await fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    const data = await response.json();

    return {response, data};
}

async function updateMovies(state, {movies, total}) {
    state.total = total;
    state.movies = movies;
}

async function search({commit}, {name}) {
    const {data} = await api({
        path: '/movies',
        query: {
            name,
        }
    });
    const {movies} = data;
    const total = 100; // TODO:
    commit('updateMovies', {movies, total});
}

export function createMovieModule() {
    return {
        actions: {
            search,
        },
        mutations: {
            updateMovies,
            updateStatus: createUpdater('status'),
        },
        namespaced: true,
        state() {
            return {
                status: 'empty',
                movies: [],
                total: 0,
            }
        },
    }
}
