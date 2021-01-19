import Vue from 'vue';
import App from './components/App';
import {BootstrapVue} from 'bootstrap-vue'

async function bootstrap() {
    Vue.use(BootstrapVue);
    return new Promise((resolve) => {
        new Vue({
            el: '#app',
            render: h => h(App),
            mounted() {
                resolve();
            }
        });
    })
}

bootstrap();
