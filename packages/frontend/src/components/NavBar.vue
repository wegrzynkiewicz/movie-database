<template>
    <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
    >
        <div class="container">
            <b-navbar-brand href="/">
                Movie Database
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" />

            <b-collapse
                id="nav-collapse"
                is-nav
            >
                <b-navbar-nav
                    v-show="$store.state.user.status === 'signed-in'"
                >
                    <b-nav-item :to="{name:'movies'}">
                        Movies
                    </b-nav-item>
                    <b-nav-item :to="{name:'favorites'}">
                        Favorites
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown
                        v-show="$store.state.user.status === 'signed-in'"
                        right
                    >
                        <template #button-content>
                            <em>Signed in as: {{ $store.state.user.fullName }}!</em>
                        </template>
                        <b-dropdown-item
                            href="#"
                            @click="signOut()"
                        >
                            Sign Out
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
export default {
    methods: {
        async signOut() {
            await this.$store.dispatch("user/signOut");
        },
    },
};
</script>
