import {loadAuth} from './scripts/googleAuth';
import {initVue} from './scripts/initVue';

document.addEventListener('DOMContentLoaded', async () => {
    initVue('#app');
    loadAuth();
})
