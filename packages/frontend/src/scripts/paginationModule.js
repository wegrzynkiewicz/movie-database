export function createPaginationModule() {
    return {
        mutations: {
            updatePage(state, payload) {
                state.page = parseInt(payload);
            },
            updateTotal(state, payload) {
                state.total = parseInt(payload);
            },
            updatePerPage(state, payload) {
                state.perPage = parseInt(payload);
            },
        },
        namespaced: true,
        state: {
            page: 1,
            total: 0,
            perPage: 10,
        },
    }
}
