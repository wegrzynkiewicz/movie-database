const express = require('express');
const {createApi} = require('./api');
const {createConnection, createFavoritesModel} = require('./favorites');

(async function bootstrap() {
    await createConnection();
    const app = express();
    const Favorites = await createFavoritesModel();
    const api = createApi({Favorites});
    
    app.use('/api', api);
    
    app.listen(3000, '0.0.0.0', () => {
        console.log('Server started listening...');
    });
})();
