import {createUpdater} from './createUpdater';
import {createGoogleSignInButton, initAuth, loadAuth, loadSignIn} from './googleAuth'

async function createSignInButton({commit, state}, {id}) {
    if (state.isSignIn2ModuleLoaded === false) {
        await loadSignIn();
        commit('updateSignInModuleLoaded', true);
    }
    await createGoogleSignInButton({id});
}

async function checkToken({commit, state}) {
    if (state.auth !== undefined) {
        return;
    }

    await loadAuth();
    const auth = initAuth();
    commit('updateAuth', auth);

    auth.isSignedIn.listen((value) => commit('updateStatus', value ? 'signed-in' : 'signed-out'));
    auth.currentUser.listen((user) => {
        const basicProfile = user.getBasicProfile();
        if (basicProfile) {
            const fullName = basicProfile.getName();
            commit('updateFullName', fullName)
        }
    });

    await new Promise((resolve, reject) => {
        auth.then(resolve, reject);
    });

    const isSignedIn = auth.isSignedIn.get();

    commit('updateStatus', isSignedIn ? 'signed-in' : 'signed-out')
}

async function signOut({commit, dispatch, state}) {
    if (state.auth === undefined) {
        await dispatch('user/checkToken');
    }
    state.auth.signOut();
}

export function createUserModule() {
    return {
        actions: {
            checkToken,
            createSignInButton,
            signOut,
        },
        mutations: {
            updateAuth: createUpdater('auth'),
            updateSignInModuleLoaded: createUpdater('isSignInModuleLoaded'),
            updateStatus: createUpdater('status'),
            updateFullName: createUpdater('fullName'),
        },
        namespaced: true,
        state() {
            return {
                auth: undefined,
                isSignInModuleLoaded: false,
                status: 'pending',
                fullName: '',
            }
        },
    }
}
