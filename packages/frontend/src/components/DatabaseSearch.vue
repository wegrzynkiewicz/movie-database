<template>
    <div class="container mt-5">
        <h1>Browse the best movies</h1>
        <b-form
            inline
            class="search-form"
            @submit="submit"
        >
            <label
                class="sr-only"
                for="video-name"
            >Movie name</label>
            <b-form-input
                id="video-name"
                v-model="name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Type example movie's name..."
            />
            <b-button
                type="submit"
                variant="primary"
            >
                Search
            </b-button>
        </b-form>
        <MovieList :pagination="true" />
    </div>
</template>

<script>
import MovieList from "./MovieList";

export default {
    components: {
        MovieList,
    },
    data() {
        return {
            name: "",
        };
    },
    created() {
        this.$store.commit('movies/updateStatus', 'start');
    },
    methods: {
        submit(event) {
            event.preventDefault();
            this.$store.commit('movies/updateSearchName', this.name);
            this.$store.dispatch('movies/search');
        },
    }
};
</script>

<style lang="scss">
.search-form {
  justify-content: center;
}
</style>
