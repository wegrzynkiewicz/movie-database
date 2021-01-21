import {api} from './api';
import {createPaginationModule} from './paginationModule';

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

    commit('updateMovies', movies);
    commit('pagination/updateTotal', parseInt(total));
    commit('updateStatus', 'finish');
}

async function getFavoriteMovies({commit}) {

    commit('updateStatus', 'loading');
    const {data} = await api({
        path: '/favorites',
        query: {},
    });
    const {favoriteMovies} = data;

    const promises = favoriteMovies.map(async (eid) => {
        const {data} = await api({
            path: `/movie/${eid}`,
            query: {},
        });
        const {movie} = data;
        return movie;
    });
    const movies = await Promise.all(promises);

    commit('updateMovies', movies);
    commit('updateStatus', 'finish');
}

export function createMoviesModule() {
    return {
        actions: {
            getFavoriteMovies,
            search,
        },
        mutations: {
            updateMovies(state, payload) {
                state.movies = payload;
            },
            updateSearchName(state, payload) {
                state.searchName = payload;
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
