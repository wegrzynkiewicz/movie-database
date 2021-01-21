const {getMovie, getMovies} = require('./movie');

const express = require('express');
const asyncHandler = require('express-async-handler');

function createApi({Favorites}) {

    const api = new express.Router();

    api.get('/movies', asyncHandler(async (req, res) => {
        const {name, page} = req.query;
        const {data} = await getMovies({name, page});
        const movies = data.Search.map((movie) => ({
            eid: movie.imdbID,
            image: movie.Poster,
            title: movie.Title,
            type: movie.Type,
            year: movie.Year,
        }));
        const total = data.totalResults;
        res.json({movies, total});
    }));

    api.get('/movie/:eid', asyncHandler(async (req, res) => {
        const {eid} = req.params;
        const [{data}, count] = await Promise.all([
            getMovie({eid}),
            Favorites.countDocuments({
                userId: 'todo',
                favoriteMovies: {
                    $in: [eid],
                },
            }),
        ]);
        const movie = {
            eid: data.imdbID,
            image: data.Poster,
            title: data.Title,
            plot: data.Plot,
            isFavorite: count >= 1,
        };
        res.json({movie, count});
    }));

    api.post('/favorite/:eid', asyncHandler(async (req, res) => {
        const eid = req.params.eid;
        await Favorites.updateOne(
            {userId: 'todo'},
            {$push: {favoriteMovies: eid}},
            {upsert: true},
        );
        res.json({ok: true});
    }));

    api.delete('/favorite/:eid', asyncHandler(async (req, res) => {
        const eid = req.params.eid;
        await Favorites.updateOne(
            {userId: 'todo'},
            {$pull: {favoriteMovies: eid}},
            {upsert: true},
        );
        res.json({ok: true});
    }));

    api.get('/favorites', asyncHandler(async (req, res) => {
        const favorites = await Favorites.findOne(
            {userId: 'todo'},
        );
        const {favoriteMovies} = favorites;
        res.json({favoriteMovies});
    }));

    return api;
}

exports.createApi = createApi;
