const {getMovie, getMovies} = require('./movie');

const express = require('express');
const asyncHandler = require('express-async-handler');

function createApi() {
    
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
    
    api.get('/movie', asyncHandler(async (req, res) => {
        const {eid} = req.query;
        const {data} = await getMovie({eid});
        const movie = {
            eid: data.imdbID,
            image: data.Poster,
            title: data.Title,
            plot: data.Plot,
            isFavorite: true,
        };
        res.json({movie});
    }));
    
    api.post('/favorite', asyncHandler(async (req, res) => {
        // TODO:
        res.json({ok:true});
    }));
    
    api.delete('/favorite', asyncHandler(async (req, res) => {
        // TODO:
        res.json({ok:true});
    }));

    return api;
}

exports.createApi = createApi;
