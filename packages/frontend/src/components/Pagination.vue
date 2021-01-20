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
            set(value) {
                this.$store.commit(`${this.module}/pagination/updatePage`, value);
                this.$emit('update');
            }
        },
        total: {
            get() {
                return this.$store.state[this.module].pagination.total;
            },
            set(value) {
                this.$store.commit(`${this.module}/pagination.updateTotal`, value);
                this.$emit('update');
            }
        },
        perPage: {
            get() {
                return this.$store.state[this.module].pagination.perPage;
            },
            set(value) {
                this.$store.commit(`${this.module}/pagination/updatePerPage`, value);
                this.$emit('update');
            }
        },
    },
};
</script>
