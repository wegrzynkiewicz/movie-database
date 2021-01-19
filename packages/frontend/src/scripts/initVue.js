import Vue from 'vue';
import Vuex from 'vuex'
import App from '../components/App';
import {createMovieModule} from './movieModule';
import {createUserModule} from './userModule';
import {BootstrapVue} from 'bootstrap-vue'

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
    Vue.use(Vuex);

    const {store} = initVuex();
    const promise = new Promise((resolve) => {
        const app = new Vue({
            mounted() {
                resolve();
            },
            render: h => h(App),
            store,
        });
        app.$mount(selector);
    });

    return promise;
}
