<template>
    <div class="container">
        <Loading v-show="$store.state.movies.status === 'loading'" />
        <div v-show="$store.state.movies.status === 'finish'">
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
                            <router-link
                                :to="{name: 'movie', params: {eid:movie.eid}}"
                                class="d-block btn btn-outline-primary stretched-link"
                            >
                                Show more...
                            </router-link>
                        </div>
                    </article>
                </div>
            </div>
            <div class="row">
                <Pagination
                    module="movies"
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
            return this.$store.state.movies.movies;
        },
    },
    mounted() {
        this.$store.commit('movies/updateStatus', 'start');
    },
    methods: {
        async onPaginationUpdate() {s
            await this.$store.dispatch('movies/search');
        },
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
