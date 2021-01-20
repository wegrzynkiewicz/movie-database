export function createPaginationModule() {
    return {
        mutations: {
            updatePage(state, payload) {
                state.page = payload;
            },
            updateTotal(state, payload) {
                state.total = payload;
            },
            updatePerPage(state, payload) {
                state.perPage = payload;
            },
        },
        namespaced: true,
        state() {
            return {
                page: 1,
                total: 0,
                perPage: 10,
            }
        },
    }
}
