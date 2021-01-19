import Vue from 'vue';
import App from './components/App';

async function bootstrap() {
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
