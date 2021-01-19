<template>
  <div>
    <NavBar />
    <div class="container">
      <h1>Movie Database</h1>
    </div>
    <component :is="component" />
  </div>
</template>

<script>
import DatabaseSearch from "./DatabaseSearch";
import NavBar from "./NavBar";
import Loading from "./Loading";
import Login from "./Login";

export default {
  components: {
    NavBar,
  },
  computed: {
    component() {
      switch (this.$store.state.user.status) {
          case 'pending': return Loading;
          case 'signed-in': return DatabaseSearch;
          case 'signed-out': return Login;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("user/checkToken");
  },
};
</script>
