<template>
    <div class="container">
        <h1 class="my-5">
            Your favorites movies
        </h1>
    </div>
</template>

<script>
import Loading from './Loading';

export default {
    components: {
        Loading,
    },
    computed: {
        movies() {
            return this.$store.state.movies.movies;
        },
    },
    methods: {
    },
};
</script>
