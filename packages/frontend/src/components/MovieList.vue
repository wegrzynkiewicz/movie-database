<template>
    <div class="">
        <Loading v-show="$store.state.movie.status === 'loading'" />
        <div v-show="$store.state.movie.status === 'finish'">
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
            <div class="row">
                <Pagination
                    module="movie"
                    @update="onPaginationUpdate"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Loading from './Loading';
import Pagination from './Pagination';

export default {
    components: {
        Loading,
        Pagination,
    },
    computed: {
        movies() {
            return this.$store.state.movie.movies;
        },
    },
    methods: {
        show() {},
        async onPaginationUpdate() {
            await this.$store.dispatch('movie/search');
        },
    },
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
