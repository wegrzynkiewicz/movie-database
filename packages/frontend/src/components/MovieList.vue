<template>
  <div class="row">
    <div class="col col--poster" v-for="movie of movies" :key="movie.eid">
      <article class="card card--movie">
        <img :src="movie.image" class="card-img-top card-img--movie" :alt="movie.title" />
        <div class="card-body">
          <h1 class="card-title">{{ movie.title }}</h1>
          <a href="#" @click="show(movie.eid)" class="d-block btn btn-outline-primary stretched-link">
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
    show(eid) {
      
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
