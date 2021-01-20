<template>
    <div class="row">
        <div
            v-for="movie of movies"
            :key="movie.eid"
            class="col col--poster"
        >
            <article class="card card--movie">
                <img
                    :src="movie.image"
                    class="card-img-top card-img--movie"
                    :alt="movie.title"
                >
                <div class="card-body">
                    <h1 class="card-title">
                        {{ movie.title }}
                    </h1>
                    <a
                        href="#"
                        class="d-block btn btn-outline-primary stretched-link"
                        @click="show(movie.eid)"
                    >
                        Show more...
                    </a>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        movies() {
            return this.$store.state.movie.movies;
        },
    },
    methods: {
        show() {
            
        }
    }
};
</script>

<style lang="scss">

.card-title {
    font-size: 1rem;
}

.card-img--movie {
    height: 370px;
}

.card--movie {
    margin-bottom: 20px;
}

.col--poster {
    flex-basis: 20%;
}

</style>
