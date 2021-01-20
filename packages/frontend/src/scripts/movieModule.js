import {createPaginationModule} from './paginationModule';

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

async function updateMovies(state, {movies}) {
    state.movies = movies;
}

async function search({commit, state}) {
    commit('updateStatus', 'loading');
    const {data} = await api({
        path: '/movies',
        query: {
            name: state.searchName,
            page: state.pagination.page,
        }
    });
    const {movies, total} = data;

    commit('pagination/updateTotal', total);
    commit('updateMovies', {movies});
    commit('updateStatus', 'finish');
}

export function createMovieModule() {
    return {
        actions: {
            search,
        },
        mutations: {
            updateMovies,
            updateSearchName(state, payload) {
                state.searchName = payload;
                state.pagination.page = 1;
            },
            updateStatus(state, payload) {
                state.status = payload;
            },
        },
        namespaced: true,
        modules: {
            pagination: createPaginationModule(),
        },
        state() {
            return {
                searchName: '',
                status: 'start',
                movies: [],
            }
        },
    }
}
