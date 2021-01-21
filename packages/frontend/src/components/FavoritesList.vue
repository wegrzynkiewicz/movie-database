<template>
    <div class="container">
        <h1 class="my-5">
            Your favorites movies
        </h1>
        <MovieList :pagination="false" />
    </div>
</template>

<script>
import MovieList from './MovieList';

export default {
    components: {
        MovieList,
    },
    created() {
        this.$store.commit('movies/updateStatus', 'loading');
        this.$store.dispatch('movies/getFavoriteMovies');
    },
};
</script>
