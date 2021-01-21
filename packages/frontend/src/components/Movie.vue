<template>
    <div class="container">
        <Loading v-if="$store.state.movie.status === 'loading'" />
        <article v-if="$store.state.movie.status === 'finish'">
            <div class="row my-5">
                <div class="col-md-4 text-center">
                    <img
                        :src="movie.image"
                        :alt="movie.title"
                    >
                </div>
                <div class="col-md-8">
                    <h1 class="mb-5">
                        {{ movie.title }}
                    </h1>
                    <p>{{ movie.plot }}</p>
                    <b-button
                        :variant="movie.isFavorite ? 'outline-danger' : 'outline-primary'"
                        @click="updateFavorite()"
                    >
                        <p class="h5 my-0">
                            <b-icon
                                :icon="movie.isFavorite ? 'heart-fill' : 'heart'"
                                class="align-middle"
                            />
                            {{ favorite }}
                        </p>
                    </b-button>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import Loading from "./Loading";

export default {
    components: {
        Loading,
    },
    computed: {
        favorite() {
            return this.movie.isFavorite ? 'Remove from favorites' : 'Add to Favorites';
        },
        movie() {
            return this.$store.state.movie.movie;
        },
    },
    mounted() {
        const { eid } = this.$route.params;
        this.$store.dispatch("movie/getMovie", { eid });
    },
    methods: {
        updateFavorite() {
            const eid = this.movie.eid;
            const isFavorite = !this.movie.isFavorite;
            this.$store.dispatch('movie/favorite', {eid, isFavorite});
        }
    }
};
</script>
