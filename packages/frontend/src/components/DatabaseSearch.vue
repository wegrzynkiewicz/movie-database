<template>
  <div class="container">
    <b-form @submit="submit" inline>
      <label class="sr-only" for="video-name">Movie name</label>
      <b-form-input
        id="video-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Type example movie's name..."
        v-model="name"
      ></b-form-input>
      <b-button type="submit" variant="primary">Search</b-button>
    </b-form>
    <MovieList />
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
  methods: {
    submit(event) {
      event.preventDefault();
      const {name} = this;
      this.$store.dispatch("movie/search", { name });
    },
  },
};
</script>
