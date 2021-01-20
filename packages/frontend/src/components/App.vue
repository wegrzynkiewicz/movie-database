<template>
    <div>
        <NavBar />
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
                case "pending":
                    return Loading;
                case "signed-in":
                    return DatabaseSearch;
                case "signed-out":
                    return Login;
                default:
                    return Loading;
            }
        },
    },
    async mounted() {
        await this.$store.dispatch("user/checkToken");
    },
};
</script>
