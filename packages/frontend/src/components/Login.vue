<template>
  <div class="container my-5 text-center">
    <p>Access only after signing in:</p>
    <div id="google-sign-in-button" class="mx-auto d-inline-block"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("user/createSignInButton", {
      id: "google-sign-in-button",
    });
  },
};
</script>
