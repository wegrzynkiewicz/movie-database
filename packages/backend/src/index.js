const express = require('express');
const {createApi} = require('./api');

const app = express();
const api = createApi();

app.use('/api', api);

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started listening...');
});
