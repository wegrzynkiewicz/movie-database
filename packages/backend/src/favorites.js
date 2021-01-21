const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    userId: String,
    favoriteMovies: [
        String,
    ],
});

async function createConnection() {
    return new Promise((resolve, reject)=> {
        mongoose.connect('mongodb://mongodb:27017/app', {
            authSource: 'admin',
            auth: {
                user: 'root',
                password: 'root',
            },
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const database = mongoose.connection;
        database.on('error', reject);
        database.once('open', resolve);
    })
}

async function createFavoritesModel() {
    const Favorites = mongoose.model('Favorites', favoritesSchema);
    return Favorites;
}

exports.createConnection = createConnection;
exports.createFavoritesModel = createFavoritesModel;
