import {api} from './api';

async function getMovie({commit}, {eid}) {

    commit('updateStatus', 'loading');
    const {data} = await api({
        path: `/movie/${eid}`,
        query: {}
    });
    const {movie} = data;

    commit('updateMovie', movie);
    commit('updateStatus', 'finish');
}

async function favorite({commit, state}, {eid, isFavorite}) {

    await api({
        method: isFavorite ? 'POST' : 'DELETE',
        path: `/favorite/${eid}`,
        query: {},
    });

    const movie = {...state.movie, isFavorite};
    commit('updateMovie', movie);
}

export function createMovieModule() {
    return {
        actions: {
            favorite,
            getMovie,
        },
        mutations: {
            updateMovie(state, payload) {
                state.movie = payload;
            },
            updateStatus(state, payload) {
                state.status = payload;
            },
        },
        namespaced: true,
        state() {
            return {
                status: 'start',
                movie: null,
            }
        },
    }
}
