import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';
import App from '../components/App';
import {createMovieModule} from './movieModule';
import {createUserModule} from './userModule';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import DatabaseSearch from '../components/DatabaseSearch'
import FavoritesList from '../components/FavoritesList'
import Movie from '../components/Movie'

function initRouter() {
    const routes = [
        {name: 'start', path: '/', redirect: {name: 'movies'}},
        {name: 'favorities', path: '/favorities', component: FavoritesList},
        {name: 'movies', path: '/movies', component: DatabaseSearch},
        {name: 'movie', path: '/movie/:eid', component: Movie},
    ]
    const router = new VueRouter({
        mode: 'history',
        routes
    });
    return {router};
}

function initVuex() {

    const store = new Vuex.Store({
        modules: {
            movie: createMovieModule(),
            user: createUserModule(),
        }
    });

    return {store};
}

export async function initVue(selector) {

    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VueRouter)
    Vue.use(Vuex);

    const {store} = initVuex();
    const {router} = initRouter();
    const promise = new Promise((resolve) => {
        const app = new Vue({
            mounted() {
                resolve();
            },
            render: h => h(App),
            router,
            store,
        });
        app.$mount(selector);
    });

    return promise;
}
