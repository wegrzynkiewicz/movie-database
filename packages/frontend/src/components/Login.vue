<template>
  <div class="container">
    <p>Access only after signing in:</p>
    <div id="google-sign-in-button"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("user/createSignInButton", { id: "google-sign-in-button" });
  },
};
</script>
