export function createUpdater(propertyName) {
    return function (state, payload) {
        state[propertyName] = payload;
    }
}
