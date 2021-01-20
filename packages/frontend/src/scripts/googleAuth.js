export function initAuth() {
    return gapi.auth2.init({
        client_id: '35107542415-9r0mkj84cv6vo7uj9hm9jr89gfi449r0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
    });
}

export function createGoogleSignInButton({id}) {
    return new Promise((resolve, reject) => {
        gapi.signin2.render(id, {
            scope: 'profile email',
            width: 240,
            height: 50,
            longtitle: true,
            theme: 'dark',
            onsuccess: resolve,
            onfailure: reject,
        });
    });
}

export function loadAuth() {
    return new Promise((resolve) => {
        gapi.load('auth2', resolve);
    });
}

export async function loadSignIn() {
    return new Promise((resolve) => {
        gapi.load('signin2', resolve);
    });
}
