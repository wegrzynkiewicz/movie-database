<template>
    <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="perPage"
        aria-controls="my-table"
        class="mx-auto"
    />
</template>

<script>
export default {
    components: {},
    props: {
        module: {
            type: String,
            required: true,
        },
    },
    computed: {
        page: {
            get() {
                return this.$store.state[this.module].pagination.page;
            },
            set(page) {
                this.$store.commit(`${this.module}/pagination/updatePage`, page);
                this.$emit('update', page);
            },
        },
        total() {
            return this.$store.state[this.module].pagination.total;
        },
        perPage() {
            return this.$store.state[this.module].pagination.perPage;
        },
    },
};
</script>
